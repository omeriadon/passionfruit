import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
	MarkdownCopyButton,
	ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { gitConfig, getCatalogRoute } from "@/lib/shared";
import { getCatalogRecordCount, getCatalogStaticParams } from "@/lib/source";

function CatalogRouteBoundary({ slugs }: { slugs: string[] }) {
	const route = getCatalogRoute(slugs);
	if (!route) return null;

	return (
		<section
			className="catalog-route-boundary"
			data-catalog-kind={route.kind}
			data-catalog-category={route.category}
			data-catalog-device={"deviceSlug" in route ? route.deviceSlug : undefined}
			data-catalog-record-count={getCatalogRecordCount(route)}
		>
			<div className="catalog-route-boundary__content">
				<p className="text-sm font-medium text-fd-muted-foreground">
					Catalog data boundary
				</p>
				<p className="text-fd-muted-foreground">
					The interactive catalog view is mounted here by the components layer.
				</p>
			</div>
		</section>
	);
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	const catalogRoute = getCatalogRoute(params.slug);
	if (!page && !catalogRoute) notFound();

	if (!page) {
		return (
			<DocsPage>
				<DocsTitle>Apple Catalog</DocsTitle>
				<DocsDescription>
					Explore the structured data for this Apple device category.
				</DocsDescription>
				<DocsBody>
					<CatalogRouteBoundary slugs={params.slug ?? []} />
				</DocsBody>
			</DocsPage>
		);
	}

	const MDX = page.data.body;
	const markdownUrl = getPageMarkdownUrl(page).url;

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription className="mb-0">
				{page.data.description}
			</DocsDescription>
			<div className="flex flex-row gap-2 items-center border-b pb-6">
				<MarkdownCopyButton markdownUrl={markdownUrl} />
				<ViewOptionsPopover
					markdownUrl={markdownUrl}
					githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
				/>
			</div>
			<DocsBody>
				<CatalogRouteBoundary slugs={params.slug ?? []} />
				<MDX
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return [...source.generateParams(), ...getCatalogStaticParams()];
}

export async function generateMetadata(
	props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) {
		const route = getCatalogRoute(params.slug);
		if (!route) notFound();

		return {
			title: "Apple Catalog",
			description: "Structured Apple device data.",
		};
	}

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			images: getPageImageUrl(page).url,
		},
	};
}

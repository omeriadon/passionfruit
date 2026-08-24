import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { catalogCategories } from "@/lib/shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
	return (
		<DocsLayout
			tree={source.getPageTree()}
			tabs={catalogCategories.map((category) => ({
				title: category.title,
				description: category.description,
				url: `/docs/${category.slug}`,
			}))}
			tabMode="top"
			sidebar={{ enabled: false }}
			{...baseOptions()}
		>
			{children}
		</DocsLayout>
	);
}

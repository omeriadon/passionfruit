import { getCatalogPageTree } from "@/lib/source";
import { GlassLayout, type GlassLayoutProps } from "fumadocs-ui/layouts/glass";
import { baseOptions } from "@/lib/layout.shared";
import {
	catalogCategories,
	docsRoute,
	getCatalogTabUrls,
	otherCatalogSections,
} from "@/lib/shared";
import { GlassAccountHeader } from "@/components/auth/GlassAccountHeader";

const baseLayoutOptions = baseOptions();

const glassLayoutOptions: Omit<GlassLayoutProps, "children"> = {
	...baseLayoutOptions,

	tree: getCatalogPageTree(),

	tabs: [
		...catalogCategories.map((category) => ({
			title: category.title,
			description: category.description,
			url: `/docs/${category.slug}`,
			urls: getCatalogTabUrls(category.slug),
		})),
		...otherCatalogSections.map((section) => ({
			title: section.title,
			description: section.description,
			url: `/docs/other/${section.slug}`,
			urls: new Set([`${docsRoute}/other/${section.slug}`]),
		})),
	],

	sidebar: {
		collapsible: false,
	},

	slots: {
		header: GlassAccountHeader,
	},
	githubUrl: baseLayoutOptions.githubUrl,
	links: baseLayoutOptions.links ?? [],
	themeSwitch: {
		enabled: true,
		mode: "light-dark-system",
	},
	searchToggle: {
		enabled: true,
	},
	i18n: false,
};

export default function Layout({ children }: LayoutProps<"/docs">) {
	return <GlassLayout {...glassLayoutOptions}>{children}</GlassLayout>;
}

import { getCatalogPageTree } from "@/lib/source";
import { GlassLayout, type GlassLayoutProps } from "fumadocs-ui/layouts/glass";
import { getLayoutTabs, type LayoutTab } from "fumadocs-ui/layouts/shared";
import { baseOptions } from "@/lib/layout.shared";
import { catalogCategories, otherCatalogSections } from "@/lib/shared";
import { GlassAccountHeader } from "@/components/auth/GlassAccountHeader";

const baseLayoutOptions = baseOptions();
const catalogTree = getCatalogPageTree();
const catalogTabs = getLayoutTabs(catalogTree)
	.map((option): LayoutTab | null => {
		const category = catalogCategories.find(
			(item) => option.url === `/docs/${item.slug}`,
		);
		if (category) {
			return {
				...option,
				title: category.title,
				description: category.description,
			};
		}

		const section = otherCatalogSections.find(
			(item) => option.url === `/docs/other/${item.slug}`,
		);
		if (section) {
			return {
				...option,
				title: section.title,
				description: section.description,
			};
		}

		if (option.url.startsWith("/docs/account")) {
			return {
				...option,
				title: "Account",
				description: "Bookmarks and settings",
			};
		}

		return null;
	})
	.filter((option): option is LayoutTab => option !== null);

const glassLayoutOptions: Omit<GlassLayoutProps, "children"> = {
	...baseLayoutOptions,

	tree: catalogTree,

	tabs: catalogTabs,

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

import { getCatalogPageTree } from "@/lib/source";
import { GlassLayout, type GlassLayoutProps } from "fumadocs-ui/layouts/glass";
import { baseOptions } from "@/lib/layout.shared";
import { catalogCategories } from "@/lib/shared";
import { GlassAccountHeader } from "@/components/auth/GlassAccountHeader";

const baseLayoutOptions = baseOptions();

const glassLayoutOptions: Omit<GlassLayoutProps, "children"> = {
	...baseLayoutOptions,

	// Required: the page tree that populates the Glass sidebar.
	tree: getCatalogPageTree(),

	// Use `false` to disable tabs. Use an array for explicit tabs, or an object
	// with `transform` to customize tabs generated from the page tree.
	tabs: catalogCategories.map((category) => ({
		title: category.title,
		description: category.description,
		url: `/docs/${category.slug}`,
	})),

	// Glass has a controlled AI button, but the open state must live in a client
	// component. Add `aiChat` from a client wrapper when that feature is ready.
	// aiChat: {
	// 	open: false,
	// 	onOpenChange: setOpen,
	// },

	// Glass uses an opinionated sidebar. This currently controls whether it can
	// collapse; it does not support the DocsLayout `sidebar.banner` option.
	sidebar: {
		collapsible: true,
	},

	// Override built-in Glass pieces here. The shared slots are also available:
	// `navTitle`, `themeSwitch`, `searchTrigger`, and `languageSelect`.
	slots: {
		header: GlassAccountHeader,
	},

	// Shared layout options from BaseLayoutProps.
	nav: {
		...baseLayoutOptions.nav,
		enabled: true,
		transparentMode: "none",
	},
	githubUrl: baseLayoutOptions.githubUrl,
	links: baseLayoutOptions.links ?? [],
	themeSwitch: {
		enabled: true,
		mode: "light-dark",
	},
	searchToggle: {
		enabled: true,
	},
	i18n: false,
};

export default function Layout({ children }: LayoutProps<"/docs">) {
	return <GlassLayout {...glassLayoutOptions}>{children}</GlassLayout>;
}

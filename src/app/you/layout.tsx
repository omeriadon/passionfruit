import { getYouPageTree } from "@/lib/source";
import { GlassLayout, type GlassLayoutProps } from "fumadocs-ui/layouts/glass";
import { getLayoutTabs, type LayoutTab } from "fumadocs-ui/layouts/shared";
import { baseOptions } from "@/lib/layout.shared";
import { GlassAccountHeader } from "@/components/auth/GlassAccountHeader";

const baseLayoutOptions = baseOptions();
const youTree = getYouPageTree();

const youTabMeta: Record<string, { title: string; description: string }> = {
	"/you/devices": {
		title: "Devices",
		description: "Your devices and bookmarks",
	},
	"/you/account": {
		title: "Account",
		description: "Settings and device order",
	},
};

const youTabs = getLayoutTabs(youTree)
	.map((option): LayoutTab | null => {
		const meta = youTabMeta[option.url];
		if (!meta) return null;
		return { ...option, title: meta.title, description: meta.description };
	})
	.filter((option): option is LayoutTab => option !== null);

const glassLayoutOptions: Omit<GlassLayoutProps, "children"> = {
	...baseLayoutOptions,

	tree: youTree,

	tabs: youTabs,

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

export default function Layout({ children }: LayoutProps<"/you">) {
	return <GlassLayout {...glassLayoutOptions}>{children}</GlassLayout>;
}

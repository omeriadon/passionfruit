import { HomeLayout, type HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

const homeLayoutOptions: Omit<HomeLayoutProps, "children"> = {
	...baseOptions(),
	nav: {
		...baseOptions().nav,
		// Set true to open the mobile navigation menu on pointer hover.
		enableHoverToOpen: false,
	},
	// Home-specific slots: `header` and `container`.
	slots: {},
};

export default function Layout({ children }: LayoutProps<"/">) {
	return <HomeLayout {...homeLayoutOptions}>{children}</HomeLayout>;
}

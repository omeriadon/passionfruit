import {
	RootProvider,
	type RootProviderProps,
} from "fumadocs-ui/provider/next";
import "./global.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const rootProviderOptions: Omit<RootProviderProps, "children"> = {
	// Base UI direction for menus, dialogs, popovers, and other primitives.
	dir: "ltr",

	// Search configuration. Add `links` for empty-search shortcuts, `hotKey`
	// for alternate shortcuts, or `SearchDialog` for a custom search surface.
	search: {
		enabled: true,
	},

	// next-themes configuration. `attribute` must stay aligned with the CSS
	// theme selectors in global.css.
	theme: {
		enabled: true,
		attribute: "class",
		defaultTheme: "system",
		enableSystem: true,
		disableTransitionOnChange: true,
		hotKey: "d",
	},

	// Add `i18n` here when locale switching is enabled. Next's RootProvider
	// also accepts `components` for custom framework Link and Image components.
};

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<AuthProvider>
					<RootProvider {...rootProviderOptions}>{children}</RootProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

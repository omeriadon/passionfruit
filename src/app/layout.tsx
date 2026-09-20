import { type RootProviderProps } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { SearchRootProvider } from "@/components/SearchRootProvider";
import "./global.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import localFont from "next/font/local";

const panchang = localFont({
	src: "../assets/fonts/Panchang-Variable.ttf",
	variable: "--font-panchang",
	display: "swap",
});

const sprite = localFont({
	src: "../assets/fonts/SpriteGraffiti-Shadow.ttf",
	variable: "--font-sprite",
	display: "swap",
});

const generalSans = localFont({
	src: "../assets/fonts/GeneralSans-Variable.ttf",
	variable: "--font-general-sans",
	display: "swap",
});

// FONTS: Panchang -> Logo/header font
// FONTS: Sprite -> Graffiti font
// FONTS: GeneralSans -> Main font for body, at least on the landing page

export const metadata: Metadata = {
	icons: {
		icon: [
			{
				url: "/favicon.svg",
				type: "image/svg+xml",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-transparent.svg",
				type: "image/svg+xml",
				media: "(prefers-color-scheme: dark)",
			},
		],
		shortcut: "/favicon.svg",
	},
};

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
		<html
			lang="en"
			className={`${generalSans.className} ${panchang.variable} ${sprite.variable}`}
			suppressHydrationWarning
		>
			<body className="flex flex-col min-h-screen">
				<AuthProvider>
					<SearchRootProvider {...rootProviderOptions}>
						{children}
					</SearchRootProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

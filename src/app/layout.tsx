import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import localFont from "next/font/local";

const panchang = localFont({
	src: "../assets/fonts/Panchang-Variable.ttf",
	variable: "--font-panchang",
	display: "swap",
});

const generalSans = localFont({
	src: "../assets/fonts/GeneralSans-Variable.ttf",
	variable: "--font-general-sans",
	display: "swap",
});


export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${generalSans.className} ${panchang.variable}`} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
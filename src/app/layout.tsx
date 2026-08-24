import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<AuthProvider>
					<RootProvider>{children}</RootProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

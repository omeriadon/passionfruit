import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	async rewrites() {
		const bookmarksApiUrl =
			process.env.NEXT_PUBLIC_BOOKMARKS_API_URL ??
			"https://passionfruit-api.adonis.pt";

		return [
			{
				source: "/api/v1/:path*",
				destination: `${bookmarksApiUrl}/api/v1/:path*`,
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/docs/account/bookmarks",
				destination: "/you/devices",
				permanent: true,
			},
			{
				source: "/you/bookmarks",
				destination: "/you/devices",
				permanent: true,
			},
			{
				source: "/docs/account/:path*",
				destination: "/you/account",
				permanent: true,
			},
		];
	},
};

export default withMDX(config);

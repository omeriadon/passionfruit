import {
	DocsBody,
	DocsDescription,
	DocsPage,
	type DocsPageProps,
	DocsTitle,
} from "fumadocs-ui/layouts/glass/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AccountSettings } from "@/components/you/AccountSettings";
import { DeviceOrder } from "@/components/you/DeviceOrder";
import { Collection } from "@/components/you/YouDeviceTabs";

const youPageOptions: Omit<DocsPageProps, "children" | "toc"> = {
	full: false,
	tableOfContent: {
		container: {},
		header: null,
		footer: null,
	},
};

export default async function Page(props: PageProps<"/you/[[...slug]]">) {
	const params = await props.params;
	const slugs = params.slug ?? [];

	if (
		slugs.length === 0 ||
		slugs[0] === "devices" ||
		slugs[0] === "bookmarks"
	) {
		redirect("/you/collection");
	}

	if (slugs.length === 1 && slugs[0] === "collection") {
		return (
			<DocsPage {...youPageOptions} toc={[]}>
				<DocsTitle>Collection</DocsTitle>
				<DocsDescription className="mb-0">
					The devices you own and have bookmarked, grouped by type.
				</DocsDescription>
				<DocsBody>
					<Collection />
				</DocsBody>
			</DocsPage>
		);
	}

	if (slugs.length === 1 && slugs[0] === "account") {
		return (
			<DocsPage {...youPageOptions} toc={[]}>
				<DocsTitle>Account settings</DocsTitle>
				<DocsDescription className="mb-0">
					Change your username or password, or delete your account.
				</DocsDescription>
				<DocsBody>
					<AccountSettings />
				</DocsBody>
			</DocsPage>
		);
	}

	if (slugs.length === 2 && slugs[0] === "account" && slugs[1] === "order") {
		return (
			<DocsPage {...youPageOptions} toc={[]}>
				<DocsTitle>Device order</DocsTitle>
				<DocsDescription className="mb-0">
					Arrange device categories. The order applies to the sidebar.
				</DocsDescription>
				<DocsBody>
					<DeviceOrder />
				</DocsBody>
			</DocsPage>
		);
	}

	notFound();
}

export function generateStaticParams() {
	return [
		{ slug: ["collection"] },
		{ slug: ["account"] },
		{ slug: ["account", "order"] },
	];
}

export async function generateMetadata(
	props: PageProps<"/you/[[...slug]]">,
): Promise<Metadata> {
	const params = await props.params;
	const slugs = params.slug ?? [];
	if (slugs[0] === "account" && slugs[1] === "order") {
		return {
			title: "Device order",
			description: "Arrange device categories.",
		};
	}
	if (slugs[0] === "account") {
		return {
			title: "Account settings",
			description: "Change your username or password, or delete your account.",
		};
	}
	if (
		slugs[0] === "collection" ||
		slugs[0] === "devices" ||
		slugs[0] === "bookmarks"
	) {
		return {
			title: "Collection",
			description: "Devices you own and have bookmarked.",
		};
	}
	return {
		title: "Collection",
		description: "Devices you own and have bookmarked.",
	};
}

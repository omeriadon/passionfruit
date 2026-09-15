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
import { DevicesList } from "@/components/you/DevicesList";

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

	if (slugs.length === 0) redirect("/you/devices");

	if (slugs.length === 1 && slugs[0] === "devices") {
		return (
			<DocsPage {...youPageOptions} toc={[]}>
				<DocsTitle>Devices</DocsTitle>
				<DocsDescription className="mb-0">
					The devices you own and have bookmarked.
				</DocsDescription>
				<DocsBody>
					<DevicesList />
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

	if (
		slugs.length === 2 &&
		slugs[0] === "account" &&
		slugs[1] === "order"
	) {
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
		{ slug: ["devices"] },
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
	return {
		title: "Devices",
		description: "The devices you own and have bookmarked.",
	};
}

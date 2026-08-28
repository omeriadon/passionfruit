export const appName = "Apple Catalog";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const gitConfig = {
	user: "omeriadon",
	repo: "apple-tracker",
	branch: "main",
};

export const catalogCategories = [
	{ slug: "airpods", title: "AirPods", description: "Wireless audio" },
	{ slug: "apple-tv", title: "Apple TV", description: "Home entertainment" },
	{
		slug: "apple-watch",
		title: "Apple Watch",
		description: "Wearables and health",
	},
	{ slug: "homepod", title: "HomePod", description: "Home audio" },
	{ slug: "ipad", title: "iPad", description: "Tablets and accessories" },
	{ slug: "iphone", title: "iPhone", description: "Phones" },
	{ slug: "mac", title: "Mac", description: "Mac notebooks and desktops" },
	{ slug: "vision", title: "Vision", description: "Spatial computing" },
] as const;

export type CatalogCategory = (typeof catalogCategories)[number]["slug"];

export const ipadAccessorySections = [
	{
		slug: "apple-pencil",
		title: "Apple Pencil",
		description: "Styluses for iPad",
	},
	{
		slug: "magic-keyboard",
		title: "Magic Keyboard",
		description: "Keyboards for iPad",
	},
] as const;

export type IpadAccessorySection =
	(typeof ipadAccessorySections)[number]["slug"];

export const otherCatalogSections = [
	{
		slug: "apple-display",
		title: "Apple displays",
		description: "Studio Display and XDR",
	},
] as const;

export type OtherCatalogSection = (typeof otherCatalogSections)[number]["slug"];

export type CatalogRoute =
	| { kind: "category"; category: CatalogCategory }
	| { kind: "accessories"; category: "ipad" }
	| { kind: "accessory"; category: "ipad"; accessory: IpadAccessorySection }
	| { kind: "other"; section: OtherCatalogSection }
	| { kind: "other-device"; section: OtherCatalogSection; deviceSlug: string }
	| { kind: "device"; category: CatalogCategory; deviceSlug: string }
	| {
			kind: "accessory-device";
			category: "ipad";
			accessory: IpadAccessorySection;
			deviceSlug: string;
	  };

export function getCatalogRoute(
	slugs: string[] | undefined,
): CatalogRoute | undefined {
	if (!slugs || slugs.length === 0) return undefined;

	const [category, second, third, fourth] = slugs;
	if (category === "other") {
		const section = otherCatalogSections.find((item) => item.slug === second);
		if (!section) return undefined;
		if (third)
			return { kind: "other-device", section: section.slug, deviceSlug: third };
		return { kind: "other", section: section.slug };
	}
	const categoryInfo = catalogCategories.find((item) => item.slug === category);
	if (!categoryInfo) return undefined;
	if (!second) return { kind: "category", category: categoryInfo.slug };

	if (categoryInfo.slug === "ipad") {
		if (second === "accessories" && !third) {
			return { kind: "accessories", category: "ipad" };
		}

		const accessorySlug = second === "accessories" ? third : undefined;
		const accessory = ipadAccessorySections.find(
			(item) => item.slug === accessorySlug,
		);
		if (second === "accessories" && !accessorySlug) return undefined;
		if (second === "accessories" && !accessory) return undefined;
		if (accessory) {
			if (!fourth) {
				return {
					kind: "accessory",
					category: "ipad",
					accessory: accessory.slug,
				};
			}

			return {
				kind: "accessory-device",
				category: "ipad",
				accessory: accessory.slug,
				deviceSlug: fourth,
			};
		}
	}

	return {
		kind: "device",
		category: categoryInfo.slug,
		deviceSlug: second,
	};
}

export function getCatalogTabUrls(category: CatalogCategory): Set<string> {
	const urls = new Set([`${docsRoute}/${category}`]);

	if (category === "ipad") {
		for (const accessory of ipadAccessorySections) {
			urls.add(`${docsRoute}/${category}/accessories/${accessory.slug}`);
		}
		urls.add(`${docsRoute}/${category}/accessories`);
	}

	return urls;
}

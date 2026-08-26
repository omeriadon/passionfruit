import { loader } from "fumadocs-core/source";
import type * as PageTree from "fumadocs-core/page-tree";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";
import { defineDocs } from "fumadocs-mdx/macro";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import type {
	CatalogCategory,
	CatalogRoute,
	IpadAccessorySection,
	OtherCatalogSection,
} from "./shared";
import {
	catalogCategories,
	getCatalogRoute,
	ipadAccessorySections,
	otherCatalogSections,
} from "./shared";
import { sortDevices } from "./catalog/config";
import type { CatalogDevice } from "./catalog/types";

// Catalog data imports are intentionally kept in this server-side source module.
import airpodsData from "../../public/data/airpods/airpods.json";
import appleTVData from "../../public/data/apple-tv/apple-tv.json";
import appleWatchData from "../../public/data/apple-watch/apple-watch.json";
import homePodData from "../../public/data/homepod/homepod.json";
import ipadData from "../../public/data/ipad/ipad.json";
import iphoneData from "../../public/data/iphone/iphone.json";
import macData from "../../public/data/mac/mac.json";
import visionData from "../../public/data/vision/vision.json";
import applePencilData from "../../public/data/other/apple-pencil/apple-pencil.json";
import magicKeyboardData from "../../public/data/other/magic-keyboard/magic-keyboard.json";
import appleDisplayData from "../../public/data/other/apple-display/apple-display.json";

export type CatalogDataset =
	| typeof airpodsData
	| typeof appleTVData
	| typeof appleWatchData
	| typeof homePodData
	| typeof ipadData
	| typeof iphoneData
	| typeof macData
	| typeof visionData
	| typeof applePencilData
	| typeof magicKeyboardData;

type OtherCatalogDataset = typeof appleDisplayData;

const catalogDatasets: Record<CatalogCategory, CatalogDataset> = {
	airpods: airpodsData,
	"apple-tv": appleTVData,
	"apple-watch": appleWatchData,
	homepod: homePodData,
	ipad: ipadData,
	iphone: iphoneData,
	mac: macData,
	vision: visionData,
};

const accessoryDatasets: Record<IpadAccessorySection, CatalogDataset> = {
	"apple-pencil": applePencilData,
	"magic-keyboard": magicKeyboardData,
};

const otherDatasets: Record<OtherCatalogSection, OtherCatalogDataset> = {
	"apple-display": appleDisplayData,
};

export function getCatalogData(route: CatalogRoute): CatalogDataset {
	if (route.kind === "other" || route.kind === "other-device") {
		throw new Error("Other catalog routes use getOtherCatalogData.");
	}
	if (route.kind === "accessory" || route.kind === "accessory-device") {
		return accessoryDatasets[route.accessory];
	}

	return catalogDatasets[route.category];
}

export function getOtherCatalogData(section: OtherCatalogSection) {
	return otherDatasets[section];
}

export function getCatalogRecordCount(route: CatalogRoute): number {
	if (route.kind === "other" || route.kind === "other-device") {
		return getOtherCatalogData(route.section).products.length;
	}
	const data = getCatalogData(route);
	if ("devices" in data) return data.devices.length;
	if ("accessories" in data) return data.accessories.length;
	return 0;
}

export function getCatalogRouteData(slugs: string[] | undefined) {
	const route = getCatalogRoute(slugs);
	if (route?.kind === "other" || route?.kind === "other-device") {
		return route
			? { route, data: getOtherCatalogData(route.section) }
			: undefined;
	}
	return route ? { route, data: getCatalogData(route) } : undefined;
}

export function getCatalogStaticParams(): { slug: string[] }[] {
	const params: { slug: string[] }[] = [];

	for (const category of Object.keys(catalogDatasets) as CatalogCategory[]) {
		const data = catalogDatasets[category];
		if ("devices" in data) {
			for (const device of data.devices) {
				params.push({ slug: [category, device.id] });
			}
		}
	}

	for (const accessory of ipadAccessorySections) {
		const data = accessoryDatasets[accessory.slug];
		if ("accessories" in data) {
			for (const device of data.accessories) {
				params.push({
					slug: ["ipad", "accessories", accessory.slug, device.id],
				});
			}
		}
	}

	for (const section of otherCatalogSections) {
		params.push({ slug: ["other", section.slug] });
		for (const product of otherDatasets[section.slug].products) {
			params.push({ slug: ["other", section.slug, product.id] });
		}
	}

	return params;
}

// Content source configuration. Change `dir` to move the MDX source, adjust
// either schema to change frontmatter validation, or disable processed
// markdown when raw page content is not needed by a route.
const docs = defineDocs({
	dir: "content/docs",
	docs: {
		schema: pageSchema,
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
	meta: {
		schema: metaSchema,
	},
});

// Loader configuration. `baseUrl` controls generated links, `source` is the
// normalized Fumadocs source, and `plugins` extends page-tree generation.
const sourceOptions = {
	baseUrl: docsRoute,
	source: docs.toFumadocsSource(),
	plugins: [lucideIconsPlugin()],
};

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader(sourceOptions);

function findFolderByRoute(
	node: PageTree.Root | PageTree.Folder,
	url: string,
): PageTree.Folder | undefined {
	for (const child of node.children) {
		if (child.type !== "folder") continue;
		if (
			child.index?.url === url ||
			(child.$ref?.folder && `${docsRoute}/${child.$ref.folder}` === url)
		) {
			return child;
		}
		const match = findFolderByRoute(child, url);
		if (match) return match;
	}
	return undefined;
}

function catalogPageItem(id: string, name: string, url: string): PageTree.Item {
	return {
		$id: `catalog:${url}`,
		type: "page",
		name,
		url,
	};
}

function withChildren(
	node: PageTree.Root | PageTree.Folder,
	childrenByUrl: ReadonlyMap<string, PageTree.Item[]>,
): PageTree.Root | PageTree.Folder {
	return {
		...node,
		children: node.children.map((child) => {
			if (child.type !== "folder") return child;
			const transformed = withChildren(child, childrenByUrl) as PageTree.Folder;
			const folderUrl =
				child.index?.url ??
				(child.$ref?.folder ? `${docsRoute}/${child.$ref.folder}` : "");
			const additions = childrenByUrl.get(folderUrl);
			return additions
				? { ...transformed, children: [...transformed.children, ...additions] }
				: transformed;
		}),
	};
}

/**
 * Add data-backed detail routes to the official Fumadocs page tree. These
 * routes do not have MDX files, but are still rendered by the catalog route
 * boundary and therefore belong in the same sidebar tree as the MDX pages.
 */
export function getCatalogPageTree(): PageTree.Root {
	const childrenByUrl = new Map<string, PageTree.Item[]>();

	for (const category of catalogCategories) {
		const data = catalogDatasets[category.slug];
		if (!("devices" in data)) continue;
		childrenByUrl.set(
			`${docsRoute}/${category.slug}`,
			sortDevices(data.devices as CatalogDevice[]).map((device) =>
				catalogPageItem(
					device.id,
					device.name,
					`${docsRoute}/${category.slug}/${device.id}`,
				),
			),
		);
	}

	for (const accessory of ipadAccessorySections) {
		const data = accessoryDatasets[accessory.slug];
		if (!("accessories" in data)) continue;
		childrenByUrl.set(
			`${docsRoute}/ipad/accessories/${accessory.slug}`,
			data.accessories.map((item) =>
				catalogPageItem(
					item.id,
					item.displayName,
					`${docsRoute}/ipad/accessories/${accessory.slug}/${item.id}`,
				),
			),
		);
	}

	const tree = source.getPageTree();
	const transformed = withChildren(tree, childrenByUrl);

	for (const category of catalogCategories) {
		const url = `${docsRoute}/${category.slug}`;
		const folder = findFolderByRoute(transformed, url);
		if (folder && !folder.index) {
			folder.index = catalogPageItem(category.slug, category.title, url);
		}
	}

	transformed.children = [
		...transformed.children,
		...otherCatalogSections.map((section) => ({
			$id: `catalog:other:${section.slug}`,
			type: "folder" as const,
			name: section.title,
			root: true,
			defaultOpen: true,
			index: catalogPageItem(
				section.slug,
				section.title,
				`${docsRoute}/other/${section.slug}`,
			),
			children: otherDatasets[section.slug].products.map((product) =>
				catalogPageItem(
					product.id,
					product.displayName,
					`${docsRoute}/other/${section.slug}/${product.id}`,
				),
			),
		})),
	];

	for (const category of catalogCategories) {
		if (!findFolderByRoute(transformed, `${docsRoute}/${category.slug}`)) {
			throw new Error(`Missing page-tree folder for ${category.slug}`);
		}
	}
	for (const section of otherCatalogSections) {
		if (!findFolderByRoute(transformed, `${docsRoute}/other/${section.slug}`)) {
			throw new Error(`Missing page-tree folder for ${section.slug}`);
		}
	}

	return transformed as PageTree.Root;
}

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
	const segments = [...page.slugs, "image.png"];

	return {
		segments,
		url:
			"/" +
			[page.locale, ...docsImageRoute.split("/"), ...segments]
				.filter(Boolean)
				.join("/"),
	};
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
	const segments = [...page.slugs, "content.md"];

	return {
		segments,
		url:
			"/" +
			[page.locale, ...docsContentRoute.split("/"), ...segments]
				.filter(Boolean)
				.join("/"),
	};
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
	const processed = await page.data.getText("processed");

	return `# ${page.data.title} (${page.url})

${processed}`;
}

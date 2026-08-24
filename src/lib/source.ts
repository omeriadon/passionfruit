import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";
import { defineDocs } from "fumadocs-mdx/macro";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import type {
	CatalogCategory,
	CatalogRoute,
	IpadAccessorySection,
} from "./shared";
import { getCatalogRoute, ipadAccessorySections } from "./shared";

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

export function getCatalogData(route: CatalogRoute): CatalogDataset {
	if (route.kind === "accessory" || route.kind === "accessory-device") {
		return accessoryDatasets[route.accessory];
	}

	return catalogDatasets[route.category];
}

export function getCatalogRecordCount(route: CatalogRoute): number {
	const data = getCatalogData(route);
	if ("devices" in data) return data.devices.length;
	if ("accessories" in data) return data.accessories.length;
	return 0;
}

export function getCatalogRouteData(slugs: string[] | undefined) {
	const route = getCatalogRoute(slugs);
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

	return params;
}

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

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
	baseUrl: docsRoute,
	source: docs.toFumadocsSource(),
	plugins: [lucideIconsPlugin()],
});

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

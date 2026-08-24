export type CatalogPrimitive = string | number | boolean | null;

export type CatalogValue =
	CatalogPrimitive | CatalogValue[] | { [key: string]: CatalogValue };

export type CatalogDevice = {
	id: string;
	name: string;
	[key: string]: CatalogValue;
};

export type CatalogCategory =
	| "airpods"
	| "apple-tv"
	| "apple-watch"
	| "homepod"
	| "ipad"
	| "iphone"
	| "mac"
	| "vision";

export type CatalogImage = {
	label?: string;
	localPath?: string;
	appleUrl?: string;
	widthPx?: number;
	heightPx?: number;
};

export type CatalogColor = {
	id?: string;
	displayName?: string;
	swatch?: string | { kind?: string; value?: string; url?: string };
	images?: CatalogImage[];
};

export type CatalogColumn = {
	id: string;
	label: string;
	getValue: (device: CatalogDevice) => CatalogValue;
	sortValue?: (device: CatalogDevice) => string | number;
};

export type CatalogCategoryConfig = {
	id: CatalogCategory;
	label: string;
	description: string;
	columns: CatalogColumn[];
};

export function humanizeKey(value: string) {
	return value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/[-_]+/g, " ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatCatalogValue(value: CatalogValue): string {
	if (value === null) return "Not recorded";
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (typeof value === "number") return value.toLocaleString("en-AU");
	if (typeof value === "string") return value || "Not recorded";
	if (Array.isArray(value)) {
		if (value.length === 0) return "None recorded";
		return value
			.map((item) => {
				if (typeof item === "object" && item !== null && !Array.isArray(item)) {
					return String(item.displayName ?? item.name ?? item.id ?? "Details");
				}
				return formatCatalogValue(item);
			})
			.join(", ");
	}
	return Object.entries(value)
		.map(([key, item]) => `${humanizeKey(key)}: ${formatCatalogValue(item)}`)
		.join(" · ");
}

export function assetPath(path: string | undefined) {
	if (!path) return undefined;
	if (path.startsWith("public/")) return `/${path.slice("public/".length)}`;
	if (path.startsWith("/")) return path;
	return `/${path}`;
}

export function getColors(device: CatalogDevice): CatalogColor[] {
	const colors = device.colors;
	return Array.isArray(colors)
		? colors.filter(
				(color): color is CatalogColor =>
					typeof color === "object" && color !== null,
			)
		: [];
}

export function getImages(device: CatalogDevice): CatalogImage[] {
	const directImages = device.images;
	if (Array.isArray(directImages)) {
		return directImages.filter(
			(image): image is CatalogImage =>
				typeof image === "object" && image !== null,
		);
	}

	return getColors(device).flatMap((color) => color.images ?? []);
}

export function imageForColor(color: CatalogColor | undefined) {
	return (
		color?.images?.find((image) =>
			image.label?.toLowerCase().includes("large"),
		) ?? color?.images?.[0]
	);
}

export function getImageSource(image: CatalogImage | undefined) {
	return assetPath(image?.localPath) ?? image?.appleUrl;
}

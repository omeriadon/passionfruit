import type {
	CatalogCategory,
	CatalogCategoryConfig,
	CatalogColumn,
	CatalogDevice,
} from "./types";

function valueAt(device: CatalogDevice, path: string[]) {
	let current: unknown = device;
	for (const segment of path) {
		if (typeof current !== "object" || current === null) return null;
		current = (current as Record<string, unknown>)[segment];
	}
	return (current ?? null) as CatalogDevice[keyof CatalogDevice];
}

function column(
	id: string,
	label: string,
	path: string[],
	sortValue?: (device: CatalogDevice) => string | number,
): CatalogColumn {
	return {
		id,
		label,
		getValue: (device) => valueAt(device, path),
		sortValue,
	};
}

const sharedIdentityColumns: CatalogColumn[] = [
	column("name", "Device", ["name"], (device) => device.name),
	column("releaseYear", "Released", ["releaseYear"], (device) =>
		typeof device.releaseYear === "number" ? device.releaseYear : 0,
	),
	column("priceAud", "From", ["priceAud"], (device) =>
		typeof device.priceAud === "number" ? device.priceAud : -1,
	),
];

export const catalogConfigs: Record<CatalogCategory, CatalogCategoryConfig> = {
	airpods: {
		id: "airpods",
		label: "AirPods",
		description: "Wireless audio, from everyday earbuds to over-ear listening.",
		columns: [
			column("name", "Device", ["name"], (device) => device.name),
			column("formFactor", "Form factor", ["formFactor"]),
			column("priceAud", "From", ["priceAud"], (device) =>
				typeof device.priceAud === "number" ? device.priceAud : -1,
			),
			column("battery", "Battery", [
				"batteryAndCharging",
				"listeningTimeHours",
			]),
		],
	},
	"apple-tv": {
		id: "apple-tv",
		label: "Apple TV",
		description: "The living-room catalogue, organized by configuration.",
		columns: [
			...sharedIdentityColumns.filter((item) => item.id !== "releaseYear"),
			column("chip", "Chip", ["chip", "displayName"]),
			column("configurations", "Configurations", ["configurations"]),
		],
	},
	"apple-watch": {
		id: "apple-watch",
		label: "Apple Watch",
		description:
			"Models, cases, finishes, and the details that distinguish them.",
		columns: [
			...sharedIdentityColumns,
			column("caseSizes", "Case sizes", ["configurations"]),
			column("chip", "Chip", ["chips"]),
		],
	},
	homepod: {
		id: "homepod",
		label: "HomePod",
		description: "Room-filling speakers and their compact counterpart.",
		columns: [
			...sharedIdentityColumns,
			column("chip", "Chip", ["chips"]),
			column("speaker", "Speaker", ["audio", "speaker"]),
		],
	},
	ipad: {
		id: "ipad",
		label: "iPad",
		description:
			"The iPad family, from the portable mini to the most capable Pro.",
		columns: [
			...sharedIdentityColumns,
			column("chip", "Chip", ["chips"]),
			column("display", "Display", ["displays"]),
			column("storage", "Storage", ["storageOptions"]),
		],
	},
	iphone: {
		id: "iphone",
		label: "iPhone",
		description: "Current and historical iPhone models in one comparable view.",
		columns: [
			...sharedIdentityColumns,
			column("chip", "Chip", ["chips"]),
			column("display", "Display", ["displays"]),
			column("camera", "Camera", ["cameras"]),
		],
	},
	mac: {
		id: "mac",
		label: "Mac",
		description:
			"Portable and desktop Macs, with desktop-only fields left naturally blank.",
		columns: [
			...sharedIdentityColumns,
			column("chip", "Chip", ["chips"]),
			column("display", "Display", ["displays"]),
			column("memory", "Memory", ["memoryOptions"]),
		],
	},
	vision: {
		id: "vision",
		label: "Apple Vision Pro",
		description:
			"Spatial computing hardware and the physical details behind it.",
		columns: [
			...sharedIdentityColumns,
			column("chip", "Chip", ["chips"]),
			column("display", "Display", ["displays"]),
			column("storage", "Storage", ["storageOptions"]),
		],
	},
};

const strengthPattern = /pro max|ultra|pro|studio|max|air|plus|mini|se|base/i;

export function strengthRank(name: string) {
	const match = name.match(strengthPattern)?.[0].toLowerCase();
	if (match === "pro max" || match === "ultra" || match === "studio") return 0;
	if (match === "pro" || match === "max") return 1;
	if (match === "plus" || match === "air") return 2;
	if (match === "base") return 4;
	if (match === "mini" || match === "se") return 5;
	return 3;
}

export function sortDevices(devices: CatalogDevice[]) {
	return [...devices].sort((left, right) => {
		const releaseDifference =
			Number(right.releaseYear ?? 0) - Number(left.releaseYear ?? 0);
		if (releaseDifference !== 0) return releaseDifference;
		const strengthDifference =
			strengthRank(left.name) - strengthRank(right.name);
		if (strengthDifference !== 0) return strengthDifference;
		return left.name.localeCompare(right.name);
	});
}

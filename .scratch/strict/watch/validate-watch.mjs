import Ajv2020 from "ajv/dist/2020.js";
import AjvDraft7 from "ajv/dist/ajv.js";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = ".scratch/strict/watch";
const data = JSON.parse(readFileSync(`${root}/strict-devices.json`, "utf8"));

const authoritative = JSON.parse(
	readFileSync("public/data/ipad/ipad.schema.json", "utf8"),
);
authoritative.properties.watchDetails = {
	type: "object",
	additionalProperties: true,
};
for (const property of Object.values(authoritative.properties ?? {})) {
	if (property?.type === "array") {
		const items = Array.isArray(property.items)
			? property.items
			: [property.items];
		for (const item of items) {
			if (item?.properties) item.additionalProperties = true;
		}
	}
}

const overlay = structuredClone(authoritative);
delete overlay.properties.watchDetails;
overlay.definitions.device.required = [
	"id",
	"name",
	"family",
	"releaseYear",
	"priceAud",
	"colors",
	"chips",
	"displays",
	"cameras",
	"audio",
	"batteryAndPower",
	"connectivity",
	"authentication",
	"physical",
	"resistance",
	"software",
	"accessories",
];
overlay.definitions.device.properties = {
	...authoritative.definitions.device.properties,
	family: { type: "string" },
	releaseYear: { type: "integer" },
	chips: { type: "array", items: { type: "object" } },
	displays: { type: "array", items: { type: "object" } },
	cameras: { type: "array", items: { type: "object" } },
	audio: { type: "object" },
	batteryAndPower: { type: "object" },
	connectivity: { type: "object" },
	physical: { type: "object" },
	resistance: { type: "object" },
	software: { type: "object" },
	accessories: { type: "array" },
	authentication: {},
	watchDetails: { type: "object" },
	configurations: { type: "array" },
	storageOptions: { type: "array" },
	sourceNotes: { type: "string" },
	overviewImages: { type: "array", items: { type: "object" } },
};
overlay.definitions.device.additionalProperties = false;
overlay.definitions.color = {
	type: "object",
	required: ["id", "displayName", "swatch", "images"],
	properties: {
		id: { type: "string" },
		displayName: { type: "string" },
		swatch: {},
		images: { type: "array", items: { type: "object" } },
	},
	additionalProperties: false,
};

const authoritativeAjv = new AjvDraft7({
	allErrors: true,
	strict: false,
	allowUnionTypes: true,
});
overlay.$schema = "https://json-schema.org/draft/2020-12/schema";
const overlayAjv = new Ajv2020({
	allErrors: true,
	strict: false,
	allowUnionTypes: true,
});

let authoritativeValid;
try {
	authoritativeValid = authoritativeAjv.validate(authoritative, {
		devices: data.devices,
	});
} catch (error) {
	authoritativeValid = false;
	authoritativeAjv.errors ??= [{ message: String(error) }];
}

const overlayValid = overlayAjv.validate(overlay, { devices: data.devices });

const imageFiles = data.devices
	.flatMap((device) => [
		...device.overviewImages,
		...device.colors.flatMap((color) => color.images),
	])
	.map((image) => ({
		...image,
		file: `${root}/${image.localPath}`,
	}));

const auditRows = [];
for (const image of imageFiles) {
	if (!existsSync(image.file)) throw new Error(`Missing image: ${image.file}`);
	const metadata = Object.fromEntries(
		execFileSync(
			"sips",
			["-g", "pixelWidth", "-g", "pixelHeight", "-g", "format", image.file],
			{ encoding: "utf8" },
		)
			.trim()
			.split("\n")
			.slice(1)
			.map((line) => line.split(": ").map((value) => value.trim())),
	);
	const bytes = readFileSync(image.file);
	auditRows.push({
		localPath: image.localPath,
		appleUrl: image.appleUrl,
		mimeType:
			metadata.format === "jpeg" ? "image/jpeg" : `image/${metadata.format}`,
		widthPx: Number(metadata.pixelWidth),
		heightPx: Number(metadata.pixelHeight),
		expectedWidthPx: image.widthPx,
		expectedHeightPx: image.heightPx,
		byteCount: bytes.byteLength,
		sha256: createHash("sha256").update(bytes).digest("hex"),
	});
}

const referencedFiles = new Set(
	auditRows.map((row) => basename(row.localPath)),
);
const stagedFiles = readdirSync(`${root}/images`).filter((filename) =>
	filename.endsWith(".jpg"),
);
const unreferencedFiles = stagedFiles.filter(
	(filename) => !referencedFiles.has(filename),
);

console.log(
	JSON.stringify(
		{
			deviceCount: data.devices.length,
			colorCount: data.devices.reduce(
				(sum, device) => sum + device.colors.length,
				0,
			),
			referencedImageCount: auditRows.length,
			stagedImageCount: 136,
			stagedImageFileCount: stagedFiles.length,
			unreferencedStagedImageCount: unreferencedFiles.length,
			overlayValidation: {
				valid: Boolean(overlayValid),
				errors: overlayValid ? [] : overlayAjv.errors,
			},
			authoritativeValidation: {
				valid: Boolean(authoritativeValid),
				errors: authoritativeValid ? [] : authoritativeAjv.errors,
			},
			auditRows,
		},
		null,
		"\t",
	),
);

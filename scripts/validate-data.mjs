import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";

const datasets = [
	...[
		"airpods",
		"apple-tv",
		"apple-watch",
		"homepod",
		"ipad",
		"iphone",
		"mac",
		"vision",
	].map((section) => ({
		section,
		dataPath: `public/data/${section}/${section}.json`,
		schemaPath: `public/data/${section}/${section}.schema.json`,
		collectionKey: "devices",
	})),
	{ section: "apple-pencil", dataPath: "public/data/other/apple-pencil/apple-pencil.json", schemaPath: "public/data/other/apple-pencil/apple-pencil.schema.json", collectionKey: "accessories" },
	{ section: "magic-keyboard", dataPath: "public/data/other/magic-keyboard/magic-keyboard.json", schemaPath: "public/data/other/magic-keyboard/magic-keyboard.schema.json", collectionKey: "accessories" },
	{ section: "airtag", dataPath: "public/data/other/airtag/airtag.json", schemaPath: "public/data/other/airtag/airtag.schema.json", collectionKey: "products" },
	{ section: "apple-display", dataPath: "public/data/other/apple-display/apple-display.json", schemaPath: "public/data/other/apple-display/apple-display.schema.json", collectionKey: "products" },
];

const resolveLocalPath = (value) =>
	value.startsWith("/data/") ? `public${value}` : value;

const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
ajv.addFormat("uri", (value) => {
	try {
		new URL(value);
		return true;
	} catch {}
	return /^[a-z][a-z0-9+.-]*:/i.test(value);
});

const report = {
	draft: "Draft 2020-12",
	datasets: [],
	totalDevices: 0,
	totalAccessories: 0,
	totalProducts: 0,
	imageReferences: 0,
	invalidImageReferences: [],
};

for (const dataset of datasets) {
	const schemaBuffer = readFileSync(dataset.schemaPath);
	const data = JSON.parse(readFileSync(dataset.dataPath));
	const schema = JSON.parse(schemaBuffer);
	const validate = ajv.compile(schema);
	const valid = validate(data);
	const refs = [];
	const walk = (value) => {
		if (Array.isArray(value)) return value.forEach(walk);
		if (!value || typeof value !== "object") return;
		if (typeof value.localPath === "string") refs.push(value);
		Object.values(value).forEach(walk);
	};
	walk(data);
	for (const ref of refs) {
		const resolved = resolveLocalPath(ref.localPath);
		if (!existsSync(resolved)) {
			report.invalidImageReferences.push({ section: dataset.section, path: ref.localPath, reason: "missing" });
		} else if (statSync(resolved).size === 0) {
			report.invalidImageReferences.push({ section: dataset.section, path: ref.localPath, reason: "empty" });
		}
	}
	const records = data[dataset.collectionKey].length;
	report.datasets.push({
		section: dataset.section,
		collectionKey: dataset.collectionKey,
		records,
		schemaSha256: createHash("sha256").update(schemaBuffer).digest("hex"),
		imageReferences: refs.length,
		valid,
		errorCount: valid ? 0 : validate.errors.length,
		errors: valid ? [] : validate.errors,
	});
	if (dataset.collectionKey === "devices") report.totalDevices += records;
	if (dataset.collectionKey === "accessories") report.totalAccessories += records;
	if (dataset.collectionKey === "products") report.totalProducts += records;
	report.imageReferences += refs.length;
}

writeFileSync(".scratch/merge-audits/final-validation-report.json", `${JSON.stringify(report, null, "\t")}\n`);
console.log(JSON.stringify({ ...report, allValid: report.datasets.every((dataset) => dataset.valid) && report.invalidImageReferences.length === 0 }, null, 2));

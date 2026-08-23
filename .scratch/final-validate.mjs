import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import Ajv2020 from "ajv/dist/2020.js";

const schemaPath = ".scratch/strict/data-model-contract.schema.json";
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({
	allErrors: true,
	strict: true,
	allowUnionTypes: true,
});
ajv.addFormat("uri", (value) => {
	try {
		new URL(value);
		return true;
	} catch {}
	return /^[a-z][a-z0-9+.-]*:/i.test(value);
});
const validate = ajv.compile(schema);
const sections = [
	"airpods",
	"apple-tv",
	"apple-watch",
	"homepod",
	"ipad",
	"iphone",
	"mac",
	"vision",
];
const report = {
	schemaSha256: createHash("sha256")
		.update(readFileSync(schemaPath))
		.digest("hex"),
	draft: "Draft 2020-12",
	sections: [],
	totalDevices: 0,
	imageReferences: 0,
	invalidImageReferences: [],
};
for (const section of sections) {
	const path = `public/data/${section}/${section}.json`;
	const data = JSON.parse(readFileSync(path));
	const valid = validate(data);
	const refs = [];
	(function walk(x) {
		if (Array.isArray(x)) return x.forEach(walk);
		if (x && typeof x === "object") {
			if (typeof x.localPath === "string") refs.push(x);
			Object.values(x).forEach(walk);
		}
	})(data);
	for (const ref of refs) {
		if (!existsSync(ref.localPath))
			report.invalidImageReferences.push({
				section,
				path: ref.localPath,
				reason: "missing",
			});
		else {
			const size = statSync(ref.localPath).size;
			const hash = createHash("sha256")
				.update(readFileSync(ref.localPath))
				.digest("hex");
			if (size === 0)
				report.invalidImageReferences.push({
					section,
					path: ref.localPath,
					reason: "empty",
				});
			ref.__sha256 = hash;
		}
	}
	report.sections.push({
		section,
		devices: data.devices.length,
		imageReferences: refs.length,
		valid,
		errorCount: valid ? 0 : validate.errors.length,
	});
	report.totalDevices += data.devices.length;
	report.imageReferences += refs.length;
}
writeFileSync(
	".scratch/merge-audits/final-validation-report.json",
	JSON.stringify(report, null, "\t") + "\n",
);
console.log(
	JSON.stringify(
		{
			totalDevices: report.totalDevices,
			targetDevices: 158,
			imageReferences: report.imageReferences,
			invalidImageReferences: report.invalidImageReferences.length,
			sections: report.sections,
		},
		null,
		2,
	),
);

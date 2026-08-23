import { readFileSync, writeFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";

const schema = JSON.parse(
	readFileSync(".scratch/strict/data-model-contract.schema.json", "utf8"),
);
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

const merges = [
	[
		"public/data/apple-watch/apple-watch.json",
		".scratch/strict/apple-watch/remaining-devices.json",
	],
	["public/data/ipad/ipad.json", ".scratch/strict/ipad/remaining-devices.json"],
	[
		"public/data/iphone/iphone.json",
		".scratch/strict/iphone/remaining-devices.json",
	],
	["public/data/mac/mac.json", ".scratch/strict/mac/remaining-devices.json"],
];

const audit = [];
for (const [canonicalPath, candidatePath] of merges) {
	const canonical = JSON.parse(readFileSync(canonicalPath, "utf8"));
	const candidate = JSON.parse(readFileSync(candidatePath, "utf8"));
	const before = canonical.devices.length;
	const existingIds = new Set(canonical.devices.map((device) => device.id));
	const existingNames = new Set(canonical.devices.map((device) => device.name));
	const additions = candidate.devices.filter(
		(device) => !existingIds.has(device.id) && !existingNames.has(device.name),
	);
	canonical.devices.push(...additions);
	if (!validate(canonical)) {
		console.error(`${canonicalPath} validation failed`, validate.errors);
		process.exit(1);
	}
	writeFileSync(canonicalPath, JSON.stringify(canonical, null, "\t") + "\n");
	audit.push({
		canonicalPath,
		candidatePath,
		before,
		added: additions.length,
		after: canonical.devices.length,
	});
}
writeFileSync(
	".scratch/merge-audits/final-merge-audit.json",
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			schemaSha256: (await import("node:crypto"))
				.createHash("sha256")
				.update(readFileSync(".scratch/strict/data-model-contract.schema.json"))
				.digest("hex"),
			targetDevices: 158,
			merges: audit,
		},
		null,
		"\t",
	) + "\n",
);
console.log(JSON.stringify(audit, null, 2));

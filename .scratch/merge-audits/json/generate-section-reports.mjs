import { createHash } from "node:crypto";
import {
	appendFileSync,
	existsSync,
	readFileSync,
	writeFileSync,
} from "node:fs";

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
const heartbeatPath = ".scratch/heartbeats/Bohr.log";

function heartbeat(section) {
	appendFileSync(
		heartbeatPath,
		`${new Date().toISOString()} section report ${section}\n`,
	);
}

function sha256(value) {
	return createHash("sha256").update(value).digest("hex");
}

function countMatches(value, predicate) {
	let total = 0;
	const visit = (item) => {
		if (!item || typeof item !== "object") return;
		if (Array.isArray(item)) {
			item.forEach(visit);
			return;
		}
		if (predicate(item)) total += 1;
		Object.values(item).forEach(visit);
	};
	visit(value);
	return total;
}

const validation = JSON.parse(
	readFileSync(".scratch/merge-audits/json/canonical-validation.json", "utf8"),
);
const images = JSON.parse(
	readFileSync(".scratch/merge-audits/json/image-integrity.json", "utf8"),
);

for (const section of sections) {
	heartbeat(section);
	const data = JSON.parse(
		readFileSync(`public/data/${section}/${section}.json`, "utf8"),
	);
	const schemaText = readFileSync(
		`public/data/${section}/${section}.schema.json`,
	);
	const sectionValidation = validation.sections.find(
		(item) => item.section === section,
	);
	const sectionImages = images.sections[section];
	const sourceAvailable = existsSync(
		`.scratch/strict/${section === "apple-watch" ? "watch" : section}`,
	);
	const report = {
		generatedAt: new Date().toISOString(),
		section,
		deviceCount: sectionValidation.deviceCount,
		schemaDraft202012:
			JSON.parse(schemaText).$schema ===
			"https://json-schema.org/draft/2020-12/schema",
		authoritativeSchemaSha256: sha256(schemaText),
		ajv: {
			validator: validation.validator,
			valid: sectionValidation.valid,
			errorCount: sectionValidation.errorCount,
			errors: sectionValidation.errors,
		},
		integrity: {
			imageReferences: sectionImages.referenceCount,
			validImageReferences: sectionImages.validCount,
			invalidPaths: sectionImages.invalidCount,
			dimensionMismatches: sectionImages.issues.filter(
				(issue) => issue.kind === "dimension-mismatch",
			).length,
			byteComparedReferences: sectionImages.byteComparedCount,
			byteMismatches: sectionImages.byteMismatchCount,
			strictSourceAvailable: sectionImages.strictSourceAvailable,
		},
		contentCounts: {
			structuredNullObjects: countMatches(
				data,
				(object) =>
					"value" in object &&
					object.value === null &&
					Object.keys(object).some((key) => key !== "value"),
			),
			sourceNotes: countMatches(
				data,
				(object) =>
					("source" in object && typeof object.source === "string") ||
					"sourceNote" in object ||
					"notes" in object,
			),
		},
	};
	writeFileSync(
		`.scratch/merge-audits/json/${section}.report.json`,
		`${JSON.stringify(report, null, 2)}\n`,
	);
}

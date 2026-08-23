import { createHash } from "node:crypto";
import {
	appendFileSync,
	existsSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const heartbeatPath = ".scratch/heartbeats/Bohr.log";
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
const canonicalData = Object.fromEntries(
	sections.map((section) => [
		section,
		`public/data/${section}/${section}.json`,
	]),
);
const strictSources = {
	airpods: ".scratch/strict/airpods/strict-devices.json",
	"apple-tv": ".scratch/strict/apple-tv/apple-tv.devices.json",
	"apple-watch": ".scratch/strict/watch/strict-devices.json",
	homepod: ".scratch/strict/homepod/strict-devices.json",
	ipad: ".scratch/strict/ipad/strict-devices.json",
	iphone: ".scratch/strict/iphone/strict-devices.json",
	mac: ".scratch/strict/mac/strict-devices.json",
	vision: ".scratch/strict/vision/strict-devices.json",
};

function heartbeat() {
	appendFileSync(
		heartbeatPath,
		`${new Date().toISOString()} image integrity audit\n`,
	);
}

function sha256(path) {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function dimensions(path) {
	const output = execFileSync(
		"/usr/bin/sips",
		["-g", "pixelWidth", "-g", "pixelHeight", path],
		{ encoding: "utf8" },
	);
	const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
	const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);
	if (!Number.isInteger(width) || !Number.isInteger(height))
		throw new Error(`Cannot parse dimensions: ${path}`);
	return { width, height };
}

function collectImages(value) {
	if (!value || typeof value !== "object") return [];
	if (Array.isArray(value)) return value.flatMap(collectImages);
	return Object.entries(value).flatMap(([key, child]) => {
		if (key === "localPath" && typeof child === "string") {
			const image = { ...value };
			delete image[key];
			image.localPath = child;
			return [image];
		}
		return collectImages(child);
	});
}

const report = {
	generatedAt: new Date().toISOString(),
	totalReferences: 0,
	validReferences: 0,
	invalidReferences: 0,
	byteComparedReferences: 0,
	byteMismatchReferences: 0,
	missingStrictSources: 0,
	dimensionMismatches: [],
	invalidPaths: [],
	sections: {},
};

for (const section of sections) {
	heartbeat();
	const canonicalPath = canonicalData[section];
	const canonical = JSON.parse(readFileSync(canonicalPath, "utf8"));
	const references = collectImages(canonical.devices);
	const strictPath = strictSources[section];
	const strictAvailable = existsSync(strictPath);
	const strictImages = new Map();
	if (strictAvailable) {
		const strict = JSON.parse(readFileSync(strictPath, "utf8"));
		for (const rawImage of collectImages(strict.devices ?? strict)) {
			const image = {
				label: rawImage.label,
				appleUrl: rawImage.appleUrl ?? rawImage.url,
				localPath: rawImage.localPath,
				widthPx: rawImage.widthPx ?? rawImage.width,
				heightPx: rawImage.heightPx ?? rawImage.height,
			};
			if (image.localPath) strictImages.set(image.localPath, image);
		}
	}

	const sectionReport = {
		canonicalData: canonicalPath,
		strictSource: strictPath,
		strictSourceAvailable: strictAvailable,
		referenceCount: references.length,
		uniqueReferencedPaths: [
			...new Set(references.map((item) => item.localPath)),
		].length,
		validCount: 0,
		invalidCount: 0,
		byteComparedCount: 0,
		byteMatchCount: 0,
		byteMismatchCount: 0,
		missingStrictSourceCount: 0,
		issues: [],
	};

	references.forEach((reference, index) => {
		report.totalReferences += 1;
		const expectedPrefix = `public/data/${section}/images/`;
		let issue = null;
		if (!reference.localPath.startsWith(expectedPrefix))
			issue = { kind: "wrong-path-prefix", ...reference };

		const absolutePath = join(process.cwd(), reference.localPath);
		if (!issue && !existsSync(absolutePath))
			issue = { kind: "missing-file", ...reference };

		if (!issue) {
			const actual = dimensions(absolutePath);
			if (
				!Number.isInteger(reference.widthPx) ||
				!Number.isInteger(reference.heightPx) ||
				actual.width !== reference.widthPx ||
				actual.height !== reference.heightPx
			) {
				report.dimensionMismatches.push({
					section,
					path: reference.localPath,
					declaredWidthPx: reference.widthPx ?? null,
					declaredHeightPx: reference.heightPx ?? null,
					actualWidth: actual.width,
					actualHeight: actual.height,
				});
				sectionReport.issues.push({
					kind: "dimension-mismatch",
					...report.dimensionMismatches.at(-1),
				});
			}
		}

		if (strictAvailable && strictImages.has(reference.localPath)) {
			const sourcePath = join(
				process.cwd(),
				strictImages.get(reference.localPath).localPath,
			);
			if (!existsSync(sourcePath)) {
				report.missingStrictSources += 1;
				sectionReport.missingStrictSourceCount += 1;
			} else {
				report.byteComparedReferences += 1;
				sectionReport.byteComparedCount += 1;
				const canonicalHash = sha256(absolutePath);
				const sourceHash = sha256(sourcePath);
				if (canonicalHash === sourceHash) {
					sectionReport.byteMatchCount += 1;
				} else {
					report.byteMismatchReferences += 1;
					sectionReport.byteMismatchCount += 1;
					sectionReport.issues.push({
						kind: "byte-mismatch",
						path: reference.localPath,
						canonicalSha256: canonicalHash,
						sourceSha256: sourceHash,
					});
				}
			}
		} else if (strictAvailable) {
			report.missingStrictSources += 1;
			sectionReport.missingStrictSourceCount += 1;
		}

		if (issue) {
			report.invalidPaths.push({ section, ...issue });
			report.invalidReferences += 1;
			sectionReport.invalidCount += 1;
		} else {
			report.validReferences += 1;
			sectionReport.validCount += 1;
		}
		if (index % 25 === 0) heartbeat();
	});

	report.sections[section] = sectionReport;
}

writeFileSync(
	".scratch/merge-audits/json/image-integrity.json",
	`${JSON.stringify(report, null, 2)}\n`,
);
console.log(
	JSON.stringify(
		{
			generatedAt: report.generatedAt,
			totalReferences: report.totalReferences,
			validReferences: report.validReferences,
			invalidReferences: report.invalidReferences,
			byteComparedReferences: report.byteComparedReferences,
			byteMismatchReferences: report.byteMismatchReferences,
			missingStrictSources: report.missingStrictSources,
			dimensionMismatches: report.dimensionMismatches.length,
		},
		null,
		2,
	),
);

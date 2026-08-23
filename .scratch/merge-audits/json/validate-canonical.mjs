import Ajv2020 from "ajv/dist/2020.js";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

function heartbeat(message) {
	appendFileSync(heartbeatPath, `${new Date().toISOString()} ${message}\n`);
}

const schema = JSON.parse(
	readFileSync(".scratch/strict/data-model-contract.schema.json", "utf8"),
);
const ajv = new Ajv2020({
	allErrors: true,
	strict: false,
	allowUnionTypes: true,
});
const validate = ajv.compile(schema);
const report = {
	generatedAt: new Date().toISOString(),
	validator: "Ajv Draft 2020-12",
	strictMode: false,
	allErrors: true,
	formatValidation: "disabled because ajv-formats is absent",
	totalDevices: 0,
	sections: [],
};

heartbeat("canonical Ajv validation started");
for (const section of sections) {
	heartbeat(`validating ${section}`);
	const instance = JSON.parse(
		readFileSync(join("public/data", section, `${section}.json`), "utf8"),
	);
	const valid = validate(instance);
	const deviceCount = Array.isArray(instance.devices)
		? instance.devices.length
		: 0;
	report.totalDevices += deviceCount;
	report.sections.push({
		section,
		dataPath: join("public/data", section, `${section}.json`),
		schemaPath: join("public/data", section, `${section}.schema.json`),
		valid,
		errorCount: valid ? 0 : validate.errors.length,
		errors: valid ? [] : validate.errors,
		deviceCount,
	});
}
heartbeat("canonical Ajv validation finished");

report.validSections = report.sections.filter((item) => item.valid).length;
report.invalidSections = report.sections.length - report.validSections;
report.totalErrors = report.sections.reduce(
	(sum, item) => sum + item.errorCount,
	0,
);
writeFileSync(
	".scratch/merge-audits/json/canonical-validation.json",
	`${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));

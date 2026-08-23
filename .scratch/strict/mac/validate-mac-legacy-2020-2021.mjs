import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Ajv = require("ajv/dist/2020.js");
import fs from "node:fs";

const schemaPath = ".scratch/strict/data-model-contract.schema.json";
const candidatePath = ".scratch/strict/mac/mac-legacy-2020-2021.json";
const reportPath = ".scratch/strict/mac/mac-legacy-2020-2021.validation.json";

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
const ajv = new Ajv({
	allErrors: true,
	allowUnionTypes: true,
	strict: true,
});
ajv.addFormat("uri", {
	validate: () => true,
});
const validate = ajv.compile(schema);
const valid = validate(data);
const result = {
	schema: schemaPath,
	candidate: candidatePath,
	draft: "Draft 2020-12",
	deviceCount: data.devices.length,
	valid,
	errorCount: valid ? 0 : validate.errors.length,
	errors: valid ? [] : structuredClone(validate.errors),
};
fs.writeFileSync(reportPath, JSON.stringify(result, null, "\t") + "\n");
console.log(JSON.stringify(result, null, "\t"));
process.exitCode = valid ? 0 : 1;

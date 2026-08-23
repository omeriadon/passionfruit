import { readFileSync, writeFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
const schemaPath = ".scratch/strict/data-model-contract.schema.json";
const dataPath = ".scratch/strict/iphone/remaining-devices.json";
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const data = JSON.parse(readFileSync(dataPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.opts.validateFormats = false;
const validate = ajv.compile(schema);
const valid = validate(data);
writeFileSync(
	".scratch/strict/iphone/validation-remaining.json",
	`${JSON.stringify({ schemaPath, dataPath, draft: "Draft 2020-12", valid: Boolean(valid), errorCount: validate.errors?.length ?? 0, errors: validate.errors ?? [] }, null, "\t")}\n`,
);
if (!valid) {
	console.error(ajv.errorsText(validate.errors));
	process.exit(1);
}
console.log("VALID");

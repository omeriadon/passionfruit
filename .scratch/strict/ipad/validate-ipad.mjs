import { readFileSync, writeFileSync } from "node:fs";

import Ajv2020 from "ajv/dist/2020.js";

const schemaPath = new URL(
	"./data-model-contract.schema.json",
	import.meta.url,
);
const dataPath = new URL("./strict-devices.merge-ready.json", import.meta.url);
const outputPath = new URL("./validation-v2-final.json", import.meta.url);

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const data = JSON.parse(readFileSync(dataPath, "utf8"));

const ajv = new Ajv2020({
	allErrors: true,
	strict: false,
});
ajv.opts.validateFormats = false;

const validate = ajv.compile(schema);
const valid = validate(data);

writeFileSync(
	outputPath,
	`${JSON.stringify(
		{
			schema: schemaPath.pathname,
			data: dataPath.pathname,
			draft: "Draft 2020-12",
			valid: Boolean(valid),
			errorCount: validate.errors?.length ?? 0,
			errors: validate.errors ?? [],
		},
		null,
		"\t",
	)}\n`,
);

if (!valid) {
	console.error(JSON.stringify(validate.errors, null, "\t"));
	process.exit(1);
}

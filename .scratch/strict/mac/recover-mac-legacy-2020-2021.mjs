import fs from "node:fs";

const path = ".scratch/strict/mac/mac-legacy-2020-2021.json";
const source = fs.readFileSync(path, "utf8");
const devices = [];
let depth = 0;
let start = -1;

for (let index = 0; index < source.length; index += 1) {
	const character = source[index];
	if (start === -1 && /^\t\t\{/.test(source.slice(index))) {
		start = index;
		continue;
	}
	if (start !== -1) {
		if (character === "{") depth += 1;
		if (character === "}") {
			depth -= 1;
			if (depth === 0) {
				devices.push(JSON.parse(source.slice(start, index + 1)));
				start = -1;
				depth = 0;
			}
		}
	}

	if (devices.length !== 3) {
		throw new Error(`Expected three devices, recovered ${devices.length}`);
	}
}

fs.writeFileSync(path, `${JSON.stringify({ devices }, null, "\t")}\n`);

const baseUrl = process.env.CATALOG_BASE_URL ?? "http://localhost:3000";

const checks = [
	{
		path: "/docs/mac/macbook-air-13-in-m5",
		marker: 'id="macbook-air-13-in-m5-title"',
		absent: ['id="mac-table-title"', 'id="mac-models-title"'],
	},
	{
		path: "/docs/ipad/ipad-pro-13-m5",
		marker: 'id="ipad-pro-13-m5-title"',
		absent: ['id="ipad-table-title"', 'id="ipad-models-title"'],
	},
	{
		path: "/docs/ipad/accessories/apple-pencil/apple-pencil-pro",
		marker: 'id="apple-pencil-pro-title"',
		absent: ["Open details"],
	},
	{
		path: "/docs/mac",
		marker: 'id="mac-table-title"',
		absent: ['id="macbook-air-13-in-m5-title"'],
	},
	{
		path: "/docs/ipad/accessories/apple-pencil",
		marker: "Open details",
	},
	{
		path: "/docs/other/apple-display",
		marker: "Open details",
	},
	{
		path: "/docs/other/apple-display/studio-display-2026",
		marker: 'aria-labelledby="apple-display-title"',
		absent: ["Open details"],
	},
];

for (const check of checks) {
	const response = await fetch(`${baseUrl}${check.path}`);
	const html = await response.text();
	if (!response.ok || !html.includes(check.marker)) {
		throw new Error(`Expected ${check.path} to render ${check.marker}`);
	}
	for (const absent of check.absent ?? []) {
		if (html.includes(absent)) {
			throw new Error(`Expected ${check.path} to omit ${absent}`);
		}
	}
	console.log(`PASS ${check.path}`);
}

const invalid = await fetch(`${baseUrl}/docs/mac/not-a-real-device`);
if (invalid.status !== 404) {
	throw new Error(
		`Expected invalid device to return 404, got ${invalid.status}`,
	);
}
console.log("PASS /docs/mac/not-a-real-device -> 404");

const baseUrl = process.env.CATALOG_BASE_URL ?? "http://localhost:3000";

const checks = [
	{
		path: "/docs/mac/macbook-air-13-in-m5",
		marker: 'id="macbook-air-13-in-m5-title"',
	},
	{
		path: "/docs/ipad/ipad-pro-13-m5",
		marker: 'id="ipad-pro-13-m5-title"',
	},
	{
		path: "/docs/ipad/accessories/apple-pencil/apple-pencil-pro",
		marker: 'id="apple-pencil-pro-title"',
	},
	{
		path: "/docs/mac",
		marker: 'id="mac-table-title"',
		absent: 'id="macbook-air-13-in-m5-title"',
	},
];

for (const check of checks) {
	const response = await fetch(`${baseUrl}${check.path}`);
	const html = await response.text();
	if (!response.ok || !html.includes(check.marker)) {
		throw new Error(`Expected ${check.path} to render ${check.marker}`);
	}
	if (check.absent && html.includes(check.absent)) {
		throw new Error(`Expected ${check.path} to omit ${check.absent}`);
	}
	console.log(`PASS ${check.path}`);
}

const invalid = await fetch(`${baseUrl}/docs/mac/not-a-real-device`);
if (invalid.status !== 404) {
	throw new Error(`Expected invalid device to return 404, got ${invalid.status}`);
}
console.log("PASS /docs/mac/not-a-real-device -> 404");

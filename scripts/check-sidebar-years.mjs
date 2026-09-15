import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const baseUrl = process.env.CATALOG_BASE_URL ?? "http://localhost:3000";
for (const category of ["iphone", "ipad", "mac", "apple-watch"]) {
	const { devices } = JSON.parse(
		readFileSync(
			new URL(`../public/data/${category}/${category}.json`, import.meta.url),
			"utf8",
		),
	);
	const years = new Set(
		devices.map((device) =>
			Number.isFinite(device.releaseYear) ? device.releaseYear : null,
		),
	);
	const response = await fetch(`${baseUrl}/docs/${category}`);
	assert.ok(response.ok, `${category} page loads`);
	const sidebar = (await response.text()).match(
		/<aside id="nd-sidebar"[\s\S]*?<\/aside>/,
	)?.[0];
	assert.ok(sidebar, `${category} sidebar renders`);
	assert.equal(
		(sidebar.match(/data-year-start="true"/g) ?? []).length,
		years.size - 1,
		`${category} has exactly one spacer between each release year`,
	);
}
console.log("sidebar release-year checks passed");

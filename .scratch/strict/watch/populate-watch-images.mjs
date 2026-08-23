import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const root = ".scratch/strict/watch";
const path = `${root}/strict-devices.json`;
const data = JSON.parse(readFileSync(path, "utf8"));
const filenames = readdirSync(`${root}/images`).sort();

function labelFor(filename) {
	if (filename.includes("--all-models-watch-")) return "Model overview";
	const size = filename.endsWith("-large-2x.jpg")
		? "large 2x"
		: filename.endsWith("-large.jpg")
			? "large"
			: filename.endsWith("-small-2x.jpg")
				? "small 2x"
				: "small";
	return `${size}`;
}

function overviewReference(device, filename) {
	const [base, variant] = filename
		.replace(/\.jpg$/u, "")
		.split(/--(?=[a-z0-9]{12}-)/);
	const metadataOutput = execFileSync(
		"sips",
		["-g", "pixelWidth", "-g", "pixelHeight", `${root}/images/${filename}`],
		{ encoding: "utf8" },
	);
	const metadata = Object.fromEntries(
		metadataOutput
			.trim()
			.split("\n")
			.slice(1)
			.map((line) => line.split(": ").map((value) => value.trim())),
	);
	const token = variant.split("-")[0];
	return {
		label: "Model overview",
		appleUrl: `https://www.apple.com/v/watch/compare/ah/images/overview/${base
			.replace(/^all-models-/, "all_models_")
			.replaceAll(
				"-",
				"_",
			)}__${token}_${variant.split("-").slice(1).join("_")}.jpg`,
		localPath: `images/${filename}`,
		widthPx: Number(metadata.pixelWidth),
		heightPx: Number(metadata.pixelHeight),
	};
}

function deviceSlug(deviceId) {
	return deviceId.replace(/^apple-watch-/, "watch-");
}

function colorSlug(colorId) {
	return {
		"midnight-aluminium": "aluminum-midnight",
		"starlight-aluminium": "aluminum-starlight",
		"silver-aluminium": "aluminum-silver",
		"space-grey-aluminium": "aluminum-space-gray",
		"jet-black-aluminium": "aluminum-jet-black",
		"rose-gold-aluminium": "aluminum-rose-gold",
		"brushed-gold-aluminium": "aluminum-brush-gold",
		"black-titanium": "titanium-black",
		"natural-titanium": "titanium-natural",
		"gold-titanium": "titanium-gold",
		"slate-titanium": "titanium-slate",
	}[colorId];
}

for (const device of data.devices) {
	device.overviewImages = readdirSync(`${root}/images`)
		.filter((filename) =>
			filename.startsWith(`all-models-${deviceSlug(device.id)}--`),
		)
		.map((filename) => overviewReference(device, filename));
	for (const color of device.colors) {
		const candidates = filenames.filter((filename) =>
			filename.startsWith(
				`compare-${deviceSlug(device.id)}-${colorSlug(color.id)}--`,
			),
		);
		color.images = candidates.map((filename) => {
			const [base, variant] = filename
				.replace(/\.jpg$/u, "")
				.split(/--(?=[a-z0-9]{12}-)/);
			const metadataOutput = execFileSync(
				"sips",
				["-g", "pixelWidth", "-g", "pixelHeight", `${root}/images/${filename}`],
				{ encoding: "utf8" },
			);
			const metadata = Object.fromEntries(
				metadataOutput
					.trim()
					.split("\n")
					.slice(1)
					.map((line) => line.split(": ").map((value) => value.trim())),
			);
			const token = variant.split("-")[0];
			return {
				label: labelFor(filename),
				appleUrl: `https://www.apple.com/v/watch/compare/ah/images/overview/${base
					.replace(/^compare-/, "compare_")
					.replaceAll(
						"-",
						"_",
					)}__${token}_${variant.split("-").slice(1).join("_")}.jpg`,
				localPath: `images/${filename}`,
				widthPx: Number(metadata.pixelWidth),
				heightPx: Number(metadata.pixelHeight),
			};
		});
	}
}

writeFileSync(path, `${JSON.stringify(data, null, "\t")}\n`);

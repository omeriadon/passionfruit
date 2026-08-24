import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const deviceNoteStatuses = ["yes", "no", "caution", "unknown"] as const;

export type DeviceNoteStatus = (typeof deviceNoteStatuses)[number];
export type DeviceNote = {
	category: string;
	deviceId: string;
	goodToBuy: DeviceNoteStatus;
	editorial: string;
	tags: string[];
};

const defaultEditorial = "No editorial note has been authored yet.";
const notesRoot = join(process.cwd(), "content", "device-notes");

export const defaultDeviceNote = (
	category: string,
	deviceId: string,
): DeviceNote => ({
	category,
	deviceId,
	goodToBuy: "unknown",
	editorial: defaultEditorial,
	tags: [],
});

function parseFrontmatter(source: string): Record<string, string | string[]> {
	if (!source.startsWith("---\n")) return {};
	const end = source.indexOf("\n---", 4);
	if (end < 0) return {};
	const result: Record<string, string | string[]> = {};
	for (const line of source.slice(4, end).split("\n")) {
		const separator = line.indexOf(":");
		if (separator < 0) continue;
		const key = line.slice(0, separator).trim();
		const raw = line.slice(separator + 1).trim();
		if (key === "tags") {
			try {
				const parsed: unknown = JSON.parse(raw || "[]");
				if (
					Array.isArray(parsed) &&
					parsed.every((tag) => typeof tag === "string")
				)
					result.tags = parsed;
			} catch {
				result.tags = [];
			}
			continue;
		}
		result[key] = raw.replace(/^(["'])(.*)\1$/, "$2");
	}
	return result;
}

function isDeviceNoteStatus(value: unknown): value is DeviceNoteStatus {
	return (
		typeof value === "string" &&
		deviceNoteStatuses.includes(value as DeviceNoteStatus)
	);
}

export function getDeviceNote(category: string, deviceId: string): DeviceNote {
	const fallback = defaultDeviceNote(category, deviceId);
	const filePath = join(notesRoot, category, deviceId + ".md");
	if (!existsSync(filePath)) return fallback;
	try {
		const frontmatter = parseFrontmatter(readFileSync(filePath, "utf8"));
		return {
			...fallback,
			goodToBuy: isDeviceNoteStatus(frontmatter.goodToBuy)
				? frontmatter.goodToBuy
				: fallback.goodToBuy,
			editorial:
				typeof frontmatter.editorial === "string" &&
				frontmatter.editorial.trim()
					? frontmatter.editorial.trim()
					: fallback.editorial,
			tags: Array.isArray(frontmatter.tags)
				? frontmatter.tags.filter((tag) => tag.trim().length > 0)
				: fallback.tags,
		};
	} catch {
		return fallback;
	}
}

export function getDeviceNotes(
	category: string,
	deviceIds: string[],
): DeviceNote[] {
	return deviceIds.map((deviceId) => getDeviceNote(category, deviceId));
}

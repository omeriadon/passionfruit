import { NextResponse } from "next/server";
import { bookmarksApiUrl, type Bookmark, type OwnedDevice } from "@/lib/auth/api";
import { getBookmarkedDevice } from "@/lib/source";

export type EnrichedDeviceEntry = {
	category: string;
	deviceId: string;
	createdAt: string | null;
	name: string | null;
	priceAud: number | null;
	href: string | null;
};

/**
 * Enriched owned + bookmarked devices for the `/you` section. The 1.2MB
 * catalogue JSON stays server-side — the client only ever receives this slim
 * payload. Responses are never cached: both lists are per-user and change on
 * every toggle.
 */
export async function GET(request: Request) {
	const authorization = request.headers.get("authorization");
	if (!authorization) {
		return NextResponse.json(
			{ error: "Missing credentials." },
			{ status: 401 },
		);
	}

	const headers = { authorization };
	const [bookmarksRes, ownedRes] = await Promise.all([
		fetch(`${bookmarksApiUrl}/api/v1/bookmarks`, {
			headers,
			cache: "no-store",
		}).catch(() => null),
		fetch(`${bookmarksApiUrl}/api/v1/owned`, { headers, cache: "no-store" }).catch(
			() => null,
		),
	]);
	// A dead token must still surface as 401 so the client can sign out.
	// Any other failure degrades to an empty list, never a logout.
	if (bookmarksRes?.status === 401 && ownedRes?.status === 401) {
		return NextResponse.json({ error: "Invalid session." }, { status: 401 });
	}

	async function readList(
		response: Response | null,
		key: "bookmarks",
	): Promise<Bookmark[]>;
	async function readList(
		response: Response | null,
		key: "owned",
	): Promise<OwnedDevice[]>;
	async function readList(response: Response | null, key: string) {
		if (!response || !response.ok) return [];
		try {
			const payload = (await response.json()) as Record<string, unknown>;
			const list = payload[key];
			return Array.isArray(list) ? list : [];
		} catch {
			return [];
		}
	}

	const [bookmarks, owned] = await Promise.all([
		readList(bookmarksRes, "bookmarks"),
		readList(ownedRes, "owned"),
	]);

	return NextResponse.json(
		{ owned: owned.map(enrich), bookmarks: bookmarks.map(enrich) },
		{ headers: { "cache-control": "no-store" } },
	);
}

function enrich(item: Bookmark): EnrichedDeviceEntry {
	const resolved = getBookmarkedDevice(item.category, item.deviceId);
	return {
		category: item.category,
		deviceId: item.deviceId,
		createdAt: item.createdAt ?? null,
		name: resolved?.name ?? null,
		priceAud: resolved?.priceAud ?? null,
		href: resolved?.href ?? null,
	};
}

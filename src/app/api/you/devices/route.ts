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
		}),
		fetch(`${bookmarksApiUrl}/api/v1/owned`, { headers, cache: "no-store" }),
	]);
	if (!bookmarksRes.ok || !ownedRes.ok) {
		return NextResponse.json(
			{ error: "Could not load devices." },
			{ status: !bookmarksRes.ok ? bookmarksRes.status : ownedRes.status },
		);
	}

	const bookmarksPayload = (await bookmarksRes.json()) as
		| { bookmarks: Bookmark[] }
		| Bookmark[];
	const ownedPayload = (await ownedRes.json()) as
		| { owned: OwnedDevice[] }
		| OwnedDevice[];

	const bookmarks = (
		Array.isArray(bookmarksPayload)
			? bookmarksPayload
			: (bookmarksPayload.bookmarks ?? [])
	).map(enrich);
	const owned = (
		Array.isArray(ownedPayload) ? ownedPayload : (ownedPayload.owned ?? [])
	).map(enrich);

	return NextResponse.json(
		{ owned, bookmarks },
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

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { EnrichedDeviceEntry } from "@/app/api/you/devices/route";

export function useYouDevices() {
	const { sessionToken } = useAuth();
	const [owned, setOwned] = useState<EnrichedDeviceEntry[] | null>(null);
	const [bookmarks, setBookmarks] = useState<EnrichedDeviceEntry[] | null>(
		null,
	);
	const [loadError, setLoadError] = useState<string | null>(null);

	useEffect(() => {
		if (!sessionToken) {
			setOwned(null);
			setBookmarks(null);
			return;
		}
		let cancelled = false;
		setLoadError(null);
		fetch("/api/you/devices", {
			headers: { authorization: `Bearer ${sessionToken}` },
			cache: "no-store",
		})
			.then(async (response) => {
				if (!response.ok) throw new Error("Could not load devices.");
				const payload = (await response.json()) as {
					owned: EnrichedDeviceEntry[];
					bookmarks: EnrichedDeviceEntry[];
				};
				if (!cancelled) {
					setOwned(payload.owned);
					setBookmarks(payload.bookmarks);
				}
			})
			.catch((error: unknown) => {
				if (!cancelled) {
					setOwned([]);
					setBookmarks([]);
					setLoadError(
						error instanceof Error ? error.message : "Could not load devices.",
					);
				}
			});
		return () => {
			cancelled = true;
		};
	}, [sessionToken]);

	return { owned, bookmarks, loadError, setOwned, setBookmarks };
}

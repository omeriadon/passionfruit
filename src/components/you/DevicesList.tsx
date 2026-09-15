"use client";

import Link from "fumadocs-core/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { catalogCategories } from "@/lib/shared";
import type { EnrichedDeviceEntry } from "@/app/api/you/devices/route";

function timestamp(value: string | null): number {
	if (!value) return Number.NEGATIVE_INFINITY;
	const time = Date.parse(value);
	return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

function formatDate(value: string | null): string | null {
	if (!value) return null;
	const time = Date.parse(value);
	if (Number.isNaN(time)) return null;
	return new Date(time).toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

type DeviceSection = {
	category: string;
	title: string;
	items: EnrichedDeviceEntry[];
};

function groupByType(
	items: EnrichedDeviceEntry[],
	preferredOrder: string[] | null,
): DeviceSection[] {
	const order = new Map<string, number>();
	for (const slug of preferredOrder ?? []) {
		if (!order.has(slug)) order.set(slug, order.size);
	}
	for (const category of catalogCategories) {
		if (!order.has(category.slug)) order.set(category.slug, order.size);
	}
	const groups = new Map<string, EnrichedDeviceEntry[]>();
	for (const item of items) {
		const list = groups.get(item.category) ?? [];
		list.push(item);
		groups.set(item.category, list);
	}
	return [...groups.entries()]
		.map(([category, list]) => ({
			category,
			title:
				catalogCategories.find((entry) => entry.slug === category)?.title ??
				"Other",
			items: [...list].sort(
				(a, b) => timestamp(b.createdAt) - timestamp(a.createdAt),
			),
		}))
		.sort(
			(a, b) =>
				(order.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(b.category) ?? Number.MAX_SAFE_INTEGER),
		);
}

function DeviceRows({
	items,
	onRemove,
	removeLabel,
}: {
	items: EnrichedDeviceEntry[];
	onRemove: (category: string, deviceId: string) => void;
	removeLabel: (name: string) => string;
}) {
	return (
		<ul className="mt-2 flex flex-col divide-y divide-fd-border">
			{items.map((item) => {
				const label = item.name ?? item.deviceId;
				const date = formatDate(item.createdAt);
				return (
					<li
						key={`${item.category}:${item.deviceId}`}
						className="flex items-center gap-3 py-2.5"
					>
						<div className="flex min-w-0 flex-1 flex-col">
							{item.href ? (
								<Link
									href={item.href}
									className="truncate font-medium hover:underline"
								>
									{label}
								</Link>
							) : (
								<span className="truncate font-medium">{label}</span>
							)}
							<span className="text-sm text-fd-muted-foreground">
								{item.priceAud !== null
									? `A$${item.priceAud.toLocaleString()}`
									: "Price unavailable"}
								{date ? ` · saved ${date}` : ""}
							</span>
						</div>
						<button
							type="button"
							onClick={() => onRemove(item.category, item.deviceId)}
							aria-label={removeLabel(label)}
							className="shrink-0 rounded-full px-3 py-1 text-sm text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
						>
							Remove
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export function DevicesList() {
	const {
		user,
		sessionToken,
		isLoading,
		openAuthDialog,
		toggleBookmark,
		toggleOwned,
		categoryOrder,
	} = useAuth();
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

	const ownedSections = useMemo(
		() => (owned === null ? [] : groupByType(owned, categoryOrder)),
		[owned, categoryOrder],
	);
	const bookmarkSections = useMemo(
		() => (bookmarks === null ? [] : groupByType(bookmarks, categoryOrder)),
		[bookmarks, categoryOrder],
	);

	async function handleRemoveOwned(category: string, deviceId: string) {
		if (await toggleOwned(category, deviceId)) return;
		setOwned((current) =>
			current === null
				? current
				: current.filter(
						(item) =>
							!(item.category === category && item.deviceId === deviceId),
					),
		);
	}

	async function handleRemoveBookmark(category: string, deviceId: string) {
		if (await toggleBookmark(category, deviceId)) return;
		setBookmarks((current) =>
			current === null
				? current
				: current.filter(
						(item) =>
							!(item.category === category && item.deviceId === deviceId),
					),
		);
	}

	if (isLoading) {
		return <p className="text-fd-muted-foreground">Loading devices…</p>;
	}

	if (!user) {
		return (
			<div className="flex flex-col items-start gap-3">
				<p className="text-fd-muted-foreground">
					Sign in to see the devices you own and have bookmarked.
				</p>
				<button
					type="button"
					onClick={openAuthDialog}
					className="rounded-full bg-fd-primary px-4 py-1.5 text-sm font-medium text-fd-primary-foreground"
				>
					Sign in
				</button>
			</div>
		);
	}

	if (loadError) {
		return <p className="text-fd-muted-foreground">{loadError}</p>;
	}

	return (
		<div className="flex flex-col gap-10">
			<section aria-label="Your devices">
				<h2 className="border-b pb-2 text-xl font-bold">Your devices</h2>
				{owned === null || ownedSections.length === 0 ? (
					<p className="mt-3 text-fd-muted-foreground">
						Nothing marked as yours yet. Open any device and press Mine.
					</p>
				) : (
					ownedSections.map((section) => (
						<div key={section.category} className="mt-4">
							<h3 className="text-base font-semibold">
								{section.title}{" "}
								<span className="text-sm font-normal text-fd-muted-foreground">
									{section.items.length}
								</span>
							</h3>
							<DeviceRows
								items={section.items}
								onRemove={handleRemoveOwned}
								removeLabel={(name) => `Remove ${name} from your devices`}
							/>
						</div>
					))
				)}
			</section>

			<section aria-label="Bookmarks">
				<h2 className="border-b pb-2 text-xl font-bold">Bookmarks</h2>
				{bookmarks === null || bookmarkSections.length === 0 ? (
					<p className="mt-3 text-fd-muted-foreground">
						No bookmarks yet. Browse the{" "}
						<Link href="/docs/iphone" className="underline">
							devices
						</Link>{" "}
						and save the ones you want to find here.
					</p>
				) : (
					bookmarkSections.map((section) => (
						<div key={section.category} className="mt-4">
							<h3 className="text-base font-semibold">
								{section.title}{" "}
								<span className="text-sm font-normal text-fd-muted-foreground">
									{section.items.length}
								</span>
							</h3>
							<DeviceRows
								items={section.items}
								onRemove={handleRemoveBookmark}
								removeLabel={(name) => `Remove ${name} bookmark`}
							/>
						</div>
					))
				)}
			</section>
		</div>
	);
}

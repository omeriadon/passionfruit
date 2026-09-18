"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { DeviceTypeSections } from "@/components/you/DeviceTypeSections";
import { useYouDevices } from "@/components/you/useYouDevices";
import type { EnrichedDeviceEntry } from "@/app/api/you/devices/route";

function Gate({ children }: { children: React.ReactNode }) {
	const { user, isLoading, openAuthDialog } = useAuth();
	if (isLoading) {
		return <p className="text-fd-muted-foreground">Loading…</p>;
	}
	if (!user) {
		return (
			<div className="flex flex-col items-start gap-3">
				<p className="text-fd-muted-foreground">
					Sign in to see the devices you own.
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
	return <>{children}</>;
}

type CollectionEntry = EnrichedDeviceEntry & {
	owned: boolean;
	bookmarked: boolean;
};

function CollectionSection({
	items,
	title,
	preferredOrder,
	onRemove,
	removeLabel,
}: {
	items: CollectionEntry[];
	title: string;
	preferredOrder: string[] | null;
	onRemove: (category: string, deviceId: string) => void;
	removeLabel: (name: string) => string;
}) {
	return (
		<section aria-label={title}>
			<h2 className="text-lg font-semibold">{title}</h2>
			<div className="mt-2">
				{items.length === 0 ? (
					<p className="text-fd-muted-foreground">Nothing here yet.</p>
				) : (
					<DeviceTypeSections
						items={items}
						preferredOrder={preferredOrder}
						onRemove={onRemove}
						removeLabel={removeLabel}
					/>
				)}
			</div>
		</section>
	);
}

export function Collection() {
	const { toggleOwned, toggleBookmark, categoryOrder } = useAuth();
	const { owned, bookmarks, loadError, setOwned, setBookmarks } =
		useYouDevices();

	const ownedByKey = new Map(
		(owned ?? []).map((item) => [`${item.category}:${item.deviceId}`, item]),
	);
	const bookmarkByKey = new Map(
		(bookmarks ?? []).map((item) => [
			`${item.category}:${item.deviceId}`,
			item,
		]),
	);
	const merge = (item: EnrichedDeviceEntry): CollectionEntry => ({
		...item,
		owned: ownedByKey.has(`${item.category}:${item.deviceId}`),
		bookmarked: bookmarkByKey.has(`${item.category}:${item.deviceId}`),
	});
	const ownedItems = (owned ?? []).map(merge);
	const bookmarkItems = (bookmarks ?? []).map(merge);

	async function handleRemove(category: string, deviceId: string) {
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
	async function handleBookmarkRemove(category: string, deviceId: string) {
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

	return (
		<Gate>
			{loadError ? (
				<p className="text-fd-muted-foreground">{loadError}</p>
			) : (
				<div className="flex flex-col gap-8">
					<CollectionSection
						title="Owned"
						items={ownedItems}
						preferredOrder={categoryOrder}
						onRemove={handleRemove}
						removeLabel={(name) => `Remove ${name} from your collection`}
					/>
					<CollectionSection
						title="Bookmarks"
						items={bookmarkItems}
						preferredOrder={categoryOrder}
						onRemove={handleBookmarkRemove}
						removeLabel={(name) => `Remove ${name} bookmark`}
					/>
				</div>
			)}
		</Gate>
	);
}

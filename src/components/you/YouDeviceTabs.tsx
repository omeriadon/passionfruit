"use client";

import Link from "fumadocs-core/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DeviceTypeSections } from "@/components/you/DeviceTypeSections";
import { useYouDevices } from "@/components/you/useYouDevices";

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

export function YourDevices() {
	const { toggleOwned, categoryOrder } = useAuth();
	const { owned, loadError, setOwned } = useYouDevices();

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

	return (
		<Gate>
			{loadError ? (
				<p className="text-fd-muted-foreground">{loadError}</p>
			) : owned === null || owned.length === 0 ? (
				<p className="text-fd-muted-foreground">
					Nothing marked as yours yet. Open any device and press Mine.
				</p>
			) : (
				<DeviceTypeSections
					items={owned}
					preferredOrder={categoryOrder}
					onRemove={handleRemove}
					removeLabel={(name) => `Remove ${name} from your devices`}
				/>
			)}
		</Gate>
	);
}

export function Bookmarks() {
	const { toggleBookmark, categoryOrder } = useAuth();
	const { bookmarks, loadError, setBookmarks } = useYouDevices();

	async function handleRemove(category: string, deviceId: string) {
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
			) : bookmarks === null || bookmarks.length === 0 ? (
				<p className="text-fd-muted-foreground">
					No bookmarks yet. Browse the{" "}
					<Link href="/docs/iphone" className="underline">
						devices
					</Link>{" "}
					and save the ones you want to find here.
				</p>
			) : (
				<DeviceTypeSections
					items={bookmarks}
					preferredOrder={categoryOrder}
					onRemove={handleRemove}
					removeLabel={(name) => `Remove ${name} bookmark`}
				/>
			)}
		</Gate>
	);
}

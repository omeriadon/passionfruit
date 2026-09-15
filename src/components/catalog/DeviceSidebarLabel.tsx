"use client";

import { BadgeCheck, Bookmark } from "lucide-react";
import { Tooltip } from "@base-ui/react/tooltip";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DeviceTypeIcon } from "@/components/catalog/DeviceTypeIcon";

type DeviceSidebarLabelProps = {
	category: string;
	deviceId: string;
	name: string;
	releaseYear: number | null;
	yearStart?: boolean;
};

export function DeviceSidebarLabel({
	category,
	deviceId,
	name,
	releaseYear,
	yearStart = false,
}: DeviceSidebarLabelProps) {
	const { isBookmarked, isOwned } = useAuth();
	const bookmarked = isBookmarked(category, deviceId);
	const owned = isOwned(category, deviceId);

	const metadata = [
		name,
		releaseYear === null ? "Release year unknown" : `Released ${releaseYear}`,
		owned ? "Owned" : null,
		bookmarked ? "Bookmarked" : null,
	]
		.filter(Boolean)
		.join(", ");

	return (
		<Tooltip.Root>
			<Tooltip.Trigger
				delay={0}
				render={
					<span
						aria-hidden="true"
						className="absolute inset-0 z-10"
						data-year-start={yearStart || undefined}
					/>
				}
			/>
			<span className="relative flex min-w-0 w-full items-center gap-2">
				<DeviceTypeIcon category={category} className="size-4 shrink-0" />
				<span className="min-w-0 flex-1 truncate">{name}</span>
				{bookmarked || owned ? (
					<span className="flex shrink-0 items-center gap-1">
						{bookmarked ? (
							<span>
								<Bookmark aria-hidden="true" className="size-3.5" />
							</span>
						) : null}
						{owned ? (
							<span>
								<BadgeCheck aria-hidden="true" className="size-3.5" />
							</span>
						) : null}
					</span>
				) : null}
				<span className="sr-only">{metadata}</span>
			</span>
			<Tooltip.Portal>
				<Tooltip.Positioner
					className="pointer-events-none z-50"
					side="bottom"
					align="center"
					sideOffset={8}
				>
					<Tooltip.Popup className="glass-header-surface pointer-events-none w-64 rounded-xl p-3 text-xs text-fd-popover-foreground shadow-lg">
						<div className="flex items-center justify-between gap-4">
							<span className="min-w-0 truncate font-medium">{name}</span>
							<span className="shrink-0 text-fd-muted-foreground">
								{releaseYear ?? "Year unknown"}
							</span>
						</div>
						{owned || bookmarked ? (
							<div className="mt-3 flex flex-wrap gap-1.5">
								{owned ? (
									<span className="inline-flex items-center gap-1 rounded-full bg-fd-accent px-2 py-1 font-medium text-fd-accent-foreground">
										<BadgeCheck aria-hidden="true" className="size-3.5" />
										Owned
									</span>
								) : null}
								{bookmarked ? (
									<span className="inline-flex items-center gap-1 rounded-full bg-fd-accent px-2 py-1 font-medium text-fd-accent-foreground">
										<Bookmark aria-hidden="true" className="size-3.5" />
										Bookmarked
									</span>
								) : null}
							</div>
						) : null}
					</Tooltip.Popup>
				</Tooltip.Positioner>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
}

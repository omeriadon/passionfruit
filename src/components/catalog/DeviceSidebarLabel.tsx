"use client";

import { BadgeCheck, Bookmark } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";
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
	const [tooltipPosition, setTooltipPosition] = useState<{
		left: number;
		top: number;
		above: boolean;
	} | null>(null);

	function showTooltip(event: React.MouseEvent<HTMLSpanElement>) {
		const row = event.currentTarget.closest("a") ?? event.currentTarget;
		const bounds = row.getBoundingClientRect();
		const above = bounds.bottom + 120 > window.innerHeight;
		setTooltipPosition({
			left: bounds.left + bounds.width / 2,
			top: above ? bounds.top - 8 : bounds.bottom + 8,
			above,
		});
	}

	return (
		<span className="relative block w-full">
			<span
				key="row"
				onMouseEnter={showTooltip}
				onMouseLeave={() => setTooltipPosition(null)}
				className="relative flex min-w-0 w-full items-center gap-2"
				data-year-start={yearStart || undefined}
			>
				<DeviceTypeIcon category={category} className="size-4 shrink-0" />
				<span className="min-w-0 flex-1 truncate">{name}</span>
				{bookmarked || owned ? (
					<span className="flex shrink-0 items-center gap-1">
						{bookmarked ? (
							<Bookmark aria-hidden="true" className="size-3.5" />
						) : null}
						{owned ? (
							<BadgeCheck aria-hidden="true" className="size-3.5" />
						) : null}
					</span>
				) : null}
				<span className="sr-only">{metadata}</span>
			</span>
			{tooltipPosition && typeof document !== "undefined"
				? createPortal(
						<div
							role="tooltip"
							className="glass-header-surface pointer-events-none fixed z-50 w-64 rounded-xl p-3 text-xs text-fd-popover-foreground shadow-lg"
							style={{
								left: tooltipPosition.left,
								top: tooltipPosition.top,
								transform: `translate(-50%, ${tooltipPosition.above ? "-100%" : "0"})`,
							}}
						>
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
						</div>,
						document.body,
						`${category}:${deviceId}`,
					)
				: null}
		</span>
	);
}

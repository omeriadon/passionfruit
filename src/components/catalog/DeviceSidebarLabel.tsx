"use client";

import { BadgeCheck, Bookmark } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";

type DeviceSidebarLabelProps = {
	category: string;
	deviceId: string;
	name: string;
};

export function DeviceSidebarLabel({
	category,
	deviceId,
	name,
}: DeviceSidebarLabelProps) {
	const { isBookmarked, isOwned } = useAuth();
	const bookmarked = isBookmarked(category, deviceId);
	const owned = isOwned(category, deviceId);

	return (
		<span className="flex min-w-0 w-full items-center gap-2">
			<span className="min-w-0 flex-1 truncate">{name}</span>
			{bookmarked || owned ? (
				<span className="flex shrink-0 items-center gap-1">
					{bookmarked ? (
						<span title="Bookmarked">
							<Bookmark aria-hidden="true" className="size-3.5" />
						</span>
					) : null}
					{owned ? (
						<span title="Owned">
							<BadgeCheck aria-hidden="true" className="size-3.5" />
						</span>
					) : null}
					<span className="sr-only">
						{bookmarked ? "Bookmarked" : null}
						{bookmarked && owned ? ", " : null}
						{owned ? "Owned" : null}
					</span>
				</span>
			) : null}
		</span>
	);
}

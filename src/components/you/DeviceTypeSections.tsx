"use client";

import Link from "fumadocs-core/link";
import { useMemo } from "react";
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

export function DeviceTypeSections({
	items,
	preferredOrder,
	onRemove,
	removeLabel,
}: {
	items: EnrichedDeviceEntry[];
	preferredOrder: string[] | null;
	onRemove: (category: string, deviceId: string) => void;
	removeLabel: (name: string) => string;
}) {
	const sections = useMemo(() => {
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
	}, [items, preferredOrder]);

	return (
		<div className="flex flex-col gap-6">
			{sections.map((section) => (
				<section key={section.category} aria-label={section.title}>
					<h2 className="text-base font-semibold">
						{section.title}{" "}
						<span className="text-sm font-normal text-fd-muted-foreground">
							{section.items.length}
						</span>
					</h2>
					<ul className="mt-2 flex flex-col divide-y divide-fd-border">
						{section.items.map((item) => {
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
				</section>
			))}
		</div>
	);
}

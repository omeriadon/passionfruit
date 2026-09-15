"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { catalogCategories } from "@/lib/shared";

function move(order: string[], slug: string, delta: -1 | 1): string[] {
	const index = order.indexOf(slug);
	const target = index + delta;
	if (index < 0 || target < 0 || target >= order.length) return order;
	const next = [...order];
	next.splice(index, 1);
	next.splice(target, 0, slug);
	return next;
}

export function DeviceOrder() {
	const { user, isLoading, openAuthDialog, categoryOrder, setCategoryOrder } =
		useAuth();

	if (isLoading) {
		return <p className="text-fd-muted-foreground">Loading order…</p>;
	}

	if (!user) {
		return (
			<div className="flex flex-col items-start gap-3">
				<p className="text-fd-muted-foreground">
					Sign in to arrange your device categories.
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

	const known: Set<string> = new Set(
		catalogCategories.map((entry) => entry.slug),
	);
	const saved = (categoryOrder ?? []).filter((slug) => known.has(slug));
	const missing = catalogCategories
		.map((entry) => entry.slug)
		.filter((slug) => !saved.includes(slug));
	const order = [...saved, ...missing];

	return (
		<div className="flex max-w-md flex-col gap-2">
			<p className="text-sm text-fd-muted-foreground">
				Top of the list shows first in the sidebar.
			</p>
			<ol className="flex flex-col divide-y divide-fd-border rounded-xl border border-fd-border">
				{order.map((slug, index) => {
					const title =
						catalogCategories.find((entry) => entry.slug === slug)?.title ??
						slug;
					return (
						<li key={slug} className="flex items-center gap-3 px-3 py-2">
							<span className="w-6 shrink-0 text-sm text-fd-muted-foreground">
								{index + 1}
							</span>
							<span className="min-w-0 flex-1 truncate font-medium">
								{title}
							</span>
							<button
								type="button"
								aria-label={`Move ${title} up`}
								disabled={index === 0}
								onClick={() => setCategoryOrder(move(order, slug, -1))}
								className="rounded-full px-2 py-1 text-sm disabled:opacity-30 hover:bg-fd-accent"
							>
								↑
							</button>
							<button
								type="button"
								aria-label={`Move ${title} down`}
								disabled={index === order.length - 1}
								onClick={() => setCategoryOrder(move(order, slug, 1))}
								className="rounded-full px-2 py-1 text-sm disabled:opacity-30 hover:bg-fd-accent"
							>
								↓
							</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

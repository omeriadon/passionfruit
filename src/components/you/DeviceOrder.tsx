"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { catalogCategories } from "@/lib/shared";

export function DeviceOrder() {
	const { user, isLoading, openAuthDialog, categoryOrder, setCategoryOrder } =
		useAuth();
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);
	const listRef = useRef<HTMLOListElement>(null);

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

	function persist(next: string[]) {
		setDragIndex(null);
		setDropIndex(null);
		void setCategoryOrder(next);
	}

	function move(from: number, to: number) {
		if (from === to) return [...order];
		const next = [...order];
		const [slug] = next.splice(from, 1);
		next.splice(to, 0, slug);
		return next;
	}

	return (
		<div className="flex max-w-md flex-col gap-2">
			<p className="text-sm text-fd-muted-foreground">
				Drag to rearrange. Top of the list shows first in the sidebar.
			</p>
			<ol
				ref={listRef}
				className="flex flex-col divide-y divide-fd-border rounded-xl border border-fd-border"
			>
				{order.map((slug, index) => {
					const title =
						catalogCategories.find((entry) => entry.slug === slug)?.title ??
						slug;
					const isDropTarget = dropIndex === index && dragIndex !== index;
					return (
						<li
							key={slug}
							draggable
							onDragStart={(event) => {
								event.dataTransfer.effectAllowed = "move";
								event.dataTransfer.setData("text/plain", String(index));
								setDragIndex(index);
							}}
							onDragOver={(event) => {
								event.preventDefault();
								event.dataTransfer.dropEffect = "move";
								if (dropIndex !== index) setDropIndex(index);
							}}
							onDragLeave={() => {
								if (dropIndex === index) setDropIndex(null);
							}}
							onDrop={(event) => {
								event.preventDefault();
								const from = Number(event.dataTransfer.getData("text/plain"));
								if (!Number.isNaN(from)) persist(move(from, index));
								else {
									setDragIndex(null);
									setDropIndex(null);
								}
							}}
							onDragEnd={() => {
								setDragIndex(null);
								setDropIndex(null);
							}}
							aria-label={`${title}, position ${index + 1} of ${order.length}. Drag to reorder.`}
							className={`flex cursor-grab items-center gap-3 px-3 py-2 active:cursor-grabbing ${
								dragIndex === index ? "opacity-40" : ""
							} ${isDropTarget ? "border-t-2 border-t-fd-primary" : ""}`}
						>
							<span
								aria-hidden="true"
								className="shrink-0 text-fd-muted-foreground"
							>
								⋮⋮
							</span>
							<span className="w-6 shrink-0 text-sm text-fd-muted-foreground">
								{index + 1}
							</span>
							<span className="min-w-0 flex-1 truncate font-medium">
								{title}
							</span>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

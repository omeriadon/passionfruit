"use client";

import Link from "fumadocs-core/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { deviceIndex } from "@/lib/device-index";
import { catalogCategories } from "@/lib/shared";

export function DeviceSearch() {
	const { categoryOrder, isBookmarked, isOwned } = useAuth();
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const results = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (needle.length === 0) return [];
		const order = new Map<string, number>();
		for (const slug of categoryOrder ?? []) {
			if (!order.has(slug)) order.set(slug, order.size);
		}
		for (const entry of catalogCategories) {
			if (!order.has(entry.slug)) order.set(entry.slug, order.size);
		}
		return deviceIndex
			.filter((entry) => entry.name.toLowerCase().includes(needle))
			.sort((a, b) => {
				const byCategory =
					(order.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
					(order.get(b.category) ?? Number.MAX_SAFE_INTEGER);
				if (byCategory !== 0) return byCategory;
				const aStarts = a.name.toLowerCase().startsWith(needle) ? 0 : 1;
				const bStarts = b.name.toLowerCase().startsWith(needle) ? 0 : 1;
				if (aStarts !== bStarts) return aStarts - bStarts;
				return a.name.localeCompare(b.name);
			})
			.slice(0, 8);
	}, [query, categoryOrder]);

	function go(href: string) {
		setOpen(false);
		setQuery("");
		router.push(href);
	}

	return (
		<div className="relative">
			<div className="glass-header-surface relative flex items-center rounded-xl transition-colors focus-within:ring-2 focus-within:ring-fd-primary/40">
				<Search
					aria-hidden="true"
					className="pointer-events-none absolute left-3 size-4 text-fd-muted-foreground"
				/>
				<input
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
						setOpen(true);
						setActive(0);
					}}
					onFocus={() => setOpen(true)}
					onBlur={() => {
						blurTimer.current = setTimeout(() => setOpen(false), 120);
					}}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setQuery("");
							setOpen(false);
						} else if (event.key === "ArrowDown") {
							event.preventDefault();
							setActive((index) =>
								results.length === 0
									? 0
									: Math.min(index + 1, results.length - 1),
							);
						} else if (event.key === "ArrowUp") {
							event.preventDefault();
							setActive((index) => Math.max(index - 1, 0));
						} else if (event.key === "Enter" && results[active]) {
							go(results[active].href);
						}
					}}
					type="search"
					role="combobox"
					aria-expanded={open && results.length > 0}
					aria-label="Search any device"
					placeholder="Search any device"
					className="min-w-0 flex-1 appearance-none bg-transparent py-2 pl-9 pr-3 text-sm outline-none placeholder:text-fd-muted-foreground [&::-webkit-search-cancel-button]:hidden"
				/>
				{query ? (
					<button
						type="button"
						aria-label="Clear device search"
						onMouseDown={(event) => event.preventDefault()}
						onClick={() => {
							setQuery("");
							setOpen(false);
							setActive(0);
						}}
						className="mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
					>
						<X aria-hidden="true" className="size-4" />
					</button>
				) : null}
			</div>
			{open && query.trim().length > 0 ? (
				<ul
					role="listbox"
					className="absolute inset-x-0 top-full z-40 mt-1 max-h-72 overflow-auto rounded-xl border border-fd-border bg-fd-popover p-1 shadow-lg"
				>
					{results.length === 0 ? (
						<li className="px-2 py-1.5 text-sm text-fd-muted-foreground">
							No devices match.
						</li>
					) : (
						results.map((entry, index) => (
							<li
								key={`${entry.category}:${entry.id}`}
								role="option"
								aria-selected={index === active}
							>
								<Link
									href={entry.href}
									onMouseDown={(event) => {
										event.preventDefault();
										if (blurTimer.current) clearTimeout(blurTimer.current);
										go(entry.href);
									}}
									onMouseEnter={() => setActive(index)}
									className={`flex flex-col rounded-md px-2 py-1.5 ${index === active ? "bg-fd-accent" : ""}`}
								>
									<span className="truncate text-sm font-medium">
										{entry.name}
									</span>
									<span className="flex items-center justify-between gap-3 text-xs text-fd-muted-foreground">
										<span className="flex min-w-0 items-center gap-1.5">
											{isOwned(entry.category, entry.id) ? (
												<span className="rounded-full bg-fd-accent px-1.5 py-0.5 text-[10px] font-medium text-fd-accent-foreground">
													Mine
												</span>
											) : null}
											{isBookmarked(entry.category, entry.id) ? (
												<span className="rounded-full bg-fd-accent px-1.5 py-0.5 text-[10px] font-medium text-fd-accent-foreground">
													Bookmarked
												</span>
											) : null}
										</span>
										<span className="shrink-0">{entry.releaseYear ?? ""}</span>
									</span>
								</Link>
							</li>
						))
					)}
				</ul>
			) : null}
		</div>
	);
}

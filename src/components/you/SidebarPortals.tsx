"use client";

import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DeviceSearch } from "@/components/catalog/DeviceSearch";
import { DeviceTypeIcon } from "@/components/catalog/DeviceTypeIcon";

function useSidebarHost(id: string, active: boolean, prepend: boolean) {
	const [host, setHost] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (!active) return;
		let observer: MutationObserver | null = null;
		let mounted: HTMLElement | null = null;

		const mount = () => {
			const sidebar = document.getElementById("nd-sidebar");
			if (!sidebar) return false;
			const target = prepend
				? sidebar
				: sidebar.querySelector<HTMLElement>(
						":scope > div > [data-id$='-viewport']",
					);
			if (!target) return false;
			document.getElementById(id)?.remove();
			const element = document.createElement("div");
			element.id = id;
			// Own stacking context so portaled results paint above the masked
			// scroll viewport and tab picker below, never underneath them.
			element.className = "relative z-40";
			if (prepend) {
				// Below the title row, directly above the tab picker.
				sidebar.insertBefore(element, sidebar.children[1] ?? null);
				sidebar.classList.add("nd-sidebar-with-device-search");
			} else target.appendChild(element);
			mounted = element;
			setHost(element);
			return true;
		};

		if (!mount()) {
			observer = new MutationObserver(() => {
				if (mount()) observer?.disconnect();
			});
			observer.observe(document.body, { childList: true, subtree: true });
		}

		return () => {
			observer?.disconnect();
			if (prepend) {
				mounted?.parentElement?.classList.remove(
					"nd-sidebar-with-device-search",
				);
			}
			document.getElementById(id)?.remove();
			setHost(null);
		};
	}, [id, active, prepend]);

	return host;
}

/** Device quick-search above the tab picker. Docs sidebar only. */
export function SidebarDeviceSearch() {
	const pathname = usePathname();
	const host = useSidebarHost(
		"nd-sidebar-device-search",
		pathname.startsWith("/docs"),
		true,
	);
	if (!host) return null;
	return createPortal(
		<div className="px-2 pt-2">
			<DeviceSearch />
		</div>,
		host,
	);
}

/** The signed-in user's collection inside the sidebar. */
export function YouSidebarLinks() {
	const pathname = usePathname();
	const { user, categoryOrder } = useAuth();
	const [items, setItems] = useState<{
		owned: {
			category: string;
			deviceId: string;
			name: string;
			href: string | null;
		}[];
		bookmarks: {
			category: string;
			deviceId: string;
			name: string;
			href: string | null;
		}[];
	}>({ owned: [], bookmarks: [] });
	const { sessionToken } = useAuth();

	const active = pathname.startsWith("/you/collection");
	const host = useSidebarHost("nd-sidebar-you-links", active, false);

	useEffect(() => {
		if (!active || !sessionToken) {
			setItems({ owned: [], bookmarks: [] });
			return;
		}
		let cancelled = false;
		fetch("/api/you/devices", {
			headers: { authorization: `Bearer ${sessionToken}` },
			cache: "no-store",
		})
			.then(async (response) => {
				if (!response.ok) return;
				const payload = (await response.json()) as {
					owned: {
						category: string;
						deviceId: string;
						name: string | null;
						href: string | null;
					}[];
					bookmarks: {
						category: string;
						deviceId: string;
						name: string | null;
						href: string | null;
					}[];
				};
				if (cancelled) return;
				setItems({
					owned: payload.owned.map((entry) => ({
						category: entry.category,
						deviceId: entry.deviceId,
						name: entry.name ?? entry.deviceId,
						href: entry.href,
					})),
					bookmarks: payload.bookmarks.map((entry) => ({
						category: entry.category,
						deviceId: entry.deviceId,
						name: entry.name ?? entry.deviceId,
						href: entry.href,
					})),
				});
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [active, sessionToken, pathname]);

	if (
		!host ||
		!user ||
		(items.owned.length === 0 && items.bookmarks.length === 0)
	) {
		return null;
	}

	const order = new Map<string, number>();
	for (const slug of categoryOrder ?? []) {
		if (!order.has(slug)) order.set(slug, order.size);
	}
	const sortItems = (list: typeof items.owned) =>
		[...list].sort(
			(a, b) =>
				(order.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(b.category) ?? Number.MAX_SAFE_INTEGER),
		);
	const sections = [
		{ title: "Owned", items: sortItems(items.owned) },
		{ title: "Bookmarks", items: sortItems(items.bookmarks) },
	].filter((section) => section.items.length > 0);

	return createPortal(
		<nav aria-label="Collection" className="px-2 pb-2">
			{sections.map((section) => (
				<div key={section.title} className="mb-3 last:mb-0">
					<p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
						{section.title}
					</p>
					<ul className="flex flex-col">
						{section.items.map((item) => (
							<li key={`${section.title}:${item.category}:${item.deviceId}`}>
								{item.href ? (
									<Link
										href={item.href}
										className="block truncate rounded-md px-2 py-1.5 text-sm hover:bg-fd-accent"
									>
										<span className="flex min-w-0 items-center gap-2">
											<DeviceTypeIcon
												category={item.category}
												className="size-4 shrink-0 text-fd-muted-foreground"
											/>
											<span className="truncate">{item.name}</span>
										</span>
									</Link>
								) : (
									<span className="flex min-w-0 items-center gap-2 px-2 py-1.5 text-sm">
										<DeviceTypeIcon
											category={item.category}
											className="size-4 shrink-0 text-fd-muted-foreground"
										/>
										<span className="truncate">{item.name}</span>
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>,
		host,
	);
}

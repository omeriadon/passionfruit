"use client";

import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DeviceSearch } from "@/components/catalog/DeviceSearch";
import { DeviceSidebarLabel } from "@/components/catalog/DeviceSidebarLabel";
import { DeviceTypeIcon } from "@/components/catalog/DeviceTypeIcon";
import { catalogCategories, otherCatalogSections } from "@/lib/shared";
import type { EnrichedDeviceEntry } from "@/app/api/you/devices/route";

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
		<div className="relative px-2 pt-2">
			<DeviceSearch />
			<SidebarDeviceTypeButton pathname={pathname} />
		</div>,
		host,
	);
}

function SidebarDeviceTypeButton({ pathname }: { pathname: string }) {
	const otherSection = pathname.startsWith("/docs/other/")
		? otherCatalogSections.find(
				(section) => section.slug === pathname.split("/")[3],
			)
		: undefined;
	const category = otherSection
		? { slug: otherSection.slug, title: otherSection.title }
		: catalogCategories.find(
				(category) => category.slug === pathname.split("/")[2],
			);

	if (!category) return null;

	const href = otherSection
		? `/docs/other/${category.slug}`
		: `/docs/${category.slug}`;

	return (
		<Link
			href={href}
			aria-label={`${category.title} device type`}
			data-sidebar-device-type
			data-selected={pathname === href ? "true" : undefined}
			className="glass-header-surface absolute left-2 top-13.5 inline-flex size-9.5 items-center justify-center rounded-xl text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
		>
			<DeviceTypeIcon category={category.slug} className="size-4" />
		</Link>
	);
}

/** The signed-in user's collection inside the sidebar. */
export function YouSidebarLinks() {
	const pathname = usePathname();
	const { user, categoryOrder } = useAuth();
	const [items, setItems] = useState<{
		owned: EnrichedDeviceEntry[];
		bookmarks: EnrichedDeviceEntry[];
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
					owned: EnrichedDeviceEntry[];
					bookmarks: EnrichedDeviceEntry[];
				};
				if (cancelled) return;
				setItems({
					owned: payload.owned,
					bookmarks: payload.bookmarks,
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
		[...list].sort((a, b) => {
			const categoryDifference =
				(order.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(b.category) ?? Number.MAX_SAFE_INTEGER);
			return categoryDifference !== 0
				? categoryDifference
				: (b.releaseYear ?? 0) - (a.releaseYear ?? 0);
		});
	const sections = [
		{ title: "Owned", items: sortItems(items.owned) },
		{ title: "Bookmarked", items: sortItems(items.bookmarks) },
	].filter((section) => section.items.length > 0);

	return createPortal(
		<nav aria-label="Collection" className="px-2 pb-2">
			{sections.map((section) => (
				<div key={section.title} className="mb-3 last:mb-0">
					<p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
						{section.title}
					</p>
					<ul className="flex flex-col">
						{section.items.map((item, index, sectionItems) => (
							<li key={`${section.title}:${item.category}:${item.deviceId}`}>
								{item.href ? (
									<Link
										href={item.href}
										className="relative block truncate rounded-md px-2 py-1.5 font-mono text-sm hover:bg-fd-accent"
									>
										<DeviceSidebarLabel
											category={item.category}
											deviceId={item.deviceId}
											name={item.name ?? item.deviceId}
											releaseYear={item.releaseYear}
											yearStart={
												index > 0 &&
												(sectionItems[index - 1].category !== item.category ||
													sectionItems[index - 1].releaseYear !==
														item.releaseYear)
											}
										/>
									</Link>
								) : (
									<span className="relative flex min-w-0 items-center gap-2 px-2 py-1.5 font-mono text-sm">
										<DeviceSidebarLabel
											category={item.category}
											deviceId={item.deviceId}
											name={item.name ?? item.deviceId}
											releaseYear={item.releaseYear}
											yearStart={
												index > 0 &&
												(sectionItems[index - 1].category !== item.category ||
													sectionItems[index - 1].releaseYear !==
														item.releaseYear)
											}
										/>
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

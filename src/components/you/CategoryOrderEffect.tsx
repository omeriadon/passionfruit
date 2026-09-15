"use client";

import { useEffect } from "react";
import { usePathname } from "fumadocs-core/framework";
import { useAuth } from "@/lib/auth/AuthProvider";
import { catalogCategories } from "@/lib/shared";

const CATEGORY_PATTERN = /^\/docs\/([a-z-]+)\/?$/;

/**
 * Applies the user's saved device-category order to Fumadocs' static tab
 * picker. Tabs are build-time static (per-user data can't reach the server),
 * so this re-sorts the dropdown links in place after mount. Strictly
 * additive: no custom order → no observer; unrecognized markup → no-op;
 * React never re-renders these links, so DOM moves are stable.
 */
export function CategoryOrderEffect() {
	const { categoryOrder } = useAuth();
	const pathname = usePathname();

	useEffect(() => {
		if (!categoryOrder || categoryOrder.length === 0) return;
		const rank = new Map<string, number>();
		categoryOrder.forEach((slug, index) => {
			if (!rank.has(slug)) rank.set(slug, index);
		});
		for (const entry of catalogCategories) {
			if (!rank.has(entry.slug)) rank.set(entry.slug, rank.size);
		}

		function sortContainer(container: Element) {
			const links = [...container.querySelectorAll(":scope > a[href]")];
			const sortable = links.filter((link) =>
				CATEGORY_PATTERN.test(link.getAttribute("href") ?? ""),
			);
			// Only touch pure category pickers (all direct link children match).
			if (sortable.length < 2 || sortable.length !== links.length) return;
			const sorted = [...sortable].sort((a, b) => {
				const slugA =
					CATEGORY_PATTERN.exec(a.getAttribute("href") ?? "")?.[1] ?? "";
				const slugB =
					CATEGORY_PATTERN.exec(b.getAttribute("href") ?? "")?.[1] ?? "";
				return (
					(rank.get(slugA) ?? Number.MAX_SAFE_INTEGER) -
					(rank.get(slugB) ?? Number.MAX_SAFE_INTEGER)
				);
			});
			let ordered = true;
			for (let i = 0; i < sorted.length; i++) {
				if (sortable[i] !== sorted[i]) {
					ordered = false;
					break;
				}
			}
			if (!ordered) {
				for (const link of sorted) container.appendChild(link);
			}
		}

		function sweep(root: ParentNode) {
			if (root instanceof Element) {
				const anchors = root.querySelectorAll('a[href^="/docs/"]');
				const parents = new Set<Element>();
				for (const anchor of anchors) {
					if (anchor.parentElement) parents.add(anchor.parentElement);
				}
				for (const parent of parents) sortContainer(parent);
			}
		}

		sweep(document.body);
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (node instanceof Element) sweep(node);
				}
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });
		return () => observer.disconnect();
	}, [categoryOrder, pathname]);

	return null;
}

"use client";

import dynamic from "next/dynamic";
import {
	RootProvider,
	type RootProviderProps,
} from "fumadocs-ui/provider/next";
import type { DefaultSearchDialogProps } from "fumadocs-ui/components/dialog/search-default";
import type { ReactNode } from "react";

// The default search dialog renders Base UI `inert` attributes that differ
// between SSR and hydration, producing an unrecoverable hydration mismatch.
// Loading it client-side only keeps it out of the SSR HTML entirely; the
// dialog chunk still loads on page mount, so Cmd+K works as before.
const SearchDialog = dynamic<DefaultSearchDialogProps>(
	() =>
		import("fumadocs-ui/components/dialog/search-default").then(
			(module) => module.default,
		),
	{ ssr: false },
);

export function SearchRootProvider({
	children,
	search,
	...options
}: Omit<RootProviderProps, "children"> & { children: ReactNode }) {
	return (
		<RootProvider {...options} search={{ ...search, SearchDialog }}>
			{children}
		</RootProvider>
	);
}

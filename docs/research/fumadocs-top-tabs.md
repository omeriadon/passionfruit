# Fumadocs top-level catalogue tabs

## Finding

Fumadocs provides an official horizontal top-tab strip through `DocsLayout`,
not `GlassLayout`.

`DocsLayout` accepts `tabs` and `tabMode="top"`. The installed
`fumadocs-ui` 16.14.5 implementation renders that tab set in a horizontal
strip below the navbar and suppresses the sidebar dropdown. This is the
smallest, first-party route to category tabs across the top of the catalogue
UI.

```tsx
import { DocsLayout } from "fumadocs-ui/layouts/docs";

<DocsLayout
	{...baseLayoutOptions}
	tree={catalogTree}
	tabs={catalogTabs}
	tabMode="top"
>
	{children}
</DocsLayout>
```

The documented `tabs` contract supports an explicit array, `false`, or an
options object that derives tabs from the page tree. The installed type also
declares `tabMode: "top" | "auto"`. Fumadocs describes the default trigger
as a sidebar dropdown, while the `top` mode is available in the installed
Docs-layout API.

Sources:

- [Docs Layout: usage and layout tabs](https://www.fumadocs.dev/docs/ui/layouts/docs)
- [Installed `DocsLayoutProps` type](../../node_modules/fumadocs-ui/dist/layouts/docs/index.d.ts)

## Page-tree source of truth

Top-level catalogue folders should remain root folders. A root folder limits
the active sidebar/navigation tree to that folder and is converted by
Fumadocs into a layout tab.

```json
{
	"title": "iPad",
	"description": "The iPad family.",
	"root": true
}
```

Fumadocs' `getLayoutTabs(catalogTree)` is the programmatic form of this
model. Folder title, description, icon, ordering, and index destination are
owned by `meta.json` and the generated page tree rather than by a separate
category-navigation component.

Sources:

- [Page slugs and page tree: root folders and meta files](https://www.fumadocs.dev/docs/headless/page-conventions)
- [Docs Layout: root-folder-derived and explicit tabs](https://www.fumadocs.dev/docs/ui/layouts/docs#layout-tabs-dropdown)

## Current Passionfruit state

The required tab model already exists:

- `src/app/docs/layout.tsx` builds `catalogTree` with `getCatalogPageTree()`,
  derives `catalogTabs` with `getLayoutTabs(catalogTree)`, and passes both to
  `GlassLayout`.
- The primary catalogue folders already declare `root: true` in their
  `content/docs/<category>/meta.json` files.
- `src/lib/source.ts` preserves those page-tree folders while adding the
  JSON-backed device routes. This is the correct place to keep data-backed
  detail pages attached to their active category tab.

The current `GlassLayout` renders that correct tab set as an official
dropdown; it does not render a desktop horizontal tab strip.

## Decision

### First-party top strip: move `/docs` to `DocsLayout`

Replace `GlassLayout` with `DocsLayout`, preserve `catalogTree` and
`catalogTabs`, and add `tabMode="top"`. Update the page components to import
from `fumadocs-ui/layouts/docs/page`, because Fumadocs requires page imports
to match the selected layout.

This produces first-party top tabs, category-scoped sidebars, and no custom
tab state or route matching.

### Preserve Glass: build a custom header tab strip

If the floating Glass visual language is required, retain `GlassLayout` and
extend the existing `GlassAccountHeader` slot. The official Glass API exposes
`slots.header`; that component can read `useGlassLayout().props.tabs` and
render a responsive row of links using Fumadocs' current-path utilities.
Keep the existing dropdown for mobile or provide an equivalent compact
control.

This is deliberately custom. Fumadocs' Glass documentation states that its
layout tabs are shown as a dropdown in the sidebar, and its built-in source
contains only `LayoutTabsDropdown`; Glass has no supported `tabMode="top"`.

Sources:

- [Glass Layout: layout tabs and slots](https://www.fumadocs.dev/docs/ui/layouts/glass)
- [Installed Glass layout type](../../node_modules/fumadocs-ui/dist/layouts/glass/index.d.ts)

## Recommendation

Use `DocsLayout` with `tabMode="top"` when “tabs across the top” is a product
requirement. Keep the existing `catalogTree` and root-folder metadata
unchanged. Use a custom Glass header only when Glass is a fixed visual
requirement worth maintaining outside Fumadocs' built-in layout-tabs surface.

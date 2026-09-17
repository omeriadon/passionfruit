# Device notes

This directory contains human-authored metadata beside the canonical device data. It is separate from `public/data`; editing a note never changes harvested JSON.

Each note is stored at `content/device-notes/<category>/<device-id>.md`. Accessory datasets use `other/<dataset>`.

Frontmatter shape:

```yaml
goodToBuy: none
goodToBuyText: ""
editorial: "No editorial note has been authored yet."
```

`goodToBuy` is `yes`, `no`, or `none` and controls the badge color. `goodToBuyText` is optional free text shown in the detail view when non-empty. `editorial` is a short detail-view paragraph.

The loader returns safe defaults when a note is missing, malformed, or incomplete.

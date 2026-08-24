# Device notes

This directory contains human-authored metadata beside the canonical device data. It is separate from `public/data`; editing a note never changes harvested JSON.

Each note is stored at `content/device-notes/<category>/<device-id>.md`. Accessory datasets use `other/<dataset>`.

Frontmatter shape:

```yaml
goodToBuy: unknown
editorial: "No editorial note has been authored yet."
tags: []
```

`goodToBuy` is `yes`, `no`, `caution`, or `unknown`. Use `unknown` until an opinion is authored. `editorial` is a short detail-view paragraph. `tags` is an optional list of short strings.

The loader returns safe defaults when a note is missing, malformed, or incomplete.

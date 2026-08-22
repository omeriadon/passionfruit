# General extraction rules

These rules apply to every device type (iPad, Apple Pencil, keyboards, …). Device-specific fields live in the sibling `<device>.md` rule file.

## Input

- Source HTML files are DevTools page exports from Apple, placed in `data/tmp/`.
- Never scrape or fetch Apple's live website. Extract from the supplied HTML only.
- One export may cover several devices; extract everything present.

## Output layout

- Extracted data lives under `public/data/<section>/`, where the section is the product family (e.g. `ipad`).
- Each device type gets one JSON file named after itself: `public/data/ipad/ipad.json`.
- Related datasets for the same section (e.g. `apple-pencils.json`, `keyboards.json`) sit next to it in the same folder.
- Every JSON file has a schema file directly next to it, named `<name>.schema.json`, describing the exact shape of that JSON. Keep schemas in sync whenever data changes.

## Status

- Each device type has a status file at `data/status/<device>.md` listing which devices have been added and which known devices are not yet extracted.
- Only devices that support the current OS release are tracked; devices dropped from current OS support are out of scope.
- Keep the status file updated as part of every extraction change.

## Data conventions

- Prices are in AUD and are always the cheapest available price for that model.
- Record names exactly as Apple displays them.
- Nothing found in the source HTML may be skipped: all colours, capacities/configurations, and image variants must be represented.

## Images

- Keep each image's original Apple-hosted URL in the JSON so the app can fetch it directly from Apple.
- Also save a local copy into the repo, referenced by its public path.
- Preserve the original fixed canvas dimensions; preserve transparent padding and alpha exactly.
- Never crop, resize, flatten, or regenerate images. Some smaller devices use smaller artwork positioned inside a larger transparent canvas — keep that composition as-is.
- Store local copies under `public/data/<section>/images/`.

## Before finishing a dataset

- Verify every colour, configuration, and image variant found in the HTML is represented.
- Check that every recorded Apple URL corresponds to a saved local file, and vice versa.
- Run lightweight project validation (prettier + type check).
- Review the diff for unrelated changes.
- Commit the completed atomic change for that dataset on its own branch.

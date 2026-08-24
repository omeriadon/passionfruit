# General extraction rules

These rules apply to every device category. Read the matching sibling category rule and the category's JSON Schema before extraction.

## Contract boundary

- Treat every category as an independent data type with its own schema. Do not copy fields from another category because the products share a capability.
- Use only fields declared by the target category schema. Omit category-inapplicable fields.
- Do not add a device-level `family` discriminator. A nested chip `family` value describes processor lineage only.
- Record facts in the schema's typed fields. Do not create summary arrays or free-form specification lists.
- Emit arrays as arrays. Use `[]` when the source has no values; never use `null` for an array.
- Emit booleans as `true` or `false`; never use `null` for a boolean.
- Use `null` only where the category schema explicitly permits it. Preserve an unknown optional value by omitting its key when the schema permits omission.
- Keep iPad and iPhone records separate. Their similarly named fields are category-owned and are not interchangeable.

## Input

- Source HTML files are DevTools page exports from Apple under `data/tmp/`.
- Extract from the supplied HTML. Do not replace local evidence with a live scrape.
- One export may cover several devices. Account for every in-scope device and every relevant value present.
- Prefer supplied local evidence. Research missing facts only when the task explicitly authorizes research, and record the source in `sourceNotes`.

## Output layout

- Canonical data lives at `public/data/<category>/<category>.json`.
- Each canonical file has an adjacent independent schema at `public/data/<category>/<category>.schema.json`.
- Related product types use their own dataset and schema. Do not force accessories into the parent device schema.
- Keep canonical JSON and its schema synchronized.

## Status

- Each primary category has a status file at `data/status/<category>.md`.
- Track only devices in the agreed current-OS scope.
- Update status evidence as part of an extraction change when status-file ownership is in scope.

## Data conventions

- Record product names exactly as Apple displays them.
- Prices are AUD and represent the cheapest displayed price for that exact model or configuration.
- Preserve all category-relevant colours, capacities, configurations, factual variants, and image variants present in the evidence.
- Preserve individual facts in their typed object fields. Place evidence qualifications in `sourceNotes`, not in substitute summary prose.

## Images

- Keep the original Apple-hosted URL in the JSON.
- Save a local byte-identical copy under `public/data/<category>/images/` and record its public path.
- Preserve the original fixed canvas, transparent padding, alpha, dimensions, and file bytes.
- Record each image's actual width and height.
- Never crop, resize, flatten, or regenerate source images.

## Completion criteria

- Every in-scope device and every category-relevant value in the evidence is represented.
- Every recorded Apple image URL has a non-empty local file, and every canonical local image reference resolves.
- The canonical JSON passes Ajv against its adjacent schema.
- Formatting and `git diff --check` pass.
- The diff contains only the intended atomic dataset change.

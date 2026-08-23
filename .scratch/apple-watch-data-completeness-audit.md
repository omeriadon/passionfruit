# Apple Watch Data Completeness Audit

Date: 2026-08-23

Scope: `public/data/apple-watch/apple-watch.json`, the seven local captures under `data/tmp/watch/`, and authoritative Apple product/support material. The 17-device identity set was preserved. No source HTML, schema, or duplicate public Watch assets were changed.

## Completed

- Reconciled all 17 device records against the model columns in `data/tmp/watch/watch.html`.
- Populated or corrected source-backed display material, OLED/LTPO construction, peak brightness, and always-on state.
- Populated or corrected chip names and processor descriptions.
- Populated normal and Low Power Mode runtime where the source gives a numeric value.
- Populated fast-charge values where the source gives a numeric 0–80% duration.
- Added the source-backed GPS precision flag and 5G capability for the three current models that explicitly expose it.
- Corrected water depth, swim/sport classification, and siren state from the compare rows.
- Added case height, width, thickness, and all listed case weights for every device where the local source provides them. All 17 now have non-empty dimensions and weights.
- Populated `watchDetails.completeSummary` with selected source-backed facts for all 17 devices.

Apple’s technical specifications confirm the same data categories and values, including case dimensions, weights, chip descriptions, battery runtime, charging, display brightness, and 64GB capacity for modern models: [Apple Watch Series 10 Technical Specifications](https://support.apple.com/en-ie/121202), [Apple Watch Ultra 2 Technical Specifications](https://support.apple.com/en-gb/111832). The local compare captures remain the primary source for this repository’s canonical values.

## Intentionally empty

The following arrays remain empty for all 17 devices because they are not evidenced as applicable fields in the supplied compare data and were explicitly excluded from fabricated completion:

- `configurations`: 17 empty. The compare page does not provide a stable canonical configuration catalogue for these records.
- `storageOptions`: 17 empty. The compare page does not expose storage, and storage was explicitly excluded.
- `cameras`: 17 empty. Apple Watch models do not have cameras.
- `accessories`: 17 empty. No accessory-reference extraction was requested in this task.

Other remaining gaps are evidence gaps, not missing-file failures:

- `overviewImages` is populated for 7 devices; no additional local overview assets were added.
- `priceAud` remains null for 5 discontinued devices where no current authoritative AU price is evidenced.
- Battery low-power hours remain absent where the compare row only says “Low Power Mode” without a numeric duration.
- Battery capacity, display resolution/area, and historical launch software versions remain null where the local captures do not provide values and no additional value was required to resolve the Watch completeness gap.

## Validation

Focused structural and asset audit passed:

- JSON parses successfully.
- 17 devices and 17 unique IDs.
- All seven local source model columns are represented.
- 17/17 dimensions present.
- 17/17 weights present.
- 17/17 summaries present.
- 112/112 canonical image references exist and are non-empty.
- `git diff --check` passed for the canonical Watch JSON.

The repository’s existing `.scratch/strict/watch/validate-watch.mjs` could not execute because it dereferences a missing `overlay.definitions.device` structure before validation. The repository-wide canonical validator also reports the pre-existing Watch schema/data contract mismatch, including required fields unrelated to this task. No schema was modified to conceal that problem.

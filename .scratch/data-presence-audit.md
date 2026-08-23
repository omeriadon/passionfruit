# Data Presence Audit

Date: 2026-08-23

Scope: read-only audit of the canonical section files, schemas, templates, images, source inputs, and Apple Watch references. No canonical JSON, source input, image, or existing worker file was changed. No build was run. Existing validation artifacts were inspected; validation scripts that write reports were not rerun.

## Result

The eight canonical section JSON files, eight public section schemas, eight templates, and all canonical image references are present. Every canonical JSON file parsed successfully. Device IDs and names are unique within every section.

| Section | Devices | JSON image references | Image files | Missing referenced images | Top-level empty/null fields |
| --- | ---: | ---: | ---: | ---: | --- |
| AirPods | 9 | 17 | 17 | 0 | `hearingHealth` 5, `liveTranslation` 4, `ipRating` 2, `audioTechnologies` 1, `microphones` 1 |
| Apple TV | 1 | 37 | 39 | 0 | `priceAud` 1, `displays` 1, `cameras` 1 |
| Apple Watch | 17 | 112 | 136 | 0 | `configurations` 17, `storageOptions` 17, `cameras` 17, `accessories` 17, `overviewImages` 10, `priceAud` 5, `memoryOptions` 5 |
| HomePod | 2 | 57 | 52 | 0 | `priceAud` 2, `configurations` 2, `storageOptions` 2, `displays` 2, `cameras` 2, `accessories` 2 |
| iPad | 40 | 6 | 6 | 0 | `colors` 38, `configurations` 40, `accessories` 40, `priceAud` 36, `memoryOptions` 3, `overviewImages` 1 |
| iPhone | 38 | 88 | 69 | 0 | `accessories` 19, `priceAud` 32, `colors` 19, `configurations` 19, `memoryOptions` 19, `overviewImages` 19, `storageOptions` 7 |
| Mac | 49 | 45 | 45 | 0 | `accessories` 49, `priceAud` 8, `configurations` 34, `forceTouchTrackpad` 34, `backlitKeyboard` 34, `overviewImages` 34, `storageOptions` 6, `memoryOptions` 6 |
| Vision | 1 | 30 | 30 | 0 | `priceAud` 1 |

The difference between reference counts and directory file counts is not itself an error: canonical data can reference the same asset more than once, and some staged assets are unreferenced. The reference-existence check found zero missing paths.

## Apple Watch

- Canonical JSON is present at `public/data/apple-watch/apple-watch.json` and contains 17 devices.
- Canonical schema is present at `public/data/apple-watch/apple-watch.schema.json`.
- Canonical Watch image directory is present at `public/data/apple-watch/images/` with 136 files.
- All 112 Watch `localPath` values resolve to non-empty files under the canonical directory.
- No canonical JSON reference uses `public/data/watch/`.
- The stale directory `public/data/watch/images/images/` still exists with 112 files. A SHA-256 comparison found all 112 have byte-identical counterparts in `public/data/apple-watch/images/`; it contains no unique asset and is not referenced by canonical JSON.
- The expected Watch candidate files are present: `.scratch/strict/watch/strict-devices.json`, `.scratch/strict/apple-watch/remaining-devices.json`, `.scratch/strict/apple-watch/validation-remaining.json`, and `.scratch/strict/apple-watch/validate-remaining.mjs`.
- `.scratch/strict/apple-watch/remaining-devices.validation.json` is absent, but no current status or canonical reference requires that exact filename.

Watch data is structurally present but sparse. Every one of the 17 devices has empty `configurations`, `storageOptions`, `cameras`, and `accessories`. Ten have empty `overviewImages`; five have null `priceAud`; five have empty `memoryOptions`. These are completeness gaps, not missing-file failures. The source-by-source audit must determine whether each value is absent from the seven Watch HTML captures or was not extracted.

## Schemas and templates

- All eight section schemas exist.
- All eight templates exist.
- Existing `.scratch/template-validation/README.md` records zero schema errors for every template.
- Seven public section schemas are byte-identical to `.scratch/strict/data-model-contract.schema.json`.
- The Apple Watch schema differs byte-for-byte only in Prettier-style array formatting; the displayed diff contains no semantic schema change. It should still be normalized before treating byte identity as a repository invariant.
- Existing `.scratch/merge-audits/final-validation-report.json` records 8/8 sections valid, 157 devices, 392 image references, and zero invalid image references. This artifact was not regenerated during this audit and therefore does not account for unrelated concurrent edits after its recorded validation.

## Source inputs

All expected source directories exist and contain the expected HTML files. Every source file is non-empty except:

- `data/tmp/airpods/airpod3.html` — 0 bytes
- `data/tmp/iphone/iphone7.html` — 0 bytes

The remaining 43 HTML files are non-empty. The two zero-byte files are present as paths but cannot provide extraction evidence; any claimed coverage relying on them is unverified.

## Files not found

No canonical section JSON, public section schema, template, or canonical referenced image was missing. No missing Apple Watch JSON was found. The observed Watch issue is stale redundant imagery plus sparse fields, not an absent canonical JSON file.

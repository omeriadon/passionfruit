# Planck remaining SOURCE_ONLY extraction checkpoint

## Batch 1 — Apple Watch Series 1–5

- Timestamp: 2026-08-23T05:55:00Z.
- State: complete and Ajv Draft 2020-12 valid with zero errors.
- Output: `.scratch/strict/apple-watch/remaining-devices.json`.
- Validation report: `.scratch/strict/apple-watch/validation-remaining.json`.
- Evidence matrix: `.scratch/strict/apple-watch/remaining-hidden-evidence.tsv`.
- Device count: 5.
- Images asserted: 0. No target image bytes or CSS swatch values are present in supplied HTML or owned staging; no Apple URLs were fabricated.
- Contract placeholders recorded in `sourceNotes`: white swatches, passcode authentication, CPU total 1, and speaker false where evidence is absent.

## Batch 2 — iPad mini 2

- Timestamp: 2026-08-23T06:00:00Z.
- State: complete and Ajv Draft 2020-12 valid with zero errors.
- Output: `.scratch/strict/ipad/remaining-devices.json`.
- Validation report: `.scratch/strict/ipad/validation-remaining.json`.
- Evidence matrix: `.scratch/strict/ipad/remaining-hidden-evidence.tsv`.
- Device count: 1.
- Images asserted: 0. No target image bytes are staged and no Apple URL was fabricated.

## Batch 3 — iPhone SOURCE_ONLY rows

- Timestamp: 2026-08-23T06:35:00Z.
- State: complete and Ajv Draft 2020-12 valid with zero errors.
- Output draft: `.scratch/strict/iphone/remaining-devices.json`.
- Evidence matrix: `.scratch/strict/iphone/remaining-hidden-evidence.tsv`.
- Validation report: `.scratch/strict/iphone/validation-remaining.json`.
- Device count: 20.
- Images asserted: 0. The 69 staged images are unrelated to this target-specific batch and were not assigned; no Apple URLs were fabricated.
- Contract normalization recorded: Bluetooth values use full contract enum labels, Wi-Fi uses normalized enum labels, USB 3 evidence maps to `USB 3.2 Gen 1`, and unsupported camera megapixel values remain omitted rather than inferred as zero.
- Removed temporary paths after validation:
  - `.scratch/strict/iphone/build-remaining.mjs`
  - `.scratch/tmp/iphone-evidence-readable.txt`
  - `.scratch/tmp`

## Batch 4 — Mac SOURCE_ONLY rows

- State: in progress.
- Evidence matrix: `.scratch/strict/mac/remaining-hidden-evidence.tsv`.
- Output: `.scratch/strict/mac/remaining-devices.json` does not exist.

## Resume — iPhone reconciliation and validation

- Timestamp: 2026-08-23T15:03:04+08:00.
- Reconciled `.scratch/strict/iphone/remaining-devices.json` against the 19 exact-evidence gaps in `.scratch/source-gap-report.md`.
- Removed `iPhone 14 Pro Max`: it was source-supported but unsupported by the authoritative 19-device target list, while canonical coverage already includes iPhone 14 Pro.
- Exact-name comparison with all 19 report entries has no differences.
- Device count after reconciliation: 19.
- Validation report: `.scratch/strict/iphone/validation-remaining.json`.
- Validator: Ajv Draft 2020-12 with `allErrors`, strict mode, `allowUnionTypes`, and a runtime `uri` format registration.
- Result: valid; 0 errors. Initial strict-mode diagnostics were validator registration issues only: unregistered `uri` format and union types requiring `allowUnionTypes`; schema and instance data were unchanged.
- Mac work was not started.

## Planned Stop

- Timestamp: 2026-08-23T05:54:46Z.
- Completed Ajv-valid devices: Apple Watch Series 1–5 (5), iPad mini 2 (1), and iPhone SOURCE_ONLY rows (20), total 26 of 66.
- Exact next atomic step: build the remaining 40 Mac devices from supplied HTML-derived evidence, validate incrementally, then update status files only after all 66 devices are valid.

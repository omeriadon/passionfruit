# AirPods Final Merge Audit

## Final Validation

- Canonical file: `public/data/airpods/airpods.json`.
- Public schema: `public/data/airpods/airpods.schema.json`.
- Schema source: `.scratch/strict/data-model-contract.schema.json`, byte-identical by SHA-256.
- Draft: 2020-12.
- Compiler: Ajv 2020 with `allErrors` enabled and strict mode disabled.
- Canonical validation: valid across all nine devices; zero errors.
- URI boundary: `ajv-formats` is unavailable. Ajv's unknown-format error was avoided with a local `new URL(value)` validator for every schema `format: "uri"` declaration; all values parsed successfully.

## Canonical Migration

- Migrated all nine devices from the legacy AirPods shape to the universal strict `airPodsDevice` discriminator branch.
- Resolved required fields and retained only contract-defined properties through `additionalProperties: false`.
- Preserved the canonical structured chip objects rather than collapsing them to the permitted string branch.
- Preserved all 158 unique source-backed scalar facts with no missing or invented facts.
- Preserved structured `null` values: five `hearingHealth`, four `liveTranslation`, and two `ipRating`.
- Preserved color `displayName` data in the canonical source; the AirPods color contract itself has no `displayName` property.

## Image Verification

- Normalized all 17 image references to `label`, `appleUrl`, `localPath`, `widthPx`, and `heightPx`.
- All referenced paths are repository-relative files under `public/data/airpods/images/`.
- Missing files: 0.
- Embedded PNG dimensions match JSON dimensions for 17 of 17 references.
- Unique image hashes: 10. Duplicate references are intentional content reuse across AirPods 4 variants, AirPods Max generations, and third-generation charging variants.
- No image bytes were copied, re-encoded, or changed.

## Evidence

- Current Ajv and integrity evidence: `.scratch/strict/airpods/validation-report.json`.
- Image mapping authority: `.scratch/image-path-map.md`.
- No Git operations were performed.

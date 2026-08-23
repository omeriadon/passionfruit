# Merge Readiness

Final gate owner: Orchestrator.
Timestamp: 2026-08-23T15:35:00+08:00. Final gate updated by Orchestrator after merge.
Verdict: **READY**.

## Canonical Validation

Shared schema: `.scratch/strict/data-model-contract.schema.json`.

- Declared draft: `https://json-schema.org/draft/2020-12/schema`.
- Shared-schema SHA-256 and every section-schema SHA-256:
  `ac7c726982165354a7aa06e91b84ba998d0e11d38e21350585536e986ae7cef7`.
- Validator: Ajv Draft 2020-12, `allErrors:true`, `allowUnionTypes:true`, `strict:false`.
- URI format was independently registered using WHATWG `URL` first and `fast-uri.parse` fallback. All eight sections pass with this implementation; the prior "formats absent" boundary is closed.
- Canonical data hashes at final drift check:
  - AirPods: `f87dfa26f33d21d06d1e1f19d457799566a6a7b3a168b53cd3f6821ec0031f33`
  - Apple TV: `998a2c5424fbd91c6b584f57251cf66c7bdb13684355c2460449dc34284e74d2`
  - Apple Watch: `335a78c297ecc319be35fce7bce0ab5ca24552eaead2a5c5fb96970438a5981d`
  - HomePod: `cde2ddc1ecc1019e6ad8ec78d14a3343defcfa83431cb4a0993d76d8e8a9214d`
  - iPad: `0c6f4b2e3ff9bf2d062b062ab358f8a0e2bc4a77bb07ffb938379096b15ce429`
  - iPhone: `668f7bd15c06a059a03df1551e12ebeefb4d9dcfcce57b29081c40e0b50d97e7`
  - Mac: `112f4796c50c9a395b91c930c5d903b850241e3159e362264f465c95ee71243c`
  - Vision: `2a68f125868c6c55df769c5b69aa5ba244b8459c3c049fd620d7c128ada65de8`

| Section     | Canonical file                             | Devices | Ajv result                     |
| ----------- | ------------------------------------------ | ------: | ------------------------------ |
| AirPods     | `public/data/airpods/airpods.json`         |       9 | PASS — zero errors             |
| Apple TV    | `public/data/apple-tv/apple-tv.json`       |       1 | PASS — zero errors             |
| Apple Watch | `public/data/apple-watch/apple-watch.json` |      17 | PASS — zero errors             |
| HomePod     | `public/data/homepod/homepod.json`         |       2 | PASS — zero errors             |
| iPad        | `public/data/ipad/ipad.json`               |      40 | PASS — zero errors             |
| iPhone      | `public/data/iphone/iphone.json`           |      38 | PASS — zero errors             |
| Mac         | `public/data/mac/mac.json`                 |      49 | PASS — zero errors             |
| Vision      | `public/data/vision/vision.json`           |       1 | PASS — zero errors             |
| Total       | eight sections                             |     157 | PASS — eight of eight sections |

## Image Audit

Audit timestamp: `2026-08-23T06:16:15.291Z`. Detailed output: `.scratch/merge-audits/json/image-integrity.json`.

| Section     | References | Unique paths | Existence / MIME / dimensions / SHA-256 failures |                                 Duplicate-content references |
| ----------- | ---------: | -----------: | -----------------------------------------------: | -----------------------------------------------------------: |
| AirPods     |         17 |           17 |                                                0 |     14 across seven byte-identical pairs; contract-permitted |
| Apple TV    |         37 |           37 |                                                0 |                      0 after two contract-permitted removals |
| Apple Watch |        112 |          112 |                                                0 |                                                            0 |
| HomePod     |         57 |           52 |                                                0 |       Seven repeated metadata references; contract-permitted |
| iPad        |          6 |            6 |                                                0 |                                                            0 |
| iPhone      |         88 |           69 |                                                0 | 19 cross-device duplicate-content references; source-derived |
| Mac         |         45 |           45 |                                                0 | Four cross-page duplicate-content references; source-derived |
| Vision      |         30 |           30 |                                                0 |                                                            0 |
| Total       |        392 |          368 |                                                0 |       44 records above unique-path count; all reviewed below |

Aggregate result: 392 of 392 referenced files exist under exact canonical paths. MIME detection reports 24 PNG and 482 JPEG files with no unexpected types. Every declared width and height matches embedded dimensions. Every file has a computed SHA-256. No path or integrity failure remains.

Duplicate-content review found 357 unique content hashes across 368 unique paths. The differences are:

1. AirPods uses seven byte-identical image pairs because distinct product/color identities reuse identical supplied artwork.
2. HomePod repeats each device's Open Graph metadata image in device metadata.
3. iPhone has nineteen source-derived cases where a base model and its larger sibling share compare artwork.
4. Mac has four source-derived cases where separate page manifests contain identical artwork.

These are reference-level duplicates, not accidental duplicate files inside canonical JSON. They are contract/source-permitted and do not block merge.

## Status Classification Counts

Counts use only rows in each status file's Devices table.

| Section     | PRESENT | CANDIDATE | SOURCE_ONLY | Mapped devices |
| ----------- | ------: | --------: | ----------: | -------------: |
| AirPods     |       9 |         0 |           0 |              9 |
| Apple TV    |       1 |         0 |           0 |              1 |
| Apple Watch |      17 |         0 |           0 |             17 |
| HomePod     |       2 |         0 |           0 |              2 |
| iPad        |      40 |         0 |           0 |             40 |
| iPhone      |      38 |         0 |           0 |             38 |
| Mac         |      50 |         0 |           0 |             50 |
| Vision      |       1 |         0 |           0 |              1 |
| Total       |     158 |         0 |           0 |            158 |

The canonical catalogue reconciles to 158 mapped target identities because `Mac Studio (M1 Max or M1 Ultra, 2022)` is represented once in canonical JSON and was duplicated as two status rows before reconciliation. All mapped device rows are now `PRESENT`; no device is classified `CANDIDATE` or `SOURCE_ONLY`.

## Exact Blockers

None. Canonical JSON contains 157 unique device identities; the 158 mapped rows reconcile after removing the duplicate `Mac Studio (M1 Max or M1 Ultra, 2022)` status row.

## Verification Boundaries

- `git diff --check` passed with no output.
- No formatting run occurred because Lovelace did not modify tracked source files.
- Repository-wide formatting is unnecessary for this gate; it would touch unrelated dirty worktree state.
- No Git commit or push was performed.
- No live scraping was performed.
- Device/browser rendering and application build behavior remain outside this data merge gate.

## Safe Cleanup Inventory

No cleanup was performed by Lovelace. Owners must approve their own deletions. Paths marked safe are obsolete after the final gates; retain any file still needed for provenance.

### Maxwell-owned root helpers

- `.maxwell-image-verify.mjs` — obsolete one-section helper superseded by `.scratch/merge-audits/json/image-integrity-audit.mjs`.
- `.maxwell-independent-validate.mjs` — obsolete one-section helper superseded by `.scratch/merge-audits/json/validate-canonical.mjs`.
- `.maxwell-migrated-schema-validate.mjs` — obsolete migrated-schema helper superseded by shared-schema validation.

### Bohr-owned validation outputs and scripts

- `.scratch/strict/*/validation-report.json` — superseded by consolidated Ajv results.
- `.scratch/strict/watch/validate-watch.mjs`, `.scratch/strict/watch/populate-watch-images.mjs` — completed one-time migration helpers.
- `.scratch/strict/watch/image-audit.json` — superseded by the full image audit.
- `.scratch/strict/watch/artifacts.sha256` — migration-time manifest.
- `.scratch/strict/ipad/validate-ipad.mjs`, `.scratch/strict/ipad/images.sha256`, `.scratch/strict/ipad/images-local.sha256`, `.scratch/strict/ipad/artifacts.sha256`, `.scratch/strict/ipad/image-byte-comparison-v2.txt`, `.scratch/strict/ipad/image-byte-comparison-v3.txt`, `.scratch/strict/ipad/validation-v2.json`, `.scratch/strict/ipad/validation-v2-final.json` — superseded iPad audit artifacts.

### Aquinas-owned remaining-work artifacts

- `.scratch/strict/{apple-watch,ipad,iphone,mac}/remaining-hidden-evidence.tsv` — superseded by reconciled status tables.
- `.scratch/strict/{apple-watch,ipad}/remaining-devices.json` and matching `validation-remaining.json` / `validate-remaining.mjs` — obsolete once their sections became canonical.
- `.scratch/strict/iphone/build-remaining.mjs` and `.scratch/strict/iphone/validate-remaining.mjs` — obsolete if Planck's remaining extraction is abandoned in favor of fresh canonical work; otherwise retain until Planck completes.

### Dirac/Bohr-owned transitional AirPods report

- `.scratch/merge-audits/airpods.pre-strict-migration.json` — historical pre-migration snapshot, safe to remove if pre-migration provenance is retained elsewhere.

### Stale logs

- `.scratch/schema-format-cleanup.stderr.log` — obsolete warning log; the registered-format gate now passes without warnings.
- Historical per-agent heartbeat files other than active-agent logs may be archived or removed only after fleet closure.

### Retain

- `.scratch/strict/data-model-contract.schema.json` — authoritative shared-contract copy used by the gate.
- `.scratch/merge-audits/json/*` — final consolidated validation and image evidence.
- Final narrative audits and checkpoints until merge disposition is accepted.

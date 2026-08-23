# Complete Context

Generated: 2026-08-23.

## Objective And Current State

Convert user-supplied Apple AU HTML into strict canonical JSON for every device and accessory, preserve exact source evidence, stage exact local images, validate against a shared JSON Schema, and maintain auditable status documentation. The active branch is `data/ipad`; the pull request is #1, titled `data/add-preliminary-data`.

Current canonical state is 157 unique devices across eight sections. The evidence map contains 158 rows because one Mac Studio identity was duplicated in status reporting and reconciled to one canonical device. Ajv Draft 2020-12 validation passes all eight sections with zero errors. All 392 canonical image references exist. Device templates exist for all eight sections and each validates with zero errors.

## Canonical Counts

| Section     | File                                       | Devices | Image References |
| ----------- | ------------------------------------------ | ------: | ---------------: |
| AirPods     | `public/data/airpods/airpods.json`         |       9 |               17 |
| Apple TV    | `public/data/apple-tv/apple-tv.json`       |       1 |               37 |
| Apple Watch | `public/data/apple-watch/apple-watch.json` |      17 |              112 |
| HomePod     | `public/data/homepod/homepod.json`         |       2 |               57 |
| iPad        | `public/data/ipad/ipad.json`               |      40 |                6 |
| iPhone      | `public/data/iphone/iphone.json`           |      38 |               88 |
| Mac         | `public/data/mac/mac.json`                 |      49 |               45 |
| Vision      | `public/data/vision/vision.json`           |       1 |               30 |
| Total       | eight sections                             |     157 |              392 |

The source-map/status total is 158 mapped identities. The extra row is `Mac Studio (M1 Max or M1 Ultra, 2022)`, duplicated in status but represented once canonically.

## Repository And Git History

- Working branch: `data/ipad`.
- Remote: GitHub originally addressed as `omeriadon/apple-tracker`; GitHub reports it moved to `omeriadon/passionfruit`.
- Pull request: #1, renamed to `data/add-preliminary-data`.
- Completed atomic changes were committed and pushed to `origin/data/ipad`.

Important commits:

- `091ef8c` — initial setup.
- `373b6b0` — per-device extraction status.
- `a9fccfd`, `95cafec`, `a061459`, `be93f20` — incremental data batches.
- `293eee6` — device coverage lists.
- `cad0d92` — strict Mac reconciliation.
- `611edf9` — merge remaining device data.
- `b2f0893` — record pushed merge commit.
- `10045c1` — finalize merged statuses.
- `7421e41` — add HTML capture batches.
- `c1a7e46` — update missing-device capture list.
- `7a32ee3` — remove obsolete device gap files.
- `5a16bdc` — add human-readable contract.
- `d5b149d` — add accessory reference contract.
- `a347bf6` — add validated device templates.
- `ceee78d` — record device template status.

## Source Inputs

All supplied HTML lives under `data/tmp/<section>/`. Inventory:

- AirPods: four files.
- HomePod: two files.
- iPad: five files through `ipad5.html`.
- iPhone: nine files through `iphone9.html`.
- Mac: seven files through `mac7.html`.
- Watch: seven files through `watch7.html`.
- Other/accessories: `data/tmp/other/pencil.html`, `data/tmp/other/magic-keyboard.html`.
- Apple TV: `tv2.html`.
- Vision: `vision.html`.

No live scraping was used. Extraction uses only supplied local Apple AU HTML and staged assets.

## Data Architecture

### Canonical layout

- Device JSON: `public/data/<section>/<section>.json`.
- Section schema: `public/data/<section>/<section>.schema.json`.
- Images: `public/data/<section>/images/`.
- Shared schema source of truth: `.scratch/strict/data-model-contract.schema.json`.
- Templates: `public/data/templates/<section>.template.json`.
- Human contract: `.scratch/human-device-contract.md`.

### Identity rules

Device and accessory identifiers use lowercase, hyphenated name slugs. Device UUIDs were removed from the model. Storage options, memory options, configurations, media engines, and similar non-device entities retain stable generated slug IDs where needed.

### Accessory contract

The latest shared schema adds `accessoryReference` with an `accessoryId` slug reference and gives standard devices an `accessories` array. AirPods uses its separate specialized schema shape. Accessory groups are intended under `public/data/other/<group>/<group>.json`. Pencil and Magic Keyboard inputs are available, but concrete accessory JSON has not yet been extracted.

## Validation Gates

- Validator: Ajv Draft 2020-12 with `allErrors:true`, `allowUnionTypes:true`, and a registered URI format.
- Full gate: `node .scratch/final-validate.mjs`.
- Current result: 8/8 sections valid; zero schema errors; 157 devices; 392/392 image references valid.
- All section schemas are byte-for-byte copies of `.scratch/strict/data-model-contract.schema.json`; Apple Watch drift was corrected during this consolidation.
- Template summary: `.scratch/template-validation/README.md`; all eight templates are zero-error skeletons.
- Historical image audits found permitted reference-level duplicates across identities, but no accidental duplicate file inside a single canonical collection. Exact transparent canvases and dimensions were verified historically.

## Device Template Contract

Templates are minimal schema-valid starting points, not fabricated examples.

| Section     | Template                                          |
| ----------- | ------------------------------------------------- |
| AirPods     | `public/data/templates/airpods.template.json`     |
| Apple TV    | `public/data/templates/apple-tv.template.json`    |
| Apple Watch | `public/data/templates/apple-watch.template.json` |
| HomePod     | `public/data/templates/homepod.template.json`     |
| iPad        | `public/data/templates/ipad.template.json`        |
| iPhone      | `public/data/templates/iphone.template.json`      |
| Mac         | `public/data/templates/mac.template.json`         |
| Vision      | `public/data/templates/vision.template.json`      |

AirPods uses its specialized field set. Standard devices use fields including identity, family, release year, price, colours, configurations, storage, memory, chips, displays, cameras, audio, battery/power, connectivity, authentication, physical data, resistance, software, watch details, overview images, optional Mac hardware booleans, accessories, and source notes. Exact types and enums are in `.scratch/human-device-contract.md`.

## Agent History

The hard cap later stabilized at three workers plus orchestrator. Foreground commands only. No background terminals or daemons. Workers appended timestamps to heartbeat logs while active and wrote checkpoints before stopping.

Major historical agents included:

- **Maxwell / Chandrasekhar:** image integrity, migration checks, and verification support.
- **Bohr:** schema remediation and consolidated validation work.
- **Noether:** image/reference audits, TV dimension repair, and canonical freeze support.
- **Pauli:** source-gap checklist and stale-status cleanup.
- **Lovelace:** fleet reconciliation and merge readiness; reconciled duplicate Mac Studio status rows.
- **Fleet-Sync:** bounded foreground reconciliation.
- **Hegel:** iPhone SOURCE_ONLY extraction; delivered 19 devices.
- **Herschel:** Mac SOURCE_ONLY candidates; delivered 35 candidates, 34 merged after duplicate reconciliation.
- **Mac-Resume:** reconciled 34 Mac devices to valid state.
- **Planck:** remaining-device inspection and targeted extraction groundwork.
- **Copernicus:** extracted iPhone 14 Pro Max.
- **Popper:** extracted three modern Macs.
- **Ohm:** parsed legacy Mac candidate but left 109 schema errors.
- **Sagan:** resumed/repaired legacy Mac work; hit rate limits before completion.
- **Gödel:** finalized and pushed the human-readable contract.
- **Peirce:** implemented the accessory-reference schema contract, copied schemas byte-for-byte, validated all canonical sections, committed/pushed `d5b149d`.
- **Boyle:** independent full-catalogue coverage audit; no confirmed completion artifact was present at handoff.
- Other named agents processed section batches, hidden evidence, images, status tables, cleanup inventories, and merge audits.

Historical heartbeat and checkpoint artifacts were removed during the conservative scratch cleanup. They were untracked working-history evidence rather than canonical runtime data.

## Known Issue: Legacy Watch Images

`public/data/watch/images/images/` contains 112 tracked JPGs. It is a stale intermediate path with a doubled `images/images` component. Canonical watch data references none of those paths; Apple Watch has its own 136 files under `public/data/apple-watch/images/`. This directory should not be treated as canonical data and remains pending explicit cleanup review.

## Apple Watch Coverage Boundary

Apple Watch is schema-valid, but coverage is not uniformly dense across all 17 devices. Empty top-level arrays by device count:

- `configurations`: 17/17 empty.
- `storageOptions`: 17/17 empty.
- `cameras`: 17/17 empty.
- `accessories`: 17/17 empty.
- `overviewImages`: 10/17 empty.
- `priceAud`: null on 5/17 devices.

Core chip, display, audio, battery/power, connectivity, authentication, physical, resistance, software, colour, and watch-detail structures are populated. A source-by-source audit of the seven watch HTML files is required before deciding whether these empties are unavailable in source or unfinished extraction.

## Accessory Work Remaining

1. Design concrete accessory group JSON using the accepted `accessoryId` contract.
2. Extract Apple Pencil data from `data/tmp/other/pencil.html`.
3. Extract Magic Keyboard data from `data/tmp/other/magic-keyboard.html`.
4. Stage exact accessory assets and verify bytes/dimensions.
5. Link compatible devices through their `accessories` arrays using slugs.
6. Validate all affected canonical sections plus new accessory groups.
7. Commit and push atomic accessory stages.

## Cleanup Pending Explicit Decision

- Delete stale `public/data/watch/images/images/` only after a byte-level overlap check confirms no needed unique asset.
- Remove temporary extraction scripts and superseded validation outputs only when provenance is no longer needed.
- Preserve final audit reports, checkpoints, heartbeats, source inputs, canonical JSON, schemas, templates, and images until PR acceptance.
- Do not run repository-wide Prettier over canonical expanded-array JSON; it compacts arrays and conflicts with established formatting.

## Verification Boundaries

- Schema/image gates prove structural validity and referenced-file existence, not semantic completeness against every possible Apple product generation.
- Historical coverage reported all mapped target identities present, but Boyle’s independent audit did not leave a confirmed completion artifact in this handoff state.
- Concrete accessory JSON does not yet exist despite the accessory contract being merged.
- Runtime website rendering/building was not part of this dataset gate.
- No production deployment occurred.

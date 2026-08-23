# Aquinas final canonical validation

Timestamp: 2026-08-23T13:33:30+0800 local reconciliation window.

## Ajv Draft 2020-12

All six merged instances validate against `.scratch/strict/data-model-contract.schema.json` with zero errors.

| Section  | Devices | Result |
| -------- | ------: | ------ |
| iPhone   |      19 | Valid  |
| AirPods  |       9 | Valid  |
| Mac      |      15 | Valid  |
| Apple TV |       1 | Valid  |
| HomePod  |       2 | Valid  |
| Vision   |       1 | Valid  |

AirPods was migrated to the root contract's dedicated `airPodsDevice`, `airPodsColor`, and `airPodsImage` branches. The pre-migration snapshot is retained at `airpods.pre-strict-migration.json`.

## Shared strict schema migration

Every section now has the authoritative repository-local contract SHA-256:

`49701e720bd04aa3a119afedd961d01e66daac07d54c04ead8414577af548597`

## Image verification and duplicate removal

Every unique staged reference was byte-compared to its canonical public copy, and MIME type plus declared dimensions were checked against source metadata.

| Section  | Unique references | Verified | Missing | Hash or MIME mismatch | Duplicate copies removed |
| -------- | ----------------: | -------: | ------: | --------------------: | -----------------------: |
| iPhone   |                69 |       69 |       0 |                     0 |                       68 |
| AirPods  |                17 |       17 |       0 |                     0 |                        9 |
| Mac      |                45 |       45 |       0 |                     0 |                       40 |
| Apple TV |                39 |       39 |       0 |                     0 |                        0 |
| HomePod  |                52 |       52 |       0 |                     0 |                       51 |
| Vision   |                30 |       30 |       0 |                     0 |                      123 |

Apple TV's two duplicate-content manifest references correctly resolve to the two existing canonical copies. Five nested duplicate image directories were quarantined under `.scratch/merge-audits/quarantine/`; no files were deleted by destructive shell command.

## Final state

iPad and Apple Watch remain unmerged as required. No Git operations were performed.

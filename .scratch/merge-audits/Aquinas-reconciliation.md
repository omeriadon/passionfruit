# Aquinas canonical integration reconciliation

Timestamp: 2026-08-23T13:33:30+0800

## Canonical merge state

Six sections remain merged in `public/data`: iPhone 19 devices, AirPods 9, Mac 15, Apple TV 1, HomePod 2, and Vision 1.

## Ajv validation

All six repository-local strict candidates pass the root Draft 2020-12 contract with zero errors:

| Section  | Devices | Errors |
| -------- | ------: | -----: |
| iPhone   |      19 |      0 |
| AirPods  |       9 |      0 |
| Mac      |      15 |      0 |
| Apple TV |       1 |      0 |
| HomePod  |       2 |      0 |
| Vision   |       1 |      0 |

Canonical instances have not yet been rerun after their earlier normalization edits. The interrupted canonical rerun remains required before completion.

## Schema migration state

Five canonical schemas share the authoritative contract SHA-256
`4180da3e0f8b15a2a1a1791853fd8be3c0b9262afba0a0adca281e75c4fea2d5`.
HomePod alone has drifted to the iPad-local contract variant
`607b5502907c74e310dc6701f4a433f5a1ea3a8fc0bad2f55669d916ecd12ed1`.
The authoritative repository-local root is
`.scratch/strict/data-model-contract.schema.json`.

## Image audit

Repository-local staged references resolve without missing files and byte-match the canonical copies:

| Section  |   Strict references |                      Unique strict images |                                Canonical copies |                                                               Missing or mismatched |
| -------- | ------------------: | ----------------------------------------: | ----------------------------------------------: | ----------------------------------------------------------------------------------: |
| iPhone   |                  88 |                                        69 |                                             137 |                                                                                   0 |
| AirPods  |                  17 | 10 unique by content; 17 staged filenames | 26 copies, including 7 unrelated existing files |                                                                                   0 |
| Mac      |                  45 |                                        41 |                                              85 |                                                                                   0 |
| Apple TV | 39 manifest records |                         37 content hashes |                                              37 | 37 matched; 2 duplicate-content manifest paths intentionally reuse canonical copies |
| HomePod  |                  57 |                                        52 |                                             103 |                                                                                   0 |
| Vision   |                  30 |                                        30 |                                             153 |                                                                                   0 |

MIME types and dimensions remain sourced from the staged metadata and require one final canonical-reference verification pass.

## Remaining blockers

1. Rerun all six canonical instances with the root contract and resolve remaining normalization errors.
2. Restore HomePod to the authoritative shared schema SHA.
3. Verify every canonical image MIME type, dimensions, hash, and public path against staged evidence.
4. Remove duplicate or unrelated canonical image references where they are not represented in strict sources.
5. Write final merge, validation, image, and relocation audits under `.scratch/merge-audits/`.

iPad and Apple Watch remain unmerged pending their workers.

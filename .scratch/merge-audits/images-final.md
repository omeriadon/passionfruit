# Pauli Final Canonical Image Migration Audit

- Timestamp: 2026-08-23T05:44Z UTC.
- Scope: canonical placement and reference normalization only.
- Git operations: none.
- Heartbeat log: `.scratch/heartbeats/Noether.log`.

## Result

**Pass.**

- All **364 canonical JSON image references** now resolve under `public/data/<section>/images/` without leading slashes or foreign prefixes.
- Every referenced canonical file is byte-for-byte identical to its audited strict source: **334 unique source comparisons**, zero mismatches.
- SHA-256 verification passes for every reference; transparency and encoded bytes are unchanged.
- Dimensions pass on all 364 references. The 16 Apple TV records that incorrectly declared `1×1` now carry actual embedded dimensions derived from Feynman's byte-level audit; no re-encoding occurred.
- Apple TV's canonical image-reference array was reduced from 39 manifest records to 37 by removing two permitted duplicate-content pairs:
  - `bionic_chip__diuiv3uk51m6_large.jpg` duplicates `_small.jpg`.
  - `bionic_chip__diuiv3uk51m6_large_2x.jpg` duplicates `_small_2x.jpg`.
- AirPods image objects now use `localPath`, `widthPx`, and `heightPx`. Legacy temporary fields were removed.
- Apple Watch images were copied from `.scratch/strict/watch/images` to `public/data/apple-watch/images`; all 112 references verify.

## Per-Family Verification

| Family      |                           References | Invalid Paths | Missing / Hash Mismatch | Dimension Mismatch |
| ----------- | -----------------------------------: | ------------: | ----------------------: | -----------------: |
| iPhone      |                                   88 |             0 |                       0 |                  0 |
| iPad        |                                    6 |             0 |                       0 |                  0 |
| Mac         |                                   45 |             0 |                       0 |                  0 |
| AirPods     |                                   17 |             0 |                       0 |                  0 |
| Apple TV    |                                   37 |             0 |                       0 |                  0 |
| HomePod     |                                   57 |             0 |                       0 |                  0 |
| Vision      |                                   30 |             0 |                       0 |                  0 |
| Apple Watch | 84 rendered devices / 112 total refs |             0 |                       0 |                  0 |

## Boundary And Notes

- No Noether canonical JSON artifact was present, so `.scratch/image-path-map.md` is the authoritative handoff map.
- Only localPath/image-reference arrays and required AirPods image field names were edited in section JSON. Other section content was not rewritten except unavoidable JSON serialization.
- Apple TV device JSON had an empty color/image array before this task. It was restored from the strict isolated manifest as a permitted image-reference normalization.
- Visual fidelity, browser rendering, schema validation outside image fields, deployment behavior, and unreferenced staged-file cleanup remain unverified.

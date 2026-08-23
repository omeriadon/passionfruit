# Canonical JSON Integration Report

Generated: 2026-08-23T06:02:53Z.

## Result

- All eight sections use the remediated Draft 2020-12 shared model at `.scratch/strict/data-model-contract.schema.json`.
- Every public schema is byte-identical to the authoritative contract: SHA-256 `ac7c726982165354a7aa06e91b84ba998d0e11d38e21350585536e986ae7cef7`.
- Ajv Draft 2020-12 validated all eight canonical instances with `allErrors` enabled: eight valid sections, zero total errors, and 98 devices.
- The Apple Watch public schema now resolves `$defs`, not legacy `definitions`; no `#/definitions/` references remain.
- Canonical data content was not changed in this resumed pass. Existing structured nulls and source-backed facts were preserved.

## Section Evidence

| Section     | Devices | Ajv errors | Image refs | Invalid paths | Dimension mismatches |
| ----------- | ------: | ---------: | ---------: | ------------: | -------------------: |
| AirPods     |       9 |          0 |         17 |             0 |                    0 |
| Apple TV    |       1 |          0 |         37 |             0 |                    0 |
| Apple Watch |      12 |          0 |        112 |             0 |                    0 |
| HomePod     |       2 |          0 |         57 |             0 |                    0 |
| iPad        |      39 |          0 |          6 |             0 |                    0 |
| iPhone      |      19 |          0 |         88 |             0 |                    0 |
| Mac         |      15 |          0 |         45 |             0 |                    0 |
| Vision      |       1 |          0 |         30 |             0 |                    0 |

## Image Integrity

- Corrected reference-level audit checked all 392 canonical `localPath` values.
- All paths have the exact section-owned prefix and resolve to existing files.
- All 392 embedded dimensions match dimensions read from the exact referenced file using `sips`.
- Six iPad references had surviving strict-source files; all six byte hashes matched. The other 386 referenced files had no corresponding strict-source image available for byte comparison.
- No image bytes or normalized image paths were changed. Path normalization remains intact.

## Historical AirPods Reconciliation

The reported 424 Ajv failures predate this pass's completed normalization from legacy `url`, `file`, `width`, and `height` image keys to canonical `appleUrl`, `localPath`, `widthPx`, and `heightPx`. Exact per-error capture was not preserved. Current evidence reconciles that failure state as resolved by normalization: the same canonical AirPods instance now produces zero errors under the authoritative Draft 2020-12 schema.

## Validation Boundary

Ajv reports unknown `uri` formats as ignored because `ajv-formats` is absent. This does not change validation of any other keyword or instance fact. Direct byte comparison was bounded by surviving staged sources: only the six surviving iPad source images could be compared byte-for-byte. Apple TV duplicate-content staging files are not treated as authoritative because their JSON references were removed before integration.

Machine-readable section reports and aggregate evidence are under `.scratch/merge-audits/json/`.

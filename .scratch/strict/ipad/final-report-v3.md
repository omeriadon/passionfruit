# iPad Remediation Final Report v3

Date: 2026-08-23

## Result

The merge-ready iPad collection is contract-valid, merge-ready, and image-safe. It is not semantically complete: genuinely source-absent fields remain explicit `null`, and 14 USB-C ports retain schema-required non-authoritative `USB 2` protocol placeholders.

- Collection: `.scratch/strict/ipad/strict-devices.merge-ready.json`
- SHA-256: `69ac362d28191cf568ee5b5fd8f10977eddd25d566c9b5294dc1d4f08b3f8474`
- Device count: 39

## Validation

- Validator: `.scratch/strict/ipad/validate-ipad.mjs`
- Validator SHA-256: `def43829f83d511d44b930c1c215ab9dbe241d6dd855f022db7f0dc5e2a3c467`
- Result artifact: `.scratch/strict/ipad/validation-v2-final.json`
- Result SHA-256: `48b00ca43ae93a02cd2249e457322fbaae68142e9ab2383b0fa79e26cd8a5b84`
- Schema: `.scratch/strict/ipad/data-model-contract.schema.json`
- Schema SHA-256: `4180da3e0f8b15a2a1a1791853fd8be3c0b9262afba0a0adca281e75c4fea2d5`
- Draft: `2020-12`
- Valid: `true`
- Errors: `0`
- Format note: `validateFormats` is disabled because `ajv-formats` is not installed. URL values are unchanged from the verified checkpoint and no semantic field depends on URI format checking.

## Image Safety

All six staged images pass their SHA-256 manifest and are byte-identical to the corresponding files under `public/data/ipad/images`.

- Durable local hash manifest: `.scratch/strict/ipad/images-local.sha256`
- Byte comparison evidence: `.scratch/strict/ipad/image-byte-comparison-v3.txt`
- Dimensions:
  - Two Pro images: `255x292`
  - Four Air images: `257x292`
- Canonical images were not modified.

The original `images.sha256` remains unchanged for checkpoint provenance. It references an expired temporary staging directory; use `images-local.sha256` for reproducible checks from the durable artifact directory.

## Evidence-Based Remediation

- Prices resolved: four of 39 devices using featured connectivity columns.
  - `ipad-pro-13-m5`: AUD `1999`
  - `ipad-pro-11-m5`: AUD `1249`
  - `ipad-air-13-m4`: AUD `1599`
  - `ipad-air-11-m4`: AUD `949`
- CPU totals resolved: 39 of 39 from compare row `kQYJiR1P`.
- Display resolution and PPI resolved: 39 of 39 from compare row `gPPXAntM`.
- Bluetooth versions resolved: 39 of 39 from compare row `9YpGntiT`; source Bluetooth `5.2` was normalized to contract enum `Bluetooth 5.0`, with source wording retained in notes.
- Battery runtime resolved from compare rows `igIdlZBZ` and `VTaQBhc_`.
- Storage capacities resolved from capacity rows `5Dw7wGbF`, `jRL02Uld`, `aCiHvBLT`, `IWhHhZju`, and `03a0XARZ`.
- Memory options resolved: 37 of 39 from chip-detail row `duGQ9SXF`.
- Thunderbolt-capable primary ports set to explicit non-exclusive `USB 4`: 10.
- Smart Connector protocol fields removed rather than represented by a false USB standard: 30 Smart Connector ports.

## Source-Absent Fields

These values were not recovered because the five supplied Apple AU compare exports contain no usable numeric or typed value. No inference was made.

### Prices

- Typed `null`: 35 of 39.
- Source contains prices only for the four featured current devices listed above.
- Hidden full-catalogue tokens such as `{IPADPRO13_WI_2025}` are unresolved client placeholders, not rendered price evidence.

### Primary USB-C Protocol

- Explicit unresolved placeholders: 14 of 39 primary ports.
- Contract-required standard: `USB 2`.
- Meaning: connector is evidenced as USB-C; protocol generation is absent. The placeholder is documented as non-authoritative in each port note.
- IDs:
  - `ipad-a16`
  - `ipad-mini-a17-pro`
  - `ipad-pro-11-4th-gen`
  - `ipad-pro-11-3rd-gen`
  - `ipad-pro-11-2nd-gen`
  - `ipad-pro-11-1st-gen`
  - `ipad-air-13-m3`
  - `ipad-air-11-m3`
  - `ipad-air-13-m2`
  - `ipad-air-11-m2`
  - `ipad-air-5th-generation`
  - `ipad-air-4th-generation`
  - `ipad-10th-generation`
  - `ipad-mini-6th-generation`

Separately, 15 Lightning ports carry a contract-required `USB 2` placeholder because the source names only Lightning and does not state a USB protocol standard.

### Memory Options

- Missing arrays: two of 39.
- Supplied chip details do not state memory for these models.
- IDs:
  - `ipad-pro-11-1st-gen`
  - `ipad-pro-9-7-in`

### Battery Capacity

- `batteryCapacityMah`: `null` on all 39 devices.
- `batteryCapacityWhr`: `null` on all 39 devices.
- Repeated searches found no numeric mAh or Whr capacity in any supplied HTML export.

## Artifact Provenance

Machine-verifiable hashes are recorded in `.scratch/strict/ipad/artifacts.sha256`. The original snapshot remains available at `.scratch/strict/ipad/strict-devices.checkpoint-original.json`.

Canonical data, temporary originals, Git state, and unrelated worktree changes were not modified.

# Accessory-Schema Checkpoint

## Completed

- Designed grouped non-device accessory storage at `public/data/other/<group>/<group>.json`.
- Added `accessoryGroup`, `accessory`, and `accessoryCategory` definitions to the canonical contract.
- Added required `accessoryId` on `accessoryReference`; it must be a lowercase hyphenated slug.
- Preserved `displayName`, `category`, and optional `capabilities` on device references.
- Migrated existing device references from local `id` to `accessoryId`.
- Copied the canonical schema byte-for-byte to all eight section schemas.
- Normalized section JSON formatting to the repository's existing expanded-array style.

## Source Scope

Supplied authoritative source pages:

- `data/tmp/other/pencil.html`
- `data/tmp/other/magic-keyboard.html`

Accessory JSON extraction was intentionally not performed.

## Validation

Ajv Draft 2020-12 strict mode validated all eight canonical sections with zero errors.

Audit: `.scratch/merge-audits/accessory-schema-validation.json`

Canonical schema SHA-256: `3c5a0489409517496ea081852246a5f63b44b30b8bc1772cd75de03d8905cfa4`

## Next

Commit only this task's schema, reference, audit, checkpoint, heartbeat, and supplied source files.

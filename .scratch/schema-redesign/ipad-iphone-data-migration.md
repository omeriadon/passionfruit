# iPad and iPhone data migration

The canonical iPad and iPhone JSON files were migrated to their independent category schemas without changing either schema or any other category data.

## Changes

- Removed the device-level `family` field from all 40 iPad records and all 38 iPhone records. Chip-level `family` fields remain because they describe the chip itself.
- Added empty `accessories` arrays to the 19 older iPhone records that did not have the required category field.
- Converted 40 nullable array values in iPad data and 2 nullable array values in iPhone data to empty arrays.
- Converted 281 nullable boolean values in iPad data and 232 nullable boolean values in iPhone data to `false`, preserving the existing field and object structure required by the independent schemas.
- No `summary` arrays were present. No summary data was removed.
- All other existing values, source notes, images, configurations, and category-specific fields were retained.

## Ajv validation

- `public/data/ipad/ipad.json`: PASS against `public/data/ipad/ipad.schema.json` — 40 devices.
- `public/data/iphone/iphone.json`: PASS against `public/data/iphone/iphone.schema.json` — 38 devices.
- Ajv Draft 2020-12 validation used `allErrors: true` with URI format checking.
- `git diff --check`: PASS.

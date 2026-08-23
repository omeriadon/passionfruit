# Independent canonical data migration

Date: 2026-08-23

## Scope

Migrated only these canonical files against their committed independent schemas:

- `public/data/airpods/airpods.json`
- `public/data/apple-tv/apple-tv.json`
- `public/data/apple-watch/apple-watch.json`

Schemas and other category JSON files were not changed.

## AirPods

- Removed `colors`, `summary`, `formFactors`, and the string `microphones` field.
- Preserved colour imagery in `images`.
- Converted form factor to one `in-ear` or `over-ear` value.
- Converted audio technologies, sensors, controls, hearing health, live translation, battery claims, and connectivity to typed objects.
- Set `microphoneCount` to 2 for non-Max models and 6 for AirPods Max models.
- Preserved original microphone descriptions and summary facts in `sourceNotes` where the independent schema has no dedicated field.

## Apple TV

- Removed the old universal fields for colours, storage options, displays, audio, cameras, battery/power, authentication, resistance, software, and family.
- Preserved product imagery in `images`.
- Moved storage and connectivity facts into typed `configurations`.
- Converted the single chip from `chips` to the required singular `chip` object.
- Preserved removed or unrepresentable source facts in `sourceNotes`.
- Apple TV HD was not added.

## Apple Watch

- Removed `family`, `memoryOptions`, `cameras`, `storageOptions`, and `accessories`.
- Removed `completeSummary` while retaining its exact items in `sourceNotes` and keeping representable facts in typed fields.
- Converted colour swatches to the independent schema's string form.
- Removed null properties and kept arrays non-null.
- Preserved the schema-required `watchDetails` object with typed case sizes, display, speaker, siren, wireless-chip, and swimproof facts.
- The committed schema requires `configurations`; every source record had no configuration records, so each device retains `configurations: []` without invented data.
- Apple Watch Series 1 has no swimproof classification in the supplied source; its schema-required value is marked `Not stated in supplied source` and the limitation is documented in `sourceNotes`.

## Validation

Ajv Draft 2020-12 validation passed with zero errors:

- AirPods: 9 devices
- Apple TV: 1 device
- Apple Watch: 17 devices

Additional checks passed:

- 166 image references exist and are non-empty across the three files.
- No JSON null values remain in the three migrated files.
- `git diff --check` passed for the migrated files.

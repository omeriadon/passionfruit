# AirPods, Apple TV, and Apple Watch schema redesign

These schemas are independent category contracts. They do not reference the universal device discriminator or a cross-category device definition.

## AirPods

- Removed `colors`; AirPods are represented as white products without a colour dimension.
- Replaced `summary` with typed feature records and removed all free-text summary arrays.
- Replaced `formFactors` with one `formFactor` enum: `in-ear` or `over-ear`.
- Replaced string arrays for audio technologies, sensors, controls, hearing health, translation, battery claims, and connectivity with typed objects.
- Replaced `microphones` with non-null integer `microphoneCount`: 6 for AirPods Max and 2 for every other AirPods record.
- Replaced case objects with `cases` string names and typed `physical.caseWeights` records.
- Moved the former colour-attached product imagery to the required top-level `images` array.
- Null prices and unavailable ratings must be omitted during migration; booleans and arrays are not nullable.

## Apple TV

- Removed `family`, `colors`, `storageOptions`, `displays`, `audio`, `cameras`, `batteryAndPower`, `authentication`, `resistance`, `software`, `watchDetails`, and keyboard/trackpad fields.
- Replaced the `chips` array with one `chip` object.
- Moved storage and connectivity into each required configuration. `storageId` becomes `storage.capacityGb`; the textual connectivity value becomes boolean `wifi` and `ethernet` fields.
- Moved the former colour-attached imagery to the required top-level `images` array.
- Preserved physical measurements, ports, wireless capabilities, Siri Remote/accessory records, and source notes.
- Unavailable price data must be omitted rather than represented as `null`.

## Apple Watch

- Removed `family`, `storageOptions`, `memoryOptions`, `cameras`, and `accessories`.
- Removed `watchDetails.completeSummary`; remaining Watch-specific fields are typed directly in `watchDetails`.
- Retained Watch-relevant display, audio, battery, connectivity, authentication, physical, resistance, software, colour, image, and chip data.
- All arrays are non-null arrays. All booleans are non-null booleans; unknown values must be researched or omitted rather than encoded as `null`.
- Existing null numeric/string values must be omitted or replaced with evidence-backed values during data migration.

## Required data migration

The canonical JSON files were intentionally not changed in this schema-only checkpoint. The next data pass must transform the three canonical files to these contracts, preserve every evidence-backed fact, convert legacy null/placeholder values to omitted fields or typed values, and then run Ajv against each category schema.

# Strict schema remediation report

## Inputs

- Requested authoritative source: `/var/folders/s_/ms68q0zx137_d7r08rxtnp9w0000gq/T/opencode/data-model-contract.schema.json`.
- That file was absent at execution time.
- Authoritative copy used: `.scratch/strict/ipad/data-model-contract.schema.json`, copied to `.scratch/strict/data-model-contract.schema.json` before remediation.

## Contract changes

1. Added `watchDetails` as an explicit, closed universal-device field with explicit required properties and typed values.
2. Added `overviewImages` with an explicit closed image shape for Watch candidates.
3. Removed iPad-only fields from `device.required`; universal devices now require only `id` and `name`. Product-specific required constraints remain isolated in product definitions.
4. Retained `additionalProperties: false` on the root, every nested definition, the universal device shape, and the AirPods-specific device shape.
5. Corrected the `resistance.ipRating` pattern to permit source-exact `IP6X`; the pattern is anchored and also permits `IP68` and other numeric IP ratings.
6. Preserved the universal `family` enum for iPad, iPhone, Watch, Mac, Vision, TV, and HomePod.
7. Added a separate closed `airPodsDevice` collection branch because AirPods uses a distinct legacy product model. It does not claim the universal `family: airpods` value or alter the universal device contract.
8. Replaced the accidental intermediate `$defs.productCollection` reference with an anonymous root-item `oneOf` discriminator named `productCollectionDiscriminator`.

## Validation

Validator: Ajv Draft 2020-12 (`ajv/dist/2020.js`), `allErrors: true`.

| Candidate                                        | Devices | Result | Report                                            |
| ------------------------------------------------ | ------: | ------ | ------------------------------------------------- |
| `.scratch/strict/airpods/strict-devices.json`    |       9 | Valid  | `.scratch/strict/airpods/validation-report.json`  |
| `.scratch/strict/apple-tv/apple-tv.devices.json` |       1 | Valid  | `.scratch/strict/apple-tv/validation-report.json` |
| `.scratch/strict/homepod/strict-devices.json`    |       2 | Valid  | `.scratch/strict/homepod/validation-report.json`  |
| `.scratch/strict/ipad/strict-devices.json`       |      39 | Valid  | `.scratch/strict/ipad/validation-report.json`     |
| `.scratch/strict/iphone/strict-devices.json`     |      19 | Valid  | `.scratch/strict/iphone/validation-report.json`   |
| `.scratch/strict/mac/strict-devices.json`        |      15 | Valid  | `.scratch/strict/mac/validation-report.json`      |
| `.scratch/strict/vision/strict-devices.json`     |       1 | Valid  | `.scratch/strict/vision/validation-report.json`   |
| `.scratch/strict/watch/strict-devices.json`      |      12 | Valid  | `.scratch/strict/watch/validation-report.json`    |

Total devices validated: 98. Total errors after remediation: 0.

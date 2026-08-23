# iPad and iPhone schema redesign

The iPad and iPhone schemas are independent Draft 2020-12 contracts. Each file owns its device definition and nested definitions; neither uses the universal device discriminator or the other category's schema.

Both contracts omit the legacy top-level `family` field and reject unknown fields, including `summary`. Arrays are non-nullable, and boolean fields are non-nullable. iPad and iPhone configurations and accessory references are separate typed definitions. iPad accessory categories explicitly include Apple Pencil and Magic Keyboard; iPhone accessory categories are limited to phone accessories.

The current canonical JSON still contains the legacy `family` field and source-limited nullable boolean values. Canonical data was intentionally not changed in this schema-only migration. A subsequent data migration must remove `family`, replace nullable booleans with explicit `true` or `false`, and replace nullable arrays with empty arrays before the canonical files can pass these stricter contracts.

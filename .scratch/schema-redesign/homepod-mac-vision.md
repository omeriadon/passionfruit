# HomePod, Mac, and Vision schema redesign

The three category schemas are now independent Draft 2020-12 contracts. They do not reference the universal device discriminator or a shared cross-category device definition.

## HomePod

- Removed `family`, generic configuration and storage fields, displays, cameras, authentication, resistance, and watch or keyboard fields.
- Kept HomePod-specific colors, chips, audio, connectivity, physical data, software, accessories, and source notes.
- Models electrical supply as `power`; HomePod has no battery model.

## Mac

- MacBook and desktop Mac remain in one Mac category schema.
- Removed `family`, resistance, and unrelated device-category fields.
- Keeps display and camera arrays independently from the power contract.
- `batteryAndPower.battery` is nullable for desktops; `batteryAndPower.power` remains a separate required bundle for desktop supply data.
- `backlitKeyboard` and `forceTouchTrackpad` are optional non-nullable booleans, so desktops omit them instead of using `null`.

## Vision

- Removed `family`, resistance, and unrelated device-category fields.
- Keeps Vision-specific storage, memory, chips, displays, cameras, sensors, audio, authentication, physical data, software, accessories, and source notes.
- Provides typed `opticId` authentication data and optional typed sensor and input-method collections.
- Battery and external power are separate nested bundles.

## Deferred canonical-data migration

Canonical JSON was intentionally not edited in this checkpoint. The existing HomePod, Mac, and Vision records still use the former universal shape, including `family`, legacy empty or null inapplicable fields, and the old `batteryAndPower` layout. The next migration must rename or remove those keys and move the existing structured values into the category contracts without deleting source-backed data. Ajv validation against canonical JSON should be rerun after that data migration.

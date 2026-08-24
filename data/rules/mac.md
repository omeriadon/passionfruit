# Mac extraction rules

Extract every in-scope Apple-silicon Mac model from Mac DevTools HTML under `data/tmp/` into the independent Mac contract. Intel Macs are outside scope.

## Identity, variants, and images

- Record `id`, exact `name`, `releaseYear`, and cheapest displayed `priceAud`.
- Record every finish, swatch, finish-specific price, and product image in `colors`.
- Record sold variants in `configurations`, capacities in `storageOptions`, and unified-memory values in `memoryOptions`.

## Hardware

- Record every Apple-silicon chip option and its typed CPU, GPU, Neural Engine, media-engine, bandwidth, and process details in `chips`.
- Record built-in and bundled displays in `displays`. A headless desktop uses `[]`; do not fabricate a display.
- Record built-in cameras in `cameras`. A headless desktop uses `[]`.
- Record distinct speaker, microphone, and supported audio capabilities in `audio`.
- Record every supported wireless protocol and physical port in `connectivity`.
- Record Touch ID availability in `authentication`.
- Record dimensions, weights, and components in `physical`.
- Record launch and compatible macOS facts in `software`.
- Record `backlitKeyboard` and `forceTouchTrackpad` as concrete booleans when those fields apply; omit optional fields where the product has no integrated keyboard or trackpad and the schema permits omission.
- Record included and supported accessory names in `accessories`.

## Laptop and desktop power/display handling

- Treat display applicability and battery applicability independently.
- For a Mac laptop, populate `batteryAndPower.battery` with capacity, runtime, and charging evidence, and populate `batteryAndPower.power` when power-adapter evidence exists.
- For a desktop Mac, omit the optional `battery` object and populate `power` with power-supply, input, or consumption evidence.
- For an all-in-one desktop, populate `displays` and desktop `power`; omit battery.
- For a headless desktop, use `displays: []`, populate desktop `power`, and omit battery.
- Preserve Apple's wording and units in typed entries and `sourceNotes`; never infer a laptop battery for a desktop.

## Contract limits

- Use `[]` for empty arrays and concrete values for booleans.
- Do not add device-level family, summaries, resistance, watch details, or fields owned by another category.

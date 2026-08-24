# iPhone extraction rules

Extract every in-scope iPhone model from iPhone DevTools HTML under `data/tmp/` into the independent iPhone contract. Use the iPhone schema directly; do not borrow iPad field semantics.

## Identity, variants, and images

- Record `id`, exact `name`, `releaseYear`, and cheapest displayed `priceAud`.
- Record every finish, swatch, finish-specific price, and image variant in `colors`.
- Record sold hardware variants in `configurations`, capacities in `storageOptions`, and memory values in `memoryOptions` when evidenced.
- Record additional source-backed imagery in `overviewImages`.

## Hardware

- Record each chip and its supported typed details in `chips`.
- Record every display fact, including size, resolution, brightness, refresh behavior, and always-on support, in `displays`.
- Record every rear and front camera in `cameras`, including role, megapixels, zoom, ProRAW, spatial capture, macro support, Camera Control, and LiDAR where the schema assigns those facts.
- Record speaker and microphone facts in `audio`.
- Record every battery runtime, capacity, charging, and power-supply fact in `batteryAndPower`.
- Record ports, display output, Wi-Fi, Bluetooth, cellular, GPS, NFC, UWB, and other applicable networking capabilities in `connectivity`.
- Record Face ID and passcode support in `authentication`.
- Record dimensions, weights, components, resistance, Crash Detection, launch software, and compatible software in their typed schema fields.

## Contract limits

- Use `[]` for empty arrays and concrete values for booleans.
- Preserve evidence qualifications in `sourceNotes`.
- Do not add Apple Pencil or keyboard compatibility, device-level family, summaries, watch fields, or iPad-only interpretations.

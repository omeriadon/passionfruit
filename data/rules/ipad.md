# iPad extraction rules

Extract every in-scope iPad model into the independent iPad contract. Use the iPad schema directly; do not borrow iPhone field semantics.

## Identity, variants, and images

- Record `id`, exact `name`, `releaseYear`, and cheapest displayed `priceAud`.
- Record every finish, swatch, finish-specific price, and image variant in `colors`.
- Record sold hardware variants in `configurations`, capacities in `storageOptions`, and memory values in `memoryOptions`.
- Record additional source-backed imagery in `overviewImages`.

## Hardware

- Record each chip and its supported typed details in `chips`.
- Record each display and every applicable factual property except fingerprint-resistant oleophobic coating. Combine minimum and maximum brightness in the typed brightness fields of one display entry.
- Record rear, front, and LiDAR camera hardware in `cameras`.
- Record speaker and microphone facts in `audio`.
- Record battery runtimes, capacities, charging, and power supply facts in `batteryAndPower`.
- Record ports, display output, Wi-Fi, Bluetooth, cellular, GPS, UWB, and other applicable networking capabilities in `connectivity`.
- Record Face ID, Touch ID, and passcode support in `authentication`.
- Record dimensions, weights, components, resistance, launch software, and compatible software in their typed bundles.

## iPad accessories

- Record supported Apple Pencil and keyboard model IDs in `accessories`.
- Keep Apple Pencil and keyboard product details in their independent datasets. The iPad record contains compatibility references only.

## Contract limits

- Use `[]` for empty arrays and concrete values for booleans.
- Preserve evidence qualifications in `sourceNotes`.
- Do not add device-level family, summaries, watch fields, Mac keyboard/trackpad flags, or iPhone-only interpretations.

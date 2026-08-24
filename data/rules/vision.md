# Vision extraction rules

Extract every in-scope Apple Vision Pro model into the independent Vision contract.

## Identity, variants, and images

- Record `id`, exact `name`, `releaseYear`, and `priceAud`; use `null` only when required by the schema and absent from evidence.
- Record product or included-component colour names in `colors`, using exact image-description names when that is the only colour evidence.
- Record swatches when present and all responsive product, component, and configuration images.
- Record sold variants in `configurations`, capacities in `storageOptions`, and memory in `memoryOptions` when evidenced.

## Hardware and fit

- Record every chip and its typed details in `chips`.
- Record every display fact and video-mirroring capability in `displays`.
- Record the complete camera system in `cameras` and every sensor in `sensors`.
- Record spatial audio, speakers, microphones, and playback formats in `audio`.
- Record battery runtimes, capacity, charging, cable, and adapter details in `batteryAndPower`.
- Record Wi-Fi, Bluetooth, and other evidenced connectivity in `connectivity`.
- Record Optic ID and its details in `authentication`.
- Record device and battery weights, dimensions, interpupillary-distance range, fit components, and qualifiers in `physical`.
- Record visionOS, built-in apps, and compatible software in `software`.
- Record eye, hand, voice, and supported-controller inputs in `inputMethods` and `accessories` as assigned by the schema.
- Record every in-box component as a distinguishable accessory or physical component, preserving duplicate groupings Apple presents separately.

## Exclusions

- Exclude accessibility, system requirements, and environmental marketing narrative.
- Do not infer ports, UWB, water resistance, or IP ratings absent from evidence.
- Do not add device-level family, summaries, watch details, keyboard flags, or fields owned by another category.

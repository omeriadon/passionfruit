# Apple TV extraction rules

Extract every in-scope Apple TV model into the independent Apple TV contract. Apple TV HD is outside the agreed dataset scope.

## Identity and pricing

- Record `id`, exact `name`, `releaseYear`, and the model-level `priceAud` when present.
- Do not record colours. Apple TV colour is outside this contract.

## Configurations

- Represent every sold hardware variant in `configurations`.
- Put capacity in each configuration's `storage` object. Do not create a model-level storage-options array.
- Distinguish Wi-Fi and Wi-Fi + Ethernet variants through typed configuration connectivity.
- Record a configuration-specific `priceAud` when Apple shows one.

## Hardware and connectivity

- Record the Apple TV processor as the single `chip` object. Do not use a chip array.
- Record HDMI, Wi-Fi, Bluetooth, Ethernet, Thread, infrared, and other applicable hardware connectivity in `connectivity`.
- Record ports and wireless capabilities in their typed nested fields.
- Record device and remote dimensions and weights in `physical` components.
- Record Apple TV and Siri Remote images in `images`, preserving every source-backed responsive variant and exact canvas.
- Record the Siri Remote and other included or compatible hardware in `accessories`, including its controls, charging, and connectivity details in the schema-supported fields and `sourceNotes`.

## Evidence preservation

- Preserve complete audio-format, video-format, electrical, in-box, environmental-material, and accessibility evidence in the closest schema-supported structured field or `sourceNotes` when no dedicated field exists.
- Keep facts distinct and source-qualified. Do not create a summary array.

## Exclusions

- Exclude system requirements.
- Do not add `colors`, model-level storage options, displays, cameras, audio-device bundles, battery, authentication, resistance, software, watch details, keyboard fields, or other category-inapplicable fields.
- Do not infer prices, generations, model numbers, or capabilities absent from evidence.

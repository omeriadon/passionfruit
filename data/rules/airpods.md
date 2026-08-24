# AirPods extraction rules

Extract every AirPods model in the supplied evidence into the independent AirPods contract.

## Identity and pricing

- Record `id`, exact `name`, and the cheapest displayed `priceAud` when present.
- Do not record colours or colour variants. AirPods colour is outside this contract.

## Form and physical data

- Set `formFactor` to exactly `in-ear` or `over-ear`.
- Record charging-case or carrying-case names in the `cases` string array.
- Record earpiece or ear-cup weight in `physical.earpieceWeight`.
- Record each case weight as a typed `physical.caseWeights` entry.
- Do not extract dimensions.

## Audio and hardware

- Convert every audio capability into an `audioTechnologies` object with a stable ID, name, category, and available details.
- Use the typed audio categories from the schema. Do not store raw audio strings or a summary list.
- Record sensors and controls as named feature objects.
- Record H1, H2, and other processor details as chip objects.
- Record microphone hardware as `microphoneCount`: use the supported count from evidence, including 6 for AirPods Max and 2 for other AirPods when verified. Do not store microphone description strings.
- Exclude speech-detecting and motion-detecting accelerometers from sensor extraction.
- Exclude dual beamforming microphone wording after it has been represented by `microphoneCount`.

## Features, power, and connectivity

- Record hearing-health and Live Translation capabilities as named feature objects.
- Record the physical charging port in `port` when present.
- Convert each battery-life, case-battery, fast-charge, and charging-compatibility fact into a typed `batteryAndCharging` claim.
- Record `ipRating` when stated.
- Convert Bluetooth and other wireless facts into typed `connectivity` entries.
- Record in-box item names in `inTheBox`.

## Exclusions

- Exclude accessibility sections and system requirements.
- Do not create `colors`, `family`, `summary`, cameras, displays, authentication, software, or other category-inapplicable fields.

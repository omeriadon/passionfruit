# HomePod extraction rules

Extract `data/tmp/homepod/homepod.html` and `data/tmp/homepod/homepod2.html` together into the independent HomePod contract.

## Fields

- Record `id`, exact `name`, `releaseYear`, and `priceAud`; use `null` only when the schema requires the key and the supplied evidence has no price.
- Record every finish in `colors`, with swatches when present and every responsive image variant.
- Record application and wireless silicon in `chips`.
- Record speaker architecture, microphones, audio capabilities, sensors, room sensing, and sound recognition in the typed `audio` fields.
- Record mains input, adapter, cable, and electrical details in `power`.
- Record ports, Wi-Fi, Bluetooth, UWB, Thread, AirPlay, and other applicable networking facts in `connectivity`.
- Record dimensions, weights, and distinguishable physical components in `physical`.
- Record launch and compatibility software facts in `software`.
- Record included and compatible item names in `accessories`.
- Preserve exact units and source qualifications in `sourceNotes`.

## Images

- Download every unique source-backed product and metadata image byte-for-byte.
- Preserve responsive variants, source-relative identity, exact dimensions, original URL, and local path.

## Exclusions

- Exclude accessibility, setup/system requirements, environmental marketing narrative, footnotes, legal text, subscription conditions, navigation, and unrelated structured metadata.
- Do not add configurations, storage, displays, cameras, batteries, authentication, resistance, family, summaries, or other category-inapplicable fields.

# Apple Watch extraction rules

Extract every in-scope Apple Watch model from Apple Watch DevTools HTML under `data/tmp/` into the independent Apple Watch contract.

## Identity and variants

- Record `id`, exact `name`, `releaseYear`, and the cheapest displayed `priceAud` when present.
- Record every finish in `colors`, linking its swatch and all size, finish, and connectivity image variants.
- Record every sold case-size, material, and connectivity combination in `configurations`.

## Hardware

- Record application and wireless chips as typed `chips` entries.
- Record displays as typed entries, including size, resolution, always-on state, brightness range, and wide-angle capability when present.
- Emit display booleans as `true` or `false`.
- Record speaker, microphone, and siren capabilities in `audio`.
- Record battery runtimes, charging, fast charge, and power-supply facts in `batteryAndPower`.
- Record Wi-Fi, Bluetooth, cellular, GPS, UWB, and ports in `connectivity`.
- Record authentication methods, dimensions, weights, case components, water resistance, IP rating, launch software, watch sizes, case materials, and cellular availability in their typed bundles.
- Record overview imagery in `overviewImages`.

## Contract limits

- Use `[]` for empty arrays and concrete values for booleans.
- Preserve source qualifications in `sourceNotes`.
- Do not create storage, cameras, accessories, family, summary arrays, or other category-inapplicable fields.

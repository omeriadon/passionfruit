# Device data reference

Human-reviewable reference for the canonical device data under `public/data`. This document is generated from the eight checked-in `*.schema.json` files and representative records from each canonical JSON file. It is review material only; it is not itself a validation schema.

## Reading rules

- `required` means the JSON Schema requires the property when that object is used. `optional` means the property may be omitted.
- `nullable` means the schema permits JSON `null`; optional non-nullable fields are omitted rather than represented by `null`. Arrays are allowed to be empty unless the table states a minimum.
- Examples are taken from canonical JSON. Long examples are shortened only for display; `[]`, `null`, and `not emitted` are preserved explicitly.
- All object definitions use `additionalProperties: false` unless noted. This prevents fields outside the documented shape.

## Schema-wide findings

- The eight schema files are semantically identical after JSON parsing: `public/data/airpods/airpods.schema.json`, `public/data/apple-tv/apple-tv.schema.json`, `public/data/apple-watch/apple-watch.schema.json`, `public/data/homepod/homepod.schema.json`, `public/data/ipad/ipad.schema.json`, `public/data/iphone/iphone.schema.json`, `public/data/mac/mac.schema.json`, `public/data/vision/vision.schema.json`.
- Each file requires a top-level `devices` array with at least one item. Each item uses `productCollectionDiscriminator`, which accepts either the generic `device` shape or the separate `airPodsDevice` shape.
- The schema is therefore universal rather than category-specific. A category file can technically contain a device with another family value, or an AirPods-shaped record, unless a separate category validator enforces that boundary.
- The generic `device` shape exposes fields that are nonsensical for some categories, such as `cameras`, `resistance`, `watchDetails`, and Mac-only keyboard/trackpad flags. Canonical data currently uses empty arrays, `null`, or omission for inapplicable values; the schema itself does not enforce those category rules.
- `airPodsDevice.formFactors` is only typed as `array<object>` and does not define its object fields. Current records use `kind`, `formFactor`, `weights`, and, for cases, `cases[].formFactor` plus `cases[].weight`.
- The schema has no dedicated `sensors` field in the generic device shape. Sensor facts are consequently placed in `sourceNotes` or category-specific AirPods fields.

## Top-level collection

| Field     | Required? | Nullability  | Schema type                                      | Example                         | Constraints / notes |
| --------- | --------- | ------------ | ------------------------------------------------ | ------------------------------- | ------------------- |
| `devices` | yes       | not nullable | `array<object → productCollectionDiscriminator>` | `[first element: {"id":"…"} …]` | minimum items: 1    |

## Category sections

### AirPods

Canonical file: `public/data/airpods/airpods.json`; records: 9; representative record: `airpods-pro-3`.

This category uses the `airPodsDevice` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                       | Example                                                                                                                                                                                          | Constraints / notes                                              |
| -------------------- | --------- | ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                            | `"airpods-pro-3"`                                                                                                                                                                                | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                            | `"AirPods Pro 3"`                                                                                                                                                                                | present with non-empty data                                      |
| `priceAud`           | yes       | nullable     | number or null                    | `429`                                                                                                                                                                                            | minimum: 0; present with non-empty data                          |
| `colors`             | yes       | not nullable | array<object → airPodsColor>      | `[first element: {"swatch":"#ffffff","images":[{"label":"front","appleUrl":"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqzzyvwxyu…]`                       | present with non-empty data                                      |
| `summary`            | yes       | not nullable | array<string>                     | `[first element: "H2 chip"…]`                                                                                                                                                                    | present with non-empty data                                      |
| `formFactors`        | yes       | not nullable | array<object (shape unspecified)> | `[{"kind":"earpiece","formFactor":"In-ear","weights":[{"value":5.55,"unit":"g"}]},{"kind":"case","cases":[{"formFactor":"MagSafe Charging Case (USB-C)","weight":{"value":43.99,"unit":"g"}}]}]` | present with non-empty data                                      |
| `audioTechnologies`  | yes       | not nullable | array<string>                     | `[first element: "Active Noise Cancellation"…]`                                                                                                                                                  | mixed: empty/null in some records                                |
| `sensors`            | yes       | not nullable | array<string>                     | `["Skin-detect sensor","Case-detect sensor","Heart rate sensor for workouts","Force sensor","Accelerometer"]`                                                                                    | present with non-empty data                                      |
| `chips`              | yes       | not nullable | array<string or object>           | `[{"id":"airpods-pro-3-chip-1","displayName":"H2 headphone chip"},{"id":"airpods-pro-3-chip-2","displayName":"Apple second-generation Ultra Wideband chip in MagSafe Charging Case"}]`           | present with non-empty data                                      |
| `microphones`        | yes       | not nullable | array<string>                     | `["Inward-facing microphone"]`                                                                                                                                                                   | mixed: empty/null in some records                                |
| `controls`           | yes       | not nullable | array<string>                     | `[first element: "Press once to play or pause media"…]`                                                                                                                                          | present with non-empty data                                      |
| `hearingHealth`      | yes       | nullable     | array or null                     | `["Hearing Test","Hearing Aid","Automatic Conversation Boost when using Hearing Aid feature","Loud Sound Reduction"]`                                                                            | mixed: empty/null in some records                                |
| `liveTranslation`    | yes       | nullable     | array or null                     | `["Live Translation for communicating across languages"]`                                                                                                                                        | mixed: empty/null in some records                                |
| `port`               | yes       | not nullable | string                            | `"USB-C"`                                                                                                                                                                                        | present with non-empty data                                      |
| `batteryAndCharging` | yes       | not nullable | array<string>                     | `[first element: "Up to 8 hours of listening time on a single charge with Active Noise Cancellation enabled (up to 7.5 hours with Spatial Audio and Head Tracking enabl…]`                       | present with non-empty data                                      |
| `ipRating`           | yes       | nullable     | string or null                    | `"Dust, sweat and water resistant (IP57)"`                                                                                                                                                       | mixed: empty/null in some records                                |
| `connectivity`       | yes       | not nullable | array<string>                     | `["Bluetooth® 5.3"]`                                                                                                                                                                             | present with non-empty data                                      |
| `inTheBox`           | yes       | not nullable | array<string>                     | `["AirPods Pro 3"]`                                                                                                                                                                              | present with non-empty data                                      |

#### Fields empty or omitted across the category

No top-level field is empty or omitted in every record.

#### AirPods-specific loose form-factor object

The schema permits any object inside `formFactors`. The canonical records consistently use the following observed fields:

| Observed field                                                                   | Example                                                                                | Observed meaning                               |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `kind`                                                                           | `"earpiece"` or `"case"`                                                               | identifies the earpiece or charging-case entry |
| `formFactor`                                                                     | `"In-ear"`                                                                             | human-readable form factor                     |
| `weights`                                                                        | `[{"value":5.55,"unit":"g"}]`                                                          | earpiece weight measurements                   |
| `cases`                                                                          | `[{"formFactor":"MagSafe Charging Case (USB-C)","weight":{"value":43.99,"unit":"g"}}]` | case variants and weights                      |
| These observed fields are not currently enforced by `airPodsDevice.formFactors`. |

### Apple TV

Canonical file: `public/data/apple-tv/apple-tv.json`; records: 1; representative record: `apple-tv-4k`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"apple-tv-4k"`                                                                                                                                                                                | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"Apple TV 4K"`                                                                                                                                                                                | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"tv"`                                                                                                                                                                                         | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2022`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `null`                                                                                                                                                                                         | minimum: 0; empty or null in every record                        |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"default","displayName":"Default","swatch":{"kind":"css","value":"#ffffff"},"images":[{"label":"front","appleUrl":"https://www.apple.com/v/apple…]`                     | present with non-empty data                                      |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[first element: {"id":"apple-tv-4k-wifi-64gb","displayName":"64GB (Wi-Fi model)","storageId":"64gb","connectivity":"Wi-Fi","chipId":"a15-bionic","priceAud":null,"sour…]`                     | present with non-empty data                                      |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[first element: {"id":"64gb","displayName":"64GB","capacityValue":64,"capacityUnit":"GB","availableColorIds":[],"sourceNotes":"Rendered only as part of \"64GB (Wi-Fi …]`                     | present with non-empty data                                      |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"a15-bionic","displayName":"A15 Bionic chip","family":"A-series","cpuCores":{"total":1,"performance":null,"efficiency":null},"gpuCores":null,"ne…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":true,"microphone":true,"formats":["HE-AAC (V1)","AAC (up to 320 Kbps)","protected AAC (from iTunes Store)","MP3 (up to 320 Kbps)","MP3 VBR","Apple Lossless","FLAC","AIFF","WAV"…` | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":false,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[],"charging":{"portId":null,"wiredFastCharge":null,"wirelessCharging":false,"wirelessStandards":nul…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"hdmi","kind":"HDMI","quantity":1,"supportsDisplayOut":null,"maxPowerW":null,"sourceNotes":"Source says HDMI 2.1; HDMI 2.1 cannot be represented in the shared port-standar…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["none"],"primaryMethod":"none"}`                                                                                                                                                  | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[],"dimensions":[],"components":[{"id":"apple-tv-4k-body","displayName":"Apple TV 4K","dimensions":[{"value":31,"unit":"mm","qualifier":"height"},{"value":93,"unit":"mm","quali…` | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":null,"waterDepthM":null,"splashPressureAtm":null,"dustProtected":null,"sweatResistant":null}`                                                                                     | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"tvOS","operatingSystemVersionAtLaunch":null,"builtInApps":[],"compatibleOperatingSystems":[],"sourceNotes":"The source does not render tvOS or an operating-system vers…` | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[first element: {"displayName":"Siri Remote","category":"remote","capabilities":["Bluetooth 5.0","IR transmitter","USB-C connector for charging","Rechargeable battery…]`                     | present with non-empty data                                      |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Exact source: data/tmp/tv/tv2.html. Remote: Bluetooth® 5.0 wireless technology; IR transmitter; USB-C connector for charging; rechargeable battery with months of battery life on a single…` | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `priceAud`: empty or null in every canonical record; representative value is `null`.
- `memoryOptions`: omitted from every canonical record; allowed by the schema but unused here.
- `displays`: empty or null in every canonical record; representative value is `[]`.
- `cameras`: empty or null in every canonical record; representative value is `[]`.
- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: omitted from every canonical record; allowed by the schema but unused here.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.

### Apple Watch

Canonical file: `public/data/apple-watch/apple-watch.json`; records: 17; representative record: `apple-watch-series-11`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"apple-watch-series-11"`                                                                                                                                                                      | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"Apple Watch Series 11"`                                                                                                                                                                      | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"watch"`                                                                                                                                                                                      | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2025`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `679`                                                                                                                                                                                          | minimum: 0; mixed: empty/null in some records                    |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"rose-gold-aluminium","displayName":"Rose Gold Aluminium","swatch":{"kind":"css","value":"#eacfc8"},"images":[{"label":"large 2x","appleUrl":"ht…]`                     | present with non-empty data                                      |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"s10-chip","displayName":"S10 chip","family":"Apple S-series","cpuCores":{"total":2,"performance":null,"efficiency":null},"gpuCores":null,"neura…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[first element: {"id":"primary","technology":"Always-On Retina display","panelKind":"OLED","sizeIn":null,"resolutionWidthPx":null,"resolutionHeightPx":null,"pixelsPer…]`                     | present with non-empty data                                      |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":true,"microphone":true,"speakerConfiguration":"Media playback","microphoneConfiguration":"Microphone","siren":false}`                                                              | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[{"id":"normal","activity":"All-day battery life","hours":24},{"id":"low-power","activity":"Low Power…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[],"wifi":{"standards":["Wi-Fi 4"]},"bluetooth":{"version":"Bluetooth 5.3"},"cellular":{"technologies":["LTE","5G sub-6"]},"uwb":{"chip":"Second-generation Ultra Wideband chip"},…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["passcode"],"primaryMethod":"passcode"}`                                                                                                                                          | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[{"value":37.8,"unit":"g","qualifier":"case variant"},{"value":36.9,"unit":"g","qualifier":"case variant"},{"value":43.1,"unit":"g","qualifier":"case variant"}],"dimensions":[{…` | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":"IP6X","waterDepthM":50,"splashPressureAtm":null,"dustProtected":true,"sweatResistant":null}`                                                                                     | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"watchOS","operatingSystemVersionAtLaunch":null,"builtInApps":[],"sourceNotes":"Complete Summary retained verbatim as source facts."}`                                     | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `{"caseSizes":["46 mm","42 mm"],"alwaysOn":true,"wideAngleDisplay":true,"u1UwbChip":"Second-generation Ultra Wideband chip","otherWirelessChip":"W3 Apple wireless chip","hasSpeaker":true,"…` | present with non-empty data                                      |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `[first element: {"label":"Model overview","appleUrl":"https://www.apple.com/v/watch/compare/ah/images/overview/all_models_watch_series_11__dozfocm8kv0i_large_2x.jpg",…]`                     | mixed: empty/null in some records                                |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Extracted from four usable Apple AU compare exports. Exact source text preserved in typed fields where supported."`                                                                          | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `configurations`: empty or null in every canonical record; representative value is `[]`.
- `storageOptions`: empty or null in every canonical record; representative value is `[]`.
- `memoryOptions`: empty or null in every canonical record; representative value is `[]`.
- `cameras`: empty or null in every canonical record; representative value is `[]`.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.
- `accessories`: empty or null in every canonical record; representative value is `[]`.

### HomePod

Canonical file: `public/data/homepod/homepod.json`; records: 2; representative record: `homepod-mini`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"homepod-mini"`                                                                                                                                                                               | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"HomePod mini"`                                                                                                                                                                               | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"homepod"`                                                                                                                                                                                    | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2020`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `null`                                                                                                                                                                                         | minimum: 0; empty or null in every record                        |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"white","displayName":"White","swatch":{"kind":"css","value":"#00000000"},"images":[{"label":"small","appleUrl":"https://www.apple.com/v/homepod…]`                     | present with non-empty data                                      |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"ultra-wideband","displayName":"Ultra Wideband chip","family":"Ultra Wideband","cpuCores":{"total":1,"performance":null,"efficiency":null},"gpuC…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":true,"microphone":true,"speakerConfiguration":"Full-range driver and dual passive radiators for deep bass and crisp high frequencies; Custom-designed acoustic waveguide for a 3…` | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":false,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[],"charging":{"portId":null,"wiredFastCharge":null,"wirelessCharging":false,"wirelessStandards":nul…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"power-adapter","kind":"power connector","quantity":1,"sourceNotes":"HomePod mini connects through its supplied 20 W power adapter."}],"wifi":{"standards":["Wi-Fi 4"]},"bl…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["none"],"primaryMethod":"none","placement":null}`                                                                                                                                 | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[{"value":345,"unit":"g"}],"dimensions":[{"value":84.3,"unit":"mm","qualifier":"height"},{"value":97.9,"unit":"mm","qualifier":"width or diameter"}],"components":[{"id":"homepo…` | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":null,"waterDepthM":null,"splashPressureAtm":null,"dustProtected":null,"sweatResistant":null}`                                                                                     | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"HomePod Software","operatingSystemVersionAtLaunch":null,"compatibleOperatingSystems":["iOS","iPadOS","macOS","tvOS","watchOS"],"builtInApps":[]}`                         | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Remodeled from the supplied Apple specification HTML checkpoint. Controls, compatibility, sensors, sound recognition, room sensing, and in-box contents lack dedicated shared-contract fie…` | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `priceAud`: empty or null in every canonical record; representative value is `null`.
- `configurations`: empty or null in every canonical record; representative value is `[]`.
- `storageOptions`: empty or null in every canonical record; representative value is `[]`.
- `memoryOptions`: omitted from every canonical record; allowed by the schema but unused here.
- `displays`: empty or null in every canonical record; representative value is `[]`.
- `cameras`: empty or null in every canonical record; representative value is `[]`.
- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: omitted from every canonical record; allowed by the schema but unused here.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.
- `accessories`: empty or null in every canonical record; representative value is `[]`.

### iPad

Canonical file: `public/data/ipad/ipad.json`; records: 40; representative record: `ipad-pro-11-m5`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"ipad-pro-13-m5"`                                                                                                                                                                             | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"iPad Pro 13-inch (M5)"`                                                                                                                                                                      | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"ipad"`                                                                                                                                                                                       | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2025`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `1999`                                                                                                                                                                                         | minimum: 0; mixed: empty/null in some records                    |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"ipad-pro-11-m5-spaceblack","displayName":"Space Black","swatch":{"kind":"css","value":"#2e2c2e"},"images":[{"label":"front","appleUrl":"https:/…]`                     | mixed: empty/null in some records                                |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[first element: {"id":"ipad-pro-13-m5-storage-1","capacityValue":256,"capacityUnit":"GB","sourceNotes":"Storage capacity from supplied Apple AU compare capacity rows …]`                     | present with non-empty data                                      |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `[first element: {"id":"ipad-pro-13-m5-memory-12","capacityValue":12,"capacityUnit":"GB","kind":"unified","sourceNotes":"Unified-memory option from supplied Apple AU c…]`                     | mixed: empty/null in some records                                |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"ipad-pro-13-m5-chip","displayName":"Apple M5 chip","family":"M5","cpuCores":{"total":9,"performance":null,"efficiency":null},"gpuCores":null,"n…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[first element: {"id":"ipad-pro-13-m5-display","technology":"Ultra Retina XDR display","panelKind":null,"sizeIn":13,"resolutionWidthPx":2752,"resolutionHeightPx":2064…]`                     | present with non-empty data                                      |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[first element: {"id":"ipad-pro-13-m5-rear-camera","role":"rear-wide","displayName":"12MP Wide camera","megapixels":12}…]`                                                                    | present with non-empty data                                      |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":true,"microphone":true,"speakerConfiguration":"Four-speaker audio","microphoneConfiguration":"Four studio-quality microphones"}`                                                   | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[{"id":"ipad-pro-13-m5-runtime-wifi","activity":"Surfing the web or watching video","hours":10,"netwo…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"ipad-pro-13-m5-port-usb-c","kind":"USB-C","supportsDisplayOut":true,"maxPowerW":null,"sourceNotes":"Source wording is Thunderbolt/USB 4. USB 4 is retained as the explicit…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["Face ID"],"primaryMethod":"Face ID"}`                                                                                                                                            | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[],"dimensions":[],"components":[]}`                                                                                                                                               | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":null,"waterDepthM":null,"splashPressureAtm":null,"dustProtected":null,"sweatResistant":null}`                                                                                     | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"iPadOS","operatingSystemVersionAtLaunch":null,"compatibleOperatingSystems":[],"builtInApps":[]}`                                                                          | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Merged from supplied Apple AU compare exports: ipad.html, ipad2.html, ipad3.html, ipad4.html, ipad5.html. Source URL: https://www.apple.com/au/ipad/compare/. Canonical cheapest displayed…` | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `configurations`: empty or null in every canonical record; representative value is `[]`.
- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: empty or null in every canonical record; representative value is `[]`.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.
- `accessories`: empty or null in every canonical record; representative value is `[]`.

### iPhone

Canonical file: `public/data/iphone/iphone.json`; records: 38; representative record: `iphone-17`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"iphone-17"`                                                                                                                                                                                  | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"iPhone 17"`                                                                                                                                                                                  | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"iphone"`                                                                                                                                                                                     | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2025`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `1399`                                                                                                                                                                                         | minimum: 0; mixed: empty/null in some records                    |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"lavender","displayName":"Lavender","swatch":{"kind":"image","url":"https://www.apple.com/v/iphone/compare/al/images/overview/compare_iphone17_l…]`                     | mixed: empty/null in some records                                |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[first element: {"id":"256gb-configuration","displayName":"iPhone 17 256GB","colorIds":["lavender","sage","mist-blue","white","black"],"storageId":"256gb","priceAud":…]`                     | mixed: empty/null in some records                                |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[{"id":"256gb","displayName":"256GB","capacityValue":256,"capacityUnit":"GB"},{"id":"512gb","displayName":"512GB","capacityValue":512,"capacityUnit":"GB"}]`                                  | mixed: empty/null in some records                                |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"a19","displayName":"A19 chip","family":"A19","cpuCores":{"total":6,"performance":2,"efficiency":4},"gpuCores":5,"neuralEngineCores":16,"memoryB…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[first element: {"id":"primary-display","technology":"Super Retina XDR display","panelKind":null,"sizeIn":6.3,"resolutionWidthPx":2622,"resolutionHeightPx":1206,"pixe…]`                     | present with non-empty data                                      |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[first element: {"id":"rear-1","role":"rear-wide","displayName":"48MP Fusion Main","megapixels":48,"opticalZoomMultiplier":1,"sensorShiftOis":true,"proRAW":true,"spat…]`                     | present with non-empty data                                      |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":true,"microphone":true,"sourceNotes":"Speaker and microphone presence established by iPhone product type; detailed configurations absent from supplied HTML."}`                    | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[{"id":"video-playback","activity":"Video playback","hours":30},{"id":"video-playback-streamed","acti…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"usb-c","kind":"USB-C","standard":"USB 2","quantity":1,"supportsDisplayOut":true}],"wifi":null,"bluetooth":null,"cellular":null,"uwb":null,"thread":null,"infrared":null,"n…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["Face ID","passcode"],"primaryMethod":"Face ID","placement":null,"sourceNotes":"Exact authentication section establishes Face ID."}`                                              | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[{"value":177,"unit":"g"}],"dimensions":[],"components":[]}`                                                                                                                       | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":"IP68","waterDepthM":6,"splashPressureAtm":null,"dustProtected":true,"sweatResistant":null}`                                                                                      | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"iOS","operatingSystemVersionAtLaunch":null,"builtInApps":[],"sourceNotes":"Supplied compare HTML does not state launch iOS version or built-in application inventory."}`  | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Merged from usable source 1. Exact Summary, Display, Chip, Power and Battery, Connector, and capability text is preserved in extraction checkpoint evidence."`                               | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `memoryOptions`: empty or null in every canonical record; representative value is `[]`.
- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: empty or null in every canonical record; representative value is `[]`.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.
- `accessories`: empty or null in every canonical record; representative value is `[]`.

### Mac

Canonical file: `public/data/mac/mac.json`; records: 53; representative record: `macbook-neo-a18-pro`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                        | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"macbook-neo-a18-pro"`                                                                                                                                                                        | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"MacBook Neo (A18 Pro)"`                                                                                                                                                                      | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"mac"`                                                                                                                                                                                        | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2026`                                                                                                                                                                                         | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `1049`                                                                                                                                                                                         | minimum: 0; mixed: empty/null in some records                    |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"silver","displayName":"Silver","swatch":{"kind":"css","value":"#e2e3e4"},"images":[{"label":"mac1-images:compare_macbook_neo_a18_silver:d23cbmw…]`                     | mixed: empty/null in some records                                |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[first element: {"id":"256gb-ssd-1","storageId":"256gb","priceAud":1049,"sourceNotes":"Base starting price from compare table.","chipId":"apple-a18-pro-chip"}…]`                             | mixed: empty/null in some records                                |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[{"id":"256gb","displayName":"256GB","capacityValue":256,"capacityUnit":"GB"},{"id":"512gb","displayName":"512GB","capacityValue":512,"capacityUnit":"GB"}]`                                  | mixed: empty/null in some records                                |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `[{"id":"8gb","displayName":"8GB","capacityValue":8,"capacityUnit":"GB","kind":"unified"}]`                                                                                                    | mixed: empty/null in some records                                |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"apple-a18-pro-chip","displayName":"Apple A18 Pro chip","family":"A18 Pro chip","cpuCores":{"total":6,"performance":2,"efficiency":4},"gpuCores"…]`                     | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[first element: {"id":"display-13-0-liquid-retina-display-8","technology":"Liquid Retina display","panelKind":null,"sizeIn":13,"resolutionWidthPx":2408,"resolutionHei…]`                     | present with non-empty data                                      |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[first element: {"id":"camera-0","role":"FaceTime","displayName":"1080p FaceTime HD camera 1080p HD video recording Advanced image signal processor with computational…]`                     | present with non-empty data                                      |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":false,"microphone":false,"spatialAudio":null,"formats":[],"sourceNotes":""}`                                                                                                       | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":36.5,"runtimeHours":[],"charging":{"portId":null,"wiredFastCharge":null,"wirelessCharging":false,"wirelessStandards":[],"…` | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"usb-c-1","kind":"USB-C","standard":"USB 2","quantity":1,"supportsDisplayOut":null,"maxPowerW":null,"sourceNotes":"USB 3 (USB-C) port; USB 2 (USB-C) port"}],"wifi":{"stand…` | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["passcode"],"primaryMethod":"passcode","placement":null,"sourceNotes":"Touch ID; passcode"}`                                                                                      | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[{"value":1.23,"unit":"kg"}],"dimensions":[{"value":1.27,"unit":"cm","qualifier":"Height"},{"value":29.75,"unit":"cm","qualifier":"Width"},{"value":20.64,"unit":"cm","qualifier…` | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":null,"waterDepthM":null,"splashPressureAtm":null,"dustProtected":null,"sweatResistant":null}`                                                                                     | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"macOS","operatingSystemVersionAtLaunch":null,"builtInApps":[]}`                                                                                                           | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                  | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `false`                                                                                                                                                                                        | mixed: empty/null in some records                                |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `false`                                                                                                                                                                                        | mixed: empty/null in some records                                |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[]`                                                                                                                                                                                           | empty or null in every record                                    |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Extracted from mac.html. Prices are model-level AUD where rendered; unrendered mac5 prices remain null. Image bytes were not present in owned staging, so no image objects are asserted.; …` | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: empty or null in every canonical record; representative value is `[]`.
- `accessories`: empty or null in every canonical record; representative value is `[]`.

### Vision

Canonical file: `public/data/vision/vision.json`; records: 1; representative record: `apple-vision-pro-m5`.

These records use the generic `device` branch of the discriminator.

#### Top-level fields

| Field                | Required? | Nullability  | Schema type                                                        | Example                                                                                                                                                                                           | Constraints / notes                                              |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                 | yes       | not nullable | string                                                             | `"apple-vision-pro-m5"`                                                                                                                                                                           | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$; present with non-empty data |
| `name`               | yes       | not nullable | string                                                             | `"Apple Vision Pro"`                                                                                                                                                                              | present with non-empty data                                      |
| `family`             | optional  | not nullable | enum ("ipad", "iphone", "watch", "mac", "vision", "tv", "homepod") | `"vision"`                                                                                                                                                                                        | present with non-empty data                                      |
| `releaseYear`        | optional  | not nullable | integer                                                            | `2025`                                                                                                                                                                                            | minimum: 1976; maximum: 2100; present with non-empty data        |
| `priceAud`           | optional  | nullable     | number or null                                                     | `null`                                                                                                                                                                                            | minimum: 0; empty or null in every record                        |
| `colors`             | optional  | not nullable | array<object → color>                                              | `[first element: {"id":"light-grey-accessory","displayName":"light grey","swatch":{"kind":"css","value":"#d3d3d3"},"images":[{"label":"light grey Cover large 1x","appl…]`                        | present with non-empty data                                      |
| `configurations`     | optional  | not nullable | array<object → configurationVariant>                               | `[{"id":"256gb","storageId":"256gb"},{"id":"512gb","storageId":"512gb"},{"id":"1tb","storageId":"1tb"}]`                                                                                          | present with non-empty data                                      |
| `storageOptions`     | optional  | not nullable | array<object → storageOption>                                      | `[first element: {"id":"256gb","displayName":"256GB","capacityValue":256,"capacityUnit":"GB"}…]`                                                                                                  | present with non-empty data                                      |
| `memoryOptions`      | optional  | not nullable | array<object → memoryOption>                                       | `[first element: {"id":"16gb-unified","displayName":"16GB unified memory","capacityValue":16,"capacityUnit":"GB","kind":"unified","speedMbps":153000,"speedUnit":"Mbps"…]`                        | present with non-empty data                                      |
| `chips`              | optional  | not nullable | array<object → chip>                                               | `[first element: {"id":"apple-m5","displayName":"Apple M5 chip","family":"M5","cpuCores":{"total":10,"performance":4,"efficiency":6},"gpuCores":10,"neuralEngineCores":…]`                        | present with non-empty data                                      |
| `displays`           | optional  | not nullable | array<object → display>                                            | `[first element: {"id":"micro-oled-3d-display-system","technology":"3D display system","panelKind":"micro-OLED","sizeIn":null,"resolutionWidthPx":23000000,"resolutionH…]`                        | present with non-empty data                                      |
| `cameras`            | optional  | not nullable | array<object → camera>                                             | `[first element: {"id":"spatial-main-camera-system","role":"spatial","displayName":"Stereoscopic 3D main camera system","megapixels":6.5,"apertureFNumber":2,"spatialCa…]`                        | present with non-empty data                                      |
| `audio`              | optional  | not nullable | object → audio                                                     | `{"speaker":null,"microphone":true,"microphoneConfiguration":"Six‑mic array with directional beamforming","spatialAudio":true,"formats":["AAC","MP3","Apple Lossless","FLAC","Dolby Digital"…`    | present with non-empty data                                      |
| `batteryAndPower`    | optional  | not nullable | object → batteryAndPower                                           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours":[{"id":"general-use","activity":"general use","hours":2.5},{"id":"video-watching","activity":"video w…`    | present with non-empty data                                      |
| `connectivity`       | optional  | not nullable | object → connectivity                                              | `{"ports":[{"id":"battery-power-connector","kind":"power connector","sourceNotes":"Physical kind inferred from battery built-in power cable with round connector shown in source image descr…`    | present with non-empty data                                      |
| `authentication`     | optional  | not nullable | object → authentication                                            | `{"methods":["Optic ID"],"primaryMethod":"Optic ID","sourceNotes":"Iris‑based biometric authentication. Optic ID data is encrypted and accessible only to the Secure Enclave processor. Secu…`    | present with non-empty data                                      |
| `physical`           | optional  | not nullable | object → physical                                                  | `{"weights":[{"value":750,"unit":"g","qualifier":"minimum device weight; range 750–800 grams (26.4–28.2 ounces); weight includes Light Seal and counterbalanced Dual Knit Band and can vary …`    | present with non-empty data                                      |
| `resistance`         | optional  | not nullable | object → resistance                                                | `{"ipRating":null,"waterDepthM":null,"splashPressureAtm":null,"dustProtected":null,"sweatResistant":null}`                                                                                        | present with non-empty data                                      |
| `software`           | optional  | not nullable | object → software                                                  | `{"operatingSystem":"visionOS 26","operatingSystemVersionAtLaunch":"26","builtInApps":["App Store","Encounter Dinosaurs","Files","Freeform","Keynote","Mail","Messages","Mindfulness","Music…`    | present with non-empty data                                      |
| `watchDetails`       | optional  | not nullable | object → watchDetails                                              | `not emitted`                                                                                                                                                                                     | not emitted in this category                                     |
| `overviewImages`     | optional  | not nullable | array<object → overviewImage>                                      | `not emitted`                                                                                                                                                                                     | not emitted in this category                                     |
| `forceTouchTrackpad` | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                     | not emitted in this category                                     |
| `backlitKeyboard`    | optional  | nullable     | boolean or null                                                    | `not emitted`                                                                                                                                                                                     | not emitted in this category                                     |
| `accessories`        | optional  | not nullable | array<object → accessoryReference>                                 | `[first element: {"displayName":"Hands","category":"input","accessoryId":"hands"}…]`                                                                                                              | present with non-empty data                                      |
| `sourceNotes`        | optional  | not nullable | string                                                             | `"Camera/sensor list retained because the strict contract has no sensors section: Two high‑resolution main cameras \| Six world‑facing tracking cameras \| Four eye‑tracking cameras \| TrueDep…` | present with non-empty data                                      |

#### Fields empty or omitted across the category

- `priceAud`: empty or null in every canonical record; representative value is `null`.
- `watchDetails`: omitted from every canonical record; allowed by the schema but unused here.
- `overviewImages`: omitted from every canonical record; allowed by the schema but unused here.
- `forceTouchTrackpad`: omitted from every canonical record; allowed by the schema but unused here.
- `backlitKeyboard`: omitted from every canonical record; allowed by the schema but unused here.

## Reusable nested structures

The following tables expand every reusable `$defs` object used by the top-level shapes. A field whose schema type points to another definition must conform to that referenced table.

### `measurement`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type                                                                                                                                                                | Example    | Constraints / notes |
| ----------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------- |
| `value`     | yes       | nullable     | number or null                                                                                                                                                             | `5.55`     | —                   |
| `unit`      | yes       | not nullable | enum ("mm", "cm", "m", "in", "g", "kg", "oz", "lb", "nits", "hz", "w", "v", "a", "mAh", "Whr", "hours", "minutes", "percent", "GB", "TB", "Mbps", "Gbps", "dB SPL", "atm") | `"g"`      | —                   |
| `qualifier` | optional  | not nullable | string                                                                                                                                                                     | `"height"` | —                   |

### `measurementRange`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type                                                                                                                                                                | Example                                              | Constraints / notes |
| ----------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------- |
| `minimum`   | yes       | not nullable | number                                                                                                                                                                     | `1`                                                  | —                   |
| `maximum`   | yes       | not nullable | number                                                                                                                                                                     | `60`                                                 | —                   |
| `unit`      | yes       | not nullable | enum ("mm", "cm", "m", "in", "g", "kg", "oz", "lb", "nits", "hz", "w", "v", "a", "mAh", "Whr", "hours", "minutes", "percent", "GB", "TB", "Mbps", "Gbps", "dB SPL", "atm") | `"hz"`                                               | —                   |
| `qualifier` | optional  | not nullable | string                                                                                                                                                                     | `"Adaptive refresh rates with ProMotion technology"` | —                   |

### `swatch`

Schema form: object **or** object.

| Variant | Required fields | Field types                             | Example                                              |
| ------- | --------------- | --------------------------------------- | ---------------------------------------------------- |
| css     | `kind`, `value` | `kind`: constant "css"; `value`: string | `{"kind":"css","value":"#ffffff"}`                   |
| image   | `kind`, `url`   | `kind`: constant "image"; `url`: string | `{"kind":"image","url":"https://www.apple.com/..."}` |

### `image`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type | Example                                                                                                      | Constraints / notes |
| ----------- | --------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| `label`     | yes       | not nullable | string      | `"front"`                                                                                                    | —                   |
| `appleUrl`  | yes       | not nullable | string      | `"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqzzyvwxyu_large_2x.png"` | format: uri         |
| `localPath` | yes       | not nullable | string      | `"public/data/airpods/images/airpods-pro-3-white.png"`                                                       | —                   |
| `widthPx`   | yes       | not nullable | integer     | `504`                                                                                                        | minimum: 1          |
| `heightPx`  | yes       | not nullable | integer     | `438`                                                                                                        | minimum: 1          |

### `color`

Schema form: object; additional properties: not allowed.

| Field           | Required? | Nullability  | Schema type           | Example                                                                                                                                                                    | Constraints / notes                 |
| --------------- | --------- | ------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `id`            | yes       | not nullable | string                | `"default"`                                                                                                                                                                | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$ |
| `displayName`   | yes       | not nullable | string                | `"Default"`                                                                                                                                                                | —                                   |
| `swatch`        | yes       | not nullable | object → swatch       | `{"kind":"css","value":"#ffffff"}`                                                                                                                                         | —                                   |
| `images`        | yes       | not nullable | array<object → image> | `[first element: {"label":"front","appleUrl":"https://www.apple.com/v/apple-tv-4k/ah/images/meta/apple-tv-4k__efpszaiqoh2e_og.png?202602031722","localPath":"public/dat…]` | —                                   |
| `colorPriceAud` | optional  | not nullable | number                | `not emitted`                                                                                                                                                              | exclusive minimum: 0                |
| `sourceNotes`   | optional  | not nullable | string                | `"Product imagery is not colour-specific; all staged product and specification images are attached to this canonical non-colour entry."`                                   | —                                   |

### `storageOption`

Schema form: object; additional properties: not allowed.

| Field               | Required? | Nullability  | Schema type       | Example                                              | Constraints / notes |
| ------------------- | --------- | ------------ | ----------------- | ---------------------------------------------------- | ------------------- |
| `id`                | yes       | not nullable | string            | `"64gb"`                                             | —                   |
| `displayName`       | optional  | not nullable | string            | `"64GB"`                                             | —                   |
| `capacityValue`     | yes       | not nullable | integer           | `64`                                                 | minimum: 1          |
| `capacityUnit`      | yes       | not nullable | enum ("GB", "TB") | `"GB"`                                               | —                   |
| `priceDeltaAud`     | optional  | not nullable | number            | `not emitted`                                        | —                   |
| `availableColorIds` | optional  | not nullable | array<string>     | `[]`                                                 | —                   |
| `sourceNotes`       | optional  | not nullable | string            | `"Rendered only as part of \"64GB (Wi-Fi model)\"."` | —                   |

### `memoryOption`

Schema form: object; additional properties: not allowed.

| Field           | Required? | Nullability  | Schema type                                     | Example                                                                                                                                                                                        | Constraints / notes |
| --------------- | --------- | ------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`            | yes       | not nullable | string                                          | `"ipad-pro-13-m5-memory-12"`                                                                                                                                                                   | —                   |
| `displayName`   | optional  | not nullable | string                                          | `"8GB"`                                                                                                                                                                                        | —                   |
| `capacityValue` | yes       | not nullable | integer                                         | `12`                                                                                                                                                                                           | minimum: 1          |
| `capacityUnit`  | yes       | not nullable | enum ("GB", "TB")                               | `"GB"`                                                                                                                                                                                         | —                   |
| `kind`          | yes       | not nullable | enum ("unified", "DRAM", "NAND cache", "other") | `"unified"`                                                                                                                                                                                    | —                   |
| `speedMbps`     | optional  | not nullable | integer                                         | `153000`                                                                                                                                                                                       | —                   |
| `speedUnit`     | optional  | not nullable | constant "Mbps"                                 | `"Mbps"`                                                                                                                                                                                       | —                   |
| `configuration` | optional  | not nullable | string                                          | `"M5 Max with 32-core GPU"`                                                                                                                                                                    | —                   |
| `sourceNotes`   | optional  | not nullable | string                                          | `"Unified-memory option from supplied Apple AU compare chip-detail row duGQ9SXF; storage-linked variants are represented as available capacities without variant mapping because the source …` | —                   |

### `port`

Schema form: object; additional properties: not allowed.

| Field                | Required? | Nullability  | Schema type                                                                                                                                                                     | Example                                                                                    | Constraints / notes |
| -------------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------- |
| `id`                 | yes       | not nullable | string                                                                                                                                                                          | `"hdmi"`                                                                                   | —                   |
| `kind`               | yes       | not nullable | enum ("USB-C", "Thunderbolt 4", "Thunderbolt 5", "Lightning", "HDMI", "Ethernet RJ45", "IR receiver", "power connector", "3.5 mm audio jack", "Smart Connector", "proprietary") | `"HDMI"`                                                                                   | —                   |
| `standard`           | optional  | not nullable | enum ("USB 2", "USB 3.2 Gen 1", "USB 4", "Thunderbolt 3", "Thunderbolt 4", "Thunderbolt 5")                                                                                     | `"USB 4"`                                                                                  | —                   |
| `quantity`           | optional  | not nullable | integer                                                                                                                                                                         | `1`                                                                                        | minimum: 1          |
| `supportsDisplayOut` | optional  | nullable     | boolean or null                                                                                                                                                                 | `null`                                                                                     | —                   |
| `maxPowerW`          | optional  | nullable     | number or null                                                                                                                                                                  | `null`                                                                                     | Watts               |
| `sourceNotes`        | optional  | not nullable | string                                                                                                                                                                          | `"Source says HDMI 2.1; HDMI 2.1 cannot be represented in the shared port-standard enum."` | —                   |

### `cpuCores`

Schema form: object; additional properties: not allowed.

| Field         | Required? | Nullability  | Schema type     | Example | Constraints / notes |
| ------------- | --------- | ------------ | --------------- | ------- | ------------------- |
| `total`       | yes       | not nullable | integer         | `1`     | minimum: 1          |
| `performance` | yes       | nullable     | integer or null | `null`  | minimum: 0          |
| `efficiency`  | yes       | nullable     | integer or null | `null`  | minimum: 0          |

### `mediaEngine`

Schema form: object; additional properties: not allowed.

| Field         | Required? | Nullability  | Schema type                                                                                                 | Example                                   | Constraints / notes                                                                                                    |
| ------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`          | yes       | not nullable | string                                                                                                      | `"media-engine"`                          | —                                                                                                                      |
| `displayName` | yes       | not nullable | string                                                                                                      | `"Media Engine"`                          | —                                                                                                                      |
| `kinds`       | yes       | not nullable | array<enum ("video-decode", "video-encode", "ProRes encode-decode", "image signal", "AV1 decode", "other")> | `["video-decode","ProRes encode-decode"]` | unique items; item enum: "video-decode", "video-encode", "ProRes encode-decode", "image signal", "AV1 decode", "other" |

### `chip`

Schema form: object; additional properties: not allowed.

| Field                     | Required? | Nullability  | Schema type                 | Example                                                                                                                                                                                          | Constraints / notes                                                         |
| ------------------------- | --------- | ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `id`                      | yes       | not nullable | string                      | `"a15-bionic"`                                                                                                                                                                                   | —                                                                           |
| `displayName`             | yes       | not nullable | string                      | `"A15 Bionic chip"`                                                                                                                                                                              | —                                                                           |
| `family`                  | yes       | not nullable | string                      | `"A-series"`                                                                                                                                                                                     | —                                                                           |
| `cpuCores`                | yes       | not nullable | object → cpuCores           | `{"total":1,"performance":null,"efficiency":null}`                                                                                                                                               | —                                                                           |
| `gpuCores`                | yes       | nullable     | integer or null             | `null`                                                                                                                                                                                           | minimum: 0                                                                  |
| `neuralEngineCores`       | yes       | nullable     | integer or null             | `null`                                                                                                                                                                                           | minimum: 0                                                                  |
| `memoryBandwidthGbps`     | yes       | nullable     | number or null              | `null`                                                                                                                                                                                           | minimum: 0; Gigabits per second unless sourceNotes states bytes per second. |
| `cpuCoreConfiguration`    | optional  | not nullable | string                      | `"6-core CPU with 2 performance and 4 efficiency cores"`                                                                                                                                         | —                                                                           |
| `neuralAccelerators`      | optional  | not nullable | boolean                     | `false`                                                                                                                                                                                          | —                                                                           |
| `hardwareRayTracing`      | optional  | nullable     | boolean or null             | `null`                                                                                                                                                                                           | —                                                                           |
| `mediaEngines`            | optional  | not nullable | array<object → mediaEngine> | `[{"id":"media-engine","displayName":"Media Engine","kinds":["video-decode","ProRes encode-decode"]}]`                                                                                           | —                                                                           |
| `processNode`             | optional  | not nullable | string                      | `""`                                                                                                                                                                                             | —                                                                           |
| `transistorCountBillions` | optional  | nullable     | number or null              | `not emitted`                                                                                                                                                                                    | minimum: 0                                                                  |
| `sourceNotes`             | optional  | not nullable | string                      | `"Source renders only \"A15 Bionic chip\". CPU total is represented as the minimum schema integer and must not be interpreted as a source count; performance and efficiency counts are absent."` | —                                                                           |

### `display`

Schema form: object; additional properties: not allowed.

| Field                         | Required? | Nullability  | Schema type                                                                         | Example                                                                                                         | Constraints / notes |
| ----------------------------- | --------- | ------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`                          | yes       | not nullable | string                                                                              | `"primary"`                                                                                                     | —                   |
| `technology`                  | yes       | not nullable | string                                                                              | `"Always-On Retina display"`                                                                                    | —                   |
| `panelKind`                   | optional  | nullable     | enum ("LCD", "LED-backlit LCD", "OLED", "tandem OLED", "micro-OLED", "other", null) | `"OLED"`                                                                                                        | —                   |
| `sizeIn`                      | yes       | nullable     | number or null                                                                      | `null`                                                                                                          | minimum: 0; Inches  |
| `resolutionWidthPx`           | yes       | nullable     | integer or null                                                                     | `null`                                                                                                          | minimum: 1          |
| `resolutionHeightPx`          | yes       | nullable     | integer or null                                                                     | `null`                                                                                                          | minimum: 1          |
| `pixelsPerInch`               | yes       | nullable     | number or null                                                                      | `null`                                                                                                          | minimum: 0          |
| `refreshRateHz`               | optional  | nullable     | number or null                                                                      | `null`                                                                                                          | minimum: 0          |
| `refreshRateRange`            | optional  | not nullable | object → measurementRange                                                           | `{"minimum":1,"maximum":60,"unit":"hz"}`                                                                        | —                   |
| `sdrPeakBrightnessNits`       | optional  | nullable     | number or null                                                                      | `2000`                                                                                                          | minimum: 0          |
| `hdrPeakBrightnessNits`       | optional  | nullable     | number or null                                                                      | `null`                                                                                                          | minimum: 0          |
| `fullScreenHdrBrightnessNits` | optional  | nullable     | number or null                                                                      | `null`                                                                                                          | minimum: 0          |
| `minimumBrightnessNits`       | optional  | nullable     | number or null                                                                      | `1`                                                                                                             | minimum: 0          |
| `trueTone`                    | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `promotion`                   | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `alwaysOn`                    | optional  | nullable     | boolean or null                                                                     | `true`                                                                                                          | —                   |
| `wideColorP3`                 | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `laminated`                   | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `antireflective`              | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `nanoTextureOption`           | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `fingerprintResistantCoating` | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `hoverSupport`                | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `mirroring`                   | optional  | nullable     | boolean or null                                                                     | `null`                                                                                                          | —                   |
| `sourceNotes`                 | optional  | not nullable | string                                                                              | `"Display material: Always-On Retina display; Display construction: Wide-angle OLED; Display backplane: LTPO3"` | —                   |

### `camera`

Schema form: object; additional properties: not allowed.

| Field                        | Required? | Nullability  | Schema type                                                                                                        | Example                                                                                             | Constraints / notes  |
| ---------------------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------------------- |
| `id`                         | yes       | not nullable | string                                                                                                             | `"ipad-pro-13-m5-rear-camera"`                                                                      | —                    |
| `role`                       | yes       | not nullable | enum ("rear-wide", "rear-ultrawide", "rear-telephoto", "front", "FaceTime", "spatial", "input-accessory", "other") | `"rear-wide"`                                                                                       | —                    |
| `displayName`                | yes       | not nullable | string                                                                                                             | `"12MP Wide camera"`                                                                                | —                    |
| `megapixels`                 | yes       | nullable     | number or null                                                                                                     | `12`                                                                                                | exclusive minimum: 0 |
| `opticalZoomMultiplier`      | optional  | nullable     | number or null                                                                                                     | `1`                                                                                                 | exclusive minimum: 0 |
| `apertureFNumber`            | optional  | nullable     | number or null                                                                                                     | `2`                                                                                                 | exclusive minimum: 0 |
| `sensorShiftOis`             | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `proRAW`                     | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `spatialCapture`             | optional  | nullable     | boolean or null                                                                                                    | `false`                                                                                             | —                    |
| `macro`                      | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `centerStage`                | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `trueDepthSystem`            | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `videoMaxResolutionWidthPx`  | optional  | nullable     | integer or null                                                                                                    | `not emitted`                                                                                       | minimum: 1           |
| `videoMaxResolutionHeightPx` | optional  | nullable     | integer or null                                                                                                    | `not emitted`                                                                                       | minimum: 1           |
| `videoMaxFrameRateHz`        | optional  | nullable     | number or null                                                                                                     | `not emitted`                                                                                       | exclusive minimum: 0 |
| `proRes`                     | optional  | nullable     | boolean or null                                                                                                    | `null`                                                                                              | —                    |
| `lidar`                      | optional  | nullable     | boolean or null                                                                                                    | `true`                                                                                              | —                    |
| `sourceNotes`                | optional  | not nullable | string                                                                                                             | `"Source display text does not state megapixels; camera presence and Apple display name retained."` | —                    |

### `audio`

Schema form: object; additional properties: not allowed.

| Field                     | Required? | Nullability  | Schema type     | Example                                                                                                                                                                                        | Constraints / notes |
| ------------------------- | --------- | ------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `speaker`                 | yes       | nullable     | boolean or null | `true`                                                                                                                                                                                         | —                   |
| `microphone`              | yes       | nullable     | boolean or null | `true`                                                                                                                                                                                         | —                   |
| `speakerConfiguration`    | optional  | not nullable | string          | `"Speaker presence inferred from supported audio playback formats; hardware configuration not rendered."`                                                                                      | —                   |
| `microphoneConfiguration` | optional  | not nullable | string          | `"Siri Remote microphone"`                                                                                                                                                                     | —                   |
| `siren`                   | optional  | nullable     | boolean or null | `null`                                                                                                                                                                                         | —                   |
| `spatialAudio`            | optional  | nullable     | boolean or null | `null`                                                                                                                                                                                         | —                   |
| `adaptiveAudio`           | optional  | nullable     | boolean or null | `null`                                                                                                                                                                                         | —                   |
| `activeNoiseCancellation` | optional  | nullable     | boolean or null | `null`                                                                                                                                                                                         | —                   |
| `transparency`            | optional  | nullable     | boolean or null | `null`                                                                                                                                                                                         | —                   |
| `formats`                 | optional  | not nullable | array<string>   | `[first element: "HE-AAC (V1)"…]`                                                                                                                                                              | —                   |
| `sourceNotes`             | optional  | not nullable | string          | `"Speaker presence is established by the audio-format list and Apple TV product context; Siri microphone is explicitly listed on the remote diagram. The source does not render a dedicated …` | —                   |

### `batteryRuntime`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type                                 | Example                  | Constraints / notes |
| ----------- | --------- | ------------ | ------------------------------------------- | ------------------------ | ------------------- |
| `id`        | yes       | not nullable | string                                      | `"normal"`               | —                   |
| `activity`  | yes       | not nullable | string                                      | `"All-day battery life"` | —                   |
| `hours`     | yes       | nullable     | number or null                              | `24`                     | minimum: 0          |
| `qualifier` | optional  | not nullable | string                                      | `"Up to"`                | —                   |
| `network`   | optional  | nullable     | enum ("Wi-Fi", "cellular", "offline", null) | `"Wi-Fi"`                | —                   |

### `charging`

Schema form: object; additional properties: not allowed.

| Field                        | Required? | Nullability | Schema type                                                            | Example | Constraints / notes |
| ---------------------------- | --------- | ----------- | ---------------------------------------------------------------------- | ------- | ------------------- |
| `portId`                     | yes       | nullable    | string or null                                                         | `null`  | —                   |
| `wiredFastCharge`            | yes       | nullable    | boolean or null                                                        | `null`  | —                   |
| `wirelessCharging`           | yes       | nullable    | boolean or null                                                        | `false` | —                   |
| `wirelessStandards`          | yes       | nullable    | null **or** array<enum ("MagSafe", "Qi", "Qi2", "inductive", "other")> | `null`  | —                   |
| `fastChargeMinutesToPercent` | yes       | nullable    | null **or** object                                                     | `null`  | —                   |
| `adapterPowerW`              | yes       | nullable    | number or null                                                         | `null`  | minimum: 0          |

### `powerSupply`

Schema form: object; additional properties: not allowed.

| Field                     | Required? | Nullability | Schema type        | Example                         | Constraints / notes |
| ------------------------- | --------- | ----------- | ------------------ | ------------------------------- | ------------------- |
| `hasExternalPowerAdapter` | yes       | nullable    | boolean or null    | `false`                         | —                   |
| `outputVoltageV`          | yes       | nullable    | number or null     | `null`                          | minimum: 0          |
| `outputCurrentA`          | yes       | nullable    | number or null     | `null`                          | minimum: 0          |
| `outputPowerW`            | yes       | nullable    | number or null     | `null`                          | minimum: 0          |
| `inputVoltageRangeV`      | yes       | nullable    | null **or** object | `{"minimum":100,"maximum":240}` | —                   |
| `frequencyHz`             | yes       | nullable    | number or null     | `null`                          | minimum: 0          |
| `consumptionW`            | yes       | nullable    | number or null     | `null`                          | minimum: 0          |

### `batteryAndPower`

Schema form: object; additional properties: not allowed.

| Field                | Required? | Nullability  | Schema type                    | Example                                                                                                                                                                                       | Constraints / notes |
| -------------------- | --------- | ------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `hasBattery`         | yes       | not nullable | boolean                        | `false`                                                                                                                                                                                       | —                   |
| `batteryCapacityMah` | yes       | nullable     | number or null                 | `null`                                                                                                                                                                                        | minimum: 0          |
| `batteryCapacityWhr` | yes       | nullable     | number or null                 | `null`                                                                                                                                                                                        | minimum: 0          |
| `runtimeHours`       | yes       | not nullable | array<object → batteryRuntime> | `[]`                                                                                                                                                                                          | —                   |
| `charging`           | yes       | not nullable | object → charging              | `{"portId":null,"wiredFastCharge":null,"wirelessCharging":false,"wirelessStandards":null,"fastChargeMinutesToPercent":null,"adapterPowerW":null}`                                             | —                   |
| `powerSupply`        | yes       | not nullable | object → powerSupply           | `{"hasExternalPowerAdapter":false,"outputVoltageV":null,"outputCurrentA":null,"outputPowerW":null,"inputVoltageRangeV":{"minimum":100,"maximum":240},"frequencyHz":null,"consumptionW":null}` | —                   |

### `wifi`

Schema form: object; additional properties: not allowed.

| Field                  | Required? | Nullability  | Schema type                                                                     | Example       | Constraints / notes                                                                        |
| ---------------------- | --------- | ------------ | ------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `standards`            | yes       | not nullable | array<enum ("Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7", "Wi-Fi 8")> | `["Wi-Fi 6"]` | unique items; item enum: "Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7", "Wi-Fi 8" |
| `chip`                 | optional  | not nullable | string                                                                          | `not emitted` | —                                                                                          |
| `MIMO`                 | optional  | not nullable | string                                                                          | `"2x2 MIMO"`  | —                                                                                          |
| `simultaneousDualBand` | optional  | nullable     | boolean or null                                                                 | `null`        | —                                                                                          |

### `bluetooth`

Schema form: object; additional properties: not allowed.

| Field     | Required? | Nullability  | Schema type                                                                                                 | Example           | Constraints / notes |
| --------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| `version` | yes       | not nullable | enum ("Bluetooth 4.0", "Bluetooth 4.2", "Bluetooth 5.0", "Bluetooth 5.3", "Bluetooth 5.4", "Bluetooth 6.0") | `"Bluetooth 5.0"` | —                   |

### `cellular`

Schema form: object; additional properties: not allowed.

| Field          | Required? | Nullability  | Schema type                                  | Example              | Constraints / notes                                     |
| -------------- | --------- | ------------ | -------------------------------------------- | -------------------- | ------------------------------------------------------- |
| `technologies` | yes       | not nullable | array<enum ("LTE", "5G sub-6", "5G mmWave")> | `["LTE","5G sub-6"]` | unique items; item enum: "LTE", "5G sub-6", "5G mmWave" |
| `bands`        | optional  | not nullable | array<string>                                | `not emitted`        | —                                                       |
| `eSIMOnly`     | optional  | nullable     | boolean or null                              | `false`              | —                                                       |

### `uwb`

Schema form: object; additional properties: not allowed.

| Field              | Required? | Nullability  | Schema type     | Example                                   | Constraints / notes |
| ------------------ | --------- | ------------ | --------------- | ----------------------------------------- | ------------------- |
| `chip`             | yes       | not nullable | string          | `"Second-generation Ultra Wideband chip"` | —                   |
| `secondGeneration` | optional  | nullable     | boolean or null | `false`                                   | —                   |

### `thread`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type                                      | Example | Constraints / notes |
| ----------- | --------- | ------------ | ------------------------------------------------ | ------- | ------------------- |
| `supported` | yes       | not nullable | boolean                                          | `true`  | —                   |
| `role`      | optional  | nullable     | enum ("endpoint", "border-router", "both", null) | `null`  | —                   |

### `infrared`

Schema form: object; additional properties: not allowed.

| Field     | Required? | Nullability  | Schema type    | Example         | Constraints / notes |
| --------- | --------- | ------------ | -------------- | --------------- | ------------------- |
| `present` | yes       | not nullable | boolean        | `true`          | —                   |
| `purpose` | yes       | nullable     | string or null | `"IR receiver"` | —                   |

### `nearFieldCommunication`

Schema form: object; additional properties: not allowed.

| Field                  | Required? | Nullability  | Schema type     | Example | Constraints / notes |
| ---------------------- | --------- | ------------ | --------------- | ------- | ------------------- |
| `present`              | yes       | not nullable | boolean         | `false` | —                   |
| `readWriteMode`        | optional  | nullable     | boolean or null | `null`  | —                   |
| `backgroundTagReading` | optional  | nullable     | boolean or null | `null`  | —                   |

### `gps`

Schema form: object; additional properties: not allowed.

| Field                    | Required? | Nullability  | Schema type                                                          | Example                                       | Constraints / notes                                               |
| ------------------------ | --------- | ------------ | -------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| `present`                | yes       | not nullable | boolean                                                              | `true`                                        | —                                                                 |
| `precisionDualFrequency` | optional  | nullable     | boolean or null                                                      | `false`                                       | —                                                                 |
| `systems`                | optional  | not nullable | array<enum ("GPS", "GLONASS", "Galileo", "QZSS", "BeiDou", "NavIC")> | `["GPS","GLONASS","Galileo","QZSS","BeiDou"]` | item enum: "GPS", "GLONASS", "Galileo", "QZSS", "BeiDou", "NavIC" |

### `connectivity`

Schema form: object; additional properties: not allowed.

| Field                    | Required? | Nullability  | Schema type                                 | Example                                                                                                                                                                    | Constraints / notes |
| ------------------------ | --------- | ------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `ports`                  | yes       | not nullable | array<object → port>                        | `[first element: {"id":"hdmi","kind":"HDMI","quantity":1,"supportsDisplayOut":null,"maxPowerW":null,"sourceNotes":"Source says HDMI 2.1; HDMI 2.1 cannot be represented…]` | —                   |
| `wifi`                   | yes       | nullable     | object → wifi **or** null                   | `{"standards":["Wi-Fi 6"],"MIMO":"2x2 MIMO","simultaneousDualBand":null}`                                                                                                  | —                   |
| `bluetooth`              | yes       | nullable     | object → bluetooth **or** null              | `{"version":"Bluetooth 5.0"}`                                                                                                                                              | —                   |
| `cellular`               | yes       | nullable     | object → cellular **or** null               | `null`                                                                                                                                                                     | —                   |
| `uwb`                    | yes       | nullable     | object → uwb **or** null                    | `null`                                                                                                                                                                     | —                   |
| `thread`                 | yes       | nullable     | object → thread **or** null                 | `{"supported":true,"role":null}`                                                                                                                                           | —                   |
| `infrared`               | yes       | nullable     | object → infrared **or** null               | `{"present":true,"purpose":"IR receiver"}`                                                                                                                                 | —                   |
| `nearFieldCommunication` | yes       | nullable     | object → nearFieldCommunication **or** null | `null`                                                                                                                                                                     | —                   |
| `gps`                    | yes       | nullable     | object → gps **or** null                    | `null`                                                                                                                                                                     | —                   |

### `authentication`

Schema form: object; additional properties: not allowed.

| Field           | Required? | Nullability  | Schema type                                                                     | Example                                               | Constraints / notes                                                                        |
| --------------- | --------- | ------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `methods`       | yes       | not nullable | array<enum ("Face ID", "Touch ID", "Optic ID", "passcode", "password", "none")> | `["none"]`                                            | unique items; item enum: "Face ID", "Touch ID", "Optic ID", "passcode", "password", "none" |
| `primaryMethod` | yes       | not nullable | enum ("Face ID", "Touch ID", "Optic ID", "passcode", "password", "none")        | `"none"`                                              | —                                                                                          |
| `placement`     | optional  | nullable     | enum ("top button", "keyboard", "side button", "other", null)                   | `null`                                                | —                                                                                          |
| `sourceNotes`   | optional  | not nullable | string                                                                          | `"Exact authentication section establishes Face ID."` | —                                                                                          |

### `physicalComponent`

Schema form: object; additional properties: not allowed.

| Field         | Required? | Nullability  | Schema type                        | Example                                                                                                                                               | Constraints / notes |
| ------------- | --------- | ------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`          | yes       | not nullable | string                             | `"apple-tv-4k-body"`                                                                                                                                  | —                   |
| `displayName` | yes       | not nullable | string                             | `"Apple TV 4K"`                                                                                                                                       | —                   |
| `dimensions`  | yes       | not nullable | array<object → measurement>        | `[{"value":31,"unit":"mm","qualifier":"height"},{"value":93,"unit":"mm","qualifier":"width"},{"value":93,"unit":"mm","qualifier":"depth"}]`           | —                   |
| `weight`      | yes       | nullable     | number or null                     | `null`                                                                                                                                                | minimum: 0          |
| `weightUnit`  | optional  | nullable     | enum ("g", "kg", "oz", "lb", null) | `"g"`                                                                                                                                                 | —                   |
| `sourceNotes` | optional  | not nullable | string                             | `"Weights by configuration are recorded in sourceNotes because weight is scalar: Wi-Fi model 208 g / 7.3 oz; Wi-Fi + Ethernet model 214 g / 7.5 oz."` | —                   |

### `physical`

Schema form: object; additional properties: not allowed.

| Field        | Required? | Nullability  | Schema type                       | Example                                                                                                                                                                    | Constraints / notes |
| ------------ | --------- | ------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `weights`    | yes       | not nullable | array<object → measurement>       | `[]`                                                                                                                                                                       | —                   |
| `dimensions` | yes       | not nullable | array<object → measurement>       | `[]`                                                                                                                                                                       | —                   |
| `components` | yes       | not nullable | array<object → physicalComponent> | `[first element: {"id":"apple-tv-4k-body","displayName":"Apple TV 4K","dimensions":[{"value":31,"unit":"mm","qualifier":"height"},{"value":93,"unit":"mm","qualifier":"…]` | —                   |

### `accessoryReference`

Schema form: object; additional properties: not allowed.

| Field          | Required? | Nullability  | Schema type                                                                                                           | Example                             | Constraints / notes                 |
| -------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------- |
| `accessoryId`  | yes       | not nullable | string                                                                                                                | `"siri-remote"`                     | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$ |
| `displayName`  | yes       | not nullable | string                                                                                                                | `"Siri Remote"`                     | —                                   |
| `category`     | yes       | not nullable | enum ("Apple Pencil", "keyboard", "input", "spatial", "case", "cable", "adapter", "remote", "strap", "seal", "other") | `"remote"`                          | —                                   |
| `capabilities` | optional  | not nullable | array<string>                                                                                                         | `[first element: "Bluetooth 5.0"…]` | —                                   |

### `accessory`

Schema form: object; additional properties: not allowed.

| Field          | Required? | Nullability  | Schema type                                                                                                           | Example       | Constraints / notes                 |
| -------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| `id`           | yes       | not nullable | string                                                                                                                | `not emitted` | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$ |
| `displayName`  | yes       | not nullable | string                                                                                                                | `not emitted` | —                                   |
| `category`     | yes       | not nullable | enum ("Apple Pencil", "keyboard", "input", "spatial", "case", "cable", "adapter", "remote", "strap", "seal", "other") | `not emitted` | —                                   |
| `capabilities` | optional  | not nullable | array<string>                                                                                                         | `not emitted` | —                                   |

### `accessoryCategory`

Schema form: enum ("Apple Pencil", "keyboard", "input", "spatial", "case", "cable", "adapter", "remote", "strap", "seal", "other").

### `accessoryGroup`

Schema form: object; additional properties: not allowed.

| Field         | Required? | Nullability  | Schema type               | Example       | Constraints / notes                 |
| ------------- | --------- | ------------ | ------------------------- | ------------- | ----------------------------------- |
| `group`       | yes       | not nullable | string                    | `not emitted` | pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$ |
| `accessories` | yes       | not nullable | array<object → accessory> | `not emitted` | —                                   |

### `resistance`

Schema form: object; additional properties: not allowed.

| Field               | Required? | Nullability | Schema type     | Example | Constraints / notes                            |
| ------------------- | --------- | ----------- | --------------- | ------- | ---------------------------------------------- |
| `ipRating`          | yes       | nullable    | string or null  | `null`  | pattern: ^(IP[0-9]X?\|IP6X\|IP68)$\|^$\|^null$ |
| `waterDepthM`       | yes       | nullable    | number or null  | `null`  | minimum: 0                                     |
| `splashPressureAtm` | yes       | nullable    | number or null  | `null`  | minimum: 0                                     |
| `dustProtected`     | yes       | nullable    | boolean or null | `null`  | —                                              |
| `sweatResistant`    | yes       | nullable    | boolean or null | `null`  | —                                              |

### `software`

Schema form: object; additional properties: not allowed.

| Field                            | Required? | Nullability  | Schema type    | Example                                                                                                                                                                      | Constraints / notes |
| -------------------------------- | --------- | ------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `operatingSystem`                | yes       | not nullable | string         | `"tvOS"`                                                                                                                                                                     | —                   |
| `operatingSystemVersionAtLaunch` | yes       | nullable     | string or null | `null`                                                                                                                                                                       | —                   |
| `compatibleOperatingSystems`     | optional  | not nullable | array<string>  | `[]`                                                                                                                                                                         | —                   |
| `builtInApps`                    | yes       | not nullable | array<string>  | `[]`                                                                                                                                                                         | —                   |
| `sourceNotes`                    | optional  | not nullable | string         | `"The source does not render tvOS or an operating-system version; this family field is populated only to satisfy the shared contract and marked unresolved in sourceNotes."` | —                   |

### `configurationVariant`

Schema form: object; additional properties: not allowed.

| Field          | Required? | Nullability  | Schema type                                                                   | Example                                                           | Constraints / notes |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------- |
| `id`           | yes       | not nullable | string                                                                        | `"airpods-pro-3-chip-1"`                                          | —                   |
| `displayName`  | optional  | not nullable | string                                                                        | `"H2 headphone chip"`                                             | —                   |
| `colorIds`     | optional  | not nullable | array<string>                                                                 | `["lavender","sage","mist-blue","white","black"]`                 | —                   |
| `storageId`    | optional  | not nullable | string                                                                        | `"64gb"`                                                          | —                   |
| `memoryIds`    | optional  | not nullable | array<string>                                                                 | `not emitted`                                                     | —                   |
| `connectivity` | optional  | nullable     | enum ("Wi-Fi", "Wi-Fi + Cellular", "Wi-Fi + Ethernet", "wireless-only", null) | `"Wi-Fi"`                                                         | —                   |
| `caseSizeMm`   | optional  | nullable     | number or null                                                                | `not emitted`                                                     | minimum: 0          |
| `chipId`       | optional  | not nullable | string                                                                        | `"a15-bionic"`                                                    | —                   |
| `priceAud`     | optional  | nullable     | number or null                                                                | `null`                                                            | minimum: 0          |
| `sourceNotes`  | optional  | not nullable | string                                                                        | `"Exact capacity/configuration label from the Capacity section."` | —                   |

### `watchDetails`

Schema form: object; additional properties: not allowed.

| Field                     | Required? | Nullability  | Schema type    | Example                                        | Constraints / notes |
| ------------------------- | --------- | ------------ | -------------- | ---------------------------------------------- | ------------------- |
| `caseSizes`               | yes       | not nullable | array<string>  | `["46 mm","42 mm"]`                            | —                   |
| `alwaysOn`                | yes       | not nullable | boolean        | `true`                                         | —                   |
| `wideAngleDisplay`        | yes       | not nullable | boolean        | `true`                                         | —                   |
| `u1UwbChip`               | yes       | nullable     | string or null | `"Second-generation Ultra Wideband chip"`      | —                   |
| `otherWirelessChip`       | yes       | nullable     | string or null | `"W3 Apple wireless chip"`                     | —                   |
| `hasSpeaker`              | yes       | not nullable | boolean        | `true`                                         | —                   |
| `hasSiren`                | yes       | not nullable | boolean        | `false`                                        | —                   |
| `swimproofClassification` | yes       | nullable     | string or null | `"Swim, snorkel"`                              | —                   |
| `completeSummary`         | yes       | not nullable | array<string>  | `[first element: "Always-On Retina display"…]` | —                   |

### `overviewImage`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type | Example                                                                                                      | Constraints / notes |
| ----------- | --------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| `label`     | yes       | not nullable | string      | `"front"`                                                                                                    | —                   |
| `appleUrl`  | yes       | not nullable | string      | `"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqzzyvwxyu_large_2x.png"` | —                   |
| `localPath` | yes       | not nullable | string      | `"public/data/airpods/images/airpods-pro-3-white.png"`                                                       | —                   |
| `widthPx`   | yes       | not nullable | integer     | `504`                                                                                                        | minimum: 1          |
| `heightPx`  | yes       | not nullable | integer     | `438`                                                                                                        | minimum: 1          |

### `airPodsImage`

Schema form: object; additional properties: not allowed.

| Field       | Required? | Nullability  | Schema type | Example                                                                                                      | Constraints / notes |
| ----------- | --------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| `label`     | yes       | not nullable | string      | `"front"`                                                                                                    | —                   |
| `appleUrl`  | yes       | not nullable | string      | `"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqzzyvwxyu_large_2x.png"` | format: uri         |
| `localPath` | yes       | not nullable | string      | `"public/data/airpods/images/airpods-pro-3-white.png"`                                                       | —                   |
| `widthPx`   | yes       | not nullable | integer     | `504`                                                                                                        | minimum: 1          |
| `heightPx`  | yes       | not nullable | integer     | `438`                                                                                                        | minimum: 1          |

### `airPodsColor`

Schema form: object; additional properties: not allowed.

| Field    | Required? | Nullability  | Schema type                  | Example                                                                                                                                                                    | Constraints / notes |
| -------- | --------- | ------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `name`   | yes       | not nullable | string                       | `"White"`                                                                                                                                                                  | —                   |
| `swatch` | yes       | not nullable | string                       | `"#ffffff"`                                                                                                                                                                | —                   |
| `images` | yes       | not nullable | array<object → airPodsImage> | `[first element: {"label":"front","appleUrl":"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqzzyvwxyu_large_2x.png","localPath":"pu…]` | —                   |

## Top-level shape definitions

These two definitions are the branches selected by `productCollectionDiscriminator`; their fields were expanded in each category section above.

### `device`

Generic product shape for iPad, iPhone, Mac, Apple Watch, Apple TV, HomePod, and Vision records. Required fields are `id` and `name`; every other property is optional.

### `airPodsDevice`

AirPods-specific product shape. Required fields are `id`, `name`, `priceAud`, `colors`, `summary`, `formFactors`, `audioTechnologies`, `sensors`, `chips`, `microphones`, `controls`, `hearingHealth`, `liveTranslation`, `port`, `batteryAndCharging`, `ipRating`, `connectivity`, and `inTheBox`.

## Review focus

- Treat category applicability as a required review decision before changing the schema. The current universal schema permits more fields than each category should use.
- Keep semantically nonexistent features as `[]`, `null`, or omitted only where the category convention is intentional and documented in the category section.
- Do not infer a camera, IP rating, storage option, accessory, or battery from the presence of a shared schema field alone.

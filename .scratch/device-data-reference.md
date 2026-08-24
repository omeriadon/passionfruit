# Device data reference

This is the human-readable index for the canonical device contracts. The adjacent JSON Schema remains authoritative for validation.

## Contract decisions

- Each device category has an independent schema. There is no universal device shape and no cross-category interchangeability.
- Device records do not contain a device-level `family` discriminator. A nested chip `family` field describes processor lineage and is unrelated.
- Structured fields hold structured facts. Summary arrays and free-form specification lists are not part of any device contract.
- Arrays are present as arrays and use `[]` when no values are known. Arrays are never `null`.
- Boolean fields are `true` or `false`. Boolean fields are never `null`.
- Category-inapplicable fields are omitted from that category schema and data.
- iPad and iPhone are independent contracts even where field names currently overlap.
- Mac covers laptops and desktops. Its display and battery/power bundles represent applicability independently: desktops can have displays without batteries, and headless desktops can have neither.
- AirPods omit colours, use one `formFactor` enum, use typed audio-technology objects, retain case names as strings, and record microphones as a count.
- Apple TV omits colours and storage options. Storage belongs inside each hardware configuration, and `chip` is one object.

## Reading the tables

- Required means the key must exist. Optional means the key may be omitted.
- A type containing `null` explicitly permits `null`; no other field does.
- `object<name>` and `array<object<name>>` refer to the nested-object tables in the same category.
- Examples are compact values selected from the current canonical JSON. `—` means the schema permits a field that the current canonical records do not populate.

## AirPods

- Canonical data: `public/data/airpods/airpods.json`
- Schema: `public/data/airpods/airpods.schema.json`

### Device fields

| Field                | Presence | Type                                 | Example                                                                                  |
| -------------------- | -------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`                 | required | `string`                             | `"airpods-pro-3"`                                                                        |
| `name`               | required | `string`                             | `"AirPods Pro 3"`                                                                        |
| `priceAud`           | optional | `number`                             | `429`                                                                                    |
| `formFactor`         | required | `"in-ear"                            | "over-ear"`                                                                              | `"in-ear"` |
| `cases`              | required | `array<string>`                      | `["MagSafe Charging Case (USB-C)"]`                                                      |
| `physical`           | required | `object<physical>`                   | `{"earpieceWeight":{"value":5.55,"unit":"g"},"caseWeights":[{"name":"MagSafe Charging …` |
| `images`             | required | `array<object<image>>`               | `[{"label":"front","appleUrl":"https://www.apple.com/v/airpods/compare/i/images/overvi…` |
| `audioTechnologies`  | required | `array<object<audioTechnology>>`     | `[{"id":"active-noise-cancellation","name":"Active Noise Cancellation","category":"noi…` |
| `sensors`            | required | `array<object<namedFeature>>`        | `[{"id":"skin-detect-sensor","name":"Skin-detect sensor"},{"id":"case-detect-sensor","…` |
| `chips`              | required | `array<object<chip>>`                | `[{"id":"airpods-pro-3-chip-1","displayName":"H2 headphone chip"},{"id":"airpods-pro-3…` |
| `microphoneCount`    | required | `integer`                            | `2`                                                                                      |
| `controls`           | required | `array<object<namedFeature>>`        | `[{"id":"press-once-to-play-or-pause-media","name":"Press once to play or pause media"…` |
| `hearingHealth`      | required | `array<object<namedFeature>>`        | `[{"id":"hearing-test","name":"Hearing Test"},{"id":"hearing-aid","name":"Hearing Aid"…` |
| `liveTranslation`    | required | `array<object<namedFeature>>`        | `[{"id":"live-translation-for-communicating-across-languages","name":"Live Translation…` |
| `port`               | optional | `"USB-C"                             | "Lightning"`                                                                             | `"USB-C"`  |
| `batteryAndCharging` | required | `array<object<batteryClaim>>`        | `[{"id":"up-to-8-hours-of-listening-time-on-a-single-charge-with-active-noise-cancella…` |
| `ipRating`           | optional | `string`                             | `"Dust, sweat and water resistant (IP57)"`                                               |
| `connectivity`       | required | `array<object<connectivityFeature>>` | `[{"id":"bluetooth-5-3","technology":"Bluetooth","version":"5.3","sourceNotes":"Blueto…` |
| `inTheBox`           | required | `array<string>`                      | `["AirPods Pro 3"]`                                                                      |
| `sourceNotes`        | optional | `string`                             | `"Original colour entries were removed from the AirPods shape; source colours: White.\…` |

### Nested object fields

#### `measurement`

| Field       | Presence | Type     | Example     |
| ----------- | -------- | -------- | ----------- |
| `value`     | required | `number` | `5.55`      |
| `unit`      | required | `"g"     | "hours"     | "minutes" | "percent"` | `"g"` |
| `qualifier` | optional | `string` | `"example"` |

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"front"`                                                                                |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/airpods/compare/i/images/overview/airpods_pro_3_white__doiqz…` |
| `localPath` | required | `string`  | `"public/data/airpods/images/airpods-pro-3-white.png"`                                   |
| `widthPx`   | required | `integer` | `504`                                                                                    |
| `heightPx`  | required | `integer` | `438`                                                                                    |

#### `chip`

| Field         | Presence | Type     | Example                  |
| ------------- | -------- | -------- | ------------------------ |
| `id`          | required | `string` | `"airpods-pro-3-chip-1"` |
| `displayName` | required | `string` | `"H2 headphone chip"`    |
| `family`      | optional | `string` | `"example"`              |
| `sourceNotes` | optional | `string` | `"example"`              |

#### `audioTechnology`

| Field         | Presence | Type             | Example                       |
| ------------- | -------- | ---------------- | ----------------------------- |
| `id`          | required | `string`         | `"active-noise-cancellation"` |
| `name`        | required | `string`         | `"Active Noise Cancellation"` |
| `category`    | required | `"noise-control" | "audio-processing"            | "spatial-audio" | "driver" | "amplifier" | "connectivity" | "other"` | `"noise-control"` |
| `details`     | optional | `string`         | `"example"`                   |
| `sourceNotes` | optional | `string`         | `"example"`                   |

#### `namedFeature`

| Field         | Presence | Type      | Example                |
| ------------- | -------- | --------- | ---------------------- |
| `id`          | required | `string`  | `"skin-detect-sensor"` |
| `name`        | required | `string`  | `"Skin-detect sensor"` |
| `location`    | optional | `string`  | `"example"`            |
| `quantity`    | optional | `integer` | `1`                    |
| `details`     | optional | `string`  | `"example"`            |
| `sourceNotes` | optional | `string`  | `"example"`            |

#### `batteryClaim`

| Field         | Presence | Type              | Example                                                            |
| ------------- | -------- | ----------------- | ------------------------------------------------------------------ |
| `id`          | required | `string`          | `"5-minutes-in-the-case-provides-around-1-hour-of-listening-time"` |
| `kind`        | required | `"listening-time" | "case-listening-time"                                              | "fast-charge" | "charging-case" | "other"` | `"fast-charge"` |
| `hours`       | optional | `number`          | `1`                                                                |
| `minutes`     | optional | `number`          | `5`                                                                |
| `condition`   | optional | `string`          | `"example"`                                                        |
| `caseName`    | optional | `string`          | `"example"`                                                        |
| `connector`   | optional | `"USB-C"          | "Lightning"`                                                       | `"USB-C"`     |
| `details`     | optional | `string`          | `"5 minutes in the case provides around 1 hour of listening time"` |
| `sourceNotes` | optional | `string`          | `"example"`                                                        |

#### `connectivityFeature`

| Field         | Presence | Type     | Example            |
| ------------- | -------- | -------- | ------------------ |
| `id`          | required | `string` | `"bluetooth-5-3"`  |
| `technology`  | required | `string` | `"Bluetooth"`      |
| `version`     | optional | `string` | `"5.3"`            |
| `sourceNotes` | optional | `string` | `"Bluetooth® 5.3"` |

#### `caseWeight`

| Field    | Presence | Type                  | Example                           |
| -------- | -------- | --------------------- | --------------------------------- |
| `name`   | required | `string`              | `"MagSafe Charging Case (USB-C)"` |
| `weight` | required | `object<measurement>` | `{"value":43.99,"unit":"g"}`      |

#### `physical`

| Field            | Presence | Type                        | Example                                                                          |
| ---------------- | -------- | --------------------------- | -------------------------------------------------------------------------------- |
| `earpieceWeight` | required | `object<measurement>`       | `{"value":5.55,"unit":"g"}`                                                      |
| `caseWeights`    | required | `array<object<caseWeight>>` | `[{"name":"MagSafe Charging Case (USB-C)","weight":{"value":43.99,"unit":"g"}}]` |

## Apple TV

- Canonical data: `public/data/apple-tv/apple-tv.json`
- Schema: `public/data/apple-tv/apple-tv.schema.json`

### Device fields

| Field            | Presence | Type                           | Example                                                                                  |
| ---------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`             | required | `string`                       | `"apple-tv-4k"`                                                                          |
| `name`           | required | `string`                       | `"Apple TV 4K"`                                                                          |
| `releaseYear`    | required | `integer`                      | `2022`                                                                                   |
| `priceAud`       | optional | `number`                       | `0`                                                                                      |
| `configurations` | required | `array<object<configuration>>` | `[{"id":"apple-tv-4k-wifi-64gb","displayName":"64GB (Wi-Fi model)","storage":{"capacit…` |
| `chip`           | required | `object<chip>`                 | `{"id":"a15-bionic","displayName":"A15 Bionic chip","family":"A-series","sourceNotes":…` |
| `connectivity`   | required | `object<connectivity>`         | `{"ports":[{"id":"hdmi","kind":"HDMI","quantity":1,"sourceNotes":"Source says HDMI 2.1…` |
| `physical`       | required | `object<physical>`             | `{"weights":[],"dimensions":[],"components":[{"id":"apple-tv-4k-body","displayName":"A…` |
| `images`         | required | `array<object<image>>`         | `[{"label":"front","appleUrl":"https://www.apple.com/v/apple-tv-4k/ah/images/meta/appl…` |
| `accessories`    | required | `array<object<accessory>>`     | `[{"displayName":"Siri Remote","category":"remote","capabilities":["Bluetooth 5.0","IR…` |
| `sourceNotes`    | optional | `string`                       | `"Exact source: data/tmp/tv/tv2.html. Remote: Bluetooth® 5.0 wireless technology; IR t…` |

### Nested object fields

#### `measurement`

| Field       | Presence | Type     | Example    |
| ----------- | -------- | -------- | ---------- |
| `value`     | required | `number` | `31`       |
| `unit`      | required | `"mm"    | "g"`       | `"mm"` |
| `qualifier` | optional | `string` | `"height"` |

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"front"`                                                                                |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/apple-tv-4k/ah/images/meta/apple-tv-4k__efpszaiqoh2e_og.png?…` |
| `localPath` | required | `string`  | `"public/data/apple-tv/images/apple-tv-4k__efpszaiqoh2e_og.png"`                         |
| `widthPx`   | required | `integer` | `1200`                                                                                   |
| `heightPx`  | required | `integer` | `630`                                                                                    |

#### `chip`

| Field         | Presence | Type     | Example                                                                                  |
| ------------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string` | `"a15-bionic"`                                                                           |
| `displayName` | required | `string` | `"A15 Bionic chip"`                                                                      |
| `family`      | optional | `string` | `"A-series"`                                                                             |
| `sourceNotes` | optional | `string` | `"Source renders only \"A15 Bionic chip\". CPU total is represented as the minimum sch…` |

#### `storage`

| Field         | Presence | Type      | Example                                              |
| ------------- | -------- | --------- | ---------------------------------------------------- |
| `capacityGb`  | required | `integer` | `64`                                                 |
| `sourceNotes` | optional | `string`  | `"Rendered only as part of \"64GB (Wi-Fi model)\"."` |

#### `configurationConnectivity`

| Field              | Presence | Type      | Example              |
| ------------------ | -------- | --------- | -------------------- |
| `wifi`             | required | `boolean` | `true`               |
| `ethernet`         | required | `boolean` | `true`               |
| `ethernetStandard` | optional | `string`  | `"Gigabit Ethernet"` |
| `sourceNotes`      | optional | `string`  | `"example"`          |

#### `configuration`

| Field          | Presence | Type                                | Example                                                                                  |
| -------------- | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`           | required | `string`                            | `"apple-tv-4k-wifi-64gb"`                                                                |
| `displayName`  | required | `string`                            | `"64GB (Wi-Fi model)"`                                                                   |
| `storage`      | required | `object<storage>`                   | `{"capacityGb":64,"sourceNotes":"Rendered only as part of \"64GB (Wi-Fi model)\"."}`     |
| `connectivity` | required | `object<configurationConnectivity>` | `{"wifi":true,"ethernet":false}`                                                         |
| `priceAud`     | optional | `number`                            | `0`                                                                                      |
| `sourceNotes`  | optional | `string`                            | `"Exact capacity/configuration label from the Capacity section.\n\nLegacy configuratio…` |

#### `port`

| Field         | Presence | Type      | Example                                                                                  |
| ------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`  | `"hdmi"`                                                                                 |
| `kind`        | required | `string`  | `"HDMI"`                                                                                 |
| `quantity`    | required | `integer` | `1`                                                                                      |
| `standard`    | optional | `string`  | `"example"`                                                                              |
| `sourceNotes` | optional | `string`  | `"Source says HDMI 2.1; HDMI 2.1 cannot be represented in the shared port-standard enu…` |

#### `wireless`

| Field       | Presence | Type            | Example         |
| ----------- | -------- | --------------- | --------------- |
| `standards` | optional | `array<string>` | `[]`            |
| `version`   | optional | `string`        | `"example"`     |
| `mimo`      | optional | `string`        | `"example"`     |
| `supported` | optional | `boolean`       | `true`          |
| `purpose`   | optional | `string`        | `"IR receiver"` |

#### `connectivity`

| Field       | Presence | Type                  | Example                                                                                  |
| ----------- | -------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `ports`     | required | `array<object<port>>` | `[{"id":"hdmi","kind":"HDMI","quantity":1,"sourceNotes":"Source says HDMI 2.1; HDMI 2.…` |
| `wifi`      | optional | `object<wireless>`    | `{"standards":["Wi-Fi 6"],"mimo":"2x2 MIMO"}`                                            |
| `bluetooth` | optional | `object<wireless>`    | `{"standards":[],"version":"Bluetooth 5.0"}`                                             |
| `thread`    | optional | `object<wireless>`    | `{"standards":[],"supported":true}`                                                      |
| `infrared`  | optional | `object<wireless>`    | `{"standards":[],"supported":true,"purpose":"IR receiver"}`                              |

#### `physicalComponent`

| Field         | Presence | Type                         | Example                                                                                  |
| ------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`                     | `"siri-remote-body"`                                                                     |
| `displayName` | required | `string`                     | `"Siri Remote"`                                                                          |
| `dimensions`  | required | `array<object<measurement>>` | `[{"value":136,"unit":"mm","qualifier":"height"},{"value":35,"unit":"mm","qualifier":"…` |
| `weight`      | optional | `object<measurement>`        | `{"value":66,"unit":"g"}`                                                                |
| `sourceNotes` | optional | `string`                     | `"Legacy weight unit retained: g"`                                                       |

#### `physical`

| Field        | Presence | Type                               | Example                                                                                  |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `weights`    | required | `array<object<measurement>>`       | `[]`                                                                                     |
| `dimensions` | required | `array<object<measurement>>`       | `[]`                                                                                     |
| `components` | required | `array<object<physicalComponent>>` | `[{"id":"apple-tv-4k-body","displayName":"Apple TV 4K","dimensions":[{"value":31,"unit…` |

#### `accessory`

| Field          | Presence | Type            | Example                                                                                  |
| -------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `accessoryId`  | required | `string`        | `"siri-remote"`                                                                          |
| `displayName`  | required | `string`        | `"Siri Remote"`                                                                          |
| `category`     | required | `string`        | `"remote"`                                                                               |
| `capabilities` | optional | `array<string>` | `["Bluetooth 5.0","IR transmitter","USB-C connector for charging","Rechargeable batter…` |
| `sourceNotes`  | optional | `string`        | `"example"`                                                                              |

## Apple Watch

- Canonical data: `public/data/apple-watch/apple-watch.json`
- Schema: `public/data/apple-watch/apple-watch.schema.json`

### Device fields

| Field             | Presence | Type                           | Example                                                                                  |
| ----------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`              | required | `string`                       | `"apple-watch-series-11"`                                                                |
| `name`            | required | `string`                       | `"Apple Watch Series 11"`                                                                |
| `releaseYear`     | required | `integer`                      | `2025`                                                                                   |
| `priceAud`        | optional | `number`                       | `679`                                                                                    |
| `colors`          | required | `array<object<color>>`         | `[{"id":"rose-gold-aluminium","displayName":"Rose Gold Aluminium","swatch":"#eacfc8","…` |
| `configurations`  | required | `array<object<configuration>>` | `[]`                                                                                     |
| `chips`           | required | `array<object<chip>>`          | `[{"id":"s10-chip","displayName":"S10 chip","family":"Apple S-series","cpuCores":2,"ne…` |
| `displays`        | required | `array<object<display>>`       | `[{"id":"primary","technology":"Always-On Retina display","panelKind":"OLED","refreshR…` |
| `audio`           | required | `object<audio>`                | `{"speaker":true,"microphone":true,"speakerConfiguration":"Media playback","microphone…` |
| `batteryAndPower` | required | `object<batteryAndPower>`      | `{"hasBattery":true,"runtimeHours":[{"id":"normal","activity":"All-day battery life","…` |
| `connectivity`    | required | `object<connectivity>`         | `{"ports":[],"wifi":{"standards":["Wi-Fi 4"]},"bluetooth":{"version":"Bluetooth 5.3"},…` |
| `authentication`  | required | `object<authentication>`       | `{"methods":["passcode"],"primaryMethod":"passcode"}`                                    |
| `physical`        | required | `object<physical>`             | `{"weights":[{"value":37.8,"unit":"g","qualifier":"case variant"},{"value":36.9,"unit"…` |
| `resistance`      | required | `object<resistance>`           | `{"ipRating":"IP6X","waterDepthM":50,"dustProtected":true}`                              |
| `software`        | required | `object<software>`             | `{"operatingSystem":"watchOS","compatibleOperatingSystems":[],"builtInApps":[],"source…` |
| `watchDetails`    | required | `object<watchDetails>`         | `{"caseSizes":["46 mm","42 mm"],"alwaysOn":true,"wideAngleDisplay":true,"u1UwbChip":"S…` |
| `overviewImages`  | required | `array<object<image>>`         | `[{"label":"Model overview","appleUrl":"https://www.apple.com/v/watch/compare/ah/image…` |
| `sourceNotes`     | optional | `string`                       | `"Extracted from four usable Apple AU compare exports. Exact source text preserved in …` |

### Nested object fields

#### `measurement`

| Field       | Presence | Type     | Example          |
| ----------- | -------- | -------- | ---------------- |
| `value`     | required | `number` | `37.8`           |
| `unit`      | required | `"mm"    | "g"              | "hours" | "minutes" | "nits" | "hz"` | `"g"` |
| `qualifier` | optional | `string` | `"case variant"` |

#### `measurementRange`

| Field     | Presence | Type     | Example |
| --------- | -------- | -------- | ------- |
| `minimum` | required | `number` | `1`     |
| `maximum` | required | `number` | `60`    |
| `unit`    | required | `string` | `"hz"`  |

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"large 2x"`                                                                             |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/watch/compare/ah/images/overview/compare_watch_series_11_alu…` |
| `localPath` | required | `string`  | `"public/data/apple-watch/images/compare-watch-series-11-aluminum-rose-gold--teqtd20c3…` |
| `widthPx`   | required | `integer` | `500`                                                                                    |
| `heightPx`  | required | `integer` | `570`                                                                                    |

#### `color`

| Field         | Presence | Type                   | Example                                                                                  |
| ------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`               | `"rose-gold-aluminium"`                                                                  |
| `displayName` | required | `string`               | `"Rose Gold Aluminium"`                                                                  |
| `swatch`      | required | `string`               | `"#eacfc8"`                                                                              |
| `images`      | required | `array<object<image>>` | `[{"label":"large 2x","appleUrl":"https://www.apple.com/v/watch/compare/ah/images/over…` |

#### `chip`

| Field                 | Presence | Type      | Example                                                                                  |
| --------------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`                  | required | `string`  | `"s10-chip"`                                                                             |
| `displayName`         | required | `string`  | `"S10 chip"`                                                                             |
| `family`              | optional | `string`  | `"Apple S-series"`                                                                       |
| `cpuCores`            | optional | `integer` | `2`                                                                                      |
| `gpuCores`            | optional | `integer` | `1`                                                                                      |
| `neuralEngineCores`   | optional | `integer` | `4`                                                                                      |
| `memoryBandwidthGbps` | optional | `number`  | `0`                                                                                      |
| `sourceNotes`         | optional | `string`  | `"S10 chip with 64-bit dual-core processor\n\nLegacy chip detail retained verbatim: {\…` |

#### `configuration`

| Field         | Presence | Type      | Example                                                                                  |
| ------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`  | `"apple-watch-series-1-physical-evidence"`                                               |
| `displayName` | required | `string`  | `"Case dimensions and weights"`                                                          |
| `caseSize`    | optional | `string`  | `"example"`                                                                              |
| `cellular`    | optional | `boolean` | `false`                                                                                  |
| `gps`         | optional | `boolean` | `false`                                                                                  |
| `priceAud`    | optional | `number`  | `0`                                                                                      |
| `sourceNotes` | optional | `string`  | `"42 mm by 36.4 mm by 10.5 mm (42-mm) 30 grams; 38 mm by 33.3 mm by 10.5 mm (38-mm) 25…` |

#### `display`

| Field                         | Presence | Type                       | Example                                                                                  |
| ----------------------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                          | required | `string`                   | `"primary"`                                                                              |
| `technology`                  | required | `string`                   | `"Always-On Retina display"`                                                             |
| `panelKind`                   | optional | `string`                   | `"OLED"`                                                                                 |
| `sizeIn`                      | optional | `number`                   | `0`                                                                                      |
| `resolutionWidthPx`           | optional | `integer`                  | `1`                                                                                      |
| `resolutionHeightPx`          | optional | `integer`                  | `1`                                                                                      |
| `pixelsPerInch`               | optional | `number`                   | `0`                                                                                      |
| `refreshRateHz`               | optional | `number`                   | `0`                                                                                      |
| `refreshRateRange`            | optional | `object<measurementRange>` | `{"minimum":1,"maximum":60,"unit":"hz"}`                                                 |
| `sdrPeakBrightnessNits`       | optional | `number`                   | `2000`                                                                                   |
| `hdrPeakBrightnessNits`       | optional | `number`                   | `0`                                                                                      |
| `fullScreenHdrBrightnessNits` | optional | `number`                   | `0`                                                                                      |
| `minimumBrightnessNits`       | optional | `number`                   | `1`                                                                                      |
| `trueTone`                    | optional | `boolean`                  | `false`                                                                                  |
| `promotion`                   | optional | `boolean`                  | `false`                                                                                  |
| `alwaysOn`                    | optional | `boolean`                  | `true`                                                                                   |
| `wideColorP3`                 | optional | `boolean`                  | `false`                                                                                  |
| `laminated`                   | optional | `boolean`                  | `false`                                                                                  |
| `antireflective`              | optional | `boolean`                  | `false`                                                                                  |
| `nanoTextureOption`           | optional | `boolean`                  | `false`                                                                                  |
| `fingerprintResistantCoating` | optional | `boolean`                  | `false`                                                                                  |
| `hoverSupport`                | optional | `boolean`                  | `false`                                                                                  |
| `mirroring`                   | optional | `boolean`                  | `false`                                                                                  |
| `sourceNotes`                 | optional | `string`                   | `"Display material: Always-On Retina display; Display construction: Wide-angle OLED; D…` |

#### `runtime`

| Field         | Presence | Type     | Example                  |
| ------------- | -------- | -------- | ------------------------ |
| `id`          | required | `string` | `"normal"`               |
| `activity`    | required | `string` | `"All-day battery life"` |
| `hours`       | required | `number` | `24`                     |
| `sourceNotes` | optional | `string` | `"example"`              |

#### `fastCharge`

| Field     | Presence | Type     | Example |
| --------- | -------- | -------- | ------- |
| `minutes` | required | `number` | `30`    |
| `percent` | required | `number` | `80`    |

#### `charging`

| Field               | Presence | Type                 | Example                       |
| ------------------- | -------- | -------------------- | ----------------------------- |
| `portId`            | optional | `string`             | `"wireless"`                  |
| `wiredFastCharge`   | optional | `boolean`            | `true`                        |
| `wirelessCharging`  | optional | `boolean`            | `true`                        |
| `wirelessStandards` | optional | `array<string>`      | `["inductive"]`               |
| `fastCharge`        | optional | `object<fastCharge>` | `{"minutes":30,"percent":80}` |

#### `powerSupply`

| Field                     | Presence | Type                   | Example |
| ------------------------- | -------- | ---------------------- | ------- |
| `hasExternalPowerAdapter` | optional | `boolean`              | `false` |
| `outputVoltageV`          | optional | `number`               | `0`     |
| `outputCurrentA`          | optional | `number`               | `0`     |
| `outputPowerW`            | optional | `number`               | `0`     |
| `inputVoltageRangeV`      | optional | `object<voltageRange>` | —       |
| `frequencyHz`             | optional | `number`               | `0`     |
| `consumptionW`            | optional | `number`               | `0`     |

#### `voltageRange`

| Field     | Presence | Type     | Example |
| --------- | -------- | -------- | ------- |
| `minimum` | required | `number` | `1`     |
| `maximum` | required | `number` | `60`    |

#### `batteryAndPower`

| Field                | Presence | Type                     | Example                                                                                  |
| -------------------- | -------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `hasBattery`         | required | `boolean`                | `true`                                                                                   |
| `batteryCapacityMah` | optional | `number`                 | `0`                                                                                      |
| `batteryCapacityWhr` | optional | `number`                 | `0`                                                                                      |
| `runtimeHours`       | required | `array<object<runtime>>` | `[{"id":"normal","activity":"All-day battery life","hours":24},{"id":"low-power","acti…` |
| `charging`           | required | `object<charging>`       | `{"portId":"wireless","wiredFastCharge":true,"wirelessCharging":true,"wirelessStandard…` |
| `powerSupply`        | required | `object<powerSupply>`    | `{}`                                                                                     |

#### `port`

| Field         | Presence | Type      | Example     |
| ------------- | -------- | --------- | ----------- |
| `id`          | required | `string`  | `"example"` |
| `kind`        | required | `string`  | `"example"` |
| `quantity`    | required | `integer` | `1`         |
| `sourceNotes` | optional | `string`  | `"example"` |

#### `wireless`

| Field       | Presence | Type            | Example       |
| ----------- | -------- | --------------- | ------------- |
| `standards` | optional | `array<string>` | `["Wi-Fi 4"]` |
| `mimo`      | optional | `string`        | `"example"`   |

#### `bluetooth`

| Field     | Presence | Type     | Example           |
| --------- | -------- | -------- | ----------------- |
| `version` | required | `string` | `"Bluetooth 5.3"` |

#### `cellular`

| Field          | Presence | Type            | Example              |
| -------------- | -------- | --------------- | -------------------- |
| `technologies` | required | `array<string>` | `["LTE","5G sub-6"]` |

#### `uwb`

| Field  | Presence | Type     | Example                                   |
| ------ | -------- | -------- | ----------------------------------------- |
| `chip` | required | `string` | `"Second-generation Ultra Wideband chip"` |

#### `gps`

| Field                    | Presence | Type            | Example                                       |
| ------------------------ | -------- | --------------- | --------------------------------------------- |
| `present`                | required | `boolean`       | `true`                                        |
| `precisionDualFrequency` | required | `boolean`       | `false`                                       |
| `systems`                | required | `array<string>` | `["GPS","GLONASS","Galileo","QZSS","BeiDou"]` |

#### `connectivity`

| Field       | Presence | Type                  | Example                                                                                  |
| ----------- | -------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `ports`     | required | `array<object<port>>` | `[]`                                                                                     |
| `wifi`      | optional | `object<wireless>`    | `{"standards":["Wi-Fi 4"]}`                                                              |
| `bluetooth` | optional | `object<bluetooth>`   | `{"version":"Bluetooth 5.3"}`                                                            |
| `cellular`  | optional | `object<cellular>`    | `{"technologies":["LTE","5G sub-6"]}`                                                    |
| `uwb`       | optional | `object<uwb>`         | `{"chip":"Second-generation Ultra Wideband chip"}`                                       |
| `gps`       | optional | `object<gps>`         | `{"present":true,"precisionDualFrequency":false,"systems":["GPS","GLONASS","Galileo","…` |

#### `authentication`

| Field           | Presence | Type            | Example        |
| --------------- | -------- | --------------- | -------------- |
| `methods`       | required | `array<string>` | `["passcode"]` |
| `primaryMethod` | required | `string`        | `"passcode"`   |

#### `physicalComponent`

| Field         | Presence | Type                         | Example                                                                                  |
| ------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`                     | `"apple-watch-series-1-physical-evidence"`                                               |
| `displayName` | required | `string`                     | `"Case dimensions and weights"`                                                          |
| `dimensions`  | required | `array<object<measurement>>` | `[]`                                                                                     |
| `weight`      | optional | `object<measurement>`        | —                                                                                        |
| `sourceNotes` | optional | `string`                     | `"42 mm by 36.4 mm by 10.5 mm (42-mm) 30 grams; 38 mm by 33.3 mm by 10.5 mm (38-mm) 25…` |

#### `physical`

| Field        | Presence | Type                               | Example                                                                                  |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `weights`    | required | `array<object<measurement>>`       | `[{"value":37.8,"unit":"g","qualifier":"case variant"},{"value":36.9,"unit":"g","quali…` |
| `dimensions` | required | `array<object<measurement>>`       | `[{"value":46,"unit":"mm","qualifier":"case height"},{"value":39,"unit":"mm","qualifie…` |
| `components` | required | `array<object<physicalComponent>>` | `[]`                                                                                     |

#### `resistance`

| Field            | Presence | Type      | Example  |
| ---------------- | -------- | --------- | -------- |
| `ipRating`       | optional | `string`  | `"IP6X"` |
| `waterDepthM`    | optional | `number`  | `50`     |
| `dustProtected`  | optional | `boolean` | `true`   |
| `sweatResistant` | optional | `boolean` | `false`  |

#### `software`

| Field                            | Presence | Type            | Example                                                 |
| -------------------------------- | -------- | --------------- | ------------------------------------------------------- |
| `operatingSystem`                | required | `string`        | `"watchOS"`                                             |
| `operatingSystemVersionAtLaunch` | optional | `string`        | `"example"`                                             |
| `compatibleOperatingSystems`     | required | `array<string>` | `[]`                                                    |
| `builtInApps`                    | required | `array<string>` | `[]`                                                    |
| `sourceNotes`                    | optional | `string`        | `"Complete Summary retained verbatim as source facts."` |

#### `watchDetails`

| Field                     | Presence | Type            | Example                                   |
| ------------------------- | -------- | --------------- | ----------------------------------------- |
| `caseSizes`               | required | `array<string>` | `["46 mm","42 mm"]`                       |
| `alwaysOn`                | required | `boolean`       | `true`                                    |
| `wideAngleDisplay`        | required | `boolean`       | `true`                                    |
| `u1UwbChip`               | optional | `string`        | `"Second-generation Ultra Wideband chip"` |
| `otherWirelessChip`       | optional | `string`        | `"W3 Apple wireless chip"`                |
| `hasSpeaker`              | required | `boolean`       | `true`                                    |
| `hasSiren`                | required | `boolean`       | `false`                                   |
| `swimproofClassification` | required | `string`        | `"Swim, snorkel"`                         |

#### `audio`

| Field                     | Presence | Type      | Example            |
| ------------------------- | -------- | --------- | ------------------ |
| `speaker`                 | optional | `boolean` | `true`             |
| `microphone`              | optional | `boolean` | `true`             |
| `speakerConfiguration`    | optional | `string`  | `"Media playback"` |
| `microphoneConfiguration` | optional | `string`  | `"Microphone"`     |
| `siren`                   | optional | `boolean` | `false`            |

## HomePod

- Canonical data: `public/data/homepod/homepod.json`
- Schema: `public/data/homepod/homepod.schema.json`

### Device fields

| Field          | Presence | Type                       | Example                                                                                  |
| -------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `id`           | required | `string`                   | `"homepod-mini"`                                                                         |
| `name`         | required | `string`                   | `"HomePod mini"`                                                                         |
| `releaseYear`  | required | `integer`                  | `2020`                                                                                   |
| `priceAud`     | required | `number                    | null`                                                                                    | `null` |
| `colors`       | required | `array<object<color>>`     | `[{"id":"white","displayName":"White","swatch":{"kind":"css","value":"#00000000"},"ima…` |
| `chips`        | required | `array<object<chip>>`      | `[{"id":"ultra-wideband","displayName":"Ultra Wideband chip","family":"Ultra Wideband"…` |
| `audio`        | required | `object<audio>`            | `{"speaker":true,"microphone":true,"speakerConfiguration":"Full-range driver and dual …` |
| `power`        | required | `object<powerSupply>`      | `{"hasExternalPowerAdapter":true,"outputPowerW":20,"inputVoltageRangeV":{"minimum":100…` |
| `connectivity` | required | `object<connectivity>`     | `{"ports":[{"id":"power-adapter","kind":"power connector","quantity":1,"sourceNotes":"…` |
| `physical`     | required | `object<physical>`         | `{"weights":[{"value":345,"unit":"g"}],"dimensions":[{"value":84.3,"unit":"mm","qualif…` |
| `software`     | required | `object<software>`         | `{"operatingSystem":"HomePod Software","compatibleOperatingSystems":["iOS","iPadOS","m…` |
| `accessories`  | required | `array<object<accessory>>` | `[]`                                                                                     |
| `sourceNotes`  | optional | `string`                   | `"Remodeled from the supplied Apple specification HTML checkpoint. Controls, compatibi…` |

### Nested object fields

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"small"`                                                                                |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/homepod-mini/j/images/specs/hero_homepod_mini_white__byv5v65…` |
| `localPath` | required | `string`  | `"public/data/homepod/images/hero_homepod_mini_white__byv5v65oppg2_small.jpg"`           |
| `widthPx`   | required | `integer` | `230`                                                                                    |
| `heightPx`  | required | `integer` | `208`                                                                                    |

#### `color`

| Field           | Presence | Type                   | Example                                                                                  |
| --------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`               | `"white"`                                                                                |
| `displayName`   | required | `string`               | `"White"`                                                                                |
| `swatch`        | required | `object<swatch>`       | `{"kind":"css","value":"#00000000"}`                                                     |
| `images`        | required | `array<object<image>>` | `[{"label":"small","appleUrl":"https://www.apple.com/v/homepod-mini/j/images/specs/her…` |
| `colorPriceAud` | optional | `number`               | `0`                                                                                      |
| `sourceNotes`   | optional | `string`               | `"example"`                                                                              |

#### `cpuCores`

| Field         | Presence | Type      | Example |
| ------------- | -------- | --------- | ------- |
| `total`       | required | `integer` | `1`     |
| `performance` | optional | `integer` | `0`     |
| `efficiency`  | optional | `integer` | `0`     |

#### `chip`

| Field                | Presence | Type               | Example                                                                                  |
| -------------------- | -------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `id`                 | required | `string`           | `"ultra-wideband"`                                                                       |
| `displayName`        | required | `string`           | `"Ultra Wideband chip"`                                                                  |
| `family`             | optional | `string`           | `"Ultra Wideband"`                                                                       |
| `cpuCores`           | optional | `object<cpuCores>` | —                                                                                        |
| `neuralAccelerators` | optional | `boolean`          | `false`                                                                                  |
| `processNode`        | optional | `string`           | `"example"`                                                                              |
| `sourceNotes`        | optional | `string`           | `"Source identifies an Ultra Wideband chip for device proximity; implementation detail…` |

#### `audio`

| Field                     | Presence | Type            | Example                                                                                  |
| ------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `speaker`                 | required | `boolean`       | `true`                                                                                   |
| `microphone`              | required | `boolean`       | `true`                                                                                   |
| `speakerConfiguration`    | optional | `string`        | `"Full-range driver and dual passive radiators for deep bass and crisp high frequencie…` |
| `microphoneConfiguration` | optional | `string`        | `"Four-microphone design for far-field Siri"`                                            |
| `spatialAudio`            | required | `boolean`       | `false`                                                                                  |
| `formats`                 | required | `array<string>` | `["Apple Music","iTunes music purchases","iCloud Music Library with an Apple Music or …` |
| `sourceNotes`             | optional | `string`        | `"Audio sources are represented under formats because the shared contract has no dedic…` |

#### `powerSupply`

| Field                     | Presence | Type      | Example                                                         |
| ------------------------- | -------- | --------- | --------------------------------------------------------------- |
| `hasExternalPowerAdapter` | required | `boolean` | `true`                                                          |
| `outputVoltageV`          | optional | `number`  | `0`                                                             |
| `outputCurrentA`          | optional | `number`  | `0`                                                             |
| `outputPowerW`            | optional | `number`  | `20`                                                            |
| `inputVoltageRangeV`      | optional | `object`  | `{"minimum":100,"maximum":240}`                                 |
| `frequencyHz`             | optional | `number`  | `0`                                                             |
| `consumptionW`            | optional | `number`  | `0`                                                             |
| `sourceNotes`             | optional | `string`  | `"HomePod mini uses the supplied 20 W external power adapter."` |

#### `port`

| Field         | Presence | Type      | Example                                                            |
| ------------- | -------- | --------- | ------------------------------------------------------------------ |
| `id`          | required | `string`  | `"power-adapter"`                                                  |
| `kind`        | required | `string`  | `"power connector"`                                                |
| `quantity`    | optional | `integer` | `1`                                                                |
| `sourceNotes` | optional | `string`  | `"HomePod mini connects through its supplied 20 W power adapter."` |

#### `connectivity`

| Field                    | Presence | Type                  | Example                                                                                  |
| ------------------------ | -------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `ports`                  | required | `array<object<port>>` | `[{"id":"power-adapter","kind":"power connector","quantity":1,"sourceNotes":"HomePod m…` |
| `wifi`                   | required | `object`              | `{"standards":["Wi-Fi 4"]}`                                                              |
| `bluetooth`              | required | `object`              | `{"version":"Bluetooth 5.0"}`                                                            |
| `uwb`                    | required | `object`              | `{"chip":"Ultra Wideband chip","secondGeneration":false}`                                |
| `thread`                 | required | `object`              | `{"supported":true}`                                                                     |
| `infrared`               | required | `object`              | `{"present":false}`                                                                      |
| `nearFieldCommunication` | required | `object`              | `{"present":false}`                                                                      |
| `gps`                    | required | `object`              | `{"present":false}`                                                                      |

#### `measurement`

| Field       | Presence | Type     | Example    |
| ----------- | -------- | -------- | ---------- |
| `value`     | required | `number` | `84.3`     |
| `unit`      | required | `string` | `"mm"`     |
| `qualifier` | optional | `string` | `"height"` |

#### `physicalComponent`

| Field         | Presence | Type                         | Example                                                                                  |
| ------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`                     | `"homepod-mini-speaker"`                                                                 |
| `displayName` | required | `string`                     | `"HomePod mini"`                                                                         |
| `dimensions`  | required | `array<object<measurement>>` | `[{"value":84.3,"unit":"mm","qualifier":"height"},{"value":97.9,"unit":"mm","qualifier…` |
| `weight`      | required | `number`                     | `345`                                                                                    |
| `weightUnit`  | required | `string`                     | `"g"`                                                                                    |
| `sourceNotes` | optional | `string`                     | `"example"`                                                                              |

#### `physical`

| Field        | Presence | Type                               | Example                                                                                  |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `weights`    | required | `array<object<measurement>>`       | `[{"value":345,"unit":"g"}]`                                                             |
| `dimensions` | required | `array<object<measurement>>`       | `[{"value":84.3,"unit":"mm","qualifier":"height"},{"value":97.9,"unit":"mm","qualifier…` |
| `components` | required | `array<object<physicalComponent>>` | `[{"id":"homepod-mini-speaker","displayName":"HomePod mini","dimensions":[{"value":84.…` |

#### `software`

| Field                        | Presence | Type            | Example                                     |
| ---------------------------- | -------- | --------------- | ------------------------------------------- |
| `operatingSystem`            | required | `string`        | `"HomePod Software"`                        |
| `compatibleOperatingSystems` | required | `array<string>` | `["iOS","iPadOS","macOS","tvOS","watchOS"]` |
| `builtInApps`                | required | `array<string>` | `[]`                                        |
| `sourceNotes`                | optional | `string`        | `"example"`                                 |

#### `accessory`

| Field          | Presence | Type            | Example     |
| -------------- | -------- | --------------- | ----------- |
| `accessoryId`  | optional | `string`        | `"example"` |
| `displayName`  | required | `string`        | `"example"` |
| `category`     | required | `string`        | `"example"` |
| `capabilities` | optional | `array<string>` | `[]`        |

## iPad

- Canonical data: `public/data/ipad/ipad.json`
- Schema: `public/data/ipad/ipad.schema.json`

### Device fields

| Field             | Presence | Type                                    | Example                                                                                  |
| ----------------- | -------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`              | required | `string`                                | `"ipad-mini-2"`                                                                          |
| `name`            | required | `string`                                | `"iPad mini 2"`                                                                          |
| `releaseYear`     | required | `integer`                               | `2013`                                                                                   |
| `priceAud`        | required | `number                                 | null`                                                                                    | `null` |
| `colors`          | required | `array<object<ipadColor>>`              | `[]`                                                                                     |
| `configurations`  | required | `array<object<ipadConfiguration>>`      | `[]`                                                                                     |
| `storageOptions`  | required | `array<object<ipadStorageOption>>`      | `[{"id":"ipad-mini-2-storage-16","capacityValue":16,"capacityUnit":"GB","sourceNotes":…` |
| `chips`           | required | `array<object<ipadChip>>`               | `[{"id":"ipad-mini-2-chip","displayName":"A7 chip","family":"A7","cpuCores":{"total":1…` |
| `displays`        | required | `array<object<ipadDisplay>>`            | `[{"id":"ipad-mini-2-display","technology":"Retina display","panelKind":"LED-backlit L…` |
| `cameras`         | required | `array<object<ipadCamera>>`             | `[{"id":"ipad-mini-2-rear-camera","role":"rear-wide","displayName":"5MP Wide camera","…` |
| `audio`           | required | `object<ipadAudio>`                     | `{"speaker":true,"microphone":true,"speakerConfiguration":"Stereo speakers","microphon…` |
| `batteryAndPower` | required | `object<ipadBatteryAndPower>`           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours"…` |
| `connectivity`    | required | `object<ipadConnectivity>`              | `{"ports":[{"id":"ipad-mini-2-port-lightning","kind":"Lightning","standard":"USB 2","q…` |
| `authentication`  | required | `object<ipadAuthentication>`            | `{"methods":["Touch ID"],"primaryMethod":"Touch ID"}`                                    |
| `physical`        | required | `object<ipadPhysical>`                  | `{"weights":[],"dimensions":[],"components":[{"id":"ipad-mini-2-physical-evidence","di…` |
| `resistance`      | required | `object<ipadResistance>`                | `{"ipRating":"","waterDepthM":null,"splashPressureAtm":null,"dustProtected":false,"swe…` |
| `software`        | required | `object<ipadSoftware>`                  | `{"operatingSystem":"iPadOS","operatingSystemVersionAtLaunch":null,"compatibleOperatin…` |
| `accessories`     | required | `array<object<ipadAccessoryReference>>` | `[]`                                                                                     |
| `sourceNotes`     | required | `string`                                | `"Extracted from supplied Apple AU compare hidden catalogue rows for iPad mini 2. Pric…` |
| `memoryOptions`   | required | `array<object<ipadMemoryOption>>`       | `[]`                                                                                     |
| `overviewImages`  | optional | `array<object<ipadOverviewImage>>`      | `[]`                                                                                     |

### Nested object fields

#### `ipadColor`

| Field           | Presence | Type                       | Example                                                                                  |
| --------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`                   | `"ipad-pro-11-m5-spaceblack"`                                                            |
| `displayName`   | required | `string`                   | `"Space Black"`                                                                          |
| `swatch`        | required | `object<ipadSwatch>`       | `{"kind":"css","value":"#2e2c2e"}`                                                       |
| `images`        | required | `array<object<ipadImage>>` | `[{"label":"front","appleUrl":"https://www.apple.com/v/ipad/compare/al/images/overview…` |
| `colorPriceAud` | optional | `number`                   | `0`                                                                                      |
| `sourceNotes`   | optional | `string`                   | `"example"`                                                                              |

#### `ipadImage`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"front"`                                                                                |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/ipad/compare/al/images/overview/ipad_pro_11_m4_spaceblack__e…` |
| `localPath` | required | `string`  | `"public/data/ipad/images/ipad_pro_11_m4_spaceblack__eoez1rzzqmye_large.jpg"`            |
| `widthPx`   | required | `integer` | `255`                                                                                    |
| `heightPx`  | required | `integer` | `292`                                                                                    |

#### `ipadStorageOption`

| Field               | Presence | Type            | Example                                                                                  |
| ------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `id`                | required | `string`        | `"ipad-pro-13-m5-storage-1"`                                                             |
| `displayName`       | optional | `string`        | `"example"`                                                                              |
| `capacityValue`     | required | `integer`       | `256`                                                                                    |
| `capacityUnit`      | required | `"GB"           | "TB"`                                                                                    | `"GB"` |
| `priceDeltaAud`     | optional | `number`        | `0`                                                                                      |
| `availableColorIds` | optional | `array<string>` | `[]`                                                                                     |
| `sourceNotes`       | optional | `string`        | `"Storage capacity from supplied Apple AU compare capacity rows 5Dw7wGbF, jRL02Uld, aC…` |

#### `ipadMemoryOption`

| Field           | Presence | Type       | Example                                                                                  |
| --------------- | -------- | ---------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`   | `"ipad-pro-13-m5-memory-12"`                                                             |
| `displayName`   | optional | `string`   | `"example"`                                                                              |
| `capacityValue` | required | `integer`  | `12`                                                                                     |
| `capacityUnit`  | required | `"GB"      | "TB"`                                                                                    | `"GB"`       |
| `kind`          | required | `"unified" | "DRAM"                                                                                   | "NAND cache" | "other"` | `"unified"` |
| `speedMbps`     | optional | `integer`  | `0`                                                                                      |
| `speedUnit`     | optional | `object`   | —                                                                                        |
| `configuration` | optional | `string`   | `"example"`                                                                              |
| `sourceNotes`   | optional | `string`   | `"Unified-memory option from supplied Apple AU compare chip-detail row duGQ9SXF; stora…` |

#### `ipadChip`

| Field                     | Presence | Type                             | Example                                                                                  |
| ------------------------- | -------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                      | required | `string`                         | `"ipad-pro-13-m5-chip"`                                                                  |
| `displayName`             | required | `string`                         | `"Apple M5 chip"`                                                                        |
| `family`                  | required | `string`                         | `"M5"`                                                                                   |
| `cpuCores`                | required | `object<ipadCpuCores>`           | `{"total":9,"performance":null,"efficiency":null}`                                       |
| `gpuCores`                | required | `integer                         | null`                                                                                    | `null` |
| `neuralEngineCores`       | required | `integer                         | null`                                                                                    | `null` |
| `memoryBandwidthGbps`     | required | `number                          | null`                                                                                    | `null` |
| `cpuCoreConfiguration`    | optional | `string`                         | `"example"`                                                                              |
| `neuralAccelerators`      | optional | `boolean`                        | `false`                                                                                  |
| `hardwareRayTracing`      | optional | `boolean`                        | `false`                                                                                  |
| `mediaEngines`            | optional | `array<object<ipadMediaEngine>>` | `[]`                                                                                     |
| `processNode`             | optional | `string`                         | `"example"`                                                                              |
| `transistorCountBillions` | optional | `number                          | null`                                                                                    | `null` |
| `sourceNotes`             | optional | `string`                         | `"Source compare export names the chip but this pass did not parse detailed core rows …` |

#### `ipadDisplay`

| Field                         | Presence | Type                           | Example                                                                                  |
| ----------------------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`                          | required | `string`                       | `"ipad-mini-2-display"`                                                                  |
| `technology`                  | required | `string`                       | `"Retina display"`                                                                       |
| `panelKind`                   | optional | `"LCD"                         | "LED-backlit LCD"                                                                        | "OLED" | "tandem OLED" | "micro-OLED" | "other" | null` | `"LED-backlit LCD"` |
| `sizeIn`                      | required | `number                        | null`                                                                                    | `7.9`  |
| `resolutionWidthPx`           | required | `integer                       | null`                                                                                    | `2048` |
| `resolutionHeightPx`          | required | `integer                       | null`                                                                                    | `1536` |
| `pixelsPerInch`               | required | `number                        | null`                                                                                    | `326`  |
| `refreshRateHz`               | optional | `number                        | null`                                                                                    | `null` |
| `refreshRateRange`            | optional | `object<ipadMeasurementRange>` | —                                                                                        |
| `sdrPeakBrightnessNits`       | optional | `number                        | null`                                                                                    | `400`  |
| `hdrPeakBrightnessNits`       | optional | `number                        | null`                                                                                    | `null` |
| `fullScreenHdrBrightnessNits` | optional | `number                        | null`                                                                                    | `null` |
| `minimumBrightnessNits`       | optional | `number                        | null`                                                                                    | `null` |
| `trueTone`                    | optional | `boolean`                      | `false`                                                                                  |
| `promotion`                   | optional | `boolean`                      | `false`                                                                                  |
| `alwaysOn`                    | optional | `boolean`                      | `false`                                                                                  |
| `wideColorP3`                 | optional | `boolean`                      | `false`                                                                                  |
| `laminated`                   | optional | `boolean`                      | `false`                                                                                  |
| `antireflective`              | optional | `boolean`                      | `false`                                                                                  |
| `nanoTextureOption`           | optional | `boolean`                      | `false`                                                                                  |
| `fingerprintResistantCoating` | optional | `boolean`                      | `true`                                                                                   |
| `hoverSupport`                | optional | `boolean`                      | `false`                                                                                  |
| `mirroring`                   | optional | `boolean`                      | `false`                                                                                  |
| `sourceNotes`                 | optional | `string`                       | `"Rows zilUHVeV, K26NQmiL, gPPXAntM, cZ6t-gCX, c-NlFHqp, and 9TIIVvNz; fingerprint-res…` |

#### `ipadCamera`

| Field                        | Presence | Type         | Example                                                                                  |
| ---------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| `id`                         | required | `string`     | `"ipad-pro-12-9-6th-gen-front-camera"`                                                   |
| `role`                       | required | `"rear-wide" | "rear-ultrawide"                                                                         | "rear-telephoto" | "front" | "FaceTime" | "spatial" | "input-accessory" | "other"` | `"front"` |
| `displayName`                | required | `string`     | `"TrueDepth camera with Ultra Wide camera"`                                              |
| `megapixels`                 | required | `number      | null`                                                                                    | `null`           |
| `opticalZoomMultiplier`      | optional | `number      | null`                                                                                    | `null`           |
| `apertureFNumber`            | optional | `number      | null`                                                                                    | `null`           |
| `sensorShiftOis`             | optional | `boolean`    | `false`                                                                                  |
| `proRAW`                     | optional | `boolean`    | `false`                                                                                  |
| `spatialCapture`             | optional | `boolean`    | `false`                                                                                  |
| `macro`                      | optional | `boolean`    | `false`                                                                                  |
| `centerStage`                | optional | `boolean`    | `false`                                                                                  |
| `trueDepthSystem`            | optional | `boolean`    | `false`                                                                                  |
| `videoMaxResolutionWidthPx`  | optional | `integer     | null`                                                                                    | `null`           |
| `videoMaxResolutionHeightPx` | optional | `integer     | null`                                                                                    | `null`           |
| `videoMaxFrameRateHz`        | optional | `number      | null`                                                                                    | `null`           |
| `proRes`                     | optional | `boolean`    | `false`                                                                                  |
| `lidar`                      | optional | `boolean`    | `false`                                                                                  |
| `sourceNotes`                | optional | `string`     | `"Source display text does not state megapixels; camera presence and Apple display nam…` |

#### `ipadAudio`

| Field                     | Presence | Type            | Example                             |
| ------------------------- | -------- | --------------- | ----------------------------------- |
| `speaker`                 | required | `boolean`       | `true`                              |
| `microphone`              | required | `boolean`       | `true`                              |
| `speakerConfiguration`    | optional | `string`        | `"Four-speaker audio"`              |
| `microphoneConfiguration` | optional | `string`        | `"Four studio-quality microphones"` |
| `siren`                   | optional | `boolean`       | `false`                             |
| `spatialAudio`            | optional | `boolean`       | `false`                             |
| `adaptiveAudio`           | optional | `boolean`       | `false`                             |
| `activeNoiseCancellation` | optional | `boolean`       | `false`                             |
| `transparency`            | optional | `boolean`       | `false`                             |
| `formats`                 | optional | `array<string>` | `[]`                                |
| `sourceNotes`             | optional | `string`        | `"example"`                         |

#### `ipadBatteryAndPower`

| Field                | Presence | Type                                | Example                                                                                  |
| -------------------- | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `hasBattery`         | required | `boolean`                           | `true`                                                                                   |
| `batteryCapacityMah` | required | `number                             | null`                                                                                    | `null` |
| `batteryCapacityWhr` | required | `number                             | null`                                                                                    | `null` |
| `runtimeHours`       | required | `array<object<ipadBatteryRuntime>>` | `[{"id":"ipad-pro-13-m5-runtime-wifi","activity":"Surfing the web or watching video","…` |
| `charging`           | required | `object<ipadCharging>`              | `{"portId":"ipad-pro-13-m5-port-usb-c","wiredFastCharge":false,"wirelessCharging":fals…` |
| `powerSupply`        | required | `object<ipadPowerSupply>`           | `{"hasExternalPowerAdapter":false,"outputVoltageV":null,"outputCurrentA":null,"outputP…` |

#### `ipadConnectivity`

| Field                    | Presence | Type                                | Example                                                                                  |
| ------------------------ | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `ports`                  | required | `array<object<ipadPort>>`           | `[{"id":"ipad-pro-13-m5-port-usb-c","kind":"USB-C","supportsDisplayOut":true,"maxPower…` |
| `wifi`                   | required | `object<ipadWifi>                   | null`                                                                                    | `{"standards":[]}`                                     |
| `bluetooth`              | required | `object<ipadBluetooth>              | null`                                                                                    | `{"version":"Bluetooth 6.0"}`                          |
| `cellular`               | required | `object<ipadCellular>               | null`                                                                                    | `{"technologies":["5G sub-6","LTE"],"eSIMOnly":false}` |
| `uwb`                    | required | `object<ipadUwb>                    | null`                                                                                    | `null`                                                 |
| `thread`                 | required | `object<ipadThread>                 | null`                                                                                    | `null`                                                 |
| `infrared`               | required | `object<ipadInfrared>               | null`                                                                                    | `null`                                                 |
| `nearFieldCommunication` | required | `object<ipadNearFieldCommunication> | null`                                                                                    | `null`                                                 |
| `gps`                    | required | `object<ipadGps>                    | null`                                                                                    | `null`                                                 |

#### `ipadAuthentication`

| Field           | Presence | Type             | Example     |
| --------------- | -------- | ---------------- | ----------- |
| `methods`       | required | `array<"Face ID" | "Touch ID"  | "Optic ID"    | "passcode" | "password" | "none">`       | `["Face ID"]` |
| `primaryMethod` | required | `"Face ID"       | "Touch ID"  | "Optic ID"    | "passcode" | "password" | "none"`        | `"Face ID"`   |
| `placement`     | optional | `"top button"    | "keyboard"  | "side button" | "other"    | null`      | `"top button"` |
| `sourceNotes`   | optional | `string`         | `"example"` |

#### `ipadPhysical`

| Field        | Presence | Type                                   | Example |
| ------------ | -------- | -------------------------------------- | ------- |
| `weights`    | required | `array<object<ipadMeasurement>>`       | `[]`    |
| `dimensions` | required | `array<object<ipadMeasurement>>`       | `[]`    |
| `components` | required | `array<object<ipadPhysicalComponent>>` | `[]`    |

#### `ipadResistance`

| Field               | Presence | Type      | Example |
| ------------------- | -------- | --------- | ------- |
| `ipRating`          | required | `string   | null`   | `null` |
| `waterDepthM`       | required | `number   | null`   | `null` |
| `splashPressureAtm` | required | `number   | null`   | `null` |
| `dustProtected`     | required | `boolean` | `false` |
| `sweatResistant`    | required | `boolean` | `false` |

#### `ipadSoftware`

| Field                            | Presence | Type            | Example     |
| -------------------------------- | -------- | --------------- | ----------- |
| `operatingSystem`                | required | `string`        | `"iPadOS"`  |
| `operatingSystemVersionAtLaunch` | required | `string         | null`       | `null` |
| `compatibleOperatingSystems`     | optional | `array<string>` | `[]`        |
| `builtInApps`                    | required | `array<string>` | `[]`        |
| `sourceNotes`                    | optional | `string`        | `"example"` |

#### `ipadOverviewImage`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"front"`                                                                                |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/ipad/compare/al/images/overview/ipad_pro_11_m4_spaceblack__e…` |
| `localPath` | required | `string`  | `"public/data/ipad/images/ipad_pro_11_m4_spaceblack__eoez1rzzqmye_large.jpg"`            |
| `widthPx`   | required | `integer` | `255`                                                                                    |
| `heightPx`  | required | `integer` | `292`                                                                                    |

#### `ipadCpuCores`

| Field         | Presence | Type      | Example |
| ------------- | -------- | --------- | ------- |
| `total`       | required | `integer` | `9`     |
| `performance` | required | `integer  | null`   | `null` |
| `efficiency`  | required | `integer  | null`   | `null` |

#### `ipadMediaEngine`

| Field         | Presence | Type                  | Example        |
| ------------- | -------- | --------------------- | -------------- |
| `id`          | required | `string`              | `"example"`    |
| `displayName` | required | `string`              | `"example"`    |
| `kinds`       | required | `array<"video-decode" | "video-encode" | "ProRes encode-decode" | "image signal" | "AV1 decode" | "other">` | `[]` |

#### `ipadMeasurementRange`

| Field       | Presence | Type     | Example     |
| ----------- | -------- | -------- | ----------- |
| `minimum`   | required | `number` | `0`         |
| `maximum`   | required | `number` | `0`         |
| `unit`      | required | `"mm"    | "cm"        | "m" | "in" | "g" | "kg" | "oz" | "lb" | "nits" | "hz" | "w" | "v" | "a" | "mAh" | "Whr" | "hours" | "minutes" | "percent" | "GB" | "TB" | "Mbps" | "Gbps" | "dB SPL" | "atm"` | `"mm"` |
| `qualifier` | optional | `string` | `"example"` |

#### `ipadBatteryRuntime`

| Field       | Presence | Type     | Example                               |
| ----------- | -------- | -------- | ------------------------------------- |
| `id`        | required | `string` | `"ipad-pro-13-m5-runtime-wifi"`       |
| `activity`  | required | `string` | `"Surfing the web or watching video"` |
| `hours`     | required | `number  | null`                                 | `10`      |
| `qualifier` | optional | `string` | `"example"`                           |
| `network`   | optional | `"Wi-Fi" | "cellular"                            | "offline" | null` | `"Wi-Fi"` |

#### `ipadCharging`

| Field                        | Presence | Type             | Example |
| ---------------------------- | -------- | ---------------- | ------- |
| `portId`                     | required | `string          | null`   | `"ipad-pro-13-m5-port-usb-c"` |
| `wiredFastCharge`            | required | `boolean`        | `false` |
| `wirelessCharging`           | required | `boolean`        | `false` |
| `wirelessStandards`          | required | `array<"MagSafe" | "Qi"    | "Qi2"                         | "inductive" | "other">` | `[]` |
| `fastChargeMinutesToPercent` | required | `null            | object` | `null`                        |
| `adapterPowerW`              | required | `number          | null`   | `null`                        |

#### `ipadPowerSupply`

| Field                     | Presence | Type      | Example |
| ------------------------- | -------- | --------- | ------- |
| `hasExternalPowerAdapter` | required | `boolean` | `false` |
| `outputVoltageV`          | required | `number   | null`   | `null` |
| `outputCurrentA`          | required | `number   | null`   | `null` |
| `outputPowerW`            | required | `number   | null`   | `null` |
| `inputVoltageRangeV`      | required | `null     | object` | `null` |
| `frequencyHz`             | required | `number   | null`   | `null` |
| `consumptionW`            | required | `number   | null`   | `null` |

#### `ipadPort`

| Field                | Presence | Type      | Example                                                                                  |
| -------------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`                 | required | `string`  | `"ipad-pro-13-m5-port-usb-c"`                                                            |
| `kind`               | required | `"USB-C"  | "Thunderbolt 4"                                                                          | "Thunderbolt 5" | "Lightning"     | "HDMI"          | "Ethernet RJ45"  | "IR receiver" | "power connector" | "3.5 mm audio jack" | "Smart Connector" | "proprietary"` | `"USB-C"` |
| `standard`           | optional | `"USB 2"  | "USB 3.2 Gen 1"                                                                          | "USB 4"         | "Thunderbolt 3" | "Thunderbolt 4" | "Thunderbolt 5"` | `"USB 4"`     |
| `quantity`           | optional | `integer` | `1`                                                                                      |
| `supportsDisplayOut` | optional | `boolean` | `true`                                                                                   |
| `maxPowerW`          | optional | `number   | null`                                                                                    | `null`          |
| `sourceNotes`        | optional | `string`  | `"Source wording is Thunderbolt/USB 4. USB 4 is retained as the explicit non-exclusive…` |

#### `ipadWifi`

| Field                  | Presence | Type             | Example     |
| ---------------------- | -------- | ---------------- | ----------- |
| `standards`            | required | `array<"Wi-Fi 4" | "Wi-Fi 5"   | "Wi-Fi 6" | "Wi-Fi 6E" | "Wi-Fi 7" | "Wi-Fi 8">` | `[]` |
| `chip`                 | optional | `string`         | `"example"` |
| `MIMO`                 | optional | `string`         | `"example"` |
| `simultaneousDualBand` | optional | `boolean`        | `false`     |

#### `ipadBluetooth`

| Field     | Presence | Type             | Example         |
| --------- | -------- | ---------------- | --------------- |
| `version` | required | `"Bluetooth 4.0" | "Bluetooth 4.2" | "Bluetooth 5.0" | "Bluetooth 5.3" | "Bluetooth 5.4" | "Bluetooth 6.0"` | `"Bluetooth 6.0"` |

#### `ipadCellular`

| Field          | Presence | Type            | Example    |
| -------------- | -------- | --------------- | ---------- |
| `technologies` | required | `array<"LTE"    | "5G sub-6" | "5G mmWave">` | `["5G sub-6","LTE"]` |
| `bands`        | optional | `array<string>` | `[]`       |
| `eSIMOnly`     | optional | `boolean`       | `false`    |

#### `ipadUwb`

| Field              | Presence | Type      | Example     |
| ------------------ | -------- | --------- | ----------- |
| `chip`             | required | `string`  | `"example"` |
| `secondGeneration` | optional | `boolean` | `false`     |

#### `ipadThread`

| Field       | Presence | Type        | Example         |
| ----------- | -------- | ----------- | --------------- |
| `supported` | required | `boolean`   | `false`         |
| `role`      | optional | `"endpoint" | "border-router" | "both" | null` | `"endpoint"` |

#### `ipadInfrared`

| Field     | Presence | Type      | Example |
| --------- | -------- | --------- | ------- |
| `present` | required | `boolean` | `false` |
| `purpose` | required | `string   | null`   | `null` |

#### `ipadNearFieldCommunication`

| Field                  | Presence | Type      | Example |
| ---------------------- | -------- | --------- | ------- |
| `present`              | required | `boolean` | `true`  |
| `readWriteMode`        | optional | `boolean` | `false` |
| `backgroundTagReading` | optional | `boolean` | `false` |

#### `ipadGps`

| Field                    | Presence | Type         | Example   |
| ------------------------ | -------- | ------------ | --------- |
| `present`                | required | `boolean`    | `true`    |
| `precisionDualFrequency` | optional | `boolean`    | `false`   |
| `systems`                | optional | `array<"GPS" | "GLONASS" | "Galileo" | "QZSS" | "BeiDou" | "NavIC">` | `[]` |

#### `ipadMeasurement`

| Field       | Presence | Type     | Example    |
| ----------- | -------- | -------- | ---------- |
| `value`     | required | `number  | null`      | `200` |
| `unit`      | required | `"mm"    | "cm"       | "m"   | "in" | "g" | "kg" | "oz" | "lb" | "nits" | "hz" | "w" | "v" | "a" | "mAh" | "Whr" | "hours" | "minutes" | "percent" | "GB" | "TB" | "Mbps" | "Gbps" | "dB SPL" | "atm"` | `"mm"` |
| `qualifier` | optional | `string` | `"Height"` |

#### `ipadPhysicalComponent`

| Field         | Presence | Type                             | Example                                                                                  |
| ------------- | -------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`                         | `"ipad-mini-2-physical-evidence"`                                                        |
| `displayName` | required | `string`                         | `"Dimensions and weight"`                                                                |
| `dimensions`  | required | `array<object<ipadMeasurement>>` | `[{"value":200,"unit":"mm","qualifier":"Height"},{"value":134.7,"unit":"mm","qualifier…` |
| `weight`      | required | `number                          | null`                                                                                    | `331` |
| `weightUnit`  | optional | `"g"                             | "kg"                                                                                     | "oz"  | "lb" | null` | `"g"` |
| `sourceNotes` | optional | `string`                         | `"Wi-Fi model dimensions and weight from rows X0k04FTz through 7UGa6ctX."`               |

#### `ipadConfiguration`

| Field          | Presence | Type            | Example                                                                                  |
| -------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `id`           | required | `string`        | `"ipad-pro-12-9-6th-gen-front-camera"`                                                   |
| `displayName`  | optional | `string`        | `"TrueDepth camera with Ultra Wide camera"`                                              |
| `colorIds`     | optional | `array<string>` | `[]`                                                                                     |
| `storageId`    | optional | `string`        | `"example"`                                                                              |
| `memoryIds`    | optional | `array<string>` | `[]`                                                                                     |
| `connectivity` | optional | `"Wi-Fi"        | "Wi-Fi + Cellular"                                                                       | "Wi-Fi + Ethernet" | "wireless-only"` | `"Wi-Fi"` |
| `chipId`       | optional | `string`        | `"example"`                                                                              |
| `priceAud`     | optional | `number         | null`                                                                                    | `null`             |
| `sourceNotes`  | optional | `string`        | `"Source display text does not state megapixels; camera presence and Apple display nam…` |

#### `ipadAccessoryReference`

| Field          | Presence | Type            | Example          |
| -------------- | -------- | --------------- | ---------------- |
| `accessoryId`  | required | `string`        | `"example"`      |
| `displayName`  | required | `string`        | `"example"`      |
| `category`     | required | `"Apple Pencil" | "Magic Keyboard" | "keyboard" | "input" | "case" | "cable" | "adapter" | "other"` | `"Apple Pencil"` |
| `capabilities` | optional | `array<string>` | `[]`             |

## iPhone

- Canonical data: `public/data/iphone/iphone.json`
- Schema: `public/data/iphone/iphone.schema.json`

### Device fields

| Field             | Presence | Type                                      | Example                                                                                  |
| ----------------- | -------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`              | required | `string`                                  | `"iphone-7"`                                                                             |
| `name`            | required | `string`                                  | `"iPhone 7"`                                                                             |
| `releaseYear`     | required | `integer`                                 | `2016`                                                                                   |
| `priceAud`        | required | `number                                   | null`                                                                                    | `null` |
| `colors`          | required | `array<object<iphoneColor>>`              | `[]`                                                                                     |
| `configurations`  | required | `array<object<iphoneConfiguration>>`      | `[]`                                                                                     |
| `storageOptions`  | required | `array<object<iphoneStorageOption>>`      | `[{"id":"iphone-7-storage-1","displayName":"128GB","capacityValue":128,"capacityUnit":…` |
| `chips`           | required | `array<object<iphoneChip>>`               | `[{"id":"iphone-7-chip","displayName":"A10 Fusion chip","family":"A10 Fusion","cpuCore…` |
| `displays`        | required | `array<object<iphoneDisplay>>`            | `[{"id":"iphone-7-display","technology":"Retina HD display","panelKind":"LCD","sizeIn"…` |
| `cameras`         | required | `array<object<iphoneCamera>>`             | `[{"id":"iphone-7-rear-camera","role":"rear-wide","displayName":"Single camera","megap…` |
| `audio`           | required | `object<iphoneAudio>`                     | `{"speaker":true,"microphone":true}`                                                     |
| `batteryAndPower` | required | `object<iphoneBatteryAndPower>`           | `{"hasBattery":true,"batteryCapacityMah":null,"batteryCapacityWhr":null,"runtimeHours"…` |
| `connectivity`    | required | `object<iphoneConnectivity>`              | `{"ports":[{"id":"iphone-7-lightning-port","kind":"Lightning","standard":"USB 2"}],"wi…` |
| `authentication`  | required | `object<iphoneAuthentication>`            | `{"methods":["Touch ID","passcode"],"primaryMethod":"Touch ID"}`                         |
| `physical`        | required | `object<iphonePhysical>`                  | `{"weights":[],"dimensions":[],"components":[{"id":"iphone-7-physical-frame","displayN…` |
| `resistance`      | required | `object<iphoneResistance>`                | `{"ipRating":"","waterDepthM":1,"splashPressureAtm":null,"dustProtected":false,"sweatR…` |
| `software`        | required | `object<iphoneSoftware>`                  | `{"operatingSystem":"iOS","operatingSystemVersionAtLaunch":null,"builtInApps":[]}`       |
| `accessories`     | required | `array<object<iphoneAccessoryReference>>` | `[]`                                                                                     |
| `sourceNotes`     | required | `string`                                  | `"Extracted from supplied Apple AU compare hidden catalogue. Prices, colours, swatches…` |
| `memoryOptions`   | optional | `array<object<iphoneMemoryOption>>`       | `[]`                                                                                     |
| `overviewImages`  | optional | `array<object<iphoneOverviewImage>>`      | `[]`                                                                                     |

### Nested object fields

#### `iphoneColor`

| Field           | Presence | Type                         | Example                                                                                  |
| --------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`                     | `"lavender"`                                                                             |
| `displayName`   | required | `string`                     | `"Lavender"`                                                                             |
| `swatch`        | required | `object<iphoneSwatch>`       | `{"kind":"image","url":"https://www.apple.com/v/iphone/compare/al/images/overview/comp…` |
| `images`        | required | `array<object<iphoneImage>>` | `[{"label":"iPhone 17 Lavender","appleUrl":"https://www.apple.com/v/iphone/compare/al/…` |
| `colorPriceAud` | optional | `number`                     | `0`                                                                                      |
| `sourceNotes`   | optional | `string`                     | `"Swatch represented by the exact staged colour image; supplied HTML exposed no CSS co…` |

#### `iphoneImage`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"iPhone 17 Lavender"`                                                                   |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/iphone/compare/al/images/overview/compare_iphone17_lavender_…` |
| `localPath` | required | `string`  | `"public/data/iphone/images/e4b2cc704fcab120-compare_iphone17_lavender__etuerbkei0ya_s…` |
| `widthPx`   | required | `integer` | `290`                                                                                    |
| `heightPx`  | required | `integer` | `362`                                                                                    |

#### `iphoneStorageOption`

| Field               | Presence | Type            | Example     |
| ------------------- | -------- | --------------- | ----------- |
| `id`                | required | `string`        | `"256gb"`   |
| `displayName`       | optional | `string`        | `"256GB"`   |
| `capacityValue`     | required | `integer`       | `256`       |
| `capacityUnit`      | required | `"GB"           | "TB"`       | `"GB"` |
| `priceDeltaAud`     | optional | `number`        | `0`         |
| `availableColorIds` | optional | `array<string>` | `[]`        |
| `sourceNotes`       | optional | `string`        | `"example"` |

#### `iphoneMemoryOption`

| Field           | Presence | Type       | Example     |
| --------------- | -------- | ---------- | ----------- |
| `id`            | required | `string`   | `"example"` |
| `displayName`   | optional | `string`   | `"example"` |
| `capacityValue` | required | `integer`  | `1`         |
| `capacityUnit`  | required | `"GB"      | "TB"`       | `"GB"`       |
| `kind`          | required | `"unified" | "DRAM"      | "NAND cache" | "other"` | `"unified"` |
| `speedMbps`     | optional | `integer`  | `0`         |
| `speedUnit`     | optional | `object`   | —           |
| `configuration` | optional | `string`   | `"example"` |
| `sourceNotes`   | optional | `string`   | `"example"` |

#### `iphoneChip`

| Field                     | Presence | Type                               | Example                                                  |
| ------------------------- | -------- | ---------------------------------- | -------------------------------------------------------- |
| `id`                      | required | `string`                           | `"a19"`                                                  |
| `displayName`             | required | `string`                           | `"A19 chip"`                                             |
| `family`                  | required | `string`                           | `"A19"`                                                  |
| `cpuCores`                | required | `object<iphoneCpuCores>`           | `{"total":6,"performance":2,"efficiency":4}`             |
| `gpuCores`                | required | `integer                           | null`                                                    | `5`    |
| `neuralEngineCores`       | required | `integer                           | null`                                                    | `16`   |
| `memoryBandwidthGbps`     | required | `number                            | null`                                                    | `null` |
| `cpuCoreConfiguration`    | optional | `string`                           | `"6-core CPU with 2 performance and 4 efficiency cores"` |
| `neuralAccelerators`      | optional | `boolean`                          | `true`                                                   |
| `hardwareRayTracing`      | optional | `boolean`                          | `true`                                                   |
| `mediaEngines`            | optional | `array<object<iphoneMediaEngine>>` | `[]`                                                     |
| `processNode`             | optional | `string`                           | `"example"`                                              |
| `transistorCountBillions` | optional | `number                            | null`                                                    | `null` |
| `sourceNotes`             | optional | `string`                           | `"example"`                                              |

#### `iphoneDisplay`

| Field                         | Presence | Type                             | Example                                                                                  |
| ----------------------------- | -------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                          | required | `string`                         | `"primary-display"`                                                                      |
| `technology`                  | required | `string`                         | `"Super Retina XDR display"`                                                             |
| `panelKind`                   | optional | `"LCD"                           | "LED-backlit LCD"                                                                        | "OLED" | "tandem OLED" | "micro-OLED" | "other" | null` | `null` |
| `sizeIn`                      | required | `number                          | null`                                                                                    | `6.3`  |
| `resolutionWidthPx`           | required | `integer                         | null`                                                                                    | `2622` |
| `resolutionHeightPx`          | required | `integer                         | null`                                                                                    | `1206` |
| `pixelsPerInch`               | required | `number                          | null`                                                                                    | `460`  |
| `refreshRateHz`               | optional | `number                          | null`                                                                                    | `120`  |
| `refreshRateRange`            | optional | `object<iphoneMeasurementRange>` | —                                                                                        |
| `sdrPeakBrightnessNits`       | optional | `number                          | null`                                                                                    | `1000` |
| `hdrPeakBrightnessNits`       | optional | `number                          | null`                                                                                    | `1600` |
| `fullScreenHdrBrightnessNits` | optional | `number                          | null`                                                                                    | `3000` |
| `minimumBrightnessNits`       | optional | `number                          | null`                                                                                    | `1`    |
| `trueTone`                    | optional | `boolean`                        | `true`                                                                                   |
| `promotion`                   | optional | `boolean`                        | `true`                                                                                   |
| `alwaysOn`                    | optional | `boolean`                        | `true`                                                                                   |
| `wideColorP3`                 | optional | `boolean`                        | `true`                                                                                   |
| `laminated`                   | optional | `boolean`                        | `false`                                                                                  |
| `antireflective`              | optional | `boolean`                        | `false`                                                                                  |
| `nanoTextureOption`           | optional | `boolean`                        | `false`                                                                                  |
| `fingerprintResistantCoating` | optional | `boolean`                        | `false`                                                                                  |
| `hoverSupport`                | optional | `boolean`                        | `false`                                                                                  |
| `mirroring`                   | optional | `boolean`                        | `false`                                                                                  |
| `sourceNotes`                 | optional | `string`                         | `"Exact Display section lines retained in source evidence; unsupported typed facts are…` |

#### `iphoneCamera`

| Field                        | Presence | Type         | Example              |
| ---------------------------- | -------- | ------------ | -------------------- |
| `id`                         | required | `string`     | `"rear-1"`           |
| `role`                       | required | `"rear-wide" | "rear-ultrawide"     | "rear-telephoto" | "front" | "FaceTime" | "spatial" | "input-accessory" | "other"` | `"rear-wide"` |
| `displayName`                | required | `string`     | `"48MP Fusion Main"` |
| `megapixels`                 | required | `number      | null`                | `48`             |
| `opticalZoomMultiplier`      | optional | `number      | null`                | `1`              |
| `apertureFNumber`            | optional | `number      | null`                | `null`           |
| `sensorShiftOis`             | optional | `boolean`    | `true`               |
| `proRAW`                     | optional | `boolean`    | `true`               |
| `spatialCapture`             | optional | `boolean`    | `false`              |
| `macro`                      | optional | `boolean`    | `true`               |
| `centerStage`                | optional | `boolean`    | `false`              |
| `trueDepthSystem`            | optional | `boolean`    | `false`              |
| `videoMaxResolutionWidthPx`  | optional | `integer     | null`                | `null`           |
| `videoMaxResolutionHeightPx` | optional | `integer     | null`                | `null`           |
| `videoMaxFrameRateHz`        | optional | `number      | null`                | `null`           |
| `proRes`                     | optional | `boolean`    | `false`              |
| `lidar`                      | optional | `boolean`    | `true`               |
| `sourceNotes`                | optional | `string`     | `"example"`          |

#### `iphoneAudio`

| Field                     | Presence | Type            | Example                                                                                  |
| ------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `speaker`                 | required | `boolean`       | `true`                                                                                   |
| `microphone`              | required | `boolean`       | `true`                                                                                   |
| `speakerConfiguration`    | optional | `string`        | `"example"`                                                                              |
| `microphoneConfiguration` | optional | `string`        | `"example"`                                                                              |
| `siren`                   | optional | `boolean`       | `false`                                                                                  |
| `spatialAudio`            | optional | `boolean`       | `false`                                                                                  |
| `adaptiveAudio`           | optional | `boolean`       | `false`                                                                                  |
| `activeNoiseCancellation` | optional | `boolean`       | `false`                                                                                  |
| `transparency`            | optional | `boolean`       | `false`                                                                                  |
| `formats`                 | optional | `array<string>` | `[]`                                                                                     |
| `sourceNotes`             | optional | `string`        | `"Speaker and microphone presence established by iPhone product type; detailed configu…` |

#### `iphoneBatteryAndPower`

| Field                | Presence | Type                                  | Example                                                                                  |
| -------------------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `hasBattery`         | required | `boolean`                             | `true`                                                                                   |
| `batteryCapacityMah` | required | `number                               | null`                                                                                    | `null` |
| `batteryCapacityWhr` | required | `number                               | null`                                                                                    | `null` |
| `runtimeHours`       | required | `array<object<iphoneBatteryRuntime>>` | `[{"id":"video-playback","activity":"Video playback","hours":30},{"id":"video-playback…` |
| `charging`           | required | `object<iphoneCharging>`              | `{"portId":"USB-C","wiredFastCharge":true,"wirelessCharging":true,"wirelessStandards":…` |
| `powerSupply`        | required | `object<iphonePowerSupply>`           | `{"hasExternalPowerAdapter":false,"outputVoltageV":null,"outputCurrentA":null,"outputP…` |

#### `iphoneConnectivity`

| Field                    | Presence | Type                                  | Example                                                                                  |
| ------------------------ | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `ports`                  | required | `array<object<iphonePort>>`           | `[{"id":"usb-c","kind":"USB-C","standard":"USB 2","quantity":1,"supportsDisplayOut":tr…` |
| `wifi`                   | required | `object<iphoneWifi>                   | null`                                                                                    | `null` |
| `bluetooth`              | required | `object<iphoneBluetooth>              | null`                                                                                    | `null` |
| `cellular`               | required | `object<iphoneCellular>               | null`                                                                                    | `null` |
| `uwb`                    | required | `object<iphoneUwb>                    | null`                                                                                    | `null` |
| `thread`                 | required | `object<iphoneThread>                 | null`                                                                                    | `null` |
| `infrared`               | required | `object<iphoneInfrared>               | null`                                                                                    | `null` |
| `nearFieldCommunication` | required | `object<iphoneNearFieldCommunication> | null`                                                                                    | `null` |
| `gps`                    | required | `object<iphoneGps>                    | null`                                                                                    | `null` |

#### `iphoneAuthentication`

| Field           | Presence | Type             | Example                                               |
| --------------- | -------- | ---------------- | ----------------------------------------------------- |
| `methods`       | required | `array<"Face ID" | "Touch ID"                                            | "Optic ID"    | "passcode" | "password" | "none">` | `["Face ID","passcode"]` |
| `primaryMethod` | required | `"Face ID"       | "Touch ID"                                            | "Optic ID"    | "passcode" | "password" | "none"`  | `"Face ID"`              |
| `placement`     | optional | `"top button"    | "keyboard"                                            | "side button" | "other"    | null`      | `null`   |
| `sourceNotes`   | optional | `string`         | `"Exact authentication section establishes Face ID."` |

#### `iphonePhysical`

| Field        | Presence | Type                                     | Example                      |
| ------------ | -------- | ---------------------------------------- | ---------------------------- |
| `weights`    | required | `array<object<iphoneMeasurement>>`       | `[{"value":177,"unit":"g"}]` |
| `dimensions` | required | `array<object<iphoneMeasurement>>`       | `[]`                         |
| `components` | required | `array<object<iphonePhysicalComponent>>` | `[]`                         |

#### `iphoneResistance`

| Field               | Presence | Type      | Example |
| ------------------- | -------- | --------- | ------- |
| `ipRating`          | required | `string   | null`   | `"IP68"` |
| `waterDepthM`       | required | `number   | null`   | `6`      |
| `splashPressureAtm` | required | `number   | null`   | `null`   |
| `dustProtected`     | required | `boolean` | `true`  |
| `sweatResistant`    | required | `boolean` | `false` |

#### `iphoneSoftware`

| Field                            | Presence | Type            | Example                                                                                  |
| -------------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `operatingSystem`                | required | `string`        | `"iOS"`                                                                                  |
| `operatingSystemVersionAtLaunch` | required | `string         | null`                                                                                    | `null` |
| `compatibleOperatingSystems`     | optional | `array<string>` | `[]`                                                                                     |
| `builtInApps`                    | required | `array<string>` | `[]`                                                                                     |
| `sourceNotes`                    | optional | `string`        | `"Supplied compare HTML does not state launch iOS version or built-in application inve…` |

#### `iphoneOverviewImage`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"iPhone 17 Lavender"`                                                                   |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/iphone/compare/al/images/overview/compare_iphone17_lavender_…` |
| `localPath` | required | `string`  | `"public/data/iphone/images/e4b2cc704fcab120-compare_iphone17_lavender__etuerbkei0ya_s…` |
| `widthPx`   | required | `integer` | `290`                                                                                    |
| `heightPx`  | required | `integer` | `362`                                                                                    |

#### `iphoneCpuCores`

| Field         | Presence | Type      | Example |
| ------------- | -------- | --------- | ------- |
| `total`       | required | `integer` | `6`     |
| `performance` | required | `integer  | null`   | `2` |
| `efficiency`  | required | `integer  | null`   | `4` |

#### `iphoneMediaEngine`

| Field         | Presence | Type                  | Example        |
| ------------- | -------- | --------------------- | -------------- |
| `id`          | required | `string`              | `"example"`    |
| `displayName` | required | `string`              | `"example"`    |
| `kinds`       | required | `array<"video-decode" | "video-encode" | "ProRes encode-decode" | "image signal" | "AV1 decode" | "other">` | `[]` |

#### `iphoneMeasurementRange`

| Field       | Presence | Type     | Example     |
| ----------- | -------- | -------- | ----------- |
| `minimum`   | required | `number` | `0`         |
| `maximum`   | required | `number` | `0`         |
| `unit`      | required | `"mm"    | "cm"        | "m" | "in" | "g" | "kg" | "oz" | "lb" | "nits" | "hz" | "w" | "v" | "a" | "mAh" | "Whr" | "hours" | "minutes" | "percent" | "GB" | "TB" | "Mbps" | "Gbps" | "dB SPL" | "atm"` | `"mm"` |
| `qualifier` | optional | `string` | `"example"` |

#### `iphoneBatteryRuntime`

| Field       | Presence | Type     | Example            |
| ----------- | -------- | -------- | ------------------ |
| `id`        | required | `string` | `"video-playback"` |
| `activity`  | required | `string` | `"Video playback"` |
| `hours`     | required | `number  | null`              | `30`      |
| `qualifier` | optional | `string` | `"example"`        |
| `network`   | optional | `"Wi-Fi" | "cellular"         | "offline" | null` | `"Wi-Fi"` |

#### `iphoneCharging`

| Field                        | Presence | Type             | Example |
| ---------------------------- | -------- | ---------------- | ------- |
| `portId`                     | required | `string          | null`   | `"USB-C"`                     |
| `wiredFastCharge`            | required | `boolean`        | `true`  |
| `wirelessCharging`           | required | `boolean`        | `true`  |
| `wirelessStandards`          | required | `array<"MagSafe" | "Qi"    | "Qi2"                         | "inductive" | "other">` | `["MagSafe","Qi2"]` |
| `fastChargeMinutesToPercent` | required | `null            | object` | `{"percent":50,"minutes":20}` |
| `adapterPowerW`              | required | `number          | null`   | `40`                          |

#### `iphonePowerSupply`

| Field                     | Presence | Type      | Example |
| ------------------------- | -------- | --------- | ------- |
| `hasExternalPowerAdapter` | required | `boolean` | `false` |
| `outputVoltageV`          | required | `number   | null`   | `null` |
| `outputCurrentA`          | required | `number   | null`   | `null` |
| `outputPowerW`            | required | `number   | null`   | `null` |
| `inputVoltageRangeV`      | required | `null     | object` | `null` |
| `frequencyHz`             | required | `number   | null`   | `null` |
| `consumptionW`            | required | `number   | null`   | `null` |

#### `iphonePort`

| Field                | Presence | Type      | Example         |
| -------------------- | -------- | --------- | --------------- |
| `id`                 | required | `string`  | `"usb-c"`       |
| `kind`               | required | `"USB-C"  | "Thunderbolt 4" | "Thunderbolt 5" | "Lightning"     | "HDMI"          | "Ethernet RJ45"  | "IR receiver" | "power connector" | "3.5 mm audio jack" | "Smart Connector" | "proprietary"` | `"USB-C"` |
| `standard`           | optional | `"USB 2"  | "USB 3.2 Gen 1" | "USB 4"         | "Thunderbolt 3" | "Thunderbolt 4" | "Thunderbolt 5"` | `"USB 2"`     |
| `quantity`           | optional | `integer` | `1`             |
| `supportsDisplayOut` | optional | `boolean` | `true`          |
| `maxPowerW`          | optional | `number   | null`           | `null`          |
| `sourceNotes`        | optional | `string`  | `"example"`     |

#### `iphoneWifi`

| Field                  | Presence | Type             | Example     |
| ---------------------- | -------- | ---------------- | ----------- |
| `standards`            | required | `array<"Wi-Fi 4" | "Wi-Fi 5"   | "Wi-Fi 6" | "Wi-Fi 6E" | "Wi-Fi 7" | "Wi-Fi 8">` | `["Wi-Fi 5"]` |
| `chip`                 | optional | `string`         | `"example"` |
| `MIMO`                 | optional | `string`         | `"example"` |
| `simultaneousDualBand` | optional | `boolean`        | `false`     |

#### `iphoneBluetooth`

| Field     | Presence | Type             | Example         |
| --------- | -------- | ---------------- | --------------- |
| `version` | required | `"Bluetooth 4.0" | "Bluetooth 4.2" | "Bluetooth 5.0" | "Bluetooth 5.3" | "Bluetooth 5.4" | "Bluetooth 6.0"` | `"Bluetooth 4.2"` |

#### `iphoneCellular`

| Field          | Presence | Type            | Example    |
| -------------- | -------- | --------------- | ---------- |
| `technologies` | required | `array<"LTE"    | "5G sub-6" | "5G mmWave">` | `[]` |
| `bands`        | optional | `array<string>` | `[]`       |
| `eSIMOnly`     | optional | `boolean`       | `false`    |

#### `iphoneUwb`

| Field              | Presence | Type      | Example                         |
| ------------------ | -------- | --------- | ------------------------------- |
| `chip`             | required | `string`  | `"Apple Ultra Wideband chip19"` |
| `secondGeneration` | optional | `boolean` | `false`                         |

#### `iphoneThread`

| Field       | Presence | Type        | Example         |
| ----------- | -------- | ----------- | --------------- |
| `supported` | required | `boolean`   | `false`         |
| `role`      | optional | `"endpoint" | "border-router" | "both" | null` | `"endpoint"` |

#### `iphoneInfrared`

| Field     | Presence | Type      | Example |
| --------- | -------- | --------- | ------- |
| `present` | required | `boolean` | `false` |
| `purpose` | required | `string   | null`   | `null` |

#### `iphoneNearFieldCommunication`

| Field                  | Presence | Type      | Example |
| ---------------------- | -------- | --------- | ------- |
| `present`              | required | `boolean` | `true`  |
| `readWriteMode`        | optional | `boolean` | `false` |
| `backgroundTagReading` | optional | `boolean` | `false` |

#### `iphoneGps`

| Field                    | Presence | Type         | Example   |
| ------------------------ | -------- | ------------ | --------- |
| `present`                | required | `boolean`    | `true`    |
| `precisionDualFrequency` | optional | `boolean`    | `false`   |
| `systems`                | optional | `array<"GPS" | "GLONASS" | "Galileo" | "QZSS" | "BeiDou" | "NavIC">` | `["GPS"]` |

#### `iphoneMeasurement`

| Field       | Presence | Type     | Example     |
| ----------- | -------- | -------- | ----------- |
| `value`     | required | `number  | null`       | `177` |
| `unit`      | required | `"mm"    | "cm"        | "m"   | "in" | "g" | "kg" | "oz" | "lb" | "nits" | "hz" | "w" | "v" | "a" | "mAh" | "Whr" | "hours" | "minutes" | "percent" | "GB" | "TB" | "Mbps" | "Gbps" | "dB SPL" | "atm"` | `"g"` |
| `qualifier` | optional | `string` | `"example"` |

#### `iphonePhysicalComponent`

| Field         | Presence | Type                               | Example                     |
| ------------- | -------- | ---------------------------------- | --------------------------- |
| `id`          | required | `string`                           | `"iphone-7-physical-frame"` |
| `displayName` | required | `string`                           | `"Aluminium frame"`         |
| `dimensions`  | required | `array<object<iphoneMeasurement>>` | `[]`                        |
| `weight`      | required | `number                            | null`                       | `null` |
| `weightUnit`  | optional | `"g"                               | "kg"                        | "oz"   | "lb" | null` | `"g"` |
| `sourceNotes` | optional | `string`                           | `"example"`                 |

#### `iphoneConfiguration`

| Field          | Presence | Type            | Example                                           |
| -------------- | -------- | --------------- | ------------------------------------------------- |
| `id`           | required | `string`        | `"256gb-configuration"`                           |
| `displayName`  | optional | `string`        | `"iPhone 17 256GB"`                               |
| `colorIds`     | optional | `array<string>` | `["lavender","sage","mist-blue","white","black"]` |
| `storageId`    | optional | `string`        | `"256gb"`                                         |
| `memoryIds`    | optional | `array<string>` | `[]`                                              |
| `connectivity` | optional | `"Wi-Fi"        | "Wi-Fi + Cellular"                                | "Wi-Fi + Ethernet" | "wireless-only"` | `"Wi-Fi"` |
| `chipId`       | optional | `string`        | `"example"`                                       |
| `priceAud`     | optional | `number         | null`                                             | `1399`             |
| `sourceNotes`  | optional | `string`        | `"example"`                                       |

#### `iphoneAccessoryReference`

| Field          | Presence | Type            | Example     |
| -------------- | -------- | --------------- | ----------- |
| `accessoryId`  | required | `string`        | `"example"` |
| `displayName`  | required | `string`        | `"example"` |
| `category`     | required | `"MagSafe"      | "case"      | "cable" | "adapter" | "other"` | `"MagSafe"` |
| `capabilities` | optional | `array<string>` | `[]`        |

## Mac

- Canonical data: `public/data/mac/mac.json`
- Schema: `public/data/mac/mac.schema.json`

### Device fields

| Field                | Presence | Type                           | Example                                                                                  |
| -------------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`                 | required | `string`                       | `"macbook-neo-a18-pro"`                                                                  |
| `name`               | required | `string`                       | `"MacBook Neo (A18 Pro)"`                                                                |
| `releaseYear`        | required | `integer`                      | `2026`                                                                                   |
| `priceAud`           | required | `number                        | null`                                                                                    | `1049` |
| `colors`             | required | `array<object<color>>`         | `[{"id":"silver","displayName":"Silver","swatch":{"kind":"css","value":"#e2e3e4"},"ima…` |
| `configurations`     | required | `array<object<configuration>>` | `[{"id":"256gb-ssd-1","storageId":"256gb","chipId":"apple-a18-pro-chip","sourceNotes":…` |
| `storageOptions`     | required | `array<object<storage>>`       | `[{"id":"256gb","capacityValue":256,"capacityUnit":"GB","displayName":"256GB"},{"id":"…` |
| `memoryOptions`      | required | `array<object<memory>>`        | `[{"id":"8gb","capacityValue":8,"capacityUnit":"GB","kind":"unified","displayName":"8G…` |
| `chips`              | required | `array<object<chip>>`          | `[{"id":"apple-a18-pro-chip","displayName":"Apple A18 Pro chip","family":"A18 Pro chip…` |
| `displays`           | required | `array<object<display>>`       | `[{"id":"display-13-0-liquid-retina-display-8","technology":"Liquid Retina display","s…` |
| `cameras`            | required | `array<object<camera>>`        | `[{"id":"camera-0","role":"FaceTime","displayName":"1080p FaceTime HD camera 1080p HD …` |
| `audio`              | required | `object<audio>`                | `{"speaker":false,"microphone":false,"formats":[]}`                                      |
| `batteryAndPower`    | required | `object<batteryAndPower>`      | `{"battery":{"capacityWhr":36.5,"runtimeHours":[],"charging":{"wirelessCharging":false…` |
| `connectivity`       | required | `object<connectivity>`         | `{"ports":[{"id":"usb-c-1","kind":"USB-C","standard":"USB 2","quantity":1,"sourceNotes…` |
| `authentication`     | required | `object<authentication>`       | `{"methods":["passcode"],"primaryMethod":"passcode","sourceNotes":"Touch ID; passcode"}` |
| `physical`           | required | `object<physical>`             | `{"weights":[{"value":1.23,"unit":"kg"}],"dimensions":[{"value":1.27,"unit":"cm","qual…` |
| `software`           | required | `object<software>`             | `{"operatingSystem":"macOS","builtInApps":[]}`                                           |
| `backlitKeyboard`    | optional | `boolean`                      | `false`                                                                                  |
| `forceTouchTrackpad` | optional | `boolean`                      | `false`                                                                                  |
| `accessories`        | required | `array<object<accessory>>`     | `[]`                                                                                     |
| `sourceNotes`        | optional | `string`                       | `"Extracted from mac.html. Prices are model-level AUD where rendered; unrendered mac5 …` |

### Nested object fields

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"mac1-images:compare_macbook_neo_a18_silver:d23cbmwh42eu_large_2x"`                     |
| `appleUrl`  | required | `string`  | `"file://images/mac1-images__compare_macbook_neo_a18_silver__d23cbmwh42eu_large_2x.jpg"` |
| `localPath` | required | `string`  | `"public/data/mac/images/mac1-images__compare_macbook_neo_a18_silver__d23cbmwh42eu_lar…` |
| `widthPx`   | required | `integer` | `492`                                                                                    |
| `heightPx`  | required | `integer` | `300`                                                                                    |

#### `color`

| Field           | Presence | Type                   | Example                                                                                  |
| --------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`               | `"silver"`                                                                               |
| `displayName`   | required | `string`               | `"Silver"`                                                                               |
| `swatch`        | required | `object<swatch>`       | `{"kind":"css","value":"#e2e3e4"}`                                                       |
| `images`        | required | `array<object<image>>` | `[{"label":"mac1-images:compare_macbook_neo_a18_silver:d23cbmwh42eu_large_2x","appleUr…` |
| `colorPriceAud` | optional | `number`               | `0`                                                                                      |
| `sourceNotes`   | optional | `string`               | `"Swatch class colornav-swatch-silver; product image class image-compare-macbook-neo-a…` |

#### `measurement`

| Field       | Presence | Type     | Example    |
| ----------- | -------- | -------- | ---------- |
| `value`     | required | `number` | `1.27`     |
| `unit`      | required | `string` | `"cm"`     |
| `qualifier` | optional | `string` | `"Height"` |

#### `measurementRange`

| Field       | Presence | Type     | Example                                              |
| ----------- | -------- | -------- | ---------------------------------------------------- |
| `minimum`   | required | `number` | `0`                                                  |
| `maximum`   | required | `number` | `120`                                                |
| `unit`      | required | `string` | `"hz"`                                               |
| `qualifier` | optional | `string` | `"Adaptive refresh rates with ProMotion technology"` |

#### `cpuCores`

| Field         | Presence | Type      | Example |
| ------------- | -------- | --------- | ------- |
| `total`       | required | `integer` | `6`     |
| `performance` | optional | `integer` | `2`     |
| `efficiency`  | optional | `integer` | `4`     |

#### `mediaEngine`

| Field         | Presence | Type            | Example                                   |
| ------------- | -------- | --------------- | ----------------------------------------- |
| `id`          | required | `string`        | `"media-engine"`                          |
| `displayName` | required | `string`        | `"Media Engine"`                          |
| `kinds`       | required | `array<string>` | `["video-decode","ProRes encode-decode"]` |

#### `chip`

| Field                  | Presence | Type                         | Example                                                                                  |
| ---------------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                   | required | `string`                     | `"apple-m1-max-chip"`                                                                    |
| `displayName`          | required | `string`                     | `"Apple M1 Max chip"`                                                                    |
| `family`               | optional | `string`                     | `"M1 Max chip"`                                                                          |
| `cpuCores`             | optional | `object<cpuCores>`           | `{"total":10,"performance":8,"efficiency":2}`                                            |
| `gpuCores`             | optional | `integer`                    | `32`                                                                                     |
| `neuralEngineCores`    | optional | `integer`                    | `16`                                                                                     |
| `memoryBandwidthGbps`  | optional | `number`                     | `400`                                                                                    |
| `cpuCoreConfiguration` | optional | `string`                     | `"10-core CPU with 8 performance cores and 2 efficiency cores; up to 32-core GPU."`      |
| `mediaEngines`         | optional | `array<object<mediaEngine>>` | `[{"id":"m1-max-media-engine","displayName":"Media Engine","kinds":["video-decode","vi…` |
| `neuralAccelerators`   | optional | `boolean`                    | `false`                                                                                  |
| `hardwareRayTracing`   | optional | `boolean`                    | `false`                                                                                  |
| `processNode`          | optional | `string`                     | `"example"`                                                                              |
| `sourceNotes`          | optional | `string`                     | `"Second listed processor row: up to 32-core GPU; 400GB/s memory bandwidth. Media engi…` |

#### `storage`

| Field               | Presence | Type            | Example       |
| ------------------- | -------- | --------------- | ------------- |
| `id`                | required | `string`        | `"512gb"`     |
| `displayName`       | optional | `string`        | `"512GB"`     |
| `capacityValue`     | required | `integer`       | `512`         |
| `capacityUnit`      | required | `"GB"           | "TB"`         | `"GB"` |
| `priceDeltaAud`     | optional | `number`        | `0`           |
| `availableColorIds` | optional | `array<string>` | `[]`          |
| `sourceNotes`       | optional | `string`        | `"512GB SSD"` |

#### `memory`

| Field           | Presence | Type      | Example                                                  |
| --------------- | -------- | --------- | -------------------------------------------------------- |
| `id`            | required | `string`  | `"36gb-m5-max-with-32-core-gpu"`                         |
| `displayName`   | optional | `string`  | `"36GB (M5 Max with 32-core GPU)"`                       |
| `capacityValue` | required | `integer` | `36`                                                     |
| `capacityUnit`  | required | `"GB"     | "TB"`                                                    | `"GB"` |
| `kind`          | required | `string`  | `"unified"`                                              |
| `speedMbps`     | optional | `number`  | `0`                                                      |
| `speedUnit`     | optional | `string`  | `"example"`                                              |
| `sourceNotes`   | optional | `string`  | `"Source qualification: 36GB (M5 Max with 32-core GPU)"` |

#### `configuration`

| Field         | Presence | Type            | Example                                     |
| ------------- | -------- | --------------- | ------------------------------------------- |
| `id`          | required | `string`        | `"256gb-ssd-1"`                             |
| `displayName` | optional | `string`        | `"example"`                                 |
| `storageId`   | optional | `string`        | `"256gb"`                                   |
| `memoryIds`   | optional | `array<string>` | `[]`                                        |
| `chipId`      | optional | `string`        | `"apple-a18-pro-chip"`                      |
| `priceAud`    | optional | `number`        | `1049`                                      |
| `sourceNotes` | optional | `string`        | `"Base starting price from compare table."` |

#### `display`

| Field                         | Presence | Type                       | Example                                                                                  |
| ----------------------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                          | required | `string`                   | `"display-16-2-xdr"`                                                                     |
| `technology`                  | required | `string`                   | `"Liquid Retina XDR display"`                                                            |
| `panelKind`                   | optional | `string`                   | `"LED-backlit LCD"`                                                                      |
| `sizeIn`                      | optional | `number`                   | `16.2`                                                                                   |
| `resolutionWidthPx`           | optional | `integer`                  | `3456`                                                                                   |
| `resolutionHeightPx`          | optional | `integer`                  | `2234`                                                                                   |
| `pixelsPerInch`               | optional | `number`                   | `1`                                                                                      |
| `refreshRateHz`               | optional | `number`                   | `1`                                                                                      |
| `refreshRateRange`            | optional | `object<measurementRange>` | `{"minimum":0,"maximum":120,"unit":"hz","qualifier":"Adaptive refresh rates with ProMo…` |
| `sdrPeakBrightnessNits`       | optional | `number`                   | `500`                                                                                    |
| `hdrPeakBrightnessNits`       | optional | `number`                   | `1600`                                                                                   |
| `fullScreenHdrBrightnessNits` | optional | `number`                   | `1000`                                                                                   |
| `trueTone`                    | optional | `boolean`                  | `true`                                                                                   |
| `promotion`                   | optional | `boolean`                  | `true`                                                                                   |
| `alwaysOn`                    | optional | `boolean`                  | `false`                                                                                  |
| `wideColorP3`                 | optional | `boolean`                  | `true`                                                                                   |
| `laminated`                   | optional | `boolean`                  | `false`                                                                                  |
| `antireflective`              | optional | `boolean`                  | `false`                                                                                  |
| `nanoTextureOption`           | optional | `boolean`                  | `false`                                                                                  |
| `fingerprintResistantCoating` | optional | `boolean`                  | `false`                                                                                  |
| `hoverSupport`                | optional | `boolean`                  | `false`                                                                                  |
| `mirroring`                   | optional | `boolean`                  | `false`                                                                                  |
| `sourceNotes`                 | optional | `string`                   | `"Mini-LED-backlit display footnote 9; XDR brightness: 1000 nits sustained full-screen…` |

#### `camera`

| Field             | Presence | Type      | Example                                                                                  |
| ----------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`              | required | `string`  | `"camera-0"`                                                                             |
| `role`            | required | `string`  | `"other"`                                                                                |
| `displayName`     | required | `string`  | `"12MP Center Stage camera with support for Desk View 1080p HD video recording Advance…` |
| `megapixels`      | optional | `number`  | `12`                                                                                     |
| `centerStage`     | optional | `boolean` | `true`                                                                                   |
| `sensorShiftOis`  | optional | `boolean` | `false`                                                                                  |
| `proRAW`          | optional | `boolean` | `false`                                                                                  |
| `spatialCapture`  | optional | `boolean` | `false`                                                                                  |
| `macro`           | optional | `boolean` | `false`                                                                                  |
| `trueDepthSystem` | optional | `boolean` | `false`                                                                                  |
| `proRes`          | optional | `boolean` | `false`                                                                                  |
| `lidar`           | optional | `boolean` | `false`                                                                                  |
| `sourceNotes`     | optional | `string`  | `"12MP Center Stage camera with support for Desk View 1080p HD video recording Advance…` |

#### `audio`

| Field                     | Presence | Type            | Example                                                                                  |
| ------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `speaker`                 | optional | `boolean`       | `true`                                                                                   |
| `microphone`              | optional | `boolean`       | `true`                                                                                   |
| `speakerConfiguration`    | optional | `string`        | `"High-fidelity six-speaker sound system with force-cancelling woofers and wide stereo…` |
| `microphoneConfiguration` | optional | `string`        | `"Studio-quality three-mic array with high signal-to-noise ratio and directional beamf…` |
| `spatialAudio`            | optional | `boolean`       | `true`                                                                                   |
| `formats`                 | optional | `array<string>` | `["Dolby Atmos playback","Spatial Audio"]`                                               |
| `sourceNotes`             | optional | `string`        | `"Supports Dolby Atmos playback on built-in speakers; Spatial Audio with dynamic head …` |

#### `runtime`

| Field       | Presence | Type     | Example          |
| ----------- | -------- | -------- | ---------------- |
| `id`        | required | `string` | `"wireless-web"` |
| `activity`  | required | `string` | `"Wireless web"` |
| `hours`     | required | `number` | `14`             |
| `network`   | optional | `string` | `"example"`      |
| `qualifier` | optional | `string` | `"Up to"`        |

#### `charging`

| Field                        | Presence | Type            | Example     |
| ---------------------------- | -------- | --------------- | ----------- |
| `portId`                     | optional | `string`        | `"example"` |
| `wiredFastCharge`            | optional | `boolean`       | `true`      |
| `wirelessCharging`           | required | `boolean`       | `false`     |
| `wirelessStandards`          | optional | `array<string>` | `[]`        |
| `fastChargeMinutesToPercent` | optional | `number`        | `0`         |
| `adapterPowerW`              | optional | `number`        | `140`       |

#### `battery`

| Field          | Presence | Type                     | Example                                             |
| -------------- | -------- | ------------------------ | --------------------------------------------------- |
| `capacityMah`  | optional | `number`                 | `0`                                                 |
| `capacityWhr`  | optional | `number`                 | `36.5`                                              |
| `runtimeHours` | required | `array<object<runtime>>` | `[]`                                                |
| `charging`     | required | `object<charging>`       | `{"wirelessCharging":false,"wirelessStandards":[]}` |

#### `power`

| Field                     | Presence | Type      | Example |
| ------------------------- | -------- | --------- | ------- |
| `hasExternalPowerAdapter` | required | `boolean` | `true`  |
| `outputVoltageV`          | optional | `number`  | `0`     |
| `outputCurrentA`          | optional | `number`  | `0`     |
| `outputPowerW`            | optional | `number`  | `140`   |
| `inputVoltageRangeV`      | optional | `object`  | —       |
| `frequencyHz`             | optional | `number`  | `0`     |
| `consumptionW`            | optional | `number`  | `0`     |

#### `batteryAndPower`

| Field     | Presence | Type             | Example                             |
| --------- | -------- | ---------------- | ----------------------------------- |
| `battery` | required | `object<battery> | null`                               | `{"capacityWhr":36.5,"runtimeHours":[],"charging":{"wirelessCharging":false,"wirelessS…` |
| `power`   | required | `object<power>`  | `{"hasExternalPowerAdapter":false}` |

#### `port`

| Field                | Presence | Type      | Example                                    |
| -------------------- | -------- | --------- | ------------------------------------------ |
| `id`                 | required | `string`  | `"usb-c-1"`                                |
| `kind`               | required | `string`  | `"USB-C"`                                  |
| `standard`           | optional | `string`  | `"USB 2"`                                  |
| `quantity`           | optional | `integer` | `1`                                        |
| `supportsDisplayOut` | optional | `boolean` | `false`                                    |
| `maxPowerW`          | optional | `number`  | `0`                                        |
| `sourceNotes`        | optional | `string`  | `"USB 3 (USB-C) port; USB 2 (USB-C) port"` |

#### `connectivity`

| Field       | Presence | Type                  | Example                                                                                  |
| ----------- | -------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `ports`     | required | `array<object<port>>` | `[{"id":"usb-c-1","kind":"USB-C","standard":"USB 2","quantity":1,"sourceNotes":"USB 3 …` |
| `wifi`      | optional | `object`              | `{"standards":["Wi-Fi 6E","Wi-Fi 6"]}`                                                   |
| `bluetooth` | optional | `object`              | `{"version":"Bluetooth 6.0"}`                                                            |

#### `authentication`

| Field           | Presence | Type            | Example                                                                                  |
| --------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `methods`       | required | `array<string>` | `["Touch ID"]`                                                                           |
| `primaryMethod` | required | `string`        | `"Touch ID"`                                                                             |
| `placement`     | optional | `string`        | `"keyboard"`                                                                             |
| `sourceNotes`   | optional | `string`        | `"Rendered authentication row for the selected target column identifies Touch ID; plac…` |

#### `physicalComponent`

| Field         | Presence | Type                         | Example     |
| ------------- | -------- | ---------------------------- | ----------- |
| `id`          | required | `string`                     | `"example"` |
| `displayName` | required | `string`                     | `"example"` |
| `dimensions`  | required | `array<object<measurement>>` | `[]`        |
| `weight`      | optional | `number`                     | `0`         |
| `weightUnit`  | optional | `string`                     | `"example"` |
| `sourceNotes` | optional | `string`                     | `"example"` |

#### `physical`

| Field        | Presence | Type                               | Example                                                                                  |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `weights`    | required | `array<object<measurement>>`       | `[{"value":1.23,"unit":"kg"}]`                                                           |
| `dimensions` | required | `array<object<measurement>>`       | `[{"value":1.27,"unit":"cm","qualifier":"Height"},{"value":29.75,"unit":"cm","qualifie…` |
| `components` | required | `array<object<physicalComponent>>` | `[]`                                                                                     |

#### `software`

| Field                            | Presence | Type            | Example     |
| -------------------------------- | -------- | --------------- | ----------- |
| `operatingSystem`                | required | `string`        | `"macOS"`   |
| `operatingSystemVersionAtLaunch` | optional | `string`        | `"example"` |
| `builtInApps`                    | required | `array<string>` | `[]`        |
| `sourceNotes`                    | optional | `string`        | `"example"` |

#### `accessory`

| Field          | Presence | Type            | Example     |
| -------------- | -------- | --------------- | ----------- |
| `accessoryId`  | optional | `string`        | `"example"` |
| `displayName`  | required | `string`        | `"example"` |
| `category`     | required | `string`        | `"example"` |
| `capabilities` | optional | `array<string>` | `[]`        |

## Vision

- Canonical data: `public/data/vision/vision.json`
- Schema: `public/data/vision/vision.schema.json`

### Device fields

| Field             | Presence | Type                           | Example                                                                                  |
| ----------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `id`              | required | `string`                       | `"apple-vision-pro-m5"`                                                                  |
| `name`            | required | `string`                       | `"Apple Vision Pro"`                                                                     |
| `releaseYear`     | required | `integer`                      | `2025`                                                                                   |
| `priceAud`        | required | `number                        | null`                                                                                    | `null` |
| `colors`          | required | `array<object<color>>`         | `[{"id":"light-grey-accessory","displayName":"light grey","swatch":{"kind":"css","valu…` |
| `configurations`  | required | `array<object<configuration>>` | `[{"id":"256gb","storageId":"256gb"},{"id":"512gb","storageId":"512gb"},{"id":"1tb","s…` |
| `storageOptions`  | required | `array<object<storage>>`       | `[{"id":"256gb","displayName":"256GB","capacityValue":256,"capacityUnit":"GB"},{"id":"…` |
| `memoryOptions`   | required | `array<object<memory>>`        | `[{"id":"16gb-unified","displayName":"16GB unified memory","capacityValue":16,"capacit…` |
| `chips`           | required | `array<object<chip>>`          | `[{"id":"apple-m5","displayName":"Apple M5 chip","family":"M5","cpuCores":{"total":10,…` |
| `displays`        | required | `array<object<display>>`       | `[{"id":"micro-oled-3d-display-system","technology":"3D display system","panelKind":"m…` |
| `cameras`         | required | `array<object<camera>>`        | `[{"id":"spatial-main-camera-system","role":"spatial","displayName":"Stereoscopic 3D m…` |
| `sensors`         | optional | `array<object<sensor>>`        | `[{"id":"true-depth-camera","name":"TrueDepth camera","purpose":"Depth sensing and spa…` |
| `audio`           | required | `object<audio>`                | `{"speaker":true,"microphone":true,"microphoneConfiguration":"Six‑mic array with direc…` |
| `batteryAndPower` | required | `object<batteryAndPower>`      | `{"battery":{"runtimeHours":[{"id":"general-use","activity":"general use","hours":2.5}…` |
| `connectivity`    | required | `object<connectivity>`         | `{"ports":[{"id":"battery-power-connector","kind":"power connector","sourceNotes":"Phy…` |
| `authentication`  | required | `object<authentication>`       | `{"methods":["Optic ID"],"primaryMethod":"Optic ID","opticId":{"available":true,"descr…` |
| `physical`        | required | `object<physical>`             | `{"weights":[{"value":750,"unit":"g","qualifier":"minimum device weight; range 750–800…` |
| `software`        | required | `object<software>`             | `{"operatingSystem":"visionOS 26","builtInApps":["App Store","Encounter Dinosaurs","Fi…` |
| `inputMethods`    | optional | `array<string>`                | `[]`                                                                                     |
| `accessories`     | required | `array<object<accessory>>`     | `[{"displayName":"Hands","category":"input","accessoryId":"hands"},{"displayName":"Eye…` |
| `sourceNotes`     | optional | `string`                       | `"Camera systems not fully representable by the camera contract: two high-resolution m…` |

### Nested object fields

#### `image`

| Field       | Presence | Type      | Example                                                                                  |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `label`     | required | `string`  | `"light grey Cover large 1x"`                                                            |
| `appleUrl`  | required | `string`  | `"https://www.apple.com/v/apple-vision-pro/j/images/specs/itb_cover__fmm1o03zrdaq_larg…` |
| `localPath` | required | `string`  | `"public/data/vision/images/itb_cover__fmm1o03zrdaq_large.jpg"`                          |
| `widthPx`   | required | `integer` | `233`                                                                                    |
| `heightPx`  | required | `integer` | `140`                                                                                    |

#### `color`

| Field           | Presence | Type                   | Example                                                                                  |
| --------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `id`            | required | `string`               | `"light-grey-accessory"`                                                                 |
| `displayName`   | required | `string`               | `"light grey"`                                                                           |
| `swatch`        | required | `object<swatch>`       | `{"kind":"css","value":"#d3d3d3"}`                                                       |
| `images`        | required | `array<object<image>>` | `[{"label":"light grey Cover large 1x","appleUrl":"https://www.apple.com/v/apple-visio…` |
| `colorPriceAud` | optional | `number`               | `0`                                                                                      |
| `sourceNotes`   | optional | `string`               | `"Colour named only in Apple image description."`                                        |

#### `measurement`

| Field       | Presence | Type     | Example                                                                                  |
| ----------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| `value`     | required | `number` | `750`                                                                                    |
| `unit`      | required | `string` | `"g"`                                                                                    |
| `qualifier` | optional | `string` | `"minimum device weight; range 750–800 grams (26.4–28.2 ounces); weight includes Light…` |

#### `storage`

| Field               | Presence | Type            | Example                                        |
| ------------------- | -------- | --------------- | ---------------------------------------------- |
| `id`                | required | `string`        | `"16gb-unified"`                               |
| `displayName`       | optional | `string`        | `"16GB unified memory"`                        |
| `capacityValue`     | required | `integer`       | `16`                                           |
| `capacityUnit`      | required | `"GB"           | "TB"`                                          | `"GB"` |
| `priceDeltaAud`     | optional | `number`        | `0`                                            |
| `availableColorIds` | optional | `array<string>` | `[]`                                           |
| `sourceNotes`       | optional | `string`        | `"Source states 153GB/s of memory bandwidth."` |

#### `memory`

| Field           | Presence | Type      | Example                                        |
| --------------- | -------- | --------- | ---------------------------------------------- |
| `id`            | required | `string`  | `"16gb-unified"`                               |
| `displayName`   | optional | `string`  | `"16GB unified memory"`                        |
| `capacityValue` | required | `integer` | `16`                                           |
| `capacityUnit`  | required | `"GB"     | "TB"`                                          | `"GB"` |
| `kind`          | required | `string`  | `"unified"`                                    |
| `sourceNotes`   | optional | `string`  | `"Source states 153GB/s of memory bandwidth."` |

#### `configuration`

| Field         | Presence | Type     | Example     |
| ------------- | -------- | -------- | ----------- |
| `id`          | required | `string` | `"256gb"`   |
| `storageId`   | required | `string` | `"256gb"`   |
| `priceAud`    | optional | `number` | `0`         |
| `sourceNotes` | optional | `string` | `"example"` |

#### `cpuCores`

| Field         | Presence | Type      | Example |
| ------------- | -------- | --------- | ------- |
| `total`       | required | `integer` | `10`    |
| `performance` | optional | `integer` | `4`     |
| `efficiency`  | optional | `integer` | `6`     |

#### `chip`

| Field                  | Presence | Type               | Example                                                   |
| ---------------------- | -------- | ------------------ | --------------------------------------------------------- |
| `id`                   | required | `string`           | `"apple-m5"`                                              |
| `displayName`          | required | `string`           | `"Apple M5 chip"`                                         |
| `family`               | optional | `string`           | `"M5"`                                                    |
| `cpuCores`             | optional | `object<cpuCores>` | `{"total":10,"performance":4,"efficiency":6}`             |
| `gpuCores`             | optional | `integer`          | `10`                                                      |
| `neuralEngineCores`    | optional | `integer`          | `16`                                                      |
| `memoryBandwidthGbps`  | optional | `number`           | `153`                                                     |
| `cpuCoreConfiguration` | optional | `string`           | `"10‑core CPU with 4 super cores and 6 efficiency cores"` |
| `neuralAccelerators`   | optional | `boolean`          | `true`                                                    |
| `hardwareRayTracing`   | optional | `boolean`          | `true`                                                    |
| `sourceNotes`          | optional | `string`           | `"example"`                                               |

#### `display`

| Field                | Presence | Type      | Example                                                                                  |
| -------------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`                 | required | `string`  | `"micro-oled-3d-display-system"`                                                         |
| `technology`         | required | `string`  | `"3D display system"`                                                                    |
| `panelKind`          | required | `string`  | `"micro-OLED"`                                                                           |
| `sizeIn`             | optional | `number`  | `0`                                                                                      |
| `resolutionWidthPx`  | required | `integer | null` | `null`                                                                               |
| `resolutionHeightPx` | optional | `integer` | `1`                                                                                      |
| `pixelsPerInch`      | optional | `number`  | `1`                                                                                      |
| `refreshRateRange`   | optional | `object`  | `{"minimum":90,"maximum":120,"unit":"hz"}`                                               |
| `wideColorP3`        | optional | `boolean` | `true`                                                                                   |
| `mirroring`          | required | `boolean` | `true`                                                                                   |
| `sourceNotes`        | optional | `string`  | `"23 million pixels; 7.5‑micron pixel pitch; supported refresh rates also include 96Hz…` |

#### `camera`

| Field             | Presence | Type      | Example                                          |
| ----------------- | -------- | --------- | ------------------------------------------------ |
| `id`              | required | `string`  | `"spatial-main-camera-system"`                   |
| `role`            | required | `string`  | `"spatial"`                                      |
| `displayName`     | required | `string`  | `"Stereoscopic 3D main camera system"`           |
| `megapixels`      | required | `number`  | `6.5`                                            |
| `apertureFNumber` | optional | `number`  | `2`                                              |
| `spatialCapture`  | optional | `boolean` | `true`                                           |
| `sourceNotes`     | optional | `string`  | `"Spatial photo and video capture; 18 mm lens."` |

#### `sensor`

| Field         | Presence | Type     | Example                                |
| ------------- | -------- | -------- | -------------------------------------- |
| `id`          | required | `string` | `"true-depth-camera"`                  |
| `name`        | required | `string` | `"TrueDepth camera"`                   |
| `purpose`     | optional | `string` | `"Depth sensing and spatial tracking"` |
| `sourceNotes` | optional | `string` | `"example"`                            |

#### `opticId`

| Field         | Presence | Type      | Example                                                                |
| ------------- | -------- | --------- | ---------------------------------------------------------------------- |
| `available`   | required | `boolean` | `true`                                                                 |
| `description` | optional | `string`  | `"Iris-based biometric authentication secured by the Secure Enclave."` |
| `sourceNotes` | optional | `string`  | `"example"`                                                            |

#### `audio`

| Field                     | Presence | Type            | Example                                                                                  |
| ------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `speaker`                 | required | `boolean`       | `true`                                                                                   |
| `microphone`              | required | `boolean`       | `true`                                                                                   |
| `microphoneConfiguration` | optional | `string`        | `"Six‑mic array with directional beamforming"`                                           |
| `spatialAudio`            | required | `boolean`       | `true`                                                                                   |
| `formats`                 | required | `array<string>` | `["AAC","MP3","Apple Lossless","FLAC","Dolby Digital","Dolby Digital Plus","Dolby Atmo…` |
| `sourceNotes`             | optional | `string`        | `"Personalised Spatial Audio and audio ray tracing. Supports H2‑to‑H2 ultra‑low‑latenc…` |

#### `runtime`

| Field      | Presence | Type     | Example         |
| ---------- | -------- | -------- | --------------- |
| `id`       | required | `string` | `"general-use"` |
| `activity` | required | `string` | `"general use"` |
| `hours`    | required | `number` | `2.5`           |

#### `charging`

| Field                        | Presence | Type            | Example                     |
| ---------------------------- | -------- | --------------- | --------------------------- |
| `portId`                     | optional | `string`        | `"battery-power-connector"` |
| `wiredFastCharge`            | optional | `boolean`       | `false`                     |
| `wirelessCharging`           | required | `boolean`       | `false`                     |
| `wirelessStandards`          | optional | `array<string>` | `[]`                        |
| `fastChargeMinutesToPercent` | optional | `number`        | `0`                         |
| `adapterPowerW`              | optional | `number`        | `30`                        |

#### `battery`

| Field          | Presence | Type                     | Example                                                                                  |
| -------------- | -------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `capacityMah`  | optional | `number`                 | `0`                                                                                      |
| `capacityWhr`  | optional | `number`                 | `0`                                                                                      |
| `runtimeHours` | required | `array<object<runtime>>` | `[{"id":"general-use","activity":"general use","hours":2.5},{"id":"video-watching","ac…` |
| `charging`     | required | `object<charging>`       | `{"portId":"battery-power-connector","wirelessCharging":false,"adapterPowerW":30}`       |

#### `power`

| Field                     | Presence | Type      | Example |
| ------------------------- | -------- | --------- | ------- |
| `hasExternalPowerAdapter` | required | `boolean` | `true`  |
| `outputVoltageV`          | optional | `number`  | `0`     |
| `outputCurrentA`          | optional | `number`  | `0`     |
| `outputPowerW`            | optional | `number`  | `30`    |
| `inputVoltageRangeV`      | optional | `object`  | —       |
| `frequencyHz`             | optional | `number`  | `0`     |
| `consumptionW`            | optional | `number`  | `0`     |

#### `batteryAndPower`

| Field     | Presence | Type              | Example                                                                                  |
| --------- | -------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `battery` | required | `object<battery>` | `{"runtimeHours":[{"id":"general-use","activity":"general use","hours":2.5},{"id":"vid…` |
| `power`   | required | `object<power>`   | `{"hasExternalPowerAdapter":true,"outputPowerW":30}`                                     |

#### `port`

| Field         | Presence | Type      | Example                                                                                  |
| ------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`          | required | `string`  | `"battery-power-connector"`                                                              |
| `kind`        | required | `string`  | `"power connector"`                                                                      |
| `quantity`    | optional | `integer` | `1`                                                                                      |
| `sourceNotes` | optional | `string`  | `"Physical kind inferred from battery built-in power cable with round connector shown …` |

#### `connectivity`

| Field       | Presence | Type                  | Example                                                                                  |
| ----------- | -------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `ports`     | required | `array<object<port>>` | `[{"id":"battery-power-connector","kind":"power connector","sourceNotes":"Physical kin…` |
| `wifi`      | required | `object`              | `{"standards":["Wi-Fi 6"]}`                                                              |
| `bluetooth` | required | `object`              | `{"version":"Bluetooth 5.3"}`                                                            |

#### `authentication`

| Field           | Presence | Type              | Example                                                                                  |
| --------------- | -------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `methods`       | required | `array<string>`   | `["Optic ID"]`                                                                           |
| `primaryMethod` | required | `string`          | `"Optic ID"`                                                                             |
| `opticId`       | optional | `object<opticId>` | `{"available":true,"description":"Iris-based biometric authentication secured by the S…` |
| `sourceNotes`   | optional | `string`          | `"Iris‑based biometric authentication. Optic ID data is encrypted and accessible only …` |

#### `physicalComponent`

| Field         | Presence | Type                         | Example              |
| ------------- | -------- | ---------------------------- | -------------------- |
| `id`          | required | `string`                     | `"separate-battery"` |
| `displayName` | required | `string`                     | `"Battery"`          |
| `dimensions`  | required | `array<object<measurement>>` | `[]`                 |
| `weight`      | required | `number`                     | `353`                |
| `weightUnit`  | required | `string`                     | `"g"`                |
| `sourceNotes` | optional | `string`                     | `"example"`          |

#### `physical`

| Field        | Presence | Type                               | Example                                                                                  |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `weights`    | required | `array<object<measurement>>`       | `[{"value":750,"unit":"g","qualifier":"minimum device weight; range 750–800 grams (26.…` |
| `dimensions` | required | `array<object<measurement>>`       | `[{"value":51,"unit":"mm","qualifier":"minimum interpupillary distance; supported rang…` |
| `components` | required | `array<object<physicalComponent>>` | `[{"id":"separate-battery","displayName":"Battery","dimensions":[],"weight":353,"weigh…` |

#### `software`

| Field             | Presence | Type            | Example                                                                                  |
| ----------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `operatingSystem` | required | `string`        | `"visionOS 26"`                                                                          |
| `builtInApps`     | required | `array<string>` | `["App Store","Encounter Dinosaurs","Files","Freeform","Keynote","Mail","Messages","Mi…` |
| `sourceNotes`     | optional | `string`        | `"example"`                                                                              |

#### `accessory`

| Field          | Presence | Type            | Example                                           |
| -------------- | -------- | --------------- | ------------------------------------------------- |
| `accessoryId`  | optional | `string`        | `"trackpads-and-mouse-devices"`                   |
| `displayName`  | required | `string`        | `"Trackpads and mouse devices"`                   |
| `category`     | required | `string`        | `"input"`                                         |
| `capabilities` | optional | `array<string>` | `["Mouse support requires visionOS 2 or later."]` |

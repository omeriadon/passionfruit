# Graph Report - passionfruit  (2026-09-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 4003 nodes · 5012 edges · 297 communities (286 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `19d8c626`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- number
- required
- properties
- properties
- properties
- properties
- properties
- properties
- displayName
- measurement
- AuthProvider.tsx
- properties
- null
- source.ts
- $defs
- integer
- measurement
- id
- $defs
- types.ts
- properties
- compilerOptions
- properties
- $defs
- properties
- heightPx
- dimensions
- properties
- properties
- properties
- displayName
- $ref
- properties
- $defs
- properties
- capacityUnit
- properties
- properties
- properties
- ipadCpuCores
- properties
- properties
- properties
- id
- properties
- properties
- $defs
- properties
- batteryAndPower
- DeviceDetail.tsx
- enum
- $ref
- gps
- properties
- required
- properties
- sourceNotes
- properties
- properties
- properties
- properties
- properties
- properties
- properties
- properties
- measurementRange
- properties
- properties
- devDependencies
- dependencies
- $ref
- id
- measurement
- required
- properties
- properties
- properties
- properties
- id
- properties
- $ref
- docs/layout.tsx
- enum
- properties
- properties
- properties
- properties
- properties
- properties
- mac.schema.json
- properties
- properties
- required
- properties
- properties
- properties
- [[...slug]]/page.tsx
- properties
- $defs
- properties
- properties
- sourceNotes
- properties
- properties
- properties
- properties
- cpuCores
- measurement
- id
- minLength
- properties
- properties
- id
- properties
- cpuCores
- properties
- properties
- properties
- cpuCores
- [[...slug]]/route.ts
- minLength
- $ref
- properties
- required
- required
- enum
- $ref
- properties
- properties
- properties
- properties
- sourceNotes
- boxItem
- properties
- gps
- properties
- powerSupply
- type
- $defs
- properties
- $defs
- required
- refreshRateLimitation
- resolution
- properties
- connectivity
- physical
- apple-tv.schema.json
- apple-watch.schema.json
- runtime
- properties
- $defs
- properties
- enum
- id
- sourceNotes
- brightness
- properties
- required
- swatch
- source
- swatch
- minLength
- properties
- properties
- sensor
- airpods.schema.json
- required
- properties
- required
- software
- homepod.schema.json
- inputVoltageRangeV
- ipad.schema.json
- properties
- enum
- enum
- iphone.schema.json
- type
- connectivity
- backlight
- camera
- source
- properties
- properties
- required
- wireless
- properties
- bluetooth
- wifi
- properties
- ipadAuthentication
- required
- required
- properties
- properties
- apple-display.schema.json
- glassOptions
- accessory
- vision.schema.json
- device-notes.ts
- storage
- iphoneAuthentication
- technology
- required
- sourceNotes
- id
- sourceNotes
- $ref
- apple-pencil.schema.json
- accessories
- compatibleDeviceIds
- source
- magic-keyboard.schema.json
- accessories
- compatibleDeviceIds
- properties
- properties
- properties
- scripts
- items
- bluetooth
- cellular
- thread
- authentication
- properties
- properties
- accessory
- wifi
- enum
- uwb
- runtime
- enum
- devices
- required
- validate-data.mjs
- package.json
- bluetooth
- releaseYear
- releaseYear
- connections
- images
- inTheBox
- enum
- maximumRelativeHumidityPercent
- referenceModes
- refreshRateLimitations
- type
- type
- next.config.mjs
- graphify.js
- charging
- fullScreenHdrBrightnessNits
- hdrPeakBrightnessNits
- minimumBrightnessNits
- panelKind
- pixelsPerInch
- refreshRateHz
- resolutionHeightPx
- resolutionWidthPx
- sdrPeakBrightnessNits
- sizeIn
- systems
- technology
- type
- ports
- cameras
- chips
- colors
- configurations
- displays
- memoryOptions
- overviewImages
- ports
- storageOptions
- fullScreenHdrBrightnessNits
- outputVoltageV
- resolutionWidthPx
- sdrPeakBrightnessNits
- technology
- displayName
- frequencyMaximumHz
- introducedYear
- maximumAltitudeMetres
- maximumLineVoltage
- minimumLineVoltage
- technicalSpecificationsUrl
- outputPowerW
- format-all
- pre-commit
- pre-push
- postcss
- @types/react
- postcss.config.mjs
- check-catalog-routes.mjs

## God Nodes (most connected - your core abstractions)
1. `number` - 39 edges
2. `displayName` - 34 edges
3. `null` - 28 edges
4. `null` - 28 edges
5. `$defs` - 28 edges
6. `$defs` - 25 edges
7. `$defs` - 22 edges
8. `required` - 21 edges
9. `required` - 20 edges
10. `$defs` - 20 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --indirect_call--> `getLLMText()`  [INFERRED]
  src/app/llms-full.txt/route.ts → src/lib/source.ts
- `required` --extends--> `devices`  [EXTRACTED]
  public/data/apple-tv/apple-tv.schema.json → public/data/mac/mac.schema.json
- `required` --extends--> `devices`  [EXTRACTED]
  public/data/apple-watch/apple-watch.schema.json → public/data/mac/mac.schema.json
- `required` --extends--> `inTheBox`  [EXTRACTED]
  public/data/other/apple-display/apple-display.schema.json → public/data/airpods/airpods.schema.json
- `required` --extends--> `devices`  [EXTRACTED]
  public/data/homepod/homepod.schema.json → public/data/mac/mac.schema.json

## Import Cycles
- None detected.

## Communities (297 total, 9 thin omitted)

### Community 0 - "number"
Cohesion: 0.06
Nodes (44): null, type, number, exclusiveMinimum, type, minimum, type, minimum (+36 more)

### Community 1 - "required"
Cohesion: 0.07
Nodes (42): required, required, chip, name, releaseYear, required, audio, chips (+34 more)

### Community 2 - "properties"
Cohesion: 0.05
Nodes (41): minLength, type, measurement, measurementRange, minimum, type, additionalProperties, properties (+33 more)

### Community 3 - "properties"
Cohesion: 0.05
Nodes (41): type, type, properties, type, minimum, type, type, type (+33 more)

### Community 4 - "properties"
Cohesion: 0.06
Nodes (40): properties, items, type, items, type, items, type, items (+32 more)

### Community 5 - "properties"
Cohesion: 0.05
Nodes (37): microphoneCount, additionalProperties, properties, required, type, audio, type, type (+29 more)

### Community 6 - "properties"
Cohesion: 0.05
Nodes (37): minimum, type, additionalProperties, properties, required, type, charging, minimum (+29 more)

### Community 7 - "properties"
Cohesion: 0.05
Nodes (37): physicalConfiguration, exclusiveMinimum, type, minimum, type, exclusiveMinimum, type, exclusiveMinimum (+29 more)

### Community 8 - "displayName"
Cohesion: 0.08
Nodes (35): required, id, required, additionalProperties, required, type, color, required (+27 more)

### Community 9 - "measurement"
Cohesion: 0.07
Nodes (34): measurement, additionalProperties, properties, required, type, maximum, minimum, unit (+26 more)

### Community 10 - "AuthProvider.tsx"
Cohesion: 0.11
Nodes (26): rootProviderOptions, AccountButton(), AccountButtonProps, AuthDialog(), addBookmark(), ApiError, AuthResponse, AuthSession (+18 more)

### Community 11 - "properties"
Cohesion: 0.06
Nodes (32): type, type, type, type, properties, type, type, type (+24 more)

### Community 12 - "null"
Cohesion: 0.07
Nodes (32): type, minimum, type, minimum, type, properties, pattern, type (+24 more)

### Community 13 - "source.ts"
Cohesion: 0.10
Nodes (24): { rewrite: rewriteDocs }, { rewrite: rewriteSuffix }, generateStaticParams(), revalidate, appName, CatalogRoute, docsContentRoute, docsImageRoute (+16 more)

### Community 14 - "$defs"
Cohesion: 0.08
Nodes (31): additionalProperties, type, additionalProperties, required, type, additionalProperties, required, type (+23 more)

### Community 15 - "integer"
Cohesion: 0.07
Nodes (31): integer, minimum, type, neuralEngineCores, resolutionHeightPx, resolutionWidthPx, videoMaxResolutionHeightPx, videoMaxResolutionWidthPx (+23 more)

### Community 16 - "measurement"
Cohesion: 0.07
Nodes (30): measurement, g, hours, minutes, percent, unit, value, additionalProperties (+22 more)

### Community 17 - "id"
Cohesion: 0.07
Nodes (30): minLength, type, properties, properties, physicalComponent, minLength, type, minLength (+22 more)

### Community 18 - "$defs"
Cohesion: 0.08
Nodes (30): additionalProperties, required, type, additionalProperties, required, type, additionalProperties, required (+22 more)

### Community 19 - "types.ts"
Cohesion: 0.13
Nodes (23): CatalogCategory(), CatalogCategoryProps, CatalogTable(), CatalogTableProps, columnText(), SortDirection, DataValue(), OtherCatalog() (+15 more)

### Community 20 - "properties"
Cohesion: 0.07
Nodes (29): exclusiveMinimum, type, type, properties, type, type, exclusiveMinimum, type (+21 more)

### Community 21 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+20 more)

### Community 22 - "properties"
Cohesion: 0.07
Nodes (28): type, type, type, type, properties, type, type, type (+20 more)

### Community 23 - "$defs"
Cohesion: 0.08
Nodes (28): additionalProperties, required, type, $defs, chip, display, image, memory (+20 more)

### Community 24 - "properties"
Cohesion: 0.07
Nodes (27): additionalProperties, properties, required, type, minimum, type, connection, enum (+19 more)

### Community 25 - "heightPx"
Cohesion: 0.18
Nodes (26): required, label, required, label, required, label, required, label (+18 more)

### Community 26 - "dimensions"
Cohesion: 0.11
Nodes (26): physical, additionalProperties, required, type, physical, additionalProperties, required, type (+18 more)

### Community 27 - "properties"
Cohesion: 0.08
Nodes (26): type, $ref, type, minimum, type, type, properties, items (+18 more)

### Community 28 - "properties"
Cohesion: 0.08
Nodes (26): type, iphoneCamera, additionalProperties, properties, type, type, type, centerStage (+18 more)

### Community 29 - "properties"
Cohesion: 0.08
Nodes (26): type, $ref, type, minimum, type, type, properties, items (+18 more)

### Community 30 - "displayName"
Cohesion: 0.08
Nodes (26): type, enum, type, minimum, type, properties, exclusiveMinimum, type (+18 more)

### Community 31 - "$ref"
Cohesion: 0.08
Nodes (25): items, type, items, type, items, type, items, type (+17 more)

### Community 32 - "properties"
Cohesion: 0.08
Nodes (25): properties, minLength, type, $ref, minLength, type, minimum, type (+17 more)

### Community 33 - "$defs"
Cohesion: 0.09
Nodes (24): additionalProperties, minLength, required, type, additionalProperties, required, type, $defs (+16 more)

### Community 34 - "properties"
Cohesion: 0.09
Nodes (24): enum, minimum, type, type, ipadMemoryOption, pattern, type, additionalProperties (+16 more)

### Community 35 - "capacityUnit"
Cohesion: 0.11
Nodes (24): ipadStorageOption, required, additionalProperties, required, type, kind, iphoneStorageOption, required (+16 more)

### Community 36 - "properties"
Cohesion: 0.09
Nodes (23): exclusiveMinimum, type, powerSupply, exclusiveMinimum, type, type, $ref, exclusiveMinimum (+15 more)

### Community 37 - "properties"
Cohesion: 0.09
Nodes (23): $ref, $ref, $ref, $ref, properties, items, type, type (+15 more)

### Community 38 - "properties"
Cohesion: 0.09
Nodes (23): properties, type, type, type, minimum, type, centerStage, lidar (+15 more)

### Community 39 - "ipadCpuCores"
Cohesion: 0.10
Nodes (22): ipadCpuCores, minimum, type, additionalProperties, properties, required, type, efficiency (+14 more)

### Community 40 - "properties"
Cohesion: 0.10
Nodes (22): enum, minimum, type, type, iphoneMemoryOption, type, additionalProperties, properties (+14 more)

### Community 41 - "properties"
Cohesion: 0.09
Nodes (22): properties, minLength, type, $ref, minLength, type, minimum, type (+14 more)

### Community 42 - "properties"
Cohesion: 0.09
Nodes (22): properties, type, minLength, type, minimum, type, mirroring, panelKind (+14 more)

### Community 43 - "id"
Cohesion: 0.10
Nodes (21): properties, properties, minLength, type, minLength, type, minLength, pattern (+13 more)

### Community 44 - "properties"
Cohesion: 0.10
Nodes (21): type, properties, type, type, type, type, type, type (+13 more)

### Community 45 - "properties"
Cohesion: 0.11
Nodes (21): format, type, ipadImage, ipadOverviewImage, minimum, type, additionalProperties, properties (+13 more)

### Community 46 - "$defs"
Cohesion: 0.10
Nodes (21): $defs, ipadCamera, ipadChip, ipadDevice, ipadMediaEngine, ipadSwatch, additionalProperties, required (+13 more)

### Community 47 - "properties"
Cohesion: 0.11
Nodes (21): format, type, iphoneImage, iphoneOverviewImage, minimum, type, additionalProperties, properties (+13 more)

### Community 48 - "batteryAndPower"
Cohesion: 0.10
Nodes (21): oneOf, additionalProperties, properties, required, type, batteryAndPower, battery, power (+13 more)

### Community 49 - "DeviceDetail.tsx"
Cohesion: 0.15
Nodes (18): Accessory, AccessoryCatalog(), AccessoryCatalogProps, DataObject(), detailSections(), DeviceDetail(), DeviceDetailProps, displayImage() (+10 more)

### Community 50 - "enum"
Cohesion: 0.10
Nodes (20): measurement, g, mm, unit, value, additionalProperties, properties, required (+12 more)

### Community 51 - "$ref"
Cohesion: 0.11
Nodes (20): items, type, items, type, items, type, items, type (+12 more)

### Community 52 - "gps"
Cohesion: 0.11
Nodes (20): additionalProperties, properties, required, type, additionalProperties, properties, required, type (+12 more)

### Community 53 - "properties"
Cohesion: 0.10
Nodes (20): anyOf, anyOf, iphoneConnectivity, anyOf, anyOf, additionalProperties, properties, type (+12 more)

### Community 54 - "required"
Cohesion: 0.13
Nodes (19): category, required, priceAud, sourceNotes, required, required, required, capabilities (+11 more)

### Community 55 - "properties"
Cohesion: 0.11
Nodes (19): $ref, $ref, properties, minLength, type, $ref, $ref, minimum (+11 more)

### Community 56 - "sourceNotes"
Cohesion: 0.13
Nodes (19): items, type, items, type, items, type, items, minLength (+11 more)

### Community 57 - "properties"
Cohesion: 0.11
Nodes (19): type, type, properties, type, type, activeNoiseCancellation, adaptiveAudio, microphone (+11 more)

### Community 58 - "properties"
Cohesion: 0.11
Nodes (19): type, type, properties, type, type, activeNoiseCancellation, adaptiveAudio, microphone (+11 more)

### Community 59 - "properties"
Cohesion: 0.11
Nodes (19): minimum, type, minimum, type, $ref, iphoneBatteryAndPower, type, additionalProperties (+11 more)

### Community 60 - "properties"
Cohesion: 0.11
Nodes (19): format, type, image, minimum, type, additionalProperties, properties, type (+11 more)

### Community 61 - "properties"
Cohesion: 0.11
Nodes (18): format, type, image, minimum, type, additionalProperties, properties, type (+10 more)

### Community 62 - "properties"
Cohesion: 0.11
Nodes (18): $ref, additionalProperties, properties, required, type, connectivity, $ref, ports (+10 more)

### Community 63 - "properties"
Cohesion: 0.11
Nodes (18): type, type, type, minLength, type, alwaysOn, hasSiren, hasSpeaker (+10 more)

### Community 64 - "properties"
Cohesion: 0.11
Nodes (18): format, type, image, minimum, type, additionalProperties, properties, type (+10 more)

### Community 65 - "measurementRange"
Cohesion: 0.13
Nodes (18): measurementRange, voltageRange, maximum, minimum, exclusiveMinimum, type, additionalProperties, properties (+10 more)

### Community 66 - "properties"
Cohesion: 0.11
Nodes (18): additionalProperties, minLength, properties, type, $ref, chip, minLength, type (+10 more)

### Community 67 - "properties"
Cohesion: 0.11
Nodes (18): type, exclusiveMinimum, type, additionalProperties, properties, required, type, colour (+10 more)

### Community 68 - "devDependencies"
Cohesion: 0.12
Nodes (17): ajv, devDependencies, ajv, prettier, tailwindcss, @tailwindcss/postcss, @types/mdx, @types/node (+9 more)

### Community 69 - "dependencies"
Cohesion: 0.12
Nodes (17): cnfast, fumadocs-core, fumadocs-mdx, fumadocs-ui, lucide-react, dependencies, cnfast, fumadocs-core (+9 more)

### Community 70 - "$ref"
Cohesion: 0.13
Nodes (17): items, type, items, type, items, type, items, type (+9 more)

### Community 71 - "id"
Cohesion: 0.12
Nodes (17): additionalProperties, properties, type, chip, minLength, type, minLength, type (+9 more)

### Community 72 - "measurement"
Cohesion: 0.12
Nodes (17): measurement, g, mm, unit, value, additionalProperties, properties, required (+9 more)

### Community 73 - "required"
Cohesion: 0.15
Nodes (17): additionalProperties, required, type, audio, ipadAudio, additionalProperties, required, type (+9 more)

### Community 74 - "properties"
Cohesion: 0.12
Nodes (17): anyOf, anyOf, anyOf, anyOf, properties, anyOf, bluetooth, cellular (+9 more)

### Community 75 - "properties"
Cohesion: 0.12
Nodes (17): $ref, $ref, $ref, $ref, properties, type, $ref, audio (+9 more)

### Community 76 - "properties"
Cohesion: 0.12
Nodes (17): iphoneResistance, type, additionalProperties, properties, type, pattern, type, dustProtected (+9 more)

### Community 77 - "properties"
Cohesion: 0.12
Nodes (17): properties, $ref, enum, pattern, type, minimum, type, id (+9 more)

### Community 78 - "id"
Cohesion: 0.12
Nodes (17): minLength, type, port, minimum, type, minLength, type, additionalProperties (+9 more)

### Community 79 - "properties"
Cohesion: 0.12
Nodes (17): minimum, type, additionalProperties, properties, required, type, camera, role (+9 more)

### Community 80 - "$ref"
Cohesion: 0.12
Nodes (17): type, items, type, items, type, $ref, properties, items (+9 more)

### Community 81 - "docs/layout.tsx"
Cohesion: 0.14
Nodes (10): baseLayoutOptions, catalogTabs, catalogTree, glassLayoutOptions, homeLayoutOptions, GlassAccountHeader(), baseOptions(), catalogCategories (+2 more)

### Community 82 - "enum"
Cohesion: 0.12
Nodes (16): properties, enum, type, other, enum, type, category, kind (+8 more)

### Community 83 - "properties"
Cohesion: 0.12
Nodes (16): properties, minLength, type, minLength, type, minLength, type, properties (+8 more)

### Community 84 - "properties"
Cohesion: 0.12
Nodes (16): properties, $ref, items, minItems, type, minLength, type, $ref (+8 more)

### Community 85 - "properties"
Cohesion: 0.12
Nodes (16): additionalProperties, properties, type, exclusiveMinimum, type, exclusiveMinimum, type, $ref (+8 more)

### Community 86 - "properties"
Cohesion: 0.12
Nodes (16): properties, minimum, type, minLength, type, minimum, type, exclusiveMinimum (+8 more)

### Community 87 - "properties"
Cohesion: 0.12
Nodes (16): format, type, minimum, type, properties, minLength, type, minLength (+8 more)

### Community 88 - "properties"
Cohesion: 0.12
Nodes (16): minimum, type, $ref, ipadBatteryAndPower, type, additionalProperties, properties, type (+8 more)

### Community 89 - "mac.schema.json"
Cohesion: 0.12
Nodes (15): additionalProperties, items, type, $id, $ref, items, type, items (+7 more)

### Community 90 - "properties"
Cohesion: 0.12
Nodes (16): additionalProperties, properties, type, audio, type, minLength, type, microphone (+8 more)

### Community 91 - "properties"
Cohesion: 0.12
Nodes (16): $ref, $ref, $ref, type, $ref, $ref, properties, audio (+8 more)

### Community 92 - "required"
Cohesion: 0.12
Nodes (16): panel, referenceMode, name, additionalProperties, required, type, additionalProperties, required (+8 more)

### Community 93 - "properties"
Cohesion: 0.14
Nodes (16): properties, const, properties, type, pattern, type, type, category (+8 more)

### Community 94 - "properties"
Cohesion: 0.14
Nodes (16): properties, const, properties, type, pattern, type, type, category (+8 more)

### Community 95 - "properties"
Cohesion: 0.12
Nodes (16): format, type, minimum, type, properties, minLength, type, minLength (+8 more)

### Community 96 - "[[...slug]]/page.tsx"
Cohesion: 0.23
Nodes (14): CatalogRouteBoundary(), docsPageOptions, generateMetadata(), generateStaticParams(), Page(), getMDXComponents(), MDXProvidedComponents, useMDXComponents (+6 more)

### Community 97 - "properties"
Cohesion: 0.13
Nodes (15): properties, minLength, type, minLength, type, type, exclusiveMinimum, type (+7 more)

### Community 98 - "$defs"
Cohesion: 0.13
Nodes (15): additionalProperties, required, type, additionalProperties, type, $defs, accessory, appleTVDevice (+7 more)

### Community 99 - "properties"
Cohesion: 0.14
Nodes (15): properties, pattern, type, items, type, minLength, type, minLength (+7 more)

### Community 100 - "properties"
Cohesion: 0.13
Nodes (15): format, type, minimum, type, properties, type, minLength, type (+7 more)

### Community 101 - "sourceNotes"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, required, type, configurationConnectivity, type, minLength, type (+7 more)

### Community 102 - "properties"
Cohesion: 0.13
Nodes (15): port, kind, minLength, type, additionalProperties, properties, required, type (+7 more)

### Community 103 - "properties"
Cohesion: 0.13
Nodes (15): wireless, minLength, type, mimo, purpose, supported, version, minLength (+7 more)

### Community 104 - "properties"
Cohesion: 0.13
Nodes (15): $ref, additionalProperties, properties, required, type, connectivity, ports, items (+7 more)

### Community 105 - "properties"
Cohesion: 0.13
Nodes (15): properties, type, type, minLength, type, formats, microphone, microphoneConfiguration (+7 more)

### Community 106 - "cpuCores"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, required, type, cpuCores, minimum, type, total (+7 more)

### Community 107 - "measurement"
Cohesion: 0.13
Nodes (15): measurement, unit, value, additionalProperties, properties, required, type, qualifier (+7 more)

### Community 108 - "id"
Cohesion: 0.13
Nodes (15): port, minLength, type, kind, minLength, type, additionalProperties, properties (+7 more)

### Community 109 - "minLength"
Cohesion: 0.17
Nodes (15): items, type, items, type, minLength, type, items, items (+7 more)

### Community 110 - "properties"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, type, minimum, type, minimum, type, $ref (+7 more)

### Community 111 - "properties"
Cohesion: 0.13
Nodes (15): enum, type, memory, GB, TB, additionalProperties, properties, type (+7 more)

### Community 112 - "id"
Cohesion: 0.14
Nodes (15): minimum, type, minLength, type, minLength, type, type, properties (+7 more)

### Community 113 - "properties"
Cohesion: 0.13
Nodes (15): minimum, type, minimum, type, type, minimum, type, minimum (+7 more)

### Community 114 - "cpuCores"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, required, type, cpuCores, minimum, type, total (+7 more)

### Community 115 - "properties"
Cohesion: 0.13
Nodes (15): minLength, type, minimum, type, properties, kind, maxPowerW, quantity (+7 more)

### Community 116 - "properties"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, type, items, minItems, type, uniqueItems, compatibility (+7 more)

### Community 117 - "properties"
Cohesion: 0.13
Nodes (15): minimum, type, minimum, type, type, minimum, type, minimum (+7 more)

### Community 118 - "cpuCores"
Cohesion: 0.13
Nodes (15): additionalProperties, properties, required, type, cpuCores, minimum, type, total (+7 more)

### Community 119 - "[[...slug]]/route.ts"
Cohesion: 0.17
Nodes (10): { GET }, GET(), revalidate, generateStaticParams(), GET(), revalidate, revalidate, getLLMText() (+2 more)

### Community 120 - "minLength"
Cohesion: 0.18
Nodes (14): items, type, items, type, minLength, type, items, type (+6 more)

### Community 121 - "$ref"
Cohesion: 0.16
Nodes (14): items, type, items, type, $ref, properties, components, dimensions (+6 more)

### Community 122 - "properties"
Cohesion: 0.14
Nodes (14): resistance, type, minLength, type, dustProtected, ipRating, sweatResistant, waterDepthM (+6 more)

### Community 123 - "required"
Cohesion: 0.16
Nodes (14): required, gps, ports, uwb, wifi, infrared, nearFieldCommunication, thread (+6 more)

### Community 124 - "required"
Cohesion: 0.16
Nodes (14): ipadDisplay, additionalProperties, required, type, pixelsPerInch, resolutionHeightPx, resolutionWidthPx, sizeIn (+6 more)

### Community 125 - "enum"
Cohesion: 0.19
Nodes (14): DRAM, keyboard, NAND cache, other, side button, top button, unified, enum (+6 more)

### Community 126 - "$ref"
Cohesion: 0.16
Nodes (14): items, type, items, type, items, type, properties, $ref (+6 more)

### Community 127 - "properties"
Cohesion: 0.14
Nodes (14): type, $ref, $ref, $ref, exclusiveMinimum, type, properties, adaptiveSync (+6 more)

### Community 128 - "properties"
Cohesion: 0.14
Nodes (14): format, type, const, const, properties, minLength, type, pattern (+6 more)

### Community 129 - "properties"
Cohesion: 0.14
Nodes (14): format, type, minimum, type, properties, type, type, appleUrl (+6 more)

### Community 130 - "properties"
Cohesion: 0.14
Nodes (14): format, type, minimum, type, properties, type, type, appleUrl (+6 more)

### Community 131 - "sourceNotes"
Cohesion: 0.14
Nodes (14): type, opticId, minLength, type, additionalProperties, properties, required, type (+6 more)

### Community 132 - "boxItem"
Cohesion: 0.15
Nodes (13): quantity, additionalProperties, properties, required, type, boxItem, minLength, type (+5 more)

### Community 133 - "properties"
Cohesion: 0.15
Nodes (13): properties, $ref, minLength, type, fastCharge, portId, wiredFastCharge, wirelessCharging (+5 more)

### Community 134 - "gps"
Cohesion: 0.15
Nodes (13): gps, additionalProperties, properties, $ref, required, type, type, type (+5 more)

### Community 135 - "properties"
Cohesion: 0.15
Nodes (13): type, type, type, type, type, type, properties, consumptionW (+5 more)

### Community 136 - "powerSupply"
Cohesion: 0.15
Nodes (13): powerSupply, additionalProperties, required, type, power, hasExternalPowerAdapter, additionalProperties, required (+5 more)

### Community 137 - "type"
Cohesion: 0.15
Nodes (13): items, type, items, type, items, type, items, type (+5 more)

### Community 138 - "$defs"
Cohesion: 0.15
Nodes (13): $defs, iphoneDevice, iphoneMediaEngine, iphonePhysical, iphoneSwatch, additionalProperties, type, additionalProperties (+5 more)

### Community 139 - "properties"
Cohesion: 0.15
Nodes (13): minLength, type, minLength, type, minimum, type, colourSpace, name (+5 more)

### Community 140 - "$defs"
Cohesion: 0.15
Nodes (13): additionalProperties, type, $defs, configuration, identifier, image, product, pattern (+5 more)

### Community 141 - "required"
Cohesion: 0.15
Nodes (13): electrical, additionalProperties, required, type, frequencyMaximumHz, frequencyMinimumHz, maximumAltitudeMetres, maximumLineVoltage (+5 more)

### Community 142 - "refreshRateLimitation"
Cohesion: 0.15
Nodes (13): refreshRateLimitation, minLength, type, minimum, type, deviceChip, maximumRefreshRateHz, additionalProperties (+5 more)

### Community 143 - "resolution"
Cohesion: 0.15
Nodes (13): resolution, minimum, type, minimum, type, heightPx, pixelsPerInch, widthPx (+5 more)

### Community 144 - "properties"
Cohesion: 0.15
Nodes (13): additionalProperties, properties, type, audio, type, minLength, type, microphone (+5 more)

### Community 145 - "connectivity"
Cohesion: 0.15
Nodes (13): additionalProperties, properties, type, additionalProperties, properties, type, connectivity, type (+5 more)

### Community 146 - "physical"
Cohesion: 0.17
Nodes (12): items, type, physical, $ref, additionalProperties, properties, required, type (+4 more)

### Community 147 - "apple-tv.schema.json"
Cohesion: 0.17
Nodes (11): additionalProperties, items, minItems, type, $id, properties, devices, required (+3 more)

### Community 148 - "apple-watch.schema.json"
Cohesion: 0.17
Nodes (11): additionalProperties, items, minItems, type, $id, properties, devices, required (+3 more)

### Community 149 - "runtime"
Cohesion: 0.17
Nodes (12): minLength, type, runtime, exclusiveMinimum, type, hours, activity, hours (+4 more)

### Community 150 - "properties"
Cohesion: 0.17
Nodes (12): properties, exclusiveMinimum, type, minLength, type, items, type, colorPriceAud (+4 more)

### Community 151 - "$defs"
Cohesion: 0.17
Nodes (12): $defs, homePod, image, software, swatch, additionalProperties, type, additionalProperties (+4 more)

### Community 152 - "properties"
Cohesion: 0.17
Nodes (12): physicalComponent, items, type, additionalProperties, properties, type, dimensions, weight (+4 more)

### Community 153 - "enum"
Cohesion: 0.24
Nodes (12): FaceTime, front, input-accessory, rear-telephoto, rear-ultrawide, rear-wide, spatial, role (+4 more)

### Community 154 - "id"
Cohesion: 0.17
Nodes (12): exclusiveMinimum, type, pattern, type, items, type, properties, colorPriceAud (+4 more)

### Community 155 - "sourceNotes"
Cohesion: 0.17
Nodes (12): properties, exclusiveMinimum, type, items, type, colorPriceAud, images, sourceNotes (+4 more)

### Community 156 - "brightness"
Cohesion: 0.17
Nodes (12): additionalProperties, properties, required, type, brightness, minimum, type, hdrPeakNits (+4 more)

### Community 157 - "properties"
Cohesion: 0.17
Nodes (12): properties, minimum, type, type, type, maximum, minimum, type (+4 more)

### Community 158 - "required"
Cohesion: 0.17
Nodes (12): audio, required, camera, compatibility, connections, current, electrical, introducedYear (+4 more)

### Community 159 - "swatch"
Cohesion: 0.17
Nodes (12): kind, value, const, kind, swatch, value, additionalProperties, properties (+4 more)

### Community 160 - "source"
Cohesion: 0.17
Nodes (12): type, localHtmlPath, source, styleUrl, url, additionalProperties, properties, type (+4 more)

### Community 161 - "swatch"
Cohesion: 0.17
Nodes (12): kind, value, const, kind, swatch, value, additionalProperties, properties (+4 more)

### Community 162 - "minLength"
Cohesion: 0.21
Nodes (12): items, items, type, minLength, type, items, type, formats (+4 more)

### Community 163 - "properties"
Cohesion: 0.17
Nodes (12): additionalProperties, properties, type, minimum, type, minimum, type, $ref (+4 more)

### Community 164 - "properties"
Cohesion: 0.17
Nodes (12): additionalProperties, properties, required, type, configuration, minimum, type, priceAud (+4 more)

### Community 165 - "sensor"
Cohesion: 0.17
Nodes (12): sensor, name, minLength, type, name, purpose, minLength, type (+4 more)

### Community 166 - "airpods.schema.json"
Cohesion: 0.18
Nodes (10): additionalProperties, items, minItems, type, $id, properties, devices, $schema (+2 more)

### Community 167 - "required"
Cohesion: 0.18
Nodes (11): required, chips, inTheBox, audioTechnologies, batteryAndCharging, cases, controls, formFactor (+3 more)

### Community 168 - "properties"
Cohesion: 0.18
Nodes (11): additionalProperties, properties, type, $ref, configuration, minimum, type, connectivity (+3 more)

### Community 169 - "required"
Cohesion: 0.36
Nodes (11): required, required, batteryCapacityMah, batteryCapacityWhr, hasBattery, powerSupply, required, required (+3 more)

### Community 170 - "software"
Cohesion: 0.27
Nodes (11): software, additionalProperties, required, type, compatibleOperatingSystems, required, required, builtInApps (+3 more)

### Community 171 - "homepod.schema.json"
Cohesion: 0.18
Nodes (10): additionalProperties, items, type, $id, properties, devices, required, $schema (+2 more)

### Community 172 - "inputVoltageRangeV"
Cohesion: 0.18
Nodes (11): additionalProperties, properties, required, type, maximum, minimum, type, type (+3 more)

### Community 173 - "ipad.schema.json"
Cohesion: 0.18
Nodes (10): additionalProperties, items, minItems, type, $id, properties, devices, $schema (+2 more)

### Community 174 - "properties"
Cohesion: 0.18
Nodes (11): exclusiveMinimum, type, type, items, type, properties, colorPriceAud, displayName (+3 more)

### Community 175 - "enum"
Cohesion: 0.44
Nodes (11): enum, Face ID, none, Optic ID, passcode, password, Touch ID, enum (+3 more)

### Community 176 - "enum"
Cohesion: 0.22
Nodes (11): LCD, LED-backlit LCD, micro-OLED, OLED, tandem OLED, enum, panelKind, LCD (+3 more)

### Community 177 - "iphone.schema.json"
Cohesion: 0.18
Nodes (10): additionalProperties, items, minItems, type, $id, properties, devices, $schema (+2 more)

### Community 178 - "type"
Cohesion: 0.18
Nodes (11): items, type, items, items, type, items, type, type (+3 more)

### Community 179 - "connectivity"
Cohesion: 0.18
Nodes (11): additionalProperties, properties, required, type, connectivity, ports, type, ports (+3 more)

### Community 180 - "backlight"
Cohesion: 0.18
Nodes (11): additionalProperties, properties, required, type, backlight, minimum, type, localDimmingZones (+3 more)

### Community 181 - "camera"
Cohesion: 0.18
Nodes (11): additionalProperties, properties, type, type, camera, type, minimum, type (+3 more)

### Community 182 - "source"
Cohesion: 0.18
Nodes (11): source, kind, url, kind, url, additionalProperties, properties, required (+3 more)

### Community 183 - "properties"
Cohesion: 0.18
Nodes (11): const, items, minItems, type, properties, group, products, sources (+3 more)

### Community 184 - "properties"
Cohesion: 0.20
Nodes (10): items, type, const, type, minLength, type, builtInApps, operatingSystem (+2 more)

### Community 185 - "required"
Cohesion: 0.20
Nodes (10): watchDetails, additionalProperties, required, type, alwaysOn, caseSizes, hasSiren, hasSpeaker (+2 more)

### Community 186 - "wireless"
Cohesion: 0.20
Nodes (10): wireless, minLength, type, mimo, standards, items, type, additionalProperties (+2 more)

### Community 187 - "properties"
Cohesion: 0.20
Nodes (10): additionalProperties, properties, type, minLength, type, minLength, type, accessory (+2 more)

### Community 188 - "bluetooth"
Cohesion: 0.20
Nodes (10): additionalProperties, properties, required, type, bluetooth, version, minLength, type (+2 more)

### Community 189 - "wifi"
Cohesion: 0.20
Nodes (10): standards, wifi, items, type, additionalProperties, properties, required, type (+2 more)

### Community 190 - "properties"
Cohesion: 0.20
Nodes (10): items, type, items, type, properties, components, dimensions, weights (+2 more)

### Community 191 - "ipadAuthentication"
Cohesion: 0.20
Nodes (10): ipadAuthentication, additionalProperties, properties, type, items, type, uniqueItems, methods (+2 more)

### Community 192 - "required"
Cohesion: 0.29
Nodes (10): ipadResistance, additionalProperties, required, type, dustProtected, ipRating, splashPressureAtm, sweatResistant (+2 more)

### Community 193 - "required"
Cohesion: 0.29
Nodes (10): required, cpuCores, family, gpuCores, memoryBandwidthGbps, neuralEngineCores, iphoneChip, additionalProperties (+2 more)

### Community 194 - "properties"
Cohesion: 0.20
Nodes (10): type, iphoneSoftware, additionalProperties, properties, type, type, type, builtInApps (+2 more)

### Community 195 - "properties"
Cohesion: 0.20
Nodes (10): minLength, type, properties, minimum, type, chipId, priceAud, storageId (+2 more)

### Community 196 - "apple-display.schema.json"
Cohesion: 0.20
Nodes (9): additionalProperties, $id, group, required, $schema, title, type, products (+1 more)

### Community 197 - "glassOptions"
Cohesion: 0.22
Nodes (10): enum, items, minItems, type, uniqueItems, enum, glass, glassOptions (+2 more)

### Community 198 - "accessory"
Cohesion: 0.20
Nodes (10): additionalProperties, type, additionalProperties, type, $defs, accessory, color, image (+2 more)

### Community 199 - "vision.schema.json"
Cohesion: 0.20
Nodes (9): additionalProperties, items, type, $id, properties, devices, $schema, title (+1 more)

### Community 200 - "device-notes.ts"
Cohesion: 0.29
Nodes (9): defaultDeviceNote(), DeviceNote, DeviceNoteStatus, deviceNoteStatuses, getDeviceNote(), getDeviceNotes(), isDeviceNoteStatus(), notesRoot (+1 more)

### Community 201 - "storage"
Cohesion: 0.22
Nodes (9): minimum, type, storage, capacityGb, additionalProperties, properties, required, type (+1 more)

### Community 202 - "iphoneAuthentication"
Cohesion: 0.31
Nodes (9): required, required, methods, primaryMethod, iphoneAuthentication, additionalProperties, required, type (+1 more)

### Community 203 - "technology"
Cohesion: 0.22
Nodes (9): display, additionalProperties, required, type, display, additionalProperties, required, type (+1 more)

### Community 204 - "required"
Cohesion: 0.22
Nodes (9): ipadConnectivity, additionalProperties, required, type, cellular, gps, ports, uwb (+1 more)

### Community 205 - "sourceNotes"
Cohesion: 0.22
Nodes (9): ipadSoftware, additionalProperties, properties, type, type, operatingSystem, operatingSystemVersionAtLaunch, sourceNotes (+1 more)

### Community 206 - "id"
Cohesion: 0.22
Nodes (9): megapixels, required, required, id, kinds, role, required, centerStage (+1 more)

### Community 207 - "sourceNotes"
Cohesion: 0.22
Nodes (9): properties, items, type, uniqueItems, methods, placement, primaryMethod, sourceNotes (+1 more)

### Community 208 - "$ref"
Cohesion: 0.22
Nodes (9): items, minItems, type, $ref, items, minItems, type, configurations (+1 more)

### Community 209 - "apple-pencil.schema.json"
Cohesion: 0.22
Nodes (8): additionalProperties, const, $id, properties, group, $schema, title, type

### Community 210 - "accessories"
Cohesion: 0.22
Nodes (9): items, minItems, type, items, type, items, $ref, accessories (+1 more)

### Community 211 - "compatibleDeviceIds"
Cohesion: 0.22
Nodes (9): items, type, items, type, uniqueItems, pattern, type, capabilities (+1 more)

### Community 212 - "source"
Cohesion: 0.25
Nodes (9): localHtmlPath, styleUrl, url, required, url, source, additionalProperties, required (+1 more)

### Community 213 - "magic-keyboard.schema.json"
Cohesion: 0.22
Nodes (8): additionalProperties, const, $id, properties, group, $schema, title, type

### Community 214 - "accessories"
Cohesion: 0.22
Nodes (9): items, minItems, type, items, type, items, $ref, accessories (+1 more)

### Community 215 - "compatibleDeviceIds"
Cohesion: 0.22
Nodes (9): items, type, items, type, uniqueItems, pattern, type, capabilities (+1 more)

### Community 216 - "properties"
Cohesion: 0.22
Nodes (9): type, localHtmlPath, styleUrl, url, properties, format, type, format (+1 more)

### Community 217 - "properties"
Cohesion: 0.22
Nodes (9): additionalProperties, properties, type, authentication, $ref, minLength, type, opticId (+1 more)

### Community 218 - "properties"
Cohesion: 0.22
Nodes (9): physicalComponent, additionalProperties, properties, type, weight, weightUnit, type, minLength (+1 more)

### Community 219 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, check:catalog-routes, dev, format, prepare, start, types:check

### Community 220 - "items"
Cohesion: 0.29
Nodes (8): items, type, items, type, minLength, type, cases, inTheBox

### Community 221 - "bluetooth"
Cohesion: 0.25
Nodes (8): additionalProperties, properties, required, type, bluetooth, version, minLength, type

### Community 222 - "cellular"
Cohesion: 0.25
Nodes (8): additionalProperties, properties, $ref, required, type, cellular, cellular, technologies

### Community 223 - "thread"
Cohesion: 0.25
Nodes (8): supported, thread, type, additionalProperties, properties, required, type, supported

### Community 224 - "authentication"
Cohesion: 0.29
Nodes (7): additionalProperties, properties, type, authentication, minLength, type, primaryMethod

### Community 225 - "properties"
Cohesion: 0.29
Nodes (7): minLength, type, properties, kind, quantity, minimum, type

### Community 226 - "properties"
Cohesion: 0.29
Nodes (7): additionalProperties, properties, type, connectivity, items, type, ports

### Community 227 - "accessory"
Cohesion: 0.29
Nodes (7): additionalProperties, type, $defs, accessory, image, additionalProperties, type

### Community 228 - "wifi"
Cohesion: 0.29
Nodes (7): standards, wifi, items, type, additionalProperties, properties, type

### Community 229 - "enum"
Cohesion: 0.40
Nodes (6): enum, USB-C, enum, type, port, Lightning

### Community 230 - "uwb"
Cohesion: 0.33
Nodes (6): chip, uwb, additionalProperties, required, type, secondGeneration

### Community 231 - "runtime"
Cohesion: 0.33
Nodes (6): runtime, activity, hours, additionalProperties, required, type

### Community 232 - "enum"
Cohesion: 0.40
Nodes (5): enum, type, formFactor, in-ear, over-ear

### Community 233 - "devices"
Cohesion: 0.40
Nodes (5): required, required, required, devices, required

### Community 234 - "required"
Cohesion: 0.40
Nodes (5): required, id, label, format, hasAlpha

### Community 235 - "validate-data.mjs"
Cohesion: 0.40
Nodes (3): ajv, datasets, report

### Community 236 - "package.json"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 237 - "bluetooth"
Cohesion: 0.50
Nodes (4): bluetooth, required, ports, wifi

### Community 238 - "releaseYear"
Cohesion: 0.50
Nodes (4): releaseYear, maximum, minimum, type

### Community 239 - "releaseYear"
Cohesion: 0.50
Nodes (4): releaseYear, maximum, minimum, type

### Community 240 - "connections"
Cohesion: 0.50
Nodes (4): items, minItems, type, connections

### Community 241 - "images"
Cohesion: 0.50
Nodes (4): items, minItems, type, images

### Community 242 - "inTheBox"
Cohesion: 0.50
Nodes (4): items, minItems, type, inTheBox

### Community 243 - "enum"
Cohesion: 0.50
Nodes (4): enum, announcement, store, technical-specifications

### Community 244 - "maximumRelativeHumidityPercent"
Cohesion: 0.50
Nodes (4): maximum, minimum, type, maximumRelativeHumidityPercent

### Community 245 - "referenceModes"
Cohesion: 0.50
Nodes (4): referenceModes, items, minItems, type

### Community 246 - "refreshRateLimitations"
Cohesion: 0.50
Nodes (4): refreshRateLimitations, items, minItems, type

### Community 247 - "type"
Cohesion: 0.50
Nodes (4): null, minimum, type, priceAud

### Community 248 - "type"
Cohesion: 0.50
Nodes (4): null, minimum, type, priceAud

### Community 251 - "charging"
Cohesion: 0.67
Nodes (3): additionalProperties, type, charging

### Community 252 - "fullScreenHdrBrightnessNits"
Cohesion: 0.67
Nodes (3): exclusiveMinimum, type, fullScreenHdrBrightnessNits

### Community 253 - "hdrPeakBrightnessNits"
Cohesion: 0.67
Nodes (3): exclusiveMinimum, type, hdrPeakBrightnessNits

### Community 254 - "minimumBrightnessNits"
Cohesion: 0.67
Nodes (3): minimum, type, minimumBrightnessNits

### Community 255 - "panelKind"
Cohesion: 0.67
Nodes (3): minLength, type, panelKind

### Community 256 - "pixelsPerInch"
Cohesion: 0.67
Nodes (3): exclusiveMinimum, type, pixelsPerInch

### Community 257 - "refreshRateHz"
Cohesion: 0.67
Nodes (3): refreshRateHz, exclusiveMinimum, type

### Community 258 - "resolutionHeightPx"
Cohesion: 0.67
Nodes (3): resolutionHeightPx, minimum, type

### Community 259 - "resolutionWidthPx"
Cohesion: 0.67
Nodes (3): resolutionWidthPx, minimum, type

### Community 260 - "sdrPeakBrightnessNits"
Cohesion: 0.67
Nodes (3): sdrPeakBrightnessNits, exclusiveMinimum, type

### Community 261 - "sizeIn"
Cohesion: 0.67
Nodes (3): sizeIn, exclusiveMinimum, type

### Community 262 - "systems"
Cohesion: 0.67
Nodes (3): systems, items, type

### Community 263 - "technology"
Cohesion: 0.67
Nodes (3): technology, minLength, type

### Community 264 - "type"
Cohesion: 0.67
Nodes (3): minimum, type, batteryCapacityMah

### Community 265 - "ports"
Cohesion: 0.67
Nodes (3): items, type, ports

### Community 266 - "cameras"
Cohesion: 0.67
Nodes (3): items, type, cameras

### Community 267 - "chips"
Cohesion: 0.67
Nodes (3): items, type, chips

### Community 268 - "colors"
Cohesion: 0.67
Nodes (3): items, type, colors

### Community 269 - "configurations"
Cohesion: 0.67
Nodes (3): items, type, configurations

### Community 270 - "displays"
Cohesion: 0.67
Nodes (3): items, type, displays

### Community 271 - "memoryOptions"
Cohesion: 0.67
Nodes (3): items, type, memoryOptions

### Community 272 - "overviewImages"
Cohesion: 0.67
Nodes (3): items, type, overviewImages

### Community 273 - "ports"
Cohesion: 0.67
Nodes (3): items, type, ports

### Community 274 - "storageOptions"
Cohesion: 0.67
Nodes (3): storageOptions, items, type

### Community 275 - "fullScreenHdrBrightnessNits"
Cohesion: 0.67
Nodes (3): minimum, type, fullScreenHdrBrightnessNits

### Community 276 - "outputVoltageV"
Cohesion: 0.67
Nodes (3): minimum, type, outputVoltageV

### Community 277 - "resolutionWidthPx"
Cohesion: 0.67
Nodes (3): resolutionWidthPx, minimum, type

### Community 278 - "sdrPeakBrightnessNits"
Cohesion: 0.67
Nodes (3): sdrPeakBrightnessNits, minimum, type

### Community 279 - "technology"
Cohesion: 0.67
Nodes (3): technology, minLength, type

### Community 280 - "displayName"
Cohesion: 0.67
Nodes (3): minLength, type, displayName

### Community 281 - "frequencyMaximumHz"
Cohesion: 0.67
Nodes (3): minimum, type, frequencyMaximumHz

### Community 282 - "introducedYear"
Cohesion: 0.67
Nodes (3): minimum, type, introducedYear

### Community 283 - "maximumAltitudeMetres"
Cohesion: 0.67
Nodes (3): minimum, type, maximumAltitudeMetres

### Community 284 - "maximumLineVoltage"
Cohesion: 0.67
Nodes (3): minimum, type, maximumLineVoltage

### Community 285 - "minimumLineVoltage"
Cohesion: 0.67
Nodes (3): minimum, type, minimumLineVoltage

### Community 286 - "technicalSpecificationsUrl"
Cohesion: 0.67
Nodes (3): technicalSpecificationsUrl, format, type

### Community 287 - "outputPowerW"
Cohesion: 0.67
Nodes (3): minimum, type, outputPowerW

## Knowledge Gaps
- **1975 isolated node(s):** `AccountButtonProps`, `AuthSession`, `AuthUserResponse`, `BookmarkResponse`, `BookmarksResponse` (+1970 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 2001 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `displayName` connect `displayName` to `required`, `$defs`, `$defs`, `required`, `$defs`, `$defs`, `id`, `properties`, `$defs`, `required`, `$defs`, `dimensions`, `required`?**
  _High betweenness centrality (0.283) - this node is a cross-community bridge._
- **Why does `$defs` connect `$defs` to `gps`, `displayName`, `measurement`, `id`, `apple-watch.schema.json`, `runtime`, `dimensions`, `properties`, `software`, `enum`, `required`, `wireless`, `properties`, `measurementRange`, `technology`, `properties`, `bluetooth`, `cellular`, `authentication`, `properties`, `properties`, `charging`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `$defs` connect `$defs` to `properties`, `boxItem`, `apple-display.schema.json`, `properties`, `properties`, `required`, `refreshRateLimitation`, `required`, `resolution`, `backlight`, `camera`, `properties`, `source`, `properties`, `brightness`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **What connects `AccountButtonProps`, `AuthSession`, `AuthUserResponse` to the rest of the system?**
  _1975 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `number` be split into smaller, more focused modules?**
  _Cohesion score 0.05813953488372093 - nodes in this community are weakly interconnected._
- **Should `required` be split into smaller, more focused modules?**
  _Cohesion score 0.06736353077816493 - nodes in this community are weakly interconnected._
- **Should `properties` be split into smaller, more focused modules?**
  _Cohesion score 0.054878048780487805 - nodes in this community are weakly interconnected._
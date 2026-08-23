# Human-Readable Device Contract

Generated from `.scratch/strict/data-model-contract.schema.json`. Types show nullability explicitly. Nested `$ref` definitions are expanded in their own sections.

## Root

- `devices` — array of reference `productCollectionDiscriminator` — required
- Additional properties: disallowed

### measurement

- `value` — number | null — required

- `unit` — enum: `mm`, `cm`, `m`, `in`, `g`, `kg`, `oz`, `lb`, `nits`, `hz`, `w`, `v`, `a`, `mAh`, `Whr`, `hours`, `minutes`, `percent`, `GB`, `TB`, `Mbps`, `Gbps`, `dB SPL`, `atm` — required

- `qualifier` — string — optional

- Additional properties: disallowed

### measurementRange

- `minimum` — number — required

- `maximum` — number — required

- `unit` — enum: `mm`, `cm`, `m`, `in`, `g`, `kg`, `oz`, `lb`, `nits`, `hz`, `w`, `v`, `a`, `mAh`, `Whr`, `hours`, `minutes`, `percent`, `GB`, `TB`, `Mbps`, `Gbps`, `dB SPL`, `atm` — required

- `qualifier` — string — optional

- Additional properties: disallowed

### swatch

- Value must match exactly one of the following forms:
  - object
  - object

- Additional properties: allowed

### image

- `label` — string — required

- `appleUrl` — string — required

- `localPath` — string — required

- `widthPx` — integer — required

- `heightPx` — integer — required

- Additional properties: disallowed

### color

- `id` — string — required

- `displayName` — string — required

- `swatch` — reference `swatch` — required

- `images` — array of reference `image` — required

- `colorPriceAud` — number — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### storageOption

- `id` — string — required

- `displayName` — string — optional

- `capacityValue` — integer — required

- `capacityUnit` — enum: `GB`, `TB` — required

- `priceDeltaAud` — number — optional

- `availableColorIds` — array of string — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### memoryOption

- `id` — string — required

- `displayName` — string — optional

- `capacityValue` — integer — required

- `capacityUnit` — enum: `GB`, `TB` — required

- `kind` — enum: `unified`, `DRAM`, `NAND cache`, `other` — required

- `speedMbps` — integer — optional

- `speedUnit` — any — optional

- `configuration` — string — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### port

- `id` — string — required

- `kind` — enum: `USB-C`, `Thunderbolt 4`, `Thunderbolt 5`, `Lightning`, `HDMI`, `Ethernet RJ45`, `IR receiver`, `power connector`, `3.5 mm audio jack`, `Smart Connector`, `proprietary` — required

- `standard` — enum: `USB 2`, `USB 3.2 Gen 1`, `USB 4`, `Thunderbolt 3`, `Thunderbolt 4`, `Thunderbolt 5` — optional

- `quantity` — integer — optional

- `supportsDisplayOut` — boolean | null — optional

- `maxPowerW` — number | null — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### cpuCores

- `total` — integer — required

- `performance` — integer | null — required

- `efficiency` — integer | null — required

- Additional properties: disallowed

### mediaEngine

- `id` — string — required

- `displayName` — string — required

- `kinds` — array of enum: `video-decode`, `video-encode`, `ProRes encode-decode`, `image signal`, `AV1 decode`, `other` — required

- Additional properties: disallowed

### chip

- `id` — string — required

- `displayName` — string — required

- `family` — string — required

- `cpuCores` — reference `cpuCores` — required

- `gpuCores` — integer | null — required

- `neuralEngineCores` — integer | null — required

- `memoryBandwidthGbps` — number | null — required

- `cpuCoreConfiguration` — string — optional

- `neuralAccelerators` — boolean — optional

- `hardwareRayTracing` — boolean | null — optional

- `mediaEngines` — array of reference `mediaEngine` — optional

- `processNode` — string — optional

- `transistorCountBillions` — number | null — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### display

- `id` — string — required

- `technology` — string — required

- `panelKind` — enum: `LCD`, `LED-backlit LCD`, `OLED`, `tandem OLED`, `micro-OLED`, `other`, `null` — optional

- `sizeIn` — number | null — required

- `resolutionWidthPx` — integer | null — required

- `resolutionHeightPx` — integer | null — required

- `pixelsPerInch` — number | null — required

- `refreshRateHz` — number | null — optional

- `refreshRateRange` — reference `measurementRange` — optional

- `sdrPeakBrightnessNits` — number | null — optional

- `hdrPeakBrightnessNits` — number | null — optional

- `fullScreenHdrBrightnessNits` — number | null — optional

- `minimumBrightnessNits` — number | null — optional

- `trueTone` — boolean | null — optional

- `promotion` — boolean | null — optional

- `alwaysOn` — boolean | null — optional

- `wideColorP3` — boolean | null — optional

- `laminated` — boolean | null — optional

- `antireflective` — boolean | null — optional

- `nanoTextureOption` — boolean | null — optional

- `fingerprintResistantCoating` — boolean | null — optional

- `hoverSupport` — boolean | null — optional

- `mirroring` — boolean | null — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### camera

- `id` — string — required

- `role` — enum: `rear-wide`, `rear-ultrawide`, `rear-telephoto`, `front`, `FaceTime`, `spatial`, `input-accessory`, `other` — required

- `displayName` — string — required

- `megapixels` — number | null — required

- `opticalZoomMultiplier` — number | null — optional

- `apertureFNumber` — number | null — optional

- `sensorShiftOis` — boolean | null — optional

- `proRAW` — boolean | null — optional

- `spatialCapture` — boolean | null — optional

- `macro` — boolean | null — optional

- `centerStage` — boolean | null — optional

- `trueDepthSystem` — boolean | null — optional

- `videoMaxResolutionWidthPx` — integer | null — optional

- `videoMaxResolutionHeightPx` — integer | null — optional

- `videoMaxFrameRateHz` — number | null — optional

- `proRes` — boolean | null — optional

- `lidar` — boolean | null — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### audio

- `speaker` — boolean | null — required

- `microphone` — boolean | null — required

- `speakerConfiguration` — string — optional

- `microphoneConfiguration` — string — optional

- `siren` — boolean | null — optional

- `spatialAudio` — boolean | null — optional

- `adaptiveAudio` — boolean | null — optional

- `activeNoiseCancellation` — boolean | null — optional

- `transparency` — boolean | null — optional

- `formats` — array of string — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### batteryRuntime

- `id` — string — required

- `activity` — string — required

- `hours` — number | null — required

- `qualifier` — string — optional

- `network` — enum: `Wi-Fi`, `cellular`, `offline`, `null` — optional

- Additional properties: disallowed

### charging

- `portId` — string | null — required

- `wiredFastCharge` — boolean | null — required

- `wirelessCharging` — boolean | null — required

- `wirelessStandards` — object — required

- `fastChargeMinutesToPercent` — object with fields below | null — required
  - `minutes` — number — required
  - `percent` — number — required
  - Additional properties: disallowed

- `adapterPowerW` — number | null — required

- Additional properties: disallowed

### powerSupply

- `hasExternalPowerAdapter` — boolean | null — required

- `outputVoltageV` — number | null — required

- `outputCurrentA` — number | null — required

- `outputPowerW` — number | null — required

- `inputVoltageRangeV` — object with fields below | null — required
  - `minimum` — number — required
  - `maximum` — number — required
  - Additional properties: disallowed

- `frequencyHz` — number | null — required

- `consumptionW` — number | null — required

- Additional properties: disallowed

### batteryAndPower

- `hasBattery` — boolean — required

- `batteryCapacityMah` — number | null — required

- `batteryCapacityWhr` — number | null — required

- `runtimeHours` — array of reference `batteryRuntime` — required

- `charging` — reference `charging` — required

- `powerSupply` — reference `powerSupply` — required

- Additional properties: disallowed

### wifi

- `standards` — array of enum: `Wi-Fi 4`, `Wi-Fi 5`, `Wi-Fi 6`, `Wi-Fi 6E`, `Wi-Fi 7`, `Wi-Fi 8` — required

- `chip` — string — optional

- `MIMO` — string — optional

- `simultaneousDualBand` — boolean | null — optional

- Additional properties: disallowed

### bluetooth

- `version` — enum: `Bluetooth 4.0`, `Bluetooth 4.2`, `Bluetooth 5.0`, `Bluetooth 5.3`, `Bluetooth 5.4`, `Bluetooth 6.0` — required

- Additional properties: disallowed

### cellular

- `technologies` — array of enum: `LTE`, `5G sub-6`, `5G mmWave` — required

- `bands` — array of string — optional

- `eSIMOnly` — boolean | null — optional

- Additional properties: disallowed

### uwb

- `chip` — string — required

- `secondGeneration` — boolean | null — optional

- Additional properties: disallowed

### thread

- `supported` — boolean — required

- `role` — enum: `endpoint`, `border-router`, `both`, `null` — optional

- Additional properties: disallowed

### infrared

- `present` — boolean — required

- `purpose` — string | null — required

- Additional properties: disallowed

### nearFieldCommunication

- `present` — boolean — required

- `readWriteMode` — boolean | null — optional

- `backgroundTagReading` — boolean | null — optional

- Additional properties: disallowed

### gps

- `present` — boolean — required

- `precisionDualFrequency` — boolean | null — optional

- `systems` — array of enum: `GPS`, `GLONASS`, `Galileo`, `QZSS`, `BeiDou`, `NavIC` — optional

- Additional properties: disallowed

### connectivity

- `ports` — array of reference `port` — required

- `wifi` — object — required

- `bluetooth` — object — required

- `cellular` — object — required

- `uwb` — object — required

- `thread` — object — required

- `infrared` — object — required

- `nearFieldCommunication` — object — required

- `gps` — object — required

- Additional properties: disallowed

### authentication

- `methods` — array of enum: `Face ID`, `Touch ID`, `Optic ID`, `passcode`, `password`, `none` — required

- `primaryMethod` — enum: `Face ID`, `Touch ID`, `Optic ID`, `passcode`, `password`, `none` — required

- `placement` — enum: `top button`, `keyboard`, `side button`, `other`, `null` — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### physicalComponent

- `id` — string — required

- `displayName` — string — required

- `dimensions` — array of reference `measurement` — required

- `weight` — number | null — required

- `weightUnit` — enum: `g`, `kg`, `oz`, `lb`, `null` — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### physical

- `weights` — array of reference `measurement` — required

- `dimensions` — array of reference `measurement` — required

- `components` — array of reference `physicalComponent` — required

- Additional properties: disallowed

### accessoryReference

- `id` — string — required

- `displayName` — string — required

- `category` — enum: `Apple Pencil`, `keyboard`, `input`, `spatial`, `case`, `cable`, `adapter`, `remote`, `strap`, `seal`, `other` — required

- `capabilities` — array of string — optional

- Additional properties: disallowed

### resistance

- `ipRating` — string | null — required

- `waterDepthM` — number | null — required

- `splashPressureAtm` — number | null — required

- `dustProtected` — boolean | null — required

- `sweatResistant` — boolean | null — required

- Additional properties: disallowed

### software

- `operatingSystem` — string — required

- `operatingSystemVersionAtLaunch` — string | null — required

- `compatibleOperatingSystems` — array of string — optional

- `builtInApps` — array of string — required

- `sourceNotes` — string — optional

- Additional properties: disallowed

### configurationVariant

- `id` — string — required

- `displayName` — string — optional

- `colorIds` — array of string — optional

- `storageId` — string — optional

- `memoryIds` — array of string — optional

- `connectivity` — enum: `Wi-Fi`, `Wi-Fi + Cellular`, `Wi-Fi + Ethernet`, `wireless-only`, `null` — optional

- `caseSizeMm` — number | null — optional

- `chipId` — string — optional

- `priceAud` — number | null — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### watchDetails

- `caseSizes` — array of string — required

- `alwaysOn` — boolean — required

- `wideAngleDisplay` — boolean — required

- `u1UwbChip` — string | null — required

- `otherWirelessChip` — string | null — required

- `hasSpeaker` — boolean — required

- `hasSiren` — boolean — required

- `swimproofClassification` — string | null — required

- `completeSummary` — array of string — required

- Additional properties: disallowed

### overviewImage

- `label` — string — required

- `appleUrl` — string — required

- `localPath` — string — required

- `widthPx` — integer — required

- `heightPx` — integer — required

- Additional properties: disallowed

### airPodsImage

- `label` — string — required

- `appleUrl` — string — required

- `localPath` — string — required

- `widthPx` — integer — required

- `heightPx` — integer — required

- Additional properties: disallowed

### airPodsColor

- `name` — string — required

- `swatch` — string — required

- `images` — array of reference `airPodsImage` — required

- Additional properties: disallowed

### airPodsDevice

- `id` — string — required

- `name` — string — required

- `priceAud` — number | null — required

- `colors` — array of reference `airPodsColor` — required

- `summary` — array of string — required

- `formFactors` — array of object — required

- `audioTechnologies` — array of string — required

- `sensors` — array of string — required

- `chips` — array of string | object — required

- `microphones` — array of string — required

- `controls` — array of string — required

- `hearingHealth` — array of string | null — required

- `liveTranslation` — array of string | null — required

- `port` — string — required

- `batteryAndCharging` — array of string — required

- `ipRating` — string | null — required

- `connectivity` — array of string — required

- `inTheBox` — array of string — required

- Additional properties: disallowed

### device

- `id` — string — required

- `name` — string — required

- `family` — enum: `ipad`, `iphone`, `watch`, `mac`, `vision`, `tv`, `homepod` — optional

- `releaseYear` — integer — optional

- `priceAud` — number | null — optional

- `colors` — array of reference `color` — optional

- `configurations` — array of reference `configurationVariant` — optional

- `storageOptions` — array of reference `storageOption` — optional

- `memoryOptions` — array of reference `memoryOption` — optional

- `chips` — array of reference `chip` — optional

- `displays` — array of reference `display` — optional

- `cameras` — array of reference `camera` — optional

- `audio` — reference `audio` — optional

- `batteryAndPower` — reference `batteryAndPower` — optional

- `connectivity` — reference `connectivity` — optional

- `authentication` — reference `authentication` — optional

- `physical` — reference `physical` — optional

- `resistance` — reference `resistance` — optional

- `software` — reference `software` — optional

- `watchDetails` — reference `watchDetails` — optional

- `overviewImages` — array of reference `overviewImage` — optional

- `forceTouchTrackpad` — boolean | null — optional

- `backlitKeyboard` — boolean | null — optional

- `accessories` — array of reference `accessoryReference` — optional

- `sourceNotes` — string — optional

- Additional properties: disallowed

### productCollectionDiscriminator

- Value must match exactly one of the following forms:
  - reference `device`
  - reference `airPodsDevice`

- Additional properties: allowed

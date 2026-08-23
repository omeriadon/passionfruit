# Vision fields to extract

For every Apple Vision Pro model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The starting price, in AUD, when Apple shows one; otherwise omit `priceAud`.

## Colours and images

- Every colour name shown for the product or included accessories; when Apple names colours only in image descriptions, record those exact names with null swatches.
- Every swatch shown in the colour picker, linked to its colour name.
- Product images for each colour (Apple-hosted URLs), including relevant responsive variants per colour, accessory, and configuration.
- Where Apple shows a different price for a specific colour, record that colour's price in AUD. Omit `colorPriceAud` from colours that use the model-level starting price.

## Fit and sizing

- Interpupillary distance range as a functional sizing specification.
- Device weight range in grams and ounces.
- Weight qualifiers, including the separate battery weight when present.
- Included fit-related components: Light Seal, Light Seal Cushion, Audio Straps, and Dual Knit Band.

## Specifications

- Everything in the Summary section.
- Capacity as an array.
- Every display line, with video mirroring retained as a display capability.
- Both chips and all of their details.
- The complete camera section.
- The complete sensor list.
- Optic ID and all of its details.
- All audio technology lines.
- Supported audio playback formats.
- Supported video playback formats.
- All battery information.
- Wi-Fi standard.
- Bluetooth version.
- Operating system.
- Input methods.
- Supported input accessories.
- Supported spatial accessories.
- Interpupillary distance.
- Device weight and its configuration qualifier.
- Built-in app names only.
- Everything in the In the Box section, including duplicate adapter/cable groupings where Apple presents them separately.
- Electrical and environmental requirements.

## Exclusions

- Do not extract Accessibility.
- Do not extract system requirements.
- Do not extract Apple's environmental marketing narrative, materials, energy, packaging, waste, or smarter-chemistry content.
- Do not infer ports, connectors, U1/UWB chips, water resistance, or an IP rating when the supplied HTML does not state them.

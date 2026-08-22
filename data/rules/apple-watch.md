# Apple Watch fields to extract

For every Apple Watch model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The cheapest price, in AUD.

## Colours

- Every available colour name.
- The single-colour preview (the circle/swatch shown in the colour picker), linked to its colour name.
- Product images for each colour (Apple-hosted URLs), including relevant variants per size, colour, and configuration.
- Where Apple shows a different price for a specific colour, record that colour's price in AUD. Omit `priceAud` from colours that use the model-level starting price.

## Specifications

- Everything in the Summary section.
- Available case sizes as an array.
- Whether the display is always-on.
- Every display brightness item, bundled together as one entry; include minimum brightness where present.
- Wide-angle display capability when applicable.
- Weight.
- Thickness.
- Chip details.
- U1/UWB wireless chip details.
- Other wireless chip details.
- Whether it has a speaker.
- Whether it has a siren.
- All battery information.
- Water resistance depth.
- IP rating.

## Source requirement

- Do not extract any data until an Apple Watch DevTools HTML export exists in `data/tmp/`.

# iPhone fields to extract

For every iPhone model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The cheapest starting price, in AUD.

## Colours

- Every available colour name.
- The single-colour preview (the circle/swatch shown in the colour picker), linked to its colour name.
- Product images for each colour (Apple-hosted URLs), including relevant variants per colour and configuration.
- Where Apple shows a different price for a specific colour, record that colour's price in AUD. Omit `colorPriceAud` from colours that use the model-level starting price.

## Specifications

- Display size.
- Everything in the Summary section.
- Capacity as an array.
- Everything in the Display section.
- Whether the display is always-on.
- Weight.
- Chip details.
- Every rear camera, recording its name, megapixel count, optical zoom, whether ProRAW is supported, whether Spatial capture is supported, and whether Macro is supported.
- Front-camera megapixel count.
- All Power and Battery details.
- Crash Detection capability.
- Camera Control capability.
- Whether the model uses Face ID.
- Whether the model has LiDAR.
- Which port it has.

## Source requirement

- Do not extract any data until an iPhone DevTools HTML export exists in `data/tmp/`.

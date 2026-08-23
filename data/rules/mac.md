# Mac fields to extract

For every Mac model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The cheapest starting price, in AUD.

## Colours

- Every available colour name.
- The single-colour preview (the circle/swatch shown in the colour picker), linked to its colour name.
- Product images for each colour (Apple-hosted URLs), including relevant variants per colour and configuration.
- Where Apple shows a different price for a specific colour, record that colour's price in AUD. Omit `colorPriceAud` from colours that use the model-level starting price.

## Specifications

- Everything in the Quick Look section.
- Chip details, including every chip detail Apple provides.
- Memory details.
- Storage details.
- Everything in the Display section.
- Weight.
- Camera megapixel count and whether Centre Stage is supported.
- Sensible audio specifications, grouped so individual specifications remain distinguishable.
- Whether Touch ID is available.
- Whether the keyboard is backlit.
- Whether the trackpad supports Force Touch.
- Every supported wireless protocol.
- Every port, standardized to the shared port vocabulary.
- All Power and Battery details.

## Desktop power handling

- Do not infer laptop battery fields for desktop Macs.
- Record desktop power details using the same `power` array; omit `battery` when no battery applies.
- Record desktop power-supply or power-consumption details as entries in `power`, preserving Apple's wording and units.

## Source requirement

- Do not extract any data until a Mac DevTools HTML export exists in `data/tmp/`.

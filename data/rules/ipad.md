# iPad fields to extract

For every iPad model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The cheapest price, in AUD.

## Colours

- Every available colour name.
- The single-colour preview (the circle/swatch shown in the colour picker), linked to its colour name.
- Product images for each colour (Apple-hosted URLs), including relevant variants per size, colour, and configuration.

## Specifications

- Everything in the Summary section.
- Capacity as an array.
- Weight.
- Display: everything except "Fingerprint-resistant oleophobic coating". Bundle brightness items together as one entry.
- The chip.
- All the battery information.
- Authentication: Face ID, Touch ID, or Passcode.
- Which port it has.
- LiDAR scanner.

## Accessories (names only)

- Which Apple Pencil models it supports — not the sub-functions of each pencil.
- Which keyboards it supports — not their sub-functions.

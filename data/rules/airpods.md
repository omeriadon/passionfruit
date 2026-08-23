# AirPods fields to extract

For every AirPods model listed in the source HTML, extract:

## Identity and pricing

- Model name.
- The cheapest price, in AUD.

## Colours

- Every available colour name.
- The single-colour preview (the circle/swatch shown in the colour picker), linked to its colour name.
- Product images for each colour, using the largest fixed-canvas image shown by the source HTML.
- Where Apple shows a different price for a specific colour, record that colour's price in AUD as `colorPriceAud`. Omit `colorPriceAud` from colours that use the model-level starting price.

## Form factor and weight

- Earbud or over-ear form factor.
- Every earbud or ear-cup weight entry.
- Every charging-case or carrying-case form-factor entry.
- Every charging-case or carrying-case weight entry.

## Specifications

- Everything in the Quick Look section, verbatim.
- All audio technology entries except dual beamforming microphones.
- Sensor details, including H2, H1, or other chip details; exclude speech-detecting accelerometers and motion-detecting accelerometers.
- Microphone details other than dual beamforming microphones.
- All controls.
- Hearing health details where present.
- Live Translation details where present.
- Port and charging details.
- IP rating.
- Bluetooth version and any additional wireless connectivity details.
- All battery life, case battery, fast charge, and charging compatibility information.
- In-the-box accessory names.

## Exclusions

- Do not extract dimensions.
- Do not extract accessibility sections or features.
- Do not extract system requirements.

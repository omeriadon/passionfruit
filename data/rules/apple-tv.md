# Apple TV fields to extract

For every Apple TV model listed in the source HTML, extract:

## Identity and pricing

- Model name exactly as displayed.
- The starting price, in AUD, when present. Use `null` when the source omits it.

## Colours and images

- Every available colour name.
- Every colour swatch shown in the picker.
- Product images for each colour and configuration variant.
- Colour-specific prices when shown.
- Every image URL present in the supplied HTML, downloaded byte-for-byte and recorded with its dimensions plus original and local paths.

## Specifications

- Capacity and hardware configuration, distinguishing Wi-Fi and Wi-Fi + Ethernet variants.
- Size and weight per component or box where useful.
- Processor details.
- Connectivity, including HDMI, Wi-Fi, Bluetooth, Ethernet, Thread, infrared, power supply, and applicable footnoted capabilities.
- Siri Remote connectivity, charging port, battery behaviour, control methods, and physical controls.
- Complete audio-format support.
- Complete video-format support.
- Power and electrical requirements.
- In-the-box contents.
- Environmentally relevant specifications and materials.
- Accessibility features that are part of the product specification.

## Exclusions

- Do not extract System Requirements.
- Do not infer prices, colours, images, generations, or model numbers absent from the source.

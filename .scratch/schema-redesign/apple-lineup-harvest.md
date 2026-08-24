# Apple lineup harvest

This pass compared the current canonical data against Apple Australia product,
store, announcement, and technical-specification pages. It added two
independent datasets without changing the eight primary category contracts.

## Added datasets

- `public/data/other/airtag/airtag.json`
  - AirTag, second generation, introduced 2026.
  - One-pack and four-pack configurations, AUD prices, physical data, IP67
    resistance, Bluetooth/UWB/NFC, battery, Find My compatibility, images, and
    in-box contents.
- `public/data/other/apple-display/apple-display.json`
  - Studio Display and Studio Display XDR, with panel data, reference modes,
    camera/audio, connections, configurations, physical mounting variants,
    compatibility, electrical requirements, and in-box contents.

Both datasets use independent schemas and are included in
`scripts/validate-data.mjs`. No Intel Mac or Apple TV HD data was added.

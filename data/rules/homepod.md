# HomePod extraction rules

HomePod is one combined section. There is no compare-page export: extract `data/tmp/homepod/homepod.html` (HomePod mini technical specifications) and `data/tmp/homepod/homepod2.html` (HomePod 2nd generation technical specifications) together.

## Scope

- Extract exact model names, starting AUD prices where present, every colour name, every colour image URL, swatches where present, colour-specific AUD prices where shown, dimensions, weights, audio technology and drivers, microphones, sensors, chips and silicon capabilities, wireless/connectivity/Bluetooth/UWB details, controls/touch surfaces, electrical/power details, ports/cables/adapters, IP ratings where shown, compatibility/accessory names, and full battery details only where applicable.
- Preserve exact text and units, including alternate imperial measurements.
- Include both responsive product-image variants and metadata images found in the supplied HTML. Download every unique URL byte-for-byte and record original and local paths plus exact pixel dimensions.
- Record a null starting price or swatch when the supplied export does not expose that value; do not infer it from another page.
- Exclude accessibility features, system/setup requirements, environmental claims, footnotes, legal/regulatory text, subscription conditions, availability promises, navigation, structured-data metadata other than actual image URLs, and obvious marketing boilerplate.
- Audio sources are retained only as functional playback/sharing inputs. Compatibility records accessory/device names without dependency explanations.

## Output

- The canonical candidate is an isolated file at `/var/folders/s_/ms68q0zx137_d7r08rxtnp9w0000gq/T/opencode/homepod-extract/homepod.devices.json`.
- Staged images live under `/var/folders/s_/ms68q0zx137_d7r08rxtnp9w0000gq/T/opencode/homepod-extract/images/`, retaining source-relative directories.
- Do not modify unrelated sections, canonical datasets, or temporary input files while extracting HomePod.

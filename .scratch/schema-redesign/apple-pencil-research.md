# Apple Pencil evidence note

Checked 2026-08-23. The supplied `data/tmp/other/pencil.html` is an Australian Education Store snapshot of <https://www.apple.com/au-edu/shop/select-apple-pencil>. It is the primary source for the Pro and USB-C comparison data below. Current Apple AU store and support pages fill the 2nd-generation gaps and verify live prices.

## Prices

| Model | Current Apple AU retail | Current education price | Evidence |
| --- | ---: | ---: | --- |
| Apple Pencil Pro | A$219 | A$199 | [AU retail](https://www.apple.com/au/shop/product/mx2d3za/a/apple-pencil-pro), [AU Education](https://www.apple.com/au-edu/shop/product/mx2d3za/a/apple-pencil-pro) |
| Apple Pencil (USB-C) | A$139 | A$119 | [AU retail](https://www.apple.com/au/shop/product/muwa3za/a/apple-pencil-usb-c), [AU Education](https://www.apple.com/au-edu/shop/product/muwa3za/a/apple-pencil-usb-c) |
| Apple Pencil (2nd generation) | A$219 | A$199 | [AU retail](https://www.apple.com/au/shop/product/mxn43za/a/apple-pencil-2nd-generation), [AU Education](https://www.apple.com/au-edu/shop/product/mxn43za/a/apple-pencil-2nd-generation) |

The local HTML explicitly contains only the A$199 Pro and A$119 USB-C education prices. It links the 2nd-generation product as part `MXN43` but does not show its price.

## Capabilities

- **Apple Pencil Pro:** pixel-perfect precision, low latency, tilt and pressure sensitivity, magnetic attachment, wireless pairing and charging, hover, double-tap, barrel roll, squeeze, haptic feedback, Find My, and free engraving. [Apple AU comparison](https://www.apple.com/au/shop/select-apple-pencil) and [product page](https://www.apple.com/au/shop/product/mx2d3za/a/apple-pencil-pro).
- **Apple Pencil (USB-C):** pixel-perfect precision, low latency, tilt sensitivity, magnetic storage attachment, USB-C cable pairing/charging, and hover on supported iPads. It does not provide pressure sensitivity, double-tap, wireless charging, squeeze, barrel roll, haptics, Find My, or free engraving in Apple's comparison matrix. [Apple AU comparison](https://www.apple.com/au/shop/select-apple-pencil) and [product page](https://www.apple.com/au/shop/product/muwa3za/a/apple-pencil-usb-c).
- **Apple Pencil (2nd generation):** pixel-perfect precision, low latency, tilt and pressure sensitivity, magnetic attachment, wireless pairing/charging, double-tap, free engraving, and hover only with iPad Pro 12.9-inch (6th generation) and iPad Pro 11-inch (4th generation). [Apple Support tech specs](https://support.apple.com/en-au/111889), [Apple AU product page](https://www.apple.com/au/shop/product/mxn43za/a/apple-pencil-2nd-generation), and [Apple AU lineup description](https://www.apple.com/au/newsroom/2023/10/apple-introduces-new-apple-pencil-bringing-more-value-and-choice-to-the-lineup/).

## Compatibility mapped to repository IDs

Every Apple-listed model below resolves to an ID in `public/data/ipad/ipad.json`.

### Apple Pencil Pro — 11 IDs

- iPad Pro 13-inch (M5, M4): `ipad-pro-13-m5`, `ipad-pro-13-m4`
- iPad Pro 11-inch (M5, M4): `ipad-pro-11-m5`, `ipad-pro-11-m4`
- iPad Air 13-inch (M4, M3, M2): `ipad-air-13-m4`, `ipad-air-13-m3`, `ipad-air-13-m2`
- iPad Air 11-inch (M4, M3, M2): `ipad-air-11-m4`, `ipad-air-11-m3`, `ipad-air-11-m2`
- iPad mini (A17 Pro): `ipad-mini-a17-pro`

Sources: local HTML and [current Apple AU comparison page](https://www.apple.com/au/shop/select-apple-pencil).

### Apple Pencil (USB-C) — 24 IDs

- iPad Pro 13-inch (M5, M4): `ipad-pro-13-m5`, `ipad-pro-13-m4`
- iPad Pro 12.9-inch (6th–3rd generation): `ipad-pro-12-9-6th-gen`, `ipad-pro-12-9-5th-gen`, `ipad-pro-12-9-4th-gen`, `ipad-pro-12-9-3rd-gen`
- iPad Pro 11-inch (M5, M4): `ipad-pro-11-m5`, `ipad-pro-11-m4`
- iPad Pro 11-inch (4th–1st generation): `ipad-pro-11-4th-gen`, `ipad-pro-11-3rd-gen`, `ipad-pro-11-2nd-gen`, `ipad-pro-11-1st-gen`
- iPad Air 13-inch (M4, M3, M2): `ipad-air-13-m4`, `ipad-air-13-m3`, `ipad-air-13-m2`
- iPad Air 11-inch (M4, M3, M2): `ipad-air-11-m4`, `ipad-air-11-m3`, `ipad-air-11-m2`
- iPad Air (5th, 4th generation): `ipad-air-5th-generation`, `ipad-air-4th-generation`
- iPad (A16, 10th generation): `ipad-a16`, `ipad-10th-generation`
- iPad mini (A17 Pro, 6th generation): `ipad-mini-a17-pro`, `ipad-mini-6th-generation`

Sources: local HTML and [current Apple AU product compatibility list](https://www.apple.com/au/shop/product/muwa3za/a/apple-pencil-usb-c).

### Apple Pencil (2nd generation) — 11 IDs

- iPad Pro 12.9-inch (6th–3rd generation): `ipad-pro-12-9-6th-gen`, `ipad-pro-12-9-5th-gen`, `ipad-pro-12-9-4th-gen`, `ipad-pro-12-9-3rd-gen`
- iPad Pro 11-inch (4th–1st generation): `ipad-pro-11-4th-gen`, `ipad-pro-11-3rd-gen`, `ipad-pro-11-2nd-gen`, `ipad-pro-11-1st-gen`
- iPad Air (5th, 4th generation): `ipad-air-5th-generation`, `ipad-air-4th-generation`
- iPad mini (6th generation): `ipad-mini-6th-generation`

Sources: [Apple Support tech specs](https://support.apple.com/en-au/111889) and [current Apple AU product compatibility list](https://www.apple.com/au/shop/product/mxn43za/a/apple-pencil-2nd-generation).

## Image provenance

- **Pro:** the local HTML supplies the Apple CDN `apple-pencil-pro-splitter-202405` PNG-alpha asset at a requested 448×800 canvas: [Apple CDN source](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/apple-pencil-pro-splitter-202405?wid=448&hei=800&fmt=png-alpha&.v=cU9HSUJpZUhzWS81ZmZ1ZWtXeDJEdlRJWGw3S3R6dEpCTGNXeVVhZUFHWTZCNnRNaFdpT1B0RFFDMmZuUkNvUVM0TjRWdzF2UjRGVEY0c3dBQVZ6VGJ5a3JRQ2g4MFJBQW5adWxqRlVpRWM). Repository mapping: `public/data/other/apple-pencil/images/apple-pencil-pro-splitter-202405.png`, verified as 448×800 RGBA.
- **USB-C:** the local HTML supplies the Apple CDN `apple-pencil-usbc-splitter-202405` PNG-alpha asset at a requested 448×800 canvas: [Apple CDN source](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/apple-pencil-usbc-splitter-202405?wid=448&hei=800&fmt=png-alpha&.v=T1UzeHljZElpYVY1a2xjdUcrNzVYcGpxWHU1d0U4T2d5b1U4cDBGejdMQXU5S3pJT29ETmxKUC9Ccmk1NWh4NnV5NVU0QmM2b3hmeWJWTTVtN1o5Zmh1OHRIS2JVaVNHRTdCZUcvYXVtODErYWpGdS9XeFgvbS9ITnNYOEhYaG4). Repository mapping: `public/data/other/apple-pencil/images/apple-pencil-usbc-splitter-202405.png`, verified as 448×800 RGBA.
- **2nd generation:** the local HTML contains no product image. The live Apple AU gallery supplies Apple CDN assets [MU8F2](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU8F2?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1540596407165), [MU8F2_AV1](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU8F2_AV1?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1540514733114), and [MU8F2_AV2](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU8F2_AV2?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1698165999865). Current worktree mappings are the three `apple-pencil-2nd-generation-mu8f2*.jpg` files under `public/data/other/apple-pencil/images/`, each verified as 1000×1000 JPEG.

## Uncertainties and cautions

- Keep retail and education prices separate. The local HTML is not evidence for general retail pricing.
- Apple prices and compatibility can change; the linked live pages are the current authority.
- Hover is model-dependent. USB-C hover is not supported by every compatible iPad; Apple's current USB-C page names the supported subset. Second-generation hover is limited to the two M2 iPad Pro generations stated above.
- The 2nd-generation gallery asset basename is legacy part `MU8F2`, while the current store product link is `MXN43`. Treat `MU8F2` as image provenance, not the current sellable product identifier.
- The 2nd-generation JPEGs and their JSON mapping were concurrent worktree additions during this research. This note records them but does not validate who created them or make them canonical.

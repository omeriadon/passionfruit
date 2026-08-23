# iPhone reconciliation

## Inputs

| Input                          | State           | Evidence                                                                                           |
| ------------------------------ | --------------- | -------------------------------------------------------------------------------------------------- |
| `data/tmp/iphone/iphone.html`  | Present usable  | 8071 product cells; featured iPhone 17 Pro Max, iPhone Air, and iPhone 17                          |
| `data/tmp/iphone/iphone2.html` | Present usable  | 8071 product cells; featured iPhone 17e, iPhone 16 Pro Max, and iPhone 16                          |
| `data/tmp/iphone/iphone3.html` | Present usable  | 8071 product cells; featured iPhone 15 Pro Max, iPhone 16 Pro Max, and iPhone 14 Pro               |
| `data/tmp/iphone/iphone4.html` | Present usable  | 8071 product cells; featured iPhone 14 Pro, iPhone 14 Plus, and iPhone 14                          |
| `data/tmp/iphone/iphone5.html` | Present usable  | 8071 product cells; featured iPhone 13 Pro Max, iPhone 13 mini, and iPhone 13                      |
| `data/tmp/iphone/iphone6.html` | Present usable  | 8071 product cells; featured iPhone SE 3rd generation, iPhone 12 Pro Max, and iPhone 12 Pro        |
| `data/tmp/iphone/iphone7.html` | Unusable source | Zero bytes                                                                                         |
| `data/tmp/iphone/iphone8.html` | Present usable  | 8071 product cells; featured iPhone 12, iPhone 11 Pro, and iPhone 11                               |
| Canonical candidate source     | PRESENT         | `.scratch/strict/iphone/strict-devices.json`, 19 devices                                           |
| Canonical output               | Present usable  | `public/data/iphone/iphone.json`, 19 devices; Ajv Draft 2020-12 validation passes with zero errors |

Every usable page exposes the same 39-device catalogue selector. Seven usable pages cover all 19 merged devices.

## Devices

| Device                     | State   | Source HTML                                                                                                   |
| -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| iPhone 17                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 17 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 17e                 | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone Air                 | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 16                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 16 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 15 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 14                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 14 Plus             | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 14 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone SE (3rd generation) | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 13                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 13 mini             | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 13 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 12                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 12 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 12 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 11                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 11 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 17 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 16 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 16 Plus             | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 16e                 | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 15 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 15                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 15 Plus             | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 13 Pro              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 12 mini             | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 11 Pro Max          | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone SE (2nd generation) | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone XS                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone XS Max              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone XR                  | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone X                   | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 8 Plus              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 8                   | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 7 Plus              | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |
| iPhone 7                   | PRESENT | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` |

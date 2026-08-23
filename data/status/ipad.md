# iPad reconciliation

## Inputs

  Input                        State          | Evidence                                                                                                                                    |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/tmp/ipad/ipad.html`  | Present usable | Featured iPad Pro 11-in. M5 and iPad Air 11-in. M4                                                                                          |
| `data/tmp/ipad/ipad2.html` | Present usable | Featured iPad Air 13-in. M4 and iPad mini A17 Pro                                                                                           |
| `data/tmp/ipad/ipad3.html` | Present usable | Featured iPad Pro 12.9-in. generations 6, 5, and 4; full catalogue selector                                                                 |
| `data/tmp/ipad/ipad4.html` | Present usable | Featured iPad Pro 11-in. M4 and generations 4 and 3                                                                                         |
| `data/tmp/ipad/ipad5.html` | Present usable | Featured iPad 10th generation, iPad Air 11-in. M2, and iPad Air 5th generation                                                              |
| Canonical candidate source | CANDIDATE      | `.scratch/strict/ipad/strict-devices.merge-ready.json`, 39 devices                                                                          |
| Canonical output           | PRESENT        | `public/data/ipad/ipad.json`, 39 canonical devices; Ajv Draft 2020-12 shared contract passes with 0 errors; all 6 image references verified |

Additional HTML: none required.

## Devices

| Device                             | State     | Source HTML                                                                           |
| ---------------------------------- | --------- | ------------------------------------------------------------------------------------- |
| iPad Pro 11‑in. (M5)               | PRESENT   | `ipad.html`, `ipad3.html`, `ipad5.html`                                               |
| iPad Air 11‑in. (M4)               | PRESENT   | `ipad.html`, `ipad3.html`, `ipad5.html`                                               |
| iPad Pro 13-in. (M5)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 13-in. (M4)               | PRESENT   | `ipad2.html`, `ipad3.html`, `ipad5.html`                                              |
| iPad (A16)                         | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini (A17 Pro)                | PRESENT   | `ipad2.html`, `ipad3.html`, `ipad5.html`                                              |
| iPad Pro 13‑in. (M4)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (6th generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (5th generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (4th generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (3rd generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (2nd generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 12.9‑in. (1st generation) | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 11‑in. (M4)               | PRESENT   | `ipad4.html`, `ipad5.html`                                                            |
| iPad Pro 11‑in. (4th generation)   | PRESENT   | `ipad4.html`, `ipad5.html`                                                            |
| iPad Pro 11‑in. (3rd generation)   | PRESENT   | `ipad4.html`, `ipad5.html`                                                            |
| iPad Pro 11‑in. (2nd generation)   | PRESENT   | `ipad4.html`, `ipad5.html`                                                            |
| iPad Pro 11‑in. (1st generation)   | PRESENT   | `ipad4.html`, `ipad5.html`                                                            |
| iPad Pro 10.5‑in.                  | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Pro 9.7‑in.                   | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 13‑in. (M3)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 11‑in. (M3)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 13‑in. (M2)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 11‑in. (M2)               | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air (5th generation)          | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air (4th generation)          | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air (3rd generation)          | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air 2                         | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad Air (1st generation)          | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (10th generation)             | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (9th generation)              | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (8th generation)              | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (7th generation)              | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (6th generation)              | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad (5th generation)              | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini (6th generation)         | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini (5th generation)         | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini 4                        | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini 3                        | PRESENT   | `ipad3.html`, `ipad5.html`                                                            |
| iPad mini 2                        | PRESENT | `public/data/ipad/ipad.json`; Ajv Draft 2020-12 passes with 0 errors |

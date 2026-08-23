# Apple Watch reconciliation

## Inputs

| Input                        | State          | Evidence                                                                                                                                                                                         |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data/tmp/watch/watch.html`  | Present usable | 1056001 bytes                                                                                                                                                                                    |
| `data/tmp/watch/watch2.html` | Present usable | 1031301 bytes                                                                                                                                                                                    |
| `data/tmp/watch/watch3.html` | Present usable | 1030654 bytes                                                                                                                                                                                    |
| `data/tmp/watch/watch4.html` | Present usable | 1017645 bytes                                                                                                                                                                                    |
| Canonical candidate source   | PRESENT      | `.scratch/strict/watch/strict-devices.json`, 12 devices                                                                                                                                          |
| Canonical output             | PRESENT        | `public/data/apple-watch/apple-watch.json`, 17 canonical devices; Ajv Draft 2020-12 shared contract passes with 0 errors; all 112 image references verified |

All four valid inputs expose a 17-device catalogue. The complete 17-device catalogue is merged and validated.

## Devices

| Device                | State     | Source HTML                                                                                  |
| --------------------- | --------- | -------------------------------------------------------------------------------------------- |
| Apple Watch SE        | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch SE 2      | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch SE 3      | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 1  | PRESENT | `.scratch/strict/apple-watch/remaining-devices.json`; Ajv Draft 2020-12 passes with 0 errors |
| Apple Watch Series 2  | PRESENT | `.scratch/strict/apple-watch/remaining-devices.json`; Ajv Draft 2020-12 passes with 0 errors |
| Apple Watch Series 3  | PRESENT | `.scratch/strict/apple-watch/remaining-devices.json`; Ajv Draft 2020-12 passes with 0 errors |
| Apple Watch Series 4  | PRESENT | `.scratch/strict/apple-watch/remaining-devices.json`; Ajv Draft 2020-12 passes with 0 errors |
| Apple Watch Series 5  | PRESENT | `.scratch/strict/apple-watch/remaining-devices.json`; Ajv Draft 2020-12 passes with 0 errors |
| Apple Watch Series 6  | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 7  | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 8  | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 9  | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 10 | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Series 11 | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Ultra     | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Ultra 2   | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |
| Apple Watch Ultra 3   | PRESENT   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html`                                    |

# AirPods reconciliation

## Inputs

  Input                             State           | Evidence                                                                                                                                          |
| ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/tmp/airpods/airpod.html`  | Present usable  | 659919 bytes                                                                                                                                      |
| `data/tmp/airpods/airpod2.html` | Present usable  | 648954 bytes                                                                                                                                      |
| `data/tmp/airpods/airpod3.html` | Unusable source | Zero bytes                                                                                                                                        |
| `data/tmp/airpods/airpod4.html` | Present usable  | 601497 bytes                                                                                                                                      |
| Candidate output                | CANDIDATE       | `.scratch/strict/airpods/strict-devices.json`, 9 devices                                                                                          |
| Canonical output                | PRESENT         | `public/data/airpods/airpods.json`, 9 canonical devices; Ajv Draft 2020-12 shared contract passes with 0 errors; all 17 image references verified |

Additional HTML: none required. The three usable compare pages cover all nine mapped devices.

## Devices

| Device                                                | State   | Source HTML                                   |
| ----------------------------------------------------- | ------- | --------------------------------------------- |
| AirPods (2nd generation)                              | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods (3rd generation) with Lightning Charging Case | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods (3rd generation) with MagSafe Charging Case   | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods 4                                             | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods 4 with Active Noise Cancellation              | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods Max                                           | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods Max 2                                         | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods Pro 2                                         | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |
| AirPods Pro 3                                         | PRESENT | `airpod.html`, `airpod2.html`, `airpod4.html` |

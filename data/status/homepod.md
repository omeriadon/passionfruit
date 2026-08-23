# HomePod reconciliation

## Inputs

| Input                            | State          | Evidence                                                                                              |
| -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `data/tmp/homepod/homepod.html`  | Present usable | 319176 bytes                                                                                          |
| `data/tmp/homepod/homepod2.html` | Present usable | 318899 bytes                                                                                          |
| Strict candidate output          | Present usable | `.scratch/strict/homepod/strict-devices.json`, two devices                                            |
| Canonical output                 | Present usable | `public/data/homepod/homepod.json`, two devices; Ajv Draft 2020-12 validation passes with zero errors |

Additional HTML: none required.

## Devices

| Device                   | State   | Source HTML                     |
| ------------------------ | ------- | ------------------------------- |
| HomePod mini             | PRESENT | `homepod.html`, `homepod2.html` |
| HomePod (2nd generation) | PRESENT | `homepod.html`, `homepod2.html` |

# Apple TV reconciliation

## Inputs

| Input                   | State          | Evidence                                                                                               |
| ----------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `data/tmp/tv/tv2.html`  | Present usable | 321520 bytes                                                                                           |
| Strict candidate output | Present usable | `.scratch/strict/apple-tv/apple-tv.devices.json`, one device                                           |
| Canonical output        | Present usable | `public/data/apple-tv/apple-tv.json`, one device; Ajv Draft 2020-12 validation passes with zero errors |

Additional HTML: none required for Apple TV 4K. A future Apple TV HD source is outside the current device catalogue.

## Devices

| Device      | State   | Source HTML |
| ----------- | ------- | ----------- |
| Apple TV 4K | PRESENT | `tv2.html`  |

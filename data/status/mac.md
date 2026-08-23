# Mac reconciliation

## Inputs

| Input                    | State          | Evidence                                                                                                        |
| ------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `data/tmp/mac/mac.html`  | Present usable | 55 product cells; featured MacBook Neo A18 Pro, MacBook Air 13-in. M5, and MacBook Pro 14-in. M5                |
| `data/tmp/mac/mac2.html` | Present usable | 55 product cells; featured iMac M4 two ports, MacBook Pro 14-in. M5 Pro, and MacBook Pro 16-in. M5 Max          |
| `data/tmp/mac/mac3.html` | Present usable | 55 product cells; featured Mac mini M4, Mac mini M4 Pro, and Mac Studio M4 Max                                  |
| `data/tmp/mac/mac4.html` | Present usable | 55 product cells; featured MacBook Air 13-in. M3, MacBook Air 13-in. M4, and Mac Studio M3 Ultra                |
| `data/tmp/mac/mac5.html` | Present usable | 55 product cells; featured MacBook Air 13-in. M2, MacBook Air 13-in. M1 2020, and iMac 24-in. M1 two ports 2021 |
| Tracked remaining candidate source | Present usable | `.scratch/strict/mac/remaining-devices.json`, 35 evidence-backed records                                      |
| Canonical output                   | Present usable | `public/data/mac/mac.json`, 53 devices; Ajv Draft 2020-12 validation passes with zero errors                 |

Every usable page exposes the same 54-device catalogue selector. The canonical
output contains 53 records. Intel Mac records already present in the historical
catalogue remain documented as legacy records; no Intel records are added by
this correction.

## Devices

| Device                                      | State   | Source HTML                                                    |
| ------------------------------------------- | ------- | -------------------------------------------------------------- |
| MacBook Neo (A18 Pro)                       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 13-in. (M5)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M5)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M4, two ports)                        | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M5 Pro)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M5 Max)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M4)                               | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M4 Pro)                           | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M4 Max)                         | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 13-in. (M3)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 13-in. (M4)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M3 Ultra)                       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 13-in. (M2)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 13-in. (M1, 2020)               | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 24-in. (M1, two ports, 2021)           | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M5)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M5 Max)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M5 Pro)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M4)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M3)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M2, 2023)               | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air (Intel, 2020)                   | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air (Intel, 2017)                   | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 13-in. (M2, 2022)               | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 13-in. (M1, 2020)               | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4 Max)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4 Pro)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M3)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M3 Pro or M3 Max)       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M2 Pro or M2 Max, 2023) | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M3 Pro or M3 Max)       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M2 Pro or M2 Max, 2023) | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M1 Pro or M1 Max, 2021) | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M4 Max)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M4 Pro)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M1 Pro or M1 Max, 2021) | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (Intel, 2019)            | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M4, four ports)                       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M2 or M2 Pro)                     | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M2 Max or M2 Ultra)             | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Pro (M2 Ultra)                          | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Pro (Intel, 2019)                       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 24-in. (M1, four ports, 2021)          | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M3, two ports)                        | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M3, four ports)                       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 21.5-in. (Intel, 2019)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 21.5-in. (Intel, 2017)                 | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 27-in. (Intel, 2020)                   | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac Pro (Intel, 2017)                      | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M1, 2020)                         | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (Intel, 2018)                      | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M1 Max or M1 Ultra, 2022)       | PRESENT | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |

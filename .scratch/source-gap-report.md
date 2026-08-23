# Source gap report

Generated: 2026-08-23. Scope: canonical JSON under `public/data` and supplied HTML inventory under `data/tmp`.

## State rules

- `PRESENT` means merged and validated in canonical JSON.
- `CANDIDATE` means a validated strict extraction exists but remains unmerged, or the merged canonical instance does not yet pass its authoritative contract.
- `SOURCE_ONLY` means evidence exists in supplied HTML and no strict candidate exists.

## Summary

| Product     | Mapped devices | PRESENT | CANDIDATE | SOURCE_ONLY |           Unusable inputs |
| ----------- | -------------: | ------: | --------: | ----------: | ------------------------: |
| AirPods     |              9 |       0 |         9 |           0 |                         1 |
| Apple TV    |              1 |       1 |         0 |           0 | 1 absent legacy reference |
| Apple Watch |             17 |       0 |        12 |           5 |                         0 |
| HomePod     |              2 |       2 |         0 |           0 |                         0 |
| iPad        |             40 |       2 |        37 |           1 |                         0 |
| iPhone      |             38 |      19 |         0 |          19 |                         1 |
| Mac         |             50 |      15 |         0 |          35 |                         0 |
| Vision      |              1 |       1 |         0 |           0 |                         0 |
| Total       |            158 |      40 |        58 |          60 |  3 unusable/absent inputs |

iPhone and Mac counts are reduced from earlier catalogue-only reports to devices with exact rendered evidence in the supplied pages. The remaining catalogue entries have no exact usable filename and are not listed as copy-this-HTML work.

## Canonical validation

| Product     | Canonical devices | Ajv result                                                                                    |
| ----------- | ----------------: | --------------------------------------------------------------------------------------------- |
| Apple TV    |                 1 | Valid; zero errors.                                                                           |
| HomePod     |                 2 | Valid; zero errors.                                                                           |
| iPad        |                 2 | Valid against shared contract; zero errors.                                                   |
| iPhone      |                19 | Valid; zero errors.                                                                           |
| Mac         |                15 | Valid; zero errors.                                                                           |
| Vision      |                 1 | Valid; zero errors.                                                                           |
| AirPods     |                 9 | Invalid; canonical data retains the legacy AirPods shape and lacks universal required fields. |
| Apple Watch |                 0 | Candidate invalid against authoritative schema; 1296 errors.                                  |

Ajv ignored optional URI formats because `ajv-formats` is unavailable. This did not affect any semantic field validation.

## Image placement and path normalization

- All 382 `localPath` image references across eight canonical/candidate datasets resolve to files under `public/data/<section>/images/`.
- Every resolved file matches its staged counterpart by SHA-256.
- Seven missing AirPods files were copied byte-for-byte into canonical placement.
- Mac has 45 referenced canonical files represented by 41 unique hashes; four cross-page duplicate-content references are valid.
- Unreferenced staged and canonical variants remain intact because this task is coverage reconciliation only.

## Copy-this-HTML checklist

Copy only these exact source files. Each row identifies one device currently classified `SOURCE_ONLY`. No additional HTML is required for any listed device.

### Apple Watch — Series 1 through Series 5

Copy all four filenames for each device:

```sh
cp data/tmp/watch/watch.html <destination>/
cp data/tmp/watch/watch2.html <destination>/
cp data/tmp/watch/watch3.html <destination>/
cp data/tmp/watch/watch4.html <destination>/
```

| Device                | Usable HTML                                               |
| --------------------- | --------------------------------------------------------- |
| Apple Watch SE        | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 1  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 2  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 3  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 4  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 5  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 6  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 7  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 8  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 9  | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 10 | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Series 11 | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Ultra     | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Ultra 2   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch Ultra 3   | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch SE 2      | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |
| Apple Watch SE 3      | `watch.html`, `watch2.html`, `watch3.html`, `watch4.html` |

Actionable rows are Series 1–5. Other rows document the complete evidence set for already-extracted candidates.

### iPad — iPad mini 2

Copy both filenames:

```sh
cp data/tmp/ipad/ipad3.html <destination>/
cp data/tmp/ipad/ipad5.html <destination>/
```

| Device      | Usable HTML                |
| ----------- | -------------------------- |
| iPad mini 2 | `ipad3.html`, `ipad5.html` |

### iPhone — 19 exact-evidence gaps

Copy all seven filenames for each device:

```sh
for f in iphone iphone2 iphone3 iphone4 iphone5 iphone6 iphone8; do cp "data/tmp/iphone/$f.html" "<destination>/"; done
```

| Device                     | Usable HTML                                                                                                   | Unusable HTML  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| iPhone 17 Pro              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 16 Pro              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 16 Plus             | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 16e                 | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 15 Pro              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 15                  | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 15 Plus             | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 13 Pro              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 12 mini             | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 11 Pro Max          | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone SE (2nd generation) | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone XS                  | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone XS Max              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone XR                  | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone X                   | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 8 Plus              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 8                   | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 7 Plus              | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |
| iPhone 7                   | `iphone.html`, `iphone2.html`, `iphone3.html`, `iphone4.html`, `iphone5.html`, `iphone6.html`, `iphone8.html` | `iphone7.html` |

### Mac — 35 exact-evidence gaps

Copy all five filenames for each device:

```sh
for f in mac mac2 mac3 mac4 mac5; do cp "data/tmp/mac/$f.html" "<destination>/"; done
```

| Device                                      | Usable HTML                                                    |
| ------------------------------------------- | -------------------------------------------------------------- |
| MacBook Air 15-in. (M5)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M5 Max)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M5 Pro)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M4)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M3)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air 15-in. (M2, 2023)               | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air (Intel, 2020)                   | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Air (Intel, 2017)                   | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 13-in. (M2, 2022)               | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 13-in. (M1, 2020)               | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4 Max)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4 Pro)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M4)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M3)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M3 Pro or M3 Max)       | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 14-in. (M2 Pro or M2 Max, 2023) | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M4 Max)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (M4 Pro)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| MacBook Pro 16-in. (Intel, 2019)            | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M4, four ports)                       | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M2 or M2 Pro)                     | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M2 Max or M2 Ultra)             | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Pro (M2 Ultra)                          | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Pro (Intel, 2019)                       | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 24-in. (M1, four ports, 2021)          | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M3, two ports)                        | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac (M3, four ports)                       | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 21.5-in. (Intel, 2019)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 21.5-in. (Intel, 2017)                 | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac 27-in. (Intel, 2020)                   | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| iMac Pro (Intel, 2017)                      | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (M1, 2020)                         | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac mini (Intel, 2018)                      | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |
| Mac Studio (M1 Max or M1 Ultra, 2022)       | `mac.html`, `mac2.html`, `mac3.html`, `mac4.html`, `mac5.html` |

## Unusable HTML inventory

| Product  | Filename                        | Reason                                                                         |
| -------- | ------------------------------- | ------------------------------------------------------------------------------ |
| AirPods  | `data/tmp/airpods/airpod3.html` | Zero bytes                                                                     |
| iPhone   | `data/tmp/iphone/iphone7.html`  | Zero bytes                                                                     |
| Apple TV | `tv.html`                       | Listed by stale status evidence but absent from the current supplied inventory |

No actionable device depends on an unusable input.

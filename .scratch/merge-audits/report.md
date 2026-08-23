# Noether canonical migration report

- Timestamp: 2026-08-23
- Scope: eight sections migrated from remediated strict candidates to canonical JSON under `public/data/`.
- Shared schema: `.scratch/strict/data-model-contract.schema.json`.
- Draft: Draft 2020-12.
- Result: 8/8 sections valid; 98/98 devices valid; zero Ajv errors.
- Image references: zero missing across all canonical instances.

## Device counts

| Section     | Canonical file                             | Devices |
| ----------- | ------------------------------------------ | ------: |
| iPhone      | `public/data/iphone/iphone.json`           |      19 |
| AirPods     | `public/data/airpods/airpods.json`         |       9 |
| Mac         | `public/data/mac/mac.json`                 |      15 |
| Apple TV    | `public/data/apple-tv/apple-tv.json`       |       1 |
| HomePod     | `public/data/homepod/homepod.json`         |       2 |
| Vision      | `public/data/vision/vision.json`           |       1 |
| Apple Watch | `public/data/apple-watch/apple-watch.json` |      12 |
| iPad        | `public/data/ipad/ipad.json`               |      39 |
| Total       |                                            |      98 |

## Remediation

- AirPods: normalized legacy color, image, chip, and connectivity shapes to the strict AirPods branch.
- Apple TV: retained one canonical Default color; resolved duplicate large bionic references to byte-identical small files; normalized relative Apple URLs to HTTPS.
- HomePod: flattened staged paths into `public/data/homepod/images/`.
- Mac: restored four missing `large_2x` images from durable strict staging.
- Apple Watch: staged all 136 audited images; canonical data references all 112 required images.
- iPad: used merge-ready evidence-backed candidate; retained explicit nulls and source notes for absent facts.
- Shared schema: wired the previously orphaned `productCollectionDiscriminator` into the device item position so universal and AirPods branches are both enforced.

## Validation boundary

`ajv-formats` is unavailable. Ajv therefore reports that `uri` format declarations are ignored. Structural Draft 2020-12 validation has zero errors. Apple URL strings were normalized to HTTPS but URI format semantics were not independently validated.

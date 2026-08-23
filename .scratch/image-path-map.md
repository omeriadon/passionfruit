# Pauli Canonical Image Path Map

- Generated: 2026-08-23T05:44Z UTC.
- Source inventory: `.scratch/image-audit/images.json`.
- Destination rule: `public/data/<section>/images/<strict basename>`.
- Apple Watch strict section maps from `.scratch/strict/watch/images` to `public/data/apple-watch/images`.
- Duplicate-content references are normalized by basename to one canonical file. No image bytes are duplicated or re-encoded.

## Section Mapping

| Family      | Strict root                                | Canonical destination            | Referenced files                |
| ----------- | ------------------------------------------ | -------------------------------- | ------------------------------- |
| iPhone      | `.scratch/strict/iphone/images`            | `public/data/iphone/images`      | 69 unique / 88 refs             |
| iPad        | `.scratch/strict/ipad/images`              | `public/data/ipad/images`        | 6 unique / 6 refs               |
| Mac         | `.scratch/strict/mac/images`               | `public/data/mac/images`         | 41 hashes / 45 refs             |
| AirPods     | `.scratch/strict/airpods/images`           | `public/data/airpods/images`     | 10 hashes / 17 refs             |
| Apple TV    | `.scratch/strict/apple-tv/images/apple-tv` | `public/data/apple-tv/images`    | 37 hashes / 39 manifest records |
| HomePod     | `.scratch/strict/homepod/images`           | `public/data/homepod/images`     | 52 hashes / 57 refs             |
| Vision      | `.scratch/strict/vision/images`            | `public/data/vision/images`      | 30 hashes / 30 refs             |
| Apple Watch | `.scratch/strict/watch/images`             | `public/data/apple-watch/images` | 112 hashes / 112 refs           |

## JSON Normalization

- All canonical device JSON references use repository-relative `public/data/<section>/images/<basename>` with no leading slash.
- AirPods image keys changed from `file`, `width`, and `height` to contract keys `localPath`, `widthPx`, and `heightPx`.
- Apple TV duplicate-content manifest entries were removed from the canonical image-reference array, reducing 39 records to 37 references. The two removed pairs were byte-identical small/large and small_2x/large_2x Bionic-chip images.
- Apple TV dimensions for the 16 defective manifest records were derived from embedded image data recorded in Feynman's audit. Files were not re-encoded.
- iPad candidate JSON has no local image-reference array; its six staged images remain available at the canonical path.

## Final Checks

- Canonical references verified: **364**; invalid paths: 0; missing files: 0; SHA-256 mismatches: 0; dimension mismatches: 0.
- Strict-source byte comparisons verified: **334**; mismatches: 0.
- Apple TV embedded-dimension reconciliation verified: 37 of 37 references.

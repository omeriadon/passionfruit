# Feynman Repository-Wide Staged-Image Integrity Audit

- Generated: 2026-08-23T03:19:35.468Z
- Scope: strict candidates under `.scratch/strict/` only.
- Canonical JSON and staged image bytes were not modified.
- Machine-readable evidence: [`.scratch/image-audit/images.json`](./images.json).
- Resolution rule: each strict reference was resolved deterministically from its declared path. Where the declared path pointed outside the repository, the audit used only the matching strict staging file by family and basename; Vision additionally resolved through its exact canonical `public/data/vision` path. Every fallback is recorded per reference in `pathResolution`.

## Verdict

**Image integrity passes; path correctness fails.**

- All **394 references** across eight families resolve to an existing audited file.
- All embedded dimensions match JSON dimensions except 16 Apple TV manifest entries whose JSON metadata itself declares `1×1`.
- MIME is valid by magic bytes throughout: `image/jpeg` × 365; `image/png` × 29.
- Transparent canvas structure is preserved in all PNGs that declare alpha or palette transparency: 20 transparent files.
- SHA-256 recomputation found **357 unique hashes** among **370 unique referenced repository files**, with **26 byte-identical files** in **13 duplicate groups**.
- **358 of 394 references do not use a repository-relative public/data local path.** This is the sole integrity failure category.

## Family Results

| Family      | Devices | References | Unique Files | Unique SHA-256 | Transparent Files | Opaque Files |
| ----------- | ------: | ---------: | -----------: | -------------: | ----------------: | -----------: |
| iPhone      |      19 |         88 |           69 |             69 |                 0 |           88 |
| iPad        |      39 |          6 |            6 |              6 |                 0 |            6 |
| Mac         |      15 |         45 |           45 |             41 |                 0 |           45 |
| AirPods     |       9 |         17 |           17 |             10 |                17 |            0 |
| Apple TV    |       1 |         39 |           39 |             37 |                 2 |           37 |
| HomePod     |       2 |         57 |           52 |             52 |                 1 |           56 |
| Vision      |       1 |         30 |           30 |             30 |                 0 |           30 |
| Apple Watch |      12 |        112 |          112 |            112 |                 0 |          112 |

## Path Correctness

References counted as correct must be repository-relative and resolve under `public/data/` or `data/`. Declared staging paths such as `images/...` are valid within their strict artifact but fail this audit's repository-relative public/data requirement.

- Correct public/data paths: **36** — all 30 Vision references plus all 6 iPad references.
- Incorrect or non-public-data paths: **358**.
- Family counts: iPhone 88; Mac 45; Apple Watch 112; AirPods 17; HomePod 57; Apple TV 39.

The HomePod references point to `data/homepod/v/...`, but no such repository tree exists. They were audited at `.scratch/strict/homepod/images/{meta,specs}/...`, which matches every reference after removing `data/homepod/` and device-version segments.

iPhone, Mac, AirPods, and Apple Watch use valid strict-staging relative paths but not canonical repository paths. Their canonical outputs contain additional hashed copies outside these strict references; those copies were outside the requested strict-reference scope and were not treated as substitutes.

## Dimensions And MIME

- Embedded dimensions match for **378 of 394** references.
- The 16 mismatches are all Apple TV isolated-manifest records where JSON says `widthPx: 1` and `heightPx: 1`, while embedded images have real dimensions:
- `apple_tv__c58t6fz8g54y_medium.jpg`: JSON `1×1`; embedded `330×448`
- `apple_tv__c58t6fz8g54y_medium_2x.jpg`: JSON `1×1`; embedded `660×896`
- `remote__firxnq7n11qy_medium.jpg`: JSON `1×1`; embedded `133×450`
- `remote__firxnq7n11qy_medium_2x.jpg`: JSON `1×1`; embedded `266×900`
- `left__cz784kfzfd0m_small.jpg`: JSON `1×1`; embedded `240×106`
- `left__cz784kfzfd0m_small_2x.jpg`: JSON `1×1`; embedded `480×212`
- `left__cz784kfzfd0m_medium.jpg`: JSON `1×1`; embedded `226×98`
- `left__cz784kfzfd0m_medium_2x.jpg`: JSON `1×1`; embedded `452×196`
- `left__cz784kfzfd0m_large.jpg`: JSON `1×1`; embedded `262×124`
- `left__cz784kfzfd0m_large_2x.jpg`: JSON `1×1`; embedded `524×248`
- `right__giile6ftxcuy_small.jpg`: JSON `1×1`; embedded `240×106`
- `right__giile6ftxcuy_small_2x.jpg`: JSON `1×1`; embedded `480×212`
- `right__giile6ftxcuy_medium.jpg`: JSON `1×1`; embedded `226×98`
- `right__giile6ftxcuy_medium_2x.jpg`: JSON `1×1`; embedded `452×196`
- `right__giile6ftxcuy_large.jpg`: JSON `1×1`; embedded `262×124`
- `right__giile6ftxcuy_large_2x.jpg`: JSON `1×1`; embedded `524×248`
- No mismatch is caused by altered image content. Each affected file's actual hash still matches its manifest-declared SHA-256.
- Magic-byte MIME agrees with file extensions for every resolvable reference.

## Transparency

PNG transparency was assessed from IHDR color type plus `tRNS` presence:

- AirPods: all 17 referenced PNG files preserve transparency.
- Apple TV: 2 of 3 PNG files preserve transparency.
- HomePod: 1 of 9 referenced PNG files preserves transparency.
- JPEG families correctly contain no alpha canvas: iPhone, iPad, Mac, Vision, and Apple Watch.

## SHA-256 Duplicates

Byte-identical duplicates are recorded below. Duplicate presence is evidence, not automatically a defect; some represent equivalent product colors or repeated source assets.

- `ab612ab975be5be450d737842077ba71dbf3eb048646fe98da39551bd43becc7`
  - .scratch/strict/mac/images/mac4-images__macbook-air-m3-midnight-large-2x.jpg
  - .scratch/strict/mac/images/mac5-images__compare_macbook_air_mx_midnight__ftl6nurjmvyy_large_2x.jpg
- `a5a689b6f0a6d4d2d2f76a11776ee1da629e118e837dd8563a75bfce77b643b7`
  - .scratch/strict/mac/images/mac4-images__macbook-air-m3-starlight-large-2x.jpg
  - .scratch/strict/mac/images/mac5-images__compare_macbook_air_mx_starlight__f4zo7jj82de2_large_2x.jpg
- `7f45d656798853a6b2def1ccc47b1c8d86b4cc313c62dc4f5cec48ede151af45`
  - .scratch/strict/mac/images/mac4-images__macbook-air-m3-space-grey-large-2x.jpg
  - .scratch/strict/mac/images/mac5-images__compare_macbook_air_mx_spacegray__hki19guzdwuq_large_2x.jpg
- `17339a68c6539e123cdb0a980222133be134b2d08dca132199efad798ef7a715`
  - .scratch/strict/mac/images/mac4-images__macbook-air-m3-silver-large-2x.jpg
  - .scratch/strict/mac/images/mac5-images__compare_macbook_air_mx_silver__6nbuljz40wym_large_2x.jpg
- `d20c90c4faea6926fb514aff82593a9c1ada61c8d59e532516e68ad1d6f24860`
  - .scratch/strict/airpods/images/airpods-4-anc-white.png
  - .scratch/strict/airpods/images/airpods-4-white.png
- `0d2b461352d65f36d0ab6316bc0ef0a1c0ee808efc42ba815f215f8b9e13f75b`
  - .scratch/strict/airpods/images/airpods-max-2-midnight.png
  - .scratch/strict/airpods/images/airpods-max-midnight.png
- `e7a60c482908fff201536c66fd17cdf74cceda7c6f2a6ef758a5fc635bb547ca`
  - .scratch/strict/airpods/images/airpods-max-2-starlight.png
  - .scratch/strict/airpods/images/airpods-max-starlight.png
- `d8a3bc5dcdd6b2891ddeca477d1e604a574b7bd4ad9619528b41fe10b0e5376d`
  - .scratch/strict/airpods/images/airpods-max-2-blue.png
  - .scratch/strict/airpods/images/airpods-max-blue.png
- `e26f2a37f4817e89f23a30a2a2bab1a9a04b953725c73c1a5333d4a15c8af260`
  - .scratch/strict/airpods/images/airpods-max-2-purple.png
  - .scratch/strict/airpods/images/airpods-max-purple.png
- `5beed90ad750d7dd3fdbc94790a5ad9f9b060696f5cf4e8a93252436a7cc6bc4`
  - .scratch/strict/airpods/images/airpods-max-2-orange.png
  - .scratch/strict/airpods/images/airpods-max-orange.png
- `98648b1e5563ac64385449f3ed918875b1d0d02914cca811a32f16fe67ed49ab`
  - .scratch/strict/airpods/images/airpods-3rd-generation-lightning-white.png
  - .scratch/strict/airpods/images/airpods-3rd-generation-magsafe-white.png
- `f417efc373f4e90505b3d248c0940d585a9134d419db8ca142bc3afc79e62152`
  - .scratch/strict/apple-tv/images/apple-tv/bionic_chip__diuiv3uk51m6_small.jpg
  - .scratch/strict/apple-tv/images/apple-tv/bionic_chip__diuiv3uk51m6_large.jpg
- `2776aa711c0b5ea490c03e961509c63423aef3ebd35d4dd2b1067f916fca2733`
  - .scratch/strict/apple-tv/images/apple-tv/bionic_chip__diuiv3uk51m6_small_2x.jpg
  - .scratch/strict/apple-tv/images/apple-tv/bionic_chip__diuiv3uk51m6_large_2x.jpg

## Staged Inventory

- Strict image files enumerated: **631**.
- Referenced by strict candidate JSON: **334 unique files / 394 references**.
- Unreferenced strict staged files: **297**.

Unreferenced files are retained as inventory evidence in `unreferencedStagedFiles`. They were neither deleted nor modified.

## Checkpoint

Feynman checkpoint: [`.scratch/checkpoints/Feynman.md`](../checkpoints/Feynman.md).

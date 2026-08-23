# Apple Watch Strict Extraction Final Report

- Timestamp: `2026-08-23T02:16:54.639Z`
- Result: complete with upstream schema defects.
- Devices: **12**.
- Colors: **57**.
- Staged images: **136**.
- Referenced image objects: **112**, all unique.
- Unreferenced staged overview variants: **24**, explicitly accounted for in `image-audit.json`.
- MIME: all `image/jpeg`.
- Dimensions: all match embedded JSON dimensions.
- SHA-256: audited all staged files; 112 referenced files have 112 distinct digests.
- Draft 2020-12 local overlay: valid for all 12 devices.
- Authoritative Draft-07 schema: invalid; iPad-specific required fields reject Watch, `watchDetails` is disallowed, and `IP[0-9]{2}` rejects `IP6X`.

## Blockers

- Authoritative validation requires an owner-approved schema split or Watch variant; no authoritative schema edits were made.

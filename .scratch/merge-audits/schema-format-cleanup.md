# Schema Format Cleanup

## Result

- Status: complete.
- Date: 2026-08-23.
- Draft: Draft 2020-12.
- Validator: Ajv 8.20.0 (`Ajv2020`) with `allErrors: true`, `strict: false`, and a registered `uri` format.
- URI implementation: WHATWG URL first, then `fast-uri.parse`; acceptance requires a non-empty scheme and no parse error. This preserves full-URI semantics while retaining RFC 3986 support for non-WHATWG schemes such as FTP and LDAP.
- Schema changes: none. All canonical schemas and `.scratch/strict/data-model-contract.schema.json` retain `"format": "uri"` unchanged.

## Validation

| Section     |                             Canonical JSON | Ajv errors | Ajv warnings |
| ----------- | -----------------------------------------: | ---------: | -----------: |
| airpods     |         `public/data/airpods/airpods.json` |          0 |            0 |
| apple-tv    |       `public/data/apple-tv/apple-tv.json` |          0 |            0 |
| apple-watch | `public/data/apple-watch/apple-watch.json` |          0 |            0 |
| homepod     |         `public/data/homepod/homepod.json` |          0 |            0 |
| ipad        |               `public/data/ipad/ipad.json` |          0 |            0 |
| iphone      |           `public/data/iphone/iphone.json` |          0 |            0 |
| mac         |                 `public/data/mac/mac.json` |          0 |            0 |
| vision      |           `public/data/vision/vision.json` |          0 |            0 |

The format probe passed positive HTTPS, FTP, and LDAP samples and rejected empty, relative, and hostless HTTPS values. Both the probe and all eight canonical validations exited zero with empty stderr.

## Temporary Artifacts

Created during this cleanup and removed after validation:

- `.scratch/validate-canonical.mjs`
- `.scratch/validate-canonical-formats.mjs`
- `.scratch/format-probe.out`
- `.scratch/format-probe.err`
- `.scratch/schema-format-validation.out`
- `.scratch/schema-format-validation.err`
- `.scratch/schema-format-cleanup.stderr.log`
- `.scratch/post-cleanup-validation.out`
- `.scratch/post-cleanup-validation.err`

No Git operations were performed.

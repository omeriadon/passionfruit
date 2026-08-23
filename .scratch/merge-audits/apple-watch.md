# Apple Watch Merge Audit

## Final Validation

- Canonical file: `public/data/apple-watch/apple-watch.json`
- Public schema: `public/data/apple-watch/apple-watch.schema.json`
- Schema source: `.scratch/strict/data-model-contract.schema.json`, copied byte-identically to preserve the shared canonical contract.
- Draft: 2020-12.
- Compiler: Ajv 2020 with `allErrors` enabled and strict mode disabled.
- Schema compilation: valid; 0 errors.
- Canonical validation: valid across all 12 devices; 0 errors.
- Format boundary: `ajv-formats` is unavailable, so `format: "uri"` declarations are ignored by Ajv and were not semantically validated.

## Schema Repair

- The prior public schema was legacy Draft-07 with `#/definitions/`.
- The partially repaired schema retained four `#/definitions/` references and was incompatible with the remodeled canonical device shape.
- All internal references now use `#/$defs/`.
- `$schema` is the accepted repository convention: `https://json-schema.org/draft/2020-12/schema`.
- The requested HTTP URI (`http://...`) was tested explicitly. Ajv 8.20 does not recognize it as a Draft 2020-12 meta-schema key; compilation fails with `no schema with key or ref`. HTTPS is required for direct Ajv compilation and matches every other migrated section schema.
- No canonical JSON changes were made.

## Evidence

- Independent canonical validation evidence remains in `.scratch/maxwell-independent-validation.json`.
- Image verification remains complete at 112 unique referenced images, zero missing files, byte-identical hashes, and exact dimensions.
- Current Ajv evidence is in `.scratch/merge-audits/apple-watch.validation.json`.

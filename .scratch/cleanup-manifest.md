# Conservative scratch cleanup

Date: 2026-08-23

## Deleted

- `.scratch/tmp/mac-rendered-rows.txt` — intermediate rendered Mac comparison rows; no canonical, schema, source, validation, or audit artifact references it.

## Intentionally preserved

- `.scratch/full-context.md`
- Source HTML under `data/tmp/`
- Canonical JSON, schemas, templates, and public images
- Strict extraction artifacts and validation reports
- Audit reports, checkpoints, heartbeats, extraction scripts, and quarantine assets that may preserve provenance or reproducibility
- Pending audit snapshots were retained during the first cleanup pass and are included in the second-pass historical-artifact deletion below.

## Watch image overlap check

The requested byte-level comparison found 112 files in `public/data/watch/images/images/`. All 112 have byte-identical SHA-256 matches under `public/data/apple-watch/images/`; zero files are unique to the doubled directory. The public directory was not modified because public JSON and image paths were explicitly out of scope.

## Second-pass deletions

Date: 2026-08-23

All paths below were explicitly proposed, checked for references from preserved operational files, and deleted. The proposal itself is retained at `.scratch/cleanup-proposal.md`.

### Historical worker logs

- `.scratch/heartbeats/Accessory-Schema.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Bohr.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Contract-Docs.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Coverage-Audit.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Fleet-Sync.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Lovelace.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Mac-Legacy.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Mac-Modern.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Mac-Resume.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Maxwell.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Merge-Prep.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Noether.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Pauli.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Planck-Resume.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Planck.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/Ramanujan.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/iPhone-Max.log` — historical worker heartbeat log; not runtime data or extraction evidence.
- `.scratch/heartbeats/orchestrator.log` — historical worker heartbeat log; not runtime data or extraction evidence.

### Historical worker checkpoints

- `.scratch/checkpoints/Accessory-Schema.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Aquinas.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Bohr.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Chandrasekhar.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Contract-Docs.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Dirac.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Euler.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Feynman.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Hertz.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Linnaeus.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Lovelace.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Mac-Legacy.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Mac-Modern.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Mac-Resume.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Noether.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Pauli.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Planck.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Ramanujan.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/Turing.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.
- `.scratch/checkpoints/iPhone-Max.md` — historical worker checkpoint; superseded by the preserved final reports and strict evidence.

### Superseded one-off scripts

- `.scratch/add-watch-notes.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/build-batch1.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/build-iphone-remaining.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/build-mini2.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/coverage-audit-compare.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/coverage-audit-extract-v2.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/coverage-audit-extract.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/dump-target-values.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/extract-hidden.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/extract-visible-targets.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/merge-remaining.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/mini2-values.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/pauli-fix-tv-dimensions.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/pauli-normalize-images.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/probe-order.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/probe-rows.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.
- `.scratch/probe-selectors.mjs` — one-off extraction, merge, normalization, or probe script superseded by canonical data and preserved validation/audit artifacts.

### Superseded intermediate audit/error outputs

- `.scratch/ampere-validation.pending.json` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.
- `.scratch/coverage-audit-raw.json` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.
- `.scratch/coverage-audit-result.json` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.
- `.scratch/maxwell-errors.txt` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.
- `.scratch/pauli-normalization.json` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.
- `.scratch/relocation-audit.pending.json` — intermediate validation, audit, normalization, or error output; not a final report and not required by preserved operational files.

## Third-pass cleanup

Date: 2026-08-23

### Deleted

- `.scratch/devices-not-yet-extracted.md` — stale catalogue-gap report. Its listed iPhone and Mac gaps are superseded by the canonical reconciliation and the eight `data/status/*.md` source-of-truth tables; no preserved file referenced it.
- `.scratch/strict/apple-watch/remaining-hidden-evidence.tsv` — unreferenced intermediate hidden-evidence export, superseded by the preserved Apple Watch status and audit documents.
- `.scratch/strict/ipad/remaining-hidden-evidence.tsv` — unreferenced intermediate hidden-evidence export, superseded by the preserved iPad status and audit documents.
- `.scratch/strict/iphone/remaining-hidden-evidence.tsv` — unreferenced intermediate hidden-evidence export, superseded by the preserved iPhone status and audit documents.
- `.scratch/strict/mac/remaining-hidden-evidence.tsv` — unreferenced intermediate hidden-evidence export, superseded by the preserved Mac status and audit documents.
- `.scratch/strict/ipad/remaining-devices.json` — superseded iPad candidate subset; the status table and preserved `strict-devices.merge-ready.json` are the active evidence.
- `.scratch/strict/ipad/validate-remaining.mjs` — validator for the deleted superseded iPad candidate subset.
- `.scratch/strict/ipad/validation-remaining.json` — validation result for the deleted superseded iPad candidate subset.

### Status-file audit

All eight files under `data/status/` were preserved. `data/rules/general.md` defines them as required status source-of-truth files, and they document device-to-source mappings and canonical state. Several status files also reference preserved strict candidate artifacts. No status file met the deletion condition.

### Protected paths verified unchanged by this pass

- Raw HTML under `data/tmp/`
- All `data/rules/*.md` files
- All `data/status/*.md` files
- Canonical JSON and public schemas under `public/data/`
- Public templates under `public/data/templates/`
- Preserved final validation, audit, provenance, strict-evidence, image, and quarantine artifacts

## Fourth-pass cleanup

Date: 2026-08-23

The remaining `.scratch` tree was inventoried by file and directory. Strict
candidate records, local image sets, hash manifests, validation scripts, and
reports were retained where they provide source provenance, reproducibility,
or evidence for the current canonical data. Current contract documents, image
audits, merge audits, source-gap reports, and template validation were also
retained. Raw HTML remains under `data/tmp/` and was not touched.

### Deleted

- `.scratch/agent-fleet.md` — obsolete historical worker-coordination/status log; all workers had completed and it was not referenced by operational rules, status files, validation scripts, or final reports.
- `.scratch/cleanup-proposal.md` — completed cleanup proposal superseded by this manifest; it contained no unique evidence and was not referenced by operational files.
- `.scratch/merge-audits/airpods.pre-strict-migration.json` — superseded pre-strict AirPods snapshot; the final AirPods audit, canonical validation report, strict candidate, and canonical JSON provide the active evidence.

### Explicitly retained after this inventory

- `.scratch/full-context.md` — preserved because it contains another worker's uncommitted change and was not modified or deleted.
- `.scratch/human-device-contract.md`, `.scratch/device-data-reference.md`, and `.scratch/device-templates.md` — current human-readable contract and review documentation.
- `.scratch/final-validate.mjs`, `.scratch/strict/`, `.scratch/merge-audits/`, `.scratch/image-audit/`, `.scratch/template-validation/`, and `.scratch/merge-audits/quarantine/` — reproducibility, strict evidence, final validation, image auditing, and quarantine assets.
- `.scratch/coverage-audit-os26-os27*.md`, `.scratch/data-presence-audit.md`, `.scratch/apple-watch-data-completeness-audit.md`, `.scratch/source-gap-report.md`, and `.scratch/merge-readiness.md` — current coverage, completeness, provenance, and readiness reports.

## Fifth-pass cleanup

The remaining scratch tree was re-audited after the schema redesign request. Current schema and contract documents, all strict evidence needed by the canonical data, final validation and provenance reports, image audits, templates, quarantine assets, and worker-produced files were preserved. No schema, canonical JSON, raw HTML, status file, or rules file was modified.

### Deleted

- `.scratch/maxwell-image-verification.json` — unreferenced Apple Watch image-check snapshot superseded by `.scratch/image-audit/images.json`, `.scratch/image-audit/report.md`, and the consolidated image-integrity audit.
- `.scratch/maxwell-independent-validation.json` — unreferenced Apple Watch validation snapshot for an outdated 12-device candidate set; superseded by the current strict and consolidated validation artifacts.
- `.scratch/strict/iphone/iphone14-pro-max.json` — one-off intermediate iPhone extraction output not referenced by status, canonical validation, image audits, or current provenance documents.
- `.scratch/strict/iphone/iphone14-pro-max.validation.json` — validation result for the deleted one-off iPhone extraction output.
- `.scratch/strict/iphone/validate-iphone14-pro-max.mjs` — validator dedicated to the deleted one-off iPhone extraction output.

## Sixth-pass strict cleanup

Date: 2026-08-23

This pass removes artifacts tied to the retired shared schema and completed
merge process. It preserves raw HTML under `data/tmp`, all rules and status
files, canonical JSON/schemas/templates/images, strict candidate JSON and
strict source images used for provenance, current schema-redesign notes,
`.scratch/device-data-reference.md`, `.scratch/full-context.md`, coverage and
HTML-capture provenance, current image audit evidence, and the aggregate final
validation evidence listed below.

### Obsolete root reports and shared-contract helpers

- `.scratch/apple-watch-data-completeness-audit.md` — historical pre-redesign Watch completeness snapshot superseded by the canonical Watch data and current independent schema.
- `.scratch/data-presence-audit.md` — historical 157-device/shared-schema inventory superseded by canonical files and current validation work.
- `.scratch/device-templates.md` — generated against the retired shared contract; canonical templates remain under `public/data/templates/`.
- `.scratch/final-validate.mjs` — retired validator hard-coded to the removed shared schema and old merge-audit output path.
- `.scratch/human-device-contract.md` — generated from the retired universal schema; `.scratch/device-data-reference.md` and independent schemas are retained.
- `.scratch/magic-keyboard-schema-gap-report.md` — obsolete proposal for extending the retired shared accessory contract; the dedicated Magic Keyboard schema exists.
- `.scratch/merge-readiness.md` — stale 157-device/shared-schema readiness report with obsolete counts and cleanup advice.
- `.scratch/source-gap-report.md` — stale pre-reconciliation report containing superseded candidate counts and Intel Mac gaps.

### Retired template-validation snapshots

The entire `.scratch/template-validation/` directory was removed. These nine
files validated templates against the retired shared contract; canonical
templates remain preserved:

- `.scratch/template-validation/README.md`
- `.scratch/template-validation/airpods.json`
- `.scratch/template-validation/apple-tv.json`
- `.scratch/template-validation/apple-watch.json`
- `.scratch/template-validation/homepod.json`
- `.scratch/template-validation/ipad.json`
- `.scratch/template-validation/iphone.json`
- `.scratch/template-validation/mac.json`
- `.scratch/template-validation/vision.json`

### Superseded strict validators and historical validation artifacts

Strict candidate JSON and source images remain preserved. The following 36
shared-schema validation outputs, one-time scripts, duplicate snapshots, and
hash/check files were removed:

- `.scratch/strict/data-model-contract.schema.json`
- `.scratch/strict/schema-remediation-report.md`
- `.scratch/strict/airpods/validation-report.json`
- `.scratch/strict/apple-tv/validation-report.json`
- `.scratch/strict/apple-watch/validate-remaining.mjs`
- `.scratch/strict/apple-watch/validation-remaining.json`
- `.scratch/strict/homepod/validation-report.json`
- `.scratch/strict/ipad/artifacts.sha256`
- `.scratch/strict/ipad/data-model-contract.schema.json`
- `.scratch/strict/ipad/final-report-v3.md`
- `.scratch/strict/ipad/image-byte-comparison-v2.txt`
- `.scratch/strict/ipad/image-byte-comparison-v3.txt`
- `.scratch/strict/ipad/image-verification-v2.txt`
- `.scratch/strict/ipad/images-local.sha256`
- `.scratch/strict/ipad/images.sha256`
- `.scratch/strict/ipad/strict-devices.checkpoint-original.json`
- `.scratch/strict/ipad/validate-ipad.mjs`
- `.scratch/strict/ipad/validation-report.json`
- `.scratch/strict/ipad/validation-v2-final.json`
- `.scratch/strict/ipad/validation-v2.json`
- `.scratch/strict/iphone/validate-remaining.mjs`
- `.scratch/strict/iphone/validation-remaining.json`
- `.scratch/strict/iphone/validation-report.json`
- `.scratch/strict/mac/mac-legacy-2020-2021.validation.json`
- `.scratch/strict/mac/mac-modern-remaining.validation.json`
- `.scratch/strict/mac/recover-mac-legacy-2020-2021.mjs`
- `.scratch/strict/mac/validate-mac-legacy-2020-2021.mjs`
- `.scratch/strict/mac/validation-remaining.json`
- `.scratch/strict/mac/validation-report.json`
- `.scratch/strict/vision/validation-report.json`
- `.scratch/strict/watch/artifacts.sha256`
- `.scratch/strict/watch/final-report.md`
- `.scratch/strict/watch/image-audit.json`
- `.scratch/strict/watch/populate-watch-images.mjs`
- `.scratch/strict/watch/validate-watch.mjs`
- `.scratch/strict/watch/validation-report.json`

The removed iPad checkpoint was byte-identical to the retained
`.scratch/strict/ipad/strict-devices.json`.

### Superseded merge snapshots, reports, and validators

The following 37 files describe the retired shared-schema merge or duplicate
the retained aggregate evidence:

- `.scratch/merge-audits/Aquinas-final-validation.md`
- `.scratch/merge-audits/Aquinas-reconciliation.md`
- `.scratch/merge-audits/airpods-final.md`
- `.scratch/merge-audits/airpods.json`
- `.scratch/merge-audits/airpods.validation.json`
- `.scratch/merge-audits/apple-tv.json`
- `.scratch/merge-audits/apple-tv.validation.json`
- `.scratch/merge-audits/apple-watch.json`
- `.scratch/merge-audits/apple-watch.md`
- `.scratch/merge-audits/apple-watch.validation.json`
- `.scratch/merge-audits/final-merge-audit.json`
- `.scratch/merge-audits/homepod.json`
- `.scratch/merge-audits/homepod.validation.json`
- `.scratch/merge-audits/image-reference-existence.json`
- `.scratch/merge-audits/images-final.md`
- `.scratch/merge-audits/ipad.json`
- `.scratch/merge-audits/ipad.validation.json`
- `.scratch/merge-audits/iphone.json`
- `.scratch/merge-audits/iphone.validation.json`
- `.scratch/merge-audits/json/airpods.report.json`
- `.scratch/merge-audits/json/apple-tv.report.json`
- `.scratch/merge-audits/json/apple-watch.report.json`
- `.scratch/merge-audits/json/canonical-integration-report.md`
- `.scratch/merge-audits/json/generate-section-reports.mjs`
- `.scratch/merge-audits/json/homepod.report.json`
- `.scratch/merge-audits/json/image-integrity-audit.mjs`
- `.scratch/merge-audits/json/ipad.report.json`
- `.scratch/merge-audits/json/iphone.report.json`
- `.scratch/merge-audits/json/mac.report.json`
- `.scratch/merge-audits/json/validate-canonical.mjs`
- `.scratch/merge-audits/json/vision.report.json`
- `.scratch/merge-audits/mac.json`
- `.scratch/merge-audits/mac.validation.json`
- `.scratch/merge-audits/report.md`
- `.scratch/merge-audits/schema-format-cleanup.md`
- `.scratch/merge-audits/vision.json`
- `.scratch/merge-audits/vision.validation.json`

### Duplicate quarantine image trees

The entire `.scratch/merge-audits/quarantine/` directory was removed: 222
files across these exact subtrees:

- `.scratch/merge-audits/quarantine/airpods-nested-images/` — 17 files.
- `.scratch/merge-audits/quarantine/apple-tv-nested-images/` — 39 files.
- `.scratch/merge-audits/quarantine/homepod-nested-images/` — 52 files.
- `.scratch/merge-audits/quarantine/iphone-nested-images/` — 69 files.
- `.scratch/merge-audits/quarantine/mac-nested-images/` — 45 files.

All 209 unique SHA-256 hashes represented by these 222 files have
byte-identical surviving copies under `public/data/` or `.scratch/strict/`.
No unique image content was removed.

### Aggregate validation evidence retained

- `.scratch/merge-audits/final-validation-report.json`
- `.scratch/merge-audits/image-verification.json`
- `.scratch/merge-audits/accessory-schema-validation.json`
- `.scratch/merge-audits/json/canonical-validation.json`
- `.scratch/merge-audits/json/image-integrity.json`

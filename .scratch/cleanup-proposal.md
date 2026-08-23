# Proposed second scratch cleanup

Date: 2026-08-23

This explicit proposal is limited to historical worker logs/checkpoints, superseded one-off extraction/probe scripts, and top-level intermediate audit snapshots. Public data, source inputs, final reports, strict evidence, templates, and reproducibility documents are excluded.

## Historical worker directories

- `.scratch/heartbeats/`
- `.scratch/checkpoints/`

## Superseded top-level one-off scripts

- `.scratch/add-watch-notes.mjs`
- `.scratch/build-batch1.mjs`
- `.scratch/build-iphone-remaining.mjs`
- `.scratch/build-mini2.mjs`
- `.scratch/coverage-audit-compare.mjs`
- `.scratch/coverage-audit-extract-v2.mjs`
- `.scratch/coverage-audit-extract.mjs`
- `.scratch/dump-target-values.mjs`
- `.scratch/extract-hidden.mjs`
- `.scratch/extract-visible-targets.mjs`
- `.scratch/merge-remaining.mjs`
- `.scratch/mini2-values.mjs`
- `.scratch/pauli-fix-tv-dimensions.mjs`
- `.scratch/pauli-normalize-images.mjs`
- `.scratch/probe-order.mjs`
- `.scratch/probe-rows.mjs`
- `.scratch/probe-selectors.mjs`

## Superseded top-level intermediate audit/error outputs

- `.scratch/ampere-validation.pending.json`
- `.scratch/coverage-audit-raw.json`
- `.scratch/coverage-audit-result.json`
- `.scratch/maxwell-errors.txt`
- `.scratch/pauli-normalization.json`
- `.scratch/relocation-audit.pending.json`

## Preserved boundaries

- `.scratch/full-context.md`
- `.scratch/coverage-audit-os26-os27.md`
- `.scratch/coverage-audit-os26-os27-sources.md`
- `.scratch/data-presence-audit.md`
- `.scratch/cleanup-manifest.md`
- `.scratch/human-device-contract.md`
- `.scratch/strict/data-model-contract.schema.json`
- `.scratch/final-validate.mjs`
- `.scratch/template-validation/`
- `.scratch/merge-audits/`
- `.scratch/strict/`
- `data/tmp/`
- `public/data/`
- `.scratch/cleanup-proposal.md`

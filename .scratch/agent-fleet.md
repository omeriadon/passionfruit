# Agent Fleet Structure

## Current Fleet

Hard cap: four active workers including Orchestrator.

| Agent        | Role                                                    | Status   | Progress                                                                                               |
| ------------ | ------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| Orchestrator | Coordination, final merge, validation, commit oversight | Complete | 100% (157 unique canonical devices; 158 reconciled target identities; Ajv zero errors; images 392/392) |
| Hegel        | iPhone SOURCE_ONLY extraction                           | Complete | 19 devices merged and Ajv-valid                                                                        |
| Herschel     | Mac SOURCE_ONLY extraction                              | Complete | 35 candidates delivered; 34 added after duplicate identity reconciliation                              |
| Fleet-Sync   | Fleet/status reconciliation                             | Complete | Status tables reconciled to PRESENT; readiness READY                                                   |

Pushed commit 611edf9. Final reconciliation: canonical JSON contains 157 unique device identities across eight sections. The evidence map has 158 rows because `Mac Studio (M1 Max or M1 Ultra, 2022)` was duplicated; status now maps it once as PRESENT. All sections pass Ajv Draft 2020-12 with zero errors and all 392 image references pass existence checks. Historical rows are retained below this section and are not active workers.

## Status Reporting Protocol

Every worker must update this file after each meaningful milestone and at least every five minutes while active.

- Set `Status` to one of `Running`, `Blocked`, `Complete`, or `Errored`.
- Set `Progress` to a rough percentage of **remaining time**, not completed steps:
  - `95%` means just started.
  - `50%` means roughly half the expected wall-clock work remains.
  - `5%` means nearly done.
  - `0%` means complete.
- Include a short parenthetical blocker note when below `100%` and blocked.
- Never remove historical decisions; update only your own row.

Example: `Running | 35% (parsing source 3 of expected 5)`.

## Canonical State

- Inputs: `data/tmp/<section>/`
- Checkpoints and candidates: `/var/folders/s_/ms68q0zx137_d7r08rxtnp9w0000gq/T/opencode/`
- Canonical outputs: `public/data/<section>/`
- Status: `data/status/<section>.md`
- Rules: `data/rules/<section>.md`
- Schemas: `public/data/<section>/<section>.schema.json`
- Coverage: `public/data/<section>/devices-missing.md`

## Key Temporary Artifacts

| Artifact                            | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `STATE*.md`                         | Per-worker checkpoints after outage.           |
| `data-model-contract.md`            | Authoritative strict structured data contract. |
| `data-model-contract.schema.json`   | Shared schema fragments and examples.          |
| `candidate-index.json`              | Device-to-candidate extraction index.          |
| `coverage-classification.json`      | Canonical device pipeline states.              |
| `source-map.md` / `source-map.json` | Input-to-device coverage maps.                 |
| `schema-audit.md`                   | Schema defects and blockers.                   |
| `image-audit.md`                    | Image integrity findings.                      |
| `merge-plans/`                      | Deterministic merge procedures.                |

## State Vocabulary

| State             | Meaning                                               |
| ----------------- | ----------------------------------------------------- |
| `PRESENT`         | Merged and validated in canonical JSON.               |
| `CANDIDATE`       | Structured candidate exists or extraction is active.  |
| `SOURCE_ONLY`     | Identified in supplied HTML, no candidate yet.        |
| `NO_EVIDENCE`     | No supplied source and no extracted evidence.         |
| `UNUSABLE_SOURCE` | Evidence exists only in zero-byte or malformed input. |
| `UNKNOWN`         | Classification cannot yet be proven.                  |

## Restart Policy

1. Read the relevant checkpoint and canonical artifacts.
2. Verify existing output validity.
3. Resume only the next atomic step.
4. Apply `ulimit -n 65536` inside commands that open many files.
5. Never mark source-backed devices `MISSING`.

## Next Consolidated Workstream

Use one extraction worker per section only when explicitly requested. Each owns isolated candidate output. One merge worker per section owns canonical JSON after strict-contract remodel and validation.

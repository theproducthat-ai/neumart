# Downstream Command V2 Protocol

**Version**: 2.0
**Owner**: Product Lead
**Status**: Active
**Last Updated**: 2026-06-25

---

## Purpose

This document defines the mandatory execution protocol for all downstream Product OS commands:

`/product-grill` `/product-impact` `/product-prd` `/product-stories`
`/product-devplan` `/product-qa` `/product-uat` `/product-release` `/product-resume`

Every downstream command must read and apply this protocol before taking any action.

---

## 1. V2 Object Source of Truth

### 1.1 Where Objects Live

| Layer | Path | Role |
|---|---|---|
| Objects | `product/objects/` | Source of truth — all product work |
| Interfaces | `product/os/interfaces/` | Authoritative command specifications |
| Policies | `product/os/policies/` | Rules governing command behaviour |
| Intelligence | `product/os/intelligence/` | AI reasoning engines |
| Indexes | `product/indexes/` | Lookup tables and registries |
| Views | `product/views/` | Stakeholder summaries |
| Module workspaces | `product/module-workspaces/` | Per-module active work state |

### 1.2 Legacy Folders Are Read-Only

Numbered folders (`product/00-*` through `product/14-*`, `product/99-*`) are **Layer 5 — Legacy / Reference**. They exist for historical context only.

**Rules:**
- Do NOT write new product objects to any numbered folder.
- Do NOT update V1 registries (`MASTER_REGISTRY.md`, `REQUEST_REGISTER.md`, `ACTIVE_REQUESTS.md`, `DEVELOPMENT_TRACKER.md`, `BUG_REGISTER.md`) as part of V2 command output.
- Legacy folders MAY be read as fallback reference if no V2 object exists yet. When reading a V1 object, note it as `[V1 reference — pending migration]` in the output.

**Violation:** Any command that writes to a legacy numbered folder has failed V2 compliance.

---

## 2. Object Resolution Order

When a command receives an input ID, resolve it in this order:

```
Step 1 — Check product/objects/{type-folder}/
Step 2 — Check product/indexes/MASTER_OBJECT_INDEX.md (by ID or title keyword)
Step 3 — Check the relevant type index (e.g. REQUEST_INDEX.md, FEATURE_INDEX.md, PRD_INDEX.md)
Step 4 — Check product/module-workspaces/MOD-{MODULE}.md for active work references
Step 5 — Check product/views/ACTIVE_WORK_VIEW.md
Step 6 — [Fallback only] Read legacy folders as reference. Note [V1 reference] in output.
```

**If no object is found at any step:** Surface a clear `OBJECT NOT FOUND` error with recommended next action (typically: run `/product-request` to create the object first).

---

## 3. Lane Awareness

### 3.1 Read Lane Before Generating Artifacts

Every downstream command must read the `lane` field from the source object's frontmatter before generating any artifact.

```yaml
# In the source object:
lane: "Lane 1"          # Fast Fix
lane: "Lane 2"          # Small Enhancement
lane: "Lane 3"          # Standard Feature
lane: "Lane 4"          # Strategic Initiative
lane: "Lane 5"          # Incident
lane: "Lane 6"          # Compliance/Security
lane: "Lane 7"          # Tech Debt
lane: "Lane 8"          # Operational Change
lane: "Lane 9"          # Business/Commercial
lane: "Lane 10"         # Experiment
```

### 3.2 Apply Lane Policy

After reading the lane, apply `product/os/policies/WORK_TYPE_LANES.md` to determine:
- Which artifacts are **Required** for this lane
- Which are **Recommended**
- Which are **Not needed**

### 3.3 Apply Artifact Requirement Engine

Apply `product/os/intelligence/ARTIFACT_REQUIREMENT_ENGINE.md` to:
- Confirm the artifact set for the confirmed lane
- Apply any blocking flag modifiers (schema_change, payment_change, etc.)
- Produce the artifact checklist used in the output

### 3.4 Do Not Generate Disallowed Artifacts

**A command must not generate artifacts that the Artifact Requirement Engine classifies as "Not needed" for the confirmed lane.**

Examples:
- Lane 1 (Fast Fix): PRD, UAT run, and Discovery Session are Not needed — do not generate them.
- Lane 2 (Small Enhancement): PRD is Optional — only generate if explicitly requested.
- Lane 7 (Tech Debt): PRD is Not needed — do not generate.

---

## 4. Work Type Awareness

Different input types must be handled differently. A command must determine the `object_type` and `source_type` of its input before proceeding.

| Object Type | Handling Rule |
|---|---|
| Bug (`objects/bugs/`) | Lane 1 or Lane 5. No PRD. No UAT (unless lane upgrade). QA smoke check only. |
| Request (`objects/requests/`) | Normal lane-based flow. |
| Roadmap Option (`objects/roadmap-options/`) | **NOT ready for delivery.** Must be activated into a Request via `/product-request` first. Any delivery command (PRD, stories, devplan) must block and explain. |
| Deferred Item (`objects/deferred-items/`) | **NOT ready for delivery.** Must be activated before delivery artifacts are generated. Block and explain if invoked directly. |
| Change Note (`objects/change-notes/`) | Scope change record. Not a delivery artifact trigger. |
| Feature (`objects/features/`) | Valid input for stories, devplan, QA, UAT, release commands. |
| Incident (`objects/incidents/`) | Lane 5 only. Drives RCA and hotfix — not PRD/stories/devplan. |
| Experiment (`objects/experiments/`) | Lane 10. Drives feature flag and measurement plan — not full PRD. |

---

## 5. Dry-Run Behaviour

### 5.1 Every Command Must Support `--dry-run`

When `--dry-run` is appended to any command, the command must:

1. Execute all reasoning steps (lane detection, artifact requirement check, prerequisite gate check).
2. Output a full `DRY-RUN PREVIEW` block showing what would be created or updated.
3. Assign **preview IDs** (marked with `[PREVIEW]`) — these do not reserve sequence numbers.
4. Make **no changes** to any file in `product/objects/`, `product/indexes/`, `product/views/`, or `product/module-workspaces/`.

### 5.2 Dry-Run Output

```
DRY-RUN PREVIEW — /product-{command} {ID}
==========================================
Object ID:         [PREVIEW] {semantic-id-preview}
Source object:     {source-id} ({path})
Source type:       {object_type}
Lane:              {lane}
Template:          {template-name}
Blocking gates:    {gates that must be cleared — or: None}

ARTIFACTS — WOULD CREATE:
  - {object-type}: {preview-id} → product/objects/{type}/{slug}.md
  - {object-type}: {preview-id} → product/objects/{type}/{slug}.md

ARTIFACTS — WOULD UPDATE:
  - product/indexes/MASTER_OBJECT_INDEX.md
  - product/indexes/{TYPE_INDEX}.md
  - product/views/{RELEVANT_VIEW}.md
  - product/module-workspaces/MOD-{MODULE}.md

ARTIFACTS NOT REQUIRED FOR THIS LANE:
  - {artifact}: Not needed ({reason from ARTIFACT_REQUIREMENT_ENGINE})

ASSUMPTIONS:
  - {assumption}

OPEN QUESTIONS:
  - {question}

WRITE MODE:    DRY-RUN — No files written
FILES CHANGED: No
CODE CHANGED:  No
LEGACY SYNC:   No

NEXT ACTION:
  Re-run without --dry-run to commit and assign real IDs.
  Real IDs are calculated at commit time from the current index state.
```

### 5.3 Preview ID Format

Preview IDs use the semantic format with `[PREVIEW]` prefix:
```
[PREVIEW] DISCOVERY-COM-PLP-CAROUSEL-001
[PREVIEW] PRD-COM-PLP-CAROUSEL-V1
[PREVIEW] STORY-COM-PLP-CAROUSEL-001
```

**Dry-run preview IDs are not reserved.** Final IDs are recalculated from the current index state at commit time.

---

### 5.4 QA Command Dry-Run — Artifact Preview Only

When `/product-qa` is run with `--dry-run`, the output is **artifact preview only**. It never simulates test execution or predicts test outcomes.

**QA dry-run must show:**
- Which artifact objects would be created (Test Plan, Test Cases, QA Run) with `[PREVIEW]` IDs
- Test case titles, preconditions, steps, and expected results (for tester planning use)
- `execution_status: Not executed`
- `overall_result: Not executed — preview only`
- `pass_count / fail_count / skipped_count: Not executed` (not numeric values)

**QA dry-run must NOT show:**
- `Predicted: PASS` or `Predicted: FAIL` per test case
- `PREDICTED OVERALL RESULT` or `PREDICTED TEST SUMMARY` sections
- Numeric pass/fail/skip counts
- `BUGS FOUND` predictions
- Any status transition for the source object or any downstream dependent object

**Source ID discipline:**
`ARTIFACTS — WOULD UPDATE` references only the source object being QA-tested.
A dependent object that relies on this QA outcome (e.g., REQ-0009 when source is REQ-0003) appears only under `DOWNSTREAM DEPENDENCY NOTE` in the output — never in `ARTIFACTS — WOULD UPDATE`.

**Artifact count discipline:**
The count in `ARTIFACTS — WOULD CREATE` must equal `test_plan_count + test_case_count + qa_run_count + bug_count`. Omit the count from the heading rather than show an incorrect number.

**Live QA run without tester results:**
Running `/product-qa {ID}` live without actual tester-provided results creates the QA Run with `status: Ready for Execution` or `In Progress`. `overall_result: Passed` is set only when actual test execution results are recorded. QA Passed must never be inferred from description or assumption alone.

---

## 6. Standard Output Format

Every downstream command must include this block in its output. No command may omit any field.

```
{COMMAND} COMPLETE / BLOCKED / DRY-RUN PREVIEW
===============================================
Object ID:          {id of the created/assessed object}
Source object:      {id of the input object} ({path})
Source type:        {object_type}
Lane:               {lane name and number}
Template:           {template file used}
Blocking gates:     {gates that must be cleared — or: None}

ARTIFACTS CREATED ({n}):
  - {TYPE}: {id} → {path}

ARTIFACTS NOT REQUIRED FOR THIS LANE:
  - {artifact}: Not needed — {reason}

ASSUMPTIONS:
  - {assumption — or: None}

OPEN QUESTIONS:
  - {question — or: None}

WRITE MODE:    {LIVE | DRY-RUN}
FILES CHANGED: {Yes — n files | No}
CODE CHANGED:  No
LEGACY SYNC:   {Updated {file} for backward reference | No}
NEXT ACTION:
→ {next command} — {one sentence reason}
```

---

## 7. Index, View, and Workspace Updates

Every command that creates or updates an object must update the following. Commands that are read-only (`/product-resume`) are exempt.

### 7.1 Required Index Updates

| Index File | Update When |
|---|---|
| `product/indexes/MASTER_OBJECT_INDEX.md` | Any new object created |
| `product/indexes/REQUEST_INDEX.md` | Request object status changes |
| `product/indexes/FEATURE_INDEX.md` | Feature object created or updated |
| `product/indexes/PRD_INDEX.md` | PRD created or approved |
| `product/indexes/USER_STORY_INDEX.md` | Stories created |
| `product/indexes/BUG_INDEX.md` | Bugs created or resolved |
| `product/indexes/RISK_INDEX.md` | Risk objects created |
| `product/indexes/DEPENDENCY_INDEX.md` | Dependency objects created |
| `product/indexes/RELEASE_INDEX.md` | Release objects created |
| `product/indexes/TRACEABILITY_MATRIX.md` | Any new object with a parent/source link |

### 7.2 View Updates

Update the most relevant view(s) after each command:

| View | Update When |
|---|---|
| `product/views/ACTIVE_WORK_VIEW.md` | Any status change on an active item |
| `product/views/REQUEST_VIEW.md` | Request object status changes |
| `product/views/QA_VIEW.md` | QA run created or updated |
| `product/views/RELEASE_VIEW.md` | Release object created |
| `product/views/INCOMPLETE_WORK_VIEW.md` | Blocked or stale items identified |

### 7.3 Module Workspace Updates

Update `product/module-workspaces/MOD-{MODULE}.md` for the module(s) owning the changed objects. Record:
- Object ID and type
- Current status
- Next action

---

## 8. Required Traceability Fields

Every product object created by a downstream command must include these fields in its YAML frontmatter:

```yaml
parent_object_id: "{id of the parent object — feature, request, or bug}"
source_request_id: "{REQ-ID or BUG-ID that triggered this work}"
module_id: "{MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT}"
screen_id: "{SCREEN-ID — if applicable; omit if not screen-related}"
related_feature_id: "{FEAT-ID — if applicable}"
status: "{current status}"
version: "1.0"
created_date: "{YYYY-MM-DD}"
updated_date: "{YYYY-MM-DD}"
object_type: "{discovery_session | impact_assessment | prd | story | task | qa_run | uat_run | release | ...}"
```

**Omitting any required traceability field is a validation failure.**

---

## 9. Blocking Gate Checks

### 9.1 Every Command Must Check Prerequisites

Before generating any artifact, every command must verify that required upstream objects exist. If a required upstream artifact is missing, the command must:

1. Output a `BLOCKED` header instead of `COMPLETE`.
2. List all missing prerequisites clearly.
3. State the exact command to run next to resolve the block.
4. Not create any partial output.

### 9.2 Standard Prerequisite Chain

```
Request / Bug exists in product/objects/
  ↓
[For Lane 3/4 with open questions] Discovery Session exists in product/objects/discovery/
  ↓
[For Lane 3/4 high-risk flags] Impact Assessment exists in product/objects/impact-assessments/
  ↓
PRD exists in product/objects/prds/ AND status = Approved
  [Lane 2: optional — check ARTIFACT_REQUIREMENT_ENGINE]
  [Lane 1: skip PRD entirely]
  ↓
User Stories exist in product/objects/stories/ (all linked to PRD)
  [Lane 2: lightweight stories acceptable]
  [Lane 1: skip stories]
  ↓
Development Plan exists in product/objects/tasks/
  [Lane 1: quick fix notes only]
  [Lane 2: lightweight implementation notes only]
  ↓
QA Run exists in product/objects/qa-runs/ with status = Passed
  [Lane 1: QA smoke check only]
  ↓
UAT Run exists in product/objects/uat-runs/ with sign_off_status = Signed Off
  [Lane 1: skip UAT]
  [Lane 2: skip UAT unless explicitly configured]
  ↓
Release Object created in product/objects/releases/
```

---

## 10. No Application Code

Downstream commands are Product OS documentation and artifact commands. They must not:

- Modify any file in `convex/`, `src/`, `app/`, `components/`, `lib/`, `styles/`, or any application code directory.
- Modify `schema.ts`, `package.json`, `tsconfig.json`, or any build/config file.
- Install, remove, or update dependencies.
- Generate executable code directly (a Dev Plan may specify what code to write as a planning artifact, but it does not write the code itself).

**The only exception:** `/product-devplan` creates an AI Coding Prompt Object (`product/objects/prompts/`) — this is a product planning artifact containing code instructions, not application code itself.

---

## 11. Semantic ID Format

All downstream commands must use V2 semantic IDs. Never use V1 sequential-only IDs.

### 11.1 ID Format

```
{PREFIX}-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}
```

| Prefix | Object Type | Example |
|---|---|---|
| DISCOVERY | Discovery Session | DISCOVERY-COM-PLP-CAROUSEL-001 |
| IMPACT | Impact Assessment | IMPACT-COM-PLP-CAROUSEL-001 |
| RSK | Risk Object | RSK-COM-PAY-CAROUSEL-001 |
| DEP | Dependency Object | DEP-COM-PLP-CAROUSEL-001 |
| PRD | Product Requirements Document | PRD-COM-PLP-CAROUSEL-V1 |
| REQ-SPEC | Requirement Object | REQ-SPEC-COM-PLP-CAROUSEL-001 |
| AC | Acceptance Criterion | AC-COM-PLP-CAROUSEL-001 |
| STORY | User Story | STORY-COM-PLP-CAROUSEL-001 |
| TASK | Development Task | TASK-COM-PLP-CAROUSEL-001 |
| PROMPT | AI Coding Prompt | PROMPT-COM-PLP-CAROUSEL-001 |
| TESTPLAN | Test Plan | TESTPLAN-COM-PLP-CAROUSEL-001 |
| TESTCASE | Test Case | TESTCASE-COM-PLP-CAROUSEL-001 |
| QA | QA Run | QA-COM-PLP-CAROUSEL-001 |
| UAT | UAT Run | UAT-COM-PLP-CAROUSEL-001 |
| RELEASE | Release Object | RELEASE-COM-PLP-CAROUSEL-001 |
| ROLLBACK | Rollback Plan | ROLLBACK-COM-PLP-CAROUSEL-001 |

### 11.2 Dry-Run Preview IDs

Dry-run preview IDs prepend `[PREVIEW]` to the semantic ID. They do not reserve sequence numbers. Final IDs are recalculated at commit time.

---

## 12. Failure Conditions Applicable to All Commands

The following conditions represent violations of this protocol. Every command must detect and surface these before producing output.

| Failure Condition | Required Response |
|---|---|
| Command would write to a legacy numbered folder | BLOCK — state the V2 target path |
| `--dry-run` flag is not supported by this command | INVALID — all commands must implement dry-run |
| Output block is missing `FILES CHANGED` field | INVALID — output is incomplete |
| PRD being generated for a Lane 1 (Fast Fix) bug | BLOCK — PRD is Not needed for Lane 1 |
| Stories being generated for a Roadmap Option without activation | BLOCK — roadmap options must be activated via /product-request first |
| Dev Plan being generated before required PRD/security/API gates cleared | BLOCK — list missing gates |
| Index being updated with wrong object type | INVALID — check type against MASTER_OBJECT_INDEX schema |
| Required traceability fields missing from created object | INVALID — object fails V2 schema |
| Dry-run IDs being treated as reserved in any subsequent write | INVALID — recalculate at commit time |
| Application code being modified | CRITICAL VIOLATION — stop immediately |
| `/product-devplan` Lane 1 output merges `FILES CHANGED` with application file list (e.g. `FILES CHANGED: No — N application files identified`) | INVALID — use `APPLICATION FILES LIKELY IMPACTED: N` as a separate field; `FILES CHANGED` reports Product OS artifact writes only |
| `/product-qa` dry-run shows bug `fix_status → Resolved` when `fix_status` is not `Fixed`, `Merged`, or `Ready for QA` | INVALID — output STATUS UPDATE DEFERRED block; do not preview premature status transition |
| `/product-qa` dry-run includes Open Bugs → Resolved in ARTIFACTS — WOULD UPDATE before fix_status gate is cleared | INVALID — move to STATUS UPDATE DEFERRED block |
| `/product-qa` live run sets bug `fix_status` to Resolved without fix_status gate (`Fixed` / `Merged` / `Ready for QA`) confirmed | INVALID — check fix_status gate before applying any status transition |
| `/product-qa` dry-run shows `Predicted: PASS` or `Predicted: FAIL` per test case | INVALID — dry-run is artifact preview only; no execution simulation permitted (see Section 5.4) |
| `/product-qa` dry-run shows `PREDICTED OVERALL RESULT` or `PREDICTED TEST SUMMARY` | INVALID — dry-run overall_result must be `Not executed — preview only` |
| `/product-qa` dry-run records numeric pass/fail/skip counts | INVALID — all three counts must read `Not executed` in dry-run mode |
| `/product-qa` dry-run updates source object status or any dependent object status | INVALID — no status transitions in dry-run; source and dependent objects are immutable |
| `/product-qa` dry-run `ARTIFACTS — WOULD UPDATE` references a dependent object as source (e.g., REQ-0009 when source is REQ-0003) | INVALID — dependent objects belong in `DOWNSTREAM DEPENDENCY NOTE` only |
| `/product-qa` dry-run artifact count in heading does not match sum of listed objects | INVALID — count must equal `test_plan_count + test_case_count + qa_run_count + bug_count`; omit heading count rather than show wrong number |
| Live `/product-qa` marks `QA Passed` without actual tester results or verified execution evidence | INVALID — do not infer Passed from description; QA Passed requires actual execution results |
| `/product-uat` creates UAT artifacts (uat-runs, feedback, limitations, UAT index update) for a Lane 1 Fast Fix bug | INVALID — output UAT NOT REQUIRED block; no UAT artifacts for Lane 1 |

---

## Related Files

- `product/os/PRODUCT_OS_V2_ARCHITECTURE.md` — Layer model and source of truth structure
- `product/os/policies/WORK_TYPE_LANES.md` — Lane definitions and artifact requirements
- `product/os/intelligence/ARTIFACT_REQUIREMENT_ENGINE.md` — Artifact checklist by lane
- `product/os/intelligence/NEXT_ACTION_ENGINE.md` — Next action determination logic
- `product/os/intelligence/LANE_SELECTION_ENGINE.md` — Lane selection rules
- `product/os/policies/ID_RULES.md` — Full ID format rules
- `product/os/policies/STATUS_TRANSITION_RULES.md` — Valid status transitions
- `product/os/policies/TRACEABILITY_RULES.md` — Traceability requirements
- `product/indexes/MASTER_OBJECT_INDEX.md` — Master object registry
- `product/indexes/TRACEABILITY_MATRIX.md` — Relationship traceability

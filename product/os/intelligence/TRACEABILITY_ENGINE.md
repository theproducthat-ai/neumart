# Nuemart Product OS — Traceability Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

The Traceability Engine builds, maintains, and verifies the complete chain of evidence connecting every product decision — from the earliest business goal — all the way through to a deployed, monitored release.

A complete traceability chain means: for any feature in production, you can answer every one of these questions with a pointer to a specific document:
- Why was this built? (Business Goal → Initiative → Request)
- What was agreed? (PRD → Requirements → Acceptance Criteria)
- What was built? (User Stories → Tasks → Development Plan)
- Was it tested? (Test Cases → QA Run)
- Was it accepted? (UAT Run → Sign-off)
- Was it released safely? (Release → Rollback Plan → Monitoring Signals)

Without traceability, the Product OS cannot enforce governance, validate releases, or extract reliable knowledge for future planning.

---

## The Master Traceability Chain

```
Business Goal
  └── Roadmap Theme
        └── Initiative
              └── Feature
                    └── Request
                          └── Discovery Session
                                └── PRD
                                      └── Requirement
                                            └── Acceptance Criterion
                                                  └── User Story
                                                        └── Task
                                                              └── Test Case
                                                                    └── QA Run
                                                                          └── UAT Run
                                                                                └── Release
                                                                                      └── Monitoring Signal
```

**Direction:** Each object links downward to its children and upward to its parent. Both directions must be populated.

**Lateral links:** Some objects link laterally:
- Bug → Test Case (the test that found the bug)
- Bug → User Story (the story the bug violates)
- Decision → Feature / PRD / Discovery Session (the scope it governs)
- Known Limitation → UAT Run + Feature
- Risk → Impact Assessment + Feature
- Dependency → Development Plan + Feature

---

## Chain Validation Rules

### Rule T1 — Release must trace to Feature

Every Release Object must contain a `feature_id` link, and the linked Feature Object must exist.

**Validation check:** `release.feature_id` → Feature Object exists in OBJECT_INDEX.md

**Failure:** Release without Feature link → `BROKEN_TRACEABILITY` gap, severity Blocking

---

### Rule T2 — Feature must trace to Request or Initiative

Every Feature Object must link to at least one parent object: a Request Object (for reactive feature work) or an Initiative Object (for proactive roadmap-driven work).

**Validation check:** `feature.parent_request_id` OR `feature.parent_initiative_id` must be populated and the linked object must exist.

**Failure:** Feature with no parent → `BROKEN_TRACEABILITY` gap, severity Warning (not Blocking, but surfaces as orphaned feature)

---

### Rule T3 — User Story must trace to Requirement in a PRD

Every User Story Object must link to at least one Requirement Object, and that Requirement must belong to a PRD.

**Validation check:** `story.requirement_ids` → Requirement Objects exist → each Requirement has a `prd_id` → PRD Object exists

**Failure:** Story without Requirement link → `MISSING_RELATIONSHIP` gap, severity Blocking

---

### Rule T4 — Test Case must trace to User Story or Acceptance Criterion

Every Test Case Object must link to either:
- A User Story Object (the story it verifies), or
- An Acceptance Criterion Object (the specific criterion it tests)

**Validation check:** `test_case.story_id` OR `test_case.acceptance_criterion_id` must be populated.

**Failure:** Test Case without story/AC link → `MISSING_RELATIONSHIP` gap, severity Warning

---

### Rule T5 — Bug must link to the Test Case that found it

Every Bug Object created during QA must link to the specific Test Case that exposed the bug.

**Validation check:** `bug.test_case_id` must be populated and the Test Case Object must exist.

**Failure:** Bug without Test Case link → `MISSING_RELATIONSHIP` gap, severity Warning (reduces root cause traceability)

---

### Rule T6 — QA Run must link to Test Plan and Test Cases

Every QA Run Object must link to:
- The Test Plan that governed the run
- At least one Test Case result

**Validation check:** `qa_run.test_plan_id` AND `qa_run.test_case_results` (min length: 1)

**Failure:** QA Run without Test Plan link → `MISSING_RELATIONSHIP` gap, severity Blocking

---

### Rule T7 — UAT must follow QA

Every UAT Run Object must link to a QA Run Object, and the linked QA Run must have verdict `Passed`.

**Validation check:** `uat_run.qa_run_id` → QA Run exists with `qa_verdict: Passed`

**Failure:** UAT Run with no QA predecessor → `BROKEN_TRACEABILITY` gap, severity Blocking. UAT Run linked to failed QA → Governance Agent blocks progression.

---

### Rule T8 — Release must link to UAT Run or explicit waiver

Every Release Object must link to either:
- A UAT Run Object with verdict `Signed Off`, or
- A Decision Object explicitly waiving the UAT requirement (with documented approver)

**Validation check:** `release.uat_run_id` OR `release.uat_waiver_decision_id` must be populated.

**Failure:** Release without UAT evidence and without waiver Decision Object → Governance Agent blocks the release, severity Blocking.

---

### Rule T9 — Requirement must link to Acceptance Criteria

Every Requirement Object must have at least one Acceptance Criterion Object linked to it.

**Validation check:** `requirement.acceptance_criterion_ids` (min length: 1)

**Failure:** Requirement without acceptance criteria → `COVERAGE_GAP`, severity Warning. A requirement that cannot be accepted is a requirement that cannot be verified.

---

### Rule T10 — All objects must be in OBJECT_INDEX.md

Every Product Object must have an entry in OBJECT_INDEX.md. An object that exists as a file but is absent from the index is invisible to all engines.

**Validation check:** Every file in `product/objects/**/*.md` must have a corresponding entry in OBJECT_INDEX.md.

**Failure:** Object file without index entry → `MISSING_METADATA` gap on the index, severity Warning.

---

## Inputs

| Input | Source | Notes |
|---|---|---|
| All object files | `product/objects/**/*.md` | Full scan for chain building |
| OBJECT_INDEX.md | `product/indexes/` | Starting point for all object lookups |
| RELATIONSHIP_INDEX.md | `product/indexes/` | Pre-indexed relationships for fast chain traversal |
| TRACEABILITY_MAP.md | `product/indexes/` | Current traceability chain state (updated by this engine) |

---

## Reasoning Steps

### Step 1 — Load All Known Objects

Read OBJECT_INDEX.md to get the full list of Product Objects. Group by type.

### Step 2 — Build Relationship Graph

For each object: read its `relationships` block. Construct a directed graph:
- Nodes = Product Objects
- Edges = directed relationships (parent → child, source → target)

Store the graph in memory (or write to RELATIONSHIP_INDEX.md if updating).

### Step 3 — Identify Chain Entry Points

Entry points are terminal objects that should always have a complete chain reaching back to a root:
- All Release Objects
- All QA Run Objects
- All UAT Run Objects

For each entry point: attempt to walk the full chain backwards to a root (Request or Initiative).

### Step 4 — Walk Each Chain

Starting from each Release Object, follow links backwards:

```
Release → UAT Run → QA Run → Test Plan → (Test Cases → User Stories → Requirements → PRD → Feature → Request)
```

At each step: verify the link exists, the target object exists, and the reverse link exists on the target.

Document the traversal result: `complete` or `broken at [object_id] → [missing link type]`.

### Step 5 — Validate Against Chain Rules (T1–T10)

For each chain traversal result, validate all 10 chain rules. Log every rule violation.

### Step 6 — Calculate Coverage

For each PRD Object: calculate Acceptance Criterion coverage (ACs with at least one Test Case / total ACs × 100).

For each Feature: calculate User Story coverage (Stories with at least one Test Case / total Stories × 100).

### Step 7 — Write to TRACEABILITY_MAP.md

Update TRACEABILITY_MAP.md with:
- All complete chains (validated, no breaks)
- All broken chains (with specific break points and gap IDs)
- Coverage statistics per Feature and PRD

### Step 8 — Output Gap Flags

Forward all traceability violations to GAP_DETECTION_ENGINE.md as `BROKEN_TRACEABILITY` or `MISSING_RELATIONSHIP` gap objects.

---

## Output Objects

| Output | Type | Notes |
|---|---|---|
| TRACEABILITY_MAP.md | Updated | Complete and broken chains documented |
| RELATIONSHIP_INDEX.md | Updated | All relationships indexed |
| GAP flags | Forwarded to GAP_DETECTION_ENGINE | Rule violations become gaps |

---

## Required Metadata

Every relationship record in every object must include:

```yaml
relationships:
  - relationship_type: <type>       # e.g., spawned_by, implements, covers, child_of, blocks, depends_on
    source_object_id: <this object's ID>
    target_object_id: <linked object's ID>
    target_object_type: <type of linked object>
    confidence: Confirmed | Inferred | Assumed
    created_at: <ISO datetime>
    created_by: AI | Human
    notes: "<optional: why this link exists>"
```

**Confidence meanings:**
- `Confirmed` — The link was explicitly stated by the human or is documented in the source object
- `Inferred` — The AI derived this link from context; it is very likely correct but not explicitly stated
- `Assumed` — The AI assumed this link must exist based on lifecycle rules; requires human verification

---

## Failure Conditions

| Failure | Handling |
|---|---|
| RELATIONSHIP_INDEX.md not populated | Build from scratch by scanning all object files; flag as advisory gap if index was expected to exist |
| Object file referenced in a link does not exist | Flag as `MISSING_OBJECT` gap in GAP_DETECTION_ENGINE; mark chain as broken at this point |
| Circular relationship detected | Flag as `CIRCULAR_DEPENDENCY` gap; surface for human review; do not follow the cycle |
| TRACEABILITY_MAP.md write fails | Output chain analysis to console/log; flag write failure as a system issue |
| No Release Objects exist | Chain building still runs for incomplete chains; output partial chain status per Feature |

---

## Nuemart Traceability Example (Numeric IDs)

The carousel feature's traceability chain as of 2026-06-22:

```
REQ-0002 (Carousel Promotional Banner)
  └── PRD-0002
        └── US-0009 (Render carousel on PLP)
        └── US-0010 (Auto-scroll behavior)
        └── US-0011 (Navigation dots)
        └── US-0012 (Touch/swipe support)
        └── US-0013 (Banner click navigation)
        └── US-0014 (Accessibility)
              └── QA-0001 (QA Run — Carousel)
                    └── UAT-0001 (UAT Run — Carousel)
                          └── Release (pending — not yet created)
```

**Chain status:** Complete through UAT-0001. Release Object not yet created. Next action: `/product-release REQUEST-COM-PLP-CAROUSEL-001`.

**Broken links:** None detected in the numeric ID chain.

**Coverage:** QA-0001 verified against all 6 user stories (US-0009 through US-0014). UAT-0001 signed off.

---

## Nuemart Traceability Example (Semantic IDs)

The same chain expressed with semantic IDs:

```
REQUEST-COM-PLP-CAROUSEL-001
  └── PRD-COM-PLP-CAROUSEL-V1
        └── STORY-COM-PLP-CAROUSEL-RENDER-001
        └── STORY-COM-PLP-CAROUSEL-AUTOSCROLL-001
        └── STORY-COM-PLP-CAROUSEL-NAVDOTS-001
        └── STORY-COM-PLP-CAROUSEL-SWIPE-001
        └── STORY-COM-PLP-CAROUSEL-CLICK-001
        └── STORY-COM-PLP-CAROUSEL-A11Y-001
              └── QA-COM-PLP-CAROUSEL-RUN-001
                    └── UAT-COM-PLP-CAROUSEL-RUN-001
                          └── RELEASE-COM-PLP-CAROUSEL-001 (pending)
```

**Chain validation results:**
- T1 (Release → Feature): Pending — Release not yet created
- T2 (Feature → Request): FEATURE-COM-PLP-CAROUSEL → REQUEST-COM-PLP-CAROUSEL-001 ✓
- T3 (Stories → Requirements → PRD): All 6 stories link to PRD-COM-PLP-CAROUSEL-V1 ✓
- T4 (Test Cases → Stories): QA-COM-PLP-CAROUSEL-RUN-001 covers all 6 stories ✓
- T6 (QA Run → Test Plan): QA-COM-PLP-CAROUSEL-RUN-001 links to TESTPLAN-COM-PLP-CAROUSEL-001 ✓
- T7 (UAT → QA Passed): UAT-COM-PLP-CAROUSEL-RUN-001 links to QA Run with verdict Passed ✓
- T8 (Release → UAT): Pending — Release not yet created

---

## Relationship Type Registry

Standard relationship types used across all Product Objects:

| Relationship Type | Direction | Meaning |
|---|---|---|
| `spawned_by` | Child → Parent | This object was created because of the parent (e.g., Feature spawned_by Request) |
| `implements` | Story → Requirement | This story implements the requirement |
| `covers` | Test Case → Story/AC | This test case covers the story or acceptance criterion |
| `child_of` | Sub-feature → Feature | Hierarchy relationship |
| `part_of` | Requirement → PRD | Membership relationship |
| `found_in` | Bug → Test Case | The test case that surfaced this bug |
| `blocks` | Object A → Object B | Object A must be resolved before Object B can proceed |
| `depends_on` | Object A → Object B | Object A requires Object B to exist or be complete |
| `supersedes` | New → Old | The new object replaces the old one |
| `governs` | Decision → Object | This decision controls the scope or approach of the target object |
| `waives` | Decision → Gate | This decision waives the governance gate |
| `linked_to` | Generic | General informational link when no specific type applies |

---

## Related Files

- `AI_REASONING_MODEL.md` — Traceability building is Step 12 of the reasoning model
- `AI_AGENTS.md` — All agents build traceability; Intelligence Agent (Agent 15) validates it
- `GAP_DETECTION_ENGINE.md` — Receives broken chain reports from this engine
- `OBJECT_INDEX.md` — Master object registry; updated by this engine
- `RELATIONSHIP_INDEX.md` — Pre-indexed relationships; built and updated by this engine
- `TRACEABILITY_MAP.md` — Output map written by this engine

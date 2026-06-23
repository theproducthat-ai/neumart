# Nuemart Product OS — Traceability Rules

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | Traceability Engine, QA Agent, Release Agent |

---

## Purpose

Traceability is the ability to follow a product decision, requirement, or feature from its origin (a stakeholder request) all the way to production (a shipped release) and back. Without traceability, the team cannot answer fundamental questions like:

- Why was this feature built?
- Which test cases cover this requirement?
- Which release shipped this story?
- Which bug was found in which test?
- What was the rationale for this scope decision?

Traceability rules define the **mandatory links** between product objects. Every link in the chain must exist. Missing links create accountability gaps, audit failures, and knowledge loss.

---

## Core Traceability Rules

### Rule 1 — Every Feature Object Must Trace Back to a Request or Initiative

Every Feature Object must have at least one of the following links:
- `created_by_request: <REQUEST-ID>` — tracing back to the incoming ask that created it
- `created_by_initiative: <INITIATIVE-ID>` — tracing back to a strategic initiative

**Exception:** Features that were built before the Product OS was adopted may have a note in their `audit_log` acknowledging the missing link and documenting the best-known rationale.

---

### Rule 2 — Every PRD Must Trace Back to a Feature Object or Request Object

Every PRD must include at least one of:
- `specifies_feature: <FEATURE-ID>` — the Feature Object this PRD defines
- `created_by_request: <REQUEST-ID>` — the request that generated this PRD

PRDs that float without a Feature Object link are incomplete. An orphaned PRD cannot pass the G4 Approval Gate.

---

### Rule 3 — Every User Story Must Trace Back to at Least One Requirement in a PRD

Every User Story must include:
- `implements_requirement: <REQUIREMENT-ID-in-PRD>` — the specific requirement from a PRD that this story delivers

It is not sufficient for a story to generally reference a PRD. It must reference a specific requirement within the PRD (e.g., `REQ-003` within `PRD-COM-PLP-CAROUSEL-V1`).

A User Story with no requirement link is considered untraceable and may not be included in a Dev Plan or QA Run.

---

### Rule 4 — Every Test Case Must Trace Back to a User Story or Acceptance Criterion

Every Test Case must include:
- `verifies_story: <STORY-ID>` — the User Story this test case verifies, OR
- `verifies_acceptance_criterion: <AC-ID>` — the specific acceptance criterion being tested

Test cases that are not linked to a story or acceptance criterion are considered orphaned test cases. They may still be executed but cannot be counted toward coverage for a specific story or requirement.

---

### Rule 5 — Every Bug Must Link to the Test Case(s) That Discovered It

When a bug is found during QA, the Bug Object must include:
- `discovered_in_test: <TEST-CASE-ID>` — the test case that revealed the bug
- `found_in_qa_run: <QA-RUN-ID>` — the QA Run in which it was found

This creates a permanent record connecting: **QA Run → Test Case → Bug → Fix → Verification**.

---

### Rule 6 — Every QA Run Must Link to a Test Plan and Cover All User Stories

Every QA Run Object must include:
- `test_plan: <TEST-PLAN-ID>` — the test plan executed during this run
- `covers_stories: [<STORY-ID>, ...]` — all User Stories that were tested in this run
- `covers_requirements: [<REQUIREMENT-ID>, ...]` — all requirements that were verified

**Coverage requirement:** The QA Run must demonstrate coverage of all User Stories that are included in the release. Stories with no QA coverage cannot be released (per P006 and P009 in GOVERNANCE_POLICIES.md).

---

### Rule 7 — Every UAT Run Must Link to a Completed QA Run

A UAT Run may not begin until QA has passed. Every UAT Run Object must include:
- `follows_qa_run: <QA-RUN-ID>` — the QA Run that preceded this UAT
- `qa_run_status: Passed | Conditionally Passed` — the QA Run status at the time UAT began

UAT performed on a build that has not passed QA is not valid. The UAT result cannot be used to gate a release.

---

### Rule 8 — Every Release Must Link to UAT Run (or Explicit Waiver) and QA Run

Every Release Object must include:
- `qa_run: <QA-RUN-ID>` — the QA Run that was completed for this release
- `uat_run: <UAT-RUN-ID>` — the UAT Run that was completed, OR
- `uat_waiver: <DECISION-ID>` — the Decision Object documenting why UAT was waived

A Release Object without both a QA link and either a UAT link or UAT waiver cannot pass the G8 gate.

---

### Rule 9 — Every Release Must Link to the Feature Objects It Ships

Every Release Object must include:
- `ships_features: [<FEATURE-ID>, ...]` — all Feature Objects that are being released

This creates a permanent record of when each feature was first released to production, enabling the team to answer "When did Feature X ship?" at any point in the future.

---

### Rule 10 — Every Incomplete Work Item Must Link to the Object It Was Derived From

Incomplete Work Objects must include:
- `derived_from: <OBJECT-ID>` — the Feature, Story, or PRD that this incomplete work was part of
- `incomplete_reason: <reason>` — why the work was not completed
- `resolution_path: <plan>` — how the work will be resolved (completed, deferred, abandoned)

---

### Rule 11 — Every Decision Object Must Link to Its Context

Decision Objects must include:
- `context_object: <OBJECT-ID>` — the object (Feature, PRD, Request, Release) where the decision was made
- `decision_type: <type>` — what kind of decision (SCOPE_CHANGE, POLICY_WAIVER, RISK_ACCEPTANCE, DEFERRAL, etc.)

A Decision Object with no context link is an orphan and cannot be validated.

---

### Rule 12 — Every Risk Object Must Link to the Object That Carries the Risk

Risk Objects must include:
- `linked_to: [<OBJECT-ID>, ...]` — the Feature, PRD, or Release that carries this risk

See `RISK_RULES.md` for full Risk Object format requirements.

---

## Traceability Violation Types

### Orphaned Object

An object with no incoming or outgoing relationships in the product graph. An orphaned object cannot be validated, has no traceability context, and represents a gap in product knowledge.

**Examples:**
- A PRD with no linked Feature Object and no linked Request Object
- A User Story with no linked Requirement
- A Test Case with no linked Story or Acceptance Criterion

**Resolution:** Link the orphaned object to its correct parent, or document the gap in a Decision Object and archive the orphaned object.

---

### Broken Chain

A required link in the traceability chain is missing — the chain starts from a Request but fails to connect all the way to a QA Run or Release.

**Example of a broken chain:**
```
REQUEST-COM-PLP-CAROUSEL-001
  ↓ creates FEATURE-COM-PLP-CAROUSEL ✓
  ↓ specified by PRD-COM-PLP-CAROUSEL-V1 ✓
  ↓ requires STORY-COM-PLP-CAROUSEL-RENDER-001 ✓
  ↓ tested by TEST-... ✗ MISSING
```

**Resolution:** Create the missing object or document the gap as a Known Limitation with a Decision Object.

---

### Stale Reference

A relationship link points to an object that no longer exists, has been archived, or has been superseded by a newer version, without the link being updated.

**Examples:**
- A Release Object linking to a QA Run that was superseded by a re-run
- A Feature Object linking to a PRD that was archived and replaced by V2

**Resolution:** Update the link to point to the correct current object. Log the change in the audit_log.

---

### Circular Dependency

Object A depends on Object B, which depends on Object A. Circular dependencies create logical impossibilities in the delivery sequence and must be resolved.

**Example:**
- FEATURE-X is blocked by FEATURE-Y
- FEATURE-Y is blocked by FEATURE-X

**Resolution:** Break the cycle by identifying which feature can proceed first, or by identifying the minimum viable version of each that removes the circular dependency.

---

## Traceability Repair Process

When a traceability gap is identified (by the Traceability Engine, a QA gate check, or human review):

### Step 1 — Run Gap Detection Engine

Identify all missing links in the traceability chain for the affected feature or release. Generate a list of broken links with:
- The source object (what has the broken link)
- The expected target type (what should be linked)
- The severity (does this block a gate?)

### Step 2 — Identify Broken Links

For each broken link, determine the root cause:
- Was the target object never created?
- Was the target object created but not linked?
- Was the target object archived/deleted and the link not updated?

### Step 3 — Create or Link the Missing Object

Either:
- Create the missing object (e.g., the missing Test Case) and link it, OR
- Link an existing object that was not previously connected, OR
- Document the gap as a Known Limitation using a Decision Object, acknowledging the gap is intentional and explaining why it cannot be resolved

### Step 4 — Update TRACEABILITY_MAP.md

After resolving the gap, update `product/graph/TRACEABILITY_MAP.md` to reflect the corrected chain. This ensures the graph remains accurate.

---

## Minimum Required Traceability Set (Per Feature)

For every feature to be considered **fully traceable**, the following chain must be complete and verified:

```
Feature ↔ Request (or Initiative)
    ↕
Feature ↔ PRD
    ↕
PRD ↔ User Story (via Requirements)
    ↕
User Story ↔ Test Case
    ↕
Test Case ↔ QA Run
    ↕
QA Run ↔ UAT Run (or UAT Waiver)
    ↕
UAT Run ↔ Release
    ↕
Release → ships_feature (back to Feature)
```

This full chain, when intact, allows the team to:
- Start from a stakeholder request and trace to production
- Start from a production feature and trace back to the original ask
- Start from a bug and trace to the test case, story, requirement, and feature
- Start from a release and know exactly what was shipped and why

---

## Traceability Verification at Gate Checks

| Gate | Traceability Check |
|---|---|
| G1 — Classification | Request Object exists with valid object_id |
| G2 — Grilling Complete | Request Object links to open questions (resolved) |
| G4 — PRD Approval | PRD links to Feature Object and Request Object |
| G5 — Stories Ready | All stories link to PRD requirements |
| G6 — Development Complete | All stories have test cases or acceptance criteria |
| G7 — QA / UAT | QA Run covers all stories; UAT Run links to QA Run |
| G8 — Release | Release links to QA Run, UAT/waiver, and Feature Objects |

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P009 (requirements linked to stories/tests), P011 (incomplete work) |
| APPROVAL_GATES.md | `product/os/policies/` | Gates enforce traceability at each checkpoint |
| FEATURE_TRACKING_RULES.md | `product/os/policies/` | Rule 5 (full traceability required for all Features) |
| RISK_RULES.md | `product/os/policies/` | Rule 4 (risks must link to their carrier object) |
| TRACEABILITY_MAP.md | `product/graph/` | The actual traceability graph (updated per Rule 4 above) |
| OBJECT_INDEX.md | `product/os/indexes/` | Used to resolve object IDs in link validation |

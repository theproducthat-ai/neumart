# Nuemart Product OS — AI Agents

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Overview

This document defines the 15 AI Agents of the Nuemart Product OS. Each agent is a specialized reasoning unit responsible for a specific phase or concern of the product lifecycle. Agents do not operate independently — they follow the 15-step reasoning sequence defined in AI_REASONING_MODEL.md, apply domain-specific logic for their phase, and hand off cleanly to the next agent.

Every agent produces Product Objects as outputs. Every agent's outputs are traceable, versioned, and linked.

---

## Agent Registry

---

### Agent 1 — Intake Agent

**Purpose:** Receive a raw user request, give it an identity, and route it into the Product OS.

**Triggered By:** `/product-request`

**Inputs:**
- Raw user request text
- Optional: existing object IDs referenced in the request
- Session context (user, date, project)

**Reasoning Steps:**
1. Execute AI_REASONING_MODEL.md Steps 1–3 (understand, identify type, classify)
2. Assign a numeric ID (e.g., REQ-0003) and a semantic ID (e.g., REQUEST-COM-PLP-SEARCH-001)
3. Check OBJECT_INDEX.md for the next available numeric ID
4. Populate the Request Object shell with all known fields
5. Determine routing: which agent should receive this request next?
6. Log entry in OBJECT_INDEX.md

**Outputs — Product Objects Created/Updated:**
- Request Object (new) — status: `Received`
- OBJECT_INDEX.md (updated)

**Required Relationships:**
- Request → Module (via `domain` and `module_code`)
- Request → Feature (if an existing Feature is identified in Step 5 of AI Reasoning Model)

**Required Metadata:**
```yaml
id: REQ-XXXX
semantic_id: REQUEST-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
title: <one-line summary>
status: Received
request_type: <classified>
domain: <COM|ADM|DEL|INV|PAY|USR|RPT>
module_code: <e.g., COM-PLP>
submitted_by: <user>
submitted_at: <ISO datetime>
raw_request: <original text>
routing: <next agent>
```

**Definition of Done:** Request Object file exists at `product/objects/requests/REQ-XXXX.md`, OBJECT_INDEX.md updated, routing determined.

**Failure Condition:** Cannot assign domain or module → assign `module_code: NEEDS-CLASSIFICATION`, route to Classification Agent with Low confidence flag.

---

### Agent 2 — Classification Agent

**Purpose:** Determine the precise domain, product area, module, request type, and confidence level for a request.

**Triggered By:** Intake Agent (automatic) or user manually invoking re-classification.

**Inputs:**
- Request Object (from Intake Agent)
- PRODUCT_HIERARCHY.md
- MODULE_MASTER.md
- CLASSIFICATION_ENGINE.md rules

**Reasoning Steps:**
1. Read the Request Object fully
2. Execute CLASSIFICATION_ENGINE.md reasoning steps 1–8
3. Apply REQUEST_CLASSIFICATION_MATRIX to determine request_type
4. Score confidence (High/Medium/Low) per classification criteria
5. Identify all blocking_flags (schema_change, payment_change, role_change, security_change, release_action, integration_change)
6. Check if this request creates, changes, or deprecates a Feature Object
7. Update Request Object with classification metadata
8. Update status to `Classified`

**Outputs — Product Objects Created/Updated:**
- Request Object (updated — classification fields populated)
- Feature Object (created if new Feature identified)
- FEATURE_MASTER.md (updated if new Feature)

**Required Relationships:**
- Request → Module
- Request → Feature (new or existing)
- Request → Sub-module (product_area_code)

**Required Metadata:**
```yaml
classification:
  request_type: <type>
  domain: <domain>
  product_area_code: <e.g., PLP>
  module_code: <e.g., COM-PLP>
  confidence: High | Medium | Low
  blocking_flags: []
  feature_impact: creates | modifies | deprecates | none
  classified_at: <ISO datetime>
```

**Definition of Done:** Request Object has full classification block populated; confidence is High or Medium; if Low, human review flag is set and user is notified.

**Failure Condition:** Cannot map to any module after full classification attempt → set `NEEDS-CLASSIFICATION`, output gap report, notify user with specific question about which product area this belongs to.

---

### Agent 3 — Product Architect Agent

**Purpose:** Map the request to the product hierarchy and identify all Feature and Sub-feature Objects that are created, modified, or affected.

**Triggered By:** Classification Agent (automatic after classification completes) or manually.

**Inputs:**
- Classified Request Object
- PRODUCT_HIERARCHY.md
- FEATURE_MASTER.md
- MODULE_MASTER.md

**Reasoning Steps:**
1. Read the Request Object's classification metadata
2. Locate the correct node in PRODUCT_HIERARCHY.md at Module → Sub-module → Capability level
3. Determine if a Feature Object already exists for this capability (check FEATURE_MASTER.md)
4. If Feature exists: update it, document what is changing
5. If Feature does not exist: create new Feature Object with semantic ID
6. Identify Sub-features: decompose the feature into distinct, independently testable sub-features
7. For each Sub-feature: create or update Sub-feature Object
8. Map all Feature/Sub-feature Objects to their parent nodes in PRODUCT_HIERARCHY.md
9. Update FEATURE_MASTER.md with all new/modified entries

**Outputs — Product Objects Created/Updated:**
- Feature Object (new or updated)
- Sub-feature Objects (new or updated)
- FEATURE_MASTER.md (updated)
- PRODUCT_HIERARCHY.md (updated if new nodes)

**Required Relationships:**
- Feature → Request (spawned_by)
- Feature → Module
- Feature → Sub-module
- Sub-feature → Feature (child_of)

**Required Metadata:**
```yaml
feature_id: FEATURE-{DOMAIN}-{MODULE}-{SLUG}
feature_name: <human-readable name>
module: <module_code>
sub_module: <product_area_code>
capability: <capability name>
status: Identified
parent_request: REQ-XXXX
sub_features:
  - id: SUBFEATURE-{DOMAIN}-{MODULE}-{SLUG}-{COMPONENT}
    name: <sub-feature name>
    status: Identified
```

**Definition of Done:** Feature Object and all identified Sub-feature Objects exist and are linked to the parent Request. FEATURE_MASTER.md is updated. Product hierarchy node is located or created.

**Failure Condition:** Cannot place Feature in hierarchy without more information about which capability it belongs to → flag as `HIERARCHY_UNKNOWN`, request specific input from user, do not create Feature Object.

---

### Agent 4 — Discovery Agent

**Purpose:** Drive structured discovery of the request through grilling questions, assumptions, and MVP scope definition.

**Triggered By:** `/product-grill`

**Inputs:**
- Request Object (Classified)
- Feature Object
- AI_REASONING_MODEL.md Steps 9–10 (gap identification and question selection)
- Existing product context (principles, constraints, prior decisions)

**Reasoning Steps:**
1. Read Request Object and Feature Object fully
2. Execute AI_REASONING_MODEL.md Steps 9–10 to identify genuine unknowns
3. Distinguish blocking gaps from non-blocking gaps
4. Formulate maximum 5 specific, decision-critical questions
5. Create Discovery Session Object
6. For each question, create an Open Question Object
7. For each assumption made without human input, create an Assumption Object
8. Define initial MVP scope: what is in, what is explicitly out
9. Document out-of-scope items as Out-of-Scope Objects
10. Update Request Object status to `Grilled`

**Outputs — Product Objects Created/Updated:**
- Discovery Session Object (new)
- Open Question Objects (new, one per question)
- Assumption Objects (new, one per undocumented assumption)
- Out-of-Scope Objects (new, one per excluded item)
- Request Object (updated — status: `Grilled`)

**Required Relationships:**
- Discovery Session → Request
- Open Question → Discovery Session
- Assumption → Discovery Session
- Out-of-Scope → Feature

**Required Metadata (Discovery Session):**
```yaml
discovery_session_id: DISC-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
request_id: REQ-XXXX
conducted_at: <ISO datetime>
mvp_scope_defined: true | false
open_questions: [list of Open Question IDs]
assumptions: [list of Assumption IDs]
out_of_scope: [list of Out-of-Scope IDs]
```

**Definition of Done:** All blocking gaps either resolved or escalated. Assumptions documented. MVP scope defined. Request status updated to `Grilled`.

**Failure Condition:** User cannot answer blocking questions → request remains in `Partially Grilled` state; document what is blocking and what cannot proceed without resolution.

---

### Agent 5 — Evaluation Agent

**Purpose:** Score the initiative for business value, complexity, and risk to support prioritization decisions.

**Triggered By:** `/product-evaluate`

**Inputs:**
- Request Object (Grilled)
- Feature Object
- Discovery Session Object
- Product principles and strategic priorities

**Reasoning Steps:**
1. Read Request, Feature, and Discovery Objects
2. Score Business Value (1–10): based on user impact, revenue potential, strategic alignment, India-first principle
3. Score Complexity (1–10): based on number of modules affected, schema changes, integration requirements, estimated engineering effort
4. Score Risk (1–10): based on blocking_flags, payment/security impact, regression surface
5. Calculate Priority Score: weighted formula (Business Value × 0.5) + (Complexity × −0.25) + (Risk × −0.25) — output 1–10
6. Assign Priority Tier: P0 (>8.5), P1 (7–8.5), P2 (5–7), P3 (<5)
7. Document scoring rationale for each dimension
8. Create Evaluation Object
9. Update Feature Object with priority score and tier

**Outputs — Product Objects Created/Updated:**
- Evaluation Object (new)
- Feature Object (updated — priority_score, priority_tier)

**Required Relationships:**
- Evaluation → Request
- Evaluation → Feature
- Evaluation → Discovery Session

**Required Metadata:**
```yaml
evaluation_id: EVAL-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
request_id: REQ-XXXX
feature_id: FEATURE-{...}
business_value_score: 1–10
complexity_score: 1–10
risk_score: 1–10
priority_score: 1–10
priority_tier: P0 | P1 | P2 | P3
scoring_rationale: <text>
evaluated_at: <ISO datetime>
```

**Definition of Done:** Evaluation Object created with all three scores and rationale. Priority Tier assigned. Feature Object updated.

**Failure Condition:** Cannot score without knowing scope → request Discovery Session first; block evaluation if grilling is incomplete.

---

### Agent 6 — Impact Agent

**Purpose:** Produce a comprehensive map of everything that will be affected by this change.

**Triggered By:** `/product-impact`

**Inputs:**
- Request Object
- Feature Object
- Discovery Session Object
- IMPACT_ENGINE.md rules
- Product architecture (PRODUCT_HIERARCHY.md, MODULE_MASTER.md)

**Reasoning Steps:**
1. Read all available context objects
2. Execute IMPACT_ENGINE.md all 12 impact categories
3. For each category: identify affected objects, assign severity (None/Low/Medium/High/Critical)
4. Identify regression risks: list features that could break
5. Identify blocking flags: schema changes, payment changes, role changes → trigger governance gates
6. Create Risk Objects for each High or Critical severity finding
7. Create Dependency Objects for each inter-module dependency identified
8. Create Impact Assessment Object summarizing all findings
9. Update Request Object status to `Impact Assessed`

**Outputs — Product Objects Created/Updated:**
- Impact Assessment Object (new)
- Risk Objects (new, one per High/Critical finding)
- Dependency Objects (new, one per inter-module dependency)
- Request Object (updated — status: `Impact Assessed`)

**Required Relationships:**
- Impact Assessment → Request
- Impact Assessment → Feature
- Risk → Impact Assessment
- Dependency → Impact Assessment

**Required Metadata:**
```yaml
impact_assessment_id: IMPACT-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
request_id: REQ-XXXX
feature_id: FEATURE-{...}
impact_summary:
  module_impact: {severity, affected_modules: []}
  screen_impact: {severity, affected_screens: []}
  schema_impact: {severity, tables_affected: []}
  api_impact: {severity, functions_affected: []}
  integration_impact: {severity, integrations_affected: []}
  role_impact: {severity, roles_affected: []}
  regression_risk: {severity, features_at_risk: []}
  security_impact: {severity, notes: ""}
required_gates: []
risk_objects: []
dependency_objects: []
```

**Definition of Done:** All 12 impact categories assessed. Risk Objects created for all High/Critical findings. Governance gates identified. Request status updated.

**Failure Condition:** Cannot assess impact without Feature Object and at least partial Discovery Session → request those first; output explicit list of what is needed.

---

### Agent 7 — PRD Agent

**Purpose:** Produce the Product Requirements Document — the authoritative specification that engineering will build from.

**Triggered By:** `/product-prd`

**Inputs:**
- Request Object (Impact Assessed)
- Feature Object and Sub-feature Objects
- Discovery Session Object
- Impact Assessment Object
- Evaluation Object
- Existing screens, data entities, and roles from product architecture

**Reasoning Steps:**
1. Read all upstream objects fully
2. Structure the PRD: Overview → Goals → Non-Goals → User Roles → Functional Requirements → Non-Functional Requirements → Acceptance Criteria → Rules → Data Entities → Screens → Integrations → Out of Scope → Open Items
3. For each Functional Requirement, create a Requirement Object
4. For each Requirement, create 1–N Acceptance Criterion Objects
5. For each business rule embedded in requirements, create a Rule Object
6. Link each Requirement to: the Feature/Sub-feature it implements, the screen(s) it affects, the data entities it touches, the user roles it involves
7. Check for contradictions with existing PRDs or feature specs
8. Create PRD Object linking all Requirement Objects
9. Update Request Object status to `PRD Created` (then `PRD Approved` after review)

**Outputs — Product Objects Created/Updated:**
- PRD Object (new)
- Requirement Objects (new, one per functional requirement)
- Acceptance Criterion Objects (new, one per criterion)
- Rule Objects (new, one per business rule)
- Feature Object (updated — prd_id populated)
- Request Object (updated — status: `PRD Created`)

**Required Relationships:**
- PRD → Request
- PRD → Feature
- Requirement → PRD
- Acceptance Criterion → Requirement
- Rule → PRD
- Requirement → Screen(s)
- Requirement → Data Entity(s)
- Requirement → Role(s)

**Required Metadata:**
```yaml
prd_id: PRD-{DOMAIN}-{MODULE}-{SLUG}-V{N}
request_id: REQ-XXXX
feature_id: FEATURE-{...}
version: 1.0
status: Draft | In Review | Approved
requirements: [list of Requirement IDs]
acceptance_criteria: [list of AC IDs]
rules: [list of Rule IDs]
screens: []
data_entities: []
roles: []
open_items: []
```

**Definition of Done:** PRD Object created. All requirements have acceptance criteria. All rules documented. All screens and data entities linked. PRD status transitions to `Approved` after human review.

**Failure Condition:** Missing scope definition (grilling not complete) → cannot write complete PRD; output stub with gap flags and request grilling session.

---

### Agent 8 — Story Agent

**Purpose:** Break the PRD into developer-ready User Stories, each with clear acceptance criteria and test hooks.

**Triggered By:** `/product-stories`

**Inputs:**
- PRD Object (Approved)
- Requirement Objects
- Acceptance Criterion Objects
- Feature Object and Sub-feature Objects
- User roles from PRD

**Reasoning Steps:**
1. Read PRD Object and all linked Requirement Objects
2. Group requirements into logical story clusters (by user role, screen, or workflow)
3. For each story, write in format: "As a [role], I want to [action], so that [outcome]"
4. Assign acceptance criteria from Acceptance Criterion Objects (or derive new ones if missing)
5. Verify each story is independently testable — if not, decompose further
6. Ensure every story links to at least one Feature or Sub-feature Object
7. Ensure every story implies at least one test requirement (for QA Agent to pick up)
8. Assign story size estimate (XS/S/M/L/XL) based on scope
9. Create User Story Objects
10. Update OBJECT_INDEX.md

**Outputs — Product Objects Created/Updated:**
- User Story Objects (new, one per story)
- PRD Object (updated — stories list populated)
- Feature Object (updated — stories list populated)

**Required Relationships:**
- User Story → PRD
- User Story → Requirement (implements)
- User Story → Feature or Sub-feature
- User Story → Role(s)
- User Story → Screen(s)

**Required Metadata:**
```yaml
story_id: STORY-{DOMAIN}-{MODULE}-{SLUG}-{COMPONENT}-{SEQ}
title: <brief title>
narrative: "As a [role], I want [action], so that [outcome]"
acceptance_criteria: [list]
size: XS | S | M | L | XL
prd_id: PRD-{...}
feature_id: FEATURE-{...}
requirement_ids: []
screen_ids: []
role_ids: []
test_requirement: <what must be verifiable>
status: Draft
```

**Definition of Done:** Every PRD requirement has at least one linked User Story. Every story has acceptance criteria and a test requirement. All stories linked to Feature/Sub-feature Objects.

**Failure Condition:** PRD not in `Approved` status → block story generation; stories written from unapproved PRDs create rework risk.

---

### Agent 9 — Engineering Planner Agent

**Purpose:** Translate User Stories into a sequenced, risk-aware Development Plan with actionable tasks and AI coding prompts.

**Triggered By:** `/product-devplan`

**Inputs:**
- User Story Objects (all stories for the Feature)
- Impact Assessment Object
- PRD Object
- Feature Object
- Product tech stack context (Next.js, Convex, Clerk, ShadCN)

**Reasoning Steps:**
1. Read all User Stories and the Impact Assessment
2. Identify all technical work items: schema changes, new Convex functions, UI component changes, integration work, configuration changes
3. Sequence tasks: schema first → data layer → API layer → UI layer → integration → testing
4. Identify parallelizable vs. sequential tasks
5. Flag high-risk tasks (schema changes, payment-adjacent code, auth changes) for extra attention
6. Create a Rollback Plan: how to undo each high-risk change if it fails
7. Create Task Objects for each unit of engineering work
8. Create an AI Coding Prompt Object: a structured prompt for Claude Code to implement the feature
9. Identify technical risks not already in the Impact Assessment → create new Risk Objects if needed
10. Create Development Plan Object linking all Tasks

**Outputs — Product Objects Created/Updated:**
- Development Plan Object (new)
- Task Objects (new, one per engineering task)
- AI Coding Prompt Object (new)
- Risk Objects (new if additional technical risks found)
- Feature Object (updated — dev_plan_id, status: `In Development`)

**Required Relationships:**
- Development Plan → Feature
- Development Plan → User Story Objects (all)
- Task → Development Plan
- Task → User Story (implements)
- AI Coding Prompt → Development Plan

**Required Metadata:**
```yaml
dev_plan_id: DEVPLAN-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
feature_id: FEATURE-{...}
tasks: []
rollback_plan: <text>
estimated_effort: <days>
risk_flags: []
ai_coding_prompt_id: PROMPT-{...}
status: Draft
```

**Definition of Done:** Development Plan covers all User Stories. Tasks are sequenced. Rollback plan exists for all schema and payment changes. AI Coding Prompt is complete and self-contained.

**Failure Condition:** User Stories not in `Draft` or `Ready` state → request Story Agent output first; cannot plan without defined stories.

---

### Agent 10 — QA Agent

**Purpose:** Create a rigorous Test Plan, generate Test Cases covering all acceptance criteria, and record QA Run results.

**Triggered By:** `/product-qa`

**Inputs:**
- User Story Objects (with acceptance criteria)
- PRD Object
- Development Plan Object
- Feature Object
- Existing Test Cases (if regression testing)

**Reasoning Steps:**
1. Read all User Stories and extract all acceptance criteria
2. For each acceptance criterion, generate one or more Test Cases (positive + negative + edge cases)
3. Identify regression test scope: which existing features must be re-verified?
4. Create Test Plan Object linking all Test Cases
5. During QA Run: record pass/fail for each Test Case
6. For each failure: create a Bug Object linking to the failed Test Case
7. Calculate coverage: % of acceptance criteria covered by Test Cases
8. Create QA Run Object documenting results
9. If all critical/high Test Cases pass → recommend UAT
10. If failures exist → block UAT, assign bugs, update Feature status

**Outputs — Product Objects Created/Updated:**
- Test Plan Object (new)
- Test Case Objects (new, one per test scenario)
- QA Run Object (new, one per QA execution)
- Bug Objects (new, one per failure)
- Feature Object (updated — status: `QA In Progress` or `QA Passed` or `QA Failed`)

**Required Relationships:**
- Test Plan → Feature
- Test Plan → User Story Objects
- Test Case → Acceptance Criterion
- Test Case → User Story
- QA Run → Test Plan
- Bug → Test Case
- Bug → Feature

**Required Metadata:**
```yaml
test_plan_id: TESTPLAN-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
qa_run_id: QA-{DOMAIN}-{MODULE}-{SLUG}-RUN-{SEQ}
coverage_percentage: <0–100>
test_cases_total: N
test_cases_passed: N
test_cases_failed: N
bugs_found: []
qa_verdict: Passed | Failed | Partial
```

**Definition of Done:** Test coverage ≥90% of acceptance criteria. QA Run Object created. All critical bugs assigned. QA verdict recorded.

**Failure Condition:** No User Stories or acceptance criteria → cannot generate Test Cases; request Story Agent output first.

---

### Agent 11 — UAT Agent

**Purpose:** Conduct User Acceptance Testing, collect structured feedback, and produce a formal Sign-off.

**Triggered By:** `/product-uat`

**Inputs:**
- QA Run Object (status: Passed)
- User Story Objects
- PRD Object
- Feature Object

**Reasoning Steps:**
1. Verify QA Run status is `Passed` — if not, block UAT and surface QA failures
2. Define UAT scenarios from user stories (end-to-end, user-role-specific)
3. Execute UAT against each scenario
4. For each scenario: record result (Pass/Fail/Partial) and collect structured feedback
5. Create Feedback Objects for each piece of feedback received
6. Identify Known Limitations (bugs or gaps that are accepted as-is for this release)
7. Create Known Limitation Objects for each accepted limitation
8. Determine UAT verdict: if all P0/P1 scenarios pass → Sign Off
9. Create Sign-off Object
10. Create UAT Run Object
11. Update Feature status to `UAT Complete` (or `UAT Failed`)

**Outputs — Product Objects Created/Updated:**
- UAT Run Object (new)
- Feedback Objects (new, one per piece of feedback)
- Known Limitation Objects (new, one per accepted limitation)
- Sign-off Object (new — if UAT passes)
- Feature Object (updated — status: `UAT Complete` or `UAT Failed`)

**Required Relationships:**
- UAT Run → QA Run (prerequisite)
- UAT Run → Feature
- Feedback → UAT Run
- Known Limitation → UAT Run
- Sign-off → UAT Run

**Required Metadata:**
```yaml
uat_run_id: UAT-{DOMAIN}-{MODULE}-{SLUG}-RUN-{SEQ}
qa_run_id: QA-{...}
scenarios_tested: N
scenarios_passed: N
uat_verdict: Signed Off | Failed | Conditional
signoff_id: SIGNOFF-{...}
known_limitations: []
feedback_objects: []
```

**Definition of Done:** All P0 and P1 UAT scenarios pass. Sign-off Object created. Known Limitations documented. Feature status updated to `UAT Complete`.

**Failure Condition:** QA Run not in `Passed` state → block UAT; output specific QA failures that must be resolved.

---

### Agent 12 — Release Agent

**Purpose:** Prepare and execute a safe, documented, reversible product release.

**Triggered By:** `/product-release`

**Inputs:**
- UAT Run Object (or explicit waiver Decision Object)
- Sign-off Object
- Feature Object
- Development Plan Object (for rollback plan)
- Impact Assessment Object

**Reasoning Steps:**
1. Verify UAT Sign-off exists (or waiver Decision Object)
2. Compile Release Notes from Feature Object, User Stories, and Known Limitations
3. Define Monitoring Signals: what metrics/events to watch post-release (error rates, conversion, performance)
4. Confirm Rollback Plan from Development Plan Object is current and executable
5. Check all required governance gates are cleared (G7 Release Approval)
6. Create Release Object
7. Create Post-release Review placeholder (scheduled for 7 days after release)
8. Update Feature Object status to `Released`
9. Update all linked User Story and Requirement Objects to `Released`

**Outputs — Product Objects Created/Updated:**
- Release Object (new)
- Monitoring Signal Objects (new, one per signal)
- Post-release Review placeholder (new)
- Feature Object (updated — status: `Released`)
- User Story Objects (updated — status: `Released`)

**Required Relationships:**
- Release → UAT Run (or waiver Decision Object)
- Release → Feature
- Release → Sign-off
- Monitoring Signal → Release
- Post-release Review → Release

**Required Metadata:**
```yaml
release_id: RELEASE-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
feature_id: FEATURE-{...}
uat_run_id: UAT-{...}
release_notes: <text>
rollback_plan: <text or reference to DEVPLAN rollback>
monitoring_signals: []
release_date: <ISO datetime>
released_by: <user>
post_release_review_scheduled: <ISO date>
```

**Definition of Done:** Release Object created. Release Notes complete. Monitoring Signals defined. Rollback Plan confirmed. All linked objects updated to `Released`.

**Failure Condition:** No UAT Sign-off and no approved waiver Decision Object → block release; output specific gate requirement.

---

### Agent 13 — Governance Agent

**Purpose:** Cross-cutting enforcement of approval gates, policy compliance, and scope discipline.

**Triggered By:** Automatically invoked by any agent when a blocking_flag or governance gate is detected. Can also be invoked manually for compliance checks.

**Inputs:**
- Any Product Object that triggers a governance gate
- RISK_RULES.md
- APPROVAL_GATES.md
- Policy definitions

**Reasoning Steps:**
1. Read the triggering object's blocking_flags and required_gates fields
2. For each required gate, check if the gate has been cleared (approval exists, review complete)
3. If gate not cleared: block the downstream action, output specific gate requirement
4. If gate cleared: document clearance in the object's `governance.cleared_gates` field
5. For scope-changing decisions (anything that adds, removes, or changes defined scope): require a Decision Object
6. Validate that no agent has bypassed a required gate
7. Create Decision Objects for any governance-level choice made during the current session

**Outputs — Product Objects Created/Updated:**
- Decision Objects (new, one per governance-level decision)
- Gate clearance records (updated on relevant objects)
- Governance block notices (output, not persisted as objects)

**Required Relationships:**
- Decision → Feature (or PRD, or Release — whichever scope it governs)
- Decision → Approver role

**Required Metadata:**
```yaml
decision_id: DECISION-{DOMAIN}-{MODULE}-{SLUG}-{SEQ}
decision_type: scope_change | gate_waiver | policy_exception | approval
made_by: <user or role>
made_at: <ISO datetime>
rationale: <text>
linked_object: <object_id>
gate_affected: <gate_id>
```

**Definition of Done:** All governance gates for the current operation are either cleared or explicitly blocked with a clear user-facing message.

**Failure Condition:** Approver not available → block the downstream action indefinitely; document the pending approval in the object's `governance.pending_approvals` field.

---

### Agent 14 — Knowledge Agent

**Purpose:** Extract reusable learnings from completed work and make them available to future agents.

**Triggered By:** Background — automatically after any object reaches `Released`, `Closed`, or `Retrospected` state.

**Inputs:**
- Completed Feature Objects
- Decision Objects
- Bug Objects
- Retrospective notes (if any)
- Feedback Objects from UAT

**Reasoning Steps:**
1. Scan completed Feature Objects for patterns: what worked well, what caused rework, what was underestimated
2. Extract reusable architectural decisions from Decision Objects
3. Extract patterns from Bug Objects: are bugs clustering around a specific module, integration, or type?
4. Identify recurring assumptions that were later confirmed → promote to product principles
5. Create Knowledge Item Objects for each reusable insight
6. Update KNOWLEDGE_MAP.md with new entries
7. Tag Knowledge Items by: domain, module, type (pattern / anti-pattern / principle / decision / risk)

**Outputs — Product Objects Created/Updated:**
- Knowledge Item Objects (new)
- KNOWLEDGE_MAP.md (updated)

**Required Relationships:**
- Knowledge Item → Source Object (Feature, Decision, Bug, etc.)
- Knowledge Item → Module(s) it applies to

**Required Metadata:**
```yaml
knowledge_id: KNOW-{DOMAIN}-{TYPE}-{SEQ}
type: pattern | anti_pattern | principle | decision | risk_signal
title: <one-line summary>
description: <detailed explanation>
source_objects: [list of IDs]
applicable_modules: []
learned_at: <ISO datetime>
confidence: High | Medium | Low
```

**Definition of Done:** At least one Knowledge Item created per completed Feature. KNOWLEDGE_MAP.md updated. Items tagged with applicable modules.

**Failure Condition:** Source objects too incomplete to extract learnings → log a gap in KNOWLEDGE_MAP.md and schedule for manual retrospective.

---

### Agent 15 — Intelligence Agent

**Purpose:** Meta-agent providing situational awareness across all active work items, identifying blockers and incomplete work, and recommending the highest-impact next action.

**Triggered By:** `/product-resume`

**Inputs:**
- All active Request Objects
- All active Feature Objects
- OBJECT_INDEX.md
- GAP_DETECTION_ENGINE.md output (run on demand)
- NEXT_ACTION_ENGINE.md
- All pending governance gates

**Reasoning Steps:**
1. Scan OBJECT_INDEX.md for all objects with non-terminal statuses
2. For each active item: determine current lifecycle stage
3. Run GAP_DETECTION_ENGINE.md to find blocking gaps, missing relationships, stale objects
4. Check all required governance gates: which are pending?
5. Apply NEXT_ACTION_ENGINE.md decision tree to each active item
6. Prioritize: blocking items > pending approvals > lifecycle advancement > optimization
7. Output a prioritized action list with recommended commands
8. Flag any object that has been in the same state for longer than the expected lifecycle duration (stale detection)

**Outputs:**
- Prioritized next action list (output, not a persisted object)
- Gap reports (forwarded to GAP_DETECTION_ENGINE.md output)
- Stale object flags (added to OBJECT_INDEX.md)

**Required Relationships:**
- Intelligence Agent reads all object relationships but creates none directly

**Required Metadata (output format):**
```
ACTIVE ITEMS: N
BLOCKING ITEMS: N
PENDING APPROVALS: N
STALE OBJECTS: N

PRIORITY 1 — BLOCKING:
  Item: <object_id> <title>
  Stage: <current stage>
  Blocker: <what is blocking>
  Action: <specific action>
  Command: <slash-command>

PRIORITY 2 — NEXT LIFECYCLE STEP:
  [...]
```

**Definition of Done:** All active objects reviewed. Blockers identified and surfaced. Highest-impact next action recommended with a specific command.

**Failure Condition:** OBJECT_INDEX.md not populated or outdated → output a warning that the index must be rebuilt before intelligence scan can complete.

---

## Agent Coordination Rules

1. **Agents do not skip each other.** The sequence Intake → Classification → Architect → Discovery → Evaluation → Impact → PRD → Stories → Devplan → QA → UAT → Release is the canonical lifecycle. Steps can be re-run but not omitted.
2. **Every agent reads before writing.** An agent must read all upstream objects before creating downstream ones. Writing without reading upstream context creates orphaned or inconsistent objects.
3. **Every agent respects governance gates.** If a gate is required, no agent proceeds past it without clearance. The Governance Agent is the enforcement mechanism — but any agent encountering a gate trigger must stop and call the Governance Agent.
4. **Agents do not contradict each other.** If an agent's output would contradict an existing object, the contradiction must be surfaced as a `CONSISTENCY_GAP` and resolved via a Decision Object.
5. **The Intelligence Agent is always available.** At any point in the lifecycle, `/product-resume` runs the Intelligence Agent and gives the user a clear picture of where all work stands.

---

## Related Files

- `AI_REASONING_MODEL.md` — The 15-step reasoning sequence all agents follow
- `CLASSIFICATION_ENGINE.md` — Used by Agents 1, 2
- `IMPACT_ENGINE.md` — Used by Agent 6
- `GAP_DETECTION_ENGINE.md` — Used by Agents 4, 15
- `TRACEABILITY_ENGINE.md` — Used by all agents for relationship building
- `DUPLICATE_DETECTION_ENGINE.md` — Used by Agents 1, 3
- `NEXT_ACTION_ENGINE.md` — Used by Agents 12, 15
- `OBJECT_TYPES.md` — Defines all object types referenced above
- `LIFECYCLE_MODELS.md` — Defines all status transitions
- `APPROVAL_GATES.md` — Defines all governance gates used by Agent 13

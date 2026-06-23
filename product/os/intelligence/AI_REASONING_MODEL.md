# Nuemart Product OS — AI Reasoning Model

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Overview

This document defines the complete 15-step AI reasoning sequence that ALL Product OS commands must follow. Every agent, every command, every object generation operation executes this sequence — in order, without skipping steps. The sequence is deterministic: the same inputs, applied through the same steps, must produce consistent outputs.

This model governs the reasoning behavior of every AI agent defined in AI_AGENTS.md.

---

## The 15-Step Reasoning Sequence

### Step 1 — Understand the User Request

Parse the user's raw input. Extract:
- **Primary intent**: What does the user want to happen?
- **Named entities**: Feature names, module names, user roles, data entities, screen names, IDs
- **Scope signals**: Words like "only", "except", "all", "just", "also", "including"
- **Urgency signals**: Words like "urgent", "blocking", "critical", "quick win"
- **Constraint signals**: Words like "must not", "cannot", "required", "never", "always"

**Rules:**
- Do not assume intent. If the request is ambiguous at a decision-critical point, document the ambiguity as an assumption and continue with the best-guess interpretation — clearly labeled.
- Never collapse ambiguity silently. Every unresolved ambiguity must appear in the `ai_reasoning.assumptions` block of the output object.
- A request that names an existing object ID (e.g., REQ-0002) must pull that object's full context before reasoning further.

---

### Step 2 — Identify Object Type

Determine which Product Object type(s) this request involves. Consult OBJECT_TYPES.md for the full registry.

Common types: Request, Feature, Sub-feature, PRD, Requirement, Acceptance Criterion, User Story, Task, Test Case, QA Run, UAT Run, Release, Bug, Decision, Assumption, Risk, Impact Assessment, Discovery Session, Open Question, Knowledge Item, Evaluation, Development Plan, AI Coding Prompt, Feedback, Known Limitation, Sign-off, Monitoring Signal.

**Rules:**
- A single user request may involve multiple object types simultaneously.
- Identify the **primary** object type (what is being created or updated) and **secondary** object types (what is being affected or referenced).
- If the object type cannot be determined, assign type `UNKNOWN` and flag for classification.

---

### Step 3 — Classify the Request

Apply CLASSIFICATION_ENGINE.md rules. Assign the following classification metadata:

| Field | Description |
|---|---|
| `request_type` | New Feature / Feature Enhancement / Bug Fix / Configuration Change / Documentation / Technical Debt / Emergency / Out of Scope |
| `domain` | COM / ADM / DEL / INV / PAY / USR / RPT |
| `confidence` | High / Medium / Low |
| `product_area_code` | e.g., PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS |
| `module_code` | e.g., COM-PLP, DEL-TASK, PAY-RAZORPAY |
| `blocking_flags` | schema_change / payment_change / role_change / security_change / release_action / integration_change |

**Rules:**
- Classification determines which governance gates apply (see Step 8).
- If confidence is Low, flag for human review before proceeding past Step 6.
- Classification is always revisable — later steps may refine it.

---

### Step 4 — Map to Product Hierarchy

Locate this request in the product architecture tree:

```
Product (Nuemart)
  └── Module (COM, ADM, DEL, INV, PAY, USR, RPT)
        └── Sub-module (PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS, ...)
              └── Capability (e.g., Product Discovery, Navigation, Search)
                    └── Feature (e.g., Promotional Banner Carousel)
                          └── Sub-feature (e.g., Auto-scroll, Navigation Dots, Touch Swipe)
```

**Rules:**
- Consult PRODUCT_HIERARCHY.md and MODULE_MASTER.md to locate the correct node.
- If no existing node matches, determine whether to create a new node or map to the nearest existing one.
- Document the mapping path in the output object's `product_hierarchy` field.
- All four levels (Module → Sub-module → Capability → Feature) must be populated, even if approximate.

---

### Step 5 — Search Similar Existing Objects

Before creating any new object, search:
1. `product/objects/` directory for existing objects with matching names, IDs, or keywords
2. `OBJECT_INDEX.md` for matching canonical names and slugs
3. `FEATURE_MASTER.md` for matching feature slugs
4. `TRACEABILITY_MAP.md` for related chains

**Rules:**
- Search is mandatory — never skip this step.
- Use keyword matching: break the request into 2–4 key nouns and search for each.
- If a match is found, pull the full object context before proceeding.
- Document search results in `ai_reasoning.search_performed`.

---

### Step 6 — Detect Duplicate or Related Work

Apply DUPLICATE_DETECTION_ENGINE.md. Evaluate whether any existing object found in Step 5 is:
- An **exact duplicate** (same scope, same intent)
- A **near duplicate** (same feature, different wording or minor scope variation)
- A **superseded object** (the new request replaces the old one)
- An **extension** (the new request extends existing work — create Sub-feature, not new Feature)
- A **conflict** (the new request contradicts an existing object)

**Rules:**
- If a duplicate is detected with High confidence, surface it to the user BEFORE creating any new object.
- If a near-duplicate is detected, recommend LINK or SUPERSEDE and document reasoning.
- If no duplicate is found, document the null result explicitly: `"no duplicate detected — search performed against OBJECT_INDEX.md and FEATURE_MASTER.md"`.
- Never silently create duplicate objects.

---

### Step 7 — Identify Affected Objects

Systematically walk through every affected dimension of the product. For each dimension, determine: what is affected, how severely, and what action is required.

**Affected Dimensions Checklist:**

| Dimension | Questions to Answer |
|---|---|
| Modules | Which modules are directly changed? Which are indirectly affected? |
| Screens | Which existing screens change? Are new screens needed? |
| UI Components | Which ShadCN or custom components are created/modified? |
| Data Entities | Which Convex tables are created/modified/deprecated? |
| Convex Schema | Does `convex/schema.ts` need changes? |
| Convex Functions | Which queries/mutations/actions are created/modified? |
| Integrations | Does this touch Clerk (auth), Razorpay (payments), or other external services? |
| User Roles | Are roles or permissions added, changed, or removed? |
| Business Rules | Are existing rules violated or new rules required? |
| Configurations | Are system-level config values affected? |
| Reports | Are any RPT module outputs affected? |
| Regression Risk | Which currently working features could break? |
| Performance | Does this affect query load, subscription count, or page load time? |
| Security | Does this touch authentication, authorization, or data privacy? |

**Rules:**
- Every dimension must be assessed — not skipped because "it probably doesn't apply."
- Severity must be assigned to each impact: None / Low / Medium / High / Critical.
- Output goes into the Impact Assessment Object.

---

### Step 8 — Detect Risk and Required Governance Gates

Apply RISK_RULES.md and APPROVAL_GATES.md. Based on blocking flags from Step 3 and impact from Step 7, determine which governance gates apply.

**Automatic Gate Triggers:**

| Condition | Required Gate |
|---|---|
| Convex schema change | G4 — Schema Review |
| Payment flow change | G4 + G6 — Schema Review + Security Review |
| Role or permission change | G4 — Role/Permission Review |
| Security-sensitive change | G6 — Security Review |
| Release action | G7 — Release Approval |
| New external integration | G4 + G5 — Architecture Review |
| Price or financial data change | G6 — Security Review |
| Breaking change to existing API | G5 — Architecture Review |

**Rules:**
- Gates are non-optional. A gate cannot be waived without a Decision Object documenting the waiver.
- If a gate is triggered, document it in the Risk Object and note it in the object's `governance.required_gates` field.
- Governance Agent is responsible for enforcing gates — no agent may bypass them.

---

### Step 9 — Identify Missing Information

Create a structured list of required information that is not yet known. Classify each gap:

**Blocking gaps** — Must be resolved before proceeding to next lifecycle stage. Example: "Acceptance criteria not defined — cannot write user stories without them."

**Non-blocking gaps** — Can proceed with documented assumption. Example: "Exact auto-scroll interval not specified — assuming 4 seconds based on common UX practice."

**Rules:**
- Document all gaps in the `ai_reasoning.gaps` field of the output object.
- Do not proceed past a blocking gap without either: resolving it, or escalating to the human with a specific question.
- Non-blocking gaps generate assumptions that must appear in Step 10's output.

---

### Step 10 — Ask Only Necessary Grilling Questions

Determine which questions, if any, must be asked of the human before proceeding.

**Before asking any question, verify:**
1. Is this already answered in the request text? → Do not ask.
2. Is this already answered in an existing Product OS file? → Do not ask; cite the source.
3. Is this a non-blocking gap that can be assumed? → Do not ask; document the assumption.
4. Is this truly unknown AND decision-critical? → Ask.

**Rules:**
- Never ask more than 5 questions per interaction. Prioritize the most decision-critical ones.
- Questions must be specific, not open-ended. "What should the carousel do?" is banned. "Should the carousel loop infinitely or stop at the last slide?" is acceptable.
- Each question must reference the gap it resolves.
- Questions are part of the Discovery Agent's `/product-grill` command output.

---

### Step 11 — Generate or Update Product Objects

Create new objects or update existing ones with all known metadata, relationships, and AI reasoning populated.

**Object Generation Rules:**
- Assign a semantic ID following the pattern defined in SEMANTIC_ID_SCHEMA.md.
- Populate every required field. If a field value is unknown, use `null` and document it as a gap.
- Populate the `ai_reasoning` block with all assumptions, inferences, evidence, and confidence level.
- Objects must be written as structured files to `product/objects/<type>/` directories.
- Never create an object without first completing Steps 1–10.

---

### Step 12 — Build Traceability Links

Establish all required relationship links per TRACEABILITY_RULES.md.

**Required actions:**
1. Add `relationships` block to the new/updated object listing all forward and backward links.
2. Update `OBJECT_INDEX.md` with the new object entry.
3. Update `TRACEABILITY_MAP.md` with the new chain segment.
4. Update `RELATIONSHIP_INDEX.md` with each new link.

**Rules:**
- Every object must have at least one traceability link to a parent object (except root-level Initiatives and Roadmap Themes).
- Orphaned objects (no links) are flagged by GAP_DETECTION_ENGINE as `MISSING_RELATIONSHIP` gaps.
- Link confidence must be documented: Confirmed / Inferred / Assumed.

---

### Step 13 — Recommend Next Action

Apply NEXT_ACTION_ENGINE.md. After completing all object generation and traceability, output a specific, actionable recommendation for the user's next step.

Output format (always use this exact structure):
```
RECOMMENDED NEXT ACTION: <action description>
COMMAND: <slash-command or manual step>
REASON: <why this is the correct next step>
BLOCKING: <Y/N>
BLOCKER DETAIL: <what is blocking, if BLOCKING=Y>
```

**Rules:**
- Never output a vague recommendation. "Continue development" is banned. "Run /product-qa REQUEST-COM-PLP-CAROUSEL-001 — QA Run is the next required gate after Dev Plan completion" is acceptable.
- The recommendation must be consistent with the object's current lifecycle stage.

---

### Step 14 — Update Lifecycle State

Advance the object to the correct lifecycle stage per LIFECYCLE_MODELS.md.

**Common lifecycle transitions:**
- Request → `Classified` after Step 3
- Request → `Grilled` after Discovery Session
- Request → `Impact Assessed` after Impact Assessment
- Request → `PRD Approved` after PRD approval
- Feature → `In Development` after Dev Plan creation
- Feature → `QA In Progress` after QA Run start
- Feature → `UAT Complete` after UAT Sign-off
- Feature → `Released` after Release Object creation

**Rules:**
- Lifecycle state must always reflect the latest completed step — never a future or aspirational state.
- Backwards transitions (e.g., from `PRD Approved` back to `Grilled`) require a Decision Object explaining the regression.
- Lifecycle state changes must be logged with a timestamp and the triggering event.

---

### Step 15 — Preserve Reasoning, Assumptions, Confidence, and Evidence

Every object's `ai_reasoning` block must be fully populated before the object is written. This block is not optional.

**Required `ai_reasoning` fields:**

```yaml
ai_reasoning:
  confidence: High | Medium | Low
  assumptions:
    - id: ASM-001
      text: "<what was assumed>"
      basis: "<why this assumption was made>"
      verification_required: true | false
  inferences:
    - id: INF-001
      text: "<what was inferred>"
      evidence: "<object ID, document, or stated fact that supports this>"
  uncertainties:
    - id: UNC-001
      text: "<what is uncertain>"
      impact: "<what decision this uncertainty affects>"
  evidence_chain:
    - claim: "<claim made in this object>"
      source: "<object ID, document name, or stated assumption ID>"
  gaps:
    - id: GAP-001
      type: blocking | non-blocking
      description: "<what is missing>"
      resolution: "<how to resolve>"
  search_performed:
    - target: OBJECT_INDEX.md
      query: "<keywords used>"
      result: "<what was found>"
```

---

## Confidence Levels

| Level | Threshold | Meaning | Required Action |
|---|---|---|---|
| **High** | >85% | Based on existing data, confirmed requirements, and precedent in product history | Proceed without human confirmation |
| **Medium** | 60–85% | Some ambiguity present; assumptions made on reasonable basis | Document assumptions; proceed but flag for human review |
| **Low** | <60% | Significant gaps in information; multiple critical unknowns | Block until at least one grilling session resolves key uncertainties |

**Confidence is object-level, not request-level.** A single request may produce objects with different confidence levels.

---

## Assumption Rules

1. **All AI assumptions are documented assumptions — not facts.** An assumption is a decision made in the absence of confirmed information.
2. **Assumptions must be flagged for human verification** unless they are trivially obvious (e.g., "the app runs on the web").
3. **Assumptions do not block progress** unless they are load-bearing for a governance gate (e.g., "assuming this change does not touch Razorpay" — this must be verified before the payment gate is bypassed).
4. **Assumptions made repeatedly across multiple objects** should be promoted to a standing Decision Object or a product principle.
5. **If an assumption is later invalidated**, all objects that depended on it must be re-evaluated. This is triggered by the Governance Agent.

---

## Evidence Chain

Every claim in `ai_reasoning` must trace back to one of:
- A Product Object ID (e.g., `PRD-0002 Section 3.1`)
- A named document in the `product/` directory (e.g., `PRODUCT_PRINCIPLES.md`)
- A stated assumption ID (e.g., `ASM-003`)
- A user-stated fact from the current session (e.g., `user stated: "we will not support iOS app in MVP"`)

**Evidence that cannot be traced is flagged as unverified.** Unverified claims are treated as assumptions.

---

## Failure Modes

When AI reasoning fails or produces an incomplete result:

| Failure Mode | Trigger | Response |
|---|---|---|
| **Classification failure** | Cannot assign module or domain | Assign `NEEDS-CLASSIFICATION`, flag for human review, do not proceed to object creation |
| **Traceability failure** | Cannot establish required parent link | Create object as orphan, flag `MISSING_RELATIONSHIP` gap, do not update TRACEABILITY_MAP |
| **Confidence collapse** | Confidence drops to Low mid-reasoning | Halt at current step, output gap list, request grilling session before continuing |
| **Governance conflict** | Gate is required but approval is missing | Block the operation, output specific gate requirement, do not create downstream objects |
| **Duplicate detected** | High-confidence duplicate found | Surface duplicate to user with recommendation, do not create new object until human resolves |
| **Schema change unconfirmed** | Schema impact detected but not confirmed | Block Step 11 object creation, require human to confirm schema impact |
| **Contradictory inputs** | Two existing objects contradict this request | Flag as `CONSISTENCY_GAP`, surface both objects, request Decision Object before proceeding |

In all failure modes: the AI must output a clear, specific description of what failed, what information is needed, and what the user must do to unblock the reasoning chain.

---

## Related Files

- `AI_AGENTS.md` — Defines agents that execute this reasoning model
- `CLASSIFICATION_ENGINE.md` — Powers Step 3
- `IMPACT_ENGINE.md` — Powers Step 7
- `GAP_DETECTION_ENGINE.md` — Powers Steps 9 and post-Step 15 validation
- `TRACEABILITY_ENGINE.md` — Powers Step 12
- `DUPLICATE_DETECTION_ENGINE.md` — Powers Step 6
- `NEXT_ACTION_ENGINE.md` — Powers Step 13
- `OBJECT_TYPES.md` — Powers Step 2
- `RISK_RULES.md` — Powers Step 8
- `APPROVAL_GATES.md` — Powers Step 8
- `LIFECYCLE_MODELS.md` — Powers Step 14

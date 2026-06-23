# Nuemart Product OS — Governance Policies

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | Product OS AI Agents + Human Product Manager |

---

## Purpose

These policies are the law of the Nuemart Product OS. Every AI agent and human product manager must follow these policies without exception. Deviations require explicit waiver documentation via a POLICY_WAIVER Decision Object (see Policy Waiver Process below).

Governance policies exist to ensure that:
- Every product change is intentional and traceable
- No feature is built without proper definition, review, and testing
- The product graph remains accurate and trustworthy over time
- Risk is identified and managed before it materialises in production
- The AI and human team operate with a shared, consistent system

---

## Core Governance Policies

### P001 — Every Incoming Ask Must Create a Request Object

Every feature idea, bug report, change request, stakeholder suggestion, or enhancement suggestion must either create a new Request Object or link to an existing one in `product/objects/requests/`.

**What this means:**
- Verbal requests, Slack messages, and informal suggestions are not trackable. They must be captured as a Request Object.
- No feature, story, PRD, or design work may begin without a Request Object in place.
- A Request Object is the entry point to the product workflow — nothing bypasses it.

**Applies to:** All incoming asks regardless of size, priority, or source.

**Enforced by:** Intake Agent — will refuse to create downstream objects without a Request Object.

**Cross-reference:** See `/product-request` command for intake workflow.

---

### P002 — Every Request Must Be Classified With Confidence

Every Request Object must contain the following classification fields before any downstream work begins:

- `request_type` — (e.g., New Feature, Bug Fix, Enhancement, Documentation, Configuration)
- `domain` — (e.g., Customer Commerce, Admin Console, Delivery, Payment)
- `product_area_code` — (e.g., COM, ADM, DEL, PAY)
- `module_code` — (e.g., PLP, PDP, CART, CHK)
- `confidence` — one of: High, Medium, Low

**Confidence rules:**
- **High**: All fields are clear and unambiguous. Proceed to next step.
- **Medium**: Fields are mostly clear with minor uncertainty. Proceed with caution; review at next gate.
- **Low**: One or more fields are uncertain or ambiguous. Classification must be reviewed by the Product Owner before any downstream work proceeds.

**Enforced by:** Classification Agent — will flag Low confidence requests and block downstream steps.

**Cross-reference:** See `CLASSIFICATION_RULES.md` for field definitions and classification logic.

---

### P003 — AI Must Check for Duplicates Before Creating New Objects

Before creating any Feature Object, Sub-feature Object, or PRD, the AI must:

1. Run the DUPLICATE_DETECTION_ENGINE check
2. Search `product/graph/FEATURE_MASTER.md` for matching capability names
3. Search `product/os/indexes/OBJECT_INDEX.md` for matching IDs or slugs
4. Check existing Request Objects for similar incoming asks

**If a potential duplicate is found:**
- The AI must flag it and present the match to the Product Owner for a resolution decision
- The Product Owner must either confirm it is a duplicate (link to existing objects) or confirm it is distinct (proceed with new object creation)
- A Decision Object must be created documenting the de-duplication decision

**What this prevents:**
- Multiple Feature Objects for the same product capability
- Multiple PRDs for the same requirement set
- Conflicting versions of the same feature in the product graph

**Enforced by:** Duplicate Detection Engine, Classification Agent, PRD Agent.

---

### P004 — No Feature Proceeds to Build Without a PRD

Development may not start on any feature until a PRD exists with **status: Approved**.

**Exceptions (narrow and documented):**
- **Documentation-only changes** (no code changes, no behavior changes) — no PRD required
- **Emergency hotfixes** — PRD requirement may be waived with a POLICY_WAIVER Decision Object, countersigned by the Product Owner, documenting the emergency rationale and the commitment to create a retrospective PRD within 5 business days

**What "Approved" means:**
- PRD has passed G4 — PRD Approval Gate
- Product Owner has reviewed and approved
- All requirements have acceptance criteria
- Out-of-scope items are documented

**Enforced by:** Engineering gate check, `/product-devplan` command (will refuse to create development plan without Approved PRD).

**Cross-reference:** See `APPROVAL_GATES.md` (G4), `/product-prd` command.

---

### P005 — High-Risk Changes Require Impact Assessment

The following change types require a completed and reviewed Impact Assessment Object before PRD approval may be granted:

- Convex schema changes (adding, removing, renaming fields or tables)
- Razorpay payment integration changes (webhook handling, payment flow changes)
- Clerk authentication changes (login flows, session management)
- Role or permission changes (what users or admins can or cannot do)
- Breaking API contract changes (changes to API responses consumed by clients)
- Data migration changes (moving, transforming, or deleting existing data)
- Security-relevant changes (data exposure, access control, encryption)

**What this means in practice:**
- `/product-impact` must be run before `/product-prd` approval for these change types
- Impact Assessment Object must have status: Complete before G3 gate can pass
- G3 gate requires both Product Owner and Engineering Lead sign-off for schema and payment changes

**Enforced by:** Impact Assessment Agent, G3 gate check.

**Cross-reference:** See `APPROVAL_GATES.md` (G3), `RISK_RULES.md`.

---

### P006 — No Release Without QA Result

Every release to production must link to a QA Run Object. The QA Run must have one of the following statuses:

- **Passed** — all test cases passed, release may proceed
- **Conditionally Passed** — some non-critical issues exist; Product Owner has accepted the risks and documented them as Known Limitations

A QA Run with status **Failed** blocks release. The release may not proceed until the QA Run is re-run and passes (or Conditionally Passes with explicit risk acceptance).

**What this means:**
- "We'll fix it in production" is not an acceptable rationale
- All user stories for the feature must be covered by the QA Run
- Test cases must exist before QA begins (not written after the fact)

**Enforced by:** Release Agent, G7 gate check.

**Cross-reference:** See `APPROVAL_GATES.md` (G7, G8), `TRACEABILITY_RULES.md`.

---

### P007 — User-Facing Changes Require UAT Sign-Off or Waiver

Any change that is visible to or interactable by customers or delivery persons requires one of the following before release:

- A UAT Sign-off Object (linked UAT Run with status: Passed or Conditionally Passed), OR
- A UAT Waiver Decision Object documenting: the rationale for skipping UAT, the risks accepted, and the Product Owner's explicit approval

**User-facing definition:**
- Any change to a screen, UI component, user flow, or interaction visible to a customer
- Any change to a delivery person's app screen or workflow
- Any change to notification content or delivery channel received by users
- Any change to checkout, payment, or order flow

**What does not require UAT:**
- Internal admin-only changes with no customer impact
- Infrastructure changes with no observable behavior change
- Configuration-only changes

**Enforced by:** Release Agent, G7 gate check.

**Cross-reference:** See `APPROVAL_GATES.md` (G7).

---

### P008 — Every Release Requires Release Notes and Rollback Plan

A Release Object is not considered complete — and may not be used to gate a production deployment — unless it contains all of the following:

1. **Release Notes** — What changed, what was fixed, what was added, what was removed. Written for a technical audience but legible to a non-engineer.
2. **Rollback Plan** — Specific, actionable steps to revert the deployment if critical issues are discovered post-release. Must name who executes the rollback and how long it takes.
3. **Known Limitations** — Any known issues, partial implementations, or deferred items that will be live in production after release.

**Why this exists:**
- Every production deployment carries risk. The rollback plan ensures the team can act quickly if something goes wrong.
- Known Limitations must be documented so the support team and Product Owner are not surprised.

**Enforced by:** Release Agent, G8 gate check.

**Cross-reference:** See `APPROVAL_GATES.md` (G8), `/product-release` command.

---

### P009 — Every Requirement Must Link to Stories and Test Cases

A Requirement Object (inside a PRD) is not considered complete unless:

1. It links to at least one User Story
2. The User Story links to at least one Test Case (acceptance criterion or formal test case)

**Untested requirements are not complete.** They may not be marked as Done in a Development Plan and may not be included in a Release Object.

**What this prevents:**
- Requirements that are written but never verified
- Stories that have no acceptance criteria
- Features that reach production without knowing if they work correctly

**Enforced by:** QA Agent, Traceability Engine.

**Cross-reference:** See `TRACEABILITY_RULES.md`.

---

### P010 — Scope-Changing Decisions Must Create Decision Objects

Any decision that does any of the following must create a Decision Object in `product/objects/decisions/`:

- Changes the scope of a feature (adding or removing capability from what was agreed)
- Delays delivery of a committed feature
- Adds out-of-scope items (scope creep that is explicitly approved)
- Removes previously agreed scope (de-scoping)
- Accepts risk and proceeds despite known issues
- Waives any governance policy

**Why this exists:**
- Scope changes made verbally or informally become invisible in the product graph
- Decision Objects ensure that the product record reflects what actually happened, not just what was planned
- Decision Objects allow the team to understand why the product is the way it is, months or years later

**Enforced by:** AI agents will prompt for a Decision Object when scope-changing language is detected in a conversation.

**Cross-reference:** See Decision Object template in `product/os/templates/`.

---

### P011 — Unfinished Items Must Be Tracked as Incomplete Work Objects

Any work item that was started but not completed — whether abandoned, deferred indefinitely, or partially built — must have an Incomplete Work Object created documenting:

- What was started
- Why it was not completed
- What state it was left in
- The resolution path (will be completed in a future release, officially abandoned, needs re-scoping, etc.)
- Which objects it relates to

**Where Incomplete Work Objects live:**
- `product/objects/enhancements/` for incomplete feature work
- `product/objects/knowledge/` for incomplete discovery or analysis work

**Why this exists:**
- Partially-built features are technical and product debt that must be visible
- "We'll finish it later" that is never written down becomes invisible and forgotten
- The product graph must reflect reality, including incomplete work

**Enforced by:** AI agents will prompt for an Incomplete Work Object when a request is closed without completion.

---

### P012 — Product Object Files Are the Source of Truth

The `product/objects/` directory is the authoritative source of truth for all product knowledge.

**Hierarchy of truth:**
1. `product/objects/` — source of truth (wins in any conflict)
2. `product/graph/` — relationship indexes (derived from objects; must be kept in sync)
3. `product/views/` — derived summaries and reports (read-only views into the object graph)

**What this means in practice:**
- If a view file (e.g., a feature summary) disagrees with the Feature Object file, the Feature Object file is correct
- If a graph file (e.g., FEATURE_MASTER.md) disagrees with the Feature Object file, the Feature Object file is correct
- Graph and view files must be regenerated/updated when object files change

**Enforced by:** All AI agents must read from object files, not view or graph files, when resolving conflicts.

---

### P013 — Feature-Level Details Must Live in Feature Objects

The functional scope, UX behavior, business rules, configuration rules, data dependencies, and constraint documentation for a product capability must live in the Feature Object or Sub-feature Object.

**What this prevents:**
- Business rules that exist only in a PRD (PRDs are versioned documents; features are permanent)
- UX behavior that is only described in a Request Object (requests are closed after delivery)
- Constraints that exist only in a developer's head or a Slack conversation

**Practical rule:**
- If a piece of product knowledge should survive the closure of the request that created it, it belongs in the Feature Object
- PRDs may summarise feature rules, but the Feature Object is the permanent record
- If there is no Feature Object yet, create one before documenting rules

**Enforced by:** PRD Agent and QA Agent will flag missing Feature Object links.

**Cross-reference:** See `FEATURE_TRACKING_RULES.md`.

---

## Policy Waiver Process

When a team member (human or AI) determines that a policy cannot or should not be followed for a specific situation, the following waiver process applies:

### Step 1 — Create a Decision Object

Create a Decision Object in `product/objects/decisions/` with:

```yaml
object_type: DECISION
decision_type: POLICY_WAIVER
policy_waived: P0XX  # e.g., P004
object_id: DECISION-GOV-POLICY-WAIVER-<SEQUENCE>
waiver_reason: |
  [Detailed explanation of why the policy cannot be followed in this case]
risk_accepted: |
  [What risks the team accepts by waiving this policy]
compensating_controls: |
  [What alternative safeguards are in place instead of the policy]
approved_by: <Product Owner name>
approval_date: <date>
expires: <date or "one-time">
```

### Step 2 — Get Product Owner Approval

The Product Owner must explicitly review and approve the waiver. Verbal approval is not sufficient. The Decision Object must be committed to the repository with the `approved_by` field populated.

### Step 3 — Document in the Parent Object

The object that is affected by the waiver (e.g., the PRD that is proceeding without an Impact Assessment) must reference the waiver Decision Object:

```yaml
policy_waivers:
  - DECISION-GOV-POLICY-WAIVER-001
```

### Step 4 — Time-Limit the Waiver

Every waiver must specify whether it is:
- **One-time** — applies to this specific object/release only
- **Time-limited** — valid until a specific date
- **Standing waiver** — applies indefinitely (requires quarterly review)

Standing waivers must be reviewed at every major release gate (G8).

---

## Policy Enforcement Matrix

| Policy | Enforced by | Gate |
|---|---|---|
| P001 — Request Object required | Intake Agent | G1 |
| P002 — Classification with confidence | Classification Agent | G1 |
| P003 — Duplicate check | Duplicate Detection Engine | G1–G2 |
| P004 — PRD before build | Engineering gate, `/product-devplan` | G4 |
| P005 — Impact Assessment for high-risk | Impact Assessment Agent | G3 |
| P006 — QA before release | Release Agent | G7 |
| P007 — UAT sign-off or waiver | Release Agent | G7 |
| P008 — Release notes and rollback | Release Agent | G8 |
| P009 — Requirements linked to stories and tests | QA Agent, Traceability Engine | G5, G7 |
| P010 — Decision Objects for scope changes | All agents (detect scope language) | G2, G4 |
| P011 — Incomplete Work Objects | Intake Agent, all agents at close | Any closure |
| P012 — Object files are source of truth | All agents | Always |
| P013 — Feature details in Feature Objects | PRD Agent, QA Agent | G4, G7 |

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| APPROVAL_GATES.md | `product/os/policies/` | Defines gates referenced by these policies |
| RISK_RULES.md | `product/os/policies/` | Defines risk levels used in P005 |
| FEATURE_TRACKING_RULES.md | `product/os/policies/` | Implements P013, Rule 6 |
| CLASSIFICATION_RULES.md | `product/99-operating-system/governance/` | Implements P002 |
| TRACEABILITY_RULES.md | `product/os/policies/` | Implements P009, P011 |
| STATUS_TRANSITION_RULES.md | `product/os/policies/` | Supports P010 (state changes as decisions) |
| NOMENCLATURE_AND_ID_SYSTEM.md | `product/os/policies/` | Supports P001, P003 (ID rules for objects) |
| ID_RULES.md | `product/os/policies/` | Implements P001 (object creation rules) |

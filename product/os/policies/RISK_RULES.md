# Nuemart Product OS — Risk Rules

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | Impact Assessment Agent, Risk Engine, Release Agent |

---

## Purpose

Risk Rules define how risk is identified, categorised, assessed, tracked, and resolved across the Nuemart product lifecycle. Every change that reaches a production system carries some risk. These rules ensure that risks are made visible, assigned an owner, mitigated where possible, and monitored after release.

**Risk is not a reason to stop work.** Risk is information that helps the team make better decisions.

---

## Risk Levels

### Critical

The highest risk level. Reserved for changes that could cause irreversible harm to Nuemart's data, customers, or operations if they go wrong.

**Triggers:**
- Production data loss (customer records, order history, payment records deleted or corrupted)
- Payment data exposure (Razorpay webhook secrets, payment tokens, customer payment details leaked)
- Authentication bypass (customers able to access other customers' accounts, Clerk misconfiguration)
- Convex schema corruption (schema changes that destroy existing data or make it inaccessible)
- Irreversible data migration errors (data transformed or deleted in a way that cannot be recovered)

**Required actions:**
- Impact Assessment Object is mandatory (P005)
- Engineering Lead and Product Owner must review before work begins
- Rollback plan must be defined before deployment starts
- Tested in staging environment with production-representative data
- Deployment must be monitored in real time at release

---

### High

Significant risk that is recoverable but requires significant effort to fix if it goes wrong.

**Triggers:**
- Convex schema change — adding, removing, or renaming a field or table
- Razorpay integration changes — changes to payment flow, webhook handling, or payment verification
- Clerk authentication changes — login flows, session management, token validation
- Role or permission model changes — what a customer, admin, or delivery person can or cannot do
- Breaking API contract changes — changes to API responses consumed by multiple clients or external systems
- Releasing without QA (emergency exception) — any deployment skipping the QA gate

**Required actions:**
- Impact Assessment Object is mandatory (P005)
- G3 gate must be passed before PRD approval
- Engineering Lead must review
- High-priority monitoring after release

---

### Medium

Meaningful risk that is manageable with normal care and process.

**Triggers:**
- New screen added to customer or admin flows
- New data entity or field in Convex (non-schema-breaking addition)
- Significant UI flow change (adding or changing a major navigation path)
- Performance-sensitive query (new real-time subscription, large data query)
- Complex business rule change (pricing logic, order eligibility, delivery routing)
- Third-party integration extension (adding a new API call to an existing integration)

**Required actions:**
- Note the risk in the PRD
- Monitor during QA and include specific test cases for the risk area
- Document as Known Limitation if risk cannot be fully mitigated before release

---

### Low

Minor risk that can be managed within normal development and QA processes.

**Triggers:**
- UI copy change (text, labels, messages — no behavior change)
- Styling change (colour, spacing, typography — no functional change)
- Non-breaking configuration change (adding a feature flag, adjusting a timeout value)
- Internal tooling change (developer tools, scripts, CI/CD improvements with no customer impact)
- Adding a new non-required field to an existing form

**Required actions:**
- Standard development and QA process
- No special risk documentation required unless the change combines with other changes to elevate the overall risk level

---

### None

No meaningful risk beyond normal software delivery.

**Triggers:**
- Documentation-only change (README, product docs, policy files — no code)
- Code comment update
- Formatting or linting fix (no behavior change)
- Test-only change (adding or improving tests without changing production code)
- Removing dead code with confirmed no callers

**Required actions:** None beyond normal pull request review.

---

## Risk Rules

### Rule 1 — Every Risk Object Must Have Required Fields

A Risk Object is not considered complete unless it contains all of the following fields:

```yaml
risk_level: Critical | High | Medium | Low | None
risk_category: SCHEMA | PAYMENT | AUTH | DATA | INTEGRATION | PERFORMANCE | SECURITY | REGRESSION | SCOPE | COMPLIANCE
probability: High | Medium | Low  # How likely is this risk to materialise?
impact: Critical | High | Medium | Low  # If it materialises, how bad is it?
mitigation: |
  [What specific steps reduce the likelihood or impact of this risk?]
contingency: |
  [If the risk materialises anyway, what do we do? Who is called? What are the rollback steps?]
owner: <name or role responsible for monitoring and managing this risk>
status: Open | Mitigated | Accepted | Materialised | Closed
```

---

### Rule 2 — Critical and High Risks Must Be Reviewed Before PRD Approval

If a feature or change carries a Critical or High risk, the Impact Assessment Object must be complete and reviewed before the PRD Approval Gate (G4) can pass.

The Impact Assessment Object must explicitly address the Critical or High risk, including:
- What specific scenario creates the risk
- What the probability of materialisation is
- What the mitigation plan is
- What the contingency is if the risk materialises

**This is enforced at G3.** See `APPROVAL_GATES.md`.

---

### Rule 3 — Medium Risks Must Be Noted in the PRD and Monitored During QA

Medium risks do not block PRD approval, but they must be documented:
- In the PRD under a "Risks and Constraints" section
- In the QA Run Object as specific test case areas requiring attention
- In the Release Object's Known Limitations if not fully resolved

---

### Rule 4 — All Risks Must Link to the Object That Carries Them

Every Risk Object must include a `linked_to` field that references the object (Feature, PRD, Story, or Release) that carries the risk.

```yaml
linked_to:
  - FEATURE-COM-PLP-CAROUSEL
  - PRD-COM-PLP-CAROUSEL-V1
```

Unlinked Risk Objects are considered orphaned and will be flagged by the Traceability Engine.

---

### Rule 5 — Mitigated Risks Must Document What Was Done

When a risk is mitigated (status changes from Open to Mitigated), the Risk Object must be updated with:

```yaml
status: Mitigated
mitigation_actions_taken: |
  [Specific steps that were taken to reduce the risk]
mitigation_date: <date>
mitigated_by: <name or role>
residual_risk_level: Low | None  # What risk remains after mitigation?
```

A risk that has been mitigated but still has residual risk must have its residual risk level documented and accepted by the Product Owner.

---

### Rule 6 — Materialised Risks Must Link to an Incident Object

If a risk materialises in production (i.e., the thing the risk warned about actually happened), the Risk Object must:

1. Update status to `Materialised`
2. Link to an Incident Object documenting what happened, the impact, and the resolution

```yaml
status: Materialised
materialised_date: <date>
incident_object: INCIDENT-<ID>
```

This creates a permanent record in the product graph connecting a known risk to its actual outcome. This knowledge improves future risk assessments.

---

### Rule 7 — Risk Register Must Be Reviewed at Each Release Gate (G8)

Before every production release (G8 gate), the Risk Register for the release must be reviewed:

- All Open risks must be either Mitigated, Accepted (with explicit Product Owner acceptance), or resolved to Closed
- All Accepted risks must have a contingency plan
- All Materialised risks from previous releases must have linked Incident Objects

The Release Object must include a `risk_register_reviewed: true` field after this review.

---

## Nuemart-Specific Risk Categories

| Category Code | Category Name | Description |
|---|---|---|
| SCHEMA | Convex Schema Changes | Adding, removing, or renaming fields or tables in the Convex schema. High risk due to potential data loss or migration failures. |
| PAYMENT | Razorpay / Payment Flow | Changes to payment initiation, verification, webhook handling, or Razorpay integration. Critical path for revenue. |
| AUTH | Clerk / Authentication / Roles | Changes to Clerk authentication, login flows, session management, or role/permission definitions. Security-critical. |
| DATA | Data Migration / Integrity | Bulk data operations, data transformation, or any change that reads/writes/deletes existing production data at scale. |
| INTEGRATION | Third-Party Service Changes | Changes to how Nuemart integrates with external services (Razorpay, Clerk, SMS providers, maps APIs, etc.). |
| PERFORMANCE | Query Performance / Real-Time | New or modified Convex queries, subscriptions, or indexes that may degrade performance under production load. |
| SECURITY | Data Exposure / Access Control | Any change that could expose customer data, allow unauthorised access, or weaken security boundaries. |
| REGRESSION | Existing Feature Regression | Risk that a new change breaks existing features. Highest probability for changes in shared components, schemas, or core flows. |
| SCOPE | Scope Creep / Uncontrolled Expansion | Risk that a feature grows beyond its agreed scope during development, consuming unplanned engineering time. |
| COMPLIANCE | India Regulatory / Privacy | Risk of non-compliance with Indian data localisation, GST rules, consumer protection laws, or applicable privacy regulations. |

---

## Risk Register Format

A Risk Register is a collection of Risk Objects associated with a Feature, PRD, or Release. The register may be embedded in the relevant object file or maintained as a standalone file in `product/objects/risks/`.

**Recommended format for embedding in a PRD or Release:**

```yaml
risk_register:
  - risk_id: RISK-COM-PLP-CAROUSEL-001
    risk_level: Medium
    risk_category: PERFORMANCE
    description: Carousel images loaded from Convex storage may cause slow initial page load on 3G mobile connections.
    probability: Medium
    impact: Medium
    mitigation: Lazy-load images below the fold; use next/image for optimised delivery.
    contingency: Reduce carousel to 3 images maximum if p75 LCP > 4s in production.
    owner: Engineering Lead
    status: Mitigated
    mitigation_actions_taken: Implemented next/image with lazy loading and AVIF compression.
    residual_risk_level: Low
```

---

## Risk Assessment Process

When evaluating a new feature or change request for risk:

### Step 1 — Identify Risk Triggers

Review the change description against the Risk Level trigger list above. Note all categories that apply.

### Step 2 — Assign Risk Level

Assign the highest applicable risk level. If the change triggers both Medium and High risks, the overall risk level is High.

### Step 3 — Assess Probability and Impact

For each identified risk:
- **Probability:** How likely is this specific risk to materialise? (High = likely, Medium = possible, Low = unlikely)
- **Impact:** If it does materialise, how bad is it? (Critical = data loss or security breach, High = significant customer impact, Medium = degraded experience, Low = minor inconvenience)

The risk level is a function of both probability and impact. A Low probability + Critical impact is still a High overall risk.

### Step 4 — Define Mitigation

For every Critical or High risk, define a concrete mitigation plan — specific actions that reduce probability or impact. Vague mitigations ("be careful," "test thoroughly") are not acceptable.

### Step 5 — Define Contingency

For every Critical or High risk, define a contingency plan — what happens if the mitigation fails and the risk materialises. Who is responsible? What is the rollback procedure? What is the communication plan?

### Step 6 — Assign Owner

Every risk must have an owner (a named person or role) responsible for tracking and executing the mitigation and contingency plan.

### Step 7 — Document in Risk Register and Link to Object

Create or update the Risk Object and link it to the Feature, PRD, or Release object.

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P005 defines when Impact Assessment is required |
| APPROVAL_GATES.md | `product/os/policies/` | G3 gate enforces risk review before PRD approval |
| TRACEABILITY_RULES.md | `product/os/policies/` | Rule 12: every Risk Object must link to its carrier object |
| STATUS_TRANSITION_RULES.md | `product/os/policies/` | Risk status transitions (Open → Mitigated → Closed) |
| NOMENCLATURE_AND_ID_SYSTEM.md | `product/os/policies/` | RISK prefix and ID format for Risk Objects |

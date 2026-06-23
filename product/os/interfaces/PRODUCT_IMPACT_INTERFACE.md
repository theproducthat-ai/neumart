# Nuemart Product OS — Product Impact Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-impact`

---

## Purpose
Systematic impact assessment of a request or feature. Identify every affected module, screen, data entity, API, user role, and integration. Surface regression risks, dependencies, and gate requirements before any development begins. Impact assessment is mandatory before PRD creation for any high-risk or cross-module change.

---

## Triggered By
- User types `/product-impact <REQUEST-ID>` or `/product-impact <FEATURE-ID>`.
- Automatically recommended by `/product-request` when blocking flags are detected.
- Automatically triggered at Gate G3 (before development) for any request with schema_change or payment flags.

---

## Pre-conditions
- Request Object must exist with status `Classified` or higher.
- Grilling complete is preferred. If incomplete, AI notes that impact assessment may be incomplete.

---

## Inputs
- Object ID to assess (Request or Feature)
- Optional: specific area of concern (e.g., "focus on data schema changes")
- Optional: known dependencies to check

---

## AI Reasoning Steps

1. **Load the target object.** Read Request or Feature Object, any Discovery Session, open questions, and existing risk objects.

2. **Enumerate affected modules.** For each of COM, ADM, DEL, INV, PAY, USR, RPT — determine: Not Affected / Indirectly Affected / Directly Affected / Owns Change.

3. **Map affected screens and components.** Identify which product screens (PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS) are touched. Identify shared UI components that could be impacted.

4. **Identify data entity impacts.** For each data entity in the Convex schema relevant to this change:
   - Is any field added, removed, or modified?
   - Are any indexes affected?
   - Are any queries or mutations affected?
   - Is any migration required?
   - Flag: SCHEMA_CHANGE if yes

5. **Identify API and function impacts.** Which Convex functions, mutations, queries, or actions are affected? Which Next.js API routes? Are any Clerk webhooks involved?

6. **Assess authentication and authorization impacts.** Does this change touch user roles, permissions, or session behavior? Does it affect what authenticated vs unauthenticated users can see or do?

7. **Assess payment flow impacts.** Does this touch Razorpay integration, order amounts, payment status, or refund flows? Flag: PAYMENT_FLOW if yes.

8. **Identify integration impacts.** Does this change affect any third-party service (Clerk, Razorpay, SMS/OTP provider, delivery integrations)? For each: what specifically changes?

9. **Assess regression risk surface.** Which existing features could break as a result of this change? Rate each: High / Medium / Low regression risk. Create Regression Risk Objects for High-risk items.

10. **Identify dependencies.** Are there other features, infrastructure changes, or external decisions that must be completed before this work can begin or be released?

11. **Determine gate requirements.** Based on flags detected, determine which governance gates apply:
    - G1 (Request Classification) — always
    - G2 (Grilling Complete) — if open questions remain
    - G3 (Impact Assessment Approved) — this gate, triggered by this command
    - G4 (PRD Approved) — if schema changes or payment flows involved
    - G5 (QA Passed) — always
    - G6 (UAT Sign-off) — if user-facing changes
    - G7 (Release Approved) — always

12. **Create Impact Assessment Object.** Compile all findings into structured object.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Impact Assessment Object | `product/objects/impact-assessments/` | Created |
| Risk Objects | `product/objects/risks/` | Created (one per identified risk) |
| Dependency Objects | `product/objects/dependencies/` | Created (one per dependency) |
| Regression Risk Objects | `product/objects/risks/` | Created (for High-risk regression items) |
| Request Object | `product/objects/requests/` | Updated with impact_assessment_status |

---

## Required Relationships Established

- `Impact Assessment → assesses → Request Object` or `Feature Object`
- `Risk Object → identified_in → Impact Assessment`
- `Dependency Object → blocks → Feature Object` (if blocker=true)
- `Impact Assessment → gates → G3`
- `Feature Object → has_impact_assessment → Impact Assessment`

---

## Required Metadata Populated

On the Impact Assessment Object:
- `assessment_id` — semantic ID
- `linked_request` — Request Object ID
- `linked_feature` — Feature Object ID
- `modules_affected` — list with severity ratings
- `screens_affected` — list
- `schema_change_required` — boolean
- `payment_flow_affected` — boolean
- `auth_affected` — boolean
- `integrations_affected` — list
- `regression_risk_level` — High / Medium / Low / None
- `dependencies_identified` — list of Dependency Object IDs
- `gate_requirements` — list of gates triggered
- `assessment_confidence` — High / Medium / Low

On the Request Object (updated):
- `impact_assessment_status` — Complete
- `blocking_flags` — updated with any new flags found

---

## Definition of Done

- [ ] All 7 modules assessed (even if "Not Affected" noted explicitly)
- [ ] All affected screens enumerated
- [ ] Schema change determination made (yes/no with details or explicit None)
- [ ] Payment flow impact determined (yes/no with details)
- [ ] Auth/role impact determined (yes/no with details)
- [ ] Integration impacts enumerated
- [ ] Regression risk surface mapped
- [ ] Dependency Objects created for all identified dependencies
- [ ] Risk Objects created for all identified risks
- [ ] Gate requirements stated
- [ ] Impact Assessment Object written to `product/objects/impact-assessments/`
- [ ] Request Object updated

---

## Output Format

```
IMPACT ASSESSMENT COMPLETE
==========================
Assessment ID:    [IMPACT-...]
Linked Request:   [REQUEST-...]
Linked Feature:   [FEATURE-...]

MODULE IMPACT:
  COM — [Owns Change / Directly Affected / Indirectly Affected / Not Affected]
  ADM — [...]
  DEL — [...]
  INV — [...]
  PAY — [...]
  USR — [...]
  RPT — [...]

SCREENS AFFECTED:
- [Screen name] — [what changes]
- [Screen name] — [what changes]

DATA / SCHEMA IMPACT:
  Schema Change Required: [YES / NO]
  Entities Affected: [entity name] — [field additions/removals/changes]
  Migration Required: [YES / NO]

PAYMENT FLOW IMPACT: [YES — details | NO]
AUTH / ROLE IMPACT:  [YES — details | NO]

INTEGRATIONS AFFECTED:
- [Integration] — [what changes]
(or: None)

REGRESSION RISK:
  Overall Level: [High / Medium / Low / None]
  High-risk Areas:
  - [area] — [why high risk] → [RISK-...]
  - [area] — [why high risk] → [RISK-...]

DEPENDENCIES ({n}):
- [DEP-...] — [what depends on what] — Blocker: [YES/NO]

GATE REQUIREMENTS:
- G3 (Impact Assessment) — TRIGGERED ← this gate
- G4 (PRD Approved) — [Required / Not Required]
- G6 (UAT Sign-off) — [Required / Not Required]

RISKS CREATED ({n}):
- [RISK-...] — [brief description]

NEXT ACTION:
→ /product-prd — Impact assessment is the pre-condition now satisfied
  (Note: G4 gate required — PRD must be approved before development)

File written: product/objects/impact-assessments/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| No blocking flags, low risk | `/product-prd` |
| Schema change detected | `/product-prd` with schema section required |
| Payment flow affected | `/product-prd` with payment rules section required |
| High regression risk | `/product-prd` + plan regression test suite in `/product-qa` |
| Unresolved dependencies | Resolve dependencies first |

---

## Failure Conditions

- **Target object not found:** AI requests correct ID.
- **Schema is not accessible for review:** AI notes schema analysis as manual and flags for human review.
- **Discovery session missing for complex request:** AI proceeds but marks confidence as `Reduced` and lists unresolved questions that could affect impact assessment completeness.
- **Circular dependency detected:** AI surfaces the cycle and recommends which dependency to break first.

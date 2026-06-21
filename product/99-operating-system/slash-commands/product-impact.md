# /product-impact — Slash Command Definition

Create an impact assessment for a request before PRD writing.

---

## How to Use

```
/product-impact REQ-0003
/product-impact
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `Grilling Complete` or `Evaluation Complete` stage.

---

## Purpose

Assesses the risk and breadth of a request across business, technical, schema, payment, inventory, security, and compliance dimensions. Produces a Go / No-Go / Split / Park / Reject recommendation.

---

## When to Use

- After grilling is complete (G2 gate passed)
- After evaluation is complete if applicable (G3 gate passed)
- Mandatory for schema changes, payment flows, inventory changes, cross-module features, integrations, and security/compliance changes
- Recommended whenever a request touches more than 3 files or 2 modules

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm REQ ID and read the request, grilling, and evaluation files |
| 2 | Read `DATA_ENTITY_MAP.md`, `MODULE_DEPENDENCY_MAP.md`, `ROLE_PERMISSION_MAP.md` |
| 3 | Assign next IMPACT ID from `MASTER_REGISTRY.md` |
| 4 | Assess all applicable impact dimensions |
| 5 | Write `IMPACT-NNNN.md` |
| 6 | Present Go / No-Go / Split / Park / Reject recommendation with rationale |
| 7 | Update `DECISION_LOG.md` with the recommendation |
| 8 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` |
| 9 | Update `MASTER_REGISTRY.md` |
| 10 | Wait for user approval before proceeding to PRD |

---

## What Claude Never Asks the User

- The IMPACT ID (Claude generates it)
- Which dimensions to assess (Claude assesses all applicable ones)
- The Go/No-Go decision (Claude recommends; user decides)
- The next step (Claude recommends it)

---

## Impact Dimensions Assessed

All applicable dimensions from the following list:

- Business impact
- Customer experience impact
- Admin experience impact
- Operations impact
- Technical and architecture impact
- Schema impact (new tables, columns, indexes, migrations)
- Backend impact (Convex functions, mutations, queries)
- Frontend impact (pages, components, routes)
- Screen impact (affected Screen IDs, new screens)
- Role and permission impact
- Payment and financial impact
- Inventory impact
- Reporting and analytics impact
- Integration and webhook impact
- Security impact
- Compliance impact
- QA complexity and regression risk
- UAT requirements
- Release and deployment impact
- Rollback feasibility

---

## Recommendation Format

```
**Impact assessment complete:** IMPACT-NNNN
**Request:** REQ-NNNN — [Title]
**Recommendation:** Go / No-Go / Split / Park / Reject
**Risk level:** Low / Medium / High
**Key risks:** [Bullet list]
**Next step:** [PRD / Split into REQ-NNNN + REQ-NNNN / Park to roadmap / Reject with explanation]
```

---

## Approval Gate

Claude must NOT begin PRD writing without user confirming the Go decision.

After presenting the recommendation, Claude asks:
"Do you want me to proceed to the next step?"

---

## Guardrails

- Do not write the PRD during impact assessment
- Do not change application code
- Do not recommend Go if schema changes are unresolved
- Do not recommend Go if payment flow risk is undocumented
- Do not skip rollback plan for schema or data migration changes

---

## Output Files Created

| File | Path |
|---|---|
| Impact assessment | `product/06-assessment-and-impact/assessments/IMPACT-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/00-product-foundation/DECISION_LOG.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if blocked)

---

*Last updated: 2026-06-21*

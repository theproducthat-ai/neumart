# /product-prd — Slash Command Definition

Create a PRD for a request that has passed grilling and any required evaluation or impact assessment gates.

---

## How to Use

```
/product-prd REQ-0003
/product-prd PRD-0003
/product-prd
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `Grilling Complete` or `Impact Assessment Complete` stage.

---

## Purpose

The PRD is the single source of truth for what is being built. It is derived from the approved grilling document and any evaluation or impact documents. User stories, development plans, and QA plans all trace back to it.

---

## When to Use

- After grilling is complete and scope is agreed (G2 gate)
- After evaluation recommendation is approved (G3 gate, if applicable)
- After impact assessment Go decision (if applicable)
- Never before grilling. Never before required approval gates are passed.

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm REQ ID and read all upstream documents (REQ, GRILLING, EVAL, IMPACT) |
| 2 | Read PRD template files |
| 3 | Read `SCREEN_REGISTRY.md`, `PRODUCT_HIERARCHY.md`, `ROLE_PERMISSION_MAP.md`, `DATA_ENTITY_MAP.md` |
| 4 | Assign next PRD ID from `MASTER_REGISTRY.md` |
| 5 | Assign Screen IDs for any new screens per `SCREEN_ID_RULES.md` |
| 6 | Write complete `PRD-NNNN.md` |
| 7 | Update `SCREEN_REGISTRY.md` with new Screen IDs |
| 8 | Update `DECISION_LOG.md` with any product decisions made |
| 9 | Update `REQUEST_REGISTER.md` and `ACTIVE_REQUESTS.md` |
| 10 | Update `MASTER_REGISTRY.md` |
| 11 | Present PRD for review and wait for approval (G4 gate) |

---

## What Claude Never Asks the User

- The PRD ID (Claude generates it)
- The Screen IDs for new screens (Claude assigns per rules)
- The module hierarchy (Claude uses what is in the grilling document)
- The next step (Claude recommends it)

---

## PRD Required Sections

Every PRD must include:

1. Header (IDs, title, date, status)
2. Summary
3. Background and motivation
4. Goals and success criteria
5. Out of scope
6. Module and feature placement
7. User roles affected
8. User flows (per role)
9. Functional requirements
10. Business rules
11. Data requirements
12. Validation rules
13. Permission matrix
14. Screens with Screen IDs
15. Non-functional requirements
16. Open questions (if any)
17. References

---

## Approval Gate

Claude must NOT begin user story writing without user explicitly approving the PRD (G4 gate).

After presenting the PRD, Claude asks:
"Do you want me to proceed to the next step?"

---

## Guardrails

- Do not change application code
- Do not write user stories during PRD writing
- Do not assign Screen IDs that conflict with existing ones in `SCREEN_REGISTRY.md`
- Do not write a PRD that contradicts the approved grilling summary
- Do not leave sections blank — use `[TBD — Reason]` if genuinely unresolved

---

## Output Files Created

| File | Path |
|---|---|
| PRD | `product/07-prd/approved-prds/PRD-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/00-product-foundation/DECISION_LOG.md`
- `product/01-product-architecture/SCREEN_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if any TBDs)

---

*Last updated: 2026-06-21*

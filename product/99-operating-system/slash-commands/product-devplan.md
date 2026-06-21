# /product-devplan — Slash Command Definition

Create a development plan from approved user stories.

---

## How to Use

```
/product-devplan PRD-0003
/product-devplan REQ-0003
/product-devplan
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `User Stories Complete` stage.

---

## Purpose

The development plan bridges product approval and engineering execution. It defines implementation order, files likely impacted, backend and frontend steps, schema changes, QA prerequisites, risks, and rollback strategy.

---

## When to Use

- After user stories are complete and reviewed
- Before the AI coding prompt is created
- Never without approved stories and PRD

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm PRD ID and read all approved stories |
| 2 | Read `DEVELOPMENT_PLAN_TEMPLATE.md`, `DEVPLAN-template.md` |
| 3 | Read `DATA_ENTITY_MAP.md`, `MODULE_DEPENDENCY_MAP.md`, `ROUTE_MAP.md` |
| 4 | Assign next DEVPLAN ID from `MASTER_REGISTRY.md` |
| 5 | Map each story to its implementation area (backend / frontend / full-stack) |
| 6 | Define implementation order (schema first, then backend, then frontend) |
| 7 | List likely files impacted |
| 8 | Document Convex mutations, queries, validators needed |
| 9 | Document frontend page, component and route changes |
| 10 | Write QA prerequisites, risk register, rollback plan |
| 11 | Write completion checklist |
| 12 | Create `DEVPLAN-NNNN.md` |
| 13 | Update `DEVELOPMENT_TRACKER.md` |
| 14 | Update `REQUEST_REGISTER.md`, `ACTIVE_REQUESTS.md`, `MASTER_REGISTRY.md` |
| 15 | Present plan for review and await approval (G5 gate) |

---

## What Claude Never Asks the User

- The DEVPLAN ID (Claude generates it)
- Which files to change (Claude derives from route map and data entity map)
- Implementation order (Claude determines: schema → backend → frontend)
- The next step (Claude recommends it)

---

## Approval Gate

Claude must NOT create the AI coding prompt without user approving the dev plan (G5 gate).

After presenting the dev plan, Claude asks:
"Do you want me to proceed to the next step?"

---

## Guardrails

- Do not change application code
- Do not create the AI coding prompt during dev planning
- Do not add requirements not in the approved PRD or stories
- Do not guess file names — describe likely files based on architecture documents
- Do not omit rollback plan for schema or payment changes
- Do not plan changes to unrelated files

---

## Output Files Created

| File | Path |
|---|---|
| Development plan | `product/09-development-planning/plans/DEVPLAN-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/10-development-tracking/DEVELOPMENT_TRACKER.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if blocked)

---

*Last updated: 2026-06-21*

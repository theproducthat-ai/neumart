# Skill 07 — Development Plan

## Skill Name
Development Plan

## Purpose
Create a complete development plan from approved user stories: identify likely files to change, define backend and frontend implementation steps, document schema changes, Convex function requirements, QA prerequisites, risks, and rollback strategy. The development plan is the bridge between product approval and the AI coding prompt.

## When to Use
- After user stories are complete and reviewed
- When invoked via `/product-devplan`
- Before any AI coding prompt is created
- Never before stories are reviewed. Never without a PRD and stories.

## Inputs Expected
- PRD ID (e.g. `PRD-0003`)
- US IDs (e.g. `US-0010`, `US-0011`, `US-0012`)
- REQ ID for traceability
- EVAL ID and IMPACT ID if applicable

## Files to Read First
1. `product/07-prd/approved-prds/PRD-NNNN.md`
2. `product/08-user-stories/stories/US-NNNN.md` (all stories for this PRD)
3. `product/09-development-planning/DEVELOPMENT_PLAN_TEMPLATE.md`
4. `product/09-development-planning/plans/DEVPLAN-template.md`
5. `product/01-product-architecture/DATA_ENTITY_MAP.md`
6. `product/01-product-architecture/MODULE_DEPENDENCY_MAP.md`
7. `product/01-product-architecture/ROUTE_MAP.md`
8. `product/01-product-architecture/SCREEN_REGISTRY.md`
9. `product/10-development-tracking/DEVELOPMENT_TRACKER.md`
10. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- Development plan documents use ID: `DEVPLAN-NNNN`
- Read `MASTER_REGISTRY.md` to get the next DEVPLAN ID
- Format: `DEVPLAN-NNNN` (4-digit zero-padded)
- One DEVPLAN per PRD / request track
- Link REQ ID, PRD ID, GRILLING ID, EVAL ID, IMPACT ID, and all US IDs in the DEVPLAN header

## Reference Material Handling
- All requirements come from approved PRD and user stories
- Do not add new requirements in the dev plan
- Do not re-open product decisions in the dev plan — that requires a PRD amendment

## Natural-Language Classification Rules
Not applicable. Dev planning is technical, not classification.

## Module Hierarchy Mapping
- State module, sub-module, feature as defined in PRD
- Map each story to its implementation area: backend only, frontend only, or full-stack

## Screen ID Handling
- Reference all Screen IDs from the user stories
- Note any screen that requires new routes — reference `ROUTE_MAP.md`
- Do not assign Screen IDs in the dev plan — use those already in the stories

## Request Status Handling
- Update status to `Dev Planning In Progress` when DEVPLAN is created
- Update to `Dev Plan Complete` when the plan is ready for coding prompt
- Gate: dev plan must be reviewed before coding prompt is created (G5 gate per `APPROVAL_GATES.md`)

## Incomplete Request Tracking
- If any user story is missing information needed for planning, flag it as a blocker
- Update `INCOMPLETE_WORK_TRACKER.md` with the specific story and missing info
- Do not create a partial dev plan for partial stories

## Output Files to Create
| File | Path |
|---|---|
| Development plan | `product/09-development-planning/plans/DEVPLAN-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | DEVPLAN row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status, add DEVPLAN ID |
| `ACTIVE_REQUESTS.md` | Update stage, next step, DEVPLAN ID |
| `DEVELOPMENT_TRACKER.md` | Add entry for this dev plan |
| `INCOMPLETE_WORK_TRACKER.md` | Add if dev plan is blocked or incomplete |

## Stop Condition
Stop after presenting the development plan. Do not create the coding prompt until the user approves the dev plan (G5 gate).

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not change application code
- Do not create the AI coding prompt during dev plan writing
- Do not add product requirements not in the approved PRD
- Do not guess file names — describe likely files based on route map, data entity map, and project structure
- Do not omit rollback plan for schema or payment changes
- Do not plan changes to files not related to the approved scope

## Definition of Done
- [ ] All user stories reviewed and mapped to implementation steps
- [ ] Backend plan documented (Convex functions, mutations, queries, validators)
- [ ] Frontend plan documented (pages, components, state, routes)
- [ ] Schema changes documented (new tables, columns, indexes, migrations)
- [ ] Likely files impacted listed
- [ ] Implementation order defined
- [ ] QA prerequisites listed
- [ ] Risk register written
- [ ] Rollback plan written
- [ ] `DEVPLAN-NNNN.md` created in `product/09-development-planning/plans/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `Dev Plan Complete`
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] `DEVELOPMENT_TRACKER.md` updated
- [ ] User reviewed the dev plan before coding prompt is created

---

## Development Plan Required Sections

| Section | Content |
|---|---|
| Header | DEVPLAN ID, REQ ID, PRD ID, US IDs, EVAL ID, IMPACT ID, date, status |
| Summary | What is being built and why |
| Implementation order | Ordered list of steps: schema first, then backend, then frontend |
| Schema changes | Tables, columns, indexes, validators, migrations |
| Backend — Convex | Mutations, queries, validators, scheduled jobs |
| Frontend — Customer | Pages, components, hooks, state, routes affected |
| Frontend — Admin | Admin pages, tables, forms affected |
| Files likely impacted | File paths derived from route map and data entity map |
| QA prerequisites | What must be true before QA can run |
| Risk register | Known risks with mitigation |
| Rollback plan | Steps to revert if release fails |
| Completion checklist | What the developer must confirm before declaring done |

---

*Last updated: 2026-06-21*

# Skill 03 — Module Mapping and Evaluation

## Skill Name
Module Mapping and Evaluation

## Purpose
Evaluate whether a grilled request represents a new module, an extension of an existing module, a roadmap candidate, a request to be split, or one to be parked or rejected. Create an EVAL document and update the roadmap evaluation board.

## When to Use
- After grilling is complete and user has signed off on scope (G2 gate passed)
- When invoked via `/product-evaluate`
- For complex requests that span multiple modules or propose significant new capability
- Automatically triggered when the classification at intake was: New Module Candidate, New Sub-module, Cross-module Feature, Integration Request, or Roadmap Evaluation Item

## Inputs Expected
- REQ ID (e.g. `REQ-0003`)
- GRILLING ID (e.g. `GRILLING-0003`)
- Grilled request document
- User's sign-off on scope (G2 gate)

## Files to Read First
1. `product/04-request-management/requests/REQ-NNNN.md`
2. `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md`
3. `product/03-module-catalogue/MODULE_MASTER.md`
4. `product/01-product-architecture/PRODUCT_HIERARCHY.md`
5. `product/02-roadmap/PRODUCT_ROADMAP.md`
6. `product/02-roadmap/NOW_NEXT_LATER.md`
7. `product/02-roadmap/MODULE_EVALUATION_BOARD.md`
8. `product/02-roadmap/evaluations/EVAL-template.md`
9. `product/00-product-foundation/MVP_SCOPE.md`
10. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- Evaluation documents use ID: `EVAL-NNNN`
- Read `MASTER_REGISTRY.md` to get the next EVAL ID
- Format: `EVAL-NNNN` (4-digit zero-padded)
- One EVAL document per evaluation session
- A single REQ may produce multiple EVALs if split into separate tracks

## Reference Material Handling
- Reference material already captured in REQ and GRILLING files
- Do not re-ask for reference material
- Use module catalogue documents as the authoritative source for what already exists

## Natural-Language Classification Rules
Not applicable. Request is already classified. This skill evaluates roadmap fit, not classification.

## Module Hierarchy Mapping
- Map the request against existing module structure in `MODULE_MASTER.md`
- Identify: Does the request fit inside an existing module? Does it need a new sub-module? Does it need a new top-level module?
- Use `PRODUCT_HIERARCHY.md` to validate the hierarchy position
- Recommend one of:
  - **Fits in existing module** — route to PRD under that module
  - **New sub-module needed** — propose sub-module, route to PRD
  - **New module candidate** — propose module, create evaluation, route to roadmap discussion
  - **Split required** — split into two or more REQ IDs
  - **Roadmap item** — park in NOW/NEXT/LATER roadmap
  - **Rejected** — explain reason

## Screen ID Handling
- List all screens identified in grilling that are affected
- Flag any new screens that would be required if approved
- Do not assign new Screen IDs during evaluation — that happens at PRD

## Request Status Handling
- Update status in `REQUEST_REGISTER.md` to `Under Evaluation` when EVAL is created
- Update to `Evaluation Complete` when EVAL is done and recommendation is made
- Gate: do not proceed to PRD until user approves the evaluation recommendation (G3 gate per `APPROVAL_GATES.md`)

## Incomplete Request Tracking
- If evaluation cannot be completed due to missing information, record in `INCOMPLETE_WORK_TRACKER.md`
- Flag specific missing information needed to complete evaluation

## Output Files to Create
| File | Path |
|---|---|
| Evaluation document | `product/02-roadmap/evaluations/EVAL-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | EVAL row: Last Used ID, Next ID |
| `MODULE_EVALUATION_BOARD.md` | Add evaluation entry with REQ ID, EVAL ID, recommendation, status |
| `REQUEST_REGISTER.md` | Update status, add EVAL ID |
| `ACTIVE_REQUESTS.md` | Update stage, next step, EVAL ID |
| `INCOMPLETE_WORK_TRACKER.md` | Add if evaluation is blocked |

## Stop Condition
Stop after presenting the evaluation recommendation and waiting for user approval (G3 gate). Do not proceed to impact assessment or PRD without explicit user approval.

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not write a PRD during evaluation
- Do not change application code
- Do not reject a request without explanation
- Do not mark an evaluation as approved without user confirmation
- Do not create a new module in the module catalogue without user approval
- Do not skip evaluation for cross-module or complex requests

## Definition of Done
- [ ] Existing module structure reviewed against the request
- [ ] Module hierarchy position determined
- [ ] Recommendation made: Fits Existing / New Sub-module / New Module / Split / Roadmap / Reject
- [ ] `EVAL-NNNN.md` created in `product/02-roadmap/evaluations/`
- [ ] `MODULE_EVALUATION_BOARD.md` updated
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `Evaluation Complete`
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] User approved evaluation recommendation (G3 gate)

---

## Evaluation Recommendation Framework

| Recommendation | When to Use |
|---|---|
| Fits in existing module | Request maps directly to an existing sub-module or feature |
| New sub-module required | Request fits within an existing module but needs a new grouping |
| New module candidate | Request is broad, independent, and doesn't fit any existing module |
| Split required | Request contains two or more distinct concerns that should be tracked separately |
| Roadmap candidate | Request is valid but not for current sprint — place in NOW/NEXT/LATER |
| Park | Request needs more information or has dependencies not yet met |
| Reject | Request is out of scope, duplicate, or conflicts with product direction |

---

*Last updated: 2026-06-21*

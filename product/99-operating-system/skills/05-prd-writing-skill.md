# Skill 05 — PRD Writing

## Skill Name
PRD Writing

## Purpose
Write a complete, implementation-ready Product Requirements Document (PRD) for a request that has passed grilling and any required evaluation or impact assessment gates. The PRD is the single source of truth for user stories, development planning, and QA.

## When to Use
- After grilling is complete (G2 gate passed)
- After evaluation recommendation has been approved (G3 gate passed, if applicable)
- After impact assessment Go decision (if applicable)
- When invoked via `/product-prd`
- Never before grilling is done. Never before required approval gates are passed.

## Inputs Expected
- REQ ID (e.g. `REQ-0003`)
- Approved grilling document (GRILLING-NNNN.md)
- Approved evaluation document (EVAL-NNNN.md, if applicable)
- Approved impact assessment (IMPACT-NNNN.md, if applicable)

## Files to Read First
1. `product/04-request-management/requests/REQ-NNNN.md`
2. `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md`
3. `product/02-roadmap/evaluations/EVAL-NNNN.md` (if exists)
4. `product/06-assessment-and-impact/assessments/IMPACT-NNNN.md` (if exists)
5. `product/07-prd/PRD_TEMPLATE.md`
6. `product/07-prd/approved-prds/PRD-template.md`
7. `product/01-product-architecture/SCREEN_REGISTRY.md`
8. `product/01-product-architecture/PRODUCT_HIERARCHY.md`
9. `product/01-product-architecture/ROLE_PERMISSION_MAP.md`
10. `product/01-product-architecture/DATA_ENTITY_MAP.md`
11. `product/00-product-foundation/MASTER_REGISTRY.md`
12. `product/00-product-foundation/DECISION_LOG.md`

## Auto-ID Rules
- PRD documents use ID: `PRD-NNNN`
- Read `MASTER_REGISTRY.md` to get the next PRD ID
- Format: `PRD-NNNN` (4-digit zero-padded)
- One PRD per approved request (or per split track)
- Link REQ ID, GRILLING ID, EVAL ID, and IMPACT ID in the PRD header

## Reference Material Handling
- Reference material captured in REQ and GRILLING files should be cited in the PRD where relevant
- Do not use reference material as a substitute for product decisions — all decisions must be explicit in the PRD
- List reference material in a References section at the end of the PRD

## Natural-Language Classification Rules
Not applicable. PRD is written based on confirmed scope, not classification.

## Module Hierarchy Mapping
- State clearly in the PRD: Module, Sub-module, Feature
- Use exact names from `MODULE_MASTER.md` and `PRODUCT_HIERARCHY.md`
- List all secondary modules impacted

## Screen ID Handling
- Assign Screen IDs for new screens following `SCREEN_ID_RULES.md`
- List all existing Screen IDs affected
- Update `SCREEN_REGISTRY.md` with any new Screen IDs assigned during PRD
- Every user-facing screen must have a Screen ID

## Request Status Handling
- Update status to `PRD In Progress` when PRD writing begins
- Update to `PRD Complete — Awaiting Approval` when first draft is done
- Gate: do not begin user stories until user approves PRD (G4 gate per `APPROVAL_GATES.md`)
- Update to `PRD Approved` when user approves

## Incomplete Request Tracking
- If PRD cannot be completed due to unresolved questions from grilling, mark those sections `[TBD — Reason]`
- Update `INCOMPLETE_WORK_TRACKER.md` if the PRD has material gaps
- Do not write placeholder PRDs — a PRD must be complete enough to generate user stories

## Output Files to Create
| File | Path |
|---|---|
| PRD document | `product/07-prd/approved-prds/PRD-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | PRD row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status, add PRD ID |
| `ACTIVE_REQUESTS.md` | Update stage, next step, PRD ID |
| `SCREEN_REGISTRY.md` | Add any new Screen IDs assigned in the PRD |
| `DECISION_LOG.md` | Log any product decisions made during PRD writing |
| `INCOMPLETE_WORK_TRACKER.md` | Add if PRD has unresolved sections |

## Stop Condition
Stop after presenting the PRD for review. Do not begin user stories until the user explicitly approves the PRD (G4 gate).

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not change application code
- Do not write user stories during PRD writing
- Do not write a development plan during PRD writing
- Do not write a coding prompt during PRD writing
- Do not assign Screen IDs that conflict with existing ones in `SCREEN_REGISTRY.md`
- Do not leave scope undefined — every section must have a clear answer or a documented `[TBD]`
- Do not write a PRD that contradicts the approved grilling summary

## Definition of Done
- [ ] All grilling answers incorporated into the PRD
- [ ] Functional requirements documented
- [ ] Non-functional requirements documented
- [ ] User flows documented for all roles
- [ ] Business rules listed
- [ ] Data requirements listed
- [ ] Validation rules listed
- [ ] Error states documented
- [ ] Permissions documented per role
- [ ] Screen IDs assigned for all new screens
- [ ] Existing Screen IDs listed for affected screens
- [ ] Out of scope section clearly written
- [ ] Open questions section (if any)
- [ ] `PRD-NNNN.md` created in `product/07-prd/approved-prds/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `SCREEN_REGISTRY.md` updated with new Screen IDs
- [ ] `REQUEST_REGISTER.md` status updated
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] `DECISION_LOG.md` updated
- [ ] User approved the PRD (G4 gate) before user stories begin

---

## PRD Required Sections

| Section | Content |
|---|---|
| Header | PRD ID, REQ ID, GRILLING ID, EVAL ID, IMPACT ID, title, author, date, status |
| Summary | One paragraph: what this feature does and why |
| Background | Context, business need, problem being solved |
| Goals | Measurable goals or success criteria |
| Non-goals (Out of scope) | What this PRD explicitly does NOT cover |
| Module / Feature placement | Module, Sub-module, Feature per `PRODUCT_HIERARCHY.md` |
| User roles | Roles affected: Customer, Admin, Rider, System |
| User flows | Step-by-step flows per role |
| Functional requirements | Numbered list of all requirements |
| Business rules | All rules, constraints, limits, triggers |
| Data requirements | Entities, fields, relationships, data types |
| Validation rules | Valid/invalid states, error messages |
| Permission matrix | Who can do what per role |
| Screens | List of all screens with Screen IDs |
| Non-functional requirements | Performance, security, scalability |
| Open questions | Any unresolved questions, owner and due date |
| References | REQ file, grilling file, reference material links |

---

*Last updated: 2026-06-21*

# Skill 04 — Impact Assessment

## Skill Name
Impact Assessment

## Purpose
Conduct a structured multi-dimensional impact assessment for requests that involve schema changes, payment flows, inventory operations, cross-module dependencies, security implications, or other high-risk changes. Produce an IMPACT document and recommend Go / No-Go / Split / Park / Reject.

## When to Use
- After grilling and evaluation are complete (or skipped for simple requests)
- When invoked via `/product-impact`
- Mandatory for requests classified as: Schema Change, Payment/Finance Impact, Inventory Impact, Cross-module Feature, Integration Request, Security/Compliance, Data Migration, or any request where evaluation flagged high risk
- Recommended for any request touching more than 3 files or 2 modules

## Inputs Expected
- REQ ID (e.g. `REQ-0003`)
- GRILLING ID if applicable
- EVAL ID if applicable
- Grilled request document and evaluation recommendation

## Files to Read First
1. `product/04-request-management/requests/REQ-NNNN.md`
2. `product/05-discovery-and-grilling/grilled-requests/GRILLING-NNNN.md`
3. `product/02-roadmap/evaluations/EVAL-NNNN.md` (if exists)
4. `product/06-assessment-and-impact/IMPACT_ASSESSMENT_TEMPLATE.md`
5. `product/06-assessment-and-impact/assessments/IMPACT-template.md`
6. `product/01-product-architecture/DATA_ENTITY_MAP.md`
7. `product/01-product-architecture/MODULE_DEPENDENCY_MAP.md`
8. `product/01-product-architecture/ROLE_PERMISSION_MAP.md`
9. `product/01-product-architecture/SCREEN_REGISTRY.md`
10. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- Impact assessment documents use ID: `IMPACT-NNNN`
- Read `MASTER_REGISTRY.md` to get the next IMPACT ID
- Format: `IMPACT-NNNN` (4-digit zero-padded)
- One IMPACT document per assessment session

## Reference Material Handling
- Use reference material already captured in REQ and GRILLING files
- Do not re-request reference material already provided
- Use `DATA_ENTITY_MAP.md` and `MODULE_DEPENDENCY_MAP.md` as authoritative technical references

## Natural-Language Classification Rules
Not applicable. Assessment follows from classification already done. This skill assesses risk, not classification.

## Module Hierarchy Mapping
- Identify all modules, sub-modules, and features affected by the request
- Use `MODULE_DEPENDENCY_MAP.md` to trace downstream impact
- List primary impacted module and all secondary modules

## Screen ID Handling
- List all screen IDs affected by this request
- Note whether existing screens require modification or new screens are needed
- Do not assign new Screen IDs — that happens at PRD

## Request Status Handling
- Update status to `Impact Assessment In Progress` when IMPACT is created
- Update to `Impact Assessment Complete` when recommendation is made
- Gate: do not proceed to PRD without user Go decision (G3 gate per `APPROVAL_GATES.md`)
- If No-Go: update status to `Rejected` or `Parked` as appropriate

## Incomplete Request Tracking
- If assessment cannot be completed due to missing technical information, record in `INCOMPLETE_WORK_TRACKER.md`
- Document specific blockers: missing schema details, unclear data ownership, unresolved dependencies

## Output Files to Create
| File | Path |
|---|---|
| Impact assessment document | `product/06-assessment-and-impact/assessments/IMPACT-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | IMPACT row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status, add IMPACT ID |
| `ACTIVE_REQUESTS.md` | Update stage, next step, IMPACT ID |
| `DECISION_LOG.md` | Log Go/No-Go decision with rationale |
| `INCOMPLETE_WORK_TRACKER.md` | Add if assessment is blocked |

## Stop Condition
Stop after presenting the Go / No-Go / Split / Park / Reject recommendation. Do not begin PRD writing until the user explicitly approves.

Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not change application code
- Do not write the PRD during impact assessment
- Do not recommend Go if schema changes are unresolved
- Do not recommend Go if payment flow risk is unresolved
- Do not skip rollback plan for schema or data migration changes
- Do not present a recommendation without assessing all required impact dimensions

## Definition of Done
- [ ] All applicable impact dimensions assessed (see list below)
- [ ] Go / No-Go / Split / Park / Reject recommendation made with rationale
- [ ] `IMPACT-NNNN.md` created in `product/06-assessment-and-impact/assessments/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `Impact Assessment Complete`
- [ ] `ACTIVE_REQUESTS.md` updated
- [ ] `DECISION_LOG.md` updated with Go/No-Go decision
- [ ] User approved the Go decision before PRD is started

---

## Required Impact Dimensions

Assess each applicable dimension:

| Dimension | What to Assess |
|---|---|
| Business impact | Revenue, operations, customer trust, competitive positioning |
| Customer experience | Customer-facing changes, UX impact, potential friction |
| Admin experience | Admin-facing changes, workflow changes, training needed |
| Operations impact | Fulfilment, warehouse, delivery team impact |
| Technical impact | Architecture changes, performance risk, infrastructure |
| Schema impact | New tables, columns, indexes, migrations needed |
| Backend impact | New Convex functions, mutations, queries, validators |
| Frontend impact | New or modified pages, components, state management |
| Screen impact | Affected screen IDs, new screens required |
| Role / permission impact | New permissions, role changes, access control |
| Payment impact | Payment flows, refund logic, financial data integrity |
| Inventory impact | Stock operations, reservations, reconciliation |
| Reporting impact | New metrics, events, reports needed |
| Integration impact | External APIs, webhooks, third-party services |
| Security impact | Auth changes, data exposure risk, PII handling |
| Compliance impact | Legal, regulatory, data retention |
| QA impact | Test complexity, regression risk, new test categories |
| UAT impact | UAT scenarios, sign-off requirements |
| Release impact | Deployment steps, migration scripts, feature flags |
| Rollback plan | How to revert if the release fails |

---

*Last updated: 2026-06-21*

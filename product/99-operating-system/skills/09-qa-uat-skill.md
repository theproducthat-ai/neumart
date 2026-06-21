# Skill 09 — QA and UAT

## Skill Name
QA and UAT

## Purpose
Create a structured QA test plan and UAT plan for a feature that has been developed. QA covers functional correctness, edge cases, regression, and defects. UAT covers business acceptance and stakeholder sign-off.

## When to Use
- After development is complete and the developer has returned the completion report
- When invoked via `/product-qa`
- Before release planning begins
- Cannot run QA without a development completion report

## Inputs Expected
- DEVPLAN ID (e.g. `DEVPLAN-0003`)
- PRD ID and US IDs
- Developer's completion report (from coding prompt)
- REQ ID for traceability

## Files to Read First
1. `product/07-prd/approved-prds/PRD-NNNN.md`
2. `product/08-user-stories/stories/US-NNNN.md` (all stories)
3. `product/09-development-planning/plans/DEVPLAN-NNNN.md`
4. `product/11-qa-testing/QA_TEST_PLAN_TEMPLATE.md`
5. `product/11-qa-testing/test-runs/QA-template.md`
6. `product/11-qa-testing/REGRESSION_TEST_CHECKLIST.md`
7. `product/12-uat/UAT_PLAN_TEMPLATE.md`
8. `product/12-uat/UAT_SIGNOFF_TEMPLATE.md`
9. `product/12-uat/uat-runs/UAT-template.md`
10. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- QA test run documents use ID: `QA-NNNN`
- UAT run documents use ID: `UAT-NNNN`
- Read `MASTER_REGISTRY.md` to get next IDs for each
- Format: `QA-NNNN` and `UAT-NNNN` (4-digit zero-padded)
- Link REQ ID, PRD ID, DEVPLAN ID, and all US IDs in headers

## Reference Material Handling
- Test cases derived from user story acceptance criteria
- Do not invent test cases not grounded in accepted requirements
- Reference the developer's completion report for files changed

## Natural-Language Classification Rules
Not applicable. QA/UAT is based on accepted stories, not classification.

## Module Hierarchy Mapping
- Reference module and sub-module from PRD
- Organize test cases by module area if multiple modules are involved

## Screen ID Handling
- Reference Screen IDs from user stories in QA test cases
- Each test case that involves a screen should reference the Screen ID
- Flag any screen that was added during development but not in the Screen Registry

## Request Status Handling
- Update status to `QA In Progress` when QA plan is active
- Update to `QA Complete` when all test cases are executed and defects are documented
- Update to `UAT In Progress` when UAT is underway
- Update to `UAT Complete / Pending Release` when UAT sign-off is obtained
- Gate: do not release without UAT sign-off (G6 gate per `APPROVAL_GATES.md`)

## Incomplete Request Tracking
- If any test case cannot be executed due to environment or data issues, log in `BUG_REGISTER.md` as a blocker
- Update `INCOMPLETE_WORK_TRACKER.md` if QA cannot proceed
- Do not proceed to release with open critical or high defects

## Output Files to Create
| File | Path |
|---|---|
| QA test plan and run | `product/11-qa-testing/test-runs/QA-NNNN.md` |
| UAT plan and run | `product/12-uat/uat-runs/UAT-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | QA and UAT rows: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status, add QA ID and UAT ID |
| `ACTIVE_REQUESTS.md` | Update stage, next step |
| `BUG_REGISTER.md` | Log any defects found during QA |
| `UAT_FEEDBACK_REGISTER.md` | Log UAT feedback |
| `INCOMPLETE_WORK_TRACKER.md` | Add if QA/UAT cannot complete |

## Stop Condition
Stop after QA test run is documented and before UAT begins. Present QA results to user. If defects exist, development must fix them before UAT.

After UAT sign-off, stop before release. Ask: "Do you want me to proceed to the next step?"

## Guardrails
- Do not change application code during QA
- Do not release with open critical defects
- Do not skip regression testing
- Do not conduct UAT without QA passing
- Do not sign off UAT on behalf of the product owner — UAT sign-off requires explicit user confirmation
- Do not create a release plan before UAT sign-off

## Definition of Done
- [ ] QA test plan created with all test cases from user story acceptance criteria
- [ ] Regression test checklist run
- [ ] All test cases executed and results recorded
- [ ] Defects logged in `BUG_REGISTER.md` with severity
- [ ] Defects resolved or deferred with documented decision
- [ ] QA sign-off confirmed before UAT begins
- [ ] UAT plan created with business acceptance scenarios
- [ ] UAT run completed and feedback recorded
- [ ] UAT sign-off obtained (G6 gate)
- [ ] `QA-NNNN.md` created in `product/11-qa-testing/test-runs/`
- [ ] `UAT-NNNN.md` created in `product/12-uat/uat-runs/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] `REQUEST_REGISTER.md` status updated to `UAT Complete / Pending Release`
- [ ] `ACTIVE_REQUESTS.md` updated

---

## QA Test Case Structure

Each test case must include:

| Field | Content |
|---|---|
| Test case ID | TC-NNNN |
| Story ID | US-NNNN |
| Screen ID | Screen ID from registry |
| Test type | Functional / Regression / Edge case / Error handling |
| Steps | Numbered step-by-step instructions |
| Expected result | What should happen |
| Actual result | What actually happened (filled during execution) |
| Status | Pass / Fail / Blocked |
| Defect ID | `BUG-NNNN` if applicable |

---

## UAT Acceptance Criteria

UAT sign-off requires:
- All must-have user stories pass
- No critical or high defects open
- Business owner confirms the feature meets the original business need
- Release candidate tested in staging environment (not production)

---

*Last updated: 2026-06-21*

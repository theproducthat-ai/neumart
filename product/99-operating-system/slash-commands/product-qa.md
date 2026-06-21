# /product-qa — Slash Command Definition

Create QA and UAT plans for a developed feature.

---

## How to Use

```
/product-qa DEVPLAN-0003
/product-qa REQ-0003
/product-qa
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `In Development` or `Dev Complete` stage.

---

## Purpose

QA verifies that the implemented feature matches the accepted requirements. UAT confirms the business owner accepts the feature as meeting the original business need. Both are required before release.

---

## When to Use

- After development is complete and the developer has submitted the completion report
- Before release planning
- Cannot run without development completion evidence

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm DEVPLAN ID and read the completion report, PRD, and all stories |
| 2 | Read `QA_TEST_PLAN_TEMPLATE.md`, `QA-template.md`, `REGRESSION_TEST_CHECKLIST.md` |
| 3 | Read `UAT_PLAN_TEMPLATE.md`, `UAT-template.md`, `UAT_SIGNOFF_TEMPLATE.md` |
| 4 | Assign next QA ID from `MASTER_REGISTRY.md` |
| 5 | Write QA test plan: derive test cases from acceptance criteria in user stories |
| 6 | Include regression test checklist |
| 7 | Create `QA-NNNN.md` |
| 8 | Present QA test plan and request results from user |
| 9 | Record any defects in `BUG_REGISTER.md` |
| 10 | When QA passes: assign next UAT ID |
| 11 | Write UAT plan with business acceptance scenarios |
| 12 | Create `UAT-NNNN.md` |
| 13 | Present UAT plan and await sign-off (G6 gate) |
| 14 | Update all registers |

---

## What Claude Never Asks the User

- QA ID or UAT ID (Claude generates them)
- Which test cases to create (Claude derives from story acceptance criteria)
- Whether regression is needed (always yes)
- The next step (Claude recommends: release)

---

## Approval Gate

Claude must NOT proceed to release planning without explicit UAT sign-off from the user (G6 gate).

After UAT sign-off is confirmed, Claude asks:
"Do you want me to proceed to the next step?"

---

## Defect Handling

If defects are found during QA:
- Log in `BUG_REGISTER.md` with severity (Critical / High / Medium / Low)
- Critical and High defects must be fixed before UAT
- Medium and Low defects may be deferred with documented decision
- Do not proceed to UAT with open Critical or High defects

---

## Guardrails

- Do not change application code during QA
- Do not release with open Critical or High defects
- Do not skip regression testing
- Do not conduct UAT without QA passing
- Do not sign off UAT on behalf of the product owner — that requires explicit user confirmation
- Do not create a release plan before UAT sign-off

---

## Output Files Created

| File | Path |
|---|---|
| QA test plan and run | `product/11-qa-testing/test-runs/QA-NNNN.md` |
| UAT plan and run | `product/12-uat/uat-runs/UAT-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md`
- `product/04-request-management/ACTIVE_REQUESTS.md`
- `product/11-qa-testing/BUG_REGISTER.md`
- `product/12-uat/UAT_FEEDBACK_REGISTER.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if QA is blocked)

---

*Last updated: 2026-06-21*

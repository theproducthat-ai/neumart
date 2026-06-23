# Nuemart Product OS — Product QA Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-qa`

---

## Purpose
Create the test plan, execute or guide a QA run, log bugs found, and produce a QA run report. QA is the final gate before UAT. The interface ensures complete test coverage of all user stories and acceptance criteria, and produces a traceable record of quality for the release.

---

## Triggered By
- User types `/product-qa <FEATURE-ID>` or `/product-qa <PRD-ID>`.
- Developer or QA engineer signals that development is complete and ready for testing.
- Automatically recommended by `/product-devplan` at the end of the dev plan.

---

## Pre-conditions
- Development must be complete (all stories in `Done` or `Review` status).
- All User Story Objects must exist with their acceptance criteria.
- PRD Object should be in `Approved` status.
- QA engineer (or AI acting as QA) must have access to the test environment.

---

## Inputs
- Feature Object ID or PRD Object ID
- Optional: known edge cases or scenarios to prioritize
- Optional: regression areas to specifically check
- Optional: bug report from development (anything found during build)

---

## AI Reasoning Steps

1. **Load all stories and acceptance criteria.** Read every User Story Object linked to the feature. Collect all acceptance criteria from all stories.

2. **Create the Test Plan Object.** Define scope, objectives, test types to be run, environment, and out-of-scope testing for this QA cycle.

3. **Generate Test Cases.** For each acceptance criterion, create at minimum:
   - One Happy Path test case
   - One Error Path test case (invalid input, missing data, unauthorized access)
   - One Edge Case test case (boundary conditions, empty states, maximum values)
   For high-risk acceptance criteria: add Regression test cases and Mobile test cases.

4. **Sequence test execution.** Order test cases to mirror the user journey and story sequence. Run foundation tests (data setup, auth) before feature tests.

5. **Execute or guide test run.** For each test case:
   - State the preconditions
   - List the steps
   - State the expected result
   - Record the actual result
   - Mark: Pass / Fail / Skip

6. **Log bugs.** For each test case that fails: create a Bug Object with full details (steps to reproduce, expected vs actual, severity, environment).

7. **Perform regression check.** For each area flagged as regression risk in the Impact Assessment: run at least one regression test case. Record result.

8. **Calculate test summary statistics.** Total / Passed / Failed / Skipped. Bug count by severity.

9. **Determine overall QA result.**
   - Passed: all must-have test cases pass, zero Critical/High bugs open
   - Failed: any Critical bug open, or more than 20% of must-have tests failing
   - Conditionally Passed: medium/low bugs only, all Critical/High resolved, product owner acknowledgment

10. **Create the QA Run Object.** Record all test results, bug links, regression status, and final result.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Test Plan Object | `product/objects/test-plans/` | Created |
| Test Case Objects | `product/objects/test-cases/` | Created (one per test case) |
| QA Run Object | `product/objects/qa-runs/` | Created |
| Bug Objects | `product/objects/bugs/` | Created (one per bug found) |
| Regression Coverage links | Embedded in QA Run | Created |
| User Story Objects | `product/objects/stories/` | Updated with test_case_refs |

---

## Required Relationships Established

- `Test Plan → tests → Feature Object`
- `Test Case → validates → Acceptance Criterion`
- `Test Case → tests → User Story`
- `QA Run → executes → Test Plan`
- `Bug → found_in → QA Run`
- `Bug → found_in_test_case → Test Case`
- `QA Run → covers → Feature Object`

---

## Required Metadata Populated

On the QA Run Object:
- `qa_run_id` — semantic ID
- `linked_feature` — Feature Object ID
- `linked_test_plan` — Test Plan Object ID
- `test_cases_total` — count
- `test_cases_passed` — count
- `test_cases_failed` — count
- `test_cases_skipped` — count
- `overall_result` — Passed / Failed / Conditionally Passed
- `bugs_found` — list of Bug Object IDs
- `regression_verified` — boolean
- `qa_date` — date of run

On each Bug Object:
- `severity` — Critical / High / Medium / Low
- `bug_type` — Functional / UI / Performance / Security / Data / Regression
- `found_in_qa_run` — QA Run ID
- `steps_to_reproduce` — numbered list
- `expected_behavior` — what should happen
- `actual_behavior` — what actually happened
- `fix_status` — Open

---

## Definition of Done

- [ ] Test Plan Object created covering all stories and acceptance criteria
- [ ] Minimum test coverage: 1 Happy Path + 1 Error Path per story (minimum)
- [ ] All regression risk areas have at least one regression test case
- [ ] Test cases executed and results recorded (Pass/Fail/Skip)
- [ ] All failing tests have Bug Objects with full details
- [ ] Overall QA result determined (Passed / Failed / Conditionally Passed)
- [ ] QA Run Object written to `product/objects/qa-runs/`
- [ ] All User Story Objects updated with test_case_refs
- [ ] Next action stated

---

## Output Format

```
QA RUN COMPLETE
===============
QA Run ID:        [QARUN-...]
Feature:          [FEATURE-...]
Test Plan:        [TESTPLAN-...]
Date:             [YYYY-MM-DD]

TEST SUMMARY:
  Total:      {n}
  Passed:     {n}   ({pct}%)
  Failed:     {n}   ({pct}%)
  Skipped:    {n}   ({pct}%)

TEST RESULTS:
Story           | Test Case                     | Type        | Result
US-XXXX         | [test name]                   | Happy Path  | PASS
US-XXXX         | [test name]                   | Error Path  | FAIL → BUG-XXXX
US-XXXX         | [test name]                   | Edge Case   | PASS
...

BUGS FOUND ({n} total):
  Critical: {n}
  High:     {n}
  Medium:   {n}
  Low:      {n}

  [BUG-XXXX] — [summary] — Severity: [Critical/High/Medium/Low]
    Steps: [brief]
    Expected: [expected]
    Actual:   [actual]

REGRESSION CHECK:
  Areas checked: {n}
  Regression issues found: [YES — details | NONE]

OVERALL RESULT: [PASSED | FAILED | CONDITIONALLY PASSED]
Rationale: [1–2 sentences]

CONDITIONS (if Conditionally Passed):
- [condition 1 — must be met before UAT]
- [condition 2]

NEXT ACTION:
→ [/product-uat to proceed | Fix Critical bugs first, then re-run QA]

Files written:
- product/objects/test-plans/{slug}.md
- product/objects/test-cases/{slug}.md × {n}
- product/objects/qa-runs/{slug}.md
- product/objects/bugs/{slug}.md × {n} (if any)
```

---

## Next Action Recommendation

| Result | Recommended Next Command |
|---|---|
| Passed | `/product-uat` |
| Conditionally Passed | Fix conditions, verify fixes, then `/product-uat` |
| Failed | Fix critical bugs, run partial re-test, then re-evaluate |

---

## Failure Conditions

- **Stories not in Done status:** AI warns and asks if development is truly complete. Notes risks of testing incomplete work.
- **No acceptance criteria on stories:** AI generates likely test cases from story description and notes that formal criteria are missing.
- **Test environment unavailable:** AI can generate the Test Plan and Test Cases but cannot execute. Notes this and asks for environment status.
- **Bug found that blocks all further testing:** AI logs the blocking bug, halts the run, marks as Failed, and recommends immediate fix.

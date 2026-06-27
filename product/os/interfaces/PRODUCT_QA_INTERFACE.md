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

1a. **For Lane 1 Bug Objects — check fix_status gate.**
    Before generating any status update output, read the source Bug Object's `fix_status` from its YAML frontmatter.
    - If `fix_status` is `Fixed`, `Merged`, or `Ready for QA`: gate is cleared — proceed normally.
    - If `fix_status` is any other value (Open, In Progress, etc.): gate is NOT cleared.
      - In dry-run mode: generate the smoke check preview, but output STATUS UPDATE DEFERRED block.
        Do NOT include fix_status → Resolved, BUG_INDEX update, or workspace Open Bugs → Resolved
        in the ARTIFACTS — WOULD UPDATE section. Move them to STATUS UPDATE DEFERRED.
      - In live mode: warn and ask for confirmation before proceeding. Note the risk.

1b. **For dry-run mode — artifact preview only.**
    If `--dry-run` is present, QA runs in preview mode. Complete all reasoning (lane detection,
    artifact requirements, prerequisite gates, test case generation) but produce ONLY a preview
    of what would be created. Never simulate test execution.

    In dry-run mode:
    - Generate test cases with titles, preconditions, steps, and expected results (for tester planning).
    - Set `execution_status: Not executed` on all test cases and the QA Run.
    - Set `overall_result: Not executed — preview only`.
    - Set `pass_count / fail_count / skipped_count: Not executed` (not numeric values).
    - DO NOT predict pass/fail per test case.
    - DO NOT produce a `PREDICTED TEST SUMMARY` or `PREDICTED OVERALL RESULT` section.
    - DO NOT update source object status or any dependent object status.
    - Artifact count in `ARTIFACTS — WOULD CREATE` must equal:
      `test_plan_count + test_case_count + qa_run_count + bug_count`
      (omit the count from the heading rather than show a wrong number).
    - Source ID discipline: `ARTIFACTS — WOULD UPDATE` references only the source object being tested.
      Dependent objects appear only in `DOWNSTREAM DEPENDENCY NOTE`.

    See `.claude/skills/product-qa/SKILL.md` Step 3 for the exact dry-run output format.

    After producing the DRY-RUN PREVIEW block, stop. Do not proceed to Steps 2–10.

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

### Live Run

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

### Dry-Run Preview

```
DRY-RUN PREVIEW — /product-qa {SOURCE-ID}
==========================================
Object ID:         [PREVIEW] QA-{MODULE}-{AREA}-{SLUG}-001
Source object:     {SOURCE-ID} ({path})
Source type:       {request | feature | bug}
Lane:              {Lane N — Name}
Template:          {QA_RUN_OBJECT_TEMPLATE.md | QA_SMOKE_TEST_TEMPLATE.md}
Blocking gates:    {gates — or: None}

ARTIFACTS — WOULD CREATE:
  - Test Plan: [PREVIEW] TESTPLAN-{...} → product/objects/test-plans/{...}.md
  - Test Cases: {n} → product/objects/test-cases/
  - QA Run: [PREVIEW] QA-{...} → product/objects/qa-runs/{...}.md
  Total objects: {1 + n + 1 = total}

TEST CASE PREVIEW:
  (Titles, preconditions, steps, and expected results only.
   Do NOT show predicted pass/fail results.)
  1. {Test Case Title}
     Preconditions: {conditions}
     Steps: {numbered steps}
     Expected result: {what a passing result looks like}
  ...

EXECUTION STATUS:
  Not executed — dry-run preview only.
  Expected outcomes listed for tester execution.
  Actual pass/fail will be recorded only during live QA run.

TEST SUMMARY:
  Total:    {n}
  Passed:   Not executed
  Failed:   Not executed
  Skipped:  Not executed

OVERALL QA STATUS:
  Preview only — not executed.

ARTIFACTS — WOULD UPDATE:
  - product/indexes/MASTER_OBJECT_INDEX.md — add Test Plan, Test Cases, QA Run entries
  - product/indexes/TRACEABILITY_MATRIX.md — link QA Run to {SOURCE-ID}
  - product/views/QA_VIEW.md — add QA run entry
  - product/views/ACTIVE_WORK_VIEW.md — {SOURCE-ID} remains {current-status} until live execution
  - product/module-workspaces/MOD-{MODULE}.md — add QA linkage only

DO NOT UPDATE IN DRY-RUN:
  - {SOURCE-ID} status (remains unchanged)
  - Any dependent request status
  - Any QA Passed/Failed state on any object

DOWNSTREAM DEPENDENCY NOTE (if applicable):
  {Dependent-ID} depends on this QA outcome for scope clarification.
  No status update is applied to {Dependent-ID} from this dry-run.

WRITE MODE:    DRY-RUN — No files written
FILES CHANGED: No
CODE CHANGED:  No
LEGACY SYNC:   No
NEXT ACTION:
  Re-run without --dry-run to create QA artifacts and execute tests.
  Mark QA Passed only when actual tester results are recorded.
```

---

## Next Action Recommendation

| Result | Recommended Next Command |
|---|---|
| Passed | `/product-uat` |
| Conditionally Passed | Fix conditions, verify fixes, then `/product-uat` |
| Failed | Fix critical bugs, run partial re-test, then re-evaluate |

---

## STATUS UPDATE DEFERRED Block Format (Lane 1)

When the fix_status gate is not cleared (fix_status is not Fixed/Merged/Ready for QA), include this block at the end of the output:

```
STATUS UPDATE DEFERRED (fix not yet ready):
  The following updates will be applied only after:
    1. fix_status is updated to: Fixed / Merged / Ready for QA, AND
    2. /product-qa is re-run live and all test cases pass.

  Deferred updates (not applied in this run):
    - product/objects/bugs/{BUG-ID}.md — fix_status: {current} → Resolved
    - product/indexes/BUG_INDEX.md — status update for {BUG-ID}
    - product/module-workspaces/MOD-{MODULE}.md — move {BUG-ID} from Open Bugs to Resolved
    - QA Run overall_result — pending live execution
```

These deferred items must NOT appear in ARTIFACTS — WOULD UPDATE. Moving them to ARTIFACTS — WOULD UPDATE before the gate is cleared is a failure condition.

---

## Failure Conditions

- **Stories not in Done status:** AI warns and asks if development is truly complete. Notes risks of testing incomplete work.
- **No acceptance criteria on stories:** AI generates likely test cases from story description and notes that formal criteria are missing.
- **Test environment unavailable:** AI can generate the Test Plan and Test Cases but cannot execute. Notes this and asks for environment status.
- **Bug found that blocks all further testing:** AI logs the blocking bug, halts the run, marks as Failed, and recommends immediate fix.
- **Dry-run ARTIFACTS — WOULD UPDATE includes fix_status → Resolved or Open Bugs → Resolved before fix_status gate is cleared**: INVALID — these updates belong in STATUS UPDATE DEFERRED.
- **Live QA run sets bug fix_status to Resolved without fix_status gate cleared**: INVALID — gate must be confirmed before status transition.
- **STATUS UPDATE DEFERRED block omitted when fix_status gate is not cleared**: INVALID — block is always required when gate condition is not met.
- **QA dry-run shows `Predicted: PASS` or `Predicted: FAIL` per test case**: INVALID — dry-run previews test case structure only; pass/fail is recorded only after live execution.
- **QA dry-run shows `PREDICTED OVERALL RESULT` or `PREDICTED TEST SUMMARY`**: INVALID — dry-run overall status must read `Not executed — preview only`; predicted sections do not exist in this interface.
- **QA dry-run records numeric pass/fail/skip counts**: INVALID — all three counts must read `Not executed` in dry-run mode.
- **QA dry-run updates source object status to `QA Passed` or `QA Failed`**: INVALID — source object status does not change in dry-run mode.
- **QA dry-run updates any downstream dependent object**: INVALID — dependent objects (e.g., REQ-0009 when source is REQ-0003) appear only in `DOWNSTREAM DEPENDENCY NOTE`; they are never updated by a QA run on a different source.
- **QA dry-run artifact count in heading does not match listed objects**: INVALID — count must equal `test_plan_count + test_case_count + qa_run_count + bug_count`; omit heading count if uncertain.
- **Live QA marks `QA Passed` without actual tester results**: INVALID — QA Passed requires actual execution evidence; do not infer Passed from description or assumption alone.

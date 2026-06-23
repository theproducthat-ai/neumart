# Nuemart Product OS — QA Run Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for QA Run Objects created during `/product-qa`. A QA Run is a single execution of a Test Plan against a feature build, producing a result record with all test outcomes and bugs found. File location: `product/objects/qa-runs/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. QARUN-COM-PLP-CAROUSEL-001
legacy_id: ""                        # e.g. QA-0002
object_type: QARun

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel Feature — QA Run 1"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# QA RUN SPECIFIC FIELDS
# ─────────────────────────────────────────────
qa_run_number: 1                     # Increment if re-running QA on same feature
linked_feature: ""                   # FEATURE-... ID
linked_test_plan: ""                 # TESTPLAN-... ID
linked_prd: ""                       # PRD-... ID

# ─────────────────────────────────────────────
# TEST STATISTICS
# ─────────────────────────────────────────────
test_cases_total: 0
test_cases_passed: 0
test_cases_failed: 0
test_cases_skipped: 0
pass_rate: ""                        # e.g. "85%" (calculated)

# ─────────────────────────────────────────────
# RESULTS
# ─────────────────────────────────────────────
overall_result: ""                   # Passed | Failed | Conditionally Passed
overall_result_rationale: ""         # Brief explanation of the result decision

# ─────────────────────────────────────────────
# BUGS
# ─────────────────────────────────────────────
bugs_found: []                       # BUG-... IDs found in this run
bugs_critical: 0
bugs_high: 0
bugs_medium: 0
bugs_low: 0

# ─────────────────────────────────────────────
# REGRESSION
# ─────────────────────────────────────────────
regression_verified: false           # Was regression checking performed?
regression_issues_found: false       # Were any regression issues found?
regression_areas_checked: []         # List of areas checked for regression

# ─────────────────────────────────────────────
# CONDITIONAL PASS CONDITIONS
# ─────────────────────────────────────────────
conditional_pass_conditions: []      # Conditions that must be met before UAT can proceed

# ─────────────────────────────────────────────
# EXECUTION
# ─────────────────────────────────────────────
qa_engineer: ""                      # Name, role, or "AI"
qa_date: ""                          # YYYY-MM-DD
environment: ""                      # staging | local | production

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  executes: ""                       # TESTPLAN-... ID
  covers: ""                         # FEATURE-... ID
  has_bugs: []                       # BUG-... IDs
  followed_by_uat: ""                # UATRUN-... ID (populated after UAT)

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""
created_by: ""
created_at: ""
updated_at: ""

# ─────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────
metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: ""
---
```

---

## 1. QA Run Summary

**QA Run ID:** `{object_id}` | **Run #:** {qa_run_number}
**Feature:** {linked_feature}
**Test Plan:** {linked_test_plan}
**Date:** {qa_date}
**QA Engineer:** {qa_engineer}
**Environment:** {environment}

---

## 2. Test Summary

| Metric | Value |
|---|---|
| Total Test Cases | {test_cases_total} |
| Passed | {test_cases_passed} ({pass_rate}%) |
| Failed | {test_cases_failed} |
| Skipped | {test_cases_skipped} |

---

## 3. Test Cases Table

> Complete list of all test cases executed in this run.

| Test Case ID | Story | Criterion Summary | Type | Result | Bug |
|---|---|---|---|---|---|
| {TESTCASE-...} | {US-XXXX} | {criterion summary} | Happy Path | PASS | — |
| {TESTCASE-...} | {US-XXXX} | {criterion summary} | Error Path | FAIL | {BUG-...} |
| {TESTCASE-...} | {US-XXXX} | {criterion summary} | Edge Case | PASS | — |
| {TESTCASE-...} | {US-XXXX} | {criterion summary} | Regression | PASS | — |
| {TESTCASE-...} | {US-XXXX} | {criterion summary} | Mobile | SKIP | Not run |

---

## 4. Bugs Found

> Summary of all bugs found in this QA run. Full details in Bug Objects.

| Bug ID | Summary | Severity | Story | Test Case | Status |
|---|---|---|---|---|---|
| {BUG-...} | {brief summary} | Critical | {US-XXXX} | {TESTCASE-...} | Open |
| {BUG-...} | {brief summary} | High | {US-XXXX} | {TESTCASE-...} | Open |
| {BUG-...} | {brief summary} | Medium | {US-XXXX} | {TESTCASE-...} | Open |

**Bug Count by Severity:**
- Critical: {bugs_critical}
- High: {bugs_high}
- Medium: {bugs_medium}
- Low: {bugs_low}

---

## 5. Regression Check

**Regression Verified:** {YES/NO}
**Regression Issues Found:** {YES — details below | NONE}

| Area Checked | Result | Notes |
|---|---|---|
| {area name} | {Pass/Fail} | {notes} |
| {area name} | {Pass/Fail} | {notes} |

---

## 6. Decision — Pass / Fail / Conditional

**OVERALL RESULT: {PASSED | FAILED | CONDITIONALLY PASSED}**

**Rationale:**
{1–3 sentences explaining the overall result. For Conditionally Passed: specify exactly what conditions must be resolved before proceeding to UAT.}

**Conditions for Conditional Pass** (if applicable):
- [ ] {condition 1 — must be resolved before UAT}
- [ ] {condition 2}

---

## 7. Next Action

**Recommended next step:**
→ {/product-uat to proceed | Fix Critical bugs [BUG-...], verify fix, then proceed to UAT | Re-run QA after fixing failures}

**Next action owner:** {who should take this action}

---

## 8. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | QA Run created and executed |

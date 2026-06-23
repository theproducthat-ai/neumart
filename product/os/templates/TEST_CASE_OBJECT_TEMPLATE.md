# Nuemart Product OS — Test Case Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Test Case Objects created during `/product-qa`. Each test case maps to one acceptance criterion and contains all information needed to execute and record the test. File location: `product/objects/test-cases/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. TESTCASE-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: TestCase

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel displays minimum 3 banners — Happy Path"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# TEST CASE SPECIFIC FIELDS
# ─────────────────────────────────────────────
test_type: ""                        # Happy Path | Error Path | Edge Case | Regression | Performance | Mobile | Security
test_status: Not Run                 # Not Run | Pass | Fail | Skip | Blocked

# ─────────────────────────────────────────────
# LINKAGE
# ─────────────────────────────────────────────
linked_story: ""                     # US-XXXX ID
linked_acceptance_criterion: ""      # ACC-... ID this test case validates
linked_feature: ""                   # FEATURE-... ID
linked_test_plan: ""                 # TESTPLAN-... ID

# ─────────────────────────────────────────────
# TEST EXECUTION FIELDS
# ─────────────────────────────────────────────
environment: ""                      # local | staging | production
tested_by: ""                        # Tester name, role, or "AI"
tested_date: ""                      # YYYY-MM-DD
test_run_id: ""                      # QARUN-... ID (populated when run)

# ─────────────────────────────────────────────
# RESULTS
# ─────────────────────────────────────────────
actual_result: ""                    # What actually happened (filled during QA run)
pass_fail: ""                        # Pass | Fail | Skip
bug_refs: []                         # BUG-... IDs created from this test case failure

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  validates: ""                      # ACC-... ID
  tests: ""                          # US-XXXX ID
  part_of: ""                        # TESTPLAN-... ID
  executed_in: ""                    # QARUN-... ID

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

## 1. Test Case Summary

**Test Case ID:** `{object_id}`
**Type:** {test_type}
**Status:** {test_status}
**Linked Story:** {linked_story}
**Linked Criterion:** {linked_acceptance_criterion}
**Feature:** {linked_feature}

---

## 2. Test Objective

> In one sentence: what does this test case verify?

This test case verifies that {acceptance criterion — plain language restatement}.

---

## 3. Preconditions

> What must be true or set up before the test can be executed?

- {precondition 1 — e.g. "User is authenticated as a Customer role"}
- {precondition 2 — e.g. "At least 3 active promotional banners exist in the database"}
- {precondition 3 — e.g. "The product listing page is loaded"}

---

## 4. Test Steps

> Numbered, atomic, reproducible steps. Each step must be deterministic — anyone following these steps must get the same result.

| Step | Action | Expected State After |
|---|---|---|
| 1 | {precise action} | {what should be true after this step} |
| 2 | {precise action} | {what should be true after this step} |
| 3 | {precise action} | {what should be true after this step} |
| ... | ... | ... |

---

## 5. Expected Result

> The complete description of what the system should do or show at the end of the test steps, if the feature is working correctly.

{expected result — specific and verifiable}

---

## 6. Actual Result

> _(Filled in during the QA Run. Leave blank before execution.)_

{actual result — what actually happened when the test was executed}

---

## 7. Pass / Fail

**Result:** {Pass | Fail | Skip}

**Skip reason** (if skipped): {why this test was not executed}

---

## 8. Bug References

> _(Filled in if the test fails. Each failure spawns a Bug Object.)_

| Bug ID | Severity | Summary |
|---|---|---|
| {BUG-...} | {Critical/High/Medium/Low} | {brief summary} |

*(Empty if test passed or was skipped)*

---

## 9. Test Environment

| Setting | Value |
|---|---|
| Environment | {local / staging / production} |
| Device | {desktop / mobile / tablet / all} |
| Browser | {Chrome / Safari / Firefox / all} |
| Data state | {what data was present at test time} |
| Auth state | {authenticated role, or unauthenticated} |

---

## 10. Edge Case Notes

> _(For Edge Case and Error Path tests — describe the specific boundary or error condition being tested.)_

**Condition being tested:** {description of edge case or error condition}
**Why this is important:** {what could go wrong if this case is not handled}

---

## 11. Regression Note

> _(For Regression tests — describe what existing behavior is being protected.)_

**What existing feature is being checked:** {existing feature or behavior name}
**Risk if this breaks:** {impact on users or system}

---

## 12. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Created via /product-qa |
| 1.1 | {YYYY-MM-DD} | {tester} | Executed — result recorded |

---
id: ""                               # e.g. QA-SMOKE-COM-PLP-001
object_type: QARun
title: ""
status: ""                           # planned | in-progress | passed | failed | blocked

priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""
linked_request: ""
linked_risks: []
linked_decisions: []

owner: ""
created_by: ""
created_date: ""
updated_date: ""
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# QA Smoke Test: [QA-SMOKE-NNN]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** A quick smoke test run after a hotfix, small enhancement, or deployment to verify core flows are not broken. Not a full QA regression run.
**Do not use this when:** You are doing full QA for a new feature or major release. Use QA_RUN_OBJECT_TEMPLATE.md for those.
**Source-of-truth folder:** `product/objects/qa-runs/`
**Related templates:** QA_RUN_OBJECT_TEMPLATE.md, RELEASE_HOTFIX_TEMPLATE.md

---

## Scope

**Triggered by:** [hotfix | small release | deployment | manual check]
**Linked release / build:** [RELEASE-... or BUILD-...]
**Environment:** [Staging | Production]
**Tested by:** [Name]
**Tested date:** YYYY-MM-DD

---

## Core Flow Checks

| # | Check | Expected | Result | Notes |
|---|---|---|---|---|
| 1 | Homepage loads | 200 OK, no console errors | pass \| fail | |
| 2 | Product listing page loads | Products visible | pass \| fail | |
| 3 | Product detail page loads | Details visible | pass \| fail | |
| 4 | Add to cart | Item appears in cart | pass \| fail | |
| 5 | Checkout initiation | Checkout page accessible | pass \| fail | |
| 6 | Auth / Login | User can sign in | pass \| fail | |
| 7 | [Feature-specific check] | [Expected result] | pass \| fail | |

## Regression Checks (Targeted)

| # | Area | Check | Result |
|---|---|---|---|
| 1 | [affected area] | [specific check related to the fix] | pass \| fail |
| 2 | [adjacent area] | [check for side effects] | pass \| fail |

## Result

**Overall status:** passed | failed | blocked

**Failures found:**
- [Failure description if any]

**Blocker:** yes | no

## Sign-off

**QA sign-off:** [Name] — [Date]
**Approved to release:** yes | no

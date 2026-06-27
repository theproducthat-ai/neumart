---
id: ""                               # e.g. BUG-COM-PLP-0042
object_type: Bug
title: ""
status: ""                           # open | in-progress | fixed | verified | closed

priority: low                        # For minor bugs this should always be low or medium

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

# Minor Bug: [BUG-NNNN]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** A cosmetic, copy, layout, or low-impact defect that does not affect user flows, payments, orders, authentication, or core data. Single-line or small fix.
**Do not use this when:** The bug affects checkout, payments, orders, auth, data integrity, or user-visible feature flows. Use BUG_OBJECT_TEMPLATE.md for those.
**Source-of-truth folder:** `product/objects/bugs/`
**Related templates:** BUG_OBJECT_TEMPLATE.md, REQUEST_QUICK_TEMPLATE.md

---

## Summary

[One sentence: what is wrong?]

**Reported by:** [Name]
**Affected screen:** [screen name or route]
**Reproducible:** yes | no | intermittent

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3 — observation]

## Expected vs Actual

| | Description |
|---|---|
| **Expected** | [What should happen] |
| **Actual** | [What is happening] |

## Root Cause (if known)

[What code or configuration is causing this?]

## Fix

[What changed to resolve it?]

## Verification

- [ ] Fix applied
- [ ] Manually verified on [Local | Staging]
- [ ] No regression introduced

## Notes

[Any additional context, screenshots, or related issues.]

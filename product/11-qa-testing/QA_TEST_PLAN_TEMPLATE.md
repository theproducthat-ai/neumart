# QA Test Plan — How to Run QA

This document explains how to conduct QA testing for a Nuemart feature. Claude writes QA test plans automatically from the DEVPLAN and user stories when development is marked complete.

---

## Rule: QA Is Not Optional

Every feature that touches a customer-facing screen, payment logic, or inventory logic must go through QA before UAT. Small bug fixes may skip UAT but must not skip QA.

---

## QA ID Format

QA IDs are registered in MASTER_REGISTRY.md:

```
QA-0001   First QA run
QA-0002   Second QA run
```

---

## QA Output File

```
product/11-qa-testing/test-runs/QA-NNNN.md
```

See `test-runs/QA-template.md` for the file structure.

---

## QA Decision Rules

| Decision | Criteria |
|---|---|
| QA Passed | All test scenarios pass. All acceptance criteria verified. No critical bugs. Minor bugs documented with acceptable workaround. |
| QA Failed | Any critical bug found. Any acceptance criterion fails. Payment or inventory logic incorrect. |
| QA Conditional Pass | Non-critical bugs logged in BUG_REGISTER.md. Feature can proceed to UAT with known minor issues. Product owner must acknowledge. |

---

## What to Test in Every QA Run

### Always Test

- [ ] Happy path for every user story
- [ ] Error paths (validation failures, API errors)
- [ ] Empty states (no data)
- [ ] Loading states (slow connection simulation)
- [ ] Mobile layout at 375px width
- [ ] Desktop layout at 1280px width
- [ ] All user roles that have access to the feature
- [ ] Admin and customer paths separately

### Test for Payment-Related Features

- [ ] Correct amount in Razorpay order
- [ ] Webhook payload verified with HMAC-SHA256
- [ ] Stock deduction happens only after payment.captured webhook
- [ ] Failed payment does not reduce stock
- [ ] Duplicate webhook is handled idempotently

### Test for Inventory-Related Features

- [ ] Stock decreases by correct quantity
- [ ] stockMovements record written with correct reason and delta
- [ ] Low stock threshold triggers correct status update
- [ ] Concurrent checkout does not oversell

---

## Bug Severity Levels

| Severity | Definition | Examples |
|---|---|---|
| Critical | Feature broken, data corruption, security issue | Payment taken but order not created; stock goes negative |
| High | Core functionality fails for some users | Checkout fails on mobile; admin cannot see all orders |
| Medium | Feature works but UX is poor | Slow load, no loading state, confusing error message |
| Low | Minor visual or copy issue | Typo, icon misalignment, inconsistent spacing |

---

## Bug Register

All bugs found during QA must be logged in:

```
product/11-qa-testing/BUG_REGISTER.md
```

---

## Regression Checklist

Before signing off on any QA run, check the regression checklist at:

```
product/11-qa-testing/REGRESSION_TEST_CHECKLIST.md
```

---

*Last updated: 2026-06-21*

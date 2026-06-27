# Example 01 — Fast Fix: Wrong Price on Product Detail Page

**Lane**: Fast Fix  
**Source**: Customer Support  
**Estimated effort**: 2 hours

---

## 1. Intake

**What arrived**: Support agent files a bug report. A customer reported that the price shown on the Organic Whole Milk product detail page is ₹89, but the correct price is ₹79. The customer placed the order at ₹89 and complained.

**Source**: Support agent via internal bug tracking

---

## 2. Classification

- **Request type**: Bug Fix
- **Module**: COM-PDP (Commerce, Product Detail Page)
- **Work type lane**: Fast Fix
- **Blocking flags**: None (no schema change, no payment flow change)
- **Lane rationale**: Single product, display-only bug, < 2 hours to fix

---

## 3. Object Created

```yaml
# product/objects/bugs/BUG-0042.md
---
id: BUG-0042
title: Organic Whole Milk showing incorrect price ₹89 instead of ₹79 on PDP
severity: high
status: open
module: COM-PDP
product_id: prod_organic_milk_1L
reported_by: support
owner: engineering_lead
date_found: 2026-06-10
---
```

**Reproduction steps**:
1. Open the customer app
2. Navigate to Dairy > Milk
3. Tap "Organic Whole Milk 1L"
4. Observe price shown: ₹89

**Expected**: ₹79

**Impact**: Customers overcharged by ₹10. Estimated 12 orders affected. Refunds may be required.

---

## 4. Required Artifacts

| Artifact | Status |
|---|---|
| Bug object (BUG-0042) | Required — created |
| 1-sentence acceptance criteria | Required |
| Reproduction steps | Required — documented above |
| Code review (1 engineer) | Required |

**Acceptance criteria**: The PDP for Organic Whole Milk 1L shows price ₹79 and matches the price in the admin product catalogue.

**Artifacts not needed**: PRD, tech design, QA test plan, support handover

---

## 5. How It Was Fixed

Engineering investigated and found the product's `price` field in the database was correct (₹79), but a cached promotional price override from a previous campaign had not been cleared. The cache clear fixed the display immediately.

No code change was needed — a data fix and cache flush resolved it.

---

## 6. Object Chain

```
BUG-0042 (fast fix, 2 hours)
  └── No linked feature (display bug, no feature change)
  └── Linked to affected order refunds (handled by Operations)
```

---

## 7. Outcome

- Fix deployed same day as reported
- 12 affected customers refunded ₹10 each (Operations action)
- BUG-0042 status → `resolved`
- Known Issues register not updated (one-time fix, not ongoing)

---

## Key Learnings from This Example

- Fast Fix does not require a PRD or tech design — it slows you down for bugs that are obvious
- Even a Fast Fix needs an owner, severity, and reproduction steps in the bug object
- Data fixes (not code fixes) still require Engineering Lead to execute — they're not "no artifact needed"
- High severity bugs with customer financial impact should trigger a refund check in Operations

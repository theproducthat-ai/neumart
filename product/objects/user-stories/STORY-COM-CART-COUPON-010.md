---
object_id: "US-0033"
legacy_id: "US-0033"
object_type: Story

product_area_code: "COM"
module_code: "CHK"
feature_slug: "coupon"
sequence: 10
version: "1.0"
canonical_name: "Checkout order summary shows coupon discount line item"
display_name: "Customer UI: Checkout summary coupon discount line [Should Have]"
file_slug: "STORY-COM-CART-COUPON-010"

story_type: "User-facing"
story_format: "As a customer with a coupon applied, I want to see the coupon discount in the checkout order summary, so that I can confirm the final payable amount before placing my order."
role: "Customer"
goal: "see coupon discount line item in checkout summary"
benefit: "I can confirm the discounted total before committing to the order"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-022"
    criterion: "Checkout order summary shows: Subtotal, 'Coupon discount (WELCOME10): −₹65', Delivery fee, Total = ₹585 + delivery"
    test_type: "Happy Path"
  - id: ""
    criterion: "No coupon applied → no coupon line item in checkout summary — existing layout unchanged"
    test_type: "Regression"
  - id: ""
    criterion: "Coupon code name is visible in the discount line label"
    test_type: "Happy Path"

test_coverage_required:
  - "Happy Path"
  - "Regression"
  - "Mobile"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-012"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
dev_task_refs: []
depends_on: ["US-0031"]
priority: "Should Have"

status: Draft
owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-stories)"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: "High"
---

# Story

**Story ID:** `US-0033` | **Sequence:** 10 | **Priority:** Should Have
**Type:** User-facing | **Status:** Draft
**Source Requirement:** REQ-SPEC-COM-CART-COUPON-012
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** customer with a coupon applied,
> **I want** to see the coupon discount in the checkout order summary,
> **so that** I can confirm the final payable amount before placing my order.

---

## 3. Context

Should Have story. The Zustand cart store already holds the `appliedCoupon` state from US-0031. This story surfaces that state in the checkout order summary component. If the customer reaches checkout with no coupon, the summary is unchanged.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Applied coupon shown as `Coupon discount (WELCOME10): −₹65` in checkout summary | Happy Path |
| 2 | Coupon code name visible in the label | Happy Path |
| 3 | No coupon applied → no coupon line, existing layout unchanged | Regression |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/components/checkout/OrderSummary.tsx` (or equivalent) — add conditional coupon line item
- Read from Zustand `cartStore.appliedCoupon`

**Key implementation notes:**
- Conditional render: `{cartStore.appliedCoupon && <DiscountLineItem coupon={appliedCoupon} />}`
- Reuse `DiscountLineItem` component from US-0031 if it accepts a coupon prop

**Schema change required:** NO | **API change required:** NO

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Discount line shows in checkout summary |
| Regression | YES | No-coupon checkout unchanged |
| Mobile | YES | 375px layout check |

---

## 7. Dependencies

| Story ID | Title | Reason |
|---|---|---|
| US-0031 | Cart coupon input + apply | `appliedCoupon` Zustand state must exist |

---

## 8. Definition of Done Checklist

- [ ] Checkout summary shows coupon line when `appliedCoupon` is set
- [ ] No coupon → no line (regression confirmed)
- [ ] Mobile layout confirmed
- [ ] Code reviewed and merged

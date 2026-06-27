---
object_id: "US-0032"
legacy_id: "US-0032"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 9
version: "1.0"
canonical_name: "Cart auto-remove coupon when subtotal drops below minimum order value"
display_name: "Customer UI: Auto-remove coupon on cart drop below minimum"
file_slug: "STORY-COM-CART-COUPON-009"

story_type: "User-facing"
story_format: "As a customer with a coupon applied, I want the coupon to be automatically removed if I reduce my cart below the minimum order value, so that I am never surprised by an invalid coupon state at checkout."
role: "Customer"
goal: "have applied coupon automatically removed with a clear toast when cart drops below minimum"
benefit: "I always see my accurate cart total and am not surprised by a coupon error at checkout"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-013"
    criterion: "Removing item that causes subtotal to drop below minimumOrderValue: coupon auto-removed, discount line disappears, total recalculates, toast shown"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-014"
    criterion: "Auto-remove fires immediately on item removal — not deferred to checkout"
    test_type: "Edge Case"
  - id: ""
    criterion: "Toast message is exactly: 'Coupon removed because cart value is below the minimum order value.'"
    test_type: "Happy Path"
  - id: ""
    criterion: "If coupon has no minimumOrderValue (null), removing items never auto-removes the coupon"
    test_type: "Edge Case"
  - id: ""
    criterion: "After auto-remove, customer can re-enter the coupon code if they add more items back"
    test_type: "Edge Case"

test_coverage_required:
  - "Happy Path"
  - "Edge Case"
  - "Mobile"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-007"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_rules: ["RULE-COM-CART-COUPON-005"]
screen_id: "SCR-CUS-0003"
dev_task_refs: []
depends_on: ["US-0031"]

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

**Story ID:** `US-0032` | **Sequence:** 9
**Type:** User-facing | **Status:** Draft
**Screen:** SCR-CUS-0003 (`/cart`)
**Source Requirement:** REQ-SPEC-COM-CART-COUPON-007
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** customer with a coupon applied,
> **I want** the coupon to be automatically removed if I reduce my cart below the minimum order value,
> **so that** I am never surprised by an invalid coupon state at checkout.

---

## 3. Context

This story wires the auto-remove logic into the Zustand cart store's quantity change and item remove handlers. It is a small story but has important UX implications — the customer must see the state change immediately and understand why the coupon was removed. DEC-003 confirmed this is auto-remove with toast, not a warning before checkout.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Remove item → subtotal < `minimumOrderValue` → coupon auto-removed, discount line gone, total recalculates | Happy Path |
| 2 | Toast message: "Coupon removed because cart value is below the minimum order value." | Happy Path |
| 3 | Auto-remove fires on item removal, not deferred | Edge Case |
| 4 | Coupon with null `minimumOrderValue` → item removal never triggers auto-remove | Edge Case |
| 5 | Customer can re-apply coupon after adding items back (input field available again) | Edge Case |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/store/cartStore.ts` — `onItemRemove()` and `onQuantityDecrement()` handlers call `checkCouponMinimum()` after updating item list

**Key implementation notes:**
- Logic in Zustand store — not in a React component:
  ```typescript
  function checkCouponMinimum(state: CartState) {
    if (!state.appliedCoupon) return;
    const { minimumOrderValue } = state.appliedCoupon;
    if (minimumOrderValue && state.subtotal < minimumOrderValue) {
      state.removeCoupon();
      toast("Coupon removed because cart value is below the minimum order value.");
    }
  }
  ```
- Call `checkCouponMinimum` at the end of both `removeItem` and `decrementQuantity` Zustand actions
- `minimumOrderValue` must be stored in `appliedCoupon` state (from `validateCoupon` response in US-0031)
- Toast: use the existing toast utility used elsewhere in the app

**Schema change required:** NO
**API change required:** NO
**Convex function affected:** None — pure client-side Zustand logic

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Item remove → auto-remove + toast |
| Edge Case | YES | Null minimumOrderValue; re-apply after add |
| Mobile | YES | Toast visible on mobile; not obscured by keyboard |
| Regression | YES | Item removal without coupon still works correctly |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0031 | Cart coupon input + apply | `appliedCoupon` Zustand state must exist (added in US-0031) |

---

## 8. Definition of Done Checklist

- [ ] `checkCouponMinimum` logic in Zustand store
- [ ] Called on both `removeItem` and `decrementQuantity`
- [ ] Toast message exactly matches spec
- [ ] Null `minimumOrderValue` case does NOT trigger auto-remove
- [ ] Regression: non-coupon item removal unaffected
- [ ] Code reviewed and merged

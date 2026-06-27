---
object_id: "US-0031"
legacy_id: "US-0031"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 8
version: "1.0"
canonical_name: "Customer cart coupon input field apply discount line item remove"
display_name: "Customer UI: Cart coupon input + apply + discount line item + remove"
file_slug: "STORY-COM-CART-COUPON-008"

story_type: "User-facing"
story_format: "As a logged-in customer, I want to enter a coupon code in my cart and immediately see the discount applied as a line item, so that I know the final amount I will pay before placing my order."
role: "Customer (logged-in)"
goal: "enter a coupon code in the cart, see the discount, and remove it if desired"
benefit: "I know my final payable amount before confirming the order"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-009"
    criterion: "Entering WELCOME10 on ₹650 cart and clicking Apply shows 'Coupon discount: −₹65' and total updates to ₹585 + delivery"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-010"
    criterion: "Clicking Remove removes the discount line and total reverts immediately"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-011"
    criterion: "Non-existent code: inline error shown below input 'This coupon code does not exist.' — not a toast"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-012"
    criterion: "Each error code (COUPON_EXPIRED, COUPON_INACTIVE, etc.) maps to its specific human-readable message"
    test_type: "Error Path"
  - id: ""
    criterion: "Apply button shows loading spinner while validateCoupon query is in-flight; input is disabled"
    test_type: "Edge Case"
  - id: ""
    criterion: "Coupon state (code + discountAmount) persists in Zustand across page navigation within the session"
    test_type: "Edge Case"

test_coverage_required:
  - "Happy Path"
  - "Error Path"
  - "Edge Case"
  - "Mobile"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-005"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
screen_id: "SCR-CUS-0003"
dev_task_refs: []
depends_on: ["US-0027"]

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

**Story ID:** `US-0031` | **Sequence:** 8
**Type:** User-facing | **Status:** Draft
**Screen:** SCR-CUS-0003 (`/cart`)
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-005, REQ-SPEC-COM-CART-COUPON-006
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** logged-in customer,
> **I want** to enter a coupon code in my cart and immediately see the discount applied as a line item,
> **so that** I know the final amount I will pay before placing my order.

---

## 3. Context

This is the core customer-facing story. It adds a coupon input UI to the existing cart page (SCR-CUS-0003). The cart is Zustand/localStorage (not Convex) — the coupon state is stored in the Zustand cart store. The applied coupon and computed discount amount are stored client-side; the server recalculates at `placeOrder` (US-0028).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Entering valid coupon + Apply → `Coupon discount: −₹65` appears; total updates | Happy Path |
| 2 | Remove button → discount line disappears; total reverts | Happy Path |
| 3 | Invalid code → inline error below input (not toast); cart total unchanged | Error Path |
| 4 | Each error code maps to specific human-readable message per PRD Section 9 | Error Path |
| 5 | Apply button shows spinner + input disabled while query in-flight | Edge Case |
| 6 | Coupon state persists in Zustand — survives page navigation within session | Edge Case |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/components/cart/CouponInputField.tsx` — new component: text input + Apply button + error display
- `neumart/components/cart/DiscountLineItem.tsx` — new component: discount line in cart summary
- `neumart/store/cartStore.ts` (or equivalent Zustand store) — add `appliedCoupon: { code, discountAmount, couponId, ... } | null` field + `applyCoupon()` + `removeCoupon()` actions
- `neumart/app/cart/page.tsx` — integrate new components

**Key implementation notes:**
- Coupon input is below the item list, above the order summary totals
- `CouponInputField` calls `validateCoupon` Convex query (US-0027) on Apply click
- On success: call `cartStore.applyCoupon({ code, discountAmount, ... })` — not stored in Convex
- Error code → message mapping must be a typed switch/map — one message per code
- Inline error shown in `CouponInputField` below input using a red text element (not toast)
- Display amount as `−₹{discountAmount / 100}` using the same currency format as the rest of the cart
- `discountAmount` shown on screen is **display only** — server recalculates at order placement

**Schema change required:** NO
**API change required:** NO (uses validateCoupon from US-0027)
**Convex function affected:** `validateCoupon` query called from UI
**Zustand store change:** YES — `appliedCoupon` state field + actions

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Apply coupon, see discount, remove |
| Error Path | YES | All 7 error codes → correct messages |
| Edge Case | YES | Loading state; Zustand persistence |
| Mobile | YES | Input + button accessible on mobile keyboard, 375px layout |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0027 | validateCoupon query | cart UI calls this query on Apply |

---

## 8. Definition of Done Checklist

- [ ] `CouponInputField` component implemented with all states (default, loading, applied, error)
- [ ] `DiscountLineItem` component shows correct discount amount
- [ ] Zustand cart store has `appliedCoupon` field
- [ ] All 7 error codes map to correct messages
- [ ] Mobile layout verified on 375px viewport
- [ ] Code reviewed and merged

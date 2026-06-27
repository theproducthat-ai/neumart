---
object_id: "US-0028"
legacy_id: "US-0028"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 5
version: "1.0"
canonical_name: "placeOrder mutation extended with coupon validation and couponUsage write"
display_name: "Backend: placeOrder mutation extension — coupon validation + couponUsage write"
file_slug: "STORY-COM-CART-COUPON-005"

story_type: "System"
story_format: "As a customer placing an order with a coupon, I want the server to validate and apply my coupon discount atomically with the order placement, so that the order is stored at the correct discounted total and the coupon usage is recorded."
role: "Customer"
goal: "have the server validate and apply coupon discount atomically within placeOrder"
benefit: "orders are stored with correct totals and coupon usage is tracked reliably without race conditions"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-015"
    criterion: "Order placed without couponCode → total = subtotal + deliveryFee, discountAmount absent/0 — existing non-coupon path unchanged"
    test_type: "Regression"
  - id: "AC-COM-CART-COUPON-016"
    criterion: "Coupon that was valid in cart but expires/deactivated before placeOrder → mutation returns COUPON_EXPIRED/COUPON_INACTIVE; no order written"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-019"
    criterion: "WELCOME10 coupon on ₹650 cart: order stored with discountAmount=6500, total=subtotal-6500+deliveryFee, couponCodeSnapshot='WELCOME10'"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-020"
    criterion: "50% max ₹30 coupon on ₹50 cart: discountAmount = min(25, 30, 50) = 25; total = 50-25+delivery"
    test_type: "Edge Case"
  - id: ""
    criterion: "A couponUsage row is written atomically with the order — both succeed or both fail"
    test_type: "Happy Path"
  - id: ""
    criterion: "Two concurrent placeOrder calls for last remaining use of a coupon: exactly one succeeds; second gets COUPON_EXHAUSTED"
    test_type: "Edge Case"

test_coverage_required:
  - "Happy Path"
  - "Error Path"
  - "Regression"
  - "Edge Case"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-008"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_rules: ["RULE-COM-CART-COUPON-003", "RULE-COM-CART-COUPON-004", "RULE-COM-CART-COUPON-006", "RULE-COM-CART-COUPON-008", "RULE-COM-CART-COUPON-009"]
linked_risks: ["RSK-COM-CART-COUPON-001", "RSK-COM-CART-COUPON-002", "RSK-COM-CART-COUPON-003"]
dev_task_refs: []
depends_on: ["US-0025", "US-0027"]

status: Draft
owner: "Engineering Lead"
created_by: "AI (Product OS V2 — /product-stories)"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: "High"
---

# Story

**Story ID:** `US-0028` | **Sequence:** 5
**Type:** System | **Status:** Draft
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-008, REQ-SPEC-COM-CART-COUPON-010
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** customer placing an order with a coupon,
> **I want** the server to validate and apply my coupon discount atomically with the order placement,
> **so that** the order is stored at the correct discounted total and the coupon usage is recorded.

---

## 3. Context

This is the highest-risk story in the entire feature (RSK-COM-CART-COUPON-001). It extends the existing `placeOrder` mutation to accept an optional `couponCode`. The critical design requirement is that the non-coupon order path must be **completely unchanged** — `couponCode = undefined` must short-circuit all coupon logic. The `couponUsage` write and the order write must be atomic (same Convex transaction) to protect against race conditions (RSK-COM-CART-COUPON-002).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | No `couponCode` argument → `total = subtotal + deliveryFee`, `discountAmount` absent — existing path unchanged | Regression |
| 2 | Valid coupon → order written with all 7 coupon snapshot fields + correct `discountAmount` + correct `total` | Happy Path |
| 3 | A `couponUsage` row is written atomically with the order | Happy Path |
| 4 | Coupon expires between cart and placeOrder → `COUPON_EXPIRED` returned; no order written | Error Path |
| 5 | `total = subtotal - discountAmount + deliveryFee` is correct for WELCOME10 on ₹650 cart | Happy Path |
| 6 | `discountAmount` is clamped to subtotal — `total` never < `deliveryFee` | Edge Case |
| 7 | Two concurrent calls race for last coupon usage → exactly one order + couponUsage written; second gets `COUPON_EXHAUSTED` | Edge Case |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/convex/orders.ts` — extend `placeOrder` mutation signature and body

**Key implementation notes:**
- Add optional `couponCode?: string` to `placeOrder` args
- Pattern: `const discountAmount = couponCode ? await validateAndApplyCoupon(ctx, couponCode, subtotal) : 0;`
- `validateAndApplyCoupon` is an internal async function (not a Convex endpoint). It runs the same validation checks as `validateCoupon` query, then returns `discountAmount`.
- **OCC protection for race conditions (RSK-COM-CART-COUPON-002):** the `couponUsages` count check and write must both happen in the same Convex mutation. Convex OCC will detect a conflicting write to the same `couponUsages` key and retry/fail — providing the race condition guard.
- **Write order:** validate coupon → compute discountAmount → write order → write couponUsage. Both writes are in the same mutation.
- **Coupon snapshot fields:** all 7 must be written when a coupon is applied. This enables historical accuracy (the coupon config may change after the order).
- `total = subtotal - discountAmount + deliveryFee` (enforce discountAmount ≤ subtotal via RULE-COM-CART-COUPON-004)

**Schema change required:** NO (schema done in US-0024)
**API change required:** YES — `placeOrder` mutation extended with optional `couponCode`
**Convex function affected:** `orders.ts` — `placeOrder`
**Razorpay interaction:** NO in MVP. Phase 11 will use `order.total` (the post-discount total) — `computeCouponDiscount` already isolated per RULE-COM-CART-COUPON-009.

⚠ **HIGH RISK STORY** — RSK-COM-CART-COUPON-001. Engineering Lead must review the non-coupon path carefully to confirm it is unaffected.

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Regression | YES | Non-coupon placeOrder must behave identically to pre-feature |
| Happy Path | YES | Order with coupon — all fields correct |
| Error Path | YES | Coupon expired/inactive/exhausted between cart and order |
| Edge Case | YES | Concurrent race condition; discount exceeds subtotal clamp |
| Security | NO | Auth is already required for placeOrder (existing) |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0025 | createCoupon + computeCouponDiscount | `computeCouponDiscount` function must exist |
| US-0027 | validateCoupon query | Reuse the same validation error codes and logic pattern |

---

## 8. Definition of Done Checklist

- [ ] `placeOrder` accepts optional `couponCode`
- [ ] Non-coupon path: zero change to existing behavior (regression confirmed)
- [ ] All 7 snapshot fields written when coupon applied
- [ ] `couponUsage` row written atomically with order
- [ ] Race condition: concurrent exhaustion test passes
- [ ] Engineering Lead review of non-coupon path completed
- [ ] Code reviewed and merged

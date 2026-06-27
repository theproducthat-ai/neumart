---
object_id: "US-0027"
legacy_id: "US-0027"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 4
version: "1.0"
canonical_name: "validateCoupon query — authenticated, structured error codes"
display_name: "Backend: validateCoupon query with structured error codes"
file_slug: "STORY-COM-CART-COUPON-004"

story_type: "System"
story_format: "As a logged-in customer, I want the cart to validate my entered coupon code against all business rules, so that I see either the discount amount or a specific error message explaining why the code cannot be applied."
role: "Customer (logged-in)"
goal: "validate a coupon code against active status, dates, usage limits, and minimum cart value"
benefit: "I see the exact discount I will get, or a specific actionable error message"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-011"
    criterion: "Non-existent coupon code returns error code COUPON_NOT_FOUND"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-012"
    criterion: "Expired coupon (expiresAt in past) returns COUPON_EXPIRED"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-007"
    criterion: "Inactive coupon (isActive=false) returns COUPON_INACTIVE"
    test_type: "Error Path"
  - id: ""
    criterion: "Valid coupon returns { valid: true, discountAmount, couponId, couponCodeSnapshot, discountValue, maximumDiscount }"
    test_type: "Happy Path"
  - id: ""
    criterion: "Unauthenticated call returns auth error — not coupon data"
    test_type: "Security"
  - id: ""
    criterion: "Cart subtotal below minimumOrderValue returns COUPON_MINIMUM_NOT_MET with minimumOrderValue in error payload"
    test_type: "Error Path"
  - id: ""
    criterion: "Coupon with perUserLimit reached for this user returns COUPON_PER_USER_LIMIT"
    test_type: "Error Path"

test_coverage_required:
  - "Happy Path"
  - "Error Path"
  - "Security"
  - "Edge Case"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-006"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_rules: ["RULE-COM-CART-COUPON-006", "RULE-COM-CART-COUPON-008"]
dev_task_refs: []
depends_on: ["US-0025"]

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

**Story ID:** `US-0027` | **Sequence:** 4
**Type:** System | **Status:** Draft
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-005, REQ-SPEC-COM-CART-COUPON-006, REQ-SPEC-COM-CART-COUPON-008
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** logged-in customer,
> **I want** the cart to validate my entered coupon code against all business rules,
> **so that** I see either the discount amount or a specific error message explaining why the code cannot be applied.

---

## 3. Context

`validateCoupon` is the customer-facing query called when a customer clicks Apply in the cart. It must run all validation rules and return either a discount result or a typed error code. This is NOT the same as the order-time validation — it's a fast, read-only check for UI feedback. The authoritative check happens at `placeOrder` (US-0028).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Valid coupon + sufficient cart subtotal → `{ valid: true, discountAmount, couponId, ... }` | Happy Path |
| 2 | Non-existent code → `COUPON_NOT_FOUND` | Error Path |
| 3 | Inactive coupon → `COUPON_INACTIVE` | Error Path |
| 4 | Expired coupon → `COUPON_EXPIRED` | Error Path |
| 5 | Not-yet-active coupon → `COUPON_NOT_YET_ACTIVE` | Error Path |
| 6 | Global usage limit reached → `COUPON_EXHAUSTED` | Error Path |
| 7 | Per-user limit reached → `COUPON_PER_USER_LIMIT` | Error Path |
| 8 | Cart subtotal < `minimumOrderValue` → `COUPON_MINIMUM_NOT_MET` with amount in payload | Error Path |
| 9 | Unauthenticated call → auth error (not coupon data) | Security |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/convex/coupons.ts` — add `validateCoupon` query

**Key implementation notes:**
- **No `userId` from client.** Resolve via `ctx.auth.getUserIdentity()` → query `users` by `tokenIdentifier`. RULE-COM-CART-COUPON-006 / RULE-COM-CART-COUPON-008.
- Validation order matters for UX: `NOT_FOUND` → `INACTIVE` → `NOT_YET_ACTIVE` → `EXPIRED` → `EXHAUSTED` → `PER_USER_LIMIT` → `MINIMUM_NOT_MET` → ✅ valid
- Accepts `{ couponCode: string, subtotal: number }` from client
- Uses `computeCouponDiscount` from `convex/utils/coupon.ts` for the discount calculation
- This is a **query** (read-only) — no writes. The client uses the returned `discountAmount` for display only.
- Cart subtotal is passed from client — accepted here (for display). Server recalculates at `placeOrder`.

**Schema change required:** NO
**API change required:** YES — new query: `validateCoupon`
**Convex function affected:** `coupons.ts`
**Clerk interaction:** YES — `ctx.auth.getUserIdentity()` for userId resolution

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Valid coupon, correct discount returned |
| Error Path | YES | All 7 error codes must be tested individually |
| Security | YES | Unauthenticated call rejection |
| Edge Case | YES | Coupon with no expiry, no minimumOrderValue, no usageLimit |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0025 | createCoupon + computeCouponDiscount | `computeCouponDiscount` function must exist |

---

## 8. Definition of Done Checklist

- [ ] `validateCoupon` query returns all 7 error codes correctly
- [ ] `ctx.auth.getUserIdentity()` used for userId — not client-supplied
- [ ] `computeCouponDiscount` imported from `convex/utils/coupon.ts`
- [ ] All 9 acceptance criteria pass
- [ ] Code reviewed and merged

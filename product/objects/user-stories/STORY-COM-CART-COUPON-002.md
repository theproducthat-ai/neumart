---
object_id: "US-0025"
legacy_id: "US-0025"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 2
version: "1.0"
canonical_name: "Admin coupon mutations — createCoupon, updateCoupon + computeCouponDiscount helper"
display_name: "Backend: createCoupon / updateCoupon mutations + computeCouponDiscount"
file_slug: "STORY-COM-CART-COUPON-002"

story_type: "System"
story_format: "As an admin, I want Convex mutations to create and update coupon records with full validation, so that the coupons table is populated with correct, validated data for customer and order use."
role: "Admin"
goal: "create and update coupon records via Convex mutations with full server-side validation"
benefit: "coupon data is always valid and consistent, and the computeCouponDiscount helper is reusable for all downstream logic"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-001"
    criterion: "createCoupon mutation writes a valid coupon record and returns the new coupon ID"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-002"
    criterion: "createCoupon rejects when maximumDiscount is absent for a percentage coupon — returns validation error"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-006"
    criterion: "updateCoupon rejects a duplicate coupon code with error 'Coupon code must be unique'"
    test_type: "Error Path"
  - id: ""
    criterion: "Non-admin call to createCoupon or updateCoupon is rejected — assertAdmin guard throws"
    test_type: "Security"
  - id: ""
    criterion: "computeCouponDiscount(subtotal=65000, discountValue=10, maximumDiscount=10000) returns 6500"
    test_type: "Happy Path"
  - id: ""
    criterion: "computeCouponDiscount result is always <= subtotal (clamp rule enforced)"
    test_type: "Edge Case"

test_coverage_required:
  - "Happy Path"
  - "Error Path"
  - "Edge Case"
  - "Security"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_rules: ["RULE-COM-CART-COUPON-001", "RULE-COM-CART-COUPON-002", "RULE-COM-CART-COUPON-003", "RULE-COM-CART-COUPON-004", "RULE-COM-CART-COUPON-009"]
dev_task_refs: []
depends_on: ["US-0024"]

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

**Story ID:** `US-0025` | **Sequence:** 2
**Type:** System | **Status:** Draft
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-001, REQ-SPEC-COM-CART-COUPON-003, REQ-SPEC-COM-CART-COUPON-010
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** admin,
> **I want** Convex mutations to create and update coupon records with full validation,
> **so that** the `coupons` table is populated with correct, validated data for customer and order use.

---

## 3. Context

This story implements the write side of admin coupon management. It also creates `computeCouponDiscount` — the reusable discount calculation helper that all downstream stories (validateCoupon, placeOrder) will depend on. Getting this helper right is critical because it is the single source of truth for discount arithmetic across the entire feature.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | `createCoupon` writes a valid coupon and returns the new coupon ID | Happy Path |
| 2 | `createCoupon` rejects if `maximumDiscount` is absent for `discountType = "percentage"` | Error Path |
| 3 | `createCoupon` rejects if `code` already exists in `coupons` table | Error Path |
| 4 | `updateCoupon` rejects a duplicate `code` that conflicts with another existing coupon | Error Path |
| 5 | Non-admin call to either mutation is rejected — `assertAdmin` guard throws | Security |
| 6 | `computeCouponDiscount({subtotal: 65000, discountValue: 10, maximumDiscount: 10000})` → `6500` | Happy Path |
| 7 | `computeCouponDiscount` result ≤ `subtotal` in all cases (clamp enforced) | Edge Case |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/convex/coupons.ts` — new file: `createCoupon`, `updateCoupon` mutations
- `neumart/convex/utils/coupon.ts` — new file: `computeCouponDiscount` pure function

**Key implementation notes:**
- `computeCouponDiscount` must be a **separate exported function** in `convex/utils/coupon.ts` — NOT inlined. Phase 11 Razorpay depends on this being independently callable (RULE-COM-CART-COUPON-009)
- Formula: `Math.min(Math.floor(subtotal * discountValue / 100), maximumDiscount, subtotal)`
- Use integer arithmetic only — all values in paise
- `assertAdmin` guard — use the existing pattern from other admin mutations
- `code` uniqueness check: query `coupons` table with `by_code` index before writing
- `discountType` validation: reject any value other than `"percentage"` in MVP (RULE-COM-CART-COUPON-001)

**Schema change required:** NO (schema done in US-0024)
**API change required:** YES — new mutations: `createCoupon`, `updateCoupon`
**Convex function affected:** new file `coupons.ts`
**Clerk interaction:** NO
**Razorpay interaction:** NO (but `computeCouponDiscount` will be consumed by Phase 11)

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Create coupon, computeCouponDiscount result |
| Error Path | YES | Missing cap, duplicate code, non-admin call |
| Edge Case | YES | computeCouponDiscount clamp behaviour; expiresAt < startsAt validation |
| Security | YES | assertAdmin rejection |
| Regression | NO | |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0024 | Schema: Coupons + CouponUsages + Orders fields | coupons table must exist before mutations can write to it |

---

## 8. Definition of Done Checklist

- [ ] `convex/coupons.ts` created with `createCoupon` and `updateCoupon`
- [ ] `convex/utils/coupon.ts` created with `computeCouponDiscount`
- [ ] All 7 acceptance criteria pass
- [ ] `assertAdmin` guard confirmed on both mutations
- [ ] Code reviewed and merged

---

## 9. AI Reasoning Notes

**Generated by:** `/product-stories`
**Sequence rationale:** Story 2 — depends on schema (US-0024). `computeCouponDiscount` is needed by validateCoupon (US-0027) and placeOrder (US-0028) so it must be available early.
**Split/merge decisions:** REQ-001 (create) and REQ-003 (edit) merged because both are server-side write mutations sharing identical validation logic and the same Convex file. `computeCouponDiscount` included here as it is the prerequisite for all downstream query stories.

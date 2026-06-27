---
object_id: "US-0024"
legacy_id: "US-0024"
object_type: Story

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon"
sequence: 1
version: "1.0"
canonical_name: "Convex schema — coupons, couponUsages tables and orders new fields"
display_name: "Schema: Coupons + CouponUsages tables + Orders fields"
file_slug: "STORY-COM-CART-COUPON-001"

story_type: "System"
story_format: "As an engineering team, we want the Convex schema updated with coupons and couponUsages tables and new optional fields on orders, so that all coupon backend logic has the correct data foundation."
role: "Engineering Team"
goal: "update the Convex schema with coupons and couponUsages tables and 7 new optional fields on the orders table"
benefit: "all coupon mutations and queries have the correct data foundation and existing order records are unaffected"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-017"
    criterion: "coupons table deployed with all 11 fields and indexes by_code and by_isActive"
    test_type: "Technical"
  - id: "AC-COM-CART-COUPON-018"
    criterion: "Existing order records load correctly with new optional fields absent — no runtime errors"
    test_type: "Regression"
  - id: ""
    criterion: "couponUsages table deployed with all 5 fields and indexes by_couponId and by_couponId_userId"
    test_type: "Technical"
  - id: ""
    criterion: "orders table has 7 new optional fields: discountAmount, couponId, couponCodeSnapshot, couponDiscountTypeSnapshot, couponDiscountValueSnapshot, couponMaxDiscountSnapshot, couponAppliedAt"
    test_type: "Technical"
  - id: ""
    criterion: "subtotal, total, deliveryFee fields on orders are unchanged — no rename, no migration"
    test_type: "Regression"

test_coverage_required:
  - "Technical"
  - "Regression"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-009"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_decision: "DECISION-ORD-AMOUNT-FIELDS-001"
dev_task_refs: []
depends_on: []

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

**Story ID:** `US-0024` | **Sequence:** 1
**Type:** System | **Status:** Draft
**Source Requirement:** REQ-SPEC-COM-CART-COUPON-009
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** engineering team,
> **I want** the Convex schema updated with `coupons` and `couponUsages` tables and new optional fields on `orders`,
> **so that** all coupon backend logic has the correct data foundation and existing order records are unaffected.

---

## 3. Context

All coupon logic depends on two new Convex tables and 7 new optional fields on the existing `orders` table. This is a pure schema story — no UI, no business logic. It is the prerequisite for every other coupon story. All changes are additive (Option B — DECISION-ORD-AMOUNT-FIELDS-001).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | `coupons` table deployed with all 11 fields, `by_code` and `by_isActive` indexes | Technical |
| 2 | `couponUsages` table deployed with all 5 fields, `by_couponId` and `by_couponId_userId` indexes | Technical |
| 3 | `orders` table has 7 new optional fields: `discountAmount`, `couponId`, `couponCodeSnapshot`, `couponDiscountTypeSnapshot`, `couponDiscountValueSnapshot`, `couponMaxDiscountSnapshot`, `couponAppliedAt` | Technical |
| 4 | Existing `subtotal`, `total`, `deliveryFee` fields on `orders` unchanged — no rename, no migration | Regression |
| 5 | Pre-coupon order records load correctly in admin and customer views — optional coupon fields absent, no runtime errors | Regression |

---

## 5. Development Notes

**Primary file affected:**
- `neumart/convex/schema.ts` — add `coupons` table, `couponUsages` table, extend `orders` table

**Key implementation notes:**
- All new `orders` fields are `v.optional(...)` — existing records will not have them, code must handle `undefined`
- `by_code` index on `coupons` is critical for O(1) lookup by coupon code at validation time
- `by_couponId_userId` compound index on `couponUsages` is critical for per-user usage count check
- Run `npx convex dev` after schema change to confirm schema migration passes on dev environment
- Review against DECISION-ORD-AMOUNT-FIELDS-001 before committing — `subtotal` and `total` must stay unchanged

**Schema change required:** YES — see PRD-COM-CART-COUPON-V1 Section 8.2 for full field definitions
**API change required:** NO (this story is schema only)
**Convex function affected:** `schema.ts`
**Gate:** G4 (Schema Review — Engineering Lead) required before this story begins development

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Technical | YES | Confirm tables and indexes exist in deployed Convex schema |
| Regression | YES | Verify existing orders load correctly with new optional fields |
| Happy Path | NO | No user behavior in this story |
| Mobile | NO | Schema only |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| None — this is the foundation story | | |

---

## 8. Definition of Done Checklist

- [ ] `convex/schema.ts` updated with both new tables and 7 new orders fields
- [ ] Schema deployed to dev environment without errors
- [ ] All existing order records load correctly (regression check)
- [ ] G4 Schema Review approval obtained from Engineering Lead
- [ ] Code reviewed and merged

---

## 9. AI Reasoning Notes

**Generated by:** `/product-stories`
**Sequence rationale:** Story 1 — all other 11 stories depend on this schema being in place. Must be the first merged.
**Split/merge decisions:** Schema isolated from business logic to allow G4 review and merge before any mutations are written. Deploying schema first reduces risk.

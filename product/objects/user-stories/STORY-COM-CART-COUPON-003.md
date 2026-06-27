---
object_id: "US-0026"
legacy_id: "US-0026"
object_type: Story

product_area_code: "ADM"
module_code: "COUP"
feature_slug: "coupon"
sequence: 3
version: "1.0"
canonical_name: "Admin listCoupons query with usage counts"
display_name: "Backend: listCoupons query + usage count aggregation"
file_slug: "STORY-COM-CART-COUPON-003"

story_type: "Admin"
story_format: "As an admin, I want a Convex query that returns all coupons with their redemption counts, so that the admin coupon list screen has the data it needs."
role: "Admin"
goal: "fetch all coupons with per-coupon usage count from couponUsages"
benefit: "the admin list screen can display usage progress for each coupon without a separate API call"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-003"
    criterion: "listCoupons returns all coupons with correct field values"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-004"
    criterion: "listCoupons returns empty array (not error) when no coupons exist"
    test_type: "Edge Case"
  - id: "AC-COM-CART-COUPON-021"
    criterion: "Each coupon in the response includes usageCount = count of couponUsages rows for that couponId"
    test_type: "Happy Path"
  - id: ""
    criterion: "Non-admin call to listCoupons is rejected — assertAdmin guard throws"
    test_type: "Security"

test_coverage_required:
  - "Happy Path"
  - "Edge Case"
  - "Security"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-002"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
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

**Story ID:** `US-0026` | **Sequence:** 3
**Type:** Admin | **Status:** Draft
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-002, REQ-SPEC-COM-CART-COUPON-011
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** admin,
> **I want** a Convex query that returns all coupons with their redemption counts,
> **so that** the admin coupon list screen has the data it needs.

---

## 3. Context

The admin coupon list (SCR-ADM-0012) needs to show all coupons and how many times each has been redeemed vs. its limit. This query fetches all coupons and aggregates usage count from `couponUsages` table using the `by_couponId` index.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | `listCoupons` returns all coupon records with correct field values | Happy Path |
| 2 | Each coupon includes `usageCount` = count of `couponUsages` rows for that `couponId` | Happy Path |
| 3 | `listCoupons` returns empty array (not error) when no coupons exist | Edge Case |
| 4 | Non-admin call rejected — `assertAdmin` guard throws | Security |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/convex/coupons.ts` — add `listCoupons` query

**Key implementation notes:**
- Fetch all `coupons` in one query, then for each coupon, count `couponUsages` rows using `by_couponId` index
- Return combined shape: `{ ...coupon, usageCount: number }[]`
- Convex does not support SQL-style JOINs — loop and count separately (acceptable at expected coupon volume of <100 active coupons)
- If performance becomes a concern at scale, consider a `couponUsageCount` denormalized field on `coupons` — flag as a future optimisation, not a blocker

**Schema change required:** NO
**API change required:** YES — new query: `listCoupons`
**Convex function affected:** `coupons.ts`

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | List with usage counts |
| Edge Case | YES | Empty coupon table |
| Security | YES | assertAdmin guard |
| Regression | NO | |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0024 | Schema: coupons + couponUsages tables | both tables must exist |

---

## 8. Definition of Done Checklist

- [ ] `listCoupons` query implemented and returns usage counts
- [ ] `assertAdmin` guard in place
- [ ] Empty list case returns `[]` not error
- [ ] Code reviewed and merged

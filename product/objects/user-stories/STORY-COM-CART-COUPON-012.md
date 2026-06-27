---
object_id: "US-0035"
legacy_id: "US-0035"
object_type: Story

product_area_code: "ADM"
module_code: "ORD"
feature_slug: "coupon"
sequence: 12
version: "1.0"
canonical_name: "Admin order detail shows coupon applied and discount amount"
display_name: "Admin UI: Order detail coupon display [Nice to Have]"
file_slug: "STORY-COM-CART-COUPON-012"

story_type: "Admin"
story_format: "As an admin, I want to see coupon details on each order record, so that I can confirm the discount was applied correctly and resolve any customer disputes about the final price."
role: "Admin"
goal: "view coupon code, type, value, and discount amount in admin order detail"
benefit: "I can confirm discount accuracy and resolve customer price disputes without database access"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-024"
    criterion: "Admin order detail for coupon order shows: 'Coupon Applied: WELCOME10 | Type: Percentage | Value: 10% | Discount: −₹65'"
    test_type: "Happy Path"
  - id: ""
    criterion: "Admin order detail for non-coupon order shows no coupon section — existing layout unchanged"
    test_type: "Regression"
  - id: ""
    criterion: "Data sourced from snapshot fields (couponCodeSnapshot, etc.) — accurate even if coupon was later deleted or modified"
    test_type: "Technical"

test_coverage_required:
  - "Happy Path"
  - "Regression"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-014"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
dev_task_refs: []
depends_on: ["US-0028"]
priority: "Nice to Have"

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

**Story ID:** `US-0035` | **Sequence:** 12 | **Priority:** Nice to Have
**Type:** Admin | **Status:** Draft
**Source Requirement:** REQ-SPEC-COM-CART-COUPON-014
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** admin,
> **I want** to see coupon details on each order record,
> **so that** I can confirm the discount was applied correctly and resolve any customer disputes about the final price.

---

## 3. Context

Nice to Have. Uses the 7 coupon snapshot fields stored on the order by US-0028. Adds a Coupon Applied section to the admin order detail view. This is important for customer support scenarios where a customer disputes their billed amount.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Admin order detail with coupon shows: coupon code, discount type, value, discount amount | Happy Path |
| 2 | Admin order detail without coupon: no coupon section, existing layout unchanged | Regression |
| 3 | Uses snapshot fields — not live coupon lookup | Technical |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/components/admin/OrderDetail.tsx` (or equivalent admin order detail) — add conditional coupon section

**Key implementation notes:**
- Conditional: `{order.couponId && <CouponDetailSection order={order} />}`
- Display: `Coupon Applied: {couponCodeSnapshot} | Type: {couponDiscountTypeSnapshot} | Value: {couponDiscountValueSnapshot}% | Discount: −₹{discountAmount/100}`

**Schema change required:** NO | **API change required:** NO

---

## 7. Dependencies

| Story ID | Title | Reason |
|---|---|---|
| US-0028 | placeOrder extension | snapshot fields must be on order records |

---

## 8. Definition of Done Checklist

- [ ] Admin order detail shows coupon section for orders with `couponId`
- [ ] Non-coupon orders: no coupon section (regression confirmed)
- [ ] Code reviewed and merged

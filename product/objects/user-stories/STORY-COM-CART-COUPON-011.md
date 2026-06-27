---
object_id: "US-0034"
legacy_id: "US-0034"
object_type: Story

product_area_code: "COM"
module_code: "ORDHIS"
feature_slug: "coupon"
sequence: 11
version: "1.0"
canonical_name: "Customer order history shows coupon discount per order"
display_name: "Customer UI: Order history coupon discount display [Nice to Have]"
file_slug: "STORY-COM-CART-COUPON-011"

story_type: "User-facing"
story_format: "As a customer, I want to see coupon discounts in my order history, so that I have a full financial record of what I paid for each past order."
role: "Customer"
goal: "view coupon discount in past order detail"
benefit: "I have a complete financial record of each order including any discount applied"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-023"
    criterion: "Past order with coupon shows 'Coupon (WELCOME10): −₹65' in order detail financial breakdown"
    test_type: "Happy Path"
  - id: ""
    criterion: "Past orders without a coupon show no coupon line — existing order detail unchanged"
    test_type: "Regression"
  - id: ""
    criterion: "Data sourced from order.couponCodeSnapshot and order.discountAmount (not live coupon state)"
    test_type: "Technical"

test_coverage_required:
  - "Happy Path"
  - "Regression"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-013"
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

**Story ID:** `US-0034` | **Sequence:** 11 | **Priority:** Nice to Have
**Type:** User-facing | **Status:** Draft
**Source Requirement:** REQ-SPEC-COM-CART-COUPON-013
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As a** customer,
> **I want** to see coupon discounts in my order history,
> **so that** I have a full financial record of what I paid for each past order.

---

## 3. Context

Nice to Have. Uses the coupon snapshot fields stored on the order record by US-0028. Renders coupon discount in the customer order history detail view. Source data is from the order record — not the live coupon (which may have since changed or been deleted).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Order with coupon: `Coupon (WELCOME10): −₹65` in financial breakdown | Happy Path |
| 2 | Orders without coupon: no coupon line, existing order detail unchanged | Regression |
| 3 | Uses `order.couponCodeSnapshot` and `order.discountAmount` — not live coupon lookup | Technical |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/components/order/OrderDetail.tsx` (customer-facing) — add conditional coupon line

**Key implementation notes:**
- Conditional: `{order.discountAmount ? <CouponLine code={order.couponCodeSnapshot} amount={order.discountAmount} /> : null}`
- No additional Convex query needed — snapshot fields already on the order record

**Schema change required:** NO | **API change required:** NO

---

## 7. Dependencies

| Story ID | Title | Reason |
|---|---|---|
| US-0028 | placeOrder extension | snapshot fields must be written to order records |

---

## 8. Definition of Done Checklist

- [ ] Order detail shows coupon line for orders with `discountAmount > 0`
- [ ] Regression: orders without coupon unchanged
- [ ] Code reviewed and merged

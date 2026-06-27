---
object_id: "US-0030"
legacy_id: "US-0030"
object_type: Story

product_area_code: "ADM"
module_code: "COUP"
feature_slug: "coupon"
sequence: 7
version: "1.0"
canonical_name: "Admin coupon create and edit form SCR-ADM-0013"
display_name: "Admin UI: Coupon Create / Edit Form (/admin/coupons/new + /admin/coupons/[id])"
file_slug: "STORY-COM-CART-COUPON-007"

story_type: "Admin"
story_format: "As an admin, I want a form to create and edit coupon codes with all required fields and inline validation, so that I can set up promotions correctly without relying on technical support."
role: "Admin"
goal: "create a new coupon or edit an existing one via a validated form"
benefit: "I can configure promotions independently with confidence that my inputs meet all business rules"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-001"
    criterion: "Submitting valid create form writes coupon to Convex and navigates back to /admin/coupons with success toast"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-002"
    criterion: "Submitting without maximumDiscount field shows inline error 'Maximum discount cap is required for percentage coupons'"
    test_type: "Error Path"
  - id: "AC-COM-CART-COUPON-005"
    criterion: "Edit form: changing discountValue saves correctly and reflects in list"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-006"
    criterion: "Edit form: duplicate coupon code shows inline error 'Coupon code must be unique'"
    test_type: "Error Path"
  - id: ""
    criterion: "Edit form pre-fills all existing coupon field values on load"
    test_type: "Happy Path"
  - id: ""
    criterion: "Discount Type field is locked to 'Percentage' (read-only) in MVP"
    test_type: "Edge Case"

test_coverage_required:
  - "Happy Path"
  - "Error Path"
  - "Edge Case"
  - "Mobile"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
screen_id: "SCR-ADM-0013"
dev_task_refs: []
depends_on: ["US-0025", "US-0029"]

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

**Story ID:** `US-0030` | **Sequence:** 7
**Type:** Admin | **Status:** Draft
**Screens:** SCR-ADM-0013 (`/admin/coupons/new` + `/admin/coupons/[id]`)
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-001, REQ-SPEC-COM-CART-COUPON-003, REQ-SPEC-COM-CART-COUPON-004
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** admin,
> **I want** a form to create and edit coupon codes with all required fields and inline validation,
> **so that** I can set up promotions correctly without relying on technical support.

---

## 3. Context

This story covers both the create and edit form screens. They share the same form component — the create form starts blank, the edit form prefills from the existing coupon. The `isActive` toggle on this form also satisfies REQ-004 (toggle active/inactive).

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Create form: valid submission writes coupon + navigates to `/admin/coupons` with success toast | Happy Path |
| 2 | Edit form: prefills all field values on load | Happy Path |
| 3 | Missing `maximumDiscount` shows inline error | Error Path |
| 4 | Duplicate coupon code shows inline error | Error Path |
| 5 | Discount Type field is read-only "Percentage" in MVP | Edge Case |
| 6 | `isActive` toggle on the form saves correctly | Happy Path |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/app/admin/coupons/new/page.tsx` — new create page
- `neumart/app/admin/coupons/[id]/page.tsx` — new edit page
- `neumart/components/admin/CouponForm.tsx` — shared form component

**Key implementation notes:**
- All monetary input fields accept ₹ values and convert to paise before mutation (`value * 100`)
- Discount Type: render as a disabled select showing "Percentage" — not an editable field in MVP (RULE-COM-CART-COUPON-001)
- `maximumDiscount` shown as required (asterisk + validation message)
- Date inputs for `startsAt` / `expiresAt`: use datetime-local or a date picker component
- Error handling: Convex mutation errors → parse error code → show inline field error
- Submit button shows loading spinner while mutation is in-flight

**Schema change required:** NO
**API change required:** NO (uses createCoupon/updateCoupon from US-0025)
**Clerk interaction:** YES — admin route guard

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Create, edit, toggle |
| Error Path | YES | Missing cap, duplicate code |
| Edge Case | YES | Discount type locked |
| Mobile | YES | Form fields usable on 375px viewport |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0025 | createCoupon / updateCoupon mutations | form calls these mutations |
| US-0029 | Admin coupon list screen | navigates back to list on save |

---

## 8. Definition of Done Checklist

- [ ] Create form at `/admin/coupons/new` works end-to-end
- [ ] Edit form at `/admin/coupons/[id]` prefills and saves correctly
- [ ] All field validations fire inline (not post-submit)
- [ ] Mobile layout confirmed on 375px viewport
- [ ] Code reviewed and merged

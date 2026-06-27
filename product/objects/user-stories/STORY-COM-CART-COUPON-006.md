---
object_id: "US-0029"
legacy_id: "US-0029"
object_type: Story

product_area_code: "ADM"
module_code: "COUP"
feature_slug: "coupon"
sequence: 6
version: "1.0"
canonical_name: "Admin coupon list screen SCR-ADM-0012"
display_name: "Admin UI: Coupon List screen (/admin/coupons)"
file_slug: "STORY-COM-CART-COUPON-006"

story_type: "Admin"
story_format: "As an admin, I want a coupon management list screen that shows all coupons with their status and usage counts, so that I can see the current state of all active promotions at a glance and navigate to create or edit a coupon."
role: "Admin"
goal: "view all coupons in a table with code, discount, cap, min cart, dates, status toggle, and usage count"
benefit: "I can monitor all active promotions and navigate to create or edit coupons without opening the database"

acceptance_criteria:
  - id: "AC-COM-CART-COUPON-003"
    criterion: "Table renders with all 8 columns: code, discount (%), max cap, min cart, valid from, valid to, status, usage"
    test_type: "Happy Path"
  - id: "AC-COM-CART-COUPON-004"
    criterion: "Empty state: 'No coupons created yet. Create your first coupon.' shown with Create button"
    test_type: "Edge Case"
  - id: "AC-COM-CART-COUPON-021"
    criterion: "Usage column shows {redeemed}/{limit} or {redeemed}/∞ for coupons with no limit"
    test_type: "Happy Path"
  - id: ""
    criterion: "Create Coupon button navigates to /admin/coupons/new"
    test_type: "Happy Path"
  - id: ""
    criterion: "Row click navigates to /admin/coupons/[id]"
    test_type: "Happy Path"
  - id: ""
    criterion: "Status toggle updates isActive optimistically and writes to Convex without page reload"
    test_type: "Happy Path"

test_coverage_required:
  - "Happy Path"
  - "Edge Case"
  - "Mobile"

linked_requirement: "REQ-SPEC-COM-CART-COUPON-002"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
screen_id: "SCR-ADM-0012"
dev_task_refs: []
depends_on: ["US-0026"]

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

**Story ID:** `US-0029` | **Sequence:** 6
**Type:** Admin | **Status:** Draft
**Screen:** SCR-ADM-0012 (`/admin/coupons`)
**Source Requirements:** REQ-SPEC-COM-CART-COUPON-002, REQ-SPEC-COM-CART-COUPON-004, REQ-SPEC-COM-CART-COUPON-011
**Feature:** FEATURE-COM-CART-COUPON | **PRD:** PRD-COM-CART-COUPON-V1

---

## 2. User Story

> **As an** admin,
> **I want** a coupon management list screen that shows all coupons with their status and usage counts,
> **so that** I can see the current state of all active promotions at a glance and navigate to create or edit a coupon.

---

## 3. Context

This is the primary admin entry point for coupon management. It consumes the `listCoupons` query (US-0026). The status toggle (isActive) on this screen enables quick deactivation without opening the edit form — important for time-sensitive campaign management.

---

## 4. Acceptance Criteria

| # | Criterion | Test Type |
|---|---|---|
| 1 | Table renders with columns: code, discount (%), max cap (₹), min cart (₹), valid from, valid to, status, usage | Happy Path |
| 2 | Empty state shown when no coupons exist | Edge Case |
| 3 | Usage column shows `{n} / {limit}` or `{n} / ∞` when no global limit | Happy Path |
| 4 | Create Coupon button navigates to `/admin/coupons/new` | Happy Path |
| 5 | Row click navigates to `/admin/coupons/[id]` for edit | Happy Path |
| 6 | Status toggle fires `updateCoupon` mutation optimistically — no page reload | Happy Path |

---

## 5. Development Notes

**Primary files affected:**
- `neumart/app/admin/coupons/page.tsx` (or equivalent Next.js admin route) — new page
- Consumes `listCoupons` Convex query (US-0026)
- Calls `updateCoupon` mutation for toggle (US-0025)

**Key implementation notes:**
- Format monetary values in ₹ (divide paise by 100): `₹{maximumDiscount / 100}`
- Format `—` for null optional fields (minimumOrderValue, expiresAt, startsAt, usageLimit)
- Status toggle: optimistic update on the list row — no separate confirmation dialog needed
- Loading skeleton: show skeleton rows while Convex query is loading
- Mobile: table should be horizontally scrollable on narrow screens, or use a card layout

**Schema change required:** NO
**API change required:** NO (uses listCoupons from US-0026 and updateCoupon from US-0025)
**Clerk interaction:** YES — assertAdmin middleware on admin routes

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | YES | Render with coupons, status toggle, navigation |
| Edge Case | YES | Empty state |
| Mobile | YES | Verify table usability on 375px viewport |
| Regression | NO | |

---

## 7. Dependencies

| Story ID | Title | Reason for Dependency |
|---|---|---|
| US-0026 | listCoupons query | list screen data source |

---

## 8. Definition of Done Checklist

- [ ] `/admin/coupons` page renders coupon table
- [ ] All 8 columns present with correct data
- [ ] Empty state renders correctly
- [ ] Status toggle works without page reload
- [ ] Mobile layout confirmed on 375px viewport
- [ ] Code reviewed and merged

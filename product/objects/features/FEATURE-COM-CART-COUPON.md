---
object_id: "FEATURE-COM-CART-COUPON"
legacy_id: ""
object_type: Feature

product_area_code: "COM"
module_code: "CART"
submodule_code: ""
feature_slug: "coupon"
sequence: ""
version: "1.0"
canonical_name: "FEATURE-COM-CART-COUPON"
display_name: "Discount Coupon System"
file_slug: "FEATURE-COM-CART-COUPON"

module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
secondary_module_ids: ["MOD-ADM"]
capability_id: ""
subfeature_id: ""
component_ids: []

feature_type: "New Feature"
maturity: "Planned"

source_request: "REQUEST-COM-CART-COUPON-001"
parent_feature: ""
child_features: []

future_candidates:
  - "Fixed-amount coupons (discountType: fixed) — DEFERRED-COM-CART-COUPON-FIXED-001"
  - "Admin-managed coupon import (CSV bulk upload)"
  - "Analytics dashboard: coupon redemption rate, discount volume, top coupons"
known_limitations: []

relationships:
  sourced_from: "REQUEST-COM-CART-COUPON-001"
  has_prd: "PRD-COM-CART-COUPON-V1"
  has_stories:
    - "US-0024"
    - "US-0025"
    - "US-0026"
    - "US-0027"
    - "US-0028"
    - "US-0029"
    - "US-0030"
    - "US-0031"
    - "US-0032"
    - "US-0033"
    - "US-0034"
    - "US-0035"
  has_tasks:
    - "DEVPLAN-COM-CART-COUPON-001"
  has_qa:
    - "QA-COM-CART-COUPON-001"
  has_uat: []
  shipped_in: ""
  has_risks:
    - "RSK-COM-CART-COUPON-001"
    - "RSK-COM-CART-COUPON-002"
    - "RSK-COM-CART-COUPON-003"
    - "RSK-COM-CART-COUPON-004"
    - "RSK-PAY-COUPON-RAZORPAY-001"
  has_decisions:
    - "DECISION-ORD-AMOUNT-FIELDS-001"
  depends_on:
    - "DEP-COM-CART-COUPON-RAZORPAY-001"

linked_impact_assessment: "IMPACT-COM-CART-COUPON-001"
shipped_date: ""
shipped_version: ""

owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-prd)"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# Feature

**Feature ID:** `FEATURE-COM-CART-COUPON`
**Type:** New Feature
**Maturity:** Planned
**Module:** COM → CART (primary) | ADM (secondary)
**Source Request:** REQUEST-COM-CART-COUPON-001 (REQ-0010)
**Parent Feature:** N/A — top-level feature

---

## 1. Functional Scope

### In-Scope
- Admin coupon creation with: code, discount type (percentage MVP), discount value, min cart value, max discount cap, per-user limit, global usage limit, startsAt, expiresAt, isActive toggle
- Admin coupon list view with usage tracking
- Admin coupon edit (all fields)
- Customer coupon input field in cart
- Coupon discount displayed as line item in cart (`Coupon discount: −₹XX`)
- Cart total updates immediately on coupon apply/remove
- Auto-remove coupon when cart subtotal drops below minimum — with toast
- Server-side coupon validation at `placeOrder` with structured error codes
- `couponUsage` row written atomically on order placement
- Coupon snapshot fields stored on order for historical accuracy
- Coupon discount applies at Pay Later orders in MVP

### Out-of-Scope
- Fixed-amount coupons (`discountType: "fixed"`) — deferred to Phase 2
- Multi-coupon stacking — one coupon per order only
- Razorpay integration with coupon discount — forward dependency for Phase 11
- Coupon analytics dashboard — post-MVP
- Bulk coupon import / CSV upload — post-MVP
- Coupon codes visible to customers before cart — no public listing

---

## 2. UX Rules

| Rule ID | Rule Statement | Screen | Condition |
|---|---|---|---|
| UX-COUPON-001 | Coupon discount appears as `Coupon discount: −₹XX` below the item list and above the total | Cart `/cart` | When a valid coupon is applied |
| UX-COUPON-002 | Cart total updates immediately on apply/remove — no page reload | Cart `/cart` | Always |
| UX-COUPON-003 | Auto-remove coupon on cart drop below minimum — show toast: "Coupon removed because cart value is below the minimum order value." | Cart `/cart` | When item quantity reduces or item removed and new subtotal < minimumOrderValue |
| UX-COUPON-004 | Inline error message shown directly below coupon input (not as toast) for apply failures | Cart `/cart` | When coupon apply fails |
| UX-COUPON-005 | Remove coupon button visible when a coupon is applied | Cart `/cart` | When coupon applied |
| UX-COUPON-006 | Admin coupon form shows maximumDiscount as required field for percentage coupons | Admin `/admin/coupons/new` | Always for % coupons |

---

## 3. Business Rules

| Rule ID | Rule Statement | Priority | Exception |
|---|---|---|---|
| BR-COUPON-001 | discountType = "percentage" only in MVP. Fixed-amount deferred. | Must Have | None |
| BR-COUPON-002 | maximumDiscount (cap) is required for all percentage coupons. Rejected at creation if absent. | Must Have | None |
| BR-COUPON-003 | discountAmount = min(subtotal × discountValue / 100, maximumDiscount) | Must Have | None |
| BR-COUPON-004 | discountAmount is clamped to subtotal. total >= deliveryFee at all times. | Must Have | None |
| BR-COUPON-005 | Coupon auto-removed with toast if cart subtotal drops below minimumOrderValue. | Must Have | None |
| BR-COUPON-006 | Server recalculates discount at placeOrder. Client value is display only. | Must Have | None |
| BR-COUPON-007 | One coupon per order. No stacking. | Must Have | None |
| BR-COUPON-008 | perUserLimit and usageLimit enforced server-side via couponUsages table count. | Must Have | None |
| BR-COUPON-009 | Coupon MVP applies to Pay Later orders only. Calculation function must be reusable for Razorpay Phase 11. | Must Have | None |

---

## 4. Data Dependencies

| Entity | Operation | Field(s) | Schema Change? |
|---|---|---|---|
| `coupons` | CREATE (new table) | All fields | YES — new table |
| `couponUsages` | CREATE (new table) | All fields | YES — new table |
| `orders` | READ + WRITE | 7 new optional fields | YES — additive fields only |
| `users` | READ | `userId` via ctx.auth | NO |
| `addresses` | READ | Existing — no change | NO |

---

## 5. Screen / Component Mapping

| Screen | Component | Change Type | Priority |
|---|---|---|---|
| `/cart` (SCR-CUS-0003) | `CouponInputField` | New | Must Have |
| `/cart` (SCR-CUS-0003) | `DiscountLineItem` | New | Must Have |
| `/cart` (SCR-CUS-0003) | `CartSummary` | Modified (new row) | Must Have |
| `/admin/coupons` (new) | `AdminCouponTable` | New | Must Have |
| `/admin/coupons/new` + `/admin/coupons/[id]` (new) | `AdminCouponForm` | New | Must Have |
| Checkout order summary | `OrderSummary` | Modified (discount row) | Should Have |
| Admin order detail | Order detail view | Modified (coupon fields) | Nice to Have |
| Customer order history | Order history detail | Modified (discount row) | Nice to Have |

---

## 6. Requirement / PRD Mapping

| PRD ID | Version | Status | Approval Date |
|---|---|---|---|
| PRD-COM-CART-COUPON-V1 | 1.0 | Draft | — |

---

## 7. Story / Task Mapping

| Story ID | Title | Status | Dev Phase |
|---|---|---|---|
| _(to be created — run /product-stories after PRD approval)_ | — | Not Started | — |

---

## 8. QA / UAT Mapping

| Object ID | Type | Date | Result |
|---|---|---|---|
| _(to be created — run /product-qa after development)_ | — | — | — |

---

## 9. Release Mapping

| Release ID | Version | Release Date | Type |
|---|---|---|---|
| _(to be created — run /product-release after UAT sign-off)_ | — | — | — |

---

## 10. Future Candidates

- **Fixed-amount coupons** (`discountType: "fixed"`) — Source: Product Owner Q1 answer; DEFERRED-COM-CART-COUPON-FIXED-001
- **Coupon analytics** — redemption rate, discount volume, top coupons by usage — Source: post-MVP measurement plan
- **CSV bulk coupon import** — Source: anticipated admin workflow for large promotions

---

## 11. Known Limitations

| Limitation | Description | Accepted By | Release |
|---|---|---|---|
| Pay Later only | Coupon MVP does not apply to Razorpay payments (Phase 11 forward dependency) | Product Owner | MVP |
| Percentage coupons only | Fixed-amount (`₹50 off`) not supported in MVP | Product Owner | MVP |

---

## 12. Risks and Assumptions

| Type | ID | Description | Status |
|---|---|---|---|
| Risk | RSK-COM-CART-COUPON-001 | placeOrder mutation regression | Active |
| Risk | RSK-COM-CART-COUPON-002 | Race condition on usage-limited coupon | Active |
| Risk | RSK-COM-CART-COUPON-003 | Discount exceeds subtotal | Active |
| Risk | RSK-COM-CART-COUPON-004 | Client/server discount divergence | Active |
| Risk | RSK-PAY-COUPON-RAZORPAY-001 | Razorpay Phase 11 forward dependency | Active |
| Assumption | — | Cart is Zustand/localStorage (not Convex) | Verified |
| Assumption | — | Existing assertAdmin guard covers coupon management | Verified |

---

## 13. AI Reasoning Notes

**Created by:** `/product-prd` (Product OS V2)
**Key decisions reflected:**
- DECISION-ORD-AMOUNT-FIELDS-001: Option B — additive orders fields, no migration
- DEC-001: Percentage only in MVP; fixed-amount deferred
- DEC-003: Auto-remove coupon with toast on cart drop below minimum
- DEC-005: Ship before Razorpay; computation must be reusable

---

## 14. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Created during /product-prd |

---
object_id: "REQUEST-COM-CART-COUPON-001"
legacy_id: "REQ-0010"
object_type: Request
title: "Discount Coupon System — Admin Creation and Customer Cart Application"
status: grilled
priority: medium
work_type_lane: "Standard Feature"
template_used: "REQUEST_OBJECT_TEMPLATE.md"

product_area_code: "COM"
module_code: "CART"
submodule_code: ""
feature_slug: "coupon"
sequence: "001"
version: "1.6"
linked_decisions: ["DECISION-ORD-AMOUNT-FIELDS-001"]
canonical_name: "REQUEST-COM-CART-COUPON-001"
display_name: "Discount Coupon System"
file_slug: "REQUEST-COM-CART-COUPON-001"

module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
secondary_module_ids: ["MOD-ADM"]
secondary_module_area_ids: ["MA-ADM-SETTINGS"]
screen_id: "SCR-CUS-0003"
route: "/cart"

request_type: "New Feature"
submitted_by: "Product Owner"
submission_date: "2026-06-25"

classification_confidence: "High"

blocking_flags:
  schema_change: true
  payment_change: true
  auth: false
  security: false
  integration: false
  release: false

feature_impact:
  creates: ["FEATURE-COM-CART-COUPON"]
  changes: []
  extends: []
  deprecates: []

related_prior_work: []

grilling_status: "Complete"
impact_assessment_status: "Complete"
impact_assessment_id: "IMPACT-COM-CART-COUPON-001"
evaluation_status: "Not Required"
priority_recommendation: ""

classification:
  request_type: "New Feature"
  domain: "COM"
  affected_domains: ["COM", "ADM", "ORD"]
  product_area_code: "COM"
  module_code: "COM-CART"
  secondary_module_codes: ["ADM", "ORD"]
  confidence: "High"
  blocking_flags: ["schema_change", "payment_change"]
  feature_impact: "creates"
  work_type_lane: "Standard Feature"
  primary_object_type: "requests"
  lane_confidence: "High"

assumptions_made:
  - "Cart state is Zustand/localStorage (not Convex). MOD-COM workspace entry stale — auto-resolved to Zustand per SCREEN_REGISTRY.md. Coupon discount calculated client-side in Zustand; validated server-side in Convex placeOrder mutation."
  - "One coupon per order. No multi-coupon stacking."
  - "Existing assertAdmin guard in Convex covers coupon management functions. No new role type needed."

confirmed_decisions:
  - id: "DEC-001"
    question: "MVP discount type scope"
    decision: "Percentage only for MVP. discountType = 'percentage'. Max discount cap required. Fixed-amount coupons deferred to Phase 2."
    schema_note: "discountType stored as enum — 'percentage' only in MVP — to allow fixed addition without model redesign."
  - id: "DEC-002"
    question: "Coupon expiry date"
    decision: "Expiry date included in MVP. Admin sets both startsAt and expiresAt. Active/Inactive toggle also retained."
    schema_note: "coupons table: add startsAt (number, optional) and expiresAt (number, optional). startsAt was not in DATA_ENTITY_MAP — new field confirmed here."
  - id: "DEC-003"
    question: "Cart total drops below minimum order value"
    decision: "Auto-remove coupon with toast: 'Coupon removed because cart value is below the minimum order value.' Cart total recalculates immediately. Error not deferred to checkout."
  - id: "DEC-004"
    question: "Order schema"
    decision: |
      total = subtotal - discountAmount + deliveryFee (all in paise).
      Existing fields subtotal and total are retained unchanged (Option B — see DECISION-ORD-AMOUNT-FIELDS-001).
      New fields on orders table:
        discountAmount (number, paise, default 0)
        couponId (optional FK to coupons)
        couponCodeSnapshot (string)
        couponDiscountTypeSnapshot (string = "percentage")
        couponDiscountValueSnapshot (number)
        couponMaxDiscountSnapshot (number)
        couponAppliedAt (number, timestamp)
      couponUsages table: couponId, userId, orderId, discountAmount, createdAt.
      Order-item prices remain item-level snapshots — coupon discount applies at order level only.
    schema_decision: "DECISION-ORD-AMOUNT-FIELDS-001 — Option B confirmed: keep subtotal/total unchanged; add discountAmount and coupon snapshot fields alongside. No rename, no migration."
  - id: "DEC-005"
    question: "Razorpay sequencing"
    decision: "Coupon MVP ships before Phase 11 Razorpay. Coupons apply to Pay Later orders only in first release. Coupon calculation logic must be written as a reusable function so the same final payable amount can be passed into Razorpay later. Coupon and Razorpay do NOT bundle."
    payment_change_note: "payment_change flag remains active as a forward dependency — not a gate for coupon MVP release. Must be addressed before Razorpay integration ships."

deferred_items_noted:
  - "Fixed-amount coupon support (discountType = 'fixed') — deferred to Phase 2. Scope is defined. Create DEFERRED_ITEM during /product-prd."

open_questions: []

owner: "Product Lead"
created_by: "AI"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# Request

**Request ID:** `REQUEST-COM-CART-COUPON-001` | **Legacy ID:** `REQ-0010`
**Type:** New Feature | **Lane:** Standard Feature (Lane 3)
**Status:** grilled — all intake questions answered, ready for `/product-prd`

---

## 1. Business Context

Nuemart has no promotional pricing capability. All products sell at full price. A discount coupon system enables marketing campaigns (e.g. `WELCOME10` for new customers), seasonal promotions, and targeted discounts without changing product list prices.

Coupons are explicitly listed as Post-MVP in `CURRENT_APP_STATUS.md`. The data model has been pre-documented in `DATA_ENTITY_MAP.md` (`coupons`, `couponUsages` as Future Candidates) and two admin screens are listed as Proposed in `SCREEN_REGISTRY.md`.

---

## 2. Problem Statement

Admins have no way to create or manage discount codes for campaigns. Customers have no way to apply a discount before placing an order. Nuemart cannot run a promotional offer or incentivise repeat purchase without a coupon system.

---

## 3. Desired Outcome

**Admin:** Can create, view, edit, and toggle coupon codes with percentage discount, min cart value, max discount cap, usage limit per customer, validity period (startsAt + expiresAt), and active/inactive status.

**Customer:** Can enter a coupon code in the cart, see the discount as a line item, place the order at the discounted total.

**Reference example:**
- Code: `WELCOME10` | 10% off | Min cart: ₹499 | Max discount: ₹100 | 1 per customer | Active
- Cart: Subtotal ₹650 → Coupon discount −₹65 → Final payable ₹585

---

## 4. Classification

| Field | Value |
|---|---|
| Request Type | New Feature |
| Classification Confidence | High |
| Primary Module | COM-CART |
| Secondary Modules | ADM (coupon management), ORD (discount on order) |
| Priority | Medium |
| Work Lane | Standard Feature (Lane 3) |

---

## 5. Blocking Flags

| Flag | Detected | Notes |
|---|---|---|
| Schema Change | YES | New `coupons` table, new `couponUsages` table. New fields on `orders`. `startsAt` field on coupons is a new addition vs DATA_ENTITY_MAP.md. G4 Schema Review gate required. |
| Payment Change | YES | Forward dependency: coupon discount must reduce the Razorpay payment amount when Phase 11 ships. Does NOT gate the coupon MVP release (ships with Pay Later only). Must be addressed before Razorpay integration. |
| Auth / Role | NO | Existing `assertAdmin` guard covers coupon management. |
| Security | NO | — |
| Integration | NO | — |
| Release Dependency | NO | Coupon MVP is independent of Razorpay (confirmed). |

---

## 6. Feature Impact

**Creates:**
- `FEATURE-COM-CART-COUPON` — Discount coupon system

**Changes (schema only):**
- `orders` Convex table — new coupon-related fields

**Deprecates:** None

---

## 7. Confirmed Scope (Post-Grilling)

### Admin Side (MOD-ADM)

**Coupon list** (`/admin/coupons`):
- Table: code, discount (%), max cap (₹), min cart (₹), valid from → to, status, usage count

**Create / Edit coupon form:**
- `code` — string, unique
- `discountType` — enum, `"percentage"` only in MVP
- `discountValue` — number (percentage, 0–100)
- `minimumOrderValue` — number (paise), optional
- `maximumDiscount` — number (paise), required for percentage coupons
- `perUserLimit` — number (optional, e.g. 1)
- `usageLimit` — number (optional, global cap)
- `startsAt` — datetime picker, optional
- `expiresAt` — datetime picker, optional
- `isActive` — boolean toggle

**Admin coupon screens**: no SCR-ADM IDs yet (listed as Proposed in SCREEN_REGISTRY.md — IDs to be assigned at PRD phase)

---

### Customer Side (MOD-COM — MA-COM-CART, SCR-CUS-0003 `/cart`)

- Coupon input field below item list in cart
- On valid code: show `Coupon discount: −₹XX` line item; cart total updates immediately
- On invalid / expired / exhausted / below-minimum code: inline error message
- Auto-remove behaviour: if cart drops below minimum order value after items removed → coupon auto-removed, toast: `"Coupon removed because cart value is below the minimum order value."`
- Coupon validated server-side in `placeOrder` Convex mutation

---

### Convex Schema Changes

**New table: `coupons`**

| Field | Type | Notes |
|---|---|---|
| `code` | string | Unique coupon code |
| `discountType` | string | `"percentage"` only in MVP (enum-ready for `"fixed"` later) |
| `discountValue` | number | Percentage value (0–100) |
| `minimumOrderValue` | number (optional) | Minimum cart total in paise |
| `maximumDiscount` | number (optional) | Cap on discount amount in paise — required for percentage coupons |
| `usageLimit` | number (optional) | Global usage cap |
| `perUserLimit` | number (optional) | Per-customer cap |
| `startsAt` | number (optional) | Unix timestamp — new field vs DATA_ENTITY_MAP |
| `expiresAt` | number (optional) | Unix timestamp |
| `isActive` | boolean | Admin toggle |
| `createdAt` | number | Unix timestamp |

**New table: `couponUsages`**

| Field | Type | Notes |
|---|---|---|
| `couponId` | Id<"coupons"> | The coupon used |
| `userId` | Id<"users"> | The user who redeemed it |
| `orderId` | Id<"orders"> | The order it applied to |
| `discountAmount` | number | Actual discount in paise |
| `createdAt` | number | Unix timestamp |

**Existing table: `orders` — new fields**

| Field | Type | Notes |
|---|---|---|
| `discountAmount` | number (optional) | Coupon discount in paise (0 if no coupon) |
| `couponId` | Id<"coupons"> (optional) | FK to coupons |
| `couponCodeSnapshot` | string (optional) | Code at time of order |
| `couponDiscountTypeSnapshot` | string (optional) | `"percentage"` snapshot |
| `couponDiscountValueSnapshot` | number (optional) | Percentage value snapshot |
| `couponMaxDiscountSnapshot` | number (optional) | Cap snapshot |
| `couponAppliedAt` | number (optional) | Timestamp of coupon application |

**Order total formula — confirmed by DECISION-ORD-AMOUNT-FIELDS-001 (Option B):**
```
total = subtotal - discountAmount + deliveryFee
```
Existing fields `subtotal` and `total` are retained unchanged. No rename, no migration. `discountAmount` defaults to `0` for non-coupon orders.

**Coupon discount applies at order/cart level only.** Order-item prices remain item-level snapshots and are not mutated by the coupon.

---

### New Convex Functions

| Function | Type | Notes |
|---|---|---|
| `createCoupon` | Mutation | Admin only — assertAdmin guard |
| `updateCoupon` | Mutation | Admin only |
| `listCoupons` | Query | Admin only |
| `validateCoupon` | Query | Customer-facing — check code validity, eligibility, remaining uses |
| Extend `placeOrder` | Mutation | Server-side coupon validation + apply discount + write couponUsage row |

---

### Deferred (Phase 2)

| Item | Reason |
|---|---|
| Fixed-amount coupons (`discountType: "fixed"`) | Out of MVP scope — confirmed by Product Owner. Schema model supports it without redesign. Create DEFERRED_ITEM during `/product-prd`. |

---

## 8. Open Questions

None. All 5 intake questions answered and recorded as confirmed decisions.

---

## 9. Risks

| Risk | Probability | Impact | Status |
|---|---|---|---|
| Race condition: two users simultaneously exhaust a usage-limited coupon | Medium | Medium | Identified — address in tech design (Convex transaction) |
| Coupon max discount cap exceeds cart subtotal (discount > order value) | Low | High | Identified — validation logic must clamp discount to subtotal |
| Client-side cart discount diverges from server validation at order placement | Medium | High | Identified — server always recalculates; client value is display only |
| Razorpay payment amount does not reflect coupon discount if Phase 11 ships without coupon integration | Low | Critical | Identified — payment_change flag active as forward dependency |
| Field naming conflict (subtotal vs subtotalAmount) causes migration risk on live orders table | Medium | High | Identified — requires explicit tech design decision before schema migration |

---

## 10. Artifacts Required (Lane 3 — Standard Feature)

| Artifact | Required | Status |
|---|---|---|
| Request Object | Yes | ✅ This file |
| Feature Object (`FEATURE-COM-CART-COUPON`) | Yes | To create — `/product-prd` |
| PRD (`PRD-COM-CART-COUPON-V1`) | Yes | To create — `/product-prd` |
| Technical Design (schema + Convex functions + field naming decision) | Yes — schema_change | To create — `/product-prd` |
| DEFERRED_ITEM (fixed-amount coupons) | Yes | To create — during `/product-prd` |
| Design Brief + Figma (admin coupon screens + cart coupon UI) | Yes | To create — PRD phase |
| User Stories | Yes | To create — `/product-stories` |
| QA Run Object | Yes | To create — after dev |
| UAT Run Object | Yes (customer-facing) | To create — after QA |
| Release Object | Yes | To create — before release |
| Support Handover | Yes | To create — before release |
| Measurement Plan | Yes | To create — PRD phase |

---

## 11. Lifecycle Tracking

| Phase | Status | Date | Notes |
|---|---|---|---|
| Classification | Complete | 2026-06-25 | New Feature, Lane 3, High confidence |
| Grilling | Complete | 2026-06-25 | All 5 questions answered inline at intake |
| Impact Assessment | Complete | 2026-06-25 | IMPACT-COM-CART-COUPON-001 — 5 risks, 1 dependency. Overall severity: Critical (orders schema). G3 cleared. |
| PRD | Approved | 2026-06-25 | PRD-COM-CART-COUPON-V1 approved by Product Owner |
| G4 Schema Review | Cleared | 2026-06-25 | Engineering Lead reviewed PRD Section 8 schema changes — coupons, couponUsages, orders additive fields approved |
| Development | Not Started | — | — |
| QA | Not Started | — | — |
| UAT | Not Started | — | — |
| Release | Not Started | — | — |

---

## 12. Next Action

→ Run `/product-devplan PRD-COM-CART-COUPON-V1`

**Reason:** G4 (Schema Review) cleared by Engineering Lead 2026-06-25. All pre-dev gates cleared. 12 stories (US-0024–US-0035) in backlog. Ready for development planning.

---

## 13. AI Reasoning

**Generated by:** `/product-request` (Product OS V2)
**Updated:** 2026-06-25 — all 5 intake questions answered by Product Owner; request promoted to `grilled`.
- Cart is Zustand/localStorage (SCREEN_REGISTRY + Rule 33 — auto-resolved from MOD-COM workspace stale entry)
- `startsAt` added to coupons schema — new field not in DATA_ENTITY_MAP.md Future Candidate
- Field naming conflict on `orders` table surfaced as tech design item (subtotal vs subtotalAmount)
- Fixed-amount coupons confirmed as deferred Phase 2 — scope defined, create DEFERRED_ITEM at PRD
- payment_change flag retained as forward dependency; does not block coupon MVP

---

## 14. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Initial creation via /product-request |
| 1.1 | 2026-06-25 | Product Owner + AI | All 5 intake questions answered; scope confirmed; status → grilled |
| 1.2 | 2026-06-25 | Product Owner + AI | Order field naming resolved — Option B confirmed (DECISION-ORD-AMOUNT-FIELDS-001); DEC-004 updated; conflict note removed |
| 1.3 | 2026-06-25 | AI (Product OS V2) | Impact Assessment complete — IMPACT-COM-CART-COUPON-001; impact_assessment_status → Complete; 5 Risk Objects + 1 Dependency Object created |
| 1.4 | 2026-06-25 | AI (Product OS V2) | PRD-COM-CART-COUPON-V1 created (Draft); FEATURE-COM-CART-COUPON created; 14 Requirements, 24 AC, 9 Rules, 1 Deferred Item written; lifecycle PRD → Draft |
| 1.5 | 2026-06-25 | Product Owner + AI | PRD approved; 12 User Stories (US-0024–US-0035) created in backlog; MASTER_REGISTRY updated |
| 1.6 | 2026-06-25 | Engineering Lead | G4 Schema Review cleared — coupons table, couponUsages table, orders additive fields approved for development |

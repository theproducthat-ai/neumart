---
object_id: "IMPACT-COM-CART-COUPON-001"
object_type: impact_assessment
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-impact)"

assessment_id: "IMPACT-COM-CART-COUPON-001"
linked_request: "REQUEST-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
status: "Complete"
assessed_at: "2026-06-25"
assessed_by: "AI-with-Human-Review"

overall_severity: "Critical"
assessment_confidence: "High"

schema_change_required: true
payment_flow_affected: true
auth_affected: false

modules_affected:
  - module: "MOD-COM"
    role: "Owns Change"
    severity: "High"
  - module: "MOD-ADM"
    role: "Directly Affected"
    severity: "High"
  - module: "MOD-PAY"
    role: "Indirectly Affected"
    severity: "Low"
  - module: "MOD-USR"
    role: "Indirectly Affected"
    severity: "Low"
  - module: "MOD-DEL"
    role: "Indirectly Affected"
    severity: "Low"
  - module: "MOD-INV"
    role: "Not Affected"
    severity: "None"
  - module: "MOD-RPT"
    role: "Indirectly Affected"
    severity: "Low"

screens_affected:
  - id: "SCR-CUS-0003"
    screen: "/cart"
    type: "Modified"
    change: "Coupon input field, discount line item, auto-remove behavior added"
  - id: "SCR-ADM-NEW-1"
    screen: "/admin/coupons"
    type: "New"
    change: "Admin coupon list — new screen"
  - id: "SCR-ADM-NEW-2"
    screen: "/admin/coupons/new and /admin/coupons/[id]"
    type: "New"
    change: "Admin coupon create/edit form — new screens"
  - id: "SCR-CUS-0005"
    screen: "Checkout order summary"
    type: "Potentially Modified"
    change: "Coupon discount line item if checkout shows order breakdown"
  - id: "SCR-ADM-ORD-DETAIL"
    screen: "Admin order detail"
    type: "Potentially Modified"
    change: "Coupon applied / discountAmount fields now present on orders"
  - id: "SCR-CUS-ORDHIS"
    screen: "Customer order history detail"
    type: "Potentially Modified"
    change: "Coupon discount shown in order breakdown"

integrations_affected:
  - integration: "Razorpay"
    type: "Forward Dependency"
    detail: "Not integrated in coupon MVP. When Phase 11 ships, Razorpay payment amount must use order.total (post-discount). Coupon calculation logic must be written as a reusable function. DEP-COM-CART-COUPON-RAZORPAY-001."
  - integration: "Clerk"
    type: "Unchanged"
    detail: "No auth flow changes. assertAdmin guard covers all coupon management functions."

regression_risk_level: "High"

dependencies_identified:
  - "DEP-COM-CART-COUPON-RAZORPAY-001"

risk_object_ids:
  - "RSK-COM-CART-COUPON-001"
  - "RSK-COM-CART-COUPON-002"
  - "RSK-COM-CART-COUPON-003"
  - "RSK-COM-CART-COUPON-004"
  - "RSK-PAY-COUPON-RAZORPAY-001"

gate_requirements:
  - gate: "G1"
    name: "Request Classification"
    status: "Cleared"
    note: "REQUEST-COM-CART-COUPON-001 classified as New Feature, Lane 3."
  - gate: "G2"
    name: "Grilling Complete"
    status: "Cleared"
    note: "All 5 intake questions answered. status = grilled."
  - gate: "G3"
    name: "Impact Assessment"
    status: "Triggered — this gate"
    note: "IMPACT-COM-CART-COUPON-001. Triggered by schema_change + payment_change flags."
  - gate: "G4"
    name: "Schema Review"
    status: "Required — not yet cleared"
    note: "schema_impact.severity = Critical (orders table modified + 2 new tables). Engineering Lead schema review required before development begins."
  - gate: "G5"
    name: "QA Passed"
    status: "Required — not yet run"
    note: "Full QA test plan required per Lane 3."
  - gate: "G6"
    name: "UAT Sign-off"
    status: "Required — not yet run"
    note: "Customer-facing feature (cart coupon UI) requires UAT sign-off."
  - gate: "G7"
    name: "Release Approved"
    status: "Required — not yet run"
    note: "Standard release gate per Lane 3."

parent_object_id: "REQUEST-COM-CART-COUPON-001"
related_feature_id: "FEATURE-COM-CART-COUPON"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  engines_run: ["IMPACT_ANALYSIS_ENGINE", "IMPACT_GATE_ENGINE"]
---

# Impact Assessment

**Assessment ID:** `IMPACT-COM-CART-COUPON-001`
**Type:** Impact Assessment
**Status:** Complete
**Date:** 2026-06-25
**Assessed By:** AI (Product OS V2) — Human Review Required
**Linked Request:** REQUEST-COM-CART-COUPON-001 (REQ-0010)
**Linked Feature:** FEATURE-COM-CART-COUPON (to create during /product-prd)
**Overall Severity:** Critical

---

## 1. Assessment Summary

The Discount Coupon System requires creating two new Convex tables (`coupons`, `couponUsages`) and adding 7 new optional fields to the live `orders` table. The `placeOrder` mutation — the single most critical Convex function in the application — must be extended to validate coupons server-side and record usage. A forward dependency on Razorpay Phase 11 exists but does not block coupon MVP release.

**Overall severity is Critical**, driven by modification of the core `orders` transaction table. Schema change is additive only (Option B — DECISION-ORD-AMOUNT-FIELDS-001), so migration risk is low, but the critical classification reflects that a production schema change to the orders table carries inherent risk regardless of approach.

---

## 2. Module Impact — Engine 1 Blast-Radius

| Module | Role | Severity | Notes |
|---|---|---|---|
| **MOD-COM** (Customer Commerce) | **Owns Change** | **High** | Cart screen (SCR-CUS-0003) modified with coupon input and discount display. Zustand cart store extended with coupon state. `placeOrder` mutation extended. |
| **MOD-ADM** (Admin Console) | **Directly Affected** | **High** | New admin coupon management screens created. New Convex functions: `createCoupon`, `updateCoupon`, `listCoupons`. Admin order detail view will need to display `discountAmount` and coupon snapshot fields. |
| **MOD-PAY** (Payments) | **Indirectly Affected** | **Low** | `payments` table records `amount = order.total`. Since `order.total` now correctly reflects `subtotal - discountAmount + deliveryFee`, payment amount for Pay Later orders is automatically correct. No payment table schema changes. |
| **MOD-USR** (Users) | **Indirectly Affected** | **Low** | `couponUsages` table references `userId`. No changes to user table, roles, or auth flows. Per-user coupon usage is tracked server-side. |
| **MOD-DEL** (Delivery) | **Indirectly Affected** | **Low** | `deliveryTasks` linked to `orders`. Order total changes do not affect delivery logic. No delivery schema or function changes needed. |
| **MOD-INV** (Inventory) | **Not Affected** | **None** | Coupon discount applies at order/cart level only. Product prices and stock quantities are not affected. |
| **MOD-RPT** (Reports) | **Indirectly Affected** | **Low** | Any financial report reading `orders.total` will now reflect post-discount totals. `discountAmount` is a new field that reporting dashboards should surface. No schema changes to reports. Monitoring recommended post-release. |

---

## 3. Screen Impact

| Screen | Type | Change Summary | Severity |
|---|---|---|---|
| `/cart` (SCR-CUS-0003) | Modified | Coupon input field below item list. Discount line item: `Coupon discount: −₹XX`. Auto-remove with toast. Cart total recalculates immediately. | High |
| `/admin/coupons` | New | Admin coupon list table: code, discount %, max cap, min cart, valid from→to, status, usage count. | High |
| `/admin/coupons/new` + `/admin/coupons/[id]` | New | Admin coupon create/edit form: all coupon fields with validation. | High |
| Checkout order summary | Potentially Modified | Should display coupon discount line item when order has `discountAmount > 0`. Confirm in PRD. | Medium |
| Admin order detail | Potentially Modified | Should display coupon applied and discount amount for orders with coupon fields. Confirm in PRD. | Medium |
| Customer order history detail | Potentially Modified | Should show coupon discount in order financial breakdown. Confirm in PRD. | Low |

---

## 4. Component Impact

| Component | Type | Notes | Severity |
|---|---|---|---|
| `CouponInputField` | New | Input + Apply/Remove button + inline feedback. Used in cart. | Medium |
| `DiscountLineItem` | New | Displays `Coupon discount: −₹XX` in cart summary and order summary. | Medium |
| `AdminCouponTable` | New | Data table for admin coupon list. | Medium |
| `AdminCouponForm` | New | Create/edit form for admin coupon management. | Medium |
| `CartSummary` / `OrderSummary` | Modified | Add coupon discount row. Existing structure preserved. | Medium |

No existing shared ShadCN components are modified. All changes are additive.

---

## 5. Data Entity Impact

**Severity: Critical** (orders is a core transaction table)

| Entity | Type | Change | Migration Required |
|---|---|---|---|
| `coupons` | New Table | All fields new. 10 fields including `code`, `discountType`, `discountValue`, `minimumOrderValue`, `maximumDiscount`, `usageLimit`, `perUserLimit`, `startsAt`, `expiresAt`, `isActive`, `createdAt`. | No — empty at creation |
| `couponUsages` | New Table | 5 fields: `couponId`, `userId`, `orderId`, `discountAmount`, `createdAt`. | No — empty at creation |
| `orders` | Modified | 7 new optional fields: `discountAmount`, `couponId`, `couponCodeSnapshot`, `couponDiscountTypeSnapshot`, `couponDiscountValueSnapshot`, `couponMaxDiscountSnapshot`, `couponAppliedAt`. | No — all optional; existing records unaffected |

**Migration plan:** None required. All new fields on `orders` are optional. Existing order records without coupon fields are valid and backward-compatible. `discountAmount` defaults to `0` (or absent) for non-coupon orders.

---

## 6. Schema Impact

**Severity: Critical** (orders table modified)

```yaml
schema_impact:
  severity: Critical
  schema_change_required: true
  affected_tables:
    - coupons (new)
    - couponUsages (new)
    - orders (7 new optional fields)
  change_type:
    - add_table (coupons)
    - add_table (couponUsages)
    - add_field (orders — x7 optional fields)
  migration_plan: null
  migration_required: false
  triggers_gate: G4
  notes: >
    All changes are additive (Option B per DECISION-ORD-AMOUNT-FIELDS-001).
    No renames. No removals. No type changes to existing fields.
    Existing orders queries and mutations remain valid without modification.
    Critical classification reflects orders table risk, not migration risk.
```

### Confirmed field additions to `orders` table:

| Field | Type in Convex | Notes |
|---|---|---|
| `discountAmount` | `v.optional(v.number())` | Paise. `0` or absent for non-coupon orders. |
| `couponId` | `v.optional(v.id("coupons"))` | FK to coupons table. |
| `couponCodeSnapshot` | `v.optional(v.string())` | Coupon code at time of order. |
| `couponDiscountTypeSnapshot` | `v.optional(v.string())` | `"percentage"` for MVP. |
| `couponDiscountValueSnapshot` | `v.optional(v.number())` | Percentage value at time of order. |
| `couponMaxDiscountSnapshot` | `v.optional(v.number())` | Max cap at time of order (paise). |
| `couponAppliedAt` | `v.optional(v.number())` | Unix timestamp. |

**Confirmed order total formula (DECISION-ORD-AMOUNT-FIELDS-001):**
```
total = subtotal - discountAmount + deliveryFee
```

### New `coupons` table:

| Field | Type in Convex | Notes |
|---|---|---|
| `code` | `v.string()` | Unique coupon code |
| `discountType` | `v.string()` | `"percentage"` only in MVP |
| `discountValue` | `v.number()` | Percentage (0–100) |
| `minimumOrderValue` | `v.optional(v.number())` | Min cart total in paise |
| `maximumDiscount` | `v.optional(v.number())` | Discount cap in paise — required for % coupons |
| `usageLimit` | `v.optional(v.number())` | Global usage cap |
| `perUserLimit` | `v.optional(v.number())` | Per-customer cap |
| `startsAt` | `v.optional(v.number())` | Unix timestamp |
| `expiresAt` | `v.optional(v.number())` | Unix timestamp |
| `isActive` | `v.boolean()` | Admin toggle |
| `createdAt` | `v.number()` | Unix timestamp |

Recommended index: `.index("by_code", ["code"])` for O(1) coupon lookup by code.

### New `couponUsages` table:

| Field | Type in Convex | Notes |
|---|---|---|
| `couponId` | `v.id("coupons")` | The coupon used |
| `userId` | `v.id("users")` | The user who redeemed it |
| `orderId` | `v.id("orders")` | The order it applied to |
| `discountAmount` | `v.number()` | Actual discount applied in paise |
| `createdAt` | `v.number()` | Unix timestamp |

Recommended indexes: `.index("by_couponId", ["couponId"])` + `.index("by_couponId_and_userId", ["couponId", "userId"])`.

---

## 7. API Impact

**Severity: High**

| Function | Type | Change | Notes |
|---|---|---|---|
| `createCoupon` | New Mutation | Write to `coupons` table | Admin only — `assertAdmin` guard. Input validated server-side. |
| `updateCoupon` | New Mutation | Update `coupons` by ID | Admin only — `assertAdmin` guard. |
| `listCoupons` | New Query | Fetch all coupons | Admin only. Returns usage count per coupon. |
| `validateCoupon` | New Query | Check coupon validity for current cart | Customer-facing. Auth required (no anonymous calls). No `userId` from client — resolved via `ctx.auth.getUserIdentity()`. Checks: active, date range, min cart, per-user usage, global usage. |
| `placeOrder` | Modified Mutation | Accept optional `couponCode` arg | Server-side coupon validation. Calculate `discountAmount`. Write `couponUsage` row atomically. Set `order.total = subtotal - discountAmount + deliveryFee`. |

**Breaking changes:** false — all changes to `placeOrder` are additive. Existing callers without `couponCode` receive identical behavior.

**Nuemart security rule compliance:** `validateCoupon` must resolve `userId` server-side via `ctx.auth.getUserIdentity()`. No `userId` parameter accepted from the client. Server-side identity confirmed.

---

## 8. Integration Impact

**Severity: Low** (no active Razorpay integration changes in coupon MVP)

```yaml
integration_impact:
  severity: Low
  affected_integrations:
    - Razorpay (forward dependency only — not active in MVP)
  new_integrations: []
  webhook_changes: false
  triggers_gates: []
  notes: >
    Razorpay is not integrated in coupon MVP. Coupon discount reduces order.total;
    when Phase 11 ships, Razorpay must receive order.total (post-discount) as the
    payment amount. Coupon calculation logic must be written as a reusable function.
    See DEP-COM-CART-COUPON-RAZORPAY-001.
    Clerk: unchanged. assertAdmin guard already exists.
    Pay Later flow: payment.amount = order.total — inherits discount automatically.
```

---

## 9. Role and Permission Impact

**Severity: None**

```yaml
role_impact:
  severity: None
  affected_roles: []
  new_roles: []
  permission_changes: []
  triggers_gate: null
  notes: >
    Existing assertAdmin guard in Convex covers all coupon management mutations
    and queries (createCoupon, updateCoupon, listCoupons).
    validateCoupon is customer-facing and requires authenticated session only —
    no new role needed.
    No new roles created. No permission changes. G4 not triggered by this category.
```

---

## 10. Configuration Impact

**Severity: None**

```yaml
configuration_impact:
  severity: None
  affected_configs: []
  new_configs: []
  environment: null
  notes: >
    No new environment variables. No Convex environment config changes.
    No next.config.ts changes. No Clerk configuration changes.
    No Razorpay configuration changes (integration is not active in coupon MVP).
```

---

## 11. Regression Risk

**Severity: High**

```yaml
regression_risk:
  severity: High
  features_at_risk:
    - placeOrder mutation — core order placement flow
    - Cart Zustand store — quantity updates, item removal, cart total display
    - OrderSummary component — financial breakdown display
    - Admin order list / order detail — new optional fields in response
  regression_test_scope:
    - Non-coupon order placement: confirm discountAmount = 0 or absent, total = subtotal + deliveryFee
    - Cart operations (add, remove, update qty) with no coupon applied — confirm no regression
    - Cart operations with coupon applied — confirm auto-remove on item removal below minimum
    - Admin order management — confirm existing admin views handle new optional coupon fields gracefully
    - Payment record creation — confirm payments.amount = order.total (post-discount)
  notes: >
    placeOrder mutation is the highest regression risk item — it handles the most
    critical user journey (order placement) and is being extended with coupon validation logic.
    All existing test coverage for placeOrder must be verified.
    Coupon-specific regression: non-coupon orders must be functionally identical post-change.
```

**High-risk regression items → Risk Objects created:**
- RSK-COM-CART-COUPON-001 — placeOrder mutation regression

---

## 12. Performance Impact

**Severity: Low**

```yaml
performance_impact:
  severity: Low
  affected_pages:
    - /cart (SCR-CUS-0003) — one additional on-demand Convex query for coupon validation
  new_subscriptions: []
  estimated_bundle_size_increase: "<5KB (new UI components, no heavy libraries)"
  mitigation_plan: >
    validateCoupon is called on-demand (user clicks Apply) — not on page load, not a
    real-time subscription. Low performance impact.
    Admin coupon screens are low-traffic. listCoupons returns admin-scoped data only.
  notes: >
    No PLP impact. No high-traffic page subscriptions added.
    India-first-performance rule: not triggered — coupon UI is on the cart page,
    not on the PLP or PDP. One on-demand query per Apply action is acceptable.
```

---

## 13. Security Impact

**Severity: Medium**

```yaml
security_impact:
  severity: Medium
  pii_involved: false
  new_auth_surfaces:
    - validateCoupon query: must require authenticated session (no anonymous coupon harvesting)
  webhook_verification_required: false
  triggers_gate: null
  notes: >
    Severity is Medium — High threshold not reached (no PII, no new unauthenticated surface,
    no webhook addition). Medium due to: new customer-facing data surface for coupon validation
    requires authentication check; server-side recalculation at placeOrder prevents client
    discount manipulation.

    Security requirements:
    1. validateCoupon: auth required. Unauthenticated calls must be rejected.
       userId resolved server-side via ctx.auth.getUserIdentity().
    2. placeOrder: coupon validation runs server-side before discount is applied.
       Client-provided couponCode is just a string — server recalculates all discount values.
       No trust of client-computed discount amounts.
    3. Race condition mitigation: Convex OCC (Optimistic Concurrency Control) protects
       against concurrent placeOrder calls exhausting a usage-limited coupon.
       Tech design must confirm OCC is sufficient or specify additional locking.

    Nuemart rules:
    - no-userId-from-frontend: confirmed — validateCoupon resolves identity server-side.
    - webhook-verified-trust: not applicable to coupon MVP (no new webhooks).
    - financial state mutation: placeOrder already verifies server-side — coupon adds
      additional server-side validation before any financial record is written.
```

---

## 14. Gate Requirements Summary

| Gate | Status | Trigger |
|---|---|---|
| G1 — Request Classification | ✅ Cleared | Auto-cleared at intake |
| G2 — Grilling Complete | ✅ Cleared | All 5 questions answered — REQUEST v1.1 |
| G3 — Impact Assessment | ✅ This gate — now cleared | schema_change + payment_change flags |
| G4 — Schema Review (Engineering Lead) | ⏳ Required — not yet cleared | schema_impact.severity = Critical; orders table modified |
| G5 — QA Passed | ⏳ Required — not yet run | Lane 3 Standard Feature |
| G6 — UAT Sign-off | ⏳ Required — not yet run | Customer-facing feature (cart coupon UI) |
| G7 — Release Approved | ⏳ Required — not yet run | Lane 3 Standard Feature |

**G4 note:** PRD can be written before G4 is formally cleared. G4 (Schema Review) must be cleared before development begins. Engineering Lead must review schema spec in the PRD tech design section.

---

## 15. Risks Identified

| Risk Object | Title | Likelihood | Impact | Score |
|---|---|---|---|---|
| RSK-COM-CART-COUPON-001 | placeOrder mutation regression | 3 | 5 | 15 — Critical |
| RSK-COM-CART-COUPON-002 | Race condition on usage-limited coupon | 3 | 3 | 9 — High |
| RSK-COM-CART-COUPON-003 | Discount amount exceeds cart subtotal | 2 | 4 | 8 — Medium |
| RSK-COM-CART-COUPON-004 | Client/server cart discount divergence | 3 | 4 | 12 — High |
| RSK-PAY-COUPON-RAZORPAY-001 | Coupon not reflected in Razorpay payment | 2 | 5 | 10 — High |

---

## 16. Dependencies Identified

| Dependency Object | Type | Blocker for Coupon MVP? |
|---|---|---|
| DEP-COM-CART-COUPON-RAZORPAY-001 | forward dependency on Razorpay Phase 11 | No — coupon MVP ships independently |

---

## 17. Assessment Confidence

**Confidence: High**

- Grilling complete: all 5 intake questions answered, all pre-PRD decisions resolved
- Schema reviewed: live `convex/schema.ts` read; confirmed current `orders` table fields
- Architecture confirmed: cart is Zustand/localStorage (per SCREEN_REGISTRY + Rule 33)
- DECISION-ORD-AMOUNT-FIELDS-001 confirmed: Option B (additive fields, no migration)
- Discovery session not run: [CONFIDENCE: Reduced for edge case behaviors not surfaced in grilling]
  - Mitigation: 5 detailed grilling questions covered all key behavioral decisions

---

## 18. Change History

| Version | Date | Changed By | Notes |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Initial assessment — both engines run |

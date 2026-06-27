---
object_id: "PRD-COM-CART-COUPON-V1"
legacy_id: ""
object_type: PRD

product_area_code: "COM"
module_code: "CART"
submodule_code: ""
feature_slug: "coupon"
sequence: "V1"
version: "1.0"
prd_version: "1.0"
canonical_name: "PRD-COM-CART-COUPON-V1"
display_name: "Discount Coupon System PRD"
file_slug: "PRD-COM-CART-COUPON-V1"

module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
secondary_module_ids: ["MOD-ADM"]
capability_id: ""
feature_id: "FEATURE-COM-CART-COUPON"
subfeature_ids: []

source_request: "REQUEST-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
approval_status: Approved
approver: "Product Owner"
approval_date: "2026-06-25"
engineering_review_status: "Approved"
engineering_reviewer: "Engineering Lead"
engineering_review_date: "2026-06-25"
g4_schema_review: "Cleared"

requirements_count: 14
must_have_count: 10
acceptance_criteria_count: 24
rules_count: 9
stories_linked:
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

schema_change_required: true
payment_flow_affected: true
auth_affected: false

status: Approved

relationships:
  specifies: "FEATURE-COM-CART-COUPON"
  sourced_from: "REQUEST-COM-CART-COUPON-001"
  incorporates: "IMPACT-COM-CART-COUPON-001"
  has_requirements:
    - "REQ-SPEC-COM-CART-COUPON-001"
    - "REQ-SPEC-COM-CART-COUPON-002"
    - "REQ-SPEC-COM-CART-COUPON-003"
    - "REQ-SPEC-COM-CART-COUPON-004"
    - "REQ-SPEC-COM-CART-COUPON-005"
    - "REQ-SPEC-COM-CART-COUPON-006"
    - "REQ-SPEC-COM-CART-COUPON-007"
    - "REQ-SPEC-COM-CART-COUPON-008"
    - "REQ-SPEC-COM-CART-COUPON-009"
    - "REQ-SPEC-COM-CART-COUPON-010"
    - "REQ-SPEC-COM-CART-COUPON-011"
    - "REQ-SPEC-COM-CART-COUPON-012"
    - "REQ-SPEC-COM-CART-COUPON-013"
    - "REQ-SPEC-COM-CART-COUPON-014"
  has_rules:
    - "RULE-COM-CART-COUPON-001"
    - "RULE-COM-CART-COUPON-002"
    - "RULE-COM-CART-COUPON-003"
    - "RULE-COM-CART-COUPON-004"
    - "RULE-COM-CART-COUPON-005"
    - "RULE-COM-CART-COUPON-006"
    - "RULE-COM-CART-COUPON-007"
    - "RULE-COM-CART-COUPON-008"
    - "RULE-COM-CART-COUPON-009"
  has_decisions:
    - "DECISION-ORD-AMOUNT-FIELDS-001"
  linked_risks:
    - "RSK-COM-CART-COUPON-001"
    - "RSK-COM-CART-COUPON-002"
    - "RSK-COM-CART-COUPON-003"
    - "RSK-COM-CART-COUPON-004"
    - "RSK-PAY-COUPON-RAZORPAY-001"
  addresses_questions: []

devplan_id: "DEVPLAN-COM-CART-COUPON-001"
devplan_legacy_id: "DEVPLAN-0008"
prompt_id: "PROMPT-COM-CART-COUPON-001"
devplan_status: "Ready for Development"
devplan_date: "2026-06-25"

owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-prd)"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# PRD — Discount Coupon System

**PRD ID:** `PRD-COM-CART-COUPON-V1` | **Version:** 1.0
**Feature:** FEATURE-COM-CART-COUPON
**Source Request:** REQUEST-COM-CART-COUPON-001 (REQ-0010)
**Status:** Draft — Pending Product Lead Approval
**Created:** 2026-06-25
**Approver:** Product Lead | **Approval Date:** —

---

## 1. Document Header

| Field | Value |
|---|---|
| PRD ID | PRD-COM-CART-COUPON-V1 |
| Feature | FEATURE-COM-CART-COUPON |
| Request | REQUEST-COM-CART-COUPON-001 (REQ-0010) |
| Impact Assessment | IMPACT-COM-CART-COUPON-001 |
| Decision | DECISION-ORD-AMOUNT-FIELDS-001 |
| Lane | Standard Feature (Lane 3) |
| Status | Draft |
| Gate Required Before Dev | G4 — Schema Review (Engineering Lead) |

---

## 2. Background

Nuemart currently has no promotional pricing capability. All products sell at their listed price, with no mechanism for admins to run time-bound or customer-targeted discount campaigns. The absence of a coupon system limits customer acquisition (e.g., new customer welcome offers), retention (repeat purchase incentives), and seasonal promotions.

The coupon system is explicitly listed as Post-MVP in `CURRENT_APP_STATUS.md`. Pre-work has been done: `DATA_ENTITY_MAP.md` documents `coupons` and `couponUsages` as Future Candidate entities, and `SCREEN_REGISTRY.md` lists two admin coupon screens as Proposed. This PRD activates that pre-planned work.

---

## 3. Problem Statement

**Admin perspective:** Admins have no way to create or manage discount codes. There is no mechanism to run a campaign such as "10% off for new customers with code WELCOME10." Promotional activity requires a code deploy or manual price adjustment — neither of which is practical for time-bound campaigns.

**Customer perspective:** Customers who receive a promotional offer (via email, WhatsApp, referral) have no mechanism to apply it. The cart shows the full price with no discount input. A customer arriving with a coupon code simply cannot use it.

---

## 4. Business Objective

**Objective:** Enable Nuemart to run promotional campaigns and incentivize purchase through admin-managed discount coupon codes redeemable at cart.

**Primary success metric:** Coupon redemption rate — percentage of orders placed using a coupon code within 30 days of first coupon campaign.

**Secondary metric:** Average order value for coupon orders vs. non-coupon orders (to validate minimum cart value effectiveness).

**Guardrail metric:** Order placement success rate must not decrease post-release (regression guard on `placeOrder` mutation).

---

## 5. Users and Personas

| Role | Description | What Changes For Them |
|---|---|---|
| Admin | Internal team member managing the platform. Creates coupons for promotions and seasonal offers. | Gains a new Coupon Management section in the admin console. Can create, edit, activate/deactivate coupons. Sees usage stats per coupon. |
| Customer | End consumer placing grocery orders on Nuemart. Receives coupon codes via marketing channels. | Sees a coupon code input in the cart. Enters a code and immediately sees the discount applied as a line item before confirming the order. |

---

## 6. Scope

### In-Scope

**Admin (MOD-ADM):**
- Create coupon: `code`, `discountType` (percentage only), `discountValue`, `minimumOrderValue`, `maximumDiscount`, `perUserLimit`, `usageLimit`, `startsAt`, `expiresAt`, `isActive`
- List coupons with: code, discount %, max cap, min cart, date range, status, usage count
- Edit coupon: all fields
- Toggle coupon active/inactive

**Customer (MOD-COM — Cart):**
- Coupon input field in cart (below item list)
- Apply coupon → discount line item: `Coupon discount: −₹XX`
- Remove coupon → total reverts
- Cart total updates immediately on apply/remove
- Auto-remove coupon with toast when cart subtotal drops below `minimumOrderValue`
- Inline error messages for invalid/expired/exhausted/below-minimum coupon attempts

**Backend (Convex):**
- New tables: `coupons`, `couponUsages`
- New optional fields on `orders` table
- New functions: `createCoupon`, `updateCoupon`, `listCoupons`, `validateCoupon`, extend `placeOrder`
- Server-side coupon validation at `placeOrder` with structured error codes
- `computeCouponDiscount` reusable helper function

**Schema (additive only — Option B per DECISION-ORD-AMOUNT-FIELDS-001):**
- `subtotal` and `total` on `orders` unchanged
- New optional fields added to `orders`

### Out-of-Scope

See Section 13 for full out-of-scope listing.

---

## 7. Feature Requirements

### 7.1 Must Have

---

**REQ-SPEC-COM-CART-COUPON-001 — Admin can create a coupon with all required fields**
- Priority: Must Have
- Type: Functional
- Statement: A user with the admin role can create a new coupon code by submitting a form with: `code` (unique string), `discountType` (`"percentage"`), `discountValue` (number 1–100), `minimumOrderValue` (optional paise), `maximumDiscount` (required for percentage coupons, paise), `perUserLimit` (optional), `usageLimit` (optional), `startsAt` (optional datetime), `expiresAt` (optional datetime), `isActive` (boolean). The coupon is written to the Convex `coupons` table. Non-admin users cannot access this function.
- Acceptance Criteria: AC-COM-CART-COUPON-001, AC-COM-CART-COUPON-002

---

**REQ-SPEC-COM-CART-COUPON-002 — Admin can view a list of all coupons**
- Priority: Must Have
- Type: Functional
- Statement: A user with the admin role can view a paginated list of all coupons at `/admin/coupons`. Each row displays: code, discount value (%), max discount cap (₹), minimum cart value (₹), valid from / to, status (Active/Inactive), usage count (total redeemed / limit).
- Acceptance Criteria: AC-COM-CART-COUPON-003, AC-COM-CART-COUPON-004

---

**REQ-SPEC-COM-CART-COUPON-003 — Admin can edit an existing coupon**
- Priority: Must Have
- Type: Functional
- Statement: A user with the admin role can open any existing coupon and edit all fields. Changes are saved to the Convex `coupons` table. The coupon `code` field must remain unique — duplicate code validation applies on edit.
- Acceptance Criteria: AC-COM-CART-COUPON-005, AC-COM-CART-COUPON-006

---

**REQ-SPEC-COM-CART-COUPON-004 — Admin can toggle a coupon active or inactive**
- Priority: Must Have
- Type: Functional
- Statement: A user with the admin role can toggle the `isActive` boolean on any coupon from the list view or edit form. An inactive coupon cannot be applied by customers — `validateCoupon` returns `COUPON_INACTIVE` error.
- Acceptance Criteria: AC-COM-CART-COUPON-007, AC-COM-CART-COUPON-008

---

**REQ-SPEC-COM-CART-COUPON-005 — Customer can apply a coupon code in the cart and see the discount**
- Priority: Must Have
- Type: Functional
- Statement: A logged-in customer can enter a coupon code in the cart input field and click Apply. If the coupon is valid, the cart displays a new discount line item (`Coupon discount: −₹XX`) and the cart total updates immediately to reflect `total = subtotal - discountAmount + deliveryFee`. The coupon code is stored in Zustand cart state.
- Acceptance Criteria: AC-COM-CART-COUPON-009, AC-COM-CART-COUPON-010

---

**REQ-SPEC-COM-CART-COUPON-006 — Invalid coupon shows a specific inline error message**
- Priority: Must Have
- Type: Functional
- Statement: When a customer applies a coupon that fails validation, an inline error is shown directly below the coupon input field (not as a toast). Error messages are specific to the failure reason:
  - `COUPON_NOT_FOUND`: "This coupon code does not exist."
  - `COUPON_INACTIVE`: "This coupon is no longer active."
  - `COUPON_EXPIRED`: "This coupon has expired."
  - `COUPON_NOT_YET_ACTIVE`: "This coupon is not yet valid."
  - `COUPON_EXHAUSTED`: "This coupon has reached its maximum usage limit."
  - `COUPON_PER_USER_LIMIT`: "You have already used this coupon."
  - `COUPON_MINIMUM_NOT_MET`: "Your cart total is below the minimum required for this coupon (₹{minimumOrderValue/100})."
- Acceptance Criteria: AC-COM-CART-COUPON-011, AC-COM-CART-COUPON-012

---

**REQ-SPEC-COM-CART-COUPON-007 — Coupon is auto-removed when cart drops below minimum order value**
- Priority: Must Have
- Type: Functional
- Statement: When a customer has a coupon applied and removes items or reduces quantities such that the cart subtotal drops below the coupon's `minimumOrderValue`, the coupon is automatically removed from the Zustand cart state. A toast notification is shown immediately: `"Coupon removed because cart value is below the minimum order value."` The cart total recalculates immediately without the discount. This check fires on every item quantity change — not deferred to checkout.
- Acceptance Criteria: AC-COM-CART-COUPON-013, AC-COM-CART-COUPON-014

---

**REQ-SPEC-COM-CART-COUPON-008 — Server validates coupon at placeOrder and returns structured error codes**
- Priority: Must Have
- Type: Functional + Technical
- Statement: The `placeOrder` Convex mutation accepts an optional `couponCode` string argument. If present, it validates the coupon server-side (active status, date range, per-user usage, global usage, minimum cart value) before writing the order. On validation failure, the mutation returns a structured error with a typed error code (see REQ-006 codes). The coupon validation logic runs within the same Convex transaction as the order write. The `computeCouponDiscount` function is a reusable internal helper callable from both `placeOrder` and future Razorpay integration.
- Acceptance Criteria: AC-COM-CART-COUPON-015, AC-COM-CART-COUPON-016

---

**REQ-SPEC-COM-CART-COUPON-009 — Schema: new coupons and couponUsages tables; new fields on orders**
- Priority: Must Have
- Type: Data / Technical
- Statement: The Convex schema is updated with:
  1. New `coupons` table (11 fields — see Section 8)
  2. New `couponUsages` table (5 fields — see Section 8)
  3. 7 new optional fields on the `orders` table (see Section 8)
  All changes are additive. No existing fields are renamed or removed. No data migration is required. The `orders` table `subtotal` and `total` fields remain unchanged per DECISION-ORD-AMOUNT-FIELDS-001.
- Acceptance Criteria: AC-COM-CART-COUPON-017, AC-COM-CART-COUPON-018

---

**REQ-SPEC-COM-CART-COUPON-010 — Order total formula is correct and consistent**
- Priority: Must Have
- Type: Business Rule / Data
- Statement: For all orders placed with a coupon: `total = subtotal - discountAmount + deliveryFee` (all in paise). `discountAmount = min(subtotal × discountValue / 100, maximumDiscount)`. `discountAmount` is clamped to `subtotal` — it can never exceed the merchandise total. `total` is always >= `deliveryFee`. For orders without a coupon, `discountAmount` is `0` (or absent) and the formula reduces to `total = subtotal + deliveryFee` — identical to the existing behaviour.
- Acceptance Criteria: AC-COM-CART-COUPON-019, AC-COM-CART-COUPON-020

---

### 7.2 Should Have

**REQ-SPEC-COM-CART-COUPON-011 — Admin sees real-time usage count per coupon**
- Priority: Should Have
- Type: Functional
- Statement: The admin coupon list displays a usage count column showing `{used} / {limit}` (or `{used} / ∞` when no global limit). Count is derived from `couponUsages` table count for each coupon.
- Acceptance Criteria: AC-COM-CART-COUPON-021

---

**REQ-SPEC-COM-CART-COUPON-012 — Checkout order summary displays coupon discount line item**
- Priority: Should Have
- Type: Functional
- Statement: When the customer proceeds to checkout with a coupon applied, the order summary in the checkout flow displays the coupon discount as a line item (`Coupon discount: −₹XX`) alongside the subtotal, delivery fee, and total. The coupon code name is shown.
- Acceptance Criteria: AC-COM-CART-COUPON-022

---

### 7.3 Nice to Have

**REQ-SPEC-COM-CART-COUPON-013 — Customer order history shows coupon discount**
- Priority: Nice to Have
- Type: Functional
- Statement: In the customer order history detail view, orders placed with a coupon show a `Coupon discount: −₹XX` line item in the financial breakdown alongside the coupon code used.
- Acceptance Criteria: AC-COM-CART-COUPON-023

---

**REQ-SPEC-COM-CART-COUPON-014 — Admin order detail shows coupon applied**
- Priority: Nice to Have
- Type: Functional
- Statement: The admin order detail view shows coupon information for orders where a coupon was applied: coupon code, discount type, discount value, and discount amount. Uses the snapshot fields stored on the `orders` table.
- Acceptance Criteria: AC-COM-CART-COUPON-024

---

## 8. Data Requirements

### 8.1 Entities Affected

| Entity | Operations | Schema Change? |
|---|---|---|
| `coupons` | CREATE (new table) — admin creates/updates; system reads | YES — new table |
| `couponUsages` | CREATE (new table) — written at order placement; admin reads count | YES — new table |
| `orders` | WRITE (new optional fields at order placement) + READ | YES — 7 new optional fields |
| `users` | READ only — via `ctx.auth.getUserIdentity()` | NO |

### 8.2 Schema Changes

**New table: `coupons`**

```typescript
coupons: defineTable({
  code: v.string(),                          // Unique coupon code (e.g. "WELCOME10")
  discountType: v.string(),                  // "percentage" only in MVP
  discountValue: v.number(),                 // Percentage value 1–100
  minimumOrderValue: v.optional(v.number()), // Min cart subtotal in paise
  maximumDiscount: v.optional(v.number()),   // Discount cap in paise — required for % type
  usageLimit: v.optional(v.number()),        // Global usage cap (null = unlimited)
  perUserLimit: v.optional(v.number()),      // Per-customer cap (null = unlimited)
  startsAt: v.optional(v.number()),          // Unix timestamp (null = immediately active)
  expiresAt: v.optional(v.number()),         // Unix timestamp (null = never expires)
  isActive: v.boolean(),                     // Admin toggle
  createdAt: v.number(),                     // Unix timestamp
})
  .index("by_code", ["code"])
  .index("by_isActive", ["isActive"])
```

**New table: `couponUsages`**

```typescript
couponUsages: defineTable({
  couponId: v.id("coupons"),                // The coupon used
  userId: v.id("users"),                    // The user who redeemed it
  orderId: v.id("orders"),                  // The order it applied to
  discountAmount: v.number(),               // Actual discount in paise
  createdAt: v.number(),                    // Unix timestamp
})
  .index("by_couponId", ["couponId"])
  .index("by_couponId_userId", ["couponId", "userId"])
```

**Modified table: `orders` — new optional fields**

```typescript
// Add to existing orders table definition:
discountAmount: v.optional(v.number()),                 // Coupon discount in paise (0 or absent = no coupon)
couponId: v.optional(v.id("coupons")),                  // FK to coupons
couponCodeSnapshot: v.optional(v.string()),              // Code at time of order
couponDiscountTypeSnapshot: v.optional(v.string()),      // "percentage" for MVP
couponDiscountValueSnapshot: v.optional(v.number()),     // % value at time of order
couponMaxDiscountSnapshot: v.optional(v.number()),       // Cap in paise at time of order
couponAppliedAt: v.optional(v.number()),                 // Timestamp of coupon application
```

**Existing fields preserved unchanged:**
```typescript
subtotal: v.number(),          // Merchandise total before discount (paise) — UNCHANGED
deliveryFee: v.number(),       // Delivery fee (paise) — UNCHANGED
total: v.number(),             // Final payable amount (paise) — UNCHANGED
```

**Order total formula (confirmed by DECISION-ORD-AMOUNT-FIELDS-001):**
```
total = subtotal - discountAmount + deliveryFee

Where:
  discountAmount = min(subtotal × discountValue / 100, maximumDiscount)
  discountAmount is clamped to subtotal (never exceeds merchandise total)
  total is always >= deliveryFee
```

### 8.3 Validation Rules

| Field | Rule | Error / Enforcement |
|---|---|---|
| `code` | Required, unique, alphanumeric + hyphens, max 20 chars | "Coupon code must be unique." (server) / form validation (admin UI) |
| `discountValue` | Required, number, 1–100 (percentage) | "Discount value must be between 1 and 100." |
| `maximumDiscount` | Required when discountType = "percentage" | "Maximum discount cap is required for percentage coupons." |
| `expiresAt` | If both startsAt and expiresAt set: expiresAt > startsAt | "Expiry date must be after start date." |
| `perUserLimit` | If set, positive integer | "Per-user limit must be a positive number." |
| `usageLimit` | If set, positive integer | "Usage limit must be a positive number." |
| `couponCode` (at placeOrder) | Server validates against all business rules | Structured error codes (see REQ-006) |

### 8.4 New Convex Functions

| Function | Type | Auth | Description |
|---|---|---|---|
| `createCoupon` | Mutation | Admin only (assertAdmin) | Create new coupon. Validates uniqueness of code. Returns coupon ID. |
| `updateCoupon` | Mutation | Admin only (assertAdmin) | Update coupon by ID. All fields editable. Code uniqueness validated. |
| `listCoupons` | Query | Admin only (assertAdmin) | Return all coupons with usage count derived from couponUsages. |
| `validateCoupon` | Query | Authenticated customer | Check coupon validity for current cart subtotal. Returns discount details or typed error code. No userId from client — resolved server-side. |
| `placeOrder` (extended) | Mutation | Authenticated customer | Existing mutation extended: accepts optional `couponCode`, validates server-side, calculates discountAmount, writes couponUsage row atomically. |

**`computeCouponDiscount` — internal helper:**
```typescript
// Reusable function — NOT a Convex endpoint, not callable from client
// Signature:
function computeCouponDiscount(params: {
  subtotal: number,           // Cart subtotal in paise
  discountValue: number,      // e.g. 10 (for 10%)
  maximumDiscount: number,    // Cap in paise
}): number {
  const computed = Math.floor(subtotal * discountValue / 100);
  return Math.min(computed, maximumDiscount, subtotal); // never exceeds subtotal
}
```

---

## 9. UX / UI Requirements

### Screen 1 — Cart (`/cart`, SCR-CUS-0003)

**Behavior:** Below the cart item list and above the order summary totals, a coupon input field is displayed. When a valid coupon is applied, the totals section shows a new `Coupon discount: −₹XX` line item. The cart total updates immediately.

**States to handle:**

| State | Behavior |
|---|---|
| Default (no coupon) | Coupon input field with placeholder "Enter coupon code" and Apply button |
| Loading (applying) | Apply button shows spinner, input disabled |
| Valid coupon applied | Discount line item: `Coupon discount: −₹XX`. Applied coupon code shown. Remove button visible. Total updates. |
| Invalid coupon | Inline error below input (specific message per error code). Input remains editable. |
| Coupon auto-removed | Toast: "Coupon removed because cart value is below the minimum order value." Discount line item removed. Total reverts. |
| Empty cart | Coupon input not shown (no items = no order) |

**Component breakdown:**

- `CouponInputField`: text input + Apply button + loading state + inline error display
- `DiscountLineItem`: label `Coupon discount:` + formatted negative amount + applied code + Remove button
- `CartSummary` (modified): add DiscountLineItem row between item subtotal and total

**Auto-remove logic (client-side, Zustand):**
```
On every item quantity change or item removal:
  if (cart.appliedCoupon && cart.subtotal < cart.appliedCoupon.minimumOrderValue) {
    cart.removeCoupon();
    toast("Coupon removed because cart value is below the minimum order value.");
  }
```

---

### Screen 2 — Admin Coupon List (`/admin/coupons`)

**Behavior:** Table of all coupons. Each row is a coupon with inline status toggle. Clicking a row navigates to the edit form.

**Columns:**
| Column | Data Source |
|---|---|
| Code | `coupons.code` |
| Discount | `{discountValue}% off` |
| Max cap | `₹{maximumDiscount/100}` |
| Min cart | `₹{minimumOrderValue/100}` or `—` |
| Valid from | `startsAt` formatted or `—` |
| Valid to | `expiresAt` formatted or `—` |
| Status | `Active` / `Inactive` toggle |
| Usage | `{count} / {usageLimit}` or `{count} / ∞` |

**States to handle:**

| State | Behavior |
|---|---|
| Empty | "No coupons created yet. Create your first coupon." with Create button |
| Loading | Skeleton rows |
| List populated | Table of coupons |
| Toggle isActive | Optimistic update — toggle immediately, write to Convex |

**Actions:**
- "Create Coupon" button → navigates to `/admin/coupons/new`
- Row click → navigates to `/admin/coupons/[id]`

---

### Screen 3 — Admin Coupon Form (`/admin/coupons/new` and `/admin/coupons/[id]`)

**Behavior:** Form with all coupon fields. Create saves to Convex. Edit prefills all fields. Both show validation errors inline.

**Form fields:**

| Field | Input Type | Validation | Notes |
|---|---|---|---|
| Coupon Code | Text | Required, unique, max 20 chars | Auto-uppercase on input |
| Discount Type | Dropdown (read-only "Percentage" in MVP) | — | MVP: locked to percentage |
| Discount Value (%) | Number | Required, 1–100 | Label: "Discount Percentage" |
| Maximum Discount (₹) | Number (paise converted) | Required | Label: "Max Discount Cap (₹)" |
| Minimum Cart Value (₹) | Number (optional) | Optional | Label: "Minimum Order Value (₹)" |
| Per-User Limit | Number (optional) | Optional, positive int | Label: "Max Uses Per Customer" |
| Usage Limit | Number (optional) | Optional, positive int | Label: "Total Usage Limit" |
| Valid From | Date/Time picker | Optional | Label: "Start Date (optional)" |
| Valid To | Date/Time picker | Optional, > startsAt | Label: "Expiry Date (optional)" |
| Status | Toggle (isActive) | — | Default: Active |

**States:**
- Create: blank form, "Create Coupon" submit button
- Edit: prefilled, "Save Changes" + "Delete Coupon" (or deactivate)
- Submitting: loading state on button
- Validation error: inline error per field
- Success: navigate back to coupon list with success toast

---

### Screen 4 — Checkout Order Summary (Should Have)

**Behavior:** If a coupon is applied in the Zustand cart state, the checkout order summary shows a `Coupon discount: −₹XX` line item. The final payable amount reflects the discounted total.

---

### Screen 5 — Customer Order History Detail (Nice to Have)

**Behavior:** For orders where `discountAmount > 0`, the order financial breakdown shows: `Coupon (COUPONCODE): −₹XX`. Uses snapshot fields stored on the order.

---

### Screen 6 — Admin Order Detail (Nice to Have)

**Behavior:** For orders where `couponId` is set, the admin order detail displays: Coupon Applied: `{couponCodeSnapshot}` | Discount Type: `{couponDiscountTypeSnapshot}` | Value: `{couponDiscountValueSnapshot}%` | Discount: `−₹{discountAmount/100}`.

---

## 10. Business Rules

| Rule ID | Rule Statement | Priority | Exception |
|---|---|---|---|
| RULE-COM-CART-COUPON-001 | `discountType` = `"percentage"` only in MVP. Fixed-amount coupons are deferred. | Must Have | None |
| RULE-COM-CART-COUPON-002 | `maximumDiscount` (cap) is required for all `"percentage"` coupons. Create/update mutation rejects if absent. | Must Have | None |
| RULE-COM-CART-COUPON-003 | `discountAmount = min(subtotal × discountValue / 100, maximumDiscount)` — computed by `computeCouponDiscount`. | Must Have | None |
| RULE-COM-CART-COUPON-004 | `discountAmount` is clamped to `subtotal`. `total` is always `>= deliveryFee`. | Must Have | None |
| RULE-COM-CART-COUPON-005 | Coupon is auto-removed (client-side, Zustand) with toast when cart `subtotal < minimumOrderValue` after any cart change. | Must Have | If `minimumOrderValue` is null, no minimum applies. |
| RULE-COM-CART-COUPON-006 | Server always recalculates discount at `placeOrder`. Client-computed discount is display only. Structured error codes returned on failure. | Must Have | None |
| RULE-COM-CART-COUPON-007 | One coupon per order. No stacking. | Must Have | None |
| RULE-COM-CART-COUPON-008 | `perUserLimit` enforced by counting `couponUsages` rows for `{couponId, userId}`. `usageLimit` enforced by total count for `couponId`. Both checks run within the `placeOrder` transaction for OCC protection. | Must Have | None |
| RULE-COM-CART-COUPON-009 | Coupon MVP applies to Pay Later orders only. `computeCouponDiscount` must be a standalone reusable function for future Razorpay integration. | Must Have | None |

---

## 11. Non-functional Requirements

| Category | Requirement | Target |
|---|---|---|
| Performance | `validateCoupon` query response time | < 300ms on a standard Convex query (on-demand, not subscription) |
| Performance | Cart total recalculation on coupon apply/remove | Instant — local Zustand update, no network round-trip |
| Mobile | All coupon UI elements (input, error, discount line, toast) responsive on mobile | Works on 375px viewport |
| Mobile | Coupon input and Apply button accessible on mobile keyboard | No layout shift on keyboard open |
| Accessibility | Coupon input field has visible label and aria-label | WCAG 2.1 AA |
| Accessibility | Error messages are announced by screen readers | `aria-live="polite"` on error container |
| Error Handling | `placeOrder` coupon errors surface as user-friendly messages in cart/checkout UI | Specific message per error code (see REQ-006) |
| Error Handling | Admin coupon form validation errors shown inline before submission | Per-field validation, not post-submission only |
| Offline Behavior | Cart coupon state persisted in Zustand/localStorage | Coupon applied state survives page reload in same session |
| Security | `validateCoupon` requires authenticated session — no anonymous coupon probing | Unauthenticated calls return auth error, not coupon data |
| Security | `placeOrder` coupon validation uses server-side `userId` only — no userId from client | Per Nuemart no-userId-from-frontend rule |
| Concurrency | `placeOrder` mutation handles concurrent usage-limit exhaustion via Convex OCC | No over-redemption beyond `usageLimit` |

---

## 12. Acceptance Criteria

| AC ID | Requirement | Criterion | Test Type |
|---|---|---|---|
| AC-COM-CART-COUPON-001 | REQ-001 | Admin submits valid coupon form → coupon appears in coupon list with correct values | Happy Path |
| AC-COM-CART-COUPON-002 | REQ-001 | Admin submits coupon without maximumDiscount → form error "Maximum discount cap is required" | Error Path |
| AC-COM-CART-COUPON-003 | REQ-002 | Admin navigates to `/admin/coupons` → sees table with code, discount %, max cap, min cart, dates, status, usage | Happy Path |
| AC-COM-CART-COUPON-004 | REQ-002 | No coupons exist → empty state message shown | Edge Case |
| AC-COM-CART-COUPON-005 | REQ-003 | Admin edits coupon discount value → saved change reflected in list | Happy Path |
| AC-COM-CART-COUPON-006 | REQ-003 | Admin edits coupon with duplicate code → error "Coupon code must be unique" | Error Path |
| AC-COM-CART-COUPON-007 | REQ-004 | Admin toggles coupon to Inactive → customer `validateCoupon` returns `COUPON_INACTIVE` | Happy Path |
| AC-COM-CART-COUPON-008 | REQ-004 | Admin toggles coupon back to Active → customer can apply it again | Edge Case |
| AC-COM-CART-COUPON-009 | REQ-005 | Customer enters valid coupon in cart → `Coupon discount: −₹65` shown; total updates to ₹585 (example: WELCOME10 on ₹650 cart) | Happy Path |
| AC-COM-CART-COUPON-010 | REQ-005 | Customer clicks Remove coupon → discount line removed; total reverts to pre-discount value | Happy Path |
| AC-COM-CART-COUPON-011 | REQ-006 | Customer enters non-existent code → inline error "This coupon code does not exist." | Error Path |
| AC-COM-CART-COUPON-012 | REQ-006 | Customer enters expired coupon → inline error "This coupon has expired." | Error Path |
| AC-COM-CART-COUPON-013 | REQ-007 | Customer has coupon applied; removes item; subtotal drops below minimumOrderValue → coupon auto-removed + toast shown | Happy Path |
| AC-COM-CART-COUPON-014 | REQ-007 | Cart auto-remove fires immediately on item removal — not deferred to checkout | Edge Case |
| AC-COM-CART-COUPON-015 | REQ-008 | Order placed without coupon → `discountAmount` = 0 or absent; `total = subtotal + deliveryFee`; existing order flow unchanged | Regression |
| AC-COM-CART-COUPON-016 | REQ-008 | Order placed with valid coupon; coupon expires between cart and placeOrder → `placeOrder` returns `COUPON_EXPIRED`; UI shows error; no order written | Error Path |
| AC-COM-CART-COUPON-017 | REQ-009 | `coupons` table and `couponUsages` table present in deployed Convex schema | Technical |
| AC-COM-CART-COUPON-018 | REQ-009 | Existing order records (pre-coupon) load correctly — new optional fields absent, no errors | Regression |
| AC-COM-CART-COUPON-019 | REQ-010 | WELCOME10 coupon (10%, max ₹100) on ₹650 cart: `discountAmount = ₹65`, `total = ₹650 − ₹65 + delivery` | Happy Path |
| AC-COM-CART-COUPON-020 | REQ-010 | Coupon 50% max ₹30 on ₹50 cart: computed = ₹25, clamped to max ₹25 (< cap ₹30); `total = ₹50 − ₹25 + delivery` | Edge Case |
| AC-COM-CART-COUPON-021 | REQ-011 | Admin coupon list shows usage count `3 / 10` after 3 redemptions of a 10-use coupon | Happy Path |
| AC-COM-CART-COUPON-022 | REQ-012 | Customer proceeds to checkout with coupon → checkout summary shows `Coupon discount: −₹65` | Should Have |
| AC-COM-CART-COUPON-023 | REQ-013 | Customer views past order with coupon → order detail shows `Coupon (WELCOME10): −₹65` | Nice to Have |
| AC-COM-CART-COUPON-024 | REQ-014 | Admin views order with coupon → order detail shows coupon code, discount type, value, and amount from snapshot fields | Nice to Have |

---

## 13. Out of Scope

| # | Out-of-Scope Item | Rationale | Future Candidate? |
|---|---|---|---|
| 1 | Fixed-amount coupons (`discountType: "fixed"`, e.g. ₹50 off) | Explicitly deferred to Phase 2 by Product Owner. Schema model supports it without redesign (`discountType` is an enum). DEFERRED-COM-CART-COUPON-FIXED-001 created. | YES — DEFERRED-COM-CART-COUPON-FIXED-001 |
| 2 | Multi-coupon stacking (applying more than one coupon per order) | Adds significant complexity (rule conflicts, ordering, sum limits). One coupon per order is sufficient for MVP use cases. | YES — post-MVP enhancement |
| 3 | Razorpay payment integration with coupon discount | Razorpay integration is Phase 11 (merchant account approval pending). Coupon MVP is Pay Later only. Forward dependency documented in DEP-COM-CART-COUPON-RAZORPAY-001. `computeCouponDiscount` function is reusable for Phase 11. | YES — Phase 11 |
| 4 | Coupon analytics dashboard (redemption rates, discount volume, revenue impact) | Post-MVP measurement. Transactional data is captured in `couponUsages`; analytics can be built after MVP launch. | YES — Measurement plan post-release |
| 5 | Customer-facing coupon discovery (public listing, coupon page) | Coupons are distributed via marketing channels (email, WhatsApp). No in-app coupon browser needed for MVP. | YES — post-MVP |
| 6 | Bulk coupon import via CSV | Admin creates coupons one by one in MVP. Bulk import is a workflow optimisation for future. | YES — post-MVP |
| 7 | Coupon codes for unauthenticated / guest customers | Nuemart requires account login for cart and checkout. No guest checkout in scope. `validateCoupon` is authenticated-only. | NO — no guest checkout planned |
| 8 | Percentage coupons with no maximum discount cap | Explicitly a business rule requirement: max cap is mandatory for all percentage coupons. Uncapped percentage discounts are a financial risk. | NO — not a future candidate |

---

## 14. Decision Log

| Decision ID | Decision Statement | Made By | Date | Rationale |
|---|---|---|---|---|
| DECISION-ORD-AMOUNT-FIELDS-001 | Keep existing `subtotal` and `total` fields on `orders` unchanged. Add `discountAmount` and coupon snapshot fields as new optional fields. No rename. No migration. | Product Owner | 2026-06-25 | Renaming live fields risks migration failure on production order records. Additive approach has zero migration risk. |
| DEC-001 | Percentage-only coupons in MVP. `discountType = "percentage"`. `maximumDiscount` required. Fixed-amount deferred to Phase 2. | Product Owner | 2026-06-25 | Fixed-amount coupons add complexity. Schema model (string enum) supports future addition without redesign. |
| DEC-002 | MVP coupon validity uses both `startsAt` and `expiresAt`. Active/Inactive toggle retained alongside dates. | Product Owner | 2026-06-25 | Toggle alone insufficient for time-bound campaigns. `startsAt` is a new field vs DATA_ENTITY_MAP — added to schema. |
| DEC-003 | Coupon auto-removed client-side (Zustand) with toast when cart drops below minimum. Error not deferred to checkout. | Product Owner | 2026-06-25 | Deferring error to checkout harms UX. Immediate auto-remove + toast is the expected mobile commerce pattern. |
| DEC-005 | Coupon MVP ships before Razorpay Phase 11. Pay Later orders only in MVP. `computeCouponDiscount` must be a reusable function. | Product Owner | 2026-06-25 | Razorpay merchant approval pending. Coupon is independent. Reusability avoids duplication when Phase 11 ships. |

---

## 15. Open Questions

None. All questions resolved during intake grilling and impact assessment.

---

## 16. Future Considerations

| Item | Source | Priority |
|---|---|---|
| Fixed-amount coupons (`discountType: "fixed"`) | Product Owner DEC-001; DEFERRED-COM-CART-COUPON-FIXED-001 | Phase 2 |
| Razorpay integration: pass `order.total` to Razorpay payment | DEC-005; DEP-COM-CART-COUPON-RAZORPAY-001 | Phase 11 |
| Coupon redemption analytics: rate, volume, top codes | Measurement plan need | Post-MVP |
| Multi-coupon stacking | Customer UX future | Post-MVP |
| Customer-facing coupon discovery page | Marketing future | Post-MVP |
| Admin CSV bulk coupon import | Admin workflow future | Post-MVP |
| Coupon usage per-customer report in admin | Operations need | Post-MVP |

---

## 17. Technical Design Notes

### Convex OCC Race Condition Mitigation (RSK-COM-CART-COUPON-002)

The `placeOrder` mutation must read `couponUsages` counts and write the new `couponUsage` row within the same Convex transaction. Convex's OCC mechanism will detect conflicting concurrent mutations that touch the same data and retry the second one with fresh data — at which point the usage limit will be correctly exhausted.

Engineering Lead must review the transaction scope during G4 schema review.

### placeOrder Extension Pattern (RSK-COM-CART-COUPON-001)

Recommended pattern — do not inline coupon logic into the existing `placeOrder` body:

```typescript
// In placeOrder mutation:
const discountAmount = couponCode
  ? await validateAndApplyCoupon(ctx, couponCode, subtotal)  // throws typed error or returns amount
  : 0;

const total = subtotal - discountAmount + deliveryFee;
```

`validateAndApplyCoupon` is an internal async function that:
1. Fetches coupon by code
2. Validates all rules (active, dates, per-user usage, global usage, minimum)
3. Returns `discountAmount`

Non-coupon order path: `couponCode = undefined` → `discountAmount = 0` → `total = subtotal + deliveryFee` (identical to current behavior).

### Security: No userId From Frontend

`validateCoupon` must resolve the current user server-side:
```typescript
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Not authenticated");
const user = await ctx.db.query("users")
  .withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier))
  .first();
```

No `userId` argument accepted from the client.

### Reusability for Razorpay Phase 11 (DEP-COM-CART-COUPON-RAZORPAY-001)

`computeCouponDiscount` must be a standalone pure function in a shared utility file (e.g., `convex/utils/coupon.ts`). Phase 11 Razorpay integration will read `order.total` from the `orders` table — the already-computed post-discount total — and pass it to Razorpay's order creation API. No duplicate calculation needed in Phase 11.

---

## 18. AI Reasoning Notes

**Generated by:** `/product-prd` (Product OS V2)
**Upstream inputs used:**
- REQUEST-COM-CART-COUPON-001 (v1.3) — all 5 grilling questions answered; DEC-001 through DEC-005 confirmed
- DECISION-ORD-AMOUNT-FIELDS-001 — Option B (additive orders fields)
- IMPACT-COM-CART-COUPON-001 — 12-category blast-radius assessment; overall severity Critical; 5 risks identified
- `convex/schema.ts` — live schema read; confirmed existing orders fields (`subtotal`, `total`, `deliveryFee`)

**Key derivations:**
- Cart architecture confirmed Zustand/localStorage (not Convex) — auto-remove logic is client-side only
- `startsAt` added to coupons schema (not in DATA_ENTITY_MAP future candidate)
- Technical design section added for 3 critical risks (RSK-001, RSK-002, RSK-004)
- `computeCouponDiscount` reusable function specified to satisfy DEP-COM-CART-COUPON-RAZORPAY-001

---

## 19. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Initial draft via /product-prd |

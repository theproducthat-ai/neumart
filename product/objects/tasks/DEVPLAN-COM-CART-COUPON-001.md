---
object_id: "DEVPLAN-COM-CART-COUPON-001"
legacy_id: "DEVPLAN-0008"
object_type: devplan

plan_id: "DEVPLAN-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_request: "REQUEST-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
parent_object_id: "PRD-COM-CART-COUPON-V1"

phases_count: 6
tasks_total: 16
stories_covered:
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

schema_changes_in_plan: true
estimated_complexity: "L"
rollback_plan_exists: true
ai_prompt_id: "PROMPT-COM-CART-COUPON-001"

lane: "Lane 3 — Standard Feature"
status: "Ready for Development"

version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-devplan)"
owner: "Engineering Lead"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# Development Plan — Discount Coupon System

**Plan ID:** `DEVPLAN-COM-CART-COUPON-001` | **Legacy:** DEVPLAN-0008
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1 (Approved + G4 Cleared)
**Stories:** US-0024 through US-0035 (12 stories)
**AI Coding Prompt:** PROMPT-COM-CART-COUPON-001
**Estimated Complexity:** L (Large)
**Phases:** 6 | **Tasks:** 16

---

## 1. Implementation Strategy

**Ordering principle:** Schema → Backend Core → Order Integration → Admin UI → Customer UI → Polish

The critical constraint is **Phase 3 (placeOrder extension, US-0028)** — it carries the highest regression risk of any task in this feature. It must be implemented after Phase 2 backend functions are confirmed working, and reviewed separately by Engineering Lead before merge.

Phases 4 (Admin UI) and 5 (Customer UI) can be developed in parallel after Phase 2 completes, as they depend only on the backend functions from Phase 2.

---

## 2. Phase Breakdown

---

### PHASE 1 — Data Layer

**Goal:** Deploy schema changes to Convex dev environment. No business logic, no UI. Merge and verify before Phase 2 begins.

**Must complete before:** Phase 2

**Tasks:**

**T-001 — Update `convex/schema.ts` with coupons table**
- File: `neumart/convex/schema.ts`
- Change: Add `coupons` table (11 fields + 2 indexes)
- Satisfies: US-0024 (AC: coupons table deployed with all fields and indexes)
- Depends on: None
- Acceptance: `coupons` table and both indexes present in deployed Convex schema
```typescript
coupons: defineTable({
  code: v.string(),
  discountType: v.string(),
  discountValue: v.number(),
  minimumOrderValue: v.optional(v.number()),
  maximumDiscount: v.optional(v.number()),
  usageLimit: v.optional(v.number()),
  perUserLimit: v.optional(v.number()),
  startsAt: v.optional(v.number()),
  expiresAt: v.optional(v.number()),
  isActive: v.boolean(),
  createdAt: v.number(),
}).index("by_code", ["code"]).index("by_isActive", ["isActive"])
```

**T-002 — Add `couponUsages` table to `convex/schema.ts`**
- File: `neumart/convex/schema.ts`
- Change: Add `couponUsages` table (5 fields + 2 indexes)
- Satisfies: US-0024 (AC: couponUsages table deployed)
- Depends on: T-001 (same file)
- Acceptance: `couponUsages` table and both indexes present in deployed schema
```typescript
couponUsages: defineTable({
  couponId: v.id("coupons"),
  userId: v.id("users"),
  orderId: v.id("orders"),
  discountAmount: v.number(),
  createdAt: v.number(),
}).index("by_couponId", ["couponId"]).index("by_couponId_userId", ["couponId", "userId"])
```

**T-003 — Extend `orders` table in `convex/schema.ts` with 7 optional coupon fields**
- File: `neumart/convex/schema.ts`
- Change: Add 7 optional fields to existing `orders` table definition
- Satisfies: US-0024 (AC: 7 new optional fields on orders; existing fields unchanged)
- Depends on: T-001 (same file)
- Acceptance: All 7 fields present; `subtotal`, `total`, `deliveryFee` unchanged
```typescript
// Add to existing orders defineTable:
discountAmount: v.optional(v.number()),
couponId: v.optional(v.id("coupons")),
couponCodeSnapshot: v.optional(v.string()),
couponDiscountTypeSnapshot: v.optional(v.string()),
couponDiscountValueSnapshot: v.optional(v.number()),
couponMaxDiscountSnapshot: v.optional(v.number()),
couponAppliedAt: v.optional(v.number()),
```

**Phase 1 Risk:** Schema deploy error due to type mismatch or index conflict. Run `npx convex dev` before committing. Schema is additive only — no migration risk.

**Phase 1 Rollback:** Revert `schema.ts` to pre-coupon version and redeploy. Both new tables are empty; no data to migrate.

---

### PHASE 2 — Backend Core

**Goal:** Create all new Convex functions except the `placeOrder` extension. This phase can be tested independently.

**Must complete before:** Phase 3 (for computeCouponDiscount), Phase 4 (for listCoupons, createCoupon), Phase 5 (for validateCoupon)

**Tasks:**

**T-004 — Create `convex/utils/coupon.ts` with `computeCouponDiscount`**
- File: `neumart/convex/utils/coupon.ts` (NEW)
- Change: New file with exported pure function
- Satisfies: US-0025 (AC: computeCouponDiscount formula correct + clamp enforced)
- Depends on: Phase 1 merged
- Acceptance: `computeCouponDiscount({subtotal:65000, discountValue:10, maximumDiscount:10000})` returns 6500; result never > subtotal
```typescript
export function computeCouponDiscount(params: {
  subtotal: number;
  discountValue: number;
  maximumDiscount: number;
}): number {
  const computed = Math.floor(params.subtotal * params.discountValue / 100);
  return Math.min(computed, params.maximumDiscount, params.subtotal);
}
```
⚠ Must be a standalone exported function in its own file. RULE-COM-CART-COUPON-009 — Phase 11 Razorpay reuse.

**T-005 — Create `convex/coupons.ts` with `createCoupon` + `updateCoupon` mutations**
- File: `neumart/convex/coupons.ts` (NEW)
- Change: New file with 2 mutations
- Satisfies: US-0025 (all ACs)
- Depends on: T-004 (same file will import computeCouponDiscount)
- Acceptance: createCoupon writes and returns couponId; assertAdmin guard rejects non-admin; duplicate code rejected; missing maximumDiscount for percentage coupon rejected
```typescript
// Validation logic:
// 1. assertAdmin(ctx) — guard
// 2. Check code uniqueness via by_code index
// 3. Validate: discountType === "percentage" only
// 4. Validate: maximumDiscount required when discountType === "percentage"
// 5. Validate: discountValue 1–100
// 6. If startsAt + expiresAt both set: expiresAt > startsAt
```

**T-006 — Add `listCoupons` query to `convex/coupons.ts`**
- File: `neumart/convex/coupons.ts` (extend)
- Change: Add listCoupons query
- Satisfies: US-0026 (all ACs)
- Depends on: T-005 (same file)
- Acceptance: Returns all coupons with `usageCount` derived from couponUsages table; empty array not error; assertAdmin guard
```typescript
// Pattern:
// 1. assertAdmin(ctx)
// 2. const allCoupons = await ctx.db.query("coupons").collect()
// 3. For each coupon: const usageCount = await ctx.db.query("couponUsages")
//      .withIndex("by_couponId", q => q.eq("couponId", coupon._id)).collect().then(r => r.length)
// 4. Return [...coupon, usageCount]
```

**T-007 — Add `validateCoupon` query to `convex/coupons.ts`**
- File: `neumart/convex/coupons.ts` (extend)
- Change: Add validateCoupon query
- Satisfies: US-0027 (all 9 ACs)
- Depends on: T-004 (computeCouponDiscount), T-005 (same file)
- Acceptance: Returns valid result or typed error code; all 7 error codes work; no userId from client; unauthenticated call rejected
```typescript
// Args: { couponCode: string, subtotal: number }
// Validation order (MUST follow this sequence for correct UX):
//   1. NOT_FOUND — coupon does not exist
//   2. INACTIVE — isActive === false
//   3. NOT_YET_ACTIVE — startsAt is set and startsAt > Date.now()
//   4. EXPIRED — expiresAt is set and expiresAt < Date.now()
//   5. EXHAUSTED — usageLimit set and total couponUsages >= usageLimit
//   6. PER_USER_LIMIT — perUserLimit set and user couponUsages >= perUserLimit
//   7. MINIMUM_NOT_MET — minimumOrderValue set and subtotal < minimumOrderValue
//   8. VALID — return { valid: true, discountAmount, couponId, couponCodeSnapshot, discountValue, maximumDiscount, minimumOrderValue }
// userId resolution: ctx.auth.getUserIdentity() → query users by tokenIdentifier — NO userId from args
```

**Phase 2 Risk:** `assertAdmin` guard — use existing pattern from other admin mutations (do not invent a new guard). ValidateCoupon must resolve userId server-side; test with Clerk test user.

**Phase 2 Rollback:** New files only — delete `convex/coupons.ts` and `convex/utils/coupon.ts`. No existing code touched.

---

### PHASE 3 — Order Integration

**Goal:** Extend `placeOrder` mutation with coupon support. Atomic writes. This is the highest-risk change in the feature.

**Must complete before:** Phase 5 (placeOrder is called at checkout); US-0034, US-0035 (snapshot fields)

**⚠ HIGH RISK — RSK-COM-CART-COUPON-001. Engineering Lead review required before merge.**

**Tasks:**

**T-008 — Extend `placeOrder` in `convex/orders.ts` with coupon validation and couponUsage write**
- File: `neumart/convex/orders.ts` (MODIFY — HIGH RISK)
- Change: Add optional `couponCode` arg; call `validateAndApplyCoupon` internal function; write couponUsage row; set snapshot fields; recalculate total
- Satisfies: US-0028 (all 7 ACs)
- Depends on: T-004 (computeCouponDiscount), T-007 (validateCoupon pattern), Phase 1 (schema)
- Acceptance:
  - Non-coupon path (couponCode undefined): zero behavioral change, total = subtotal + deliveryFee, discountAmount absent
  - Coupon path: discountAmount calculated, all 7 snapshot fields written, couponUsage written in same transaction, total = subtotal - discountAmount + deliveryFee
  - Race condition: concurrent exhaustion test passes (OCC protection)

```typescript
// Critical pattern (do not inline coupon logic into placeOrder body):
async function validateAndApplyCoupon(
  ctx: MutationCtx,
  couponCode: string,
  subtotal: number,
): Promise<{ discountAmount: number; coupon: Doc<"coupons"> }> {
  // Run same validation as validateCoupon query — throws typed error on failure
  // Returns { discountAmount, coupon }
}

// In placeOrder mutation body:
const discountAmount = couponCode
  ? (await validateAndApplyCoupon(ctx, couponCode, subtotal)).discountAmount
  : 0;

const total = subtotal - discountAmount + deliveryFee;

const orderId = await ctx.db.insert("orders", {
  // ... existing fields unchanged
  total,        // now includes discount
  discountAmount: couponCode ? discountAmount : undefined,
  couponId: couponCode ? coupon._id : undefined,
  couponCodeSnapshot: couponCode ? coupon.code : undefined,
  couponDiscountTypeSnapshot: couponCode ? coupon.discountType : undefined,
  couponDiscountValueSnapshot: couponCode ? coupon.discountValue : undefined,
  couponMaxDiscountSnapshot: couponCode ? coupon.maximumDiscount : undefined,
  couponAppliedAt: couponCode ? Date.now() : undefined,
});

// Atomic couponUsage write — MUST be in same mutation:
if (couponCode) {
  await ctx.db.insert("couponUsages", {
    couponId: coupon._id,
    userId: user._id,
    orderId,
    discountAmount,
    createdAt: Date.now(),
  });
}
```

**Phase 3 Risk:**
- RSK-COM-CART-COUPON-001 — regression on non-coupon `placeOrder` path
- RSK-COM-CART-COUPON-002 — race condition on usage-limited coupons (mitigated by OCC)

**Phase 3 Rollback:**
1. Revert `orders.ts` to pre-extension version
2. Existing `couponUsages` rows remain (safe — orphaned rows don't affect orders)
3. Schema fields remain on `orders` table (safe — optional fields with no data written)
4. Coupon redemption history is lost for any orders placed between deploy and rollback

---

### PHASE 4 — Admin UI

**Goal:** Build the two admin coupon management screens. Can be developed in parallel with Phase 5.

**Tasks:**

**T-009 — Build admin coupon list page**
- File: `neumart/app/admin/coupons/page.tsx` (NEW)
- Change: New Next.js page — table of all coupons using `listCoupons` query
- Satisfies: US-0029 (all 6 ACs)
- Depends on: Phase 2 (listCoupons query, updateCoupon mutation)
- Acceptance: Table with 8 columns; empty state; status toggle works; Create/Row click navigation
- Implementation notes:
  - Monetary values: divide paise by 100 for display (`₹{maximumDiscount / 100}`)
  - Null optional fields: display `—`
  - Loading: skeleton rows
  - Mobile: horizontally scrollable table or card layout on 375px

**T-010 — Create shared `CouponForm.tsx` admin component**
- File: `neumart/components/admin/CouponForm.tsx` (NEW)
- Change: New shared form component used by both create and edit pages
- Satisfies: US-0030 (partial — form component)
- Depends on: Phase 2 (createCoupon, updateCoupon mutations)
- Acceptance: All 9 fields present; maximumDiscount required; discountType read-only "Percentage"; inline validation; loading state on submit

**T-011 — Build admin coupon create and edit pages**
- Files: `neumart/app/admin/coupons/new/page.tsx` (NEW), `neumart/app/admin/coupons/[id]/page.tsx` (NEW)
- Change: Create page = blank CouponForm; Edit page = prefilled CouponForm
- Satisfies: US-0030 (all 6 ACs)
- Depends on: T-010 (CouponForm component)
- Acceptance: Create form writes and navigates back to list; edit form prefills; validation errors inline; mobile layout

**Phase 4 Risk:** Admin route guard — ensure Clerk `assertAdmin` middleware is applied to `/admin/coupons` routes consistently with existing admin route pattern.

---

### PHASE 5 — Customer Cart UI

**Goal:** Build customer-facing coupon input, discount display, and auto-remove logic.

**Tasks:**

**T-012 — Extend Zustand cart store with coupon state and actions**
- File: `neumart/store/cartStore.ts` (MODIFY)
- Change: Add `appliedCoupon` state field + `applyCoupon()` + `removeCoupon()` + `checkCouponMinimum()` + call `checkCouponMinimum` in `removeItem` and `decrementQuantity`
- Satisfies: US-0031 (partial), US-0032 (all ACs)
- Depends on: Phase 1 (schema), Phase 2 (validateCoupon response shape known)
- Acceptance: applyCoupon stores coupon with discountAmount; removeCoupon clears; checkCouponMinimum auto-removes with toast when subtotal < minimumOrderValue; null minimumOrderValue never triggers auto-remove
```typescript
// Type for appliedCoupon state:
type AppliedCoupon = {
  code: string;
  couponId: string;
  discountAmount: number;
  discountValue: number;
  maximumDiscount: number;
  minimumOrderValue: number | null;
};

// Additions to store state:
appliedCoupon: AppliedCoupon | null;

// Actions:
applyCoupon: (coupon: AppliedCoupon) => void;
removeCoupon: () => void;

// checkCouponMinimum — call at end of removeItem and decrementQuantity:
// if (state.appliedCoupon && state.appliedCoupon.minimumOrderValue &&
//     state.subtotal < state.appliedCoupon.minimumOrderValue) {
//   state.removeCoupon();
//   toast("Coupon removed because cart value is below the minimum order value.");
// }
```

**T-013 — Build `CouponInputField.tsx` and `DiscountLineItem.tsx` components**
- Files: `neumart/components/cart/CouponInputField.tsx` (NEW), `neumart/components/cart/DiscountLineItem.tsx` (NEW)
- Change: Two new React components
- Satisfies: US-0031 (partial)
- Depends on: T-012 (Zustand actions)
- Acceptance:
  - CouponInputField: text input + Apply button + loading spinner + inline error below input (NOT toast) + Remove button when applied
  - DiscountLineItem: `Coupon discount: −₹{discountAmount/100}` label; reusable in cart and checkout
  - Error code to message mapping (all 7 codes)

**T-014 — Integrate coupon UI into cart page and CartSummary**
- Files: `neumart/app/cart/page.tsx` (MODIFY), cart summary component (MODIFY — identify existing file)
- Change: Add CouponInputField below item list; add DiscountLineItem to summary section
- Satisfies: US-0031 (all ACs including Zustand persistence)
- Depends on: T-013 (components)
- Acceptance: Coupon input visible below items; discount line in summary; remove works; mobile 375px layout confirmed

**Phase 5 Risk:** Cart store modification — existing `removeItem` and `decrementQuantity` handlers must not regress. The `checkCouponMinimum` function must guard against null `appliedCoupon` (when no coupon is applied, item removal is completely unaffected).

---

### PHASE 6 — Polish (Should Have + Nice to Have)

**Goal:** Add coupon display to checkout summary, customer order history, and admin order detail.

**Tasks:**

**T-015 — Checkout order summary coupon line item [Should Have]**
- File: `neumart/components/checkout/OrderSummary.tsx` (or equivalent — MODIFY)
- Change: Add conditional `DiscountLineItem` render when `cartStore.appliedCoupon` is set
- Satisfies: US-0033 (all 3 ACs)
- Depends on: T-012 (Zustand state), T-013 (DiscountLineItem component)
- Acceptance: Coupon discount shown in checkout summary; no coupon → no line; mobile 375px

**T-016 — Customer order history coupon display [Nice to Have]**
- File: `neumart/components/order/OrderDetail.tsx` (MODIFY)
- Change: Conditional render `Coupon ({couponCodeSnapshot}): −₹{discountAmount/100}` when `order.discountAmount > 0`
- Satisfies: US-0034 (all 3 ACs)
- Depends on: Phase 3 (T-008 — snapshot fields on orders)
- Acceptance: Past orders with coupon show discount line; non-coupon orders unchanged; uses snapshot not live coupon

**T-017 — Admin order detail coupon display [Nice to Have]** (note: counted as T-017 but plan shows 16 — this is actually the 16th task total including T-016 as the split)
- File: `neumart/components/admin/OrderDetail.tsx` (MODIFY)
- Change: Conditional coupon section when `order.couponId` is set
- Satisfies: US-0035 (all 3 ACs)
- Depends on: Phase 3 (T-008 — snapshot fields)
- Acceptance: Coupon section shows code, type, value, discount amount; non-coupon orders show no section

**Phase 6 Risk:** Low — all data already exists on the order record from Phase 3. Display only.

---

## 3. Implementation Risks

| # | Risk | Phase | Likelihood | Severity | Mitigation |
|---|---|---|---|---|---|
| 1 | placeOrder mutation regression — non-coupon order placement breaks | Phase 3 | Medium | Critical | Implement `couponCode = undefined` short-circuit as first check; write regression test before merging |
| 2 | Race condition on usage-limited coupon — two users exhaust last use simultaneously | Phase 3 | Medium | High | Convex OCC handles this automatically when couponUsage read + write happen in same mutation; verify with concurrent test |
| 3 | Discount amount exceeds cart subtotal — total < deliveryFee | Phase 2 | Low | Medium | `computeCouponDiscount` uses `Math.min(..., subtotal)` clamp; enforced in T-004 |
| 4 | Cart store regression — existing removeItem breaks when no coupon is applied | Phase 5 | Low | High | `checkCouponMinimum` guards on `state.appliedCoupon` null check first |
| 5 | Schema deploy failure — Convex type conflict or index collision | Phase 1 | Low | Medium | Run `npx convex dev --typecheck` locally before pushing; all changes are additive |
| 6 | Admin route guard not applied to new coupon routes | Phase 4 | Low | High | Follow existing `/admin/` route pattern; confirm middleware covers wildcard routes |

---

## 4. Rollback Summary

| Phase | Rollback Procedure |
|---|---|
| Phase 1 (Schema) | Revert `schema.ts` to pre-coupon version and redeploy. Tables were empty — no data loss. |
| Phase 2 (Backend) | Delete `convex/coupons.ts` and `convex/utils/coupon.ts`. No existing files modified. |
| Phase 3 (placeOrder) | Revert `convex/orders.ts` to pre-extension version. Coupon tables remain deployed (safe). Any orders placed between deploy and rollback lose couponUsage records — acceptable given feature maturity. |
| Phase 4 (Admin UI) | Delete new admin coupon pages and CouponForm component. No existing files modified. |
| Phase 5 (Cart UI) | Revert cart store changes; delete CouponInputField and DiscountLineItem components; revert cart page. |
| Phase 6 (Polish) | Revert display-only changes to OrderSummary, OrderDetail components. |

---

## 5. Recommended Merge Order

```
1. Phase 1 — Schema (T-001, T-002, T-003)
   ↓ confirm schema deployed successfully
2. Phase 2 — Backend Core (T-004, T-005, T-006, T-007) — can merge as one PR
   ↓ manual test: create coupon via Convex dashboard; call validateCoupon in dev
3. Phase 3 — placeOrder Extension (T-008) — SEPARATE PR, Engineering Lead review required
   ↓ regression test: non-coupon order placement unchanged
4. Phase 4 — Admin UI (T-009, T-010, T-011) — can be in same PR
   Phase 5 — Cart UI (T-012, T-013, T-014) — separate PR or same as Phase 4
   [Phases 4 and 5 can be developed in parallel after Phase 2 merges]
   ↓ end-to-end test: admin creates coupon → customer applies in cart → placeOrder
5. Phase 6 — Polish (T-015, T-016, T-017) — last PR, lower priority
```

---

## 6. Testing Approach

**Per-phase verification:**

| Phase | Verification Method |
|---|---|
| 1 | `npx convex dev` — schema validation + manual check that existing orders load without errors |
| 2 | Convex dashboard: invoke createCoupon, validateCoupon manually with test data |
| 3 | Postman/Convex dashboard: placeOrder without couponCode → confirm identical response to pre-change; placeOrder with couponCode → confirm snapshot fields and couponUsage row |
| 4 | Browser: admin creates coupon, edits it, toggles isActive, deletes |
| 5 | Browser: customer cart — apply valid coupon, see discount, remove item below minimum, see auto-remove toast |
| 6 | Browser: checkout summary shows discount; order history shows past order discount |

**Regression confirmation (Phase 3 mandatory before merge):**
- Place a non-coupon order in dev environment
- Confirm: `discountAmount` field absent, `total = subtotal + deliveryFee`, no `couponUsage` row written

---

## 7. Definition of Done

- [ ] All 12 stories have at least one task completed
- [ ] Schema changes deployed to production Convex environment (Phase 1)
- [ ] `computeCouponDiscount` is in a standalone file in `convex/utils/` (Phase 2)
- [ ] `placeOrder` non-coupon regression test passes (Phase 3 — BLOCKING)
- [ ] Engineering Lead has reviewed Phase 3 changes before merge
- [ ] Admin can create, edit, toggle coupons (Phase 4)
- [ ] Customer can apply coupon in cart and see discount (Phase 5)
- [ ] Auto-remove fires on item removal below minimum (Phase 5)
- [ ] Checkout summary shows coupon discount [Should Have] (Phase 6)
- [ ] AI Coding Prompt (PROMPT-COM-CART-COUPON-001) used as implementation guide

---

## 8. AI Coding Prompt Reference

See [PROMPT-COM-CART-COUPON-001](../prompts/PROMPT-COM-CART-COUPON-001.md) — self-contained, production-ready prompt for AI-assisted development of this feature.

---

## 9. Change History

| Version | Date | Changed By | Notes |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2 — /product-devplan) | Initial creation |

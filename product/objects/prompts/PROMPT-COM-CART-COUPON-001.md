---
object_id: "PROMPT-COM-CART-COUPON-001"
object_type: prompt

prompt_id: "PROMPT-COM-CART-COUPON-001"
linked_plan: "DEVPLAN-COM-CART-COUPON-001"
linked_feature: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
parent_object_id: "DEVPLAN-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"

tech_stack:
  - "Next.js 14 App Router (TypeScript)"
  - "Convex (serverless backend, typed schema, OCC)"
  - "Clerk (authentication)"
  - "Zustand (client-side cart state)"
  - "ShadCN UI (component library)"
  - "Tailwind CSS"

prompt_version: "1.0"
status: "Ready"
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-devplan)"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# AI Coding Prompt — Discount Coupon System

**Prompt ID:** `PROMPT-COM-CART-COUPON-001`
**Feature:** Discount Coupon System (FEATURE-COM-CART-COUPON)
**Plan:** DEVPLAN-COM-CART-COUPON-001
**Stack:** Next.js App Router · Convex · Clerk · Zustand · ShadCN UI

---

## Context

You are implementing the Discount Coupon System for **Nuemart** — a Next.js + Convex grocery e-commerce app. Nuemart currently has no promotional pricing capability. This feature adds:
- Admin ability to create/manage percentage-based discount coupon codes
- Customer ability to apply a coupon code in the cart and see the discount before checkout
- Server-side validation of coupons at order placement

The work is organized into 6 phases. Implement them in sequence — later phases depend on earlier ones.

**All amounts are stored in paise (₹1 = 100 paise).** Never use floating point — integer arithmetic only.

---

## Stack Specifics

| Layer | Detail |
|---|---|
| Backend | Convex serverless functions in `neumart/convex/` |
| Schema | `neumart/convex/schema.ts` — Convex typed schema |
| Auth | Clerk — `ctx.auth.getUserIdentity()` for server-side identity |
| Admin guard | Existing `assertAdmin(ctx)` function — use it on all admin mutations/queries |
| Cart state | Zustand store at `neumart/store/cartStore.ts` (or equivalent) — NOT Convex |
| UI components | ShadCN UI + Tailwind at `neumart/components/` |
| Admin pages | Next.js App Router at `neumart/app/admin/` |
| Customer pages | Next.js App Router at `neumart/app/` |

**No userId from frontend.** Per Nuemart security rule: never accept a `userId` argument from the client. Resolve user identity server-side only via `ctx.auth.getUserIdentity()`.

---

## PHASE 1 — Schema Changes

**File:** `neumart/convex/schema.ts`

Add the following to the schema export. All changes are additive — do NOT rename or remove any existing fields.

### 1A. New `coupons` table

```typescript
coupons: defineTable({
  code: v.string(),                           // Unique coupon code (e.g. "WELCOME10") — uppercase
  discountType: v.string(),                   // "percentage" only in MVP
  discountValue: v.number(),                  // e.g. 10 (for 10% off)
  minimumOrderValue: v.optional(v.number()),  // Min cart subtotal in paise to use this coupon
  maximumDiscount: v.optional(v.number()),    // Max discount cap in paise (REQUIRED for % coupons)
  usageLimit: v.optional(v.number()),         // Global redemption cap (null = unlimited)
  perUserLimit: v.optional(v.number()),       // Per-customer cap (null = unlimited)
  startsAt: v.optional(v.number()),           // Unix timestamp — when coupon becomes valid
  expiresAt: v.optional(v.number()),          // Unix timestamp — when coupon expires
  isActive: v.boolean(),                      // Admin can deactivate at any time
  createdAt: v.number(),                      // Unix timestamp
})
  .index("by_code", ["code"])
  .index("by_isActive", ["isActive"]),
```

### 1B. New `couponUsages` table

```typescript
couponUsages: defineTable({
  couponId: v.id("coupons"),    // Which coupon was used
  userId: v.id("users"),        // Which user used it
  orderId: v.id("orders"),      // Which order it was applied to
  discountAmount: v.number(),   // Actual discount in paise
  createdAt: v.number(),        // Unix timestamp
})
  .index("by_couponId", ["couponId"])
  .index("by_couponId_userId", ["couponId", "userId"]),
```

### 1C. New optional fields on existing `orders` table

Add these 7 optional fields to the existing `orders` `defineTable(...)` definition. **Do NOT change any existing fields** (`subtotal`, `total`, `deliveryFee`, etc.).

```typescript
discountAmount: v.optional(v.number()),                 // Coupon discount in paise (absent = no coupon)
couponId: v.optional(v.id("coupons")),                  // FK to coupons table
couponCodeSnapshot: v.optional(v.string()),              // Code at time of order placement
couponDiscountTypeSnapshot: v.optional(v.string()),      // "percentage" snapshot
couponDiscountValueSnapshot: v.optional(v.number()),     // % value snapshot
couponMaxDiscountSnapshot: v.optional(v.number()),       // Cap in paise snapshot
couponAppliedAt: v.optional(v.number()),                 // Timestamp
```

**Verify:** Run `npx convex dev` — confirm schema deploys without errors. Confirm existing orders load correctly (new fields are absent on old records — this is expected and valid).

---

## PHASE 2 — Backend Core Functions

### 2A. New file: `neumart/convex/utils/coupon.ts`

```typescript
/**
 * Pure function — standalone export for reuse in placeOrder and future Razorpay Phase 11.
 * All values in paise. Integer arithmetic only.
 */
export function computeCouponDiscount(params: {
  subtotal: number;
  discountValue: number;     // e.g. 10 for 10%
  maximumDiscount: number;   // cap in paise
}): number {
  const computed = Math.floor(params.subtotal * params.discountValue / 100);
  return Math.min(computed, params.maximumDiscount, params.subtotal);
}
```

**Acceptance test:** `computeCouponDiscount({ subtotal: 65000, discountValue: 10, maximumDiscount: 10000 })` must return `6500`.

### 2B. New file: `neumart/convex/coupons.ts`

Implement these 4 functions:

#### `createCoupon` mutation (admin only)

```typescript
// Args: { code, discountType, discountValue, minimumOrderValue?, maximumDiscount?,
//          usageLimit?, perUserLimit?, startsAt?, expiresAt?, isActive }
// Validation:
//   assertAdmin(ctx)
//   discountType must be "percentage" (reject any other value — MVP constraint)
//   maximumDiscount is REQUIRED when discountType === "percentage" — throw if absent
//   discountValue must be 1–100
//   code must be unique — query with by_code index; throw if exists
//   if startsAt && expiresAt: expiresAt > startsAt
// Returns: coupon Id
```

#### `updateCoupon` mutation (admin only)

```typescript
// Args: { id: Id<"coupons">, ...same fields as createCoupon (all optional except id) }
// Validation: same as createCoupon plus:
//   if code is changing: check uniqueness against other coupons (not the same coupon)
// Returns: void
```

#### `listCoupons` query (admin only)

```typescript
// Args: none
// Returns: Array<coupon fields + usageCount: number>
// Pattern:
//   assertAdmin(ctx)
//   const coupons = await ctx.db.query("coupons").collect()
//   for each coupon:
//     const usages = await ctx.db.query("couponUsages")
//       .withIndex("by_couponId", q => q.eq("couponId", coupon._id)).collect()
//     usageCount = usages.length
//   return coupons.map(c => ({ ...c, usageCount }))
// Empty table returns [] (not an error)
```

#### `validateCoupon` query (authenticated customer)

```typescript
// Args: { couponCode: string, subtotal: number }
// Returns: { valid: true, discountAmount, couponId, code, discountValue, maximumDiscount, minimumOrderValue }
//       OR throws with typed error code (use ConvexError or structured return)

// Step 1 — Resolve userId server-side (NEVER from args):
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Not authenticated");
const user = await ctx.db.query("users")
  .withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier))
  .first();
if (!user) throw new Error("User not found");

// Step 2 — Fetch coupon by code:
const coupon = await ctx.db.query("coupons")
  .withIndex("by_code", q => q.eq("code", couponCode))
  .first();

// Step 3 — Validation (MUST follow this order for correct UX):
if (!coupon) throw new ConvexError("COUPON_NOT_FOUND");
if (!coupon.isActive) throw new ConvexError("COUPON_INACTIVE");
if (coupon.startsAt && Date.now() < coupon.startsAt) throw new ConvexError("COUPON_NOT_YET_ACTIVE");
if (coupon.expiresAt && Date.now() > coupon.expiresAt) throw new ConvexError("COUPON_EXPIRED");

if (coupon.usageLimit) {
  const totalUsages = await ctx.db.query("couponUsages")
    .withIndex("by_couponId", q => q.eq("couponId", coupon._id))
    .collect();
  if (totalUsages.length >= coupon.usageLimit) throw new ConvexError("COUPON_EXHAUSTED");
}

if (coupon.perUserLimit) {
  const userUsages = await ctx.db.query("couponUsages")
    .withIndex("by_couponId_userId", q =>
      q.eq("couponId", coupon._id).eq("userId", user._id))
    .collect();
  if (userUsages.length >= coupon.perUserLimit) throw new ConvexError("COUPON_PER_USER_LIMIT");
}

if (coupon.minimumOrderValue && subtotal < coupon.minimumOrderValue) {
  throw new ConvexError(JSON.stringify({
    code: "COUPON_MINIMUM_NOT_MET",
    minimumOrderValue: coupon.minimumOrderValue
  }));
}

// Step 4 — Calculate discount:
const discountAmount = computeCouponDiscount({
  subtotal,
  discountValue: coupon.discountValue,
  maximumDiscount: coupon.maximumDiscount!,
});

return {
  valid: true,
  discountAmount,
  couponId: coupon._id,
  code: coupon.code,
  discountValue: coupon.discountValue,
  maximumDiscount: coupon.maximumDiscount,
  minimumOrderValue: coupon.minimumOrderValue ?? null,
};
```

---

## PHASE 3 — placeOrder Extension

**File:** `neumart/convex/orders.ts`

⚠ **HIGH RISK.** The non-coupon path must be 100% unchanged. Engineering Lead must review before merge.

### Changes to the `placeOrder` mutation:

**1. Add optional arg:**
```typescript
// Existing args: { ... }
// Add:
couponCode: v.optional(v.string()),
```

**2. Add internal `validateAndApplyCoupon` function** (NOT a Convex endpoint — not exported):
```typescript
async function validateAndApplyCoupon(
  ctx: MutationCtx,
  couponCode: string,
  userId: Id<"users">,
  subtotal: number,
): Promise<{ discountAmount: number; coupon: Doc<"coupons"> }> {
  // Run same validation as validateCoupon query
  // Throws typed ConvexError on failure — placeOrder will throw to client
  // On success: returns { discountAmount, coupon }
}
```

**3. Use the pattern (inside placeOrder body):**
```typescript
// Must come BEFORE the order write:
let discountAmount = 0;
let appliedCoupon: Doc<"coupons"> | undefined;

if (args.couponCode) {
  const result = await validateAndApplyCoupon(ctx, args.couponCode, user._id, subtotal);
  discountAmount = result.discountAmount;
  appliedCoupon = result.coupon;
}

// Updated total formula:
const total = subtotal - discountAmount + deliveryFee;

// Write order (add coupon fields conditionally):
const orderId = await ctx.db.insert("orders", {
  // ... all existing fields unchanged ...
  total,                    // now = subtotal - discountAmount + deliveryFee
  // Coupon fields (only set when coupon applied):
  ...(appliedCoupon && {
    discountAmount,
    couponId: appliedCoupon._id,
    couponCodeSnapshot: appliedCoupon.code,
    couponDiscountTypeSnapshot: appliedCoupon.discountType,
    couponDiscountValueSnapshot: appliedCoupon.discountValue,
    couponMaxDiscountSnapshot: appliedCoupon.maximumDiscount,
    couponAppliedAt: Date.now(),
  }),
});

// Write couponUsage atomically — SAME mutation, AFTER order write:
if (appliedCoupon) {
  await ctx.db.insert("couponUsages", {
    couponId: appliedCoupon._id,
    userId: user._id,
    orderId,
    discountAmount,
    createdAt: Date.now(),
  });
}
```

**CRITICAL — regression verification:**
- Before merging: place a non-coupon order in dev. Confirm:
  - `discountAmount` field is absent from the order record (not zero — absent)
  - `total === subtotal + deliveryFee` (identical to pre-change)
  - No `couponUsage` row was written

---

## PHASE 4 — Admin UI

### Page: `/admin/coupons` (`neumart/app/admin/coupons/page.tsx`)

Create this page using the `listCoupons` Convex query. Display a table with these columns:

| Column | Data | Formatting |
|---|---|---|
| Code | `coupon.code` | Monospace badge |
| Discount | `coupon.discountValue%` | e.g. "10% off" |
| Max Cap | `coupon.maximumDiscount` | `₹{val/100}` or `—` |
| Min Cart | `coupon.minimumOrderValue` | `₹{val/100}` or `—` |
| Valid From | `coupon.startsAt` | Formatted date or `—` |
| Valid To | `coupon.expiresAt` | Formatted date or `—` |
| Status | `coupon.isActive` | Toggle switch — calls `updateCoupon` mutation |
| Usage | `coupon.usageCount` | `{n} / {limit}` or `{n} / ∞` |

**Empty state:** "No coupons yet. Create your first coupon." + "Create Coupon" button.

**"Create Coupon" button** → navigate to `/admin/coupons/new`
**Row click** → navigate to `/admin/coupons/[id]`

### Component: `neumart/components/admin/CouponForm.tsx`

Shared form component. Props: `{ initialValues?: CouponFormValues; onSubmit: (values) => Promise<void>; mode: "create" | "edit" }`.

Form fields:
```
Coupon Code         — text, required, max 20 chars, auto-uppercase
Discount Type       — read-only "Percentage" (locked in MVP)
Discount Value (%)  — number, required, 1–100
Max Discount (₹)    — number (enters ₹, converts to paise ×100), REQUIRED
Min Cart Value (₹)  — number (enters ₹, converts to paise ×100), optional
Per-User Limit      — number, optional, positive int
Total Usage Limit   — number, optional, positive int
Valid From          — datetime-local, optional
Valid Until         — datetime-local, optional (must be > Valid From if both set)
Active              — toggle switch
```

Inline error handling: Catch Convex mutation errors, parse error code, show below relevant field.

### Pages: Create + Edit

- **Create** (`/admin/coupons/new`): Blank CouponForm, calls `createCoupon`, navigates to `/admin/coupons` on success with toast "Coupon created."
- **Edit** (`/admin/coupons/[id]`): Fetch coupon by id, prefill CouponForm, calls `updateCoupon`, navigates to list on success with toast "Coupon updated."

---

## PHASE 5 — Customer Cart UI

### Extend Zustand cart store (`neumart/store/cartStore.ts`)

Add to the cart store state and actions:

```typescript
// State:
appliedCoupon: {
  code: string;
  couponId: string;
  discountAmount: number;   // paise
  discountValue: number;    // e.g. 10
  maximumDiscount: number;  // paise
  minimumOrderValue: number | null;
} | null;

// Actions:
applyCoupon: (coupon: AppliedCoupon) => void;
removeCoupon: () => void;
```

**Auto-remove on item removal/decrement:**

At the end of both `removeItem` and `decrementQuantity` Zustand actions, after recalculating subtotal, call:

```typescript
function checkCouponMinimum(get: () => CartState, set: ...) {
  const { appliedCoupon, subtotal } = get();
  if (!appliedCoupon) return;
  if (appliedCoupon.minimumOrderValue && subtotal < appliedCoupon.minimumOrderValue) {
    set(state => { state.appliedCoupon = null; });
    toast("Coupon removed because cart value is below the minimum order value.");
  }
}
```

If `minimumOrderValue` is null, never trigger auto-remove.

### Component: `neumart/components/cart/CouponInputField.tsx`

```
States:
- Default: text input + "Apply" button
- Loading: spinner, input disabled
- Applied: applied code shown + "Remove" button
- Error: inline red text below input (NOT a toast)

Error code → message mapping (ALL 7 must be handled):
  COUPON_NOT_FOUND     → "This coupon code does not exist."
  COUPON_INACTIVE      → "This coupon is no longer active."
  COUPON_EXPIRED       → "This coupon has expired."
  COUPON_NOT_YET_ACTIVE → "This coupon is not yet valid."
  COUPON_EXHAUSTED     → "This coupon has reached its maximum usage limit."
  COUPON_PER_USER_LIMIT → "You have already used this coupon."
  COUPON_MINIMUM_NOT_MET → "Your cart total is below the minimum required for this coupon (₹{amount})."

On "Apply" click:
  1. Call validateCoupon Convex query with { couponCode: input.value, subtotal: cartStore.subtotal }
  2. On success: cartStore.applyCoupon({ code, couponId, discountAmount, ... })
  3. On error: parse error code → show message below input

On "Remove" click:
  cartStore.removeCoupon()
```

### Component: `neumart/components/cart/DiscountLineItem.tsx`

```
Display: "Coupon discount: −₹{discountAmount/100}"
Show applied coupon code next to it: "(WELCOME10)"
Reusable — accept { code: string, discountAmount: number } as props
```

### Integrate into cart page

In the cart page (`neumart/app/cart/page.tsx`):
- Add `<CouponInputField />` below the item list and above the order summary
- In the order summary / totals section: conditionally add `<DiscountLineItem />` when `cartStore.appliedCoupon` is set
- Cart total displayed to user = `subtotal - (appliedCoupon?.discountAmount ?? 0) + deliveryFee`

⚠ Client-computed total is **display only**. Server recalculates at `placeOrder`.

**Pass couponCode to placeOrder:**
When placing an order, pass `couponCode: cartStore.appliedCoupon?.code` to the `placeOrder` mutation. After successful order placement, call `cartStore.removeCoupon()` to clear the applied coupon state.

---

## PHASE 6 — Polish

### Checkout order summary (`neumart/components/checkout/OrderSummary.tsx`) [Should Have]

Conditionally render coupon discount line:
```tsx
{cartStore.appliedCoupon && (
  <DiscountLineItem
    code={cartStore.appliedCoupon.code}
    discountAmount={cartStore.appliedCoupon.discountAmount}
  />
)}
```

### Customer order history detail (`neumart/components/order/OrderDetail.tsx`) [Nice to Have]

```tsx
{order.discountAmount && order.discountAmount > 0 && (
  <div>
    Coupon ({order.couponCodeSnapshot}): −₹{order.discountAmount / 100}
  </div>
)}
```
Source: `order.couponCodeSnapshot` and `order.discountAmount` from the order record. Do NOT look up the live coupon.

### Admin order detail (`neumart/components/admin/OrderDetail.tsx`) [Nice to Have]

```tsx
{order.couponId && (
  <section>
    <h3>Coupon Applied</h3>
    <p>Code: {order.couponCodeSnapshot}</p>
    <p>Type: {order.couponDiscountTypeSnapshot}</p>
    <p>Value: {order.couponDiscountValueSnapshot}%</p>
    <p>Discount: −₹{(order.discountAmount ?? 0) / 100}</p>
  </section>
)}
```

---

## Gotchas and Constraints

1. **All amounts in paise.** Never store or display ₹ values directly. `discountValue` is a percentage (1–100), not a money amount. All money fields: multiply ₹ input × 100 before storing; divide by 100 for display.

2. **computeCouponDiscount must stay in `convex/utils/coupon.ts`.** It must be importable by Phase 11 Razorpay integration without modification.

3. **No userId from client.** `validateCoupon` and the internal `validateAndApplyCoupon` function both resolve userId via `ctx.auth.getUserIdentity()`. Never accept `userId` as a Convex function argument.

4. **Non-coupon placeOrder path is sacred.** The `if (args.couponCode) { ... }` block must be the only change to the existing order write. Any coupon-unrelated fields must not change.

5. **Validation order matters.** `validateCoupon` must check NOT_FOUND → INACTIVE → NOT_YET_ACTIVE → EXPIRED → EXHAUSTED → PER_USER_LIMIT → MINIMUM_NOT_MET in exactly this order. Different order = wrong error shown to user.

6. **Inline errors — not toasts** — for coupon apply failures. The auto-remove on cart change is the only coupon-related toast.

7. **`discountType` is locked to `"percentage"` in MVP.** Store as string (not enum) so Phase 2 can add `"fixed"` without a migration.

8. **Convex OCC handles race conditions.** Do not add external locking. The read-and-write of `couponUsages` within the same Convex mutation is sufficient protection.

9. **Mobile:** All coupon UI must work on 375px viewport. CouponInputField must not shift layout when the keyboard opens. Toast for auto-remove must be visible above the keyboard.

10. **`maximumDiscount` is required for percentage coupons.** The admin form and `createCoupon` mutation must both reject if it's absent. Uncapped % discounts are a financial risk (RULE-COM-CART-COUPON-002).

---

## Acceptance Conditions — Summary

| Phase | Key acceptance condition |
|---|---|
| 1 | Schema deploys; existing orders load without errors |
| 2A | `computeCouponDiscount(subtotal=65000, discountValue=10, maximumDiscount=10000)` = 6500 |
| 2B | Admin can create coupon; all 7 validation error codes fire correctly from `validateCoupon` |
| 3 | Non-coupon `placeOrder` is identical to pre-change; coupon order writes all 7 snapshot fields + couponUsage row |
| 4 | Admin can create, edit, toggle coupons via UI |
| 5 | Customer can apply WELCOME10 to ₹650 cart → sees −₹65 discount; removing item below minimum → toast + auto-remove |
| 6 | Checkout summary shows coupon line; order history shows coupon on past orders |

---

## Testing Instructions

After Phase 1:
```
1. npx convex dev — confirm schema deploys without errors
2. Open Convex dashboard → confirm coupons, couponUsages tables exist
3. Run a test query on existing orders — confirm they load without missing field errors
```

After Phase 2:
```
1. In Convex dashboard, manually invoke createCoupon with:
   { code: "WELCOME10", discountType: "percentage", discountValue: 10,
     maximumDiscount: 10000, minimumOrderValue: 49900, isActive: true }
2. Invoke listCoupons — confirm WELCOME10 appears with usageCount: 0
3. Invoke validateCoupon with { couponCode: "WELCOME10", subtotal: 65000 }
   — confirm { valid: true, discountAmount: 6500 }
4. Invoke validateCoupon with { couponCode: "FAKE" } — confirm COUPON_NOT_FOUND error
5. Invoke validateCoupon with { couponCode: "WELCOME10", subtotal: 40000 }
   — confirm COUPON_MINIMUM_NOT_MET
```

After Phase 3:
```
1. Place a non-coupon order — confirm discountAmount field ABSENT, total = subtotal + deliveryFee
2. Apply WELCOME10 → place order — confirm:
   - discountAmount = 6500 (on ₹650 cart)
   - total = subtotal - 6500 + deliveryFee
   - couponCodeSnapshot = "WELCOME10"
   - couponUsage row exists with correct fields
3. Apply WELCOME10 again (same user, perUserLimit = 1) — confirm COUPON_PER_USER_LIMIT
```

After Phase 5 (browser):
```
1. Add ₹650 of items to cart
2. Enter "WELCOME10" → Apply → confirm −₹65 discount line and updated total
3. Click Remove → confirm total reverts
4. Apply WELCOME10 again → remove items until total < ₹499 → confirm toast + auto-remove
5. Enter "INVALID" → Apply → confirm inline error "This coupon code does not exist."
   (error must be below input, NOT a toast)
```

---

## Files Affected Summary

| Phase | Files | Action |
|---|---|---|
| 1 | `convex/schema.ts` | Modify (additive only) |
| 2 | `convex/utils/coupon.ts` | New file |
| 2 | `convex/coupons.ts` | New file |
| 3 | `convex/orders.ts` | Modify (extend placeOrder — HIGH RISK) |
| 4 | `app/admin/coupons/page.tsx` | New file |
| 4 | `app/admin/coupons/new/page.tsx` | New file |
| 4 | `app/admin/coupons/[id]/page.tsx` | New file |
| 4 | `components/admin/CouponForm.tsx` | New file |
| 5 | `store/cartStore.ts` | Modify (add coupon state + actions) |
| 5 | `components/cart/CouponInputField.tsx` | New file |
| 5 | `components/cart/DiscountLineItem.tsx` | New file |
| 5 | `app/cart/page.tsx` | Modify (integrate coupon components) |
| 6 | `components/checkout/OrderSummary.tsx` | Modify (add discount line) |
| 6 | `components/order/OrderDetail.tsx` | Modify (customer history) |
| 6 | `components/admin/OrderDetail.tsx` | Modify (admin order detail) |

**DO NOT modify:** `convex/schema.ts` existing fields, existing order write logic (non-coupon path), any existing cart operations.

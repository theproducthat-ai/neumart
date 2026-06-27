---
object_id: "DEFERRED-COM-CART-COUPON-FIXED-001"
legacy_id: ""
object_type: DeferredItem

product_area_code: "COM"
module_code: "CART"
feature_slug: "coupon-fixed"
sequence: "001"
canonical_name: "DEFERRED-COM-CART-COUPON-FIXED-001"
display_name: "Fixed-Amount Discount Coupons"
file_slug: "DEFERRED-COM-CART-COUPON-FIXED-001"

module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
secondary_module_ids: ["MOD-ADM"]

status: deferred
deferred_from: "REQUEST-COM-CART-COUPON-001"
parent_prd: "PRD-COM-CART-COUPON-V1"
parent_feature: "FEATURE-COM-CART-COUPON"
target_phase: "Phase 2"
activation_trigger: "After Discount Coupon System MVP (FEATURE-COM-CART-COUPON) is released and validated."

owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-prd)"
created_at: "2026-06-25"
updated_at: "2026-06-25"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
  confidence: "High"
---

# Deferred Item — Fixed-Amount Discount Coupons

**Deferred Item ID:** `DEFERRED-COM-CART-COUPON-FIXED-001`
**Deferred From:** REQUEST-COM-CART-COUPON-001 (Product Owner decision DEC-001)
**Parent Feature:** FEATURE-COM-CART-COUPON
**Parent PRD:** PRD-COM-CART-COUPON-V1
**Status:** Deferred — Phase 2
**Created:** 2026-06-25

---

## 1. Summary

Fixed-amount discount coupons allow admins to create codes that deduct a fixed rupee amount (e.g., ₹50 off) from the cart total, rather than a percentage. This was explicitly excluded from the MVP Discount Coupon System scope by the Product Owner.

**Example:** Code `FLAT50`, ₹50 off, min cart ₹300. Cart ₹600 → Coupon discount −₹50 → Payable ₹550.

---

## 2. Why Deferred

- **DEC-001 (Product Owner):** Fixed-amount coupons add complexity to the MVP. The percentage model is sufficient for launch campaigns (e.g., WELCOME10).
- **MVP scope is percentage only.** The `discountType` field is modelled as a string enum — `"percentage"` in MVP — specifically to allow `"fixed"` to be added without redesigning the schema.
- **No design work done** for fixed-amount cap/min logic at admin creation time.

---

## 3. Scope When Activated

### What changes

**Schema:** `coupons` table already has `discountType: v.string()`. Adding `"fixed"` as a valid value requires:
- No new table
- No new fields (all existing fields cover the case: `discountValue` = paise amount; `maximumDiscount` becomes irrelevant or can be removed from requirement for fixed coupons)

**Admin form:** Add `discountType` selector with `"Percentage"` and `"Fixed Amount (₹)"` options. Conditional field display based on selection.

**Validation:** For `"fixed"` coupons, `discountValue` = paise amount directly. `maximumDiscount` not applicable.

**`computeCouponDiscount` helper:** Add branch for `discountType === "fixed"`:
```typescript
if (coupon.discountType === "fixed") {
  return Math.min(coupon.discountValue, subtotal); // clamp to subtotal
}
```

**Customer UI:** No change — discount line item display is agnostic to type; amount is already computed server-side.

### What does NOT change
- couponUsages table
- orders snapshot fields (already generic)
- validateCoupon structure (error codes unchanged)
- placeOrder mutation

---

## 4. Estimated Scope

| Category | Estimate |
|---|---|
| Schema migration | None (additive enum value only) |
| Backend changes | `computeCouponDiscount` helper update, `createCoupon` / `updateCoupon` validation update |
| Admin UI | ~2 stories (form conditional, validation) |
| Testing | ~4 test cases |
| Lane | Lane 2 — Small Enhancement (no new schema tables, minor backend + UI) |

---

## 5. Activation Trigger

Activate this item after:
1. FEATURE-COM-CART-COUPON MVP is released and stable (minimum 2 weeks post-release)
2. At least one percentage coupon campaign has been run and validated
3. Admin requests fixed-amount coupon capability

To activate: run `/product-request` and reference this deferred item ID, or promote directly to Lane 2 enhancement.

---

## 6. Dependencies

| Dependency | Status | Notes |
|---|---|---|
| FEATURE-COM-CART-COUPON (MVP) | Must be released first | All schema and placeOrder work already done |
| `computeCouponDiscount` function | Must be refactored to support `discountType` branching | Straightforward addition |

---

## 7. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Created during /product-prd per DEC-001 deferred_items_noted in REQUEST-COM-CART-COUPON-001 |

---
object_id: "RULE-COM-CART-COUPON-006"
object_type: Rule
rule_type: Technical Rule / Security
priority: Must Have
status: Active

feature_id: "FEATURE-COM-CART-COUPON"
prd_id: "PRD-COM-CART-COUPON-V1"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"

owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-prd)"
created_at: "2026-06-25"
updated_at: "2026-06-25"
---

# Rule

**Rule ID:** `RULE-COM-CART-COUPON-006`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

The server is always the authoritative source for coupon discount calculation. The client-computed discount value shown in the cart is display only.

At `placeOrder`, the server:
1. Re-fetches the coupon from the database
2. Re-validates all rules (active, dates, usage limits, minimum cart value)
3. Re-calculates `discountAmount` using `computeCouponDiscount`
4. Writes the server-calculated `discountAmount` to the order — NOT the client-submitted value

If the server calculates a different discount than the client displayed (e.g., coupon expired between cart display and order placement), the mutation fails with a structured error code and the order is NOT written.

**The client must never submit a discount amount — only a coupon code.**

## Error Codes Returned on Failure

| Code | Scenario |
|---|---|
| `COUPON_NOT_FOUND` | Code no longer exists |
| `COUPON_INACTIVE` | Deactivated after cart display |
| `COUPON_EXPIRED` | Expired between cart and checkout |
| `COUPON_NOT_YET_ACTIVE` | startsAt has not been reached |
| `COUPON_EXHAUSTED` | Global usage limit reached concurrently |
| `COUPON_PER_USER_LIMIT` | Per-user limit reached by another concurrent order |
| `COUPON_MINIMUM_NOT_MET` | Cart subtotal below minimum (e.g., item removed between sessions) |

## Enforcement Point

- `placeOrder` Convex mutation (server-side only)
- `computeCouponDiscount` helper — called from `placeOrder`, never from client

## Linked Risk

RSK-COM-CART-COUPON-004 — Client/server cart discount divergence.

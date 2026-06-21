# Sub-module: Coupons (Customer)

**Module:** Customer Commerce  
**Screen:** None assigned yet — coupon input is part of SCR-CUS-0003 (Cart) or SCR-CUS-0008 (Checkout)  
**Status:** Future Candidate — not built

---

## Purpose

Allows customers to apply discount coupon codes at cart or checkout to receive a price reduction on their order.

---

## Current State

**Not built.** The Coupons sub-module is a Future Candidate. No Convex schema, no UI, and no business logic exists for coupons today.

This file documents the intended behaviour so it can be scoped into a PRD when the feature is approved.

---

## Intended Behaviour

### Enter Coupon Code

- A text input field on the Cart or Checkout screen.
- Customer enters a coupon code (e.g. `SAVE20`).
- On "Apply", the frontend calls a Convex query to validate the code.

### Coupon Validation Rules

| Rule | Behaviour |
|---|---|
| Code does not exist | Error: "This coupon code is not valid." |
| Code is inactive | Error: "This coupon is no longer active." |
| Code has expired | Error: "This coupon has expired." |
| Usage limit reached | Error: "This coupon has reached its maximum usage limit." |
| Per-user limit reached | Error: "You have already used this coupon the maximum number of times." |
| Minimum order value not met | Error: "This coupon requires a minimum order of ₹X." |
| Valid | Discount is applied; updated cart total is shown |

### Discount Types

| Type | Behaviour |
|---|---|
| Percentage | e.g. 20% off the subtotal |
| Fixed amount | e.g. ₹50 off the subtotal |

### Apply at Order Placement

- Validated coupon is submitted with the order creation mutation.
- Discount is applied to the order total.
- A `couponUsages` record is written (user + coupon + order + amount saved).
- Usage count on the coupon record is incremented.

### Remove Coupon

- Customer can remove an applied coupon before placing the order.

---

## Screens Required (when built)

| Screen | Route | Notes |
|---|---|---|
| Coupon input (inline) | Part of `/cart` or `/checkout` | Not a separate screen |

---

## Admin Dependency

Customer-facing coupon use depends on the Admin Console coupons sub-module. Admin must be able to create and manage coupons before any customer can use them. See `admin-console/coupons.md`.

---

## Convex Entities Required (not yet in schema)

- `coupons` table
- `couponUsages` table

See `DATA_ENTITY_MAP.md` for field definitions.

---

## Pre-requisites to Build

1. Business decision: confirmed that promotions are needed (before or after Razorpay).
2. Formal PRD approved.
3. Module evaluation completed in MODULE_EVALUATION_BOARD.md (or included in a broader PRD).
4. Convex schema updated with `coupons` and `couponUsages` tables.
5. Admin Console coupon CRUD built.

---

*Last updated: 2026-06-21*

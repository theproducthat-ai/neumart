# Sub-module: Coupons (Admin)

**Module:** Admin Console  
**Screen:** None assigned — Future Candidate  
**Status:** Future Candidate — not built

---

## Purpose

Admin management of discount coupon codes. Admins create and configure coupons, set usage limits and expiry, and monitor usage.

---

## Current State

**Not built.** This is a Future Candidate. No Convex schema, no admin UI, and no backend logic exists today.

This file documents the intended admin behaviour to inform a future PRD.

---

## Intended Behaviour

### Coupon List

- Lists all coupons with: code, discount type, discount value, usage count vs. limit, expiry, active status.
- Filter by active / expired / inactive.

### Create Coupon

- Form:
  - Code (e.g. `SAVE20`) — unique, uppercase enforced
  - Discount type: Percentage or Fixed Amount
  - Discount value (% or ₹ in paise)
  - Minimum order value (optional)
  - Usage limit — total across all customers (optional)
  - Per-user limit (optional, e.g. max 1 per customer)
  - Expiry date (optional)
  - Active toggle

### Edit Coupon

- Edit all fields except code (code is immutable once created — changing a code would break any customer who already has it).
- Can deactivate or extend expiry.

### Coupon Usage

- View how many times a coupon has been used.
- See list of orders where it was applied with discount amounts.

### Disable Coupon

- Toggle `isActive: false` to stop a coupon from being redeemable.
- Does not retroactively remove discounts from placed orders.

---

## Screens Required (when built)

| Screen | Route | Status |
|---|---|---|
| Coupon list | `/admin/coupons` | Proposed |
| Create coupon | `/admin/coupons/new` | Proposed |
| Edit coupon | `/admin/coupons/[id]/edit` | Proposed |

*Assign Screen IDs from MASTER_REGISTRY.md when these move to Planned.*

---

## Convex Entities Required (not yet in schema)

- `coupons` table
- `couponUsages` table

See `DATA_ENTITY_MAP.md` for field definitions.

---

## Pre-requisites to Build

1. Business decision: coupon system approved (before or after Razorpay).
2. Formal PRD approved.
3. Convex schema updated with `coupons` and `couponUsages`.
4. Customer Commerce coupon input built simultaneously (admin coupons have no value without customer-facing redemption).

---

*Last updated: 2026-06-21*

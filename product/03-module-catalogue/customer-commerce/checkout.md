# Sub-module: Checkout

**Module:** Customer Commerce  
**Screen:** SCR-CUS-0008 — `/checkout`  
**Status:** Built (Pay Later) — Razorpay Pending (Phase 11)

---

## Purpose

The checkout screen where the customer reviews their order, confirms their delivery address, and places the order. Currently uses Pay Later; Razorpay payment will be added in Phase 11.

---

## Features Built

### Address Guard

- Customer must have at least one saved address before proceeding to checkout.
- If no address exists, a prompt is shown directing the customer to `/addresses/new`.
- Default address is pre-selected; customer can choose a different saved address.

### Order Summary

- Lists all cart items with name, quantity, unit price, and line total.
- Shows subtotal, delivery fee, and order total.
- Delivery fee is ₹0 in the current Pay Later MVP (no free-delivery subscription logic yet).

### Pay Later Order Placement

- "Place Order" button submits the order to Convex.
- Creates an order record with `paymentMethod: "pay_later"` and `paymentStatus: "pending"`.
- Creates individual `orderItems` records for each cart item.
- Reduces stock for each item in the same Convex mutation.
- Writes a `stockMovements` record for each stock change.
- On success, cart is cleared and customer is redirected to `/orders` or a confirmation screen.

### Loading State

- `loading.tsx` provides a skeleton loading state while address and cart data are loaded.

---

## Features Pending

### Razorpay Integration (Phase 11)

- Call `createRazorpayOrder` Convex action to create a Razorpay order in paise.
- Store `razorpayOrderId` on the Nuemart order record.
- Load Razorpay Checkout SDK and open the payment modal.
- Pass `razorpayOrderId`, `amount`, and `key` to the modal.
- On frontend payment success, call a Convex mutation to store `razorpayPaymentId` temporarily.
- Wait for Razorpay webhook to verify payment and update `paymentStatus` to `"paid"`.
- Cart clears only after webhook-verified payment confirmation.
- Stock deduction moves to webhook handler (not order placement).

### Razorpay Subscription — Free Delivery (Phase 12)

- Phase 12 is a separate future phase, not part of Phase 11 Razorpay payment integration.
- When built: check a `freeShippingEligible` field (to be added to the users schema in Phase 12) at checkout.
- Apply ₹0 delivery fee for active subscribers.
- Apply normal delivery fee for non-subscribers.

---

## Future Candidates

- **Coupon code input at checkout** (see `coupons.md`) — apply before order total is finalised.
- **Order notes** — customer-facing note field on the checkout form.
- **Estimated delivery date / time**

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `addresses.listByUser` | Fetch customer's saved addresses for selection |
| `users.getMe` | Check `freeShippingEligible` for free delivery (Phase 12 — field not yet in schema) |

---

## Convex Mutations / Actions Used

| Operation | Purpose |
|---|---|
| `orders.place` | Create order, orderItems, reduce stock, write stockMovements (Pay Later) |
| `orders.createWithRazorpay` *(Phase 11)* | Create order + call Razorpay Orders API to get `razorpayOrderId` |

---

## Business Rules

| Rule | Detail |
|---|---|
| Address required | Cannot place order without a saved address |
| Stock enforced server-side | Convex mutation validates available stock before order creation |
| Payment trust | Payment status is only set to `"paid"` by Razorpay webhook — not by frontend (Phase 11) |
| Cart clear timing | Cart clears on Pay Later confirmation today; will move to webhook-verified success in Phase 11 |

---

*Last updated: 2026-06-21*

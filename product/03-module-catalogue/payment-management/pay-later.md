# Sub-module: Pay Later

**Module:** Payment Management  
**Screen:** SCR-CUS-0008 (`/checkout`) — payment method  
**Status:** Built

---

## Purpose

An interim payment model that allows customers to place orders without online payment. Payment is collected manually by the store at or after delivery. This enables the full order-to-fulfilment flow without requiring Razorpay.

---

## Why Pay Later Exists

Razorpay merchant account approval was pending during MVP build (Phases 1–10). Rather than block the entire checkout flow, Pay Later was implemented as the operational model so that:

1. The customer-to-order journey could be fully built and tested.
2. The store could start taking real orders with manual payment collection.
3. Razorpay could be integrated in Phase 11 without disrupting the existing order system.

---

## How It Works

1. Customer completes checkout and clicks "Place Order".
2. A Convex mutation creates:
   - An `orders` record with `paymentMethod: "pay_later"`, `paymentStatus: "pending"`.
   - `orderItems` records for each item.
   - A `payments` record with `method: "pay_later"`, `status: "pending"`, `amount` = order total.
   - `stockMovements` records reducing stock for each item.
3. Cart is cleared immediately after successful order placement.
4. Customer is shown an order confirmation.
5. Admin receives the order and collects payment manually (cash, bank transfer, UPI via external means).
6. Admin manually updates order status to `"confirmed"` / `"processing"` / `"delivered"` via the admin console.

---

## Limitations

| Limitation | Detail |
|---|---|
| No automated payment verification | Payment is not verified server-side; admin confirms manually |
| Stock reduced at placement, not payment | If a Pay Later order is cancelled, stock must be manually restored |
| No payment tracking ID | No Razorpay ID; no way to link payment to a transaction reference in the system |
| Cart clears before payment is confirmed | Unlike Razorpay (where cart clears only on webhook), Pay Later clears cart on order placement |

---

## Transition to Razorpay

When Phase 11 is complete:
- `paymentMethod` will change to `"razorpay"` for new orders.
- `paymentStatus` will be set to `"paid"` only on Razorpay webhook verification.
- Stock deduction will move from order placement to webhook handler.
- Cart will clear only after webhook-verified payment.

Pay Later orders placed before Phase 11 remain valid and are not migrated.

---

*Last updated: 2026-06-21*

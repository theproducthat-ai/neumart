# Sub-module: Razorpay Webhooks

**Module:** Payment Management  
**Status:** Pending — Phase 11

---

## Purpose

Receives and processes server-to-server events from Razorpay. The webhook handler is the authoritative source of truth for payment outcomes — it is the only mechanism that updates order payment status and triggers stock deduction.

---

## Why Webhooks Are the Source of Truth

Frontend payment callbacks can be tampered with. Razorpay's webhook events are signed with HMAC-SHA256 and sent directly from Razorpay's servers to Convex's HTTP endpoint — bypassing the customer's browser entirely. Only a verified webhook event triggers downstream order and inventory updates.

---

## Webhook Endpoint

- **Route:** Convex HTTP action at `/razorpay-webhook`
- **Method:** POST
- **Content-Type:** `application/json`
- **Registered in:** Razorpay Dashboard → Webhooks → Add URL

---

## Events Handled

### `payment.captured`

Fired by Razorpay when a payment is successfully captured.

**Handler actions (in order):**

1. Verify HMAC-SHA256 signature (see `payment-verification.md`). Reject with HTTP 400 if invalid.
2. Extract `razorpayPaymentId` and `razorpayOrderId` from the event payload.
3. Look up the Nuemart `payments` record by `gatewayOrderId`.
4. Update `payments` record:
   - `status: "paid"`
   - `gatewayPaymentId`: Razorpay payment ID
   - `gatewaySignature`: signature from event
   - `webhookVerified: true`
   - `updatedAt`: current timestamp
5. Update parent `orders` record:
   - `paymentStatus: "paid"`
   - `updatedAt`: current timestamp
6. Reduce `stockQuantity` on each `products` record for each `orderItem` in this order.
7. Write a `stockMovements` record for each stock deduction (type: `"order_placed"`, reason: payment verified).
8. Return HTTP 200.

### `payment.failed`

Fired by Razorpay when a payment attempt fails.

**Handler actions:**

1. Verify signature. Reject with HTTP 400 if invalid.
2. Update `payments` record: `status: "failed"`.
3. Update `orders` record: `paymentStatus: "failed"`.
4. Do **not** reduce stock — no goods have been committed.
5. Return HTTP 200.

---

## Stock Deduction Timing Change (Phase 11)

| Model | When stock is deducted |
|---|---|
| Pay Later (current) | At order placement |
| Razorpay (Phase 11) | At webhook-verified `payment.captured` only |

This is a **critical logic change** in Phase 11. Stock must not be deducted at order placement when `paymentMethod === "razorpay"`. The `orders.place` mutation must be updated to skip stock deduction for Razorpay orders, deferring it to the webhook handler.

---

## Cart Clearing

- With Pay Later: cart is cleared immediately on order placement (client-side).
- With Razorpay (Phase 11): cart should only clear after `paymentStatus` is confirmed as `"paid"`.
- Frontend polls or subscribes (Convex real-time) to the order's `paymentStatus`. When it changes to `"paid"`, the cart is cleared and the customer is redirected to the order confirmation.

---

## Idempotency

- Razorpay may deliver the same webhook event more than once.
- The handler must be idempotent: if `payments.webhookVerified` is already `true` for the given `gatewayOrderId`, skip state mutations and return HTTP 200.

---

## Convex Functions Required (Phase 11)

| Function | Type | Purpose |
|---|---|---|
| `/razorpay-webhook` | HTTP Action | Entry point: verify signature, route to event handler |
| `payments.setVerifiedPaid` | Internal Mutation | Update payment + order status to paid, reduce stock |
| `payments.setFailed` | Internal Mutation | Update payment + order status to failed |

---

*Last updated: 2026-06-21*

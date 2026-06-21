# Sub-module: Refunds

**Module:** Payment Management  
**Status:** Future Candidate — not built

---

## Purpose

Process refunds to customers for cancelled or returned orders via Razorpay's Refunds API. Maintains a refund audit trail in Convex.

---

## Current State

**Not built.** Refunds depend on Razorpay payment integration (Phase 11) which is itself pending. Refunds are a post-Phase-11 candidate.

---

## Intended Behaviour

### Refund Initiation

- Admin initiates a refund from the order detail screen in the admin console.
- Admin selects full refund or partial refund amount.
- Admin enters a refund reason (for internal records).

### Razorpay Refund API Call

- Convex action calls Razorpay Refunds API with:
  - `paymentId`: the `razorpayPaymentId` from the order's payment record.
  - `amount`: amount to refund in paise (full or partial).
  - `notes`: internal reason.
- Razorpay returns a `refundId`.
- A `refunds` record is created in Convex with `status: "pending"`.

### Refund Webhook

- Razorpay fires a `refund.processed` or `refund.failed` webhook event.
- Convex webhook handler updates the `refunds` record status.
- Order `paymentStatus` updated to `"refunded"` on full refund.

### Customer Notification

- Customer should be notified when a refund is processed (future — depends on notification system).

---

## Convex Entities Required (not yet in schema)

`refunds` table — see `DATA_ENTITY_MAP.md` for field definitions.

---

## Pre-requisites to Build

1. Phase 11 (Razorpay one-time payment) complete — refunds require a `razorpayPaymentId` on the order.
2. Business policy defined: what qualifies for a refund? Full or partial? Time window?
3. Formal PRD approved.
4. Admin refund UI added to admin console order detail.

---

## Business Questions to Answer Before Building

- What is the refund policy? (Full refund only, or partial also?)
- What is the refund window? (e.g. within 24 hours of delivery)
- Who initiates the refund — admin only, or can a customer request it?
- How long does Razorpay typically take to process refunds to Indian payment methods?

---

*Last updated: 2026-06-21*

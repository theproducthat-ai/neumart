# Sub-module: Reconciliation

**Module:** Payment Management  
**Status:** Future Candidate — not built

---

## Purpose

Match Razorpay settlement payouts against Nuemart order records to verify that all payments collected by Razorpay have been correctly accounted for in the platform.

---

## Current State

**Not built.** Reconciliation is only meaningful after Razorpay is live and the store has meaningful transaction volume. This is a post-Phase-11 candidate.

---

## Why Reconciliation Matters

When real money flows through Razorpay:
- Razorpay collects payment from the customer.
- Razorpay settles the net amount (after deducting fees) to the store's bank account, typically in 2–3 business days.
- The store needs to confirm that the Razorpay settlement amount matches the expected total from Nuemart order records.
- Discrepancies (failed webhooks, refunds, disputes) must be caught and resolved.

---

## Intended Behaviour

### Razorpay Settlement Data

- Razorpay provides a Settlement Report via its Dashboard and API.
- Each settlement covers a period and lists: payments, refunds, adjustments, fees, net payout.

### Nuemart Order Data

- All `payments` records with `status: "paid"` for the same period.
- All `refunds` records processed in the period.

### Reconciliation Process (manual first pass)

1. Admin downloads Razorpay settlement CSV.
2. Admin compares against Nuemart order payment totals for the period.
3. Discrepancies are flagged for investigation.

### Automated Reconciliation (future)

- Convex action calls Razorpay Settlements API to fetch settlement data.
- System matches each Razorpay payment ID in the settlement to Nuemart payment records.
- Unmatched items are surfaced in an admin reconciliation screen.
- Reconciliation status per settlement stored in Convex.

---

## Pre-requisites to Build

1. Phase 11 (Razorpay) complete — no reconciliation without real payment data.
2. Sufficient order volume for reconciliation to be meaningful.
3. Business process defined: who does reconciliation, how often, what is the escalation path for discrepancies?
4. Formal PRD approved.

---

*Last updated: 2026-06-21*

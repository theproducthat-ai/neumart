# Nuemart — Incomplete Work Tracker

This file tracks all in-flight execution work that has been started but not yet completed. Every work item that is not in a final state (Released, Parked, Rejected, Cancelled) must appear here until it closes.

---

## Rules

- A work item is added here when work begins (not when it is planned).
- A work item is removed here only when it reaches a final state.
- If a work item is blocked, the Blocker column must be populated.
- This file is reviewed at the start of every build session to check for existing incomplete work before starting new work.

---

## Tracker

| Work Item ID | Linked Request | Type | Title | Current Stage | Status | Owner | Blocker | Last Updated | Next Action |
|---|---|---|---|---|---|---|---|---|---|
| — | — | — | No incomplete work items | — | — | — | — | 2026-06-21 | — |

---

## Work Item Type Reference

| Type | When to use |
|---|---|
| Request | The request itself is stalled before design |
| Evaluation | An EVAL document has been started but not completed |
| PRD | A PRD has been started but not completed |
| User Story | A US has been written but not approved |
| Development Plan | A DEVPLAN has been started but not completed |
| Build Prompt | A build prompt has been prepared but not executed |
| QA | QA is in progress or has failed and is waiting re-test |
| UAT | UAT is in progress or has failed and is waiting re-test |
| Release | Release is queued or blocked |
| Bug | A bug found during QA/UAT that is not yet fixed |
| Blocker | An external dependency or decision that is blocking progress |

---

## Known Future Work Items (Not Yet Started)

These are planned or candidate items that will become proper tracked work items when formally entered via the request pipeline. They are listed here for visibility — none are rejected.

### Phase 11 — Razorpay Payment Integration (Planned, Blocked on Razorpay Account)

| Area | Description | Dependency |
|---|---|---|
| Razorpay checkout | `createRazorpayOrder` Convex action (fetch + Basic Auth) | Razorpay merchant account |
| Razorpay webhook | `convex/http.ts` route, HMAC signature verification, idempotency guard | Razorpay merchant account |
| Payment status screens | Orders and payments screens updated to reflect real payment states | Razorpay account + Phase 11 build |
| Membership / Subscriptions | Razorpay Subscriptions integration, free-shipping eligibility | Razorpay account + Phase 11 build |

### Future Roadmap Candidates (Not Yet Evaluated, Not Rejected)

| Area | Description | When to Raise REQ |
|---|---|---|
| Delivery Management | Assign delivery personnel, track delivery status per order | After Razorpay integration is live |
| Discount Coupons | Coupon codes, percentage or flat discounts, minimum order rules | After core payment flow is stable |
| Multi-branch / Multi-site | Multiple store locations or white-label instances | After single-store MVP is validated in production |
| Customer Notifications | SMS/email for order status changes | Evaluate when order volume grows |

---

*Last updated: 2026-06-21*

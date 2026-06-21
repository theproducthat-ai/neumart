# Nuemart — Blockers

This file tracks all active blockers that are preventing work from progressing. A blocker is an external dependency, missing decision, missing credential, or unresolved question that cannot be resolved by the development team alone.

---

## Rules

- A blocker is added here the moment it is identified.
- Every blocked request must have this blocker ID referenced in `REQUEST_REGISTER.md` under "Current Blocker".
- When a blocker is resolved, it is moved to the Resolved section and the linked request is unblocked.
- Blockers are never silently removed — the resolution must be documented.

---

## Active Blockers

| Blocker ID | Raised | Title | Blocks | Owner | What Is Needed | Target Resolution |
|---|---|---|---|---|---|---|
| BLK-001 | 2026-06-21 | Razorpay merchant account not yet approved | Phase 11 — Payment integration | Product owner | Razorpay account approved + `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` received | Unknown — awaiting Razorpay approval |

---

## Resolved Blockers

| Blocker ID | Resolved | Title | Resolution |
|---|---|---|---|
| — | — | No resolved blockers yet | — |

---

## Blocker Escalation

If a blocker has been open for more than 7 days with no progress:
1. Raise it to the product owner if it is a decision blocker.
2. Escalate to the vendor (e.g. Razorpay support) if it is an external approval.
3. Consider whether the blocked work can be decoupled — build what is not blocked.

---

*Last updated: 2026-06-21*

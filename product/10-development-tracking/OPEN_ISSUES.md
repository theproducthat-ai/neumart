# Nuemart — Open Issues

This file tracks known issues that are not yet fixed. Issues are added here when discovered during development, QA, UAT or production monitoring. Each issue must link to a request (REQ) once formally raised.

---

## Rules

- An issue is added here as soon as it is discovered.
- Once a REQ is raised for the issue, the REQ ID is linked.
- Once fixed and verified, the issue is removed from this file and recorded in CHANGE_LOG.md.
- Issues that are not going to be fixed should be moved to PARKED or REJECTED via the request process.

---

## Open Issues

| Issue # | Discovered | Title | Severity | Module | Steps to Reproduce | REQ | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| — | — | No open issues | — | — | — | — | — | Product OS initialized 2026-06-21 |

---

## Known Limitations (Accepted for MVP, Not Filed as Bugs)

These are acknowledged limitations that have been consciously accepted for the MVP. They are not bugs — they are intentional scope boundaries.

| Limitation | Module | Accepted Date | Condition to Address |
|---|---|---|---|
| Seed products have no real images | Catalogue | 2026-06-21 | When stable CDN product images are available |
| Mobile "More" dropdown does not highlight active route | Header | 2026-06-21 | When nav redesign is scoped |
| Admin inventory URL param filter applies only on first mount (back-navigation resets) | Inventory | 2026-06-21 | Minor — address in a nav state management refactor if raised |
| Payment is "Pay Later" — no Razorpay | Payments | 2026-06-21 | When Razorpay merchant account is approved — Phase 11 |
| No delivery partner assignment | Orders | 2026-06-21 | When Delivery Management module is scoped and evaluated as REQ |
| No coupon or discount system | Checkout | 2026-06-21 | When Discount Coupons feature is scoped and evaluated as REQ |
| No customer notifications (SMS/email) | Orders | 2026-06-21 | When notification module is scoped and evaluated as REQ |

---

## Severity Reference

| Severity | Definition |
|---|---|
| Critical | Production down, orders broken, payments broken |
| High | Core flow impacted, significant revenue risk |
| Medium | Feature works but with degraded experience |
| Low | Minor cosmetic or edge-case issue |

---

*Last updated: 2026-06-21*

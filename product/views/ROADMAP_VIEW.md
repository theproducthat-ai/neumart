# Nuemart Product OS — Roadmap View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

> **Migration Note:** This view extends and supersedes `product/02-roadmap/PRODUCT_ROADMAP.md` and `product/02-roadmap/NOW_NEXT_LATER.md`. The original files are preserved as-is. This view reflects the current state as of the Product OS migration.

---

## Now (Active / In Progress)

Items currently being worked on or gated on a near-term action.

| # | Item | Feature / Phase | Status | Next Action |
|---|---|---|---|---|
| 1 | Carousel UAT & Release | FEATURE-COM-PLP-CAROUSEL | In UAT — pending Product Owner sign-off | `/product-uat` to get sign-off, then `/product-release` |
| 2 | Product OS Migration & Enhancement | — | Documentation restructure in progress | Complete remaining object migrations |

---

## Next (Committed / Planned)

Items with formal approval or commitment, not yet started or blocked.

| # | Item | Feature / Phase | Status | Dependency |
|---|---|---|---|---|
| 1 | Phase 11: Razorpay Payment Integration | PAY module | BLOCKED — merchant account pending | External: Razorpay merchant account approval |
| 2 | Delivery Management MVP | FEATURE-DEL-CORE-DELIVERY-MVP | Planned — PRD approved, development not started | Sequenced after Razorpay Phase 11 (product decision) |

---

## Later (Under Evaluation)

Items identified as candidates but not yet formally evaluated or approved. Sequencing not yet decided.

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Coupon System | Under Evaluation | No formal Request or PRD yet |
| 2 | Subscription / Membership | Under Evaluation | No formal Request or PRD yet |
| 3 | Notification System | Candidate | Not yet formally requested |
| 4 | Reporting & Analytics Enhancement | Partial — needs full evaluation | Basic dashboard exists; full module not yet scoped |
| 5 | Multi-branch Support | Candidate | Not yet formally requested |

---

## Completed — Phases 1–10

Full MVP delivered before Product OS was established.

| Phase | Scope | Status |
|---|---|---|
| Phase 1 | Project setup, authentication (Clerk), database (Convex) | Complete |
| Phase 2 | Admin: Category management | Complete |
| Phase 3 | Admin: Product management; Customer: PLP + PDP + Cart | Complete |
| Phase 4 | Checkout (Pay Later), Customer address management | Complete |
| Phase 5 | Order management (admin + customer history) | Complete |
| Phase 6 | Inventory tracking, stock movement audit trail | Complete |
| Phase 7 | UX polish and admin enhancements | Complete |
| Phase 8 | Hardening, seed data, documentation | Complete |
| Phase 9 | UX polish, customer experience refinement, MVP refinement | Complete |
| Phase 10 | Smoke testing, bug fixes, build verification | Complete |

---

## Key Constraints

1. **Razorpay merchant account** is an external dependency blocking Phase 11. No internal action can unblock this.
2. **Delivery Module development** is sequenced after Razorpay — this is a product sequencing decision, not a technical blocker.
3. **No new features** should be added to MVP scope without a formal Request processed through `/product-request` and an approved PRD.
4. **UAT sign-off** on the Carousel is the single highest-priority near-term action.

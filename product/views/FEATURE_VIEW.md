# Nuemart Product OS — Feature View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

This is the human-readable view of all product features — active, candidate, shipped, and deprecated. Source of truth: `product/objects/features/` and `product/graph/FEATURE_MASTER.md`.

---

## 1. Active Features in Delivery

These features have been formally approved and are actively progressing through the delivery lifecycle.

| Feature ID | Name | Status | Blocking Issue | Object File |
|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | Promotional Banner Carousel | In UAT — pending sign-off | Product Owner UAT approval | `product/objects/features/FEATURE-COM-PLP-CAROUSEL.md` |
| FEATURE-DEL-CORE-DELIVERY-MVP | Delivery Management MVP | Planned — Development Not Started | Sequenced after Razorpay Phase 11 | Not yet created |

---

## 2. Feature Candidates (Not Yet Approved)

These features have been identified but not yet formally requested or evaluated.

| Feature | Status | Notes |
|---|---|---|
| Admin-managed Carousel Content | Candidate | Future enhancement of FEATURE-COM-PLP-CAROUSEL; out of scope for V1 |
| Click-through Destinations for Carousel Banners | Candidate | Requires promotional strategy definition first |
| Razorpay Payment Integration | In Progress (Phase 11) | Blocked externally — merchant account pending |
| Coupon System | Under Evaluation | No formal Request or PRD yet |
| Subscription / Membership | Under Evaluation | No formal Request or PRD yet |
| Notification System | Candidate | Not yet formally requested |
| Reporting & Analytics Enhancement | Partial | Basic admin dashboard exists; full enhancement not yet evaluated |
| Multi-branch Support | Candidate | Not yet formally requested |

---

## 3. Shipped Features (In Production — Part of MVP)

All features delivered in Phases 1–10, built before the formal Product OS was established.

| Feature | Module | Phase Delivered |
|---|---|---|
| Product Catalog (browse, search, filter) | COM/PLP | Phases 1–3 |
| Product Detail with add-to-cart | COM/PDP | Phase 3 |
| Shopping Cart management | COM/CART | Phase 3 |
| Checkout with Pay Later | COM/CHK | Phase 4 |
| Order History for customers | COM/ORDHIS | Phase 5 |
| Admin: Category CRUD | ADM/ADMCAT | Phase 2 |
| Admin: Product CRUD | ADM/ADMPRODUCT | Phase 3 |
| Admin: Order management | ADM/ADMORD | Phase 5 |
| Admin: Inventory tracking | ADM/ADMINV | Phase 6 |
| Stock movement audit trail | INV/STOCKMOV | Phase 6 |
| Customer Address management | USR/ADDR | Phase 4 |
| Authentication (Clerk) | USR/AUTH | Phase 1 |

> **Note:** These features predate the Product OS and do not yet have formal Feature Objects. Feature Objects for these should be created as part of the ongoing migration. See `product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md` for guidance.

---

## 4. Deprecated Features

None yet.

---

## 5. Feature Coverage Matrix

Shows the formal documentation coverage for each active and planned feature:

| Feature | Module | Has Feature Object | Has PRD | Has Stories | Has QA | Has UAT | Has Release |
|---|---|---|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | COM/PLP | Yes | Yes (Draft) | Yes (6 stories) | Yes — Passed | Yes — In Progress | Pending |
| FEATURE-DEL-CORE-DELIVERY-MVP | DEL | No — needs creation | Yes — Approved | Yes (8 stories) | No | No | No |
| MVP Phase 1–10 features | Various | No — needs retroactive creation | No | No | No | No | Via git commits |

> Feature Objects are the permanent product knowledge record for a feature. They persist beyond the delivery cycle and accumulate history over time. Creating missing Feature Objects is a recommended next step — see `product/views/INCOMPLETE_WORK_VIEW.md`.

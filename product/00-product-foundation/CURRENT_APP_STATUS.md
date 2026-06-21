# Nuemart — Current App Status

*Last updated: 2026-06-21*

---

## Phase Completion Summary

| Phase | Title | Status | Commit |
|---|---|---|---|
| 1 | Foundation — Clerk, Convex, Nuemart setup | ✅ Complete | — |
| 2 | Customer storefront, products, categories, search, favourites, cart | ✅ Complete | — |
| 3 | Admin CRUD for categories and products | ✅ Complete | — |
| 4 | Address management and checkout readiness | ✅ Complete | — |
| 5 | Order placement without payment | ✅ Complete | — |
| 6 | Admin orders and fulfilment management | ✅ Complete | — |
| 7 | Inventory controls, stock audit and operational hardening | ✅ Complete | 2053071f |
| 8 | Production hardening, seed data and deployment readiness | ✅ Complete | 210eabbe |
| 9 | UX polish, customer experience and MVP refinement | ✅ Complete | cfc8f4fd |
| 10 | Final pre-deployment smoke testing and bug fixes | ✅ Complete | b27d6f26 |
| 11 | Razorpay payment gateway integration | 🔲 Not started | — |

---

## What Is Working Today

### Customer Storefront
- ✅ Product listing with search and category filter
- ✅ Product detail page with stock status
- ✅ Zustand cart with localStorage persistence and item count badge
- ✅ Favourites (toggle, list)
- ✅ Address management (add, edit, delete, set default)
- ✅ Checkout — address guard, order summary, "Pay Later" order placement
- ✅ Order history and order detail
- ✅ Mobile-responsive header with "More" dropdown for Addresses and Orders

### Admin Panel
- ✅ Server-side Clerk auth guard (role = admin)
- ✅ Dashboard with order stats and inventory stats
- ✅ Category CRUD (create, edit, toggle active)
- ✅ Product CRUD (create, edit, toggle active)
- ✅ Inventory monitoring with stock status filters (query-param pre-select from dashboard)
- ✅ Manual stock adjustments with audit trail
- ✅ Admin orders list with status and payment filters
- ✅ Admin order detail with status update
- ✅ Admin inventory detail (stock movement history)

### Backend (Convex)
- ✅ Full schema: users, addresses, categories, products, orders, orderItems, payments, stockMovements, favourites
- ✅ assertAdmin guard on all admin functions
- ✅ Stock reduced on order placement (current MVP: pay later flow)
- ✅ Stock movement log written on every stock change
- ✅ Seed data: 8 categories, 36 products (idempotent per slug)

---

## What Is NOT Yet Built

| Item | Reason |
|---|---|
| Razorpay one-time payment | Awaiting Razorpay merchant account approval |
| Razorpay Subscription / Membership | Depends on Razorpay payment integration |
| Delivery partner assignment | Post-MVP |
| Coupon / discount system | Post-MVP |
| Customer notifications (SMS/email) | Post-MVP |
| Multi-branch support | Post-MVP |

---

## Technical Verification Status

| Check | Result |
|---|---|
| `npx convex codegen` | ✅ Clean |
| `pnpm lint` | ✅ Clean |
| `pnpm typecheck` | ✅ Clean |
| `pnpm build` | ✅ Clean — 25 routes, Next.js 16.2.9 webpack |

---

## Active Payment Model

All orders currently use **Pay Later** — payment is collected manually at or after delivery. This is the intentional MVP model until Razorpay integration is complete.

- `paymentMethod: "pay_later"`
- `paymentStatus: "pending"` on placement
- Admin updates order status manually

---

## Environment

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Backend | Convex | 1.41+ |
| Auth | Clerk | v7 |
| UI | shadcn/ui + Tailwind CSS | v4 |
| Cart state | Zustand | — |
| Package manager | pnpm | 11.7.0 |
| Deployment target | Vercel + Convex Cloud | — |

---

## Next Milestone

**Phase 11 — Razorpay Integration**

Pre-requisites:
- [ ] Razorpay merchant account approved
- [ ] `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` available
- [ ] Set env vars in Convex dashboard (NOT in .env.local)
- [ ] Razorpay test mode verified end-to-end

See `BUILD_PLAN.md` §6–9 for the full Razorpay implementation specification.

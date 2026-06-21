# Nuemart — Product Roadmap

High-level view of all phases, their themes, and their status. This is the authoritative source for what has been built and what comes next.

---

## Roadmap Philosophy

- **Ship the core first.** The MVP is an end-to-end grocery ordering experience. Nothing ships until that loop is complete.
- **India-first always.** Razorpay before anything else. No Stripe. No global payment platforms.
- **Evaluate before building.** Delivery Management and Coupons are candidates, not commitments. They must pass a module evaluation before entering the roadmap.
- **No scope creep.** Features not in an approved PRD do not get built, even if they seem small.

---

## Phase History (MVP Build)

| Phase | Theme | Status | Key Deliverables |
|---|---|---|---|
| 1 | Foundation — Clerk, Convex, Nuemart setup | ✅ Complete | Auth, database, project scaffold |
| 2 | Customer storefront — products, categories, search, favourites, cart | ✅ Complete | Product listing, search, category filter, cart, favourites |
| 3 | Admin CRUD — categories and products | ✅ Complete | Admin category and product management |
| 4 | Address management and checkout readiness | ✅ Complete | Address CRUD, checkout address guard |
| 5 | Order placement without payment | ✅ Complete | Pay Later order flow, order history |
| 6 | Admin orders and fulfilment management | ✅ Complete | Admin order list, order detail, status update |
| 7 | Inventory controls, stock audit, operational hardening | ✅ Complete | Manual stock adjustment, stock movement log, low-stock filters |
| 8 | Production hardening, seed data, deployment readiness | ✅ Complete | Seed data (8 categories, 36 products), build clean, lint clean |
| 9 | UX polish, customer experience and MVP refinement | ✅ Complete | Mobile-responsive header, loading states, UX improvements |
| 10 | Final pre-deployment smoke testing and bug fixes | ✅ Complete | 25 routes validated, 2 bugs fixed, typecheck and build clean |

---

## Active Phases

| Phase | Theme | Status | Target |
|---|---|---|---|
| 11 | Razorpay Payment Gateway Integration | 🔲 Not started | Awaiting merchant account approval |
| — | Product OS Setup | 🔄 In Progress | Architecture, module catalogue, screen registry, roadmap |

---

## Planned Phases

| Phase | Theme | Status | Pre-requisites |
|---|---|---|---|
| 12 | Razorpay Subscription — Free Delivery | 📋 Planned | Phase 11 complete |
| 13 | Discount Coupons | 📋 Planned (Conditional) | Business decision: needed before payment goes live? |

---

## Candidate Phases (Evaluation Required)

| Phase | Theme | Status | Next Action |
|---|---|---|---|
| — | Delivery Management | ✅ Evaluation Approved → PRD in progress | EVAL-0001 approved 2026-06-21. IMPACT-0001 complete. PRD-0001 next. |
| — | Customer Notifications (SMS/Email) | 🔍 Candidate | Define provider, scope, and triggers |
| — | Reporting Dashboards | 🔍 Candidate | Define which metrics, for whom, at what cadence |
| — | Multi-branch / Multi-site | 🔍 Candidate | Major architectural decision — evaluate separately |

---

## Future Phases

| Theme | Notes |
|---|---|
| Refunds | Depends on Razorpay integration and operations readiness |
| Delivery Assignment | Depends on Delivery Management module evaluation |
| Advanced Analytics | Depends on sufficient order volume |
| Admin Mobile App | Consider only after web admin is proven |

---

## Razorpay Pre-requisites (Phase 11 Gate)

Before Phase 11 can begin:

- [ ] Razorpay merchant account approved
- [ ] `RAZORPAY_KEY_ID` available
- [ ] `RAZORPAY_KEY_SECRET` available
- [ ] `RAZORPAY_WEBHOOK_SECRET` available
- [ ] Env vars set in Convex dashboard (not in `.env.local`)
- [ ] Test mode verified end-to-end in development

---

## Roadmap Change Rules

1. A phase cannot start without all pre-requisites complete.
2. Candidate phases must be approved via MODULE_EVALUATION_BOARD.md before moving to Planned.
3. Planned phases must have a PRD before entering development.
4. The roadmap is updated here when phases change status.
5. See ROADMAP_DECISIONS.md for the reasoning behind any major roadmap call.

---

*Last updated: 2026-06-21*

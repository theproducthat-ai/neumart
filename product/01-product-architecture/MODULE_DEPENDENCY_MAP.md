# Nuemart — Module Dependency Map

Documents the dependencies and integration points between all modules in the Nuemart platform.

---

## Module Status Legend

| Status | Meaning |
|---|---|
| **Built** | Module is implemented and active |
| **Pending** | Module is scoped and planned — not yet implemented |
| **Candidate** | Module is under evaluation — no build commitment |
| **Future Candidate** | Feature or module identified for the future — no evaluation started |

---

## Modules

| Module | Status |
|---|---|
| Customer Commerce | Built |
| Admin Console | Built |
| Inventory Management | Built |
| Payment Management | Pay Later built — Razorpay pending |
| User Management | Built |
| Reporting & Analytics | Built (basic only) |
| Delivery Management | Candidate — not built |

---

## Dependency Map

### Customer Commerce → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| User Management | Authentication (Clerk) required to access cart, checkout, orders | Built |
| User Management | Address required before checkout is allowed | Built |
| Inventory Management | Stock levels shown on product detail and enforced at order placement | Built |
| Payment Management | Pay Later method used at checkout today | Built |
| Payment Management | Razorpay integration required for online payment at checkout | Pending (Phase 11) |
| [Discount Coupons] | Coupon codes applied at cart / checkout to reduce total | Future Candidate |

---

### Admin Console → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| User Management | Admin role check (Clerk public metadata) gates all `/admin/*` routes | Built |
| Inventory Management | Inventory overview and adjustment screens live under admin | Built |
| Reporting & Analytics | Dashboard stats sourced from order and stock data | Built (basic) |
| Payment Management | Razorpay payment IDs and status displayed on admin order detail | Pending (Phase 11) |
| [Delivery Management] | Delivery assignment and status management will be in admin | Candidate |
| [Discount Coupons] | Admin CRUD for coupons and usage reporting | Future Candidate |

---

### Inventory Management → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| Customer Commerce | Order placement triggers stock deduction | Built |
| Admin Console | Manual stock adjustments performed via admin | Built |
| Payment Management | Stock reduction on Razorpay-verified payment (Phase 11 update) | Pending (Phase 11) |

---

### Payment Management → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| User Management | Payer identity linked to Convex user record | Built |
| Customer Commerce | Order total and delivery fee calculated by checkout | Built |
| Inventory Management | Successful payment triggers stock deduction | Built (Pay Later) / Pending (Razorpay) |
| [Razorpay External] | Razorpay merchant account, Orders API, Checkout SDK, Webhooks | Pending — awaiting account approval |

---

### User Management → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| [Clerk External] | Authentication, session management, role metadata | Built |
| Customer Commerce | Address is a prerequisite for customer checkout | Built |

---

### Reporting & Analytics → depends on

| Depends On | Nature of Dependency | Status |
|---|---|---|
| Customer Commerce | Order data source for sales reporting | Built (basic) |
| Inventory Management | Stock movement data for inventory reports | Built (basic) |
| Payment Management | Payment data for revenue and reconciliation reports | Pending (Razorpay data) |
| [Delivery Management] | Delivery performance metrics | Candidate |
| [Discount Coupons] | Coupon usage and discount reporting | Future Candidate |

---

### Delivery Management *(Candidate — not built)*

| Depends On | Nature of Dependency | Status |
|---|---|---|
| Customer Commerce | Orders to be delivered are sourced from order system | Candidate |
| User Management | Delivery persons may require their own Clerk user accounts or role | Candidate |
| Admin Console | Delivery management UI lives within admin | Candidate |
| Reporting & Analytics | Delivery performance feeding into reports | Candidate |

**Note:** Delivery Management has no build commitment. It must pass a formal module evaluation (MODULE_EVALUATION_BOARD.md) before any work begins.

---

## Dependency Diagram (textual)

```
                    ┌─────────────────────────┐
                    │      User Management     │
                    │   (Clerk Auth + Addresses)│
                    └──────────┬──────────────┘
                               │ gates all modules
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│Customer Commerce│  │  Admin Console  │  │   Payment Mgmt  │
│ (Storefront)    │  │ (Operations)    │  │ (Pay Later/RPay)│
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                     │
         ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Inventory Management                   │
│         (stock levels, movements, audit trail)          │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
             ┌───────────────────────┐
             │ Reporting & Analytics │
             │   (basic stats only)  │
             └───────────────────────┘

- - - - - - - - - CANDIDATE LAYER - - - - - - - - - -

             ┌───────────────────────┐
             │   Delivery Management │  ← Candidate / Not Built
             │   (future evaluation) │
             └───────────────────────┘

- - - - - - - - FUTURE CANDIDATES - - - - - - - - - -

             ┌───────────────────────┐
             │   Discount Coupons    │  ← Future Feature Candidate
             │   (cart + checkout)   │
             └───────────────────────┘
```

---

## Key Cross-Cutting Concerns

| Concern | How Handled |
|---|---|
| Authentication | Clerk — all modules rely on Clerk session for user identity |
| Data integrity | Convex — all mutations are transactional; no direct DB access outside Convex functions |
| Payment trust | Webhook-only — payment status is never trusted from frontend; only Razorpay webhook updates `paymentStatus` |
| Stock integrity | Stock is only deducted on verified order / payment events; never from frontend directly |
| Admin access | Server-side Clerk role check in admin layout — not client-side only |

---

*Last updated: 2026-06-21*

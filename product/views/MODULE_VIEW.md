# Nuemart Product OS — Module View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

Summary view of all product modules. Source: `product/graph/MODULE_MAP.md` and `product/03-module-catalogue/`.

---

## Module Registry

| Module | Code | Status | Sub-modules | Active Features | Key Screens | Notes |
|---|---|---|---|---|---|---|
| Customer Commerce | COM | Built | PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS | FEATURE-COM-PLP-CAROUSEL (In UAT) | SCR-CUS-0001 through SCR-CUS-0010 | Core customer-facing shopping experience |
| Admin Console | ADM | Built | ADMCAT, ADMPRODUCT, ADMORD, ADMINV | None active | SCR-ADM-0001 through SCR-ADM-0011 | Internal admin management interface |
| Delivery Management | DEL | Candidate / Approved | DELASSIGN, DELSTATUS, DELEXCEPT | FEATURE-DEL-CORE-DELIVERY-MVP (Planned) | Not yet built | PRD approved, development not started; sequenced after Razorpay |
| Inventory Management | INV | Built (basic) | STOCK, STOCKMOV | None active | Part of ADM screens | Basic stock tracking and movement audit trail; enhancement candidates exist |
| Payment Management | PAY | Partial | PAYCHK, PAYVERIFY | Razorpay integration (Phase 11, blocked) | Part of CHK flow | Pay Later implemented; Razorpay blocked on merchant account approval |
| User / Identity | USR | Built | AUTH, ROLES, ADDR | None active | SCR-AUTH-0001 through SCR-AUTH-0002 | Clerk authentication; customer address management |
| Reports / Analytics | RPT | Partial | RPTDASH | None formally active | Part of ADM screens | Basic admin dashboard exists; full reporting module not yet scoped |

---

## Module Status Definitions

| Status | Meaning |
|---|---|
| **Built** | Module is live in production, all core sub-modules delivered in Phases 1–10 |
| **Built (basic)** | Module exists but is a minimal implementation; full capabilities not yet built |
| **Partial** | Module is partially implemented — some sub-modules live, others pending |
| **Candidate / Approved** | Module has been formally evaluated and PRD approved, but development not yet started |
| **Candidate** | Module has been identified but not yet formally evaluated or approved |

---

## Sub-module Reference

### COM — Customer Commerce
- **PLP** — Product Listing Page (search, filter, browse) — includes FEATURE-COM-PLP-CAROUSEL
- **PDP** — Product Detail Page (product info, add to cart)
- **CART** — Shopping Cart (add, remove, update quantities)
- **CHK** — Checkout (address, payment selection, order placement)
- **ADDR** — Customer Address management
- **FAV** — Favourites / Wishlist
- **ORDHIS** — Order History (customer order tracking)

### ADM — Admin Console
- **ADMCAT** — Category CRUD (create, edit, delete categories)
- **ADMPRODUCT** — Product CRUD (create, edit, manage products and stock)
- **ADMORD** — Order management (view, process, update orders)
- **ADMINV** — Inventory tracking (stock levels, movement)

### DEL — Delivery Management (Planned)
- **DELASSIGN** — Delivery assignment to riders/agents
- **DELSTATUS** — Delivery status tracking and updates
- **DELEXCEPT** — Exception handling (failed deliveries, rescheduling)

### INV — Inventory Management
- **STOCK** — Current stock levels
- **STOCKMOV** — Stock movement audit trail

### PAY — Payment Management
- **PAYCHK** — Payment at checkout (Pay Later implemented; Razorpay pending)
- **PAYVERIFY** — Payment verification and reconciliation

### USR — User / Identity
- **AUTH** — Authentication via Clerk
- **ROLES** — Role management (customer, admin)
- **ADDR** — Address management (shared with COM/ADDR)

### RPT — Reports / Analytics
- **RPTDASH** — Admin dashboard (basic metrics; full reporting not yet scoped)

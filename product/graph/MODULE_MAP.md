# Nuemart Product OS — Module Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

**Migration Note:** This file consolidates and extends content from `product/01-product-architecture/PRODUCT_HIERARCHY.md` and `product/03-module-catalogue/MODULE_MASTER.md`. Those files remain authoritative for their original detail; this file is the graph-layer view.

---

## 1. Module Registry

| Module ID | Code | Name | Status | Sub-modules | Customer Screens | Admin Screens | Auth Screens | Features |
|---|---|---|---|---|---|---|---|---|
| MODULE-COM | COM | Customer Commerce | Built | PLP, PDP, CART, CHK, FAV, ORDHIS | SCR-CUS-0001–0004, SCR-CUS-0008–0010 | — | — | FEATURE-COM-PLP-CAROUSEL |
| MODULE-ADM | ADM | Admin Console | Built | ADMCAT, ADMPRODUCT, ADMORD, ADMINV | — | SCR-ADM-0001–0011 | — | — |
| MODULE-DEL | DEL | Delivery Management | Candidate — Approved for build | DELASSIGN, DELSTATUS, DELEXCEPT | — | TBD (2 screens planned) | — | FEATURE-DEL-CORE-DELIVERY-MVP |
| MODULE-INV | INV | Inventory Management | Built (basic) | STOCK, STOCKMOV | — | SCR-ADM-0010–0011 | — | — |
| MODULE-PAY | PAY | Payment Management | Partial — Pay Later built, Razorpay blocked | PAYCHK, PAYVERIFY, PAYWEBHOOK | — | — | — | — |
| MODULE-USR | USR | User / Identity | Built | AUTH, ROLES, ADDR | SCR-CUS-0005–0007 | — | SCR-AUTH-0001–0002 | — |
| MODULE-RPT | RPT | Reporting & Analytics | Partial — basic dashboard only | RPTDASH, RPTORD, RPTINV | — | SCR-ADM-0001 (partial) | — | — |

---

## 2. Module Detail

### MODULE-COM — Customer Commerce

**Status:** Built
**Purpose:** Everything the customer sees and interacts with on the storefront.
**Owner:** Product Owner

| Sub-module | Code | Description | Screens |
|---|---|---|---|
| Product Listing Page | PLP | Main storefront; search, filter, carousel | SCR-CUS-0001 |
| Product Detail Page | PDP | Individual product view with add-to-cart | SCR-CUS-0002 |
| Cart | CART | Zustand-backed cart with localStorage | SCR-CUS-0003 |
| Favourites | FAV | Customer saved products list | SCR-CUS-0004 |
| Checkout | CHK | Order summary, address, payment, order placement | SCR-CUS-0008 |
| Order History | ORDHIS | Past orders list and detail | SCR-CUS-0009, SCR-CUS-0010 |

**Features in this module:**
- FEATURE-COM-PLP-CAROUSEL (In UAT)

**Candidate features:**
- Admin-managed carousel content
- Coupon/discount at cart and checkout

---

### MODULE-ADM — Admin Console

**Status:** Built
**Purpose:** Internal tool for operations staff to manage products, categories, orders, inventory, and (eventually) delivery.
**Owner:** Product Owner / Ops Team

| Sub-module | Code | Description | Screens |
|---|---|---|---|
| Dashboard | ADMDASH | Overview stats: orders, revenue, inventory alerts | SCR-ADM-0001 |
| Categories | ADMCAT | CRUD for product categories | SCR-ADM-0002, 0003, 0004 |
| Products | ADMPRODUCT | CRUD for products | SCR-ADM-0005, 0006, 0007 |
| Orders | ADMORD | Order management, status updates | SCR-ADM-0008, 0009 |
| Inventory | ADMINV | Stock overview and manual adjustments | SCR-ADM-0010, 0011 |

**Notes:**
- Admin access gated by Clerk `publicMetadata.role = "admin"` (DEC-008)
- Admin layout uses server-side role check via Next.js middleware

**Candidate features:**
- Admin-managed carousel content (Candidate — needs screen)
- Delivery management UI (Candidate — when DEL module is built)
- Coupon management (Future Candidate)

---

### MODULE-DEL — Delivery Management

**Status:** Candidate — PRD Approved, development not yet started
**Purpose:** Track and manage delivery of orders from placement to doorstep.
**Owner:** Product Owner

| Sub-module | Code | Description | Screens |
|---|---|---|---|
| Delivery Assignment | DELASSIGN | Assign delivery person to an order | TBD (new screen required) |
| Delivery Status | DELSTATUS | View and update delivery status lifecycle | TBD (new screen required) |
| Delivery Exceptions | DELEXCEPT | Handle failed deliveries and exceptions | Merged into DELSTATUS for MVP |

**Features in this module:**
- FEATURE-DEL-CORE-DELIVERY-MVP (PRD Approved — Planned)

**Key decisions:**
- DEC-012: Delivery task created atomically with order placement
- DEC-013: Delivery status is fully decoupled from order, payment, and stock
- DEC-014: Delivery person stored as inline strings (no FK) in MVP

**Development note:** Sequenced after Phase 11 (Razorpay). Phase 11 blocked on merchant account.

---

### MODULE-INV — Inventory Management

**Status:** Built (basic)
**Purpose:** Track stock levels and movement for all products.
**Owner:** Product Owner / Ops Team

| Sub-module | Code | Description | Screens |
|---|---|---|---|
| Stock Overview | STOCK | All products with stock status and filters | SCR-ADM-0010 |
| Stock Movements | STOCKMOV | Audit trail of all stock changes for a product | SCR-ADM-0011 |

**Notes:**
- Stock reduced at order placement in Pay Later flow (DEC-007)
- Will shift to stock reduction on Razorpay webhook in Phase 11 (DEC-007)

---

### MODULE-PAY — Payment Management

**Status:** Partial — Pay Later built; Razorpay blocked on merchant account
**Purpose:** Process payments at checkout.
**Owner:** Product Owner

| Sub-module | Code | Description | Status |
|---|---|---|---|
| Pay Later Checkout | PAYCHK | Place order with deferred payment | Built |
| Razorpay Verification | PAYVERIFY | Verify payment signature and update order | Pending Phase 11 |
| Razorpay Webhooks | PAYWEBHOOK | Handle payment.captured and payment.failed events | Pending Phase 11 |

**Key decisions:**
- DEC-001: Razorpay is the only payment provider (India-first)
- DEC-005: Pay Later used for MVP while Razorpay account pending
- DEC-006: Razorpay called via fetch + Basic Auth, not npm SDK (Convex V8 compatibility)

**External blocker:** Razorpay merchant account approval — no ETA.

---

### MODULE-USR — User / Identity

**Status:** Built
**Purpose:** Authentication, session management, role-based access, and address management.
**Owner:** Product Owner

| Sub-module | Code | Description | Screens |
|---|---|---|---|
| Authentication | AUTH | Sign in, sign up (Clerk-managed) | SCR-AUTH-0001, SCR-AUTH-0002 |
| Roles | ROLES | Admin role via Clerk publicMetadata | No dedicated screen |
| Addresses | ADDR | Customer address CRUD | SCR-CUS-0005, 0006, 0007 |

**Key decisions:**
- DEC-003: No userId from frontend — always resolved via ctx.auth.getUserIdentity()
- DEC-008: Admin role via Clerk publicMetadata, not a separate DB table

---

### MODULE-RPT — Reporting & Analytics

**Status:** Partial — basic dashboard only
**Purpose:** Provide ops and business team with visibility into orders, revenue, and inventory.
**Owner:** Product Owner

| Sub-module | Code | Description | Screens | Status |
|---|---|---|---|---|
| Dashboard | RPTDASH | Overview stats: orders, inventory alerts, revenue | SCR-ADM-0001 | Built (basic) |
| Order Reports | RPTORD | Full order reporting | TBD | Not yet built |
| Inventory Reports | RPTINV | Stock movement reporting | TBD | Not yet built |

---

## 3. Module Dependency Matrix

| Module | COM | ADM | DEL | INV | PAY | USR | RPT |
|---|---|---|---|---|---|---|---|
| COM | — | — | — | depends on | depends on | depends on | — |
| ADM | — | — | candidate | depends on | depends on | depends on | depends on |
| DEL | depends on | depends on | — | — | — | candidate | candidate |
| INV | depends on | depends on | — | — | candidate | — | — |
| PAY | depends on | — | — | depends on | — | depends on | — |
| USR | — | — | — | — | — | — | — |
| RPT | depends on | — | candidate | depends on | candidate | — | — |

---

## 4. Next Module ID

Next Module Object ID to be assigned: `MODULE-NOT` (Notifications — if evaluated and approved) or per nomenclature system.

---

*Last updated: 2026-06-22*

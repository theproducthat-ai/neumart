# Nuemart Product OS — Data Entity Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

**Migration Note:** This file extends `product/01-product-architecture/DATA_ENTITY_MAP.md`. That file remains the authoritative source for full field definitions. This map adds graph-layer object IDs, feature linkages, and schema change risk flags.

---

## 1. Entity Overview

| Entity ID | Name | Module | Status | Linked Features | Schema Change Risk |
|---|---|---|---|---|---|
| ENTITY-USR-USERS | users | USR | Current — Active | All features (auth dependency) | Low — stable |
| ENTITY-COM-CATEGORIES | categories | COM/ADM | Current — Active | All product features | Low — stable |
| ENTITY-COM-PRODUCTS | products | COM/ADM | Current — Active | All commerce features | Low — stable |
| ENTITY-COM-FAVOURITES | favourites | COM | Current — Active | — | Low — stable |
| ENTITY-USR-ADDRESSES | addresses | USR | Current — Active | FEATURE-COM-PLP-CAROUSEL (indirect — checkout dependency) | Low — stable |
| ENTITY-COM-ORDERS | orders | COM | Current — Active | FEATURE-DEL-CORE-DELIVERY-MVP (mutation change per DEC-012) | Medium — mutation change required |
| ENTITY-COM-ORDERITEMS | orderItems | COM | Current — Active | — | Low — stable |
| ENTITY-PAY-PAYMENTS | payments | PAY | Current — Active | — | Low (Phase 11 will add Razorpay fields) |
| ENTITY-INV-STOCKMOVEMENTS | stockMovements | INV | Current — Active | — | Low — stable |
| ENTITY-DEL-DELIVERYTASKS | deliveryTasks | DEL | Planned — Schema Change Required | FEATURE-DEL-CORE-DELIVERY-MVP | High — new table |
| ENTITY-DEL-DELIVERYPERSONS | deliveryPersons | DEL | Candidate — Deferred per DEC-014 | FEATURE-DEL-CORE-DELIVERY-MVP (future) | Candidate — not committed |
| ENTITY-COM-COUPONS | coupons | COM | Future Candidate | — | N/A |
| ENTITY-COM-COUPONUSAGES | couponUsages | COM | Future Candidate | — | N/A |
| ENTITY-PAY-REFUNDS | refunds | PAY | Future Candidate | — | N/A |
| ENTITY-COM-NOTIFICATIONS | notifications | — | Future Candidate | — | N/A |

---

## 2. Current Entities (in Convex Schema)

### users

| Field | Type | Notes |
|---|---|---|
| tokenIdentifier | string | Clerk token identifier — primary external reference |
| email | string | Customer email |
| name | string (optional) | Display name |
| phone | string (optional) | Customer phone number |
| role | string (optional) | `"admin"` when set; absent for regular customers |
| createdAt | number | Unix timestamp |

**Module:** USR | **Status:** Current — Active
**Relationships:** One user → many addresses, many orders, many favourites
**Linked features:** All features (auth dependency — Clerk + Convex user sync)
**Schema change risk:** Low. Phase 12 (Razorpay Subscription) will add `freeShippingEligible` and `subscriptionStatus` fields.

---

### categories

**Module:** COM/ADM | **Status:** Current — Active
**Key fields:** name, slug, isActive, createdAt
**Relationships:** One category → many products
**Schema change risk:** Low — stable

---

### products

**Module:** COM/ADM | **Status:** Current — Active
**Key fields:** name, slug, description, price (paise), categoryId, imageUrl, isActive, stock, createdAt
**Relationships:** One product → many orderItems, many favourites, many stockMovements; one product → one category
**Schema change risk:** Low — stable

---

### favourites

**Module:** COM | **Status:** Current — Active
**Key fields:** userId, productId, createdAt
**Relationships:** Many-to-many join table between users and products
**Schema change risk:** Low — stable

---

### addresses

**Module:** USR | **Status:** Current — Active
**Key fields:** userId, label, line1, line2, city, state, pincode, phone, isDefault, createdAt
**Relationships:** One address → many orders (as snapshot)
**Schema change risk:** Low — stable

---

### orders

**Module:** COM | **Status:** Current — Active
**Key fields:** userId, addressSnapshot (object), status, paymentMethod, paymentStatus, subtotal, deliveryFee, total, razorpayOrderId (optional), razorpayPaymentId (optional), notes, createdAt
**Relationships:** One order → many orderItems, one or more payments
**Linked features:** FEATURE-DEL-CORE-DELIVERY-MVP — the `placeOrder` mutation must be modified to atomically create a `deliveryTasks` record (DEC-012)
**Schema change risk:** Medium — mutation modification required, not a schema field change

---

### orderItems

**Module:** COM | **Status:** Current — Active
**Key fields:** orderId, productId, productName (snapshot), unitPrice (snapshot, paise), quantity, subtotal
**Relationships:** Many orderItems → one order, one product
**Schema change risk:** Low — stable

---

### payments

**Module:** PAY | **Status:** Current — Active
**Key fields:** orderId, userId, amount (paise), currency (INR), method, status, razorpayOrderId (optional), razorpayPaymentId (optional), webhookVerifiedAt (optional), createdAt
**Relationships:** One payment → one order
**Schema change risk:** Low for now; Phase 11 may add additional Razorpay-specific fields

---

### stockMovements

**Module:** INV | **Status:** Current — Active
**Key fields:** productId, delta (positive/negative), reason, orderId (optional), note, performedBy, createdAt
**Relationships:** Many stockMovements → one product
**Schema change risk:** Low — stable

---

## 3. Planned Entities (Schema Change Required Before Build)

### deliveryTasks

**Module:** DEL | **Status:** Planned — Schema migration required before FEATURE-DEL-CORE-DELIVERY-MVP can be built
**Linked features:** FEATURE-DEL-CORE-DELIVERY-MVP

| Field | Type | Notes |
|---|---|---|
| orderId | Id<"orders"> | The order to be delivered |
| assignedTo | string (optional) | Delivery person name — inline string per DEC-014 |
| assignedContact | string (optional) | Delivery person contact — inline string per DEC-014 |
| status | string | `"unassigned"` / `"assigned"` / `"picked_up"` / `"in_transit"` / `"delivered"` / `"failed"` |
| proofUrl | string (optional) | URL of delivery proof photo |
| notes | string (optional) | Delivery notes or exception details |
| assignedAt | number (optional) | Timestamp of assignment |
| deliveredAt | number (optional) | Timestamp of delivery confirmation |
| createdAt | number | Unix timestamp |

**Decision notes:**
- DEC-014: No FK to deliveryPersons table in MVP — assignedTo and assignedContact are inline strings
- DEC-012: deliveryTasks record created atomically inside placeOrder mutation
- DEC-013: deliveryTasks mutations must not write to orders, payments, or products tables

**Schema change risk:** High — new table, mutation modification, must be done in first delivery story (STORY-DEL-CORE-DELIVERY-SCHEMA-001)

---

## 4. Candidate Entities (Not Committed)

| Entity | Module | Status | Notes |
|---|---|---|---|
| deliveryPersons | DEL | Candidate — deferred per DEC-014 | Future: FK-based delivery person roster; not in MVP |
| coupons | COM | Future Candidate | Requires module evaluation and PRD |
| couponUsages | COM | Future Candidate | Depends on coupons entity |
| refunds | PAY | Future Candidate | Depends on Razorpay integration |
| notifications | — | Future Candidate | No provider chosen; no evaluation started |

---

## 5. Entity Relationship Summary

```
users
  +-- addresses (1:N)
  +-- orders (1:N)
  |     +-- orderItems (1:N) --> products
  |     +-- payments (1:1)
  |     +-- [deliveryTasks] (1:1) -- PLANNED
  +-- favourites (N:M via favourites table) --> products

products
  +-- categories (N:1)
  +-- stockMovements (1:N)
  +-- orderItems (1:N)
  +-- favourites (1:N)

[coupons] (Future Candidate)
  +-- [couponUsages] (1:N)

[deliveryPersons] (Candidate — deferred per DEC-014)
  +-- [deliveryTasks] (1:N) (Future: when FK model adopted)
```

---

## 6. Schema Change Risk Summary

| Risk Level | Entities | Action Required |
|---|---|---|
| High | deliveryTasks (new table) | Schema migration, type regen, test coverage — Story STORY-DEL-CORE-DELIVERY-SCHEMA-001 |
| Medium | orders (mutation change) | placeOrder mutation modification — Story STORY-DEL-CORE-DELIVERY-BACKEND-002 |
| Low | All current entities | No immediate action |

---

*Last updated: 2026-06-22*

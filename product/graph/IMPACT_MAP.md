# Nuemart Product OS — Impact Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Introduction

This file maps the impact of each feature across modules, data entities, screens, and risk categories. It is a summary view. Formal Impact Assessment objects (in `product/objects/`) are the authoritative source.

---

## 1. How to Read This Map

For each feature:
- **Module Impact**: which modules are touched, added, or changed
- **Schema Impact**: are new Convex tables or field changes required?
- **Screen Impact**: are existing screens changed, or new screens required?
- **Role/Auth Impact**: are new roles or permission changes required?
- **Payment Impact**: is payment flow affected?
- **Risk Level**: Low / Medium / High / Critical

Use this map to quickly determine whether a feature requires:
- A formal impact assessment (High/Critical risk features always do)
- Schema migration planning
- Cross-module coordination
- A new screen or route
- A Convex mutation change

---

## 2. Active Impact Assessments

| Feature | Impact Assessment Object | Status | Risk Level |
|---|---|---|---|
| FEATURE-DEL-CORE-DELIVERY-MVP | IMPACT-0001 (Delivery Impact Assessment) | Approved | High |
| FEATURE-COM-PLP-CAROUSEL | None — low-risk feature, no formal assessment conducted | N/A | Low |

**Note on FEATURE-COM-PLP-CAROUSEL:** No formal impact assessment exists. This was acceptable because: no schema change, no payment impact, no role change, no new module, single screen (SCR-CUS-0001) addition only. The feature was classified Low risk at intake.

---

## 3. Impact by Module

| Feature | MODULE-COM | MODULE-ADM | MODULE-DEL | MODULE-INV | MODULE-PAY | MODULE-USR | MODULE-RPT |
|---|---|---|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | Modified (PLP screen) | None | None | None | None | None | None |
| FEATURE-DEL-CORE-DELIVERY-MVP | Read (orders) | New screens required | New module built | None | None | Possible (delivery person roles — deferred per DEC-014) | Future (delivery metrics) |

**Legend:** None = no impact | Read = reads data only | Modified = existing component/screen changed | New = new code required

---

## 4. Schema Change Impact

| Feature | Schema Change | Tables Affected | Change Type | Risk | Decision Reference |
|---|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | None | None | N/A | None | Banners are hardcoded in component (no schema) |
| FEATURE-DEL-CORE-DELIVERY-MVP | Yes | `deliveryTasks` (new table) | Add new table | High | DEC-012, DEC-013, DEC-014 |
| FEATURE-DEL-CORE-DELIVERY-MVP | Possible | `orders` mutation | Modify existing mutation (atomic task creation per DEC-012) | Medium | DEC-012 |
| FEATURE-DEL-CORE-DELIVERY-MVP | No | `deliveryPersons` | Deferred — strings used instead per DEC-014 | Low | DEC-014 |

**All schema changes require:** Convex schema migration, type regeneration, and test coverage before production deployment.

---

## 5. Screen Impact

| Feature | Screens Modified | Screens Added | Notes |
|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | SCR-CUS-0001 (carousel added to PLP) | None | Carousel component added to existing page |
| FEATURE-DEL-CORE-DELIVERY-MVP | SCR-ADM-0008 (Order List — delivery status column), SCR-ADM-0009 (Order Detail — delivery section) | 2 new planned delivery admin screens (not yet registered) | Delivery detail screen (SCR-ADM-TBD) and delivery list screen (SCR-ADM-TBD) |

---

## 6. Payment Impact

| Feature | Payment Impact | Notes |
|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | None | Promotional display only |
| FEATURE-DEL-CORE-DELIVERY-MVP | None | Delivery status is decoupled from payment per DEC-013 |

---

## 7. Role / Auth Impact

| Feature | Role Change | Auth Change | Notes |
|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | None | None | Customer-facing, no new permissions |
| FEATURE-DEL-CORE-DELIVERY-MVP | Possible (delivery person role) | Deferred per DEC-014 | MVP uses inline strings; no new Clerk role needed in V1 |

---

## 8. High-Risk Change Tracker

Changes classified as High or Critical risk:

| Risk ID | Feature | Risk | Category | Level | Mitigation | Status |
|---|---|---|---|---|---|---|
| RISK-DEL-SCHEMA-CHANGE-001 | FEATURE-DEL-CORE-DELIVERY-MVP | New deliveryTasks table required | Schema Change | High | Included in DEVPLAN-0001 as first story; atomic creation per DEC-012 | Identified |
| RISK-DEL-MUTATION-CHANGE-001 | FEATURE-DEL-CORE-DELIVERY-MVP | Order placement mutation must be modified | Mutation Change | Medium | Delivery task created atomically in same mutation (DEC-012) | Identified |
| RISK-PAY-CORE-MERCHANT-001 | MODULE-PAY | Razorpay merchant account not approved | External Blocker | High | Phase 11 on hold; Pay Later in production | Accepted, monitoring |

*See `product/graph/RISK_MAP.md` for the full risk registry.*

---

## 9. Impact Classification Rules

| If the feature... | Then impact level is... | Formal assessment required? |
|---|---|---|
| Only adds a UI component to an existing screen | Low | No |
| Adds a new page/route but no schema change | Low-Medium | Recommended |
| Requires a new Convex table | High | Yes |
| Modifies an existing Convex mutation | Medium | Yes |
| Changes payment flow | Critical | Yes |
| Adds or changes user roles | High | Yes |
| Creates a new module | High | Yes |

---

*Last updated: 2026-06-22*

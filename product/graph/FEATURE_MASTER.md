# Nuemart Product OS — Feature Master

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Purpose

The Feature Master is the single source of truth for what product capabilities exist, what state they are in, and where they are in the delivery lifecycle. Every Feature Object must be registered here. Update this file whenever a Feature Object is created or its status changes.

This file does **not** replace Feature Object files — those contain the full detail. This file is the summary view used for roadmap tracking, sprint planning, and stakeholder communication.

---

## Summary Table

| Feature ID | Legacy ID | Name | Module | Sub-module | Status | Maturity | PRD | Stories | QA | UAT | Release | Risk | Last Updated |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | FEAT-Product-Listing-Carousel | Promotional Banner Carousel | COM | PLP | UAT Passed — Ready for Release | Shipped — UAT Conditional Pass ✅ | PRD-COM-PLP-CAROUSEL-V1 | 6 stories — all Done | QA-COM-PLP-CAROUSEL-RUN-001 (Passed 20/20) | UAT-COM-PLP-CAROUSEL-RUN-001 (Conditional Pass 2026-06-23) | RELEASE-COM-PLP-CAROUSEL-2026-06 (Ready — run /product-release) | Low | 2026-06-23 |
| FEATURE-DEL-CORE-DELIVERY-MVP | — | Delivery Management MVP | DEL | CORE | PRD Approved | Planned — Dev Not Started | PRD-DEL-CORE-DELIVERY-MVP-V1 | 8 stories — all Planned | Not yet run | Not yet run | Not yet planned | High | 2026-06-22 |

---

## Detailed Feature Entries

---

### FEATURE-COM-PLP-CAROUSEL

```
Feature ID:         FEATURE-COM-PLP-CAROUSEL
Legacy ID:          FEAT-Product-Listing-Carousel
Display Name:       Promotional Banner Carousel
Module:             Customer Commerce (COM)
Sub-module:         Product Listing Page (PLP)
Capability:         Promotional Content Display
Parent Feature:     None (top-level feature)
Status:             UAT Passed — Ready for Release
Maturity:           Shipped / UAT Conditional Pass ✅

Source Request:     REQUEST-COM-PLP-CAROUSEL-001 (legacy: REQ-0002)
PRD:                PRD-COM-PLP-CAROUSEL-V1 (legacy: PRD-0002)
                    Status: Draft, Awaiting Formal Approval

Stories:
  - STORY-COM-PLP-CAROUSEL-RENDER-001   (US-0009) — Done
  - STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002 (US-0010) — Done
  - STORY-COM-PLP-CAROUSEL-NAV-003      (US-0011) — Done
  - STORY-COM-PLP-CAROUSEL-MOBILE-004   (US-0012) — Done
  - STORY-COM-PLP-CAROUSEL-SWIPE-005    (US-0013) — Done
  - STORY-COM-PLP-CAROUSEL-CLICK-006    (US-0014) — Done

QA:   QA-COM-PLP-CAROUSEL-RUN-001 (QA-0001)
      Result: Passed — 20/20 tests passed

UAT:  UAT-COM-PLP-CAROUSEL-RUN-001 (UAT-0001)
      Status: Conditional Pass ✅ — Signed off by Product Owner 2026-06-23
      Conditions: (1) Replace placeholder images before go-live (config only, no code)
                  (2) Click-through destinations deferred to future enhancement

Release: RELEASE-COM-PLP-CAROUSEL-2026-06
         Status: Pending UAT sign-off

Known Limitations:
  - Banner images are hardcoded; no admin management interface
  - No click-through destination currently (placeholders only)
  - No analytics on banner engagement

Future Candidates:
  - Admin-managed carousel content (Candidate — not committed)
  - Auto-scroll interval configurable by admin (Candidate)
  - Promotional banner analytics (Candidate)
  - Multiple carousel zones on different screens (Candidate)

Risk Level:         Low
Last Updated:       2026-06-22
Object File:        product/objects/features/FEATURE-COM-PLP-CAROUSEL.md
```

---

### FEATURE-DEL-CORE-DELIVERY-MVP

```
Feature ID:         FEATURE-DEL-CORE-DELIVERY-MVP
Legacy ID:          — (new semantic ID assigned during Product OS migration)
Display Name:       Delivery Management MVP
Module:             Delivery Management (DEL)
Sub-module:         Core Delivery (CORE)
Capability:         Order Delivery Lifecycle Tracking
Parent Feature:     None (top-level feature)
Status:             PRD Approved — Development Not Yet Started
Maturity:           Planned

Source Request:     REQUEST-DEL-CORE-DELIVERY-MVP-001 (legacy: REQ-0001)
PRD:                PRD-DEL-CORE-DELIVERY-MVP-V1 (legacy: PRD-0001)
                    Status: Approved — Stories Complete

Stories:
  - STORY-DEL-CORE-DELIVERY-SCHEMA-001  (US-0001) — Planned
  - STORY-DEL-CORE-DELIVERY-BACKEND-002 (US-0002) — Planned
  - STORY-DEL-CORE-DELIVERY-003         (US-0003) — Planned
  - STORY-DEL-CORE-DELIVERY-004         (US-0004) — Planned
  - STORY-DEL-CORE-DELIVERY-005         (US-0005) — Planned
  - STORY-DEL-CORE-DELIVERY-006         (US-0006) — Planned
  - STORY-DEL-CORE-DELIVERY-007         (US-0007) — Planned
  - STORY-DEL-CORE-DELIVERY-008         (US-0008) — Planned

  Note: Canonical STORY-DEL-* IDs need verification against DEV PLAN documents.
        Legacy IDs US-0001–US-0008 are confirmed; new semantic IDs are provisional
        pending review of DEVPLAN-0001 and product/08-user-stories/.

QA:      Not yet run
UAT:     Not yet run
Release: Not yet planned

Known Limitations:
  - Delivery persons stored as strings (assignedTo, assignedContact), not FK to
    deliveryPersons table (Decision DEC-014)
  - No real-time map tracking (out of scope for MVP)
  - No delivery person mobile app (out of scope for MVP)
  - No automated delivery assignment (out of scope for MVP)

Future Candidates:
  - Real-time GPS tracking (Candidate)
  - Delivery person mobile app (Candidate)
  - Automated delivery assignment (Candidate)
  - Delivery SLA monitoring and alerts (Candidate)
  - deliveryPersons table with managed roster (Candidate — DEC-014 revisit)

Risk Level:         High
                    Reason: Schema change required (new deliveryTasks table in Convex).
                    Order placement mutation must be modified (DEC-012).
                    New module being introduced.

Development Note:   Development sequenced after Phase 11 (Razorpay) completes.
                    This is a sequencing preference, not a technical blocker.
                    Phase 11 is currently blocked on Razorpay merchant account approval.

Last Updated:       2026-06-22
Object File:        product/objects/features/ (file not yet created — migration pending)
```

---

## Feature Candidate Registry

Features that have been discussed or are under evaluation but have not been formally approved. These do not have Feature Object files yet.

| Candidate Name | Module | Status | Notes |
|---|---|---|---|
| Admin-managed Carousel Content | COM/PLP | Candidate | Requires Convex banners table; not committed |
| Coupon / Discount System | COM/CART, COM/CHK | Under evaluation | Requires module evaluation; no PRD yet |
| Subscription / Membership Module | PAY | Under evaluation | Razorpay Subscription after Phase 11 |
| Notification System (SMS/email/push) | ALL | Under evaluation | No evaluation started; no provider chosen |
| Reporting & Analytics (enhanced) | RPT | Partial — basic dashboard exists | Full analytics module not yet scoped |
| Multi-branch Support | COM, ADM, DEL | Under evaluation | No evaluation started |
| Delivery Person Mobile App | DEL | Future Candidate | Post-delivery-MVP |
| Real-time GPS Tracking | DEL | Future Candidate | Post-delivery-MVP |

---

## Deprecated Features

None yet. When a feature is deprecated, record it here with the deprecation date, reason, and replacement (if any).

---

## How to Maintain This File

**For AI agents:**
1. When a new Feature Object is created in `product/objects/features/`, immediately add a row to the Summary Table and a detailed entry in this file.
2. When a Feature's status changes (e.g. QA passes, UAT begins, release ships), update both the summary table row and the detailed entry.
3. Do not remove entries — mark them Deprecated if retired.
4. When adding a Candidate feature, add it to the Feature Candidate Registry, not the main table.
5. When a Candidate is formally approved and a Feature Object is created, move it from the Candidate Registry to the main table.

**For humans:**
1. Every time you create a new Request (`/product-request`), check whether a new Feature Object needs to be registered here.
2. Every time a QA or UAT run is completed, update the relevant feature's status row.
3. This file is reviewed during sprint planning and release prep.

---

*Last updated: 2026-06-22*

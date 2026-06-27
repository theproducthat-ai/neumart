# Nuemart Product OS — Object Index

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** SUPERSEDED — Read-only

> **SUPERSEDED** (2026-06-24): This file is the V1 object index. The authoritative V2 replacement is:
> **`product/indexes/MASTER_OBJECT_INDEX.md`**
>
> Do not add new entries here. This file is retained for historical reference only.

---

## How to Use This Index

This is the master index of all Product Objects in the Nuemart Product OS. This file is an **INDEX**, not the source of truth. The source of truth is the individual object files in `product/objects/`. This index enables fast lookup without reading every file.

You can look up objects by:
- **object_id** — e.g. `FEATURE-COM-PLP-CAROUSEL`
- **legacy_id** — e.g. `REQ-0002`, `PRD-0001`, `US-0009`
- **type** — e.g. Feature, Request, PRD, Story, QA Run, UAT Run, Screen, Module
- **module** — e.g. COM, DEL, ADM, INV, PAY, USR, RPT
- **status** — e.g. Active, In UAT, PRD Approved, Done, Passed

---

## Index Format

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|

---

## Current Object Registry

### Strategy Objects

*(None yet — to be created from `product/00-product-foundation/PRODUCT_VISION.md` and `PRODUCT_PRINCIPLES.md` during migration.)*

---

### Architecture Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| MODULE-COM | — | Module | COM | Active | product/objects/modules/ | 2026-06-22 |
| MODULE-ADM | — | Module | ADM | Active | product/objects/modules/ | 2026-06-22 |
| MODULE-DEL | — | Module | DEL | Candidate | product/objects/modules/ | 2026-06-22 |
| MODULE-INV | — | Module | INV | Active | product/objects/modules/ | 2026-06-22 |
| MODULE-PAY | — | Module | PAY | Partial | product/objects/modules/ | 2026-06-22 |
| MODULE-USR | — | Module | USR | Active | product/objects/modules/ | 2026-06-22 |
| MODULE-RPT | — | Module | RPT | Partial | product/objects/modules/ | 2026-06-22 |

---

### Feature Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | FEAT-Product-Listing-Carousel | Feature | COM/PLP | In UAT | product/objects/features/FEATURE-COM-PLP-CAROUSEL.md | 2026-06-22 |
| FEATURE-DEL-CORE-DELIVERY-MVP | — | Feature | DEL | PRD Approved | product/objects/features/ | 2026-06-22 |

---

### Request Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| REQUEST-COM-PLP-CAROUSEL-001 | REQ-0002 | Request | COM/PLP | Ready for UAT | product/objects/requests/ | 2026-06-22 |
| REQUEST-DEL-CORE-DELIVERY-MVP-001 | REQ-0001 | Request | DEL | Ready for QA | product/objects/requests/ | 2026-06-22 |

---

### PRD Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| PRD-COM-PLP-CAROUSEL-V1 | PRD-0002 | PRD | COM/PLP | Draft (Awaiting Approval) | product/objects/prds/ | 2026-06-22 |
| PRD-DEL-CORE-DELIVERY-MVP-V1 | PRD-0001 | PRD | DEL | Approved — Stories Complete | product/objects/prds/ | 2026-06-22 |

---

### QA Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| QA-COM-PLP-CAROUSEL-RUN-001 | QA-0001 | QA Run | COM/PLP | Passed | product/objects/qa-runs/ | 2026-06-22 |

---

### UAT Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| UAT-COM-PLP-CAROUSEL-RUN-001 | UAT-0001 | UAT Run | COM/PLP | In Progress | product/objects/uat-runs/ | 2026-06-22 |

---

### Story Objects

| Object ID | Legacy ID | Type | Module | Status | File Path | Last Updated |
|---|---|---|---|---|---|---|
| STORY-COM-PLP-CAROUSEL-RENDER-001 | US-0009 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002 | US-0010 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-COM-PLP-CAROUSEL-NAV-003 | US-0011 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-COM-PLP-CAROUSEL-MOBILE-004 | US-0012 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-COM-PLP-CAROUSEL-SWIPE-005 | US-0013 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-COM-PLP-CAROUSEL-CLICK-006 | US-0014 | Story | COM/PLP | Done | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-SCHEMA-001 | US-0001 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-BACKEND-002 | US-0002 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-003 | US-0003 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-004 | US-0004 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-005 | US-0005 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-006 | US-0006 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-007 | US-0007 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |
| STORY-DEL-CORE-DELIVERY-008 | US-0008 | Story | DEL | Planned | product/objects/stories/ | 2026-06-22 |

---

### Screen Objects

| Object ID | Legacy ID | Type | Module | Status | Route | Last Updated |
|---|---|---|---|---|---|---|
| SCR-CUS-0001 | — | Screen | COM/PLP | Built | /products | 2026-06-22 |
| SCR-CUS-0002 | — | Screen | COM/PDP | Built | /products/[slug] | 2026-06-22 |
| SCR-CUS-0003 | — | Screen | COM/CART | Built | /cart | 2026-06-22 |
| SCR-CUS-0004 | — | Screen | COM/FAV | Built | /favourites | 2026-06-22 |
| SCR-CUS-0005 | — | Screen | USR/ADDR | Built | /addresses | 2026-06-22 |
| SCR-CUS-0006 | — | Screen | USR/ADDR | Built | /addresses/new | 2026-06-22 |
| SCR-CUS-0007 | — | Screen | USR/ADDR | Built | /addresses/[id]/edit | 2026-06-22 |
| SCR-CUS-0008 | — | Screen | COM/CHK | Built | /checkout | 2026-06-22 |
| SCR-CUS-0009 | — | Screen | COM/ORDHIS | Built | /orders | 2026-06-22 |
| SCR-CUS-0010 | — | Screen | COM/ORDHIS | Built | /orders/[id] | 2026-06-22 |
| SCR-ADM-0001 | — | Screen | ADM | Built | /admin | 2026-06-22 |
| SCR-ADM-0002 | — | Screen | ADM | Built | /admin/categories | 2026-06-22 |
| SCR-ADM-0003 | — | Screen | ADM | Built | /admin/categories/new | 2026-06-22 |
| SCR-ADM-0004 | — | Screen | ADM | Built | /admin/categories/[id]/edit | 2026-06-22 |
| SCR-ADM-0005 | — | Screen | ADM | Built | /admin/products | 2026-06-22 |
| SCR-ADM-0006 | — | Screen | ADM | Built | /admin/products/new | 2026-06-22 |
| SCR-ADM-0007 | — | Screen | ADM | Built | /admin/products/[id]/edit | 2026-06-22 |
| SCR-ADM-0008 | — | Screen | ADM | Built | /admin/orders | 2026-06-22 |
| SCR-ADM-0009 | — | Screen | ADM | Built | /admin/orders/[id] | 2026-06-22 |
| SCR-ADM-0010 | — | Screen | ADM/INV | Built | /admin/inventory | 2026-06-22 |
| SCR-ADM-0011 | — | Screen | ADM/INV | Built | /admin/inventory/[productId] | 2026-06-22 |
| SCR-AUTH-0001 | — | Screen | USR/AUTH | Built | /sign-in | 2026-06-22 |
| SCR-AUTH-0002 | — | Screen | USR/AUTH | Built | /sign-up | 2026-06-22 |

---

## Gap Notes

The following objects are known to exist in legacy files but have not yet been migrated to individual files in `product/objects/`:

| Legacy Reference | Object Type | Location in Legacy System | Action Required |
|---|---|---|---|
| REQ-0001 | Request | product/04-request-management/ | Create REQUEST-DEL-CORE-DELIVERY-MVP-001.md |
| REQ-0002 | Request | product/04-request-management/ | Create REQUEST-COM-PLP-CAROUSEL-001.md |
| PRD-0001 | PRD | product/07-prd/ | Create PRD-DEL-CORE-DELIVERY-MVP-V1.md |
| PRD-0002 | PRD | product/07-prd/ | Create PRD-COM-PLP-CAROUSEL-V1.md |
| US-0001–US-0008 | Stories | product/08-user-stories/ | Create individual STORY-DEL-* files |
| QA-0001 | QA Run | product/11-qa-testing/ | Create QA-COM-PLP-CAROUSEL-RUN-001.md |
| UAT-0001 | UAT Run | product/12-uat/ | Create UAT-COM-PLP-CAROUSEL-RUN-001.md |
| EVAL-0001 | Evaluation | product/06-assessment-and-impact/ | Create EVAL-DEL-CORE-DELIVERY-001.md |
| DEVPLAN-0001 | Dev Plan | product/09-development-planning/ | Create DEVPLAN-DEL-CORE-DELIVERY-MVP-001.md |
| DEVPLAN-0002 | Dev Plan | product/09-development-planning/ | Create DEVPLAN-COM-PLP-CAROUSEL-001.md |
| IMPACT-0001 | Impact Assessment | product/06-assessment-and-impact/ | Create IMPACT-DEL-CORE-DELIVERY-MVP-001.md |
| GRILLING-0001 | Grilling | product/05-discovery-and-grilling/ | Create GRILLING-DEL-CORE-DELIVERY-MVP-001.md |
| DEC-001–DEC-014 | Decisions | product/00-product-foundation/DECISION_LOG.md | Create individual DECISION-*.md files |
| MODULE-* (all 7) | Modules | product/03-module-catalogue/MODULE_MASTER.md | Create individual module object files |
| SCR-* (all 23) | Screens | product/01-product-architecture/SCREEN_REGISTRY.md | Create individual screen object files |

---

## How to Add New Objects

1. Create the object file in the appropriate `product/objects/<type>/` folder.
2. Use the canonical naming convention from `product/99-operating-system/NOMENCLATURE_AND_ID_SYSTEM.md`.
3. Add a row to the correct section of this index table.
4. Add all relationships to `product/graph/RELATIONSHIP_INDEX.md`.
5. Update `product/graph/FEATURE_MASTER.md` if the object is a Feature or changes a Feature's status.
6. Update the traceability chain in `product/graph/TRACEABILITY_MAP.md` if applicable.

---

*Last updated: 2026-06-22*

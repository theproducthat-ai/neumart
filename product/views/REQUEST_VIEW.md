# Nuemart Product OS — Request View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

This view tracks all product requests. It clearly separates request status from feature/delivery status. Source of truth: `product/objects/requests/`.

> **Important:** A request being "Done" means the request was processed and accepted into the product pipeline. It does **NOT** mean the feature is built or released. Track feature delivery status in `FEATURE_VIEW.md`.

---

## 1. Active Requests

| Request ID | Legacy | Title | Classification | Status | Feature Impact | PRD | Dev | QA | UAT | Release |
|---|---|---|---|---|---|---|---|---|---|---|
| REQUEST-COM-PLP-CAROUSEL-001 | REQ-0002 | Promotional Banner Carousel on PLP | COM/PLP — New Feature | Ready for UAT | FEATURE-COM-PLP-CAROUSEL | PRD-COM-PLP-CAROUSEL-V1 (Draft) | Complete | QA-0001 Passed | UAT-0001 In Progress | Pending |
| REQUEST-DEL-CORE-DELIVERY-MVP-001 | REQ-0001 | Delivery Module MVP | DEL — New Module | PRD Approved | FEATURE-DEL-CORE-DELIVERY-MVP | PRD-0001 Approved | Not Started | Not Run | Not Run | Not Planned |

---

## 2. Parked Requests

None currently.

---

## 3. Rejected Requests

None currently.

---

## 4. Next Request ID

- **Legacy ID:** REQ-0003
- **Semantic ID:** Determined by classification of the new request at intake time.
  - Format: `REQUEST-{MODULE}-{SUBMODULE}-{SLUG}-{SEQ}`
  - Example: `REQUEST-COM-CHK-GUESTCHECKOUT-001` for a Guest Checkout feature in COM/CHK
  - See `product/os/policies/NOMENCLATURE_AND_ID_SYSTEM.md` for full ID rules

---

## 5. How to Read This View

| Column | Meaning |
|---|---|
| **Request ID** | Semantic ID — the permanent identifier for this request object |
| **Legacy** | The numeric ID used before the Product OS migration (still valid for referencing) |
| **Title** | Human-readable name of the request |
| **Classification** | Module/Submodule code and whether this is a New Feature, Enhancement, Bug Fix, or New Module |
| **Status** | Current lifecycle stage of the request itself (Submitted, Under Review, Approved/PRD Approved, Ready for Dev, etc.) |
| **Feature Impact** | The Feature Object this request maps to — tracks the long-lived feature through all lifecycle stages |
| **PRD** | The PRD document created for this request and its approval status |
| **Dev** | Development status (Not Started / In Progress / Complete) |
| **QA** | QA run status (Not Run / In Progress / Passed / Failed) |
| **UAT** | UAT run status (Not Run / In Progress / Passed / Failed / Signed Off) |
| **Release** | Release status (Not Planned / Planned / Pending / Released) |

A request passes through these stages sequentially. Each stage corresponds to a Product OS gate (G1–G9). See `product/os/policies/GOVERNANCE_POLICY.md` for gate definitions.

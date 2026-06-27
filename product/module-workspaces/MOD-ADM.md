# Module Workspace: Admin Console (MOD-ADM)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-ADM.md](../objects/modules/MOD-ADM.md)

---

## Module Overview
```
module_id:         MOD-ADM
module_name:       Admin Console
domain_code:       ADM
module_status:     active
description:       The internal operations interface used by admins, operations staff, and business
                   managers to manage the platform — products, orders, inventory, users, and reporting.
```

## Ownership
```
business_owner:    Operations Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-ADM-DASH | Dashboard | Admin home with summary metrics and quick actions |
| MA-ADM-ORD | Order Management | Order list, order detail, status updates, bulk actions |
| MA-ADM-PROD | Product Management | Product catalogue — add, edit, activate, deactivate |
| MA-ADM-CAT | Category Management | Product category tree — add, edit, reorder |
| MA-ADM-USR | User Management | Customer accounts, admin accounts, role assignment |
| MA-ADM-DEL | Delivery Management | Delivery task overview, manual assignment |
| MA-ADM-RPT | Reports | Report list, exports, scheduled reports |
| MA-ADM-SETTINGS | Settings | Platform-level configuration (delivery zones, fees, etc.) |

---

## Features

| FEAT ID | Feature Name | Status | Priority | Owner |
|---------|-------------|--------|----------|-------|
| _(none yet)_ | | | | |

## Subfeatures

| SFE ID | Subfeature Name | Parent Feature | Status |
|--------|----------------|----------------|--------|
| _(none yet)_ | | | |

---

## Active Requests

| REQ ID | Semantic ID | Title | Type | Priority | Status |
|--------|-------------|-------|------|----------|--------|
| REQ-0010 | REQUEST-COM-CART-COUPON-001 | Discount Coupon System — Admin Coupon Management | New Feature | medium | Devplan Complete — DEVPLAN-COM-CART-COUPON-001 ready for dev |

---

## PRDs

| PRD ID | Title | Status | Version | Owner |
|--------|-------|--------|---------|-------|
| [PRD-COM-CART-COUPON-V1](../objects/prds/PRD-COM-CART-COUPON-V1.md) | Discount Coupon System PRD (Admin side) | Approved + G4 Cleared | V1 | Product Lead |

---

## User Stories

| US ID | Title | Feature | Status | Sprint |
|-------|-------|---------|--------|--------|
| [US-0029](../objects/user-stories/STORY-COM-CART-COUPON-006.md) | Admin UI: Coupon List screen (SCR-ADM-0012) | FEATURE-COM-CART-COUPON | backlog | — |
| [US-0030](../objects/user-stories/STORY-COM-CART-COUPON-007.md) | Admin UI: Coupon Create / Edit Form (SCR-ADM-0013) | FEATURE-COM-CART-COUPON | backlog | — |
| [US-0035](../objects/user-stories/STORY-COM-CART-COUPON-012.md) | Admin UI: Order detail coupon display [Nice to Have] | FEATURE-COM-CART-COUPON | backlog | — |

---

## Open Bugs

| BUG ID | Title | Severity | Status | Assigned To |
|--------|-------|----------|--------|-------------|
| _(none yet)_ | | | | |

---

## Risks

| RISK ID | Title | Severity | Status |
|---------|-------|----------|--------|
| _(none yet)_ | | | |

---

## Linked Releases

| REL ID | Release Name | Status | Date |
|--------|-------------|--------|------|
| _(none yet)_ | | | |

---

## Metrics and KPIs

| Metric/KPI ID | Name | Current Value | Target | Status |
|---------------|------|---------------|--------|--------|
| _(none yet)_ | | | | |

---

## Roadmap Items

| RMI ID | Title | Status | Target Quarter | Priority Score |
|--------|-------|--------|----------------|----------------|
| _(none yet)_ | | | | |

---

## Support Issues

| Ticket ID | Summary | Status | Linked Feature |
|-----------|---------|--------|----------------|
| _(none yet)_ | | | |

---

## Incidents

| INC ID | Title | Severity | Date | Status |
|--------|-------|----------|------|--------|
| _(none yet)_ | | | | |

---

## Decisions

| DEC ID | Title | Status | Date |
|--------|-------|--------|------|
| _(none yet)_ | | | |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| _(see MOD-ADM reads from COM, DEL, INV, PAY, USR entities)_ | | | |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-INV | Admin product management touches inventory |
| MOD-DEL | Delivery task management |
| MOD-PAY | Order financial data |
| MOD-USR | User account management |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | Which admin screens are in scope for the first admin release? | Product Lead | TBD |
| 2 | What reporting outputs are required at launch? | Operations Lead | TBD |

---

## Active Work

| Object Type | ID | Title | Status | Owner | Due |
|-------------|-----|-------|--------|-------|-----|
| Dev Plan | DEVPLAN-COM-CART-COUPON-001 | Discount Coupon System — Dev Plan (Admin phases) | Ready for Development | Engineering Lead | — |

---

## Deferred Work

| DEF ID | Title | Source | Target Quarter |
|--------|-------|--------|----------------|
| _(none yet)_ | | | |

---

## Future Ideas (Parking Lot)

| PLT ID | Title | Parked Date | Promote Trigger |
|--------|-------|-------------|-----------------|
| _(none yet)_ | | | |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```

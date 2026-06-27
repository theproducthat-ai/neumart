# Request Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when requests are created or change status

---

## Active Requests

| ID | Semantic ID | Title | Source | Priority | Status | Linked Feature | Owner | Date |
|---|---|---|---|---|---|---|---|---|
| REQ-0001 | — | _(see legacy register)_ | — | — | — | — | — | — |
| REQ-0002 | REQUEST-COM-PLP-CAROUSEL-001 | Promotional Banner Carousel on PLP | Product Owner | P3 | Released | FEATURE-COM-PLP-CAROUSEL | Product Owner | 2026-06-22 |
| REQ-0003 | — | Product Card Price Alignment | Product Owner | P3 | Ready for QA | — | Product Owner | 2026-06-23 |
| REQ-0004 | — | Favourite Icon Repositioned as Product Image Overlay | Product Owner | P3 | Ready for UAT | — | Product Owner | 2026-06-23 |
| REQ-0005 | — | Allergen and Ingredient Details for Each Product | Product Owner | P3 | Ready for QA | — | Product Owner | 2026-06-23 |
| REQ-0006 | — | Allergen and Dietary Tag Filtering on Product Listing | Product Owner | P4 | Parked | — | Product Owner | 2026-06-23 |
| REQ-0007 | — | Customer Profile QR Code for Store Identification | Product Owner | P3 | Build Prompt Created | — | Product Owner | 2026-06-23 |
| REQ-0008 | — | Category Icons on Product Listing Filter Pills | Product Owner | P3 | Ready for QA | — | Product Owner | 2026-06-23 |
| REQ-0009 | REQUEST-COM-PLP-CARD-LAYOUT-001 | Product Card Image Size Reduction and Price-Name Alignment | Product Owner | medium | Grilled | — | Product Owner | 2026-06-24 |
| REQ-0010 | REQUEST-COM-CART-COUPON-001 | Discount Coupon System — Admin Creation and Customer Cart Application | Product Owner | medium | grilled | FEATURE-COM-CART-COUPON | Product Lead | 2026-06-25 |

_Note: Legacy REQ- IDs from V1 are preserved. New requests use semantic IDs as primary. Run `tools/generate-indexes.js` to auto-generate counts._

---

## Request Status Definitions

| Status | Meaning |
|---|---|
| `intake` | Newly submitted, not yet assessed |
| `grilling` | Under review — being asked clarifying questions |
| `assessed` | Reviewed, scored, decision pending |
| `approved` | Approved for roadmap |
| `parked` | Approved in principle but not yet scheduled |
| `rejected` | Not proceeding — reason documented |
| `in-progress` | Feature in active development |
| `delivered` | Feature shipped |
| `closed` | Closed without delivery (withdrawn, duplicate, etc.) |

---

## Status Summary

| Status | Count |
|---|---|
| intake | — |
| assessed | — |
| approved | — |
| parked | — |
| in-progress | — |
| delivered | — |
| rejected | — |

_Regenerate from objects folder for accurate counts._

---

## Filter Views

**By Source**
- Business Stakeholder requests: grep `source: business_stakeholder`
- Support escalations: grep `source: support`
- Engineering-initiated: grep `source: engineering`

**By Priority**
- P0 (critical): grep `priority: P0`
- P1 (high): grep `priority: P1`

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/requests/`
- `product/os/policies/INTAKE_SOURCE_RULES.md`

# Module Workspace: Customer Commerce (MOD-COM)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-COM.md](../objects/modules/MOD-COM.md)

---

## Module Overview
```
module_id:         MOD-COM
module_name:       Customer Commerce
domain_code:       COM
module_status:     active
description:       The customer-facing shopping experience. Covers everything a customer does from
                   discovering products to placing and tracking an order.
```

## Ownership
```
business_owner:    Business Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-COM-PLP | Product Listing | Product browse, search, filter, sort, promotional banners, categories |
| MA-COM-PDP | Product Detail | Product information, images, price, allergens, nutrition, add to cart |
| MA-COM-CART | Cart | Shopping cart management, quantity, item removal |
| MA-COM-CHK | Checkout | Address selection, delivery slot, payment, order confirmation |
| MA-COM-ADDR | Address Management | Saved delivery addresses, add/edit/delete |
| MA-COM-FAV | Favourites | Saved/favourite products |
| MA-COM-ORDHIS | Order History | Past orders list, order detail, reorder |
| MA-COM-PROFILE | Customer Profile | Account settings, preferences |

---

## Features

| FEAT ID | Feature Name | Status | Priority | Owner |
|---------|-------------|--------|----------|-------|
| [FEATURE-COM-PLP-CAROUSEL](../objects/features/FEATURE-COM-PLP-CAROUSEL.md) | Promotional Banner Carousel | UAT Passed — Ready for Release | P3 | Product Owner |

## Subfeatures

| SFE ID | Subfeature Name | Parent Feature | Status |
|--------|----------------|----------------|--------|
| _(none yet)_ | | | |

---

## Active Requests

| REQ ID | Semantic ID | Title | Type | Priority | Status |
|--------|-------------|-------|------|----------|--------|
| REQ-0002 | REQUEST-COM-PLP-CAROUSEL-001 | Promotional Banner Carousel on PLP | Feature | P3 | Released (via FEATURE-COM-PLP-CAROUSEL) |
| REQ-0004 | — | Move favourite icon to product image overlay | Feature | — | Released |
| REQ-0005 | — | Allergen details on product detail page | Feature | — | Released |
| REQ-0007 | — | Customer QR profile | Feature | — | Released |
| REQ-0008 | — | Category icons on PLP | Feature | — | Released |
| REQ-0009 | REQUEST-COM-PLP-CARD-LAYOUT-001 | Product Card Image Size Reduction and Price-Name Alignment | Small Enhancement | medium | Grilled — DISCOVERY-COM-PLP-CARD-LAYOUT-001 complete |
| REQ-0010 | REQUEST-COM-CART-COUPON-001 | Discount Coupon System — Admin Creation and Customer Cart Application | New Feature | medium | Devplan Complete — DEVPLAN-COM-CART-COUPON-001 ready for dev |

---

## PRDs

| PRD ID | Title | Status | Version | Owner |
|--------|-------|--------|---------|-------|
| PRD-COM-PLP-CAROUSEL-V1 (PRD-0002) | Promotional Banner Carousel PRD | Draft Awaiting Formal Approval | V1 | Product Lead |
| [PRD-COM-CART-COUPON-V1](../objects/prds/PRD-COM-CART-COUPON-V1.md) | Discount Coupon System PRD | Approved + G4 Cleared | V1 | Product Lead |

---

## User Stories

| US ID | Legacy ID | Title | Feature | Status |
|-------|-----------|-------|---------|--------|
| STORY-COM-PLP-CAROUSEL-RENDER-001 | US-0009 | Carousel renders on PLP | FEATURE-COM-PLP-CAROUSEL | Done |
| STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002 | US-0010 | Auto-scroll at 4-second intervals | FEATURE-COM-PLP-CAROUSEL | Done |
| STORY-COM-PLP-CAROUSEL-NAV-003 | US-0011 | Arrow and dot navigation | FEATURE-COM-PLP-CAROUSEL | Done |
| STORY-COM-PLP-CAROUSEL-MOBILE-004 | US-0012 | Mobile responsive layout | FEATURE-COM-PLP-CAROUSEL | Done |
| STORY-COM-PLP-CAROUSEL-SWIPE-005 | US-0013 | Touch swipe support on mobile | FEATURE-COM-PLP-CAROUSEL | Done |
| STORY-COM-PLP-CAROUSEL-CLICK-006 | US-0014 | Banner click-through (placeholder) | FEATURE-COM-PLP-CAROUSEL | Done |
| [STORY-COM-CART-COUPON-001](../objects/user-stories/STORY-COM-CART-COUPON-001.md) | US-0024 | Schema: coupons + couponUsages + orders fields | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-002](../objects/user-stories/STORY-COM-CART-COUPON-002.md) | US-0025 | Backend: createCoupon / updateCoupon + computeCouponDiscount | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-003](../objects/user-stories/STORY-COM-CART-COUPON-003.md) | US-0026 | Backend: listCoupons query + usage count | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-004](../objects/user-stories/STORY-COM-CART-COUPON-004.md) | US-0027 | Backend: validateCoupon query | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-005](../objects/user-stories/STORY-COM-CART-COUPON-005.md) | US-0028 | Backend: placeOrder extension + couponUsage write | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-006](../objects/user-stories/STORY-COM-CART-COUPON-006.md) | US-0029 | Admin UI: Coupon List screen | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-007](../objects/user-stories/STORY-COM-CART-COUPON-007.md) | US-0030 | Admin UI: Coupon Create/Edit Form | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-008](../objects/user-stories/STORY-COM-CART-COUPON-008.md) | US-0031 | Customer UI: Cart coupon input + apply + discount | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-009](../objects/user-stories/STORY-COM-CART-COUPON-009.md) | US-0032 | Customer UI: Auto-remove coupon on minimum drop | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-010](../objects/user-stories/STORY-COM-CART-COUPON-010.md) | US-0033 | Customer UI: Checkout summary discount line [Should Have] | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-011](../objects/user-stories/STORY-COM-CART-COUPON-011.md) | US-0034 | Customer UI: Order history coupon display [Nice to Have] | FEATURE-COM-CART-COUPON | backlog |
| [STORY-COM-CART-COUPON-012](../objects/user-stories/STORY-COM-CART-COUPON-012.md) | US-0035 | Admin UI: Order detail coupon display [Nice to Have] | FEATURE-COM-CART-COUPON | backlog |

---

## Open Bugs

| BUG ID | Title | Severity | Status | Assigned To |
|--------|-------|----------|--------|-------------|
| BUG-COM-CART-QTY-OVERSTOCK-001 | Cart quantity increases beyond available stock via repeated plus button taps | High | Open | — |

---

## Risks

| RISK ID | Title | Severity | Status |
|---------|-------|----------|--------|
| RISK-COM-PLP-CAROUSEL-PERF-001 | External image URLs may cause slow load on poor connections | Low | Accepted |
| RISK-COM-PLP-CAROUSEL-MOBILE-001 | Swipe gesture conflict with page scroll on mobile | Low | Mitigated |
| RISK-COM-PLP-CAROUSEL-HARDCODE-001 | Hardcoded banners require code deploy to change | Low | Accepted |
| RISK-UAT-CAROUSEL-SIGNOFF-001 | UAT sign-off pending | Low | Active |
| RISK-PRD-CAROUSEL-APPROVAL-001 | PRD status shows Draft despite completed dev | Low | Identified |

---

## Linked Releases

| REL ID | Release Name | Status | Date |
|--------|-------------|--------|------|
| RELEASE-COM-PLP-CAROUSEL-2026-06 | Carousel Release | Pending UAT Sign-off | 2026-06 |

---

## Metrics and KPIs

| Metric/KPI ID | Name | Current Value | Target | Status |
|---------------|------|---------------|--------|--------|
| MET-0001 | Feature adoption rate | — | TBD | Tracking |
| MET-0003 | Search-to-order rate | — | TBD | Tracking |
| — | Cart abandonment rate | — | TBD | Tracking |
| — | Checkout completion rate | — | TBD | Tracking |

---

## Roadmap Items

| RMI ID | Title | Status | Target Quarter | Priority Score |
|--------|-------|--------|----------------|----------------|
| _(none yet formalized)_ | Admin-managed carousel content | Future Candidate | TBD | Not committed |

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
| DEC-COM-PLP-001 | Banner images hardcoded in V1 (no Convex banners table) | Accepted | 2026-06-22 |
| DEC-COM-PLP-002 | Auto-scroll at 4-second interval | Accepted | 2026-06-22 |
| DEC-COM-PLP-003 | No analytics instrumentation in V1 | Accepted | 2026-06-22 |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet formalized)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| — | products (Convex) | Table | Active |
| — | orders (Convex) | Table | Active |
| — | cart (Convex) | Table | Active |
| — | banners (Convex) | Table | Future Candidate (not yet created) |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-PAY | Checkout requires payment processing |
| MOD-INV | PLP and PDP require stock availability data |
| MOD-DEL | Checkout requires delivery zone and slot availability |
| MOD-USR | Logged-in features require user identity |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | When will admin-managed carousel be prioritized? | Product Lead | TBD |
| 2 | Will carousel be used on other screens (e.g. homepage, category pages)? | Product Lead | TBD |
| 3 | PRD-COM-PLP-CAROUSEL-V1 still shows Draft status — needs formal approval recorded | Product Lead | Urgent |

---

## Active Work

| Object Type | ID | Title | Status | Owner | Due |
|-------------|-----|-------|--------|-------|-----|
| UAT Run | UAT-COM-PLP-CAROUSEL-RUN-001 | Carousel UAT | In Progress — Awaiting Sign-off | Product Owner | ASAP |
| Release | RELEASE-COM-PLP-CAROUSEL-2026-06 | Carousel Release | Blocked by UAT | Engineering Lead | Post-UAT |
| Dev Plan | DEVPLAN-COM-CART-COUPON-001 | Discount Coupon System — Dev Plan | Ready for Development | Engineering Lead | — |

---

## Deferred Work

| DEF ID | Title | Source | Target Quarter |
|--------|-------|--------|----------------|
| _(none yet)_ | | | |

---

## Future Ideas (Parking Lot)

| PLT ID | Title | Parked Date | Promote Trigger |
|--------|-------|-------------|-----------------|
| — | Admin-managed carousel content | 2026-06-22 | When admin console is built |
| — | Promotional analytics (click tracking, impressions) | 2026-06-22 | When analytics provider is chosen |
| — | A/B testing of banner content | 2026-06-22 | When experimentation platform is in place |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```

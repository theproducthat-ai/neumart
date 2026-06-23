# Nuemart Product OS — Incomplete Work View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

> **Migration Note:** This view extends `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md`. The original file is preserved. This view adds product-level incomplete items beyond development tracking.

---

Incomplete work is not failure — it is managed scope. This view exists so nothing is forgotten. Every item here has a deliberate resolution path.

---

## 1. Incomplete Items

| Item | Type | Reason | Source | Resolution Path | Target Date |
|---|---|---|---|---|---|
| PRD-COM-PLP-CAROUSEL-V1 formal approval record | Missing documentation | Informal approval given but no formal approval record created in the PRD document | REQUEST-COM-PLP-CAROUSEL-001 | Product Owner to confirm approval and update PRD status field from Draft to Approved | ASAP |
| Admin Carousel Management (banner CMS) | Out of Scope — V1 | Feature was too complex for initial delivery; deferred intentionally | FEATURE-COM-PLP-CAROUSEL | Create a new Enhancement Request when prioritized; do not reopen current feature | TBD |
| Click-through destinations for carousel banners | Out of Scope — V1 | No destination content or promotional strategy defined at delivery time | FEATURE-COM-PLP-CAROUSEL | Create Enhancement Request once promotional strategy is defined | TBD |
| Razorpay integration (Phase 11) | Blocked — External dependency | Merchant account pending approval from Razorpay | Phase 11 plan | Resume immediately after merchant account is approved | TBD — external |
| FEATURE-DEL-CORE-DELIVERY-MVP Feature Object | Missing object | Feature Object file not yet created in `product/objects/features/` | DEVPLAN-DEL-CORE-DELIVERY-MVP-001 | Create Feature Object before development starts; use FEATURE-COM-PLP-CAROUSEL.md as template | Before dev starts |
| US-0001–US-0008 semantic ID verification | Needs verification | Story slug assignments were proposed but not verified against actual story content | MIGRATION guide | Manually verify each story file and confirm or correct the semantic ID slug | Next sprint |
| DEC-001–DEC-014 semantic ID mapping | Partial | DECISION_MAP.md has partial mapping; not all decisions have semantic IDs | product/graph/DECISION_MAP.md | Complete mapping in next sprint | Next sprint |

---

## 2. Pre-Product-OS Technical Work

Items built before the Product OS was set up that need retroactive documentation. These are not gaps in the product — the features exist and work. These are gaps in the product knowledge record only.

| Feature | Missing Artifact | Priority | Notes |
|---|---|---|---|
| Product Catalog | Feature Object | Low | Core MVP feature; document when time allows |
| Shopping Cart | Feature Object | Low | Core MVP feature |
| Checkout (Pay Later) | Feature Object | Medium | Payment-adjacent; relevant before Razorpay work |
| Order Management | Feature Object | Low | |
| Admin Console (all sub-modules) | Feature Objects (multiple) | Low | Could batch as a single "Admin Console MVP" Feature Object |
| Inventory & Stock Movement | Feature Object | Low | |
| Authentication (Clerk) | Feature Object | Low | |

> Creating retroactive Feature Objects transforms tacit product knowledge into formal permanent knowledge. Recommended approach: create one Feature Object per feature, using git history and existing code to fill in the details. This is non-blocking work that can be done incrementally.

---

## 3. How to Maintain This View

- **Add** items when work is explicitly deferred, descoped, or blocked during a `/product-request`, `/product-prd`, or `/product-devplan` run
- **Remove** items when they are resolved (decision made, document updated, feature shipped)
- **Do not remove** items just because they become lower priority — park them in a "Low Priority" sub-section if needed
- Link every item to its source (Request, Feature, or Migration guide) so it can be traced

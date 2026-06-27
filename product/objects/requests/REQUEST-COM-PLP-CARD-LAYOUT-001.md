---
object_id: "REQUEST-COM-PLP-CARD-LAYOUT-001"
legacy_id: "REQ-0009"
object_type: Request
title: "Product Card Image Size Reduction and Price-Name Alignment"
status: Grilled
grilling_status: Complete
grilling_session: DISCOVERY-COM-PLP-CARD-LAYOUT-001
grilled_date: 2026-06-25
priority: medium
work_type_lane: "Small Enhancement"
template_used: "REQUEST_QUICK_TEMPLATE.md"
schema_version: "2.0"

module_id: "MOD-COM"
module_area: "MA-COM-PLP"
screen_id: "SCR-CUS-0001"
route: "/products"
component: "product-card"

related_prior_work:
  - id: "REQ-0003"
    title: "Product Card Price Alignment"
    relationship: "related_enhancement"
    notes: "REQ-0003 addressed vertical spacing (mt-auto/pt-2 removal). This request extends price-name alignment and adds image size reduction. REQ-0003 is Ready for QA but not yet deployed — scope overlap must be resolved before DEVPLAN."

assumptions_made:
  - "Both asks (image size + price alignment) are treated as one bundled request because they share the same component (product-card), screen (SCR-CUS-0001), owner, and release timeline."
  - "Pure CSS/Tailwind changes — no Convex schema, no API, no business logic change."
  - "Affected users: customers browsing the product listing page."

blocking_flags: []

classification:
  request_type: "Feature Enhancement"
  sub_type: "UI/UX Improvement"
  domain: "COM"
  affected_domains: ["COM"]
  product_area_code: "COM"
  module_code: "COM-PLP"
  secondary_module_codes: []
  confidence: "High"
  blocking_flags: []
  feature_impact: "modifies"
  work_type_lane: "Small Enhancement"
  primary_object_type: "requests"
  lane_confidence: "High"
  classification_notes: "Two distinct UI asks bundled as one request — image height reduction and price-name horizontal/vertical alignment. Both are pure CSS changes to product-card component on SCR-CUS-0001. Price alignment overlaps with REQ-0003 (related_enhancement, not duplicate — REQ-0003 targeted mt-auto/pt-2 vertical gap; this targets alignment relative to product name)."
  classified_at: "2026-06-24"
  classified_by: "AI"

created_date: "2026-06-24"
created_by: "AI"
version: "1.0"
---

# Quick Request: REQUEST-COM-PLP-CARD-LAYOUT-001

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Lane:** Lane 2 — Small Enhancement

---

## What Is Being Requested

Reduce the height/size of the product card image on the product listing page (`/products`) so the card proportions are tighter and more content is visible per viewport. Additionally, ensure the product price is visually aligned with the product name so the card information hierarchy is clean and consistent.

**Two asks, one component, one release:**
1. Product card image height → reduce (target TBD — see open questions)
2. Product price positioning → align with product name (scope TBD relative to REQ-0003)

## Who Needs This

**Requester:** Product Owner
**Affected users:** Customers browsing the product listing page (SCR-CUS-0001, `/products`)

## Acceptance

**Image size:** The product card image is visually smaller than the current implementation. The card grid looks tighter and more products are visible without scrolling on a standard mobile viewport.

**Price alignment:** The product price starts from the same left edge as the product name. No visible gap or offset between the two elements.

## Lane

Lane 2 — Small Enhancement

## Open Questions

1. **Image size target:** What is the desired reduction? For example: specific height class (e.g. `h-32` instead of current `h-40`), a percentage reduction (~20%), or should the developer use judgment to tighten the grid layout? A reference screenshot or competitor example would help.

2. **Price alignment scope vs REQ-0003:** REQ-0003 ("Product Card Price Alignment") is currently Ready for QA — it removed `mt-auto`/`pt-2` from the price wrapper to close the vertical gap. Is this request: (a) a different alignment concern (e.g. left-edge offset, horizontal alignment relative to the name), or (b) the same issue being re-stated because REQ-0003's fix has not yet been deployed and seen?

## Linked Objects

```
related_request:  REQ-0003 (Product Card Price Alignment — related_enhancement — Ready for QA)
legacy_id:        REQ-0009 (V1 intake record)
linked_feature:   FEATURE-COM-PLP-CARD (to be confirmed — check if feature object exists)
output_story:     TBD — after open questions resolved
```

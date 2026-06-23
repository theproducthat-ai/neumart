---
object_id: FEATURE-COM-PLP-CAROUSEL
legacy_id: FEAT-Product-Listing-Carousel
object_type: Feature
product_area_code: COM
module_code: COM
submodule_code: PLP
feature_slug: CAROUSEL
sequence: "001"
version: V1
canonical_name: FEATURE-COM-PLP-CAROUSEL
display_name: Promotional Banner Carousel
file_slug: FEATURE-COM-PLP-CAROUSEL
name: Promotional Banner Carousel on Product Listing Page
summary: A horizontally scrolling promotional banner carousel displayed at the top of the product listing page, showing curated product/promotional images with auto-scroll, manual navigation, and mobile swipe support.
description: |
  The carousel displays a series of promotional banner images at the top of the /products screen (SCR-CUS-0001).
  Banners auto-scroll at 4-second intervals, support manual arrow navigation and dot indicators,
  respond to touch swipe on mobile, pause on hover (desktop), and wrap around on last/first item.
  Banner images are currently hardcoded. No admin management interface exists yet.
status: UAT Passed — Ready for Release
lifecycle_stage: Release Pending
owner: Product Owner
created_at: "2026-06-22"
updated_at: "2026-06-23"
source: request
confidence: High
priority: P3
risk_level: Low
business_value: Promotional visibility, increased product discovery
effort_estimate: Medium (6 stories, 1 sprint)
complexity: Medium
tags: [carousel, promotional, banner, product-listing, customer-commerce]
relationships:
  - belongs_to: MODULE-COM
  - has_screen: SCR-CUS-0001
  - created_from: REQUEST-COM-PLP-CAROUSEL-001
  - specified_by: PRD-COM-PLP-CAROUSEL-V1
  - implemented_by: STORY-COM-PLP-CAROUSEL-RENDER-001
  - implemented_by: STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002
  - implemented_by: STORY-COM-PLP-CAROUSEL-NAV-003
  - implemented_by: STORY-COM-PLP-CAROUSEL-MOBILE-004
  - implemented_by: STORY-COM-PLP-CAROUSEL-SWIPE-005
  - implemented_by: STORY-COM-PLP-CAROUSEL-CLICK-006
  - tested_by: QA-COM-PLP-CAROUSEL-RUN-001
  - validated_by: UAT-COM-PLP-CAROUSEL-RUN-001
evidence:
  - "QA-COM-PLP-CAROUSEL-RUN-001: 20/20 test cases passed"
  - "UAT-COM-PLP-CAROUSEL-RUN-001: Conditional Pass — signed off by Product Owner 2026-06-23"
  - "DEVPLAN-0002: Dev plan with coding prompt completed"
decisions:
  - "Banner images are hardcoded in component code (no Convex banners table yet)"
  - "Auto-scroll at 4-second interval (product owner preference)"
  - "No analytics instrumentation in V1"
open_questions:
  - "When will admin-managed carousel be prioritized? (Future Candidate)"
  - "Will carousel be used on other screens? (Future Candidate — needs separate evaluation)"
acceptance_criteria:
  - Carousel renders on /products page without affecting page layout or load time
  - Auto-scroll activates after 4 seconds with smooth transition
  - Arrow navigation (prev/next) works correctly and wraps around
  - Dot indicators reflect current slide position
  - Touch swipe works on mobile (left/right swipe changes slide)
  - Hover pauses auto-scroll on desktop
  - Single banner: hides navigation controls
  - Zero banners: carousel does not render
  - Broken image URLs: graceful fallback
  - Responsive: displays correctly on mobile and desktop
ai_reasoning:
  classification_rationale: "COM module (Customer Commerce), PLP sub-module (Product Listing Page). Feature type: New Feature added to existing screen. Low risk — no schema change, no payment impact, no role change."
  assumptions:
    - "PRD-0002 (PRD-COM-PLP-CAROUSEL-V1) is the authoritative spec, though status shows Draft Awaiting Approval — assumed approved for development purposes since all stories are Done."
    - "QA-0001 (20/20 pass) is treated as QA complete. UAT-0001 is the pending gate."
  confidence_score: High
  gaps_identified:
    - "PRD-COM-PLP-CAROUSEL-V1 shows status: Draft — may need formal approval recorded"
    - "No formal release object exists yet"
  recommended_next_action: "Obtain Product Owner UAT sign-off, then create RELEASE-COM-PLP-CAROUSEL-2026-06"
  reasoning_version: "1.0"
audit_log:
  - date: "2026-06-22"
    changed_by: "Product OS Migration"
    change_type: "Object Created"
    summary: "Feature Object created during migration from legacy Product OS. Populated from REQ-0002, PRD-0002, QA-0001, UAT-0001."
---

# FEATURE-COM-PLP-CAROUSEL — Promotional Banner Carousel

## 1. Feature Summary

The Promotional Banner Carousel is a horizontal image carousel displayed at the top of the product listing page (`/products`, SCR-CUS-0001). It surfaces curated promotional or product imagery to customers as they enter the storefront, increasing visibility for featured products and promotions before they scroll to the product grid.

The carousel was introduced as REQ-0002 to improve product discovery and promotional communication on the main storefront screen. All six development stories are complete, QA has passed with 20/20 tests, and the feature is currently in UAT awaiting Product Owner sign-off before release.

---

## 2. Product Placement

- **Product**: Nuemart Grocery App
- **Module**: Customer Commerce (COM)
- **Sub-module**: Product Listing Page (PLP)
- **Screen**: SCR-CUS-0001 (`/products`)
- **Capability**: Promotional Content Display

---

## 3. Functional Scope

### 3.1 In Scope (V1)

- Horizontal banner carousel at the top of the product listing page
- Hardcoded banner images (no admin management)
- Auto-scroll every 4 seconds
- Manual navigation: left/right arrow buttons, dot indicators
- Mobile touch swipe (left/right)
- Hover-to-pause on desktop
- Carousel wraps around (last → first, first → last)
- Graceful handling: zero banners (hide carousel entirely), one banner (hide navigation controls), broken image URL (graceful fallback placeholder)
- Responsive layout (mobile and desktop)

### 3.2 Out of Scope (V1)

- Admin-managed carousel content (no Convex banners table)
- Click-through destinations (banner links are placeholder/no-op)
- Promotional banner analytics or click tracking
- A/B testing of banner content
- Multiple carousel zones on different screens
- Video banners
- Scheduled or time-based banner rotation

---

## 4. UX Rules

1. Carousel appears at the TOP of the product listing page, above the product grid
2. Auto-scroll interval: 4 seconds
3. Transition: smooth horizontal slide
4. On hover (desktop): auto-scroll pauses for the duration of hover
5. On swipe left: advance to next banner
6. On swipe right: go to previous banner
7. Arrows wrap around: pressing prev on the first slide goes to the last; pressing next on the last slide goes to the first
8. Dot indicators: one dot per banner; active dot is visually highlighted
9. Auto-scroll resumes after manual navigation

---

## 5. Business Rules

1. If zero banners are configured, the carousel component does not render at all — no empty container shown
2. If only one banner is present, navigation controls (arrows and dots) are hidden
3. If a banner image URL is broken or fails to load, show a styled fallback placeholder
4. Banners are currently hardcoded in the component — no user-facing admin controls exist in V1

---

## 6. Configuration Rules

- Auto-scroll interval: hardcoded at 4 seconds (not admin-configurable in V1)
- Max banners: no enforced limit (practical recommendation: 5–8 for acceptable UX)
- Banner dimensions: responsive container width; height fixed to maintain aspect ratio

---

## 7. Data Dependencies

- **Current (V1)**: Banner data is hardcoded directly in the component code. No Convex table is used.
- **Future (Candidate — not committed)**: Convex `banners` table with fields: `title`, `imageUrl`, `linkUrl`, `isActive`, `sortOrder`, `expiresAt`. Would require admin management screen and Convex queries.

---

## 8. Screen / Component Mapping

- **Screen**: SCR-CUS-0001 (`/products`)
- **Component**: CarouselBanner (custom component built in Phase 11 of the Nuemart build)
- **UI Library**: ShadCN components used for base structural elements
- **Placement on screen**: Above the product grid, below the navigation header

---

## 9. Requirement / PRD Mapping

- **PRD**: PRD-COM-PLP-CAROUSEL-V1 (legacy: PRD-0002)
  - Status: Draft Awaiting Approval (note: development proceeded and QA passed — see AI Reasoning section)
- **Source Request**: REQUEST-COM-PLP-CAROUSEL-001 (legacy: REQ-0002)

---

## 10. Story / Task Mapping

| Story ID | Legacy | Title | Status |
|---|---|---|---|
| STORY-COM-PLP-CAROUSEL-RENDER-001 | US-0009 | Carousel renders on product listing page | Done |
| STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002 | US-0010 | Auto-scroll at 4-second intervals | Done |
| STORY-COM-PLP-CAROUSEL-NAV-003 | US-0011 | Arrow and dot navigation | Done |
| STORY-COM-PLP-CAROUSEL-MOBILE-004 | US-0012 | Mobile responsive layout | Done |
| STORY-COM-PLP-CAROUSEL-SWIPE-005 | US-0013 | Touch swipe support on mobile | Done |
| STORY-COM-PLP-CAROUSEL-CLICK-006 | US-0014 | Banner click-through (placeholder) | Done |

All 6 stories are Done. Development is complete.

---

## 11. QA / UAT Mapping

| Run ID | Legacy | Status | Result |
|---|---|---|---|
| QA-COM-PLP-CAROUSEL-RUN-001 | QA-0001 | Passed | 20/20 test cases passed |
| UAT-COM-PLP-CAROUSEL-RUN-001 | UAT-0001 | In Progress | Awaiting Product Owner sign-off |

QA is complete and clean. UAT is the current blocking gate for release.

---

## 12. Release Mapping

- **Planned Release**: RELEASE-COM-PLP-CAROUSEL-2026-06
- **Status**: Pending UAT sign-off
- **Action required**: Product Owner to sign off on UAT-COM-PLP-CAROUSEL-RUN-001, then create release object and ship

---

## 13. Future Candidates

| Candidate | Priority | Notes |
|---|---|---|
| Admin-managed carousel content | Not committed | Requires Convex `banners` table, admin UI, and schema migration |
| Auto-scroll interval configurable by admin | Not committed | Low priority; hardcoded 4s is acceptable for current scale |
| Promotional banner analytics (click tracking, impressions) | Not committed | Requires analytics instrumentation; no provider chosen |
| Carousel on other screens (e.g. homepage, category pages) | Not committed | Needs separate evaluation; may reuse component |

---

## 14. Known Limitations (V1)

1. **Hardcoded banners** — changing banners requires a code change and deployment; no admin self-service
2. **No click-through destination** — banner links are placeholder; clicking does nothing meaningful
3. **No engagement analytics** — no data on which banners are seen or clicked
4. **No A/B testing capability** — single banner set for all users
5. **External image URLs** — images served from external URLs; no CDN or storage optimization in V1

---

## 15. Risks and Assumptions

### Risks

| Risk ID | Risk | Level | Status |
|---|---|---|---|
| RISK-COM-PLP-CAROUSEL-PERF-001 | External image URLs may cause slow load on poor connections | Low | Accepted |
| RISK-COM-PLP-CAROUSEL-MOBILE-001 | Swipe gesture conflict with page scroll on mobile | Low | Mitigated — confirmed resolved in QA-COM-PLP-CAROUSEL-RUN-001 |
| RISK-COM-PLP-CAROUSEL-HARDCODE-001 | Hardcoded banners require code deploy to change | Low | Accepted — known V1 limitation |
| RISK-UAT-CAROUSEL-SIGNOFF-001 | UAT sign-off pending; feature not released | Low | Active — awaiting Product Owner |
| RISK-PRD-CAROUSEL-APPROVAL-001 | PRD status shows Draft despite completed dev | Low | Identified — needs Product Owner clarification |

### Assumptions

- PRD-0002 (PRD-COM-PLP-CAROUSEL-V1) was functionally approved even though the formal status field still shows "Draft Awaiting Approval". Development proceeded and QA passed on the basis of this informal approval. Product Owner should confirm and update PRD status.
- QA-0001 (20/20 pass) represents complete test coverage for all V1 acceptance criteria.
- UAT-0001 is the only remaining gate before release.

---

## 16. AI Reasoning Notes

This Feature Object was created during the Nuemart Product OS migration from the legacy folder-based system.

**ID assignment:** Semantic ID `FEATURE-COM-PLP-CAROUSEL` assigned following the nomenclature: `FEATURE-{MODULE}-{SUBMODULE}-{SLUG}`. Legacy ID `FEAT-Product-Listing-Carousel` preserved as alias.

**Chain verified:** REQ-0002 → PRD-0002 → US-0009–US-0014 → QA-0001 → UAT-0001 chain confirmed from existing legacy files.

**PRD status anomaly:** PRD-0002 status shows "Draft Awaiting Approval" in legacy files, but all downstream work (6 stories Done, 20/20 QA pass, UAT In Progress) suggests informal approval occurred. This is flagged as RISK-PRD-CAROUSEL-APPROVAL-001 and TRACE-GAP-001. Product Owner should confirm and update the PRD status record.

**Classification rationale:** COM module, PLP sub-module confirmed from screen placement (SCR-CUS-0001 = /products). No schema change, no payment impact, no role change — Low risk classification justified.

---

## 17. Change History

| Version | Date | Changed By | Summary |
|---|---|---|---|
| V1.0 | 2026-06-22 | Product OS Migration | Initial Feature Object created from legacy REQ-0002, PRD-0002, US-0009–US-0014, QA-0001, UAT-0001 |

# GRILLING-0008 — Category Icons on Product Listing Filter Pills

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0008 | `04-request-management/requests/REQ-0008.md` |
| Evaluation | — | Not required — small UI enhancement, direct DEVPLAN |
| PRD | — | Not required — small UI enhancement, direct DEVPLAN |

---

## Status

**Grilling Status:** Complete
**Owner:** Product Owner
**Date Opened:** 2026-06-23
**Date Completed:** 2026-06-23
**Last Updated:** 2026-06-23

---

## Current Blocker

None.

---

## Next Action

Proceed to DEVPLAN-0007 and coding prompt. No PRD, no user stories — single-file UI enhancement.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Customer Commerce |
| Sub-module | Product Listing |
| Secondary Modules | None |
| Classification | Existing Feature Enhancement |
| Classification Confidence | High |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact Type |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — CategoryChips component updated |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Screenshots provided | Yes | Screenshot of current category pill row (All, Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks, Staples, Household) — text-only, no icons |
| Competitor references | No | Not provided |
| Missing references | — | None |

---

## Problem Clarity

**Problem in one sentence:**

> The category filter pills on the product listing page are text-only, making it harder for customers to visually scan and identify categories at a glance.

**Who experiences this problem:** Customer

**Frequency:** Every visit to the product listing page

**Cost of not solving:** Minor UX friction — categories are scannable but less distinctive without visual icons

**Current workaround:** None — customers read the text labels

---

## Grilling Q&A

| Question | Answer |
|---|---|
| Icon placement — left of label text, or replace text entirely? | Left of label text. Format is `[Icon] Label`. Text is NOT removed. |
| Icon style — emoji, Lucide, custom SVG? | Lucide icons only. Emoji excluded due to inconsistent cross-device rendering. No custom SVGs for MVP. |
| Should the "All" pill get an icon? | Yes — use `LayoutGrid` icon, followed by "All" text. |
| Admin-configurable or hardcoded mapping? | Hardcoded in frontend by category slug for MVP. Admin-configurable icons are deferred to a future admin-category-management enhancement. Use `Package` as fallback for unmapped categories. |

---

## Business Rules

| # | Rule |
|---|---|
| BR-1 | Icon mapping is keyed on category slug (lowercase, URL-safe identifier) — not category name |
| BR-2 | Any category slug not in the map renders the `Package` fallback icon |
| BR-3 | Icon renders at `h-4 w-4`, left of label text, with `gap-1.5` between icon and label |
| BR-4 | "All" pill uses `LayoutGrid` icon |

---

## Icon Mapping (MVP)

| Category Slug | Icon |
|---|---|
| `fruits` | `Apple` |
| `vegetables` | `Carrot` |
| `dairy` | `Milk` |
| `bakery` | `Cookie` |
| `beverages` | `GlassWater` |
| `snacks` | `Popcorn` |
| `staples` | `Wheat` |
| `household` | `Home` |
| *(unmapped)* | `Package` (fallback) |
| *(All pill)* | `LayoutGrid` |

---

## Data Fields

No new data fields. No schema change. No Convex change. All changes are frontend only.

---

## Edge Cases

| Edge Case | Expected Behaviour |
|---|---|
| Category slug not in icon map | Renders `Package` fallback icon |
| New category added by admin with no matching slug | Falls back to `Package` automatically — no code change needed |
| Category loading (skeleton state) | Existing Skeleton placeholders are unaffected |

---

## Suggested MVP Boundary

**Include in MVP:**
- Lucide icon displayed left of label on all category pills
- `LayoutGrid` icon on "All" pill
- Hardcoded slug → icon map in `page.tsx`
- `Package` fallback for unmapped slugs

**Defer to later iteration:**
- Admin-configurable category icons (icon picker in admin category edit form)
- Animated icon transitions on selection
- Custom SVG icons

---

## Status After Grilling

- [x] Grilling complete — proceed directly to DEVPLAN (evaluation and PRD not needed for small UI enhancement)

---

## Grilling Summary

All four grilling questions were answered in a single round. The change is purely cosmetic — icon rendered left of label text using Lucide, hardcoded per slug, with `Package` as fallback. No schema, no backend, no new screens. Single file change in `page.tsx`. Admin-configurable icons explicitly deferred. Proceeding directly to DEVPLAN-0007.

---

*Last updated: 2026-06-23*

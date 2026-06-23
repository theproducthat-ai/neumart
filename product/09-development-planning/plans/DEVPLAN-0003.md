# DEVPLAN-0003 — Product Card Price Alignment

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0003 | `04-request-management/requests/REQ-0003.md` |
| PRD | — | No PRD — UI/UX improvement, direct DEVPLAN |
| User Stories | — | No stories — single-file layout change |
| Impact Assessment | — | No schema change; no cross-module impact |
| QA | — | Populated after QA is run |
| Coding Prompt | DEVPLAN-0003-coding-prompt.md | `09-development-planning/plans/DEVPLAN-0003-coding-prompt.md` |

---

## Status

**Dev Plan Status:** Ready for Development
**Owner:** Product Owner
**Date Created:** 2026-06-23
**Last Updated:** 2026-06-23

---

## Current Blocker

None.

---

## Next Action

Use coding prompt `DEVPLAN-0003-coding-prompt.md` to implement the change.

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Customer Commerce |
| Sub-module | Product Listing |
| Secondary Modules | None |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — product card price row brought into the name/unit block |

---

## Objective

Remove the visual separation between the product price and the product name on the product card. The price should appear directly below the unit text, sharing the same left edge and forming a tight, scannable information block with the name.

---

## Current App Context

- File: `neumart/components/products/product-card.tsx`
- The `<CardContent>` uses `flex flex-col gap-1` to stack name → unit → price vertically.
- The price/badge wrapper div currently has `mt-auto pt-2`, which pushes the price row to the bottom of the `flex-1` content area.
- This creates visible vertical space between the unit text and the price, breaking the visual grouping.
- No Convex changes. No schema changes. No logic changes.

---

## Root Cause

In `product-card.tsx` at line 108:

```tsx
<div className="mt-auto flex items-end justify-between gap-1 pt-2">
```

- `mt-auto` pushes the price row to the bottom of the flex container.
- `pt-2` adds additional top padding on top of that.
- Together these disconnect the price from the name block.

---

## Files Impacted

| File | Change Type | Description |
|---|---|---|
| `neumart/components/products/product-card.tsx` | **Modify** | Remove `mt-auto` and `pt-2` from the price/badge wrapper div; change `items-end` to `items-center` |

---

## Exact Change

**File:** `neumart/components/products/product-card.tsx` — line 108

**Before:**
```tsx
<div className="mt-auto flex items-end justify-between gap-1 pt-2">
```

**After:**
```tsx
<div className="flex items-center justify-between gap-1">
```

**What changes:**
- `mt-auto` removed — price no longer pushed to bottom of flex container
- `pt-2` removed — no additional gap above the price row
- `items-end` → `items-center` — vertical alignment within the row updated to match new context

The `gap-1` on the parent `CardContent` flex column provides the natural spacing between unit text and price, which is all that is needed.

---

## Backend Changes

None.

---

## Schema Changes

None.

---

## Testing Plan

### Manual Test Scenarios

| # | Scenario | Expected Result |
|---|---|---|
| 1 | Open `/products` on desktop | Price appears directly below unit text; no visual gap between the two |
| 2 | Open `/products` on mobile | Same tight grouping on mobile card layout |
| 3 | Product with 1-line name | Name → unit → price in a tight block at top of card content |
| 4 | Product with 2-line name | Name wraps to 2 lines → unit → price, all in one block |
| 5 | Out-of-stock product | Stock badge appears in the same row as price, centre-aligned vertically |
| 6 | "Only N left" product | Badge appears in same row as price, centre-aligned vertically |
| 7 | Add to Cart button position | Button in CardFooter remains at the bottom — unaffected |
| 8 | Favourite button | Unaffected |
| 9 | Card hover shadow | Unaffected |

### Regression Areas to Check

- [ ] Card layout not broken on any viewport (375px, 768px, 1280px)
- [ ] Stock badge still renders correctly in the same row as the price
- [ ] Out-of-stock overlay on the image unaffected
- [ ] Add to Cart / Unavailable button behaviour unaffected
- [ ] Favourite toggle button behaviour unaffected
- [ ] Product image and link unaffected
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No build errors: `pnpm build`

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Cards in a grid row look uneven | Low | Low | Without `mt-auto`, price appears at a natural position below unit; grid height is driven by the tallest card in the row, not by price position |

---

## Rollback Plan

Single-line class change. Revert by restoring `mt-auto pt-2 items-end` to the div. No deployment steps beyond a frontend redeploy.

---

## Definition of Done

- [ ] `mt-auto` and `pt-2` removed from price/badge wrapper in `product-card.tsx`
- [ ] `items-end` changed to `items-center` on the same wrapper
- [ ] Price appears directly below unit text with no visual gap
- [ ] Stock badge renders correctly at the same vertical centre as the price
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No build errors: `pnpm build`
- [ ] Verified on desktop and mobile viewports
- [ ] Existing card interactions (add to cart, favourite, click-through) unaffected

---

*Last updated: 2026-06-23*

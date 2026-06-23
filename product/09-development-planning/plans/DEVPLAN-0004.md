# DEVPLAN-0004 — Favourite Icon Repositioned as Product Image Overlay

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0004 | `04-request-management/requests/REQ-0004.md` |
| PRD | — | No PRD — UI/UX improvement, direct DEVPLAN |
| User Stories | — | No stories — single-file layout change |
| Impact Assessment | — | No schema change; no cross-module impact |
| QA | QA-0002 | `11-qa-testing/test-runs/QA-0002.md` |
| Coding Prompt | — | Not required — change is self-contained and fully specified here |

---

## Status

**Dev Plan Status:** Dev Complete  
**Owner:** Product Owner  
**Date Created:** 2026-06-23  
**Last Updated:** 2026-06-23

---

## Current Blocker

None.

---

## Next Action

Dev complete. QA-0002 Passed. Proceed to UAT-0002.

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
| SCR-CUS-0001 | Product Listing | `/products` | Modified — heart icon moved from footer to image overlay |

---

## Objective

Move the favourite/heart icon from the bottom action row of the product card to an absolutely positioned overlay on the product image (top-right corner). The bottom action row should contain only the "Add to cart" button. No logic, schema, or API changes.

---

## Current App Context

- File: `neumart/components/products/product-card.tsx`
- The `<CardFooter>` previously rendered two children: an "Add to cart" `<Button>` and a heart `<Button size="icon">`.
- The image `<div>` had `relative` positioning and already contained the out-of-stock overlay — a suitable anchor for the new heart overlay.
- No Convex changes. No schema changes. No logic changes. The `handleToggleFavourite` function is unchanged.

---

## Files Impacted

| File | Change Type | Description |
|---|---|---|
| `neumart/components/products/product-card.tsx` | Modify | Move heart button from `CardFooter` into image `div` as absolute overlay; remove heart from footer |

---

## Exact Change

**File:** `neumart/components/products/product-card.tsx`

### Change 1 — Add heart button as image overlay

Inside the image `<div className="relative aspect-square ...">`, add the following **after** the out-of-stock overlay block:

```tsx
{/* Favourite overlay */}
<button
  onClick={(e) => { e.preventDefault(); handleToggleFavourite(); }}
  aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
  className={`absolute right-2 top-2 z-10 rounded-full p-1.5 shadow-sm transition-colors ${
    isFavourite
      ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400"
      : "bg-white/80 text-muted-foreground hover:bg-white hover:text-rose-500 dark:bg-background/70 dark:hover:bg-background"
  }`}
>
  <Heart className={`h-4 w-4 ${isFavourite ? "fill-current" : ""}`} />
</button>
```

Key points:
- `e.preventDefault()` stops the parent `<Link>` from triggering on click.
- `z-10` ensures the heart renders above the out-of-stock overlay.
- `rounded-full p-1.5` gives the circular background.

### Change 2 — Remove heart button from CardFooter

**Before:**
```tsx
<CardFooter className="gap-2 p-3 pt-0">
  <Button size="sm" className="flex-1" ...>...</Button>
  <Button size="icon" variant="outline" ...>
    <Heart ... />
  </Button>
</CardFooter>
```

**After:**
```tsx
<CardFooter className="p-3 pt-0">
  <Button size="sm" className="flex-1" ...>...</Button>
</CardFooter>
```

`gap-2` removed from `CardFooter` className since there is now only one child.

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
| 1 | Open `/products` on desktop | Heart icon at top-right of every product image; footer has only "Add to cart" |
| 2 | Open `/products` on mobile (375px) | Same — heart at top-right, no clipping, clean footer |
| 3 | Click heart (signed out) | Toast: "Sign in to save favourites"; no page navigation |
| 4 | Click heart (signed in, unfavourited) | Toast: "Added to favourites"; heart turns filled/rose |
| 5 | Click heart again (signed in, favourited) | Toast: "Removed from favourites"; heart returns to unfilled |
| 6 | Refresh page after favouriting | Heart remains filled on reload |
| 7 | Out-of-stock product card | Heart visible above the "Out of stock" overlay (z-index correct) |
| 8 | Click product image/title | Navigates to product detail — heart click does NOT trigger this |

### Regression Areas to Check

- [ ] Add to cart button still works from the product card
- [ ] Product image link navigates to product detail
- [ ] Favourites page still reflects changes made via card overlay
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No build errors: `pnpm build`

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Heart click triggers parent Link navigation | Low | Medium | Mitigated by `e.preventDefault()` on the button click handler |
| Heart invisible on light-coloured product images | Low | Low | `bg-white/80` background provides contrast on any image tone |

---

## Rollback Plan

Single-component change. Revert by moving the heart button back into `CardFooter` and restoring `gap-2`. No Convex deployment required.

---

## Definition of Done

- [x] Heart button renders as absolute overlay at `top-2 right-2` inside the image container
- [x] Heart button has circular white/semi-transparent background (`rounded-full bg-white/80`)
- [x] `e.preventDefault()` prevents parent link navigation on heart click
- [x] `CardFooter` contains only the "Add to cart" button
- [x] `gap-2` removed from `CardFooter` className
- [x] Verified on desktop (1280px) and mobile (375px)
- [x] Signed-out toast ("Sign in to save favourites") confirmed
- [x] No navigation triggered on heart click

---

*Last updated: 2026-06-23*

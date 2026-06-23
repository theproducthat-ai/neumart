# DEVPLAN-0003 — Coding Prompt

**Task:** Product Card Price Alignment — bring the price into the same visual block as the product name.

---

## Context

The product card on `/products` (SCR-CUS-0001) currently pushes the price to the bottom of the card content area using `mt-auto pt-2`. This disconnects the price visually from the product name and unit text.

The fix removes those utilities so the price appears directly below the unit text, forming a tight, scannable name → unit → price information block.

---

## Change Required

**File:** `neumart/components/products/product-card.tsx`

Locate the price/badge wrapper div (currently line 108):

```tsx
<div className="mt-auto flex items-end justify-between gap-1 pt-2">
```

Replace with:

```tsx
<div className="flex items-center justify-between gap-1">
```

That is the entire change. No other files need to be modified.

---

## Verify

1. `pnpm typecheck` — must pass with no errors
2. `pnpm build` — must pass with no errors
3. Open `/products` in the browser and confirm:
   - Price appears directly below the unit text, no gap
   - Stock badge (if present) is vertically centred with the price
   - Add to Cart button and favourite button are unaffected
   - Card layout looks correct on both desktop and mobile

---

## Do Not Change

- Any Convex backend files
- `schema.ts`
- Any other component files
- The card image, overlay, or footer button logic

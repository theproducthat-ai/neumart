# DEVPLAN-0007 — Coding Prompt

**Task:** Add Lucide icons to category filter pills on the product listing page.

---

## Context

The product listing page (`/products`, SCR-CUS-0001) has a row of category filter pills: All, Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks, Staples, Household. Currently these are text-only buttons.

The change adds a Lucide icon to the left of each label. Icon mapping is hardcoded per category slug. The "All" pill uses `LayoutGrid`. Unmapped slugs fall back to `Package`. No schema, no Convex, no other files.

---

## File to Modify

**`neumart/app/(customer)/products/page.tsx`** — the only file that changes.

---

## Step 1 — Update the Lucide import (line 10)

**Replace:**
```tsx
import { Package, Search } from "lucide-react";
```

**With:**
```tsx
import {
  Apple,
  Carrot,
  Cookie,
  GlassWater,
  Home,
  LayoutGrid,
  Milk,
  Package,
  Popcorn,
  Search,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
```

---

## Step 2 — Add the icon map constant

Insert this block **between the imports and the `CategoryChips` function** (i.e., after the last import line and before `function CategoryChips`):

```tsx
const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  fruits: Apple,
  vegetables: Carrot,
  dairy: Milk,
  bakery: Cookie,
  beverages: GlassWater,
  snacks: Popcorn,
  staples: Wheat,
  household: Home,
};
```

---

## Step 3 — Update the "All" button inside `CategoryChips`

**Replace:**
```tsx
      <Button
        variant={!category && !search ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect("")}
      >
        All
      </Button>
```

**With:**
```tsx
      <Button
        variant={!category && !search ? "default" : "outline"}
        size="sm"
        className="gap-1.5"
        onClick={() => onSelect("")}
      >
        <LayoutGrid className="h-4 w-4" />
        All
      </Button>
```

---

## Step 4 — Update the category buttons inside `CategoryChips`

**Replace:**
```tsx
        : categories.map((cat) => (
            <Button
              key={cat._id}
              variant={category === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
```

**With:**
```tsx
        : categories.map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.slug] ?? Package;
            return (
              <Button
                key={cat._id}
                variant={category === cat.slug ? "default" : "outline"}
                size="sm"
                className="gap-1.5"
                onClick={() => onSelect(cat.slug)}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </Button>
            );
          })}
```

---

## Verify

1. `pnpm typecheck` — must pass with no errors
2. `pnpm build` — must pass with no errors
3. Open `/products` in the browser and confirm:
   - Every pill shows an icon to the left of the label text
   - "All" pill shows `LayoutGrid` icon
   - Clicking a category pill still filters products correctly
   - Active pill (selected) still shows the dark `default` variant — icon visible in both states
   - Layout looks correct on desktop and mobile (375px)

---

## Do Not Change

- Any Convex backend files
- `schema.ts`
- Any other component or page files
- Category routing logic (`setCategory`, `onSelect`, URL params)
- The product grid, banner carousel, or any other section of `page.tsx`

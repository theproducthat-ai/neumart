# DEVPLAN-0007 — Category Icons on Product Listing Filter Pills

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0008 | `04-request-management/requests/REQ-0008.md` |
| Grilling | GRILLING-0008 | `05-discovery-and-grilling/grilled-requests/GRILLING-0008.md` |
| PRD | — | No PRD — small UI enhancement, direct DEVPLAN |
| User Stories | — | No stories — single-file change |
| Impact Assessment | — | No schema change; no cross-module impact |
| QA | — | Populated after QA is run |
| Coding Prompt | DEVPLAN-0007-coding-prompt.md | `09-development-planning/plans/DEVPLAN-0007-coding-prompt.md` |

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

Use coding prompt `DEVPLAN-0007-coding-prompt.md` to implement the change.

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
| SCR-CUS-0001 | Product Listing | `/products` | Modified — `CategoryChips` component updated to render Lucide icon + label text |

---

## Objective

Add a Lucide icon to the left of the label text on each category filter pill on the product listing page. The "All" pill gets a `LayoutGrid` icon. Each named category slug maps to a specific Lucide icon. Unmapped slugs fall back to `Package`. Icons are hardcoded in the frontend — no schema change, no admin configuration for MVP.

---

## Current App Context

- **File:** `neumart/app/(customer)/products/page.tsx`
- The `CategoryChips` component is defined inline in this file (line 14–54)
- It renders one "All" button and one button per active category
- Buttons currently contain text only: `All`, `cat.name`
- Lucide icons `Package` and `Search` are already imported at line 10
- Shadcn/ui `Button` with `size="sm"` is used for each pill
- `Button` uses `inline-flex items-center justify-center` internally — children are already in a flex row

---

## Files Impacted

| File | Change Type | Description |
|---|---|---|
| `neumart/app/(customer)/products/page.tsx` | **Modify** | Add Lucide icon imports; add `CATEGORY_ICON_MAP` constant; update `CategoryChips` to render icon + label |

No other files require changes. No Convex files. No schema changes.

---

## Exact Changes

### 1. Update Lucide import (line 10)

**Before:**
```tsx
import { Package, Search } from "lucide-react";
```

**After:**
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

### 2. Add icon map constant (insert before `CategoryChips`, after imports)

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

### 3. Update `CategoryChips` — "All" button (line 31–37)

**Before:**
```tsx
<Button
  variant={!category && !search ? "default" : "outline"}
  size="sm"
  onClick={() => onSelect("")}
>
  All
</Button>
```

**After:**
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

### 4. Update `CategoryChips` — category buttons (lines 42–51)

**Before:**
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

**After:**
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
| 1 | Open `/products` on desktop | All pills show icon left of label: "⊞ All", "🍎 Fruits", "🥕 Vegetables", etc. (Lucide icons) |
| 2 | Open `/products` on mobile (375px) | Pills wrap to second row; icons and labels remain intact on each pill |
| 3 | Click a category pill | Pill changes to `variant="default"` (dark); icon remains visible in selected state |
| 4 | Click "All" pill | Resets to All; `LayoutGrid` icon visible in selected dark state |
| 5 | Search active — no category | Pill row still renders correctly; icons unaffected |
| 6 | Category name not in icon map | `Package` icon renders as fallback — no blank space, no error |
| 7 | Loading state | Existing Skeleton placeholders render as before — icon map does not affect skeletons |

### Regression Areas to Check

- [ ] Category filter still works correctly (slug-based URL routing unchanged)
- [ ] "All" pill deselects category and clears URL param
- [ ] Active filter context text below pills still renders correctly
- [ ] Product grid unaffected
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No build errors: `pnpm build`

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A Lucide icon name doesn't exist in the installed version | Low | Low (TypeScript error) | `pnpm typecheck` will surface it immediately; swap icon name |
| Slug in `CATEGORY_ICON_MAP` doesn't match actual DB slug | Low | Low (shows `Package` fallback — harmless) | Verify slug values against Convex categories table during QA |

---

## Rollback Plan

Single-file change. Revert by removing the icon imports, `CATEGORY_ICON_MAP` constant, and the `className="gap-1.5"` + `<Icon>` additions. No deployment steps beyond a frontend redeploy.

---

## Definition of Done

- [ ] Lucide icons imported: `Apple`, `Carrot`, `Cookie`, `GlassWater`, `Home`, `LayoutGrid`, `Milk`, `Package`, `Popcorn`, `Wheat`
- [ ] `CATEGORY_ICON_MAP` constant defined above `CategoryChips`
- [ ] "All" pill renders `<LayoutGrid className="h-4 w-4" />` left of "All" text
- [ ] Each category pill renders its mapped icon left of `cat.name`
- [ ] Unmapped slugs render `Package` fallback
- [ ] All buttons have `className="gap-1.5"` for icon-label spacing
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No build errors: `pnpm build`
- [ ] Verified on `/products` — desktop and mobile viewports
- [ ] Category filtering behaviour unchanged (slug routing, active state)

---

*Last updated: 2026-06-23*

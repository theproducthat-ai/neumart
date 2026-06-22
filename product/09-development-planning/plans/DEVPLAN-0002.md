# DEVPLAN-0002 — Promotional Banner Carousel

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0002 | `04-request-management/requests/REQ-0002.md` |
| PRD | PRD-0002 | `07-prd/approved-prds/PRD-0002.md` |
| User Stories | US-0009, US-0010, US-0011, US-0012, US-0013, US-0014 | `08-user-stories/stories/` |
| Impact Assessment | — | No schema change; no cross-module impact |
| QA | — | Populated after QA is run |
| Coding Prompt | DEVPLAN-0002-coding-prompt.md | `09-development-planning/plans/DEVPLAN-0002-coding-prompt.md` |

---

## Status

**Dev Plan Status:** Ready for Development
**Owner:** Product Owner
**Date Created:** 2026-06-22
**Last Updated:** 2026-06-22

---

## Current Blocker

None.

---

## Next Action

Use coding prompt `DEVPLAN-0002-coding-prompt.md` to start development.

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
| SCR-CUS-0001 | Product Listing | `/products` | Modified — banner carousel inserted above category chips |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Competitor references | Yes | Blinkit, Zepto, BigBasket, Amazon Fresh |
| Screenshots provided | No | Style based on competitor reference |
| Banner images | No | Placeholder URLs used for MVP |
| Missing references | — | Final banner images and linkTarget routes (to be supplied by product owner before or after release) |
| Assumptions | — | 16:5 aspect ratio for banner container; placeholder images from Unsplash or similar; `/products` as default linkTarget |

---

## Objective

Implement a promotional banner carousel at the top of the product listing page (`/products`). MVP uses a static config array; the component architecture is designed so the data source can be swapped to Convex in a future iteration without rewriting the UI.

---

## Current App Context

- `app/(customer)/products/page.tsx` has two components: `ProductsPage` (Suspense wrapper, default export) and `ProductsContent` (inner client component using `useSearchParams`).
- The carousel does **not** use `useSearchParams`, so it can be placed in `ProductsPage` above the `<Suspense>` boundary without any changes to the Suspense pattern.
- No Convex changes are required — this is a pure frontend addition.
- The existing page uses `"use client"` at the top — the new components are all client-side.
- `components/` directory has subdirectories by domain (e.g. `products/`, `admin/`, `delivery/`). The carousel component goes in a new `components/banners/` subdirectory.
- Tailwind CSS v4 is in use. Responsive classes follow the standard `md:` breakpoint for tablet/desktop.

---

## Files Likely Impacted

### Convex Backend

| File | Change Type | Description |
|---|---|---|
| None | — | No Convex changes required for MVP |

### Next.js Frontend

| File | Change Type | Description |
|---|---|---|
| `neumart/lib/banners.config.ts` | **Create** | `BannerConfig` type definition + static banner config array with 3–5 placeholder banners |
| `neumart/components/banners/banner-carousel.tsx` | **Create** | `<BannerCarousel>` component — full carousel logic (display, auto-scroll, arrows, dots, swipe, click-through) |
| `neumart/app/(customer)/products/page.tsx` | **Modify** | Import active banners from config, filter by `isActive`, pass to `<BannerCarousel>` above `<Suspense>` |

### Schema

| File | Change | Notes |
|---|---|---|
| `neumart/convex/schema.ts` | No change | MVP uses static frontend config — no Convex table |

---

## Backend Changes (Convex)

None required for this DEVPLAN.

---

## Frontend Changes (Next.js)

### New Files

#### 1. `neumart/lib/banners.config.ts`

**Purpose:** Define the `BannerConfig` type and export the static banners array.

```typescript
export type BannerConfig = {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  linkTarget: string;
  isActive: boolean;
};

export const CAROUSEL_INTERVAL_MS = 4000;

export const banners: BannerConfig[] = [
  {
    id: "banner-01",
    imageUrl: "https://...",          // placeholder
    title: "Fresh Vegetables Daily",
    subtitle: "Farm-fresh, delivered to your door",
    ctaText: "Shop Vegetables",
    linkTarget: "/products?category=vegetables",
    isActive: true,
  },
  {
    id: "banner-02",
    imageUrl: "https://...",          // placeholder
    title: "Dairy & Breakfast",
    subtitle: "Start your morning right",
    ctaText: "Shop Now",
    linkTarget: "/products?category=dairy",
    isActive: true,
  },
  {
    id: "banner-03",
    imageUrl: "https://...",          // placeholder
    title: "Fresh Fruits",
    subtitle: "Hand-picked seasonal favourites",
    ctaText: "Explore",
    linkTarget: "/products?category=fruits",
    isActive: true,
  },
];
```

> **Scalability note:** `BannerConfig` mirrors the shape of a future Convex `banners` table. The `CAROUSEL_INTERVAL_MS` constant is defined here so it can be adjusted in one place.

---

#### 2. `neumart/components/banners/banner-carousel.tsx`

**Purpose:** Self-contained carousel component. Accepts `banners: BannerConfig[]` as a prop — does not import the config internally.

**Internal state:**
- `currentIndex: number` — which banner is active
- `isPaused: boolean` — whether auto-scroll is paused (hover/touch)
- `touchStartX: number | null` — x-coordinate of touch start for swipe detection

**Behaviour to implement:**

| Behaviour | Implementation |
|---|---|
| Auto-scroll | `useEffect` with `setInterval(CAROUSEL_INTERVAL_MS)`; clears on unmount |
| Pause on hover | `onMouseEnter` sets `isPaused: true`; `onMouseLeave` sets `isPaused: false` |
| Pause on touch | `onTouchStart` sets `isPaused: true` and stores `touchStartX` |
| Swipe detect | `onTouchEnd` computes `deltaX = touchEndX - touchStartX`; if `|deltaX| >= 50`, advances or retreats; resets timer |
| Vertical scroll guard | Only registers as swipe if `|deltaX| >= 50`; does not call `preventDefault` on touch (allows page scroll) |
| Right arrow | `setCurrentIndex((i + 1) % banners.length)`; resets timer |
| Left arrow | `setCurrentIndex((i - 1 + n) % n)`; resets timer |
| Dot click | `setCurrentIndex(dotIndex)`; resets timer |
| Timer reset on interaction | Maintain a `resetKey` state; increment on any manual interaction; `useEffect` depends on `[resetKey, isPaused]` |
| Banner click | `router.push(linkTarget)` if `linkTarget` is non-empty |
| No render if empty | `if (banners.length === 0) return null` |
| Single banner | Render without arrows, dots, or interval |

**Responsive layout:**
- Outer container: `relative w-full overflow-hidden rounded-2xl`
- Aspect ratio holder: `aspect-[16/5]` (prevents layout shift on image load)
- Image: `object-cover w-full h-full`; fallback `bg-muted` on error via `onError`
- Arrows: `hidden md:flex` (hidden on mobile, flex on desktop)
- Arrow buttons: absolutely positioned, vertically centred on the banner sides
- Dots: `flex justify-center gap-1.5 mt-2`; active dot `bg-primary`, inactive `bg-muted-foreground/40`
- Text overlay (optional): absolutely positioned, bottom of banner, gradient background for readability

---

### Modified Files

#### `neumart/app/(customer)/products/page.tsx`

**Change:** Insert carousel between the outer layout and the `<Suspense>` wrapper.

```tsx
// At top of file — add imports:
import { BannerCarousel } from "@/components/banners/banner-carousel";
import { banners } from "@/lib/banners.config";

// Filter active banners once at render time (not inside component):
const activeBanners = banners.filter((b) => b.isActive);

// In ProductsPage default export — insert before <Suspense>:
export default function ProductsPage() {
  const activeBanners = banners.filter((b) => b.isActive);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        <BannerCarousel banners={activeBanners} />
      </div>
      <Suspense fallback={...}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
```

> **Note:** `activeBanners` filtering happens in the parent page, not inside `<BannerCarousel>`. The container div provides consistent horizontal padding and max-width matching the product grid below.

---

## Schema Changes

None.

---

## Screen Impact

| Screen ID | Screen Name | Change |
|---|---|---|
| SCR-CUS-0001 | Product Listing | Banner carousel added above category chips. No other sections changed. |

---

## Implementation Order

All stories are frontend-only. Implement in this sequence:

| Step | Story | Deliverable | Prerequisite |
|---|---|---|---|
| 1 | US-0009 | `lib/banners.config.ts` — type + config array | None |
| 2 | US-0010 | `components/banners/banner-carousel.tsx` — core display, empty/single-banner states, responsive layout, fallback | US-0009 |
| 3 | US-0011 | Auto-scroll (`useEffect` + `setInterval`), pause on hover/touch, unmount cleanup | US-0010 |
| 4 | US-0012 | Arrow buttons (desktop only), dot indicators, dot click handler | US-0010 |
| 5 | US-0013 | Touch swipe handler (`onTouchStart`/`onTouchEnd`), threshold guard, vertical scroll passthrough | US-0010 |
| 6 | US-0014 | Banner click-through (`router.push`), empty `linkTarget` guard, `cursor-pointer` conditional | US-0010 |
| 7 | — | Wire into `products/page.tsx`, smoke test end-to-end | All above |

Steps 3–6 can be implemented together in one pass once the core component (step 2) is working.

---

## Testing Plan

### Manual Test Scenarios

| # | Scenario | Steps | Expected Result |
|---|---|---|---|
| 1 | Carousel renders on page load | Open `/products` on desktop | Carousel visible above category chips |
| 2 | Auto-scroll advances | Open `/products`, wait 4 seconds | Banner advances to next |
| 3 | Auto-scroll loops | Wait until last banner, wait 4 more seconds | Returns to first banner |
| 4 | Hover pauses (desktop) | Hover over carousel, wait 8 seconds | Banner stays on same slide |
| 5 | Resume after hover | Move cursor off carousel | Auto-scroll resumes within 4 seconds |
| 6 | Right arrow click | Click right arrow on desktop | Next banner shown |
| 7 | Left arrow wraps | Navigate to first banner, click left arrow | Last banner shown |
| 8 | Dot navigation | Click dot 3 | Banner 3 shown, dot 3 active |
| 9 | Swipe left (mobile) | Swipe left on mobile viewport | Next banner shown |
| 10 | Swipe right (mobile) | Swipe right on mobile viewport | Previous banner shown |
| 11 | Short swipe ignored | Touch and slide < 50px, release | No change |
| 12 | Vertical scroll not blocked | Scroll page while touching carousel | Page scrolls normally |
| 13 | Arrows hidden on mobile | Open `/products` on 375px viewport | No arrow buttons visible |
| 14 | Banner click-through | Click a banner with valid `linkTarget` | Navigated to route, no full reload |
| 15 | Empty linkTarget | Set linkTarget to `""`, click banner | Nothing happens, no error |
| 16 | All inactive | Set all `isActive: false` | Carousel not rendered, product grid at top |
| 17 | Single active banner | Set exactly one `isActive: true` | One banner, no arrows, no dots, no scroll |
| 18 | Broken image | Set imageUrl to broken URL | Fallback background shown, no broken image icon |
| 19 | No stale interval | Navigate to `/products`, then to `/cart` | No console errors on unmount |

### Regression Areas to Check

- [ ] Product grid still renders correctly below the carousel
- [ ] Category filter chips still work (selecting a category updates the product grid)
- [ ] Search still works from the header
- [ ] Product card click still navigates to product detail
- [ ] Mobile header is not affected
- [ ] Page scroll is not intercepted by the carousel swipe handler
- [ ] Existing Suspense/Skeleton fallback on the product grid is not broken

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Swipe handler intercepts vertical page scroll on mobile | Medium | Medium | Only register swipe if horizontal delta >= 50px; never call `preventDefault` on touch events |
| Stale `setInterval` on component unmount | Low | Low | Always return cleanup function from `useEffect` that calls `clearInterval` |
| Layout shift on banner image load | Low | Medium | Use `aspect-[16/5]` container div to reserve space before image loads |
| Carousel adds above-fold render cost | Low | Low | Static config — no async data fetching; no Convex query overhead |
| `linkTarget` routes that don't exist yet | Low | Low | `router.push` will navigate to a 404; handle by ensuring all `linkTarget` values in config are valid routes |

---

## Rollback Plan

This change is purely additive — no schema change, no Convex function change, no modification of existing business logic.

**Immediate rollback (< 5 minutes):**
1. Set all banners in `lib/banners.config.ts` to `isActive: false`.
2. Redeploy frontend (`pnpm build` + deploy).
3. Carousel disappears; no layout gap; product grid restores to top of page.

**Full rollback:**
1. Remove `<BannerCarousel>` import and usage from `products/page.tsx`.
2. Delete `components/banners/banner-carousel.tsx`.
3. Delete `lib/banners.config.ts`.
4. Redeploy frontend.

No Convex deployment needed for either rollback option.

---

## Definition of Done

- [ ] `lib/banners.config.ts` created with `BannerConfig` type and 3–5 placeholder banners
- [ ] `components/banners/banner-carousel.tsx` created — prop-driven, no internal config import
- [ ] Carousel integrated into `app/(customer)/products/page.tsx` above the `<Suspense>` boundary
- [ ] Auto-scroll at 4-second interval, pauses on hover/touch, resumes after
- [ ] Arrow buttons visible on desktop (`md:` breakpoint), hidden on mobile
- [ ] Dot indicators visible on all sizes, active dot visually distinct
- [ ] Swipe left/right works on mobile with 50px threshold
- [ ] Vertical page scroll not blocked by swipe handler
- [ ] Banner click navigates via `router.push(linkTarget)`; empty linkTarget is a no-op
- [ ] Zero active banners → carousel not rendered
- [ ] Single active banner → no arrows, no dots, no auto-scroll
- [ ] Broken image → fallback background colour, no broken-image icon
- [ ] `setInterval` cleared on component unmount (no console errors)
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] App builds without errors: `pnpm build`
- [ ] Tested on desktop (1280px) and mobile (375px) viewports
- [ ] Existing product grid, category filter, and search verified unaffected
- [ ] Ready for QA

---

*Last updated: 2026-06-22*

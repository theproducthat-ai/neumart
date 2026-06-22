# DEVPLAN-0002 — Coding Prompt: Promotional Banner Carousel

> **CRITICAL RULE:** This prompt creates and modifies frontend files only. Do NOT touch `convex/schema.ts`, any Convex function, any admin route, or any file not listed in the "Files Likely Impacted" section.

---

## 1. Context

You are implementing a promotional banner carousel for the Nuemart grocery e-commerce storefront.

**What exists today:**
- `/products` (SCR-CUS-0001) is the main product listing page.
- The page file is `neumart/app/(customer)/products/page.tsx`.
- It has two components: `ProductsPage` (default export, wraps in `<Suspense>`) and `ProductsContent` (inner client component, uses `useSearchParams`).
- Currently the page shows a category filter row followed by the product grid — there is no visual merchandising area above it.

**What you are building:**
- A `BannerConfig` TypeScript type and a static banner config array (`lib/banners.config.ts`).
- A `<BannerCarousel>` React client component (`components/banners/banner-carousel.tsx`) with auto-scroll, arrow navigation (desktop), dot indicators, swipe gesture (mobile), and banner click-through.
- Integration of the carousel into the products page, placed above the `<Suspense>` boundary in `ProductsPage`.

**Why this architecture:**
- The component accepts `banners: BannerConfig[]` as a prop and never imports the config internally — this allows the data source to be swapped to a Convex query in a future sprint without touching the component.
- Active banner filtering (`isActive: true`) happens in the parent page, not inside the component.
- The carousel is placed above `<Suspense>` so it does not interfere with the `useSearchParams` Suspense pattern required by `ProductsContent`.

**Reference style:** Blinkit, Zepto, BigBasket, Amazon Fresh — clean promotional banners, rounded corners, good spacing, mobile-first.

**Linked IDs:** REQ-0002 · PRD-0002 · DEVPLAN-0002 · US-0009 to US-0014

---

## 2. Scope

Implement exactly the following — nothing more:

- **`neumart/lib/banners.config.ts`** — Create this file with the `BannerConfig` type, the `CAROUSEL_INTERVAL_MS` constant, and a `banners` array containing 3–5 placeholder banners.
- **`neumart/components/banners/banner-carousel.tsx`** — Create this component with all carousel behaviour: display, auto-scroll, pause on hover/touch, left/right arrows (desktop only), dot indicators, swipe gesture (mobile), click-through navigation, empty-state guard, single-banner guard, broken-image fallback.
- **`neumart/app/(customer)/products/page.tsx`** — Modify only: import `BannerCarousel` and `banners`, filter active banners, mount `<BannerCarousel>` in `ProductsPage` above the `<Suspense>` wrapper.

---

## 3. Out of Scope

Do NOT do any of the following in this session:

- Do not create or modify any Convex file (`convex/*.ts`).
- Do not modify `convex/schema.ts`.
- Do not create an admin screen or any file under `app/(admin)/`.
- Do not add a Convex `banners` table — that is a future feature.
- Do not add analytics, click tracking, or A/B testing.
- Do not support external URLs in `linkTarget` — internal routes only.
- Do not add animated text overlays, video banners, or parallax effects.
- Do not install any new npm packages — implement swipe using native touch events only.
- Do not modify any file not listed in Section 6.
- Do not change any existing Convex query, mutation, or action.
- Do not change authentication logic or route guards.
- Do not modify any other customer page besides `products/page.tsx`.

---

## 4. Linked IDs

| Type | ID |
|---|---|
| Request | REQ-0002 |
| PRD | PRD-0002 |
| DEVPLAN | DEVPLAN-0002 |
| User Stories | US-0009, US-0010, US-0011, US-0012, US-0013, US-0014 |

---

## 5. Screen IDs

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — carousel mounted above Suspense boundary |

---

## 6. Files Likely Impacted

**Create (new files):**
- `neumart/lib/banners.config.ts`
- `neumart/components/banners/banner-carousel.tsx`

**Modify (existing files):**
- `neumart/app/(customer)/products/page.tsx`

**No other files should be touched.**

---

## 7. Backend Instructions (Convex)

**None.** This is a pure frontend change. Do not open or edit any file in `neumart/convex/`.

---

## 8. Frontend Instructions (Customer-facing)

### Step 1 — Create `neumart/lib/banners.config.ts`

Create the file from scratch with the following exact structure:

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
  // Add 3–5 banners here with placeholder content
  // Each banner must have id, imageUrl, linkTarget, isActive
  // title, subtitle, ctaText are optional but should be populated for MVP
  // Use publicly accessible placeholder images (e.g. from Unsplash, Picsum, or similar)
  // linkTarget must be an internal route starting with "/"
  // Example linkTargets: "/products?category=vegetables", "/products?category=fruits", "/products"
];
```

**Rules for the config:**
- Each banner must have a unique `id` string (e.g. `"banner-01"`, `"banner-02"`).
- All 3–5 banners should have `isActive: true` for MVP.
- Use real-looking grocery promotional copy for `title` and `subtitle`.
- `linkTarget` must map to valid Nuemart category routes — use slugs that match the seeded categories (vegetables, fruits, dairy, grains, etc.).
- Use landscape-format placeholder images with a 16:5 or similar wide aspect ratio. Picsum Photos (`https://picsum.photos/seed/SEED/1600/500`) works well.

---

### Step 2 — Create `neumart/components/banners/banner-carousel.tsx`

Create the directory `neumart/components/banners/` and the component file.

**Component signature:**
```typescript
"use client";

import { BannerConfig } from "@/lib/banners.config";
import { CAROUSEL_INTERVAL_MS } from "@/lib/banners.config";

interface BannerCarouselProps {
  banners: BannerConfig[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) { ... }
```

**Internal state required:**
```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const [touchStartX, setTouchStartX] = useState<number | null>(null);
const [resetKey, setResetKey] = useState(0); // increment to reset the auto-scroll timer
```

**Implement these behaviours in order:**

#### A — Empty and single-banner guards
```typescript
if (banners.length === 0) return null;
const isSingle = banners.length === 1;
```
- If empty: return `null` — no render, no layout gap.
- If single: render the banner but skip arrows, dots, and auto-scroll logic.

#### B — Auto-scroll (`useEffect`)
```typescript
useEffect(() => {
  if (isSingle || isPaused) return;
  const id = setInterval(() => {
    setCurrentIndex((i) => (i + 1) % banners.length);
  }, CAROUSEL_INTERVAL_MS);
  return () => clearInterval(id);
}, [isPaused, isSingle, banners.length, resetKey]);
```
- The `resetKey` dependency allows manual interactions to restart the timer.
- Always return the `clearInterval` cleanup to prevent stale intervals on unmount.

#### C — Navigation helpers
```typescript
function goNext() {
  setCurrentIndex((i) => (i + 1) % banners.length);
  setResetKey((k) => k + 1);
}
function goPrev() {
  setCurrentIndex((i) => (i - 1 + banners.length) % banners.length);
  setResetKey((k) => k + 1);
}
function goTo(index: number) {
  setCurrentIndex(index);
  setResetKey((k) => k + 1);
}
```

#### D — Swipe handlers
```typescript
function handleTouchStart(e: React.TouchEvent) {
  setIsPaused(true);
  setTouchStartX(e.touches[0].clientX);
}
function handleTouchEnd(e: React.TouchEvent) {
  setIsPaused(false);
  if (touchStartX === null) return;
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) >= 50) {
    delta < 0 ? goNext() : goPrev();
  }
  setTouchStartX(null);
}
```
- Minimum swipe threshold: 50px horizontal.
- Do NOT call `e.preventDefault()` — this would block vertical page scroll.

#### E — Click-through handler
```typescript
function handleBannerClick(linkTarget: string) {
  if (!linkTarget) return;
  router.push(linkTarget);
}
```
- Import `useRouter` from `"next/navigation"`.
- Apply `cursor-pointer` to the banner wrapper only when `linkTarget` is a non-empty string.

#### F — Broken image fallback
On each `<img>` element:
```typescript
onError={(e) => {
  (e.target as HTMLImageElement).style.display = "none";
}}
```
- The parent container uses a fallback `bg-muted` background so a solid colour shows when the image fails.

#### G — Layout structure

```tsx
<div
  className="relative w-full overflow-hidden rounded-2xl bg-muted"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
  {/* Aspect-ratio container — prevents layout shift */}
  <div className="aspect-[16/5] w-full relative">
    <img
      key={currentBanner.id}
      src={currentBanner.imageUrl}
      alt={currentBanner.title ?? "Promotional banner"}
      className="absolute inset-0 w-full h-full object-cover"
      onError={...}
    />

    {/* Optional text overlay — render only if title or subtitle is set */}
    {(currentBanner.title || currentBanner.subtitle) && (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6">
        {currentBanner.title && (
          <p className="text-white font-semibold text-sm md:text-lg leading-tight">
            {currentBanner.title}
          </p>
        )}
        {currentBanner.subtitle && (
          <p className="text-white/80 text-xs md:text-sm mt-0.5">
            {currentBanner.subtitle}
          </p>
        )}
      </div>
    )}

    {/* Arrow buttons — desktop only (hidden on mobile) */}
    {!isSingle && (
      <>
        <button
          onClick={goPrev}
          aria-label="Previous banner"
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next banner"
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          ›
        </button>
      </>
    )}
  </div>

  {/* Dot indicators — all screen sizes, hidden when single banner */}
  {!isSingle && (
    <div className="flex justify-center gap-1.5 pt-2 pb-1">
      {banners.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to banner ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            i === currentIndex
              ? "w-4 bg-primary"
              : "w-1.5 bg-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  )}
</div>
```

**Apply `cursor-pointer` and click handler to the `<div className="aspect-[16/5]">` wrapper:**
```tsx
<div
  className={`aspect-[16/5] w-full relative ${
    currentBanner.linkTarget ? "cursor-pointer" : ""
  }`}
  onClick={() => handleBannerClick(currentBanner.linkTarget)}
>
```

---

### Step 3 — Modify `neumart/app/(customer)/products/page.tsx`

**Add two imports at the top of the file (after existing imports):**
```typescript
import { BannerCarousel } from "@/components/banners/banner-carousel";
import { banners } from "@/lib/banners.config";
```

**Modify the `ProductsPage` default export** to filter active banners and mount the carousel above `<Suspense>`:

Current:
```tsx
export default function ProductsPage() {
  return (
    <Suspense fallback={...}>
      <ProductsContent />
    </Suspense>
  );
}
```

After:
```tsx
export default function ProductsPage() {
  const activeBanners = banners.filter((b) => b.isActive);
  return (
    <>
      {activeBanners.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 pt-6 pb-2">
          <BannerCarousel banners={activeBanners} />
        </div>
      )}
      <Suspense fallback={...}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
```

**Do not change anything else in this file** — `ProductsContent`, `CategoryChips`, the Suspense fallback, and all other logic must remain untouched.

---

## 9. Frontend Instructions (Admin)

**None.** No admin changes in this DEVPLAN.

---

## 10. Data Integrity Rules

This is a pure UI feature with no database writes. Apply these rules:

| Rule | Requirement |
|---|---|
| No Convex writes | This feature makes zero Convex mutation or action calls |
| No schema mutation | `convex/schema.ts` must not be opened or edited |
| isActive filtering at parent | The carousel component receives only active banners — it must not re-filter internally |
| linkTarget validation | Only call `router.push()` if `linkTarget` is a non-empty string — never pass an empty string to router.push |
| Interval cleanup | `clearInterval` must be called in the `useEffect` return function — never leave a stale interval |
| No preventDefault on touch | Do NOT call `e.preventDefault()` on `onTouchStart` or `onTouchEnd` — this blocks vertical page scroll |

---

## 11. Guardrails

**The developer must NOT do any of the following:**

- Modify `convex/schema.ts` or any file in `neumart/convex/`.
- Add a new npm package — swipe must be implemented with native React touch events.
- Import the banners config inside `<BannerCarousel>` — the component must be data-source agnostic.
- Add features not in this prompt — no analytics, no admin panel, no external link support, no lazy loading library.
- Change the Suspense boundary structure in `products/page.tsx` — the `useSearchParams` Suspense pattern must remain intact.
- Remove or modify `ProductsContent`, `CategoryChips`, or any Convex query calls in the products page.
- Alter authentication, route guards, or middleware.
- Add `target="_blank"` or any external URL support — `linkTarget` is internal routes only.
- Use `window.location.href` — always use `router.push()` from `next/navigation`.
- Leave `console.log` or debugging statements in the code.

---

## 12. Verification Commands

Run all of these before marking development complete. All must pass with zero errors.

```bash
# TypeScript check — must report 0 errors
pnpm typecheck

# Production build — must complete without errors
pnpm build

# Lint check
pnpm lint
```

> Note: `npx convex dev` is not required for this DEVPLAN — no Convex changes were made.

---

## 13. Manual Test Checklist

Complete every item before submitting the completion report.

**Core display:**
- [ ] 1. Open `/products` — banner carousel renders above the category chips on desktop.
- [ ] 2. Open `/products` — banner carousel renders above the category chips on mobile (375px viewport).
- [ ] 3. Set all banners to `isActive: false` in config — carousel disappears, product grid is at top, no empty gap.
- [ ] 4. Set exactly one banner to `isActive: true` — single banner shown with no arrows, no dots.
- [ ] 5. Set a banner's `imageUrl` to a broken URL — fallback `bg-muted` background shows; no broken-image icon.

**Auto-scroll:**
- [ ] 6. Open `/products` with 3+ active banners — carousel auto-advances every ~4 seconds.
- [ ] 7. Wait until last banner — carousel loops back to first banner.
- [ ] 8. Hover over carousel on desktop — auto-scroll pauses; banner stays on current slide for 8+ seconds.
- [ ] 9. Move cursor off carousel — auto-scroll resumes within 4 seconds.

**Desktop navigation:**
- [ ] 10. Click right arrow on desktop — advances to next banner.
- [ ] 11. Click left arrow on first banner — wraps to last banner.
- [ ] 12. Click right arrow on last banner — wraps to first banner.
- [ ] 13. Click a dot — carousel jumps to that banner; correct dot becomes active.
- [ ] 14. Open on mobile viewport (375px) — arrow buttons are NOT visible.

**Mobile navigation:**
- [ ] 15. Swipe left on mobile — next banner shown.
- [ ] 16. Swipe right on mobile — previous banner shown.
- [ ] 17. Touch carousel and slide less than 50px then release — carousel does not change.
- [ ] 18. Scroll the page vertically while touching the carousel area — page scrolls normally; carousel does not change.

**Click-through:**
- [ ] 19. Click a banner with a valid `linkTarget` on desktop — navigated to the target route with no full page reload.
- [ ] 20. Tap a banner with a valid `linkTarget` on mobile — navigated correctly.
- [ ] 21. Set a banner's `linkTarget` to `""` — clicking that banner does nothing; no error in console.

**Regression:**
- [ ] 22. Category chips still work — clicking a category updates the product grid.
- [ ] 23. Search (from header) still works — results show below carousel area.
- [ ] 24. Product card click still navigates to product detail page.
- [ ] 25. No console errors during any of the above tests.
- [ ] 26. `pnpm typecheck` passes with 0 errors.
- [ ] 27. `pnpm build` completes with 0 errors.

---

## 14. Completion Response Format

When development is complete, respond with exactly this format:

```
## Completion Report

1. **Files changed:** [list every file modified or created — full paths]
2. **Convex functions written or modified:** none
3. **Schema changes:** none
4. **New environment variables required:** none
5. **Acceptance criteria verified:**
   - US-0009 AC-1: [✅/❌] — [note]
   - US-0009 AC-2: [✅/❌] — [note]
   - US-0009 AC-3: [✅/❌] — [note]
   - US-0009 AC-4: [✅/❌] — [note]
   - US-0009 AC-5: [✅/❌] — [note]
   - US-0010 AC-1 through AC-8: [✅/❌ per criterion]
   - US-0011 AC-1 through AC-7: [✅/❌ per criterion]
   - US-0012 AC-1 through AC-9: [✅/❌ per criterion]
   - US-0013 AC-1 through AC-7: [✅/❌ per criterion]
   - US-0014 AC-1 through AC-5: [✅/❌ per criterion]
6. **Regression check performed:** [describe what was tested]
7. **Verification commands run:**
   - `pnpm typecheck`: [pass/fail]
   - `pnpm build`: [pass/fail]
   - `pnpm lint`: [pass/fail]
8. **Manual test checklist completed:** [items 1–27 — ✅ or ❌ per item]
9. **Blockers or notes for QA:** [anything QA should know, or "none"]
```

---

*Last updated: 2026-06-22*

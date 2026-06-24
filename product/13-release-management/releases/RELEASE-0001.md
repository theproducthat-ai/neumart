# RELEASE-0001 — Promotional Banner Carousel

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-0002 | `04-request-management/requests/REQ-0002.md` |
| PRD | PRD-0002 | `07-prd/approved-prds/PRD-0002.md` |
| QA | QA-0001 | `11-qa-testing/test-runs/QA-0001.md` |
| UAT | UAT-0001 | `12-uat/uat-runs/UAT-0001.md` |
| DEVPLAN | DEVPLAN-0002 | `09-development-planning/plans/DEVPLAN-0002.md` |

---

## Status

**Release Status:** Release In Progress  
**Release Type:** Feature Release  
**Owner:** Product Owner  
**Planned Release Date:** 2026-06-23  
**Actual Release Date:** —  
**Last Updated:** 2026-06-23

---

## Current Blocker

**Pre-release condition:** Replace placeholder banner images in `neumart/lib/banners.config.ts` with production promotional image URLs before deploying. This is a config-only change — no code change required.

---

## Next Action

1. Update banner image URLs in `neumart/lib/banners.config.ts`
2. Run deployment steps below
3. Run smoke test
4. Confirm release to update status to Released

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | Customer Commerce |
| Sub-module | Product Listing |
| Secondary Modules | None |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Release Action |
|---|---|---|---|
| SCR-CUS-0001 | Product Listing | `/products` | Modified — carousel added above product grid |

---

## Features in This Release

| Feature | PRD | UAT Status |
|---|---|---|
| Promotional Banner Carousel — auto-scrolling, arrow/dot navigation, swipe gesture, click-through | PRD-0002 | Conditional Pass (UAT-0001) |

---

## Bugs Fixed in This Release

None.

---

## Environment Variables

No new environment variables required for this release. All existing Clerk and Convex variables must remain set.

| Variable | Purpose | Confirmed in Production? |
|---|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Confirm before deploy |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth | Confirm before deploy |
| `CLERK_SECRET_KEY` | Clerk auth | Confirm before deploy |

---

## Migration / Schema Changes

**Schema changed:** No  
**New tables:** None  
**New fields:** None  
**Migration required:** No  
**Notes:** Carousel is a purely frontend change. No Convex schema or mutation changes. `npx convex deploy` is not required for this release.

---

## Pre-deployment Checklist

- [ ] UAT signed off: UAT-0001 ✅ (Conditional Pass — 2026-06-23)
- [ ] All QA bugs resolved or accepted — QA-0001 Passed, no bugs
- [ ] **UAT condition met:** Banner image URLs updated in `neumart/lib/banners.config.ts` (replace placeholder URLs with production images)
- [ ] `pnpm build` passes on current branch
- [ ] `npx tsc --noEmit` passes (or equivalent `pnpm typecheck`)
- [ ] No Convex deploy required — no schema or backend changes
- [ ] All existing environment variables confirmed in production
- [ ] Rollback plan documented below ✅
- [ ] Release notes written ✅

---

## Deployment Steps

| # | Step | Command / Action | Done? |
|---|---|---|---|
| 1 | Update banner image URLs | Edit `neumart/lib/banners.config.ts` — replace `imageUrl` values with production images | ❌ |
| 2 | Verify build locally | `cd neumart && pnpm build` — must complete with 0 errors | ❌ |
| 3 | Commit and push to main | `git add neumart/lib/banners.config.ts && git commit -m "chore: update banner images for production"` then `git push origin main` | ❌ |
| 4 | Monitor Vercel build | Open Vercel dashboard — wait for build to complete | ❌ |
| 5 | Verify deployment live | Open production URL → `/products` — carousel visible with production images | ❌ |
| 6 | Run smoke test | See smoke test section below | ❌ |

> **Note:** If banner images are already hosted externally and URLs are correct in config, steps 1–3 may be combined or skipped. In that case, push from the current branch state directly.

---

## Smoke Test (Post-deployment)

Run these on the **production URL** immediately after Vercel build completes.

| # | Check | Expected | Pass / Fail |
|---|---|---|---|
| 1 | `/products` loads | Page loads without error, no blank screen | ❌ |
| 2 | Carousel visible above product grid | Carousel renders above category chips, not below | ❌ |
| 3 | Banner images load | Production images visible (no broken image icon) | ❌ |
| 4 | Auto-scroll works | Carousel advances to next banner within ~4 seconds | ❌ |
| 5 | Category chips still work | Click a category — product grid filters correctly | ❌ |
| 6 | Product card click works | Click a product card — navigates to product detail page | ❌ |
| 7 | Add to cart works | Click "Add to cart" on any product — cart icon in header updates | ❌ |
| 8 | Mobile layout (375px) | Resize browser to 375px — carousel fills width, arrows hidden, dots visible | ❌ |
| 9 | No console errors | Open DevTools → Console — no red errors on `/products` | ❌ |
| 10 | Admin login still works | Navigate to `/admin` — admin sees dashboard | ❌ |

---

## Release Notes

### What's New — v1 Promotional Banner Carousel

**Visible to:** All customers (signed in or not)  
**Route affected:** `/products` (Product Listing Page)

---

**New feature: Promotional Banner Carousel**

The product listing page now opens with a full-width promotional carousel above the product grid. This gives the storefront a professional visual merchandising area — consistent with the feel of Blinkit and BigBasket.

**What it does:**
- Displays up to 5 promotional banners with title, subtitle, and CTA text
- Auto-scrolls through banners every 4 seconds; pauses on hover (desktop) or touch (mobile)
- Left/right navigation arrows on desktop; swipe gestures on mobile
- Dot indicators show which banner is active
- Each banner can link to a product category
- Broken image URLs fall back gracefully (shows muted background)

**Known limitations (V1):**
- Banner click-through destinations are set to product categories at launch. Specific deep-links to offers or promotions will come in a future enhancement.
- No banner engagement analytics in V1.

**Admin note:** Banners are configured in `neumart/lib/banners.config.ts`. Image URLs, titles, subtitles, and link destinations can be updated by editing this file — no schema change or Convex deploy required.

---

## Rollback Plan

**Rollback trigger:** Carousel breaks the `/products` page layout, causes a JS error, or blocks Add to Cart / category filter behaviour.

**Rollback type:** Code revert — frontend only. No Convex schema changes to reverse.

**Rollback steps:**

1. Identify the commit hash that introduced the carousel: `git log --oneline -10`
2. Revert: `git revert <carousel-commit-hash>`
3. Push to main: `git push origin main`
4. Monitor Vercel build — wait for deployment
5. Verify `/products` loads without carousel and all existing functionality is intact
6. Update this release record status to `Rolled Back`
7. Create incident entry in `product/14-post-release/INCIDENT_LOG.md` (create file if absent)
8. Update `REQUEST_REGISTER.md` REQ-0002 status to `Rolled Back`

**Estimated rollback time:** ~10 minutes (revert commit + Vercel build)

**Data risk:** None — no schema changes, no data migrations.

---

## Release Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Business Owner | Product Owner | 2026-06-23 (UAT) | Conditional Pass ✅ |
| Developer | — | — | Pending deployment confirmation |

---

## Post-release Notes

*(Fill in after deployment.)*

**Actual release date/time:** —  
**Smoke test result:** —  
**Issues found after release:** —  
**Rollback triggered:** No

---

*Last updated: 2026-06-23*

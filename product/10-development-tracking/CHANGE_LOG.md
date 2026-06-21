# Nuemart — Change Log

This file records significant changes to the application. Each entry maps a change to the commit that delivered it and the phase or request that drove it.

---

## Format

```
## [Version / Phase] — YYYY-MM-DD
### Added
### Changed
### Fixed
### Removed
```

---

## [Phase 10] — 2026-06-21 (commit b27d6f26)

### Fixed
- `app/(admin)/admin/inventory/page.tsx` — `?stock` query param now pre-selects the stock filter on load. Dashboard links to `/admin/inventory?stock=low_stock` and `?stock=out_of_stock` now work correctly. Implemented via `useSearchParams()` inside a Suspense-wrapped inner component.
- `components/layout/customer-header.tsx` — Mobile "More" dropdown added (hamburger icon, `sm:hidden`). Exposes Shop (always), and Addresses + Orders when signed in. Uses existing `DropdownMenu` from shadcn/ui.

### Verified Clean
- `npx convex codegen` ✅
- `pnpm lint` ✅
- `pnpm typecheck` ✅
- `pnpm build` ✅ — 25 routes, Next.js 16.2.9

---

## [Phase 9] — 2026-06-21 (commit cfc8f4fd)

### Added
- Shared formatting helpers (`lib/format.ts`) — `formatCurrency`, `formatDate`
- Mobile-responsive header improvements
- Product card polish (unit display, better image fallback)
- Admin pages: page headers, improved empty states and loading states
- Address and order pages: improved layout and information density

### Fixed
- Various UX polish items across customer and admin flows

---

## [Phase 8] — 2026-06-21 (commit 210eabbe)

### Added
- `convex/seed.ts` — 8 categories, 36 grocery products, per-slug upsert idempotency
- `README.md` — full setup guide including seed instructions and admin bootstrap
- `.env.example` — environment variable template (unblocked from .gitignore via `!.env.example`)
- `DEPLOYMENT_CHECKLIST.md` — 10-section deployment checklist including Razorpay future phase
- `adminGetOrderStats` optimized with index-per-status parallel queries instead of full collect() scan
- `loading.tsx` added for all customer routes and admin section

### Fixed
- `useSearchParams` Suspense boundary in `/orders/[id]/page.tsx`

---

## [Phase 7] — 2026-06-21 (commit 2053071f)

### Added
- Low stock threshold per product (`lowStockThreshold` field in schema)
- `stockMovements` table for full audit trail of all stock changes
- Admin inventory detail page (`/admin/inventory/[productId]`) — stock movement history
- `AdjustStockDialog` component for manual stock adjustments
- Stock status badges (In stock / Low stock / Out of stock)
- Admin inventory page: search, category filter, stock status filter

---

## [Phases 1–6] — Pre-changelog

Phases 1–6 were built before this change log existed. A summary of what was built:

- **Phase 1:** Foundation — Clerk, Convex, Next.js, Zustand, shadcn/ui
- **Phase 2:** Customer storefront — product listing, search, category filter, product detail, favourites, cart
- **Phase 3:** Admin CRUD — categories, products, toggle active
- **Phase 4:** Address management — add, edit, delete, set default; checkout gate
- **Phase 5:** Order placement without payment — Pay Later flow, order history, order detail
- **Phase 6:** Admin orders and fulfilment — orders list, filters, order detail, status update

---

*Last updated: 2026-06-21*

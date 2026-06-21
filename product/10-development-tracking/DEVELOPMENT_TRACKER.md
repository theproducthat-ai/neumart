# Nuemart — Development Tracker

This file tracks all active and planned development work. Each entry links to a request, a development plan (DEVPLAN) and the current build state.

---

## Active Development

*No active development in progress.*

---

## Development Planned (Ready to Build)

*No development plans waiting to be executed.*

---

## Recently Completed

| DEVPLAN ID | Request ID | Title | Completed Date | Commit | Notes |
|---|---|---|---|---|---|
| — | — | Phase 10 smoke test + bug fixes | 2026-06-21 | b27d6f26 | Inventory query-param fix, mobile header More menu |
| — | — | Phase 9 UX polish | 2026-06-21 | cfc8f4fd | Shared format helpers, mobile header, product card improvements |
| — | — | Phase 8 production hardening | 2026-06-21 | 210eabbe | Seed data, README, .env.example, DEPLOYMENT_CHECKLIST |
| — | — | Phase 7 inventory controls | 2026-06-21 | 2053071f | Stock audit, low-stock threshold, movement history |

*Note: Phases 1–10 predate the Product OS. DEVPLAN IDs will be assigned going forward.*

---

## Build Conventions

### Before Starting a Build
1. Confirm request is in `Development Planned` or `Build Prompt Created` status in REQUEST_REGISTER.md.
2. Read `convex/_generated/ai/guidelines.md` before writing any Convex code.
3. Read `PRODUCT_PRINCIPLES.md` before writing any code.
4. Update INCOMPLETE_WORK_TRACKER.md with the work items you are about to create.

### During a Build
- Mark each file touched in the DEVPLAN.
- If blocked, update REQUEST_REGISTER.md to `Dev Blocked` immediately.
- Do not add features outside the approved scope.
- Do not install new dependencies without a specific approved REQ.

### After a Build
1. Run `npx convex codegen`.
2. Run `pnpm lint`.
3. Run `pnpm typecheck`.
4. Run `pnpm build`.
5. Fix all errors before marking the build complete.
6. Update INCOMPLETE_WORK_TRACKER.md — mark completed items done.
7. Update REQUEST_REGISTER.md — move to `Ready for QA`.
8. Update ACTIVE_REQUESTS.md.
9. Update CHANGE_LOG.md.

---

## Next Planned Phase

### Phase 11 — Razorpay Payment Integration

**Status:** Waiting — Razorpay merchant account required.  
**Blocker:** Razorpay merchant account + API keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`).  
**Scope:** See `BUILD_PLAN.md` §6–9 for the full specification.

Key deliverables:
- `convex/orders.ts` — `createRazorpayOrder` action (fetch + Basic Auth)
- `convex/http.ts` — webhook route, HMAC signature verification, idempotency guard, inventory reduction on `payment.captured`
- `lib/razorpay-script.ts` — dynamic checkout.js loader
- `components/checkout/razorpay-button.tsx` — checkout trigger
- Checkout page wired end-to-end

---

*Last updated: 2026-06-21*

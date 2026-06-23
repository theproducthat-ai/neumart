# Nuemart Product OS — Knowledge Map

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## 1. What Is the Knowledge Map?

The Knowledge Map is an index of reusable knowledge items extracted from product work on Nuemart. It captures:

- **Principles** that guide product decisions
- **Decisions** that have been made and must not be re-litigated
- **Gaps** that were identified and how they were resolved or are being tracked
- **Technical patterns** that have been established and should be reused
- **Anti-patterns** to actively avoid based on experience

This file does not replace the authoritative sources (DECISION_LOG.md, GAP_LOG.md, PRODUCT_PRINCIPLES.md). It provides a fast-lookup index for AI agents and team members working within the Product OS.

---

## 2. Knowledge from Product Principles

*Source: `product/00-product-foundation/PRODUCT_PRINCIPLES.md`*

The 12 Product Principles for Nuemart:

| Knowledge ID | Principle | Category | Implication |
|---|---|---|---|
| KM-PRIN-001 | India-first product — optimize for Indian market conditions, languages, payment methods, connectivity | Strategy | Use Razorpay; support slow connections; INR/paise only |
| KM-PRIN-002 | Simplicity over feature richness — solve the core problem well before adding complexity | Product | MVP scoping; reject premature features |
| KM-PRIN-003 | Convex as the backend — all server-side logic in Convex functions; no direct DB access elsewhere | Architecture | No REST APIs that bypass Convex |
| KM-PRIN-004 | Security-first data access — never trust client-supplied identity (DEC-003) | Security | ctx.auth.getUserIdentity() always; no userId params |
| KM-PRIN-005 | Clerk handles auth, Razorpay handles payment — no mixing of auth and payment layers | Architecture | Clerk Billing never used; role != payment |
| KM-PRIN-006 | Atomic data operations — mutations that span tables must succeed or fail together | Architecture | DEC-012; no partial-failure states |
| KM-PRIN-007 | Admin gating is server-side — client-side role checks are not sufficient | Security | Next.js middleware + Clerk JWT template for admin |
| KM-PRIN-008 | Stock integrity via controlled mutation paths — stock changes only through verified events | Business Rule | DEC-007; webhook-only for Razorpay stock deduction |
| KM-PRIN-009 | Paise everywhere — all money is integers in paise; UI layer formats for display | Data | DEC-002; formatCurrency() only in UI |
| KM-PRIN-010 | Convex-generated types — Doc<T> and Id<T> always; no manual type interfaces | Engineering | DEC-009; prevents schema drift |
| KM-PRIN-011 | Webpack build for pnpm + zod compatibility — Turbopack breaks; webpack + alias resolves | Engineering | DEC-010; next.config.ts alias required |
| KM-PRIN-012 | Delivery and payment are independent — delivery mutations never touch financial or stock state | Architecture | DEC-013; clean separation of concerns |

---

## 3. Knowledge from Decision Log

*Source: `product/00-product-foundation/DECISION_LOG.md` (DEC-001–DEC-014)*
*Cross-reference: `product/graph/DECISION_MAP.md` for full detail and linked objects*

| Knowledge ID | Decision | Category | Key Takeaway |
|---|---|---|---|
| KM-DEC-001 | Razorpay only — no Stripe, no Clerk Billing | Technology | India-first payment; do not evaluate alternatives without strong reason |
| KM-DEC-002 | Paise for all monetary values | Data Modeling | formatCurrency() always in UI; never store rupees |
| KM-DEC-003 | No userId from frontend in Convex | Security | Permanent rule; any PR with userId param is a defect |
| KM-DEC-004 | Zustand + localStorage for cart | Architecture | Cart is pre-auth and client-local; Convex round-trip adds unnecessary latency |
| KM-DEC-005 | Pay Later for MVP | Business | Temporary until Razorpay live; document this in all checkout-related items |
| KM-DEC-006 | Razorpay via fetch + Basic Auth | Technical | Convex V8 runtime cannot run Node.js-only npm packages |
| KM-DEC-007 | Stock at order placement (Pay Later) | Business Rule | Temporary; shifts to webhook on Razorpay; be aware in inventory calculations |
| KM-DEC-008 | Admin role in Clerk publicMetadata | Auth | No admins table; always check Clerk JWT template for role injection |
| KM-DEC-009 | Convex generated types only | Engineering | No hand-rolled interfaces; schema drift is a silent bug |
| KM-DEC-010 | next build --webpack | Build | pnpm + zod/Turbopack incompatibility; always use --webpack flag |
| KM-DEC-011 | Suspense wrapper for useSearchParams | Pattern | Standard Next.js App Router requirement; apply universally |
| KM-DEC-012 | Atomic delivery task creation | Architecture | Delivery task always created in placeOrder mutation; no orphan orders |
| KM-DEC-013 | Delivery decoupled from order/payment/stock | Architecture | No delivery mutation may touch financial or stock state |
| KM-DEC-014 | Delivery person as strings in MVP | Data Modeling | No deliveryPersons table in MVP; revisit when volume warrants |

---

## 4. Knowledge from Gap Log

*Source: `product/00-product-foundation/GAP_LOG.md` (GAP-001–GAP-013)*

| Knowledge ID | Gap Originally Identified | Resolution / Lesson |
|---|---|---|
| KM-GAP-001 | Feature details scattered across Request files only | Create dedicated Feature Object files; requests should reference features, not be the feature |
| KM-GAP-002 | No single view of all screens and their status | SCREEN_REGISTRY.md created; now mirrored in SCREEN_MAP.md |
| KM-GAP-003 | Module dependencies not documented | MODULE_DEPENDENCY_MAP.md created; mirrored in DEPENDENCY_MAP.md |
| KM-GAP-004 | Data entities not centrally catalogued | DATA_ENTITY_MAP.md created; mirrored in graph/DATA_ENTITY_MAP.md |
| KM-GAP-005 | No global registry of unique IDs | MASTER_REGISTRY.md created; all IDs assigned from there |
| KM-GAP-006 | No traceability from request to release | Traceability chain documented in TRACEABILITY_MAP.md |
| KM-GAP-007 | PRD approval status inconsistently tracked | PRD objects now carry explicit status; formal approval step required |
| KM-GAP-008 | QA test cases scattered, no run object | QA Run objects now centralize results; test cases linked to stories |
| KM-GAP-009 | UAT sign-off not formally gated | UAT Run objects require explicit sign-off before Release object can be created |
| KM-GAP-010 | Decisions re-surfaced in multiple documents, not centrally linked | DECISION_LOG.md is authoritative; DECISION_MAP.md adds cross-links |
| KM-GAP-011 | Risk items noted in PRDs but not tracked centrally | RISK_MAP.md created for central risk tracking |
| KM-GAP-012 | No graph layer connecting all product objects | graph/ directory created with OBJECT_INDEX, RELATIONSHIP_INDEX, FEATURE_MASTER, etc. |
| KM-GAP-013 | Legacy numeric IDs (REQ-0001, US-0009) are not self-describing | Semantic ID system established; legacy IDs preserved as aliases |

---

## 5. Technical Knowledge

### Convex Patterns

| Knowledge ID | Pattern | When to Use | Reference |
|---|---|---|---|
| KM-TECH-001 | Use `ctx.auth.getUserIdentity()` for all auth in Convex | Every mutation that requires authentication | DEC-003 |
| KM-TECH-002 | Use `Doc<"tableName">` and `Id<"tableName">` from Convex generated types | All TypeScript types referencing Convex data | DEC-009 |
| KM-TECH-003 | Atomic mutation for cross-table writes | Any operation that writes to multiple tables | DEC-012 |
| KM-TECH-004 | Razorpay API via `fetch` + Basic Auth with `btoa()` | Any Convex action calling Razorpay REST APIs | DEC-006 |
| KM-TECH-005 | Webhook-based payment status — never trust frontend | Payment status updates only from verified webhook | DEC-001, DEC-007 |

### Next.js / Build Patterns

| Knowledge ID | Pattern | When to Use | Reference |
|---|---|---|---|
| KM-TECH-006 | `next build --webpack` flag | Always — Turbopack incompatible with pnpm + zod | DEC-010 |
| KM-TECH-007 | Wrap `useSearchParams()` in `<Suspense>` | Any client component page using `useSearchParams()` | DEC-011 |
| KM-TECH-008 | Server-side Clerk role check in admin layout | All `/admin/*` routes | DEC-008 |
| KM-TECH-009 | Zod/webpack alias in next.config.ts | Part of build setup — already in place; do not remove | Memory: feedback_zod_pnpm_webpack.md |

### Clerk Integration Patterns

| Knowledge ID | Pattern | Notes |
|---|---|---|
| KM-TECH-010 | Clerk JWT template injects `role` claim | Used by admin middleware and Convex auth checks |
| KM-TECH-011 | Clerk `publicMetadata.role = "admin"` for admin access | Set via Clerk dashboard; no Convex write needed |
| KM-TECH-012 | Convex user sync via `tokenIdentifier` | Users synced from Clerk to Convex on sign-in |

---

## 6. Reusable Patterns

### Carousel Component Pattern (FEATURE-COM-PLP-CAROUSEL)

- Auto-scroll with pause-on-hover using `setInterval` + `clearInterval` in `useEffect`
- Touch event handling: distinguish horizontal (carousel) vs. vertical (scroll) swipe intent using `deltaX` vs. `deltaY`
- Wrap-around navigation: `(current - 1 + total) % total` and `(current + 1) % total`
- Graceful empty/single state: hide controls when `banners.length <= 1`; hide carousel entirely when `banners.length === 0`
- Broken image URL: `onError` fallback to placeholder

### Delivery Lifecycle Pattern (FEATURE-DEL-CORE-DELIVERY-MVP)

- Status flow: `unassigned` → `assigned` → `picked_up` → `in_transit` → `delivered` / `failed`
- Always created atomically inside `placeOrder` mutation (DEC-012)
- Fully decoupled from order, payment, and stock — no cross-mutation writes (DEC-013)
- Delivery person as inline strings for MVP — no FK references (DEC-014)

### Admin JWT Auth Pattern

- Admin layout uses Next.js middleware + Clerk JWT template to check `role === "admin"` server-side
- No client-side-only role checks accepted
- Clerk `publicMetadata` is the source of role truth

---

## 7. Anti-Patterns to Avoid

| Anti-pattern | Why it's wrong | Correct pattern | Reference |
|---|---|---|---|
| Accepting `userId` as a Convex mutation param | Spoofable from the client; allows cross-user data access | Use `ctx.auth.getUserIdentity()` | DEC-003 |
| Storing monetary values as floats or in rupees | Floating-point rounding errors in financial calculations | Always store as integer paise | DEC-002 |
| Installing Razorpay npm SDK in Convex | Node.js-only dependencies crash Convex V8 runtime | Use `fetch` + Basic Auth | DEC-006 |
| Using hand-rolled TypeScript interfaces for Convex tables | Silently drifts from schema; causes runtime type errors | Use `Doc<T>` and `Id<T>` | DEC-009 |
| Client-only admin role check | Can be bypassed by client manipulation | Server-side middleware check + Clerk JWT | DEC-008 |
| Delivery mutation writing to orders/payments/products | Creates cascading failures across modules | Keep delivery state fully isolated | DEC-013 |
| Storing all feature information only in Request files | Requests are intake records, not feature definitions | Create dedicated Feature Object files | KM-GAP-001 |
| Using Turbopack build with pnpm + zod | Module resolution failure on pnpm optional peers | next build --webpack + next.config.ts alias | DEC-010 |
| Creating Release objects before UAT sign-off | Skips the formal validation gate | Require UAT Run object with sign-off before Release | KM-GAP-009 |
| Numbering IDs manually without consulting the registry | Creates duplicate or conflicting IDs | Always use MASTER_REGISTRY.md for ID assignment | KM-GAP-005 |

---

*Last updated: 2026-06-22*

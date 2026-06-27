# Performance Guardrails — Nuemart

Performance budgets and rules. Every significant feature should be evaluated against these.

---

## Page Load Budgets

| Metric | Target | Blocker |
|--------|--------|---------|
| Largest Contentful Paint (LCP) | < 2.5s | > 4s |
| First Input Delay (FID) / INP | < 100ms | > 300ms |
| Cumulative Layout Shift (CLS) | < 0.1 | > 0.25 |
| Total Blocking Time (TBT) | < 200ms | > 600ms |
| Time to First Byte (TTFB) | < 800ms | > 1800ms |
| JS bundle size (initial load) | < 200KB gzipped | > 400KB |

## Image Rules

- Always use `next/image`. Never use `<img>`.
- Set explicit `width` and `height` to prevent layout shift.
- Use `priority` prop on above-the-fold images (hero, product cover).
- Lazy-load all below-fold images (default behaviour of `next/image`).
- Serve WebP format. Vercel Image Optimisation handles this automatically.

## Bundle Size

- No new dependency added without checking its bundle size impact (`bundlephobia.com`).
- Tree-shake all icon imports: `import { ShoppingCart } from "lucide-react"` not `import * as Icons`.
- Use `next/dynamic` with `ssr: false` for:
  - Chart libraries.
  - Heavy editor/picker components.
  - Components only used on user action (not on route load).

## Data Fetching

- Convex real-time subscriptions are efficient — do not over-paginate or over-fetch.
- Avoid subscribing to the same query from multiple components. Lift the query up.
- Do not fetch in a loop (N+1). Batch or denormalise.

## Rendering Strategy

- Product listing and product detail: Server Component or ISR where possible.
- Cart, checkout, user profile: Client Component (user-specific, cannot cache).
- Admin dashboards: Client Component with Convex queries.

## Convex Performance

- Index all fields used in `.withIndex()` — unindexed queries degrade at scale.
- Paginate all list queries. Default page size: 20–50 items.
- Avoid subscribing to large datasets reactively (e.g., all orders); filter by user or status.

## Monitoring

- Use Vercel Analytics for Core Web Vitals in production.
- Use Convex dashboard to monitor query latency and function execution times.
- See `OBSERVABILITY_GUARDRAILS.md`.

---

## Related
- `FRONTEND_GUARDRAILS.md`
- `OBSERVABILITY_GUARDRAILS.md`
- `COST_GUARDRAILS.md`

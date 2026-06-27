# Frontend Guardrails — Nuemart

Rules for all UI work in the Next.js App Router application.

---

## Server vs Client Components

- Default to **Server Components**. Add `"use client"` only when needed.
- `"use client"` is required for: hooks (`useState`, `useEffect`, Convex hooks), event handlers, browser APIs.
- Never put secret keys or sensitive server logic in a client component.
- Pass serialisable props from Server → Client. Never pass non-serialisable objects (e.g., class instances, functions).

## Route Structure

```
app/
  (auth)/          ← Clerk-gated auth routes
  (customer)/      ← Customer-facing app routes
  (admin)/         ← Admin routes (role-checked)
  api/             ← Webhooks only (Clerk, Razorpay)
```

- Group routes by user role using route groups `(name)`.
- Do not put business logic in `page.tsx`. Delegate to components and hooks.
- `layout.tsx` handles shared nav, auth context, and providers. Keep it thin.

## Component Architecture

- Shared components live in `components/shared/` (used ≥2 routes).
- UI primitives from shadcn/ui live in `components/ui/`. Do not edit generated shadcn files unless overriding intentionally.
- Route-specific components live colocated with their page.
- Every component must handle: loading state, empty state, error state. Never render undefined silently.

## Tailwind Usage

- Use Tailwind classes. No inline styles. No CSS modules except for animations or keyframes that Tailwind cannot express.
- Use semantic design tokens (`bg-primary`, `text-foreground`, `border-border`) — not raw colour values.
- Dark/light mode via `next-themes` + Tailwind CSS variables. Never hardcode `dark:` overrides on individual elements if a global token exists.
- Use `cn()` from `lib/utils` for dynamic class merging.

## State Management

- Component-local state: `useState`.
- Shared client state (cart, user preferences): Zustand stores.
- Server/database state: Convex queries (not duplicated in Zustand).
- Form state: React Hook Form + Zod resolver. No uncontrolled forms for complex inputs.

## Data Fetching

- Use `useQuery` from `convex/react` for reads in client components.
- Use `useMutation` from `convex/react` for writes.
- Do not call Convex from server components directly (use server-side Convex client if needed and available).
- Show loading spinners or skeletons while queries are loading. Never leave blank white space.

## Performance

- All images use `next/image` with explicit `width` and `height`.
- Dynamic imports (`next/dynamic`) for heavy components not needed on first render.
- No blocking `useEffect` in the critical path on route load.
- See `PERFORMANCE_GUARDRAILS.md` for budgets.

## Accessibility

- All interactive elements are keyboard-navigable.
- All images have `alt` text. Decorative images use `alt=""`.
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`).
- Radix UI primitives handle ARIA for complex components (modals, dropdowns, tooltips).

## Forms

- Use React Hook Form + Zod schema validation for all user-input forms.
- Show inline field-level errors (not just toast-level).
- Disable submit button while mutation is pending.
- Reset form on successful submission.

---

## Related
- `CODING_STANDARDS.md`
- `PERFORMANCE_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`

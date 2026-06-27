# Architecture Principles — Nuemart

These principles govern all architectural decisions. When in doubt, the simpler, more maintainable choice wins.

---

## 1. Convex Is the Backend

All persistent data, business logic, and server-side computation lives in Convex. There is no separate API server.

- Use Convex queries for reads.
- Use Convex mutations for writes.
- Use Convex actions for external API calls (Razorpay, email, etc.).
- Do not replicate Convex data into local state unless necessary for UI performance.

## 2. Next.js App Router is the Shell

The Next.js app provides routing, layout, SSR/SSG where needed, and entry points for Clerk auth. It is not a backend.

- Route handlers (`/api/*`) are for webhooks only (Clerk, Razorpay). Never put business logic there.
- Pages/layouts own navigation structure. Components own rendering.
- Use server components for initial data hydration via Convex HTTP client where possible.

## 3. Clerk Owns Identity

Never re-implement authentication or session management. All identity flows go through Clerk.

- Use `auth()` (server) and `useAuth()` / `useUser()` (client) from `@clerk/nextjs`.
- Role/permission checks must use Clerk session claims or Convex user records — not client-side state alone.

## 4. TypeScript Strict Mode Everywhere

`tsconfig.json` strict mode is non-negotiable. No `any`, no type assertions without justification, no `// @ts-ignore` without a comment explaining why.

## 5. Components Are Dumb, Hooks Are Smart

- Components: render UI, handle local UI state.
- Custom hooks: encapsulate data fetching, business logic, side effects.
- Convex query/mutation hooks: the primary data layer in client components.

## 6. No Premature Abstraction

Build for what exists now. Extract shared code only when the same pattern appears in three or more places. Generic wrappers that only wrap one thing are noise.

## 7. File Colocation

Keep related files close together:
```
app/
  (customer)/
    products/
      page.tsx          ← route
      ProductGrid.tsx   ← component used only here
      useProducts.ts    ← hook used only here
components/
  ui/                   ← shadcn generated components
  shared/               ← components used across ≥2 routes
```

## 8. Environment Separation

- `NEXT_PUBLIC_*` for client-exposed config.
- Secret keys only in server-side code or Convex actions.
- Never access `process.env` in client components.
- See `ENVIRONMENT_POLICY.md`.

## 9. One Source of Truth

Convex schema is the source of truth for data shape. Zod schemas validate inputs at boundaries. TypeScript types are derived from both. Do not maintain separate type definitions that duplicate schema fields.

## 10. Fail Loudly in Development, Gracefully in Production

- Development: throw errors, log verbosely, surface edge cases.
- Production: catch errors, show user-friendly states, log to observability, never expose stack traces.

---

## Related
- `TECH_STACK.md`
- `FRONTEND_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`
- `DATABASE_GUARDRAILS.md`
- `AUTH_GUARDRAILS.md`

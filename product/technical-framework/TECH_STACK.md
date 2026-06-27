# Tech Stack — Nuemart

Authoritative reference for the current technology choices. Any addition, removal, or major version change requires explicit approval. See `DEPENDENCY_POLICY.md`.

---

## Core Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.x | App Router, webpack mode |
| Language | TypeScript | 5.x | Strict mode |
| Runtime | Node.js | 20.x LTS | |
| UI Library | React | 19.x | |
| Backend / Database | Convex | 1.41+ | Serverless, real-time |
| Auth | Clerk | 7.x | @clerk/nextjs |
| Styling | Tailwind CSS | 4.x | |
| Component System | shadcn/ui + Radix UI | latest | Radix primitives |
| Validation | Zod | 4.x | |
| State Management | Zustand | 5.x | Client-side only |
| Forms | React Hook Form + @hookform/resolvers | 7.x | |
| Icons | Lucide React | latest | |
| Notifications | Sonner | 2.x | Toast system |
| QR Code | react-qr-code | 2.x | |
| Themes | next-themes | 0.4.x | |
| Package Manager | pnpm | 9.x | Workspace monorepo |

---

## Infrastructure

| Concern | Platform | Notes |
|---------|---------|-------|
| Hosting | Vercel | Next.js native |
| Backend | Convex Cloud | Managed, serverless |
| Auth Provider | Clerk | Managed |
| Payments | Razorpay | Integration in progress |
| CDN / Assets | Vercel Edge | |

---

## Not in Stack

The following are explicitly NOT used and should not be introduced:

- Redux / Redux Toolkit (use Zustand)
- Prisma / Drizzle / raw SQL (use Convex)
- Express / Fastify / custom API servers (use Convex functions + Next.js route handlers)
- NextAuth / Auth.js (use Clerk)
- Axios (use native fetch or Convex query)
- MUI / Ant Design / Chakra UI (use shadcn/ui)
- Jest (no test runner currently; see TESTING_GUARDRAILS.md)

---

## Version Freeze Policy

- Do not upgrade major versions without architectural review.
- Do not add new packages without checking DEPENDENCY_POLICY.md.
- convex package version must stay in sync between monorepo root and neumart app.

---

## Related
- `ARCHITECTURE_PRINCIPLES.md`
- `DEPENDENCY_POLICY.md`
- `FRONTEND_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`

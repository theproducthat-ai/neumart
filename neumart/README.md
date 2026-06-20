# Nuemart

A full-stack grocery e-commerce MVP built with Next.js, Convex and Clerk. Customers can browse products, manage a cart, place orders and track deliveries. Admins manage categories, products, orders and inventory from a dedicated dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, `--webpack` mode) |
| Backend / DB | Convex (real-time queries, mutations, schema) |
| Auth | Clerk (Next.js SDK v7) |
| UI Components | Shadcn/ui + Tailwind CSS v4 |
| State (cart) | Zustand with localStorage persistence |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Package manager | pnpm (workspace monorepo) |

---

## Project Structure

```
neumart/                   # monorepo root
├── neumart/               # main Next.js app
│   ├── app/
│   │   ├── (customer)/   # customer storefront routes
│   │   ├── (admin)/      # admin dashboard routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── components/
│   │   ├── admin/        # page-header, empty-state, status-badge, forms
│   │   ├── layout/       # admin-sidebar, customer-header
│   │   ├── products/     # product-card
│   │   ├── address/      # address-form
│   │   └── ui/           # shadcn components
│   ├── convex/           # backend functions + schema
│   ├── store/            # zustand cart store
│   └── lib/              # utilities
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Required variables

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | Convex dashboard → Settings → URL & Deploy Key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |

Clerk JWT template must be configured — see **Clerk + Convex setup** below.

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- A [Convex](https://convex.dev) account
- A [Clerk](https://clerk.com) account

### 1. Install dependencies

```bash
# from the monorepo root
pnpm install
```

### 2. Configure Convex

```bash
cd neumart
npx convex dev
```

This starts the Convex development server and syncs your schema and functions. Copy the `NEXT_PUBLIC_CONVEX_URL` it prints into `.env.local`.

### 3. Configure Clerk

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into `.env.local`
3. In the Clerk dashboard, go to **JWT Templates → New template → Convex**
4. Copy the **Issuer URL** from the template
5. In `neumart/convex/auth.config.ts`, set `domain` to that issuer URL

### 4. Start the frontend

```bash
# from the monorepo root
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Running Commands

All commands run from inside the `neumart/` directory unless noted.

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `npx convex dev` | Start Convex backend (watches `convex/`) |
| `npx convex codegen` | Regenerate `convex/_generated/` types |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm build` | Production build |

> From the **monorepo root**, `pnpm dev` runs Next.js and `pnpm backend` runs Convex dev.

---

## Bootstrapping the First Admin

Admin access is role-based via the Convex `users` table. There is no admin UI for role management — the first admin is bootstrapped manually.

1. Sign up / sign in as the user you want to make admin
2. Open the [Convex dashboard](https://dashboard.convex.dev) for your project
3. Go to **Functions → users → bootstrapAdmin** and run it (no args required)
4. The signed-in user is now admin

Only one admin can be bootstrapped this way. Subsequent admins must be granted the role manually in the Convex data browser by setting `role: "admin"` on the user record.

The admin dashboard is at `/admin`.

---

## Seeding Development Data

A seed mutation is included for local development. It inserts 8 categories and 36 products.

**Requirements:** you must be a bootstrapped admin before running the seed.

**Run:**

```bash
npx convex run seed:seedDevelopmentData
```

The seed is **idempotent** — if categories already exist it skips without making changes.

> **Development only.** Do not run in production unless you intend to populate a clean environment.

---

## Payment Status

Razorpay integration is **not yet active**. The schema and payment table are in place for future integration.

Current order mode: `pay_later` — orders are placed without payment. Payment status is set to `pending` and must be updated manually.

---

## Current Order Mode

- Customers place orders via **Pay Later / Pay on Delivery**
- No payment gateway is wired in this version
- Admins update order status manually from `/admin/orders`
- Stock is deducted at order placement and audited in `stockMovements`

---

## Admin Role Check

Admin routes (`/admin/*`) are protected at two levels:

1. **Next.js layout** — reads `publicMetadata.role` from Clerk and redirects non-admins to `/`
2. **Convex functions** — `assertAdmin(ctx)` checks the `users` table role field on every admin query/mutation

Both checks must pass for admin access.

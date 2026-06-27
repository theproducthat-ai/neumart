# Environment Policy — Nuemart

Rules for managing environment variables, secrets, and environment-specific configuration.

---

## Environment Files

| File | Committed | Purpose |
|------|-----------|---------|
| `.env.local` | No (gitignored) | Local development secrets |
| `.env.example` | Yes | Documents required env vars with placeholder values |
| Vercel dashboard | N/A | Production and preview environment variables |
| Convex dashboard | N/A | Convex-side environment variables |

Never commit `.env.local` or any file containing real secrets.

## Variable Naming

| Prefix | Exposed To | Use For |
|--------|-----------|---------|
| `NEXT_PUBLIC_` | Client + Server | Public config: Clerk publishable key, Convex URL |
| (no prefix) | Server only | Secret keys: Clerk secret key, Razorpay secret |

## Rules

- Never access `process.env` in a Client Component (`"use client"` files). Only `NEXT_PUBLIC_` vars are safe on the client.
- Convex environment variables are accessed in Convex functions via `process.env` (server-side only).
- Any new required environment variable must be added to `.env.example` with a descriptive comment.
- Rotate secrets immediately if:
  - A secret is accidentally committed to git.
  - A secret appears in a log.
  - A team member with access leaves.

## Required Variables (Current)

### Next.js / Vercel
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CLERK_WEBHOOK_SECRET=whsec_...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
```

### Convex
```
CLERK_JWT_ISSUER_DOMAIN=https://...clerk.accounts.dev
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

## Environments

| Environment | Where | When |
|-------------|-------|------|
| Local dev | `.env.local` + Convex dev deployment | Daily development |
| Preview | Vercel preview + Convex dev deployment | PR review |
| Production | Vercel prod + Convex prod deployment | Live |

Never point a local dev environment at the production Convex deployment.

---

## Related
- `SECURITY_GUARDRAILS.md`
- `API_AND_INTEGRATION_GUARDRAILS.md`
- `DEPLOYMENT_GUARDRAILS.md`

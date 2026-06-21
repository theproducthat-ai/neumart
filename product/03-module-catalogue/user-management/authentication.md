# Sub-module: Authentication

**Module:** User Management  
**Screens:** SCR-AUTH-0001 (`/sign-in`), SCR-AUTH-0002 (`/sign-up`)  
**Status:** Built

---

## Purpose

Provides secure sign-in and sign-up for all Nuemart users (customers and admins) via Clerk. Session management and route protection are handled by Clerk's Next.js middleware.

---

## Provider: Clerk v7

All authentication is delegated to Clerk. Nuemart does not store passwords or handle session tokens directly.

---

## Features Built

### Sign In (`/sign-in/[[...sign-in]]`)

- Clerk-managed sign-in UI — supports email/password, social login (if configured in Clerk Dashboard).
- Clerk catch-all route handles all Clerk's internal sub-paths (e.g. `sign-in/factor-one`).

### Sign Up (`/sign-up/[[...sign-up]]`)

- Clerk-managed sign-up UI.
- New users are created in Clerk on sign-up.
- A Convex `users` record is synced via a Clerk webhook or Convex action on first authenticated request.

### Session Management

- Clerk manages session tokens, refresh, and expiry.
- `ConvexProviderWithClerk` wraps the Next.js app to pass the Clerk session token to Convex.
- Convex functions receive the authenticated `userId` (Clerk ID) from the session.

### Route Protection (Middleware)

- Clerk Next.js middleware protects all routes except:
  - `/sign-in` and `/sign-up` (public)
  - Static assets and API routes (as configured)
- Unauthenticated requests to protected routes are redirected to `/sign-in`.

### Admin Route Guard

- Admin routes (`/admin/*`) have an additional server-side check in the admin layout:
  - Calls `auth()` from Clerk.
  - Checks `publicMetadata.role === "admin"`.
  - Non-admin users are redirected (not shown a 403 in the UI).

---

## Convex Integration

- `ConvexProviderWithClerk` in `app/ConvexProviderWithClerk.tsx` bridges Clerk authentication with Convex.
- Convex queries and mutations receive `ctx.auth.getUserIdentity()` to identify the authenticated user.
- A Convex `users` record is created or retrieved using the Clerk `subject` (Clerk user ID) as `clerkId`.

---

## Future Candidates

- **Social login** (Google, Apple) — can be enabled in Clerk Dashboard without code changes
- **Phone number sign-in** — relevant for India; can be configured in Clerk
- **Multi-factor authentication** — configurable in Clerk
- **Organisation-based roles** — Clerk Organisations for more complex multi-role scenarios

---

*Last updated: 2026-06-21*

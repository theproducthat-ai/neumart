# Auth Guardrails — Nuemart

Rules for authentication and authorisation using Clerk and Convex.

---

## Identity Source

Clerk is the only identity provider. Never implement a separate auth system.

- Clerk handles: sign-up, sign-in, MFA, session management, social login, email verification.
- Convex receives Clerk JWT tokens and validates them via the configured Clerk integration.
- The Convex user record (`users` table) is created/synced via Clerk webhook on `user.created`.

## Session Rules

- Use `auth()` from `@clerk/nextjs/server` in Server Components and route handlers.
- Use `useAuth()` and `useUser()` from `@clerk/nextjs` in Client Components.
- Use `ctx.auth.getUserIdentity()` in Convex functions.
- Never store session tokens in localStorage or cookie manually — Clerk manages sessions.
- Never pass the raw Clerk JWT to the client side from a server component.

## Authorisation Checks

- All routes that require authentication must be wrapped in Clerk middleware or `auth()` checks.
- Role-based access control uses Clerk `publicMetadata.role` or session claims.
- Convex mutations that modify user-owned data must verify `ctx.auth.getUserIdentity()` and check that the acting user owns the resource.
- Admin routes must check `role === "admin"` on both the Next.js route level (middleware) and the Convex function level. Do not rely on UI hiding alone.

## Webhook Security

- Clerk webhooks (`/api/webhooks/clerk`) must validate the `svix-signature` header before processing.
- Razorpay webhooks must validate the HMAC signature before processing.
- Return `400` for invalid signatures. Never process unsigned webhook payloads.

## Sensitive Operations

All of the following require a confirmed authenticated session and role check:
- Viewing or editing another user's profile.
- Placing or cancelling an order.
- Admin operations (product management, order management, user management).
- Payment initiation or refund.

## Prohibited Patterns

- Do not pass user IDs from the client to mutations without server-side verification.
- Do not check auth only on the frontend. The Convex function must also check.
- Do not expose admin endpoints without role checks.
- Do not cache auth state in Zustand and trust it as authoritative — re-verify with Clerk on sensitive operations.

## Session Expiry

- Clerk handles token refresh automatically. Do not manually manage token expiry.
- On auth failure in a Convex call, surface a re-login prompt via Clerk's `<SignIn>` component.

---

## Related
- `SECURITY_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`
- `API_AND_INTEGRATION_GUARDRAILS.md`

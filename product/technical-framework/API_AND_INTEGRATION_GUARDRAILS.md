# API and Integration Guardrails — Nuemart

Rules for calling external APIs, building internal API routes, and integrating third-party services.

---

## Internal API Routes (`/api/*`)

- Route handlers in `app/api/` are for **webhooks only**: Clerk, Razorpay.
- Do not build custom REST or GraphQL APIs here. Use Convex functions instead.
- All route handlers must return typed responses.
- Validate request method, headers, and signature before processing any webhook.

## External API Calls

- All external API calls (Razorpay, email, SMS, etc.) must be made from **Convex actions**, not from Next.js server components or route handlers. Reasons: retry logic, observability, consistent error handling.
- Never call external APIs from Convex queries or mutations (network I/O is not allowed).
- All external calls must have a timeout. Never let a third-party call block indefinitely.
- Log request/response metadata (not full payloads) for observability.

## Razorpay Integration

- Order creation: Convex action → Razorpay API.
- Payment verification: Convex httpAction webhook → validate HMAC → update order.
- Never expose Razorpay secret key outside Convex actions.
- Store only Razorpay `orderId`, `paymentId`, `status` in Convex. No raw card data.

## Error Handling for External APIs

- Wrap all external calls in try/catch.
- On failure: log error with request context, surface user-friendly message via `ConvexError`.
- Do not retry external calls blindly. Use exponential backoff for transient failures.
- Do not surface 3rd-party error messages directly to users.

## API Contracts

- Any integration with a new external API must have an `API_CONTRACT` object in `product/objects/api-contracts/`.
- Breaking changes to internal data shapes must be tracked as scope changes.

## Rate Limiting

- Respect rate limits of all external APIs. Convex scheduled functions should not hammer external APIs.
- Implement token bucket or queue patterns for high-volume integration triggers.

## Secret Management

- All API keys in environment variables. See `ENVIRONMENT_POLICY.md`.
- No API key in client-side code (no `NEXT_PUBLIC_` prefix for secrets).
- Rotate keys after any suspected exposure.

---

## Related
- `BACKEND_GUARDRAILS.md`
- `SECURITY_GUARDRAILS.md`
- `ENVIRONMENT_POLICY.md`
- `product/objects/api-contracts/_README.md`

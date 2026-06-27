# Observability Guardrails — Nuemart

Rules for logging, monitoring, alerting, and tracing so that production issues are discoverable.

---

## Logging

- Log at the boundaries: request received, external API called, external API responded, error thrown.
- Do not log PII (names, emails, phone, addresses) in plaintext.
- Do not log full request/response bodies — log IDs and status codes.
- Use `console.error` for errors, `console.warn` for degraded-but-recoverable states, `console.log` for significant events only.
- All Convex action errors are captured in the Convex dashboard automatically.

## What to Log

| Event | Log Level | Include |
|-------|-----------|---------|
| Convex action error | error | function name, error message, relevant IDs |
| External API failure | error | service name, status code, request reference |
| Payment webhook received | log | event type, order ID, payment ID |
| Auth webhook received | log | event type, Clerk user ID |
| Unexpected null/undefined | warn | function name, field name |
| Successful payment | log | order ID, amount (not card details) |

## Monitoring Tools

| Concern | Tool |
|---------|------|
| Core Web Vitals | Vercel Analytics |
| Convex function health | Convex Dashboard |
| Error rate | Convex Dashboard + future error tracking |
| Uptime | Vercel |

## Alerting

- Any error rate spike in Convex mutations/actions warrants immediate investigation.
- Payment webhook failures must be investigated within 1 business hour.
- Any auth-related error spike warrants security review.

## Tracing (Future)

- When error tracking tooling is added (e.g., Sentry), all errors must be enriched with:
  - User ID (not name/email).
  - Affected route or Convex function.
  - Error classification (expected business error vs. unexpected).

## No Silent Failures

- All Convex mutations called from the frontend must have error handling that surfaces feedback to the user (Sonner toast minimum).
- `useQuery` loading/error states must always be handled in the component.
- Webhooks that fail must return a non-200 status so the provider can retry.

---

## Related
- `PERFORMANCE_GUARDRAILS.md`
- `COST_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`

# Security Guardrails — Nuemart

Minimum security requirements. These are not optional.

---

## Authentication and Authorisation

- All non-public routes require Clerk authentication.
- All admin routes require role verification on both Next.js middleware and Convex function layers.
- Never trust client-supplied user IDs or roles without server-side verification.
- See `AUTH_GUARDRAILS.md` for full auth rules.

## Input Validation

- Validate all user input at system boundaries.
- All Convex function arguments use Convex validators (`v.string()`, `v.number()`, etc.).
- All form submissions validated with Zod schemas.
- Never pass unvalidated user input directly to a database query or external API call.

## Injection Prevention

- Convex's typed query system prevents SQL injection by design. Do not use raw query strings.
- Never use `eval()` or `new Function()`.
- All user-generated content rendered in React is auto-escaped. Never use `dangerouslySetInnerHTML` unless explicitly sanitising the content first.

## Secrets Management

- Never commit secrets, API keys, or credentials to the repository.
- Development secrets: `.env.local` (gitignored).
- Production secrets: Vercel environment variables + Convex environment variables.
- See `ENVIRONMENT_POLICY.md`.

## Data Privacy

- Do not log PII (names, emails, phone numbers, addresses) in plaintext to console or logging services.
- Do not expose internal database IDs in URLs or public API responses unless necessary.
- User data access must be scoped to the authenticated user (Clerk identity check in Convex).
- Admin access to user data must be logged.

## Transport Security

- All traffic over HTTPS. Vercel enforces this; do not disable.
- Webhook endpoints validate signatures. See `API_AND_INTEGRATION_GUARDRAILS.md`.

## Dependency Security

- Run `pnpm audit` as part of CI or quarterly manual checks.
- Do not use deprecated or unmaintained packages for security-sensitive operations.
- See `DEPENDENCY_POLICY.md`.

## Frontend Security

- `Content-Security-Policy` headers configured in `next.config.ts`.
- `X-Frame-Options: DENY` to prevent clickjacking.
- No inline scripts in production HTML.

## Incident Response

- Any suspected security incident → immediately notify product/engineering owner.
- Do not patch quietly. Create an incident object and document the response.
- Rotate affected secrets immediately on confirmed exposure.

---

## Prohibited Patterns

- Storing passwords (use Clerk).
- Storing payment card details (use Razorpay tokenisation).
- Client-side-only auth checks for protected data.
- Hardcoded credentials in any file.
- `console.log` of request bodies containing user data in production.

---

## Related
- `AUTH_GUARDRAILS.md`
- `API_AND_INTEGRATION_GUARDRAILS.md`
- `ENVIRONMENT_POLICY.md`
- `DEPENDENCY_POLICY.md`

# API Contract Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## When API Contracts Are Required

An API contract (`objects/api-contracts/API-XXXX.md`) is required whenever:
- A new API endpoint is added
- An existing endpoint changes its request/response schema
- An existing endpoint changes its authentication requirements
- A third-party integration requires documented API terms
- Frontend and backend teams need to work in parallel on a feature

---

## API Contract Must Be Agreed Before Implementation

The contract should be agreed between:
- Engineering Lead (backend / architecture)
- Frontend engineer (consumer)
- Product Manager (for product implications)

No frontend or backend work should begin on an endpoint before the contract is agreed.

---

## API Contract Contents

Every contract must include:
1. HTTP method and path
2. Authentication requirements
3. Request parameter definitions (path, query, body)
4. Response schema (success and all error cases)
5. HTTP status codes used and their meanings
6. Rate limiting (if applicable)
7. Version number

---

## API Versioning

- New APIs start at `v1`
- Breaking changes require a new version (e.g., `/api/v2/orders`)
- Non-breaking additions (new optional fields) do not require a version bump
- Old API versions must be deprecated with a 3-month notice before removal

---

## Internal vs. External APIs

| Type | Audience | Contract Required? | Notes |
|---|---|---|---|
| Client-to-server | Frontend ↔ Backend | Yes | Always required |
| Server-to-server | Backend ↔ Backend | Yes | Always required |
| Third-party outbound | Backend → External | Yes | Document the external API consumed |
| Third-party inbound (webhook) | External → Backend | Yes | Document expected payload |
| Internal utility | Backend only | Optional | If complex, document it |

---

## API Error Handling Standards

All APIs must return:
- Consistent error format: `{ code: string, message: string, details?: object }`
- Meaningful HTTP status codes (not all 200 or all 500)
- User-facing messages (for client errors) that can be displayed in the UI

Standard error codes:
- `VALIDATION_ERROR` — invalid input
- `NOT_FOUND` — resource not found  
- `UNAUTHORIZED` — not authenticated
- `FORBIDDEN` — authenticated but not permitted
- `INTERNAL_ERROR` — unexpected server error

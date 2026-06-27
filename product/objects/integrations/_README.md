# Integrations

**Object type**: `integration`  
**Owner**: Engineering Lead  
**Note**: Integration registry — third-party services, APIs, and external systems the product integrates with.

## Current Integrations (Neumart)

- Razorpay (payments)
- Firebase (auth/notifications)
- Convex (database/backend)

## When to Create

- A new third-party integration is built
- An existing integration changes significantly
- An integration has a dependency tracked in `dependencies/`

## Format

`INT-[NAME].md` with fields:
`id`, `name`, `provider`, `type`, `status`, `api_docs_url`, `credentials_location`, `owner`, `sla`, `dependencies`

Types: `payment` | `auth` | `notification` | `analytics` | `logistics` | `communication` | `data` | `other`

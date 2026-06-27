# APIs

**Object type**: `api`  
**Owner**: Engineering Lead  
**Note**: API registry — a catalogue of the product's APIs (public and internal). For detailed API contracts, use `api-contracts/`. This folder stores the high-level API registry.

## Relationship to api-contracts/

`apis/` — registry of all API endpoints (name, route, version)  
`api-contracts/` — detailed contract objects for each significant API (request/response schema, auth)

## When to Create

- A new API is added
- An existing API is versioned or deprecated

## Format

`API-[MODULE]-[RESOURCE].md` or a single `API_REGISTRY.md` listing all endpoints with fields:
`route`, `method`, `description`, `version`, `auth_required`, `status`, `contract_ref`

## Standard Internal API Areas

- `/api/products` — product catalogue
- `/api/orders` — order management
- `/api/cart` — cart operations
- `/api/auth` — authentication
- `/api/payments` — payment processing
- `/api/delivery` — delivery management

# API Contracts

**Object type**: `api-contract`  
**ID prefix**: `API-`  
**ID format**: `API-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/API_CONTRACT_OBJECT_TEMPLATE.md`

## What Belongs Here

API contract objects — formal definitions of API endpoints, request/response schemas, auth requirements, and versioning. Used to align frontend, backend, and third-party integrations before implementation.

## When to Create

- A new API endpoint is added
- An existing API endpoint is changed in a breaking or significant way
- A third-party integration requires API negotiation
- Frontend and backend need to agree on a contract before parallel development

## Required Relationships

- **Parent**: `technical-designs/`, `features/`
- **Implements**: `prds/` requirements
- **Used by**: engineering during implementation

## Lifecycle / Statuses

`draft` → `agreed` → `implemented` → `deprecated` | `versioned`

## Required Fields

`id`, `title`, `status`, `endpoint`, `method`, `request_schema`, `response_schema`, `auth_required`, `error_codes`, `version`, `owner`, `created_date`

## Example IDs

- `API-0001` — First API contract
- `API-0002` — Second API contract

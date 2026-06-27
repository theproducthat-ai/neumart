# Client Requests

**Object type**: `client-request`  
**ID prefix**: `CR-`  
**ID format**: `CR-NNNN`  
**Owner**: Product Lead  
**Template**: `product/os/templates/CLIENT_REQUEST_OBJECT_TEMPLATE.md`

## What Belongs Here

Product requests received directly from clients (post-signing). These differ from sales requests (pre-deal) in that the client relationship already exists. Client requests may be contractual obligations or optional enhancement asks.

## When to Create

- An existing client requests a product change via support, email, or review session
- A client flags a missing feature during onboarding
- A client's contractual requirement needs product fulfilment
- A client provides product feedback that is actionable

## Required Relationships

- **Client**: `stakeholders/` (the requesting client)
- **May lead to**: `requests/` → `features/`
- **May create**: `client-commitments/` (if a promise is made)

## Lifecycle / Statuses

`received` → `reviewed` → `approved` | `rejected` | `deferred` | `converted-to-request`

## Required Fields

`id`, `title`, `status`, `client_ref`, `request_description`, `urgency`, `contractual`, `business_impact`, `submitted_by`, `owner`, `created_date`

## Example IDs

- `CR-0001` — First client request
- `CR-0002` — Second client request

## Owner Roles

| Action | Role |
|---|---|
| Records | Product Manager / Support Lead |
| Reviews | Product Lead |
| Responds to client | Product Lead / Business team |
| Converts to request | Product Manager |

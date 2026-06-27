# Sales Requests

**Object type**: `sales-request`  
**ID prefix**: `SR-`  
**ID format**: `SR-NNNN`  
**Owner**: Product Lead  
**Template**: `product/os/templates/SALES_REQUEST_OBJECT_TEMPLATE.md`

## What Belongs Here

Product requests originating from the sales team — features, capabilities, or changes that are needed to close a deal or retain a customer. Sales requests often have a commercial urgency that must be weighed against engineering capacity.

## When to Create

- Sales team identifies a deal-blocking product gap
- A prospect requires a specific feature before signing
- A renewal is at risk due to a missing capability
- A competitive gap is being cited in sales conversations

## Required Relationships

- **May lead to**: `requests/` (if the ask is approved)
- **May lead to**: `client-commitments/` (if a promise is made)
- **Linked to**: `stakeholders/` (the deal/client)

## Lifecycle / Statuses

`submitted` → `reviewed` → `approved` | `rejected` | `deferred` | `converted-to-request`

## Required Fields

`id`, `title`, `status`, `deal_name`, `deal_value`, `urgency`, `feature_requested`, `business_justification`, `submitted_by`, `owner`, `created_date`

## Example IDs

- `SR-0001` — First sales request
- `SR-0002` — Second sales request

## Owner Roles

| Action | Role |
|---|---|
| Submits | Sales Lead / Business Lead |
| Reviews | Product Lead |
| Approves | Product Lead + Engineering Lead |
| Converts to Request | Product Manager |

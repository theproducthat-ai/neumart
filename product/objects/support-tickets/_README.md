# Support Tickets

**Object type**: `support-ticket`  
**ID prefix**: `ST-`  
**ID format**: `ST-NNNN`  
**Owner**: Support Lead  
**Template**: `product/os/templates/SUPPORT_TICKET_OBJECT_TEMPLATE.md`

## What Belongs Here

Support ticket records that surface product issues, bugs, or gaps. Not every support ticket needs to be logged here — only those that reveal:
- A recurring pattern (same issue multiple customers)
- A product bug or gap that needs engineering attention
- A client-impacting issue requiring escalation
- A feature request from a support channel

## When to Create

- A support ticket reveals a product defect
- Multiple customers report the same issue
- A support ticket is being escalated to product/engineering
- A client complaint surfaces a missing capability

## Required Relationships

- **May lead to**: `bugs/`, `requests/`, `escalations/`
- **Relates to**: `features/` (affected feature)
- **Source for**: `feedback/`

## Lifecycle / Statuses

`open` → `in-progress` → `resolved` | `escalated` | `closed-no-action`

## Required Fields

`id`, `title`, `status`, `customer`, `issue_description`, `frequency`, `product_impact`, `assigned_to`, `resolution`, `created_date`

## Example IDs

- `ST-0001` — First support ticket record
- `ST-0002` — Second ticket

## Owner Roles

| Action | Role |
|---|---|
| Creates | Support Lead |
| Resolves or escalates | Support Lead |
| Receives escalation | Product Manager |

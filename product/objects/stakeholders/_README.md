# Stakeholders

**Object type**: `stakeholder`  
**ID prefix**: `STK-`  
**ID format**: `STK-NNNN`  
**Owner**: Product Lead  
**Template**: `product/os/templates/STAKEHOLDER_OBJECT_TEMPLATE.md`

## What Belongs Here

Stakeholder registry — records of individuals and organisations who influence, fund, or are impacted by product decisions. Used for RACI assignment, communication planning, and client management.

## When to Create

- When a new business stakeholder, client, partner, or key user is identified
- When onboarding a new team member who owns product decisions
- When a new client is signed whose requirements need tracking

## Required Relationships

- **Linked to**: `client-commitments/` (if client)
- **Appears in**: `approvals/` (if they are an approver)
- **RACI context**: `team-operating-model/STAKEHOLDER_REGISTER.md`

## Lifecycle / Statuses

`active` → `inactive` | `archived`

## Required Fields

`id`, `name`, `role`, `organisation`, `stakeholder_type`, `contact`, `influence_level`, `interest_level`, `owner`, `created_date`

## Stakeholder Types

- `client` — paying customer or client organisation
- `internal-business` — internal business owner or department head
- `leadership` — executive, investor, board member
- `partner` — third-party vendor or integration partner
- `user-representative` — representative end-user or user research participant
- `regulatory` — regulator or compliance authority

## Example IDs

- `STK-0001` — First stakeholder
- `STK-0002` — Second stakeholder

## Owner Roles

| Action | Role |
|---|---|
| Creates and maintains | Product Lead |
| Engages | Product Manager, Business team |
| Reviews at | Stakeholder review cadence |

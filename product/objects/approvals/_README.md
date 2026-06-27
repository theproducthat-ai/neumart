# Approvals

**Object type**: `approval`  
**ID prefix**: `APR-`  
**ID format**: `APR-NNNN`  
**Owner**: Product Lead  
**Template**: `product/os/templates/APPROVAL_OBJECT_TEMPLATE.md`

## What Belongs Here

Formal approval records — used when a significant decision, artifact, or release requires sign-off from one or more stakeholders. Provides an audit trail of who approved what and when.

Used for:
- PRD approvals
- Release go/no-go decisions
- Budget approvals for major initiatives
- Client delivery sign-offs
- Design approvals

## When to Create

- Any approval gate defined in `team-operating-model/APPROVAL_AUTHORITY_MATRIX.md` is triggered
- A release requires formal go/no-go
- A client needs to sign off on a deliverable

## Required Relationships

- **Approves**: `releases/`, `prds/`, `business-cases/`, `client-commitments/`
- **Authorities**: `team-operating-model/APPROVAL_AUTHORITY_MATRIX.md`

## Lifecycle / Statuses

`pending` → `approved` | `rejected` | `conditional-approval` | `expired`

## Required Fields

`id`, `title`, `status`, `object_ref`, `required_approvers`, `approval_deadline`, `decision`, `approved_by`, `created_date`

## Example IDs

- `APR-0001` — First approval record
- `APR-0002` — Second approval

## Owner Roles

| Action | Role |
|---|---|
| Requests approval | Product Manager |
| Approves | Per `APPROVAL_AUTHORITY_MATRIX.md` |
| Records decision | Product Manager |

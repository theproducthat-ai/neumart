# Business Cases

**Object type**: `business-case`  
**ID prefix**: `BC-`  
**ID format**: `BC-NNNN`  
**Owner**: Product Lead / Business Stakeholder  
**Template**: `product/os/templates/BUSINESS_CASE_OBJECT_TEMPLATE.md`

## What Belongs Here

Business case documents for significant investments — used when a strategic initiative, major feature, or large spend requires justification with financial and strategic rationale.

## When to Create

- A Strategic Initiative requires executive or investor sign-off
- A new product module is proposed
- Significant engineering effort (>3 sprints) needs prioritization justification
- A client deal requires product investment commitments

## Required Relationships

- **Leads to**: `requests/` → `features/` (if approved)
- **Links to**: `okrs/`, `initiatives/`
- **Approved by**: Leadership, Finance

## Lifecycle / Statuses

`draft` → `in-review` → `approved` | `rejected` | `deferred`

## Required Fields

`id`, `title`, `status`, `problem`, `opportunity`, `investment_required`, `expected_return`, `strategic_alignment`, `risk`, `recommendation`, `owner`, `created_date`

## Example IDs

- `BC-0001` — First business case
- `BC-0002` — Second business case

## Owner Roles

| Action | Role |
|---|---|
| Writes | Product Lead / Business Stakeholder |
| Reviews | Product Lead, Finance, Engineering Lead |
| Approves | CEO / Leadership |

# Risks

**Object type**: `risk`  
**ID prefix**: `RISK-`  
**ID format**: `RISK-NNNN`  
**Owner**: Product Manager or Engineering Lead  
**Template**: `product/os/templates/RISK_OBJECT_TEMPLATE.md`

## What Belongs Here

Identified risks to product delivery, quality, or business outcomes. A risk is a potential future problem — distinct from a bug (current defect) or incident (active problem).

Types of risks tracked here:
- Delivery risks (timeline, resource, dependency)
- Technical risks (architecture, performance, security)
- Business risks (revenue impact, client commitment at risk)
- Operational risks (support readiness, ops capacity)
- Compliance risks (regulatory, legal)

## When to Create

- During PRD review or technical design review
- When a dependency on a third party is identified
- When a launch date is at risk
- When a security or compliance concern is raised
- During post-release review when systemic risks are identified

## Required Relationships

- **Affects**: `features/`, `releases/`, `client-commitments/`
- **May trigger**: `decisions/` (mitigation approach)
- **May trigger**: `escalations/` (if unmitigated risk is high)

## Lifecycle / Statuses

`identified` → `assessed` → `mitigated` → `accepted` | `escalated` | `closed`

## Required Fields

`id`, `title`, `status`, `probability`, `impact`, `risk_score`, `mitigation_plan`, `owner`, `due_date`, `created_date`

## Risk Scoring

`risk_score = probability (1-5) × impact (1-5)`  
- 1-5: Low | 6-10: Medium | 11-19: High | 20-25: Critical

## Example IDs

- `RISK-0001` — First risk
- `RISK-0002` — Second risk

## Owner Roles

| Action | Role |
|---|---|
| Identifies | Any team member |
| Assesses | Product Lead + Engineering Lead |
| Mitigates | Assigned owner |
| Escalates | Product Lead |
| Closes | Product Lead |

# Priority Scores

**Object type**: `priority-score`  
**ID prefix**: `PSCORE-`  
**ID format**: `PSCORE-[REQ-ID]` (e.g., PSCORE-REQ-0009)  
**Owner**: Product Lead  
**Template**: `product/os/templates/PRIORITY_SCORE_OBJECT_TEMPLATE.md`

## What Belongs Here

Priority score objects — structured scoring records for features or requests using the multi-factor prioritization model. Scores support objective prioritization decisions.

## When to Create

- During backlog grooming
- During roadmap planning
- When a request is being assessed for prioritization

## Required Relationships

- **Scores**: `features/`, `requests/`
- **Model**: `portfolio/PRIORITIZATION_MODEL.md`

## Lifecycle / Statuses

`draft` → `approved` | `superseded`

## Scoring Factors

| Factor | Scale |
|---|---|
| Business value | 1-5 |
| Customer value | 1-5 |
| Revenue impact | 1-5 |
| Strategic alignment | 1-5 |
| Client commitment | 1-5 |
| Risk reduction | 1-5 |
| Engineering effort | 1-5 (inverse) |
| Urgency | 1-5 |
| **Total** | Max 40 |

## Required Fields

`id`, `request_ref`, `business_value`, `customer_value`, `revenue_impact`, `strategic_alignment`, `engineering_effort`, `urgency`, `total_score`, `scored_by`, `created_date`

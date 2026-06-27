# Feedback

**Object type**: `feedback`  
**ID prefix**: `FB-`  
**ID format**: `FB-NNNN`  
**Owner**: Product Manager  
**Template**: `product/os/templates/FEEDBACK_OBJECT_TEMPLATE.md`

## What Belongs Here

Structured records of user, client, or stakeholder feedback about the product — including post-release feedback, survey results, user interviews, and NPS responses. Feedback is distinct from requests (which are actionable asks) — feedback is raw signal that may or may not lead to a request.

## When to Create

- Post-release review produces user feedback
- Support team collects recurring user pain points
- NPS or CSAT survey produces notable responses
- User interview generates insights
- Client provides product feedback during a review meeting

## Required Relationships

- **May lead to**: `requests/` (if feedback surfaces a need)
- **Relates to**: `features/` (what was being used when feedback was given)
- **Informs**: `analytics/` metrics and dashboards

## Lifecycle / Statuses

`collected` → `reviewed` → `actioned` | `noted` | `archived`

## Required Fields

`id`, `title`, `status`, `source`, `source_type`, `sentiment`, `theme`, `raw_feedback`, `feature_ref`, `owner`, `created_date`

## Example IDs

- `FB-0001` — First feedback record
- `FB-0002` — Second feedback

## Owner Roles

| Action | Role |
|---|---|
| Collects | Support Lead, Product Manager |
| Reviews and themes | Product Manager |
| Actions | Product Manager → new Request if needed |

# Discovery Evidence

**Object type**: `discovery-evidence`
**ID format**: `EVD-NNN` (e.g., `EVD-0001.md`)
**Owner**: Product Manager / UX Researcher
**Template**: `product/os/templates/DISCOVERY_EVIDENCE_TEMPLATE.md`

## What Belongs Here

**Discovery Evidence Objects** store structured evidence gathered during product discovery — not the session itself and not midstream notes. This folder is for the evidence artefacts: user interview findings, survey results, analytics data, usability test observations, support ticket patterns, and competitive insights.

Evidence objects substantiate product decisions. They are the "why we believe this" behind features, PRDs, and roadmap choices.

## Boundary With Related Folders

| Folder | Contains | Example |
|---|---|---|
| `discovery/` | **Session object** — a planned discovery session record | `DISC-REQ-0003-checkout-discovery.md` |
| `discovery-notes/` | **Midstream note** — an unplanned finding during delivery work | `DSN-0001.md` |
| `discovery-evidence/` (this folder) | **Research evidence** — structured evidence from user research, analytics, competitive analysis | `EVD-0001.md` |

## Evidence Types

| Type | Description | Example |
|---|---|---|
| `user-interview` | Findings from 1:1 user interviews | Pain points, jobs-to-be-done, mental models |
| `survey` | Results from structured surveys | NPS, feature preference scores, usage frequency |
| `analytics` | Data from product analytics | Drop-off rates, funnel conversion, session recordings |
| `usability-test` | Observations from usability testing | Task completion rates, confusion points |
| `support-tickets` | Patterns from support ticket analysis | Recurring issues, unmet expectations |
| `competitive` | Insights from competitor analysis | Feature gaps, positioning, pricing data |
| `field-research` | Contextual research observations | On-site visits, contextual inquiry findings |

## Required Fields

`id`, `evidence_type`, `source`, `collection_date`, `collector`, `summary`, `raw_data_link`, `linked_discovery`, `linked_prd`, `linked_roadmap_item`, `insight`

## Linked Objects

- Discovery sessions: `product/objects/discovery/`
- PRDs: `product/objects/prds/` (evidence that substantiates PRD decisions)
- Roadmap items: `product/objects/roadmap-items/`
- Research notes: `product/objects/research-notes/`

# Business Value Scoring Guide

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Practical guide for scoring business value when prioritising features. This supplements the main prioritization model (`PRIORITIZATION_MODEL.md`) with worked examples and scoring guidance.

---

## What Is Business Value?

Business value is the combination of:
1. **Revenue impact** — does this generate or protect revenue?
2. **Cost saving** — does this reduce operational cost?
3. **Strategic positioning** — does this differentiate us in the market?
4. **Risk mitigation** — does this reduce existential or operational risk?
5. **Customer retention** — does this keep existing customers?
6. **Customer acquisition** — does this help acquire new customers?

---

## Scoring Guide with Examples

### Score 5 — Critical Business Value
- Directly enables a new revenue stream
- Prevents imminent churn of a major client
- Required to close a deal worth >20% of ARR
- Addresses a P1 compliance risk with legal deadline
- **Example**: "Build the invoice generation feature that unblocks 5 enterprise clients from signing"

### Score 4 — High Business Value
- Feature needed to hit a quarterly OKR key result
- Reduces a significant operational cost (>£10k/month)
- Improves retention of a customer segment
- Closes competitive gap that is frequently cited in sales
- **Example**: "Add product search — 30% of drop-offs are on the product listing page"

### Score 3 — Moderate Business Value
- Useful improvement to existing business process
- Expected to improve a KPI by 5-15%
- Requested by multiple clients but not blocking any deal
- **Example**: "Add bulk order status update to admin console — ops team saves 2hrs/day"

### Score 2 — Low Business Value
- Nice to have improvement
- Expected to improve a KPI by <5%
- Requested once or twice, not a pattern
- **Example**: "Add dark mode to admin console"

### Score 1 — Negligible Business Value
- Cosmetic improvement with no measurable business impact
- Internal tool preference
- **Example**: "Change the font size of the dashboard header"

---

## Common Scoring Mistakes

| Mistake | Correction |
|---|---|
| Scoring high because a stakeholder is loud | Use evidence — data, frequency, revenue impact |
| Scoring low because it's engineering-initiated | Tech debt has real value — assess operational and risk cost |
| Conflating customer value with business value | Separate them — both matter but differently |
| Ignoring opportunity cost | A score 3 feature that displaces a score 5 feature is net negative |

---

## When to Document the Score

Always document a priority score in `objects/priority-scores/` when:
- A feature is being considered for the quarterly roadmap
- A request is being elevated from backlog to in-planning
- A stakeholder is pushing for a specific feature and needs an objective response

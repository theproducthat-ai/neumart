# Prioritization Model

**Version**: 2.0  
**Owner**: Product Lead

---

## Overview

The Neumart prioritization model uses a multi-factor weighted score to rank product requests and features. The model is designed to:
- Make prioritization decisions transparent and defensible
- Incorporate business, customer, commercial, and engineering perspectives
- Be usable by humans AND AI agents
- Produce a ranked backlog that aligns with OKRs

---

## Scoring Factors

Score each factor 1–5. Higher is better. Engineering effort is **inverse** (5 = small effort = good).

### Business Value (weight: 3x)
| Score | Meaning |
|---|---|
| 5 | Critical to a business goal — existential or major strategic value |
| 4 | Significant business impact — supports a key OKR |
| 3 | Moderate business value — useful but not critical |
| 2 | Low business value — nice to have |
| 1 | Minimal — hard to justify from a business perspective |

### Customer Value (weight: 2x)
| Score | Meaning |
|---|---|
| 5 | Major unmet need — many users blocked or frustrated |
| 4 | High value — many users will benefit significantly |
| 3 | Moderate value — useful for a subset of users |
| 2 | Low value — requested but not critical |
| 1 | Negligible user impact |

### Revenue Impact (weight: 3x)
| Score | Meaning |
|---|---|
| 5 | Directly enables new revenue or prevents revenue loss |
| 4 | Likely revenue uplift (>10%) if delivered |
| 3 | Moderate revenue correlation |
| 2 | Indirect revenue impact |
| 1 | No direct revenue link |

### Strategic Alignment (weight: 2x)
| Score | Meaning |
|---|---|
| 5 | Directly delivers on a current OKR key result |
| 4 | Supports a current initiative |
| 3 | Aligned with a business goal (not current OKR) |
| 2 | Loosely aligned |
| 1 | Not aligned with current strategy |

### Client Commitment / Urgency (weight: 2x)
| Score | Meaning |
|---|---|
| 5 | Hard commitment made — missed deadline = client loss |
| 4 | Strong expectation set — missing will damage relationship |
| 3 | Client asked for it — no formal commitment |
| 2 | Minor commercial signal |
| 1 | No client commitment |

### Risk Reduction (weight: 1x)
| Score | Meaning |
|---|---|
| 5 | Addresses a critical or high risk that is currently unmitigated |
| 4 | Reduces a significant known risk |
| 3 | Reduces a moderate risk |
| 2 | Low risk reduction |
| 1 | Negligible risk impact |

### Engineering Effort — Inverse (weight: 2x)
| Score | Meaning |
|---|---|
| 5 | Very small — < 1 sprint or < 5 story points |
| 4 | Small — 1-2 sprints |
| 3 | Medium — 2-4 sprints |
| 2 | Large — 4-8 sprints |
| 1 | Very large — > 8 sprints or high uncertainty |

### Urgency (weight: 1x)
| Score | Meaning |
|---|---|
| 5 | Must be done this sprint / compliance deadline |
| 4 | Must be done this quarter |
| 3 | Should be done this half-year |
| 2 | Flexible timing |
| 1 | No urgency |

---

## Weighted Score Calculation

```
Priority Score = 
  (Business Value × 3) +
  (Customer Value × 2) +
  (Revenue Impact × 3) +
  (Strategic Alignment × 2) +
  (Client Commitment × 2) +
  (Risk Reduction × 1) +
  (Engineering Effort × 2) +
  (Urgency × 1)

Maximum possible score: (5×3) + (5×2) + (5×3) + (5×2) + (5×2) + (5×1) + (5×2) + (5×1) = 80
```

### Score Bands

| Score | Priority |
|---|---|
| 65-80 | P0 — Critical, must ship this sprint |
| 50-64 | P1 — High, ship this quarter |
| 35-49 | P2 — Medium, plan for next quarter |
| 20-34 | P3 — Low, backlog |
| < 20 | P4 — Defer or reject |

---

## AI-Assisted Scoring

The AI can assist with scoring when given:
- The request description
- Source type and urgency
- Module and screen context
- OKR context from `portfolio/OKR_TREE.md`
- Client commitment status from `objects/client-commitments/`
- Risk context from `objects/risks/`

AI provides a scoring rationale per factor, confidence level, and recommended lane.  
Human (Product Lead) reviews and confirms the score.

---

## Overrides

The following always override the model score:

1. **Regulatory/compliance with deadline** → P0 regardless of score
2. **P1/P2 incident root cause fix** → P0 regardless of score
3. **Client commitment at risk** → Minimum P1

---

## Using Priority Scores

Create a `PSCORE-REQ-XXXX.md` object in `objects/priority-scores/` for any request going into roadmap planning.

Priority scores are reviewed at:
- Weekly product review (for incoming requests)
- Roadmap review (for quarterly planning)
- Sprint planning (for sprint commitment decisions)

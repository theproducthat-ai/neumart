# Nuemart Product OS — Product Evaluate Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-evaluate`

---

## Purpose
Evaluate an initiative, major feature, or request for prioritization. Score it across four dimensions — business value, implementation complexity, risk, and strategic fit — and produce a structured recommendation: Approve, Defer, Reject, or Needs More Info. This is the gate between discovery and formal product development.

---

## Triggered By
- User types `/product-evaluate <REQUEST-ID>` or `/product-evaluate <FEATURE-ID>`.
- Automatically recommended by `/product-request` when competing priorities exist.
- Automatically recommended by `/product-grill` for large-scope initiatives.
- Product owner requests a structured prioritization decision.

---

## Pre-conditions
- Request Object or Feature Object (Initiative-level) must exist.
- Grilling is preferred but not required. If grilling is incomplete, AI notes this as a confidence reducer on the evaluation.

---

## Inputs
- Object ID to evaluate (Request or Feature)
- Optional: business context, strategic goals, capacity constraints
- Optional: competing requests to rank against

---

## AI Reasoning Steps

1. **Load the target object.** Read the Request or Feature Object, all linked open questions, assumptions, and risk objects.

2. **Check grilling completeness.** Note whether a Discovery Session exists. If not, flag evaluation confidence as `Reduced` due to unresolved unknowns.

3. **Score Business Value (0–10).**
   - Revenue impact: does this unlock new revenue, protect existing revenue, or reduce churn?
   - User frequency: how many users are affected and how often?
   - Pain severity: how bad is the current experience without this?
   - Stakeholder priority: is this explicitly requested by a key stakeholder?
   - Strategic alignment: does this support current platform growth goals?

4. **Score Implementation Complexity (0–10, where 10 = most complex).**
   - Number of modules touched
   - Schema changes required
   - External integrations involved (Clerk, Convex, Razorpay)
   - New UI patterns vs existing patterns
   - Estimated developer-days (rough order of magnitude)

5. **Score Risk (0–10, where 10 = highest risk).**
   - Blocking flags detected in Request Object
   - Number of unresolved open questions
   - Regression surface area
   - Deployment complexity
   - Reversibility of changes

6. **Score Strategic Fit (0–10).**
   - Alignment with current phase/roadmap
   - Dependencies on other work in flight
   - Platform-building vs one-off feature
   - Competitive or market urgency

7. **Calculate Priority Score.**
   - Formula: `((Business Value × 2) + Strategic Fit − Complexity − Risk) / 4`
   - Normalize to 0–10 scale

8. **Identify capacity constraints.** If evaluation reveals this request requires skills, infrastructure, or integrations not currently available, create a Capacity Constraint Object.

9. **Form recommendation.** Based on priority score and qualitative factors:
   - Score ≥ 7.0 → Approve
   - Score 4.0–6.9 → Defer (with conditions)
   - Score < 4.0 → Reject (with rationale)
   - Confidence Reduced → Needs More Info

10. **Write the Evaluation Object.** Capture all scores, reasoning, and recommendation.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Evaluation Object | `product/objects/evaluations/` | Created |
| Priority Score Object | Embedded in Evaluation | Created |
| Capacity Constraint Object | `product/objects/constraints/` | Created (if identified) |
| Request Object | `product/objects/requests/` | Updated with evaluation status |

---

## Required Relationships Established

- `Evaluation → evaluates → Request Object` or `Feature Object`
- `Evaluation → produces → Priority Score`
- `Capacity Constraint → blocks → Evaluation` (if applicable)
- `Request Object → has_evaluation → Evaluation Object`

---

## Required Metadata Populated

On the Evaluation Object:
- `evaluation_id` — semantic ID
- `linked_object` — ID of evaluated object
- `business_value_score` — 0–10
- `complexity_score` — 0–10
- `risk_score` — 0–10
- `strategic_fit_score` — 0–10
- `priority_score` — calculated
- `recommendation` — Approve / Defer / Reject / Needs More Info
- `confidence` — High / Reduced
- `evaluator` — AI (with product owner review flag)

On the Request Object (updated):
- `evaluation_status` — Complete
- `priority_recommendation` — mirrored from Evaluation Object

---

## Definition of Done

- [ ] All four scoring dimensions assessed with reasoning
- [ ] Priority score calculated using defined formula
- [ ] Recommendation made with explicit rationale
- [ ] Capacity constraints identified (or explicitly noted as None)
- [ ] Evaluation Object written to `product/objects/evaluations/`
- [ ] Request Object updated with evaluation status and recommendation
- [ ] Next action stated

---

## Output Format

```
EVALUATION COMPLETE
===================
Evaluation ID:    [EVALUATION-...]
Evaluated Object: [REQUEST-... | FEATURE-...]
Title:            [title]
Confidence:       [High | Reduced — reason]

SCORING:
  Business Value:    [score]/10 — [1-line rationale]
  Complexity:        [score]/10 — [1-line rationale]
  Risk:              [score]/10 — [1-line rationale]
  Strategic Fit:     [score]/10 — [1-line rationale]

  PRIORITY SCORE:    [score]/10

CAPACITY CONSTRAINTS:
- [constraint description] (or: None identified)

RECOMMENDATION: [APPROVE | DEFER | REJECT | NEEDS MORE INFO]
Rationale: [2–3 sentence explanation of recommendation]

CONDITIONS (if Defer):
- [condition 1]
- [condition 2]

NEXT ACTION:
→ [/product-prd to proceed | /product-grill for more discovery | Defer to [date/event]]

File written: product/objects/evaluations/{slug}.md
```

---

## Next Action Recommendation

| Recommendation | Recommended Next Command |
|---|---|
| Approve | `/product-prd` |
| Approve (if grilling incomplete) | `/product-grill` then `/product-prd` |
| Defer | Record decision, set revisit trigger |
| Reject | Document rationale, close Request Object |
| Needs More Info | `/product-grill` to resolve gaps |

---

## Failure Conditions

- **Target object not found:** AI asks for correct ID.
- **Grilling not complete and scope is complex:** AI downgrades confidence to `Reduced` and proceeds with caveats.
- **Competing requests provided but insufficient context:** AI evaluates each independently and notes relative ranking is uncertain.
- **Capacity constraint prevents progress regardless of score:** AI surfaces as a blocker and halts with explicit statement of what is needed.

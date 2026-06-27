# Capacity Model

**Version**: 2.0  
**Owner**: Engineering Lead + Product Lead

---

## Purpose

Maps available team capacity to the roadmap. Prevents overcommitment and helps the team understand what is realistic in a given quarter or sprint.

---

## Capacity Definitions

### Story Points

| Team Member Type | Avg Points / Sprint | Notes |
|---|---|---|
| Full-time engineer | 8-12 | Depends on complexity |
| Part-time engineer | 4-6 | |
| Designer | Non-points | Tracked in days/tasks |
| QA | 4-6 | Includes test writing |

### Sprint Length
Default: **2 weeks**

### Buffer Rule
Always reserve **20% of capacity** for:
- Unplanned bugs
- Support escalations requiring engineering
- Tech debt opportunities
- Team learning / onboarding

---

## Capacity Formula

```
Available Capacity = (Team size × points per person per sprint) × 0.80 (20% buffer)

Example:
  3 engineers × 10 pts/sprint = 30 pts
  × 0.80 = 24 pts available for planned features
```

---

## Quarterly Capacity Planning

At the start of each quarter:

1. Count team members and account for any planned leave
2. Estimate total points for the quarter (sprints × capacity per sprint)
3. Apply theme allocation percentages from `portfolio/INVESTMENT_THEMES.md`
4. Assign features to capacity buckets
5. Identify any features that won't fit → defer to next quarter
6. Document in `objects/capacity-plans/CAP-FYXX-QX.md`

---

## Capacity Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Team member leaves or goes on leave | -30-50% capacity | Identify 2 weeks ahead, reduce scope |
| P1/P2 incidents in sprint | -1-3 days capacity | Always maintain 20% buffer |
| Unexpected tech complexity | -1-5 pts per story | Add uncertainty buffer to estimates |

---

## Capacity Review Triggers

Review and update capacity plan when:
- Team composition changes
- A P1/P2 incident displaces significant work
- A client commitment changes the priority of a feature
- Engineering estimates change significantly after technical design

---

## Current Capacity (update per quarter)

| Quarter | Total Pts | Available Pts | Allocated Pts | Remaining |
|---|---|---|---|---|
| Q3 FY2026 | | | | |

*Full details in `objects/capacity-plans/`*

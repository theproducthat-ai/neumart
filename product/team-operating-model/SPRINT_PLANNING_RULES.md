# Sprint Planning Rules

**Version**: 2.0  
**Owner**: Product Lead / Engineering Lead  
**Cadence**: Every 2 weeks (start of sprint), 2 hours

---

## Purpose

Sprint planning translates the prioritised backlog into a committed sprint. At the end of sprint planning, the team has a clear, achievable sprint goal and every engineer knows what they are building.

---

## Pre-Planning Checklist (Product Lead, by end of previous sprint)

- [ ] Backlog groomed — top stories are estimated and meet DoR
- [ ] Sprint goal drafted — one sentence summarising what the sprint achieves
- [ ] Stories prioritised — most important work is at the top
- [ ] Dependencies identified — any cross-team or external dependencies noted
- [ ] Capacity confirmed with Engineering Lead (leave vs. on-call accounted for)

---

## Definition of Ready at Planning

Before a story can enter a sprint:
- [ ] Acceptance criteria written and understood by Engineering
- [ ] Design attached (if required) and approved
- [ ] Dependencies resolved or explicitly accepted as a sprint risk
- [ ] Story estimated in points
- [ ] Engineering has no outstanding questions

If a story is not ready, it does not go into the sprint — it goes back to backlog.

---

## Sprint Capacity Rules

- Capacity = available engineer-days × average velocity
- Never plan to 100% capacity — leave 20% buffer for bugs, unplanned work, and review cycles
- Carry-over from previous sprint counts against capacity (don't plan as if it's free capacity)
- See `product/portfolio/CAPACITY_MODEL.md` for point definitions

---

## Sprint Goal

Every sprint must have a sprint goal — a single sentence stating the primary outcome:

Good: "Customers can complete a purchase using Razorpay by end of sprint"  
Bad: "Work on checkout and cart"

The sprint goal guides the team when trade-offs arise mid-sprint.

---

## During Sprint Planning

1. Engineering Lead confirms team capacity for the sprint
2. Product Lead presents the sprint goal and top-priority stories
3. Engineers confirm each story meets DoR — push back if not
4. Engineers self-assign (or Engineering Lead assigns) stories
5. Sum of points confirmed against capacity
6. Team agrees sprint goal
7. Product Lead and Engineering Lead sign off

---

## Mid-Sprint Changes

**What is allowed**:
- Product Lead can swap a story with another of equal size if a critical priority emerges (with Engineering Lead agreement)
- Bugs discovered mid-sprint can be added if within capacity buffer

**What is not allowed**:
- Adding large stories mid-sprint without removing equivalent scope
- Changing story acceptance criteria mid-sprint without engineering agreement
- External stakeholders adding scope directly to engineers without Product Lead approval

---

## Sprint Ceremonies Summary

| Ceremony | When | Duration | Owner |
|---|---|---|---|
| Sprint Planning | Day 1 | 2 hours | Product Lead |
| Daily Standup | Every day | 15 min | Engineering Lead |
| Sprint Review / Demo | Day 10 | 60 min | Engineering Lead |
| Sprint Retrospective | Day 10 | 60 min | Engineering Lead |

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- `product/engineering/DEFINITION_OF_READY.md`
- `product/portfolio/CAPACITY_MODEL.md`

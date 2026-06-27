# Design Review

**Version**: 2.0  
**Owner**: Product Lead / Designer  
**Cadence**: Weekly (Wednesday), 60 minutes

---

## Purpose

The design review is where design work in progress is reviewed, feedback given, and design decisions made before handoff to engineering. It ensures design quality, consistency, and feasibility are validated before implementation begins.

---

## Attendees

| Role | Attendance |
|---|---|
| Product Lead | Mandatory |
| Designer | Mandatory |
| Engineering Lead | Mandatory (for feasibility review) |
| QA Lead | Recommended (for testability review) |

---

## When Design Goes to Design Review

Design must go through design review before:
- Any Figma design is marked "Ready for Handoff"
- Any story with `design_required: true` moves to Sprint Ready
- Any design that introduces a new UI pattern or component
- Any design change affecting mobile experience

---

## Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-5 min | What is being reviewed today (brief context) | Designer |
| 5-30 min | Design walkthrough: flows, states, edge cases | Designer |
| 30-45 min | Feedback round: PM, Engineering, QA perspectives | All |
| 45-55 min | Decisions and changes required | Product Lead |
| 55-60 min | Actions with owners | Designer |

---

## Review Checklist

During every design review, check:

**Product Fit**
- [ ] Does the design achieve the stated user goal?
- [ ] Does it follow the established user flow?
- [ ] Is it consistent with the rest of the product?

**Screen States**
- [ ] Loading state present (skeleton loader preferred)
- [ ] Empty state present with message and action
- [ ] Error state present with recovery path
- [ ] Success state present where needed
- [ ] Mobile layout designed (375px)

**Accessibility**
- [ ] Colour contrast meets WCAG 2.1 AA
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Focus order logical

**Feasibility**
- [ ] Engineering Lead confirms implementation is feasible within sprint capacity
- [ ] No new dependencies introduced without prior approval

---

## Design Review Outcomes

| Outcome | Meaning | Next Step |
|---|---|---|
| Approved | Design meets standard, ready for handoff | Designer marks Figma "Ready for Handoff" |
| Approved with changes | Minor changes required before handoff | Designer makes changes, no re-review needed |
| Needs rework | Significant changes required | Designer reworks and brings back to next review |
| Blocked | Missing information or dependency needed | Product Lead resolves blocker |

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- `product/design/DESIGN_OPERATING_MODEL.md`
- `product/design/SCREEN_STATE_RULES.md`
- `product/design/FIGMA_HANDOFF_RULES.md`
- `product/design/UX_REVIEW_CHECKLIST.md`

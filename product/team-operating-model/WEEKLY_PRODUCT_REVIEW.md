# Weekly Product Review

**Version**: 2.0  
**Owner**: Product Lead  
**Cadence**: Every Monday, 60 minutes

---

## Purpose

The weekly product review is the primary pulse-check on product health, sprint progress, and short-term decisions. It replaces ad-hoc status pings and ensures the whole team is aligned every week.

---

## Attendees

| Role | Attendance |
|---|---|
| Product Lead | Mandatory |
| Engineering Lead | Mandatory |
| Designer | Mandatory |
| Support Lead | Mandatory |
| Operations Lead | Recommended |
| QA Lead | Recommended |

---

## Pre-Work (Before the Meeting)

**Product Lead (by Friday EOD)**:
- Update the [PRODUCT_HEALTH_METRICS.md](../analytics/PRODUCT_HEALTH_METRICS.md) dashboard
- Pull sprint progress: stories completed vs. planned
- Prepare a list of open decisions or blockers

**Attendees**:
- Review the metrics dashboard before arriving
- Bring anything that needs a decision flagged in advance

---

## Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-10 min | Product health metrics (Red / Amber / Green) | Product Lead |
| 10-25 min | Sprint progress: what's done, what's at risk, blockers | Engineering Lead |
| 25-35 min | Open decisions and upcoming releases | Product Lead |
| 35-45 min | Intake triage: new requests received this week | Product Lead |
| 45-55 min | Support insights: top issues this week | Support Lead |
| 55-60 min | Action items and owners | Product Lead |

---

## Outputs

Every weekly product review must produce:
- [ ] Metrics status recorded (Red/Amber/Green with notes)
- [ ] Sprint blockers identified with owners and resolution plan
- [ ] Open decisions recorded and assigned
- [ ] New intake requests triaged and status assigned
- [ ] Action items from support escalations assigned

---

## Decisions Made Here

The weekly product review has authority to:
- Reprioritise within the current sprint (minor scope changes)
- Move a story to the next sprint
- Approve or reject fast-track intake requests
- Agree on a communication to stakeholders

The weekly product review cannot:
- Change the quarterly roadmap (requires [Roadmap Review](ROADMAP_REVIEW.md))
- Approve new Strategic Initiatives (requires Product Lead + leadership)
- Approve scope changes to a committed client feature

---

## Format for Async Follow-Up

After the meeting, Product Lead posts a brief summary in the team channel:
```
**Weekly Review — [Date]**
Metrics: [Green/Amber/Red summary]
Sprint: [% complete, any at-risk items]
Decisions: [list]
Actions: [owner: action by date]
```

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- [PRODUCT_HEALTH_METRICS.md](../analytics/PRODUCT_HEALTH_METRICS.md)
- [SPRINT_PLANNING_RULES.md](SPRINT_PLANNING_RULES.md)

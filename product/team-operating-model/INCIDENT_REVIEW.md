# Incident Review

**Version**: 2.0  
**Owner**: Engineering Lead  
**Cadence**: Per P1 or P2 incident, within 5 business days of resolution, 60 minutes

---

## Purpose

The incident review (post-mortem) examines what happened during a P1 or P2 incident, why it happened, and what will be done to prevent recurrence. It is a learning meeting, not a blame meeting.

---

## Attendees

| Role | Attendance |
|---|---|
| Engineering Lead | Mandatory |
| Product Lead | Mandatory |
| Operations Lead | Mandatory |
| Support Lead | Mandatory |
| Incident responders | Mandatory (engineers who worked the incident) |
| QA Lead | Recommended |

---

## Pre-Work

**Engineering Lead (before meeting)**:
- Draft the RCA document (`objects/rcas/RCA-XXXX.md`) using `product/os/templates/RCA_TEMPLATE.md`
- Timeline of events completed
- Root cause hypothesis identified
- Customer impact summary complete

**Attendees**:
- Review the draft RCA before the meeting
- Come prepared with questions and additional context from your perspective

---

## Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-5 min | Incident overview (severity, duration, customer impact) | Engineering Lead |
| 5-20 min | Timeline walkthrough | Engineering Lead |
| 20-35 min | Root cause and contributing factors discussion | All |
| 35-45 min | Detection gap: why didn't we catch this sooner? | All |
| 45-55 min | Prevention actions: what will we do differently? | All |
| 55-60 min | Action item assignment with owners and due dates | Engineering Lead |

---

## Rules for the Incident Review

1. **No blame** — the focus is on systems, processes, and tooling, not individuals
2. **All timelines are facts, not accusations** — "the deploy went out at 14:35" not "X caused the outage"
3. **Every attendee's perspective matters** — Support knew before Engineering in some incidents; that's valuable
4. **Actions must be specific and assigned** — "improve monitoring" is not an action; "add alert for payment_success_rate < 98% in Grafana by [date] — owner: [name]" is

---

## Outputs

Every incident review must produce:
- [ ] Completed RCA document signed off by all mandatory attendees
- [ ] Root cause identified (specific, not vague)
- [ ] Prevention actions with owners and due dates
- [ ] Detection improvements with owners and due dates
- [ ] RCA document linked in the incident object

---

## Action Item Follow-Through

All action items from the incident review are entered into the sprint backlog:
- P1 incident actions: scheduled in the very next sprint
- P2 incident actions: scheduled within 2 sprints

Engineering Lead tracks open RCA actions in the monthly engineering review.

---

## Customer Communication

Operations Lead confirms whether a customer-facing post-mortem summary is required:
- P1 incidents with wide customer impact: yes — brief, plain-language summary to customers within 48 hours of resolution
- P2 incidents affecting a small subset: at Operations Lead discretion

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- `product/support-ops/RCA_RULES.md`
- `product/support-ops/INCIDENT_SEVERITY_MATRIX.md`
- `product/os/templates/RCA_TEMPLATE.md`
- `product/objects/incidents/`
- `product/objects/rcas/`

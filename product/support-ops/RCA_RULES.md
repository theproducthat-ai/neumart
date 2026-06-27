# RCA Rules

**Version**: 2.0  
**Owner**: Engineering Lead / Product Lead

---

## What Is an RCA?

A Root Cause Analysis (RCA) is a structured investigation into why an incident happened, what allowed it to reach production, and what actions will prevent recurrence.

An RCA is a learning tool, not a blame tool. The goal is systemic improvement.

---

## When an RCA Is Required

| Condition | RCA Required? |
|---|---|
| P1 incident | Yes — mandatory |
| P2 incident | Yes — mandatory |
| P3 incident affecting > 100 customers | Recommended |
| P3 incident with data integrity risk | Yes |
| P4 incident | No |
| Recurring P3 (same issue 3+ times) | Yes |

---

## RCA SLA

| Incident Severity | RCA Deadline |
|---|---|
| P1 | 5 business days after incident resolved |
| P2 | 5 business days after incident resolved |

If the RCA requires more time, Engineering Lead must communicate the reason and new deadline to Product Lead and Operations Lead.

---

## RCA Ownership

| Role | Responsibility |
|---|---|
| Engineering Lead | Leads the RCA, owns technical investigation |
| Product Lead | Contributes to process gaps, reviews action items |
| Operations Lead | Reviews customer impact, confirms communication accuracy |
| Author (any) | May be delegated by Engineering Lead for lower-severity P2s |

---

## RCA Process

1. **Draft (within 24 hours)**: Engineering Lead creates `objects/rcas/RCA-XXXX.md` with timeline and initial hypothesis
2. **Investigation (days 1-3)**: Team investigates root cause and contributing factors
3. **Review meeting (day 3-4)**: Engineering Lead, Product Lead, and Operations Lead review findings together
4. **Finalise (day 5)**: RCA completed, action items assigned with owners and due dates
5. **Follow-through**: Action items tracked in sprint planning or as separate objects

---

## RCA Required Sections

Every RCA must cover:
1. **Timeline** — chronological sequence of events from first signal to resolution
2. **Customer Impact** — who was affected, for how long, what data was affected
3. **Root Cause** — the single underlying reason why this happened
4. **Contributing Factors** — conditions that made the root cause worse or harder to catch
5. **Detection Gap** — why monitoring/alerts didn't catch this sooner
6. **Prevention Actions** — specific, assigned, time-bound actions to prevent recurrence
7. **Detection Improvement** — changes to monitoring or alerting to detect this class of issue earlier

---

## RCA Quality Bar

An RCA is complete when:
- Root cause is specific (not vague — "human error" is not a root cause; "missing validation on X field allowed Y input which caused Z" is)
- All prevention actions have owners and due dates
- Detection improvement is documented
- Operations Lead confirms customer impact description is accurate

---

## Action Item Follow-Through

RCA action items are treated as high-priority backlog items:
- P1 RCA actions: scheduled in the very next sprint unless technically impossible
- P2 RCA actions: scheduled within 2 sprints
- Engineering Lead tracks completion of RCA actions
- Open RCA actions are reviewed in the monthly engineering review

---

## RCA Is Not Blame

During an RCA:
- Focus on systems and processes, not individuals
- Ask "why did the system allow this?" not "who did this?"
- Findings should produce process changes, tooling improvements, or monitoring enhancements
- Any individual feedback is handled separately, outside the RCA document

---

## RCA Template

Use `product/os/templates/RCA_TEMPLATE.md`

---

## Related Documents

- [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md)
- [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
- `product/objects/rcas/_README.md`
- `product/os/templates/RCA_TEMPLATE.md`

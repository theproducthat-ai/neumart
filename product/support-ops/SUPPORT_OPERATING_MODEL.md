# Support Operating Model

**Version**: 2.0  
**Owner**: Operations Lead / Support Lead

---

## Purpose

This document defines how Neumart's customer support and operations teams interact with the Product OS — how issues are raised, triaged, escalated, and fed back into the product development cycle.

---

## Support Team Responsibilities

| Responsibility | Owner |
|---|---|
| First-line customer issue resolution | Support Agent |
| Issue triage and severity classification | Support Lead |
| Escalation to Engineering for technical issues | Support Lead |
| Escalation to Product for systemic/recurring issues | Support Lead → Product Lead |
| Incident declaration (P1/P2) | Support Lead or Engineering Lead |
| Post-incident communication to customers | Operations Lead |
| Operations readiness sign-off before releases | Operations Lead |
| Known issues register maintenance | Support Lead |

---

## How Support Raises Issues to Product

### Path 1 — Single Customer Issue (Non-Recurring)

1. Support resolves or workarounds the issue directly
2. If a bug, creates `objects/bugs/BUG-XXXX.md` with full reproduction steps
3. Assigns appropriate severity (critical/high/medium/low — see [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md))
4. Bug enters normal triage and sprint planning

### Path 2 — Recurring Issue (Multiple Customers Affected)

1. Support Lead escalates to Product Lead via the intake process
2. Creates `objects/requests/REQ-XXXX.md` with source = `support`
3. Includes count of affected customers, frequency, business impact
4. Product Lead assesses and decides whether to fast-track or queue

### Path 3 — Incident (Production Breaking)

1. Support Lead declares an incident via [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
2. Engineering Lead takes ownership of resolution
3. Creates `objects/incidents/INC-XXXX.md`
4. Post-incident: RCA mandatory for P1/P2 (see [RCA_RULES.md](RCA_RULES.md))

---

## Support SLAs

| Severity | First Response | Resolution Target |
|---|---|---|
| Critical (P1) | 15 minutes | 4 hours |
| High (P2) | 1 hour | 8 hours |
| Medium (P3) | 4 hours | 48 hours |
| Low (P4) | 1 business day | 5 business days |

---

## Support's Role in the Product Lifecycle

| Stage | Support Action |
|---|---|
| Pre-release | Receives support handover documentation |
| Release day | On standby during release window |
| Hypercare | Elevated monitoring, daily check-in with Product |
| Post-hypercare | Normal SLAs resume |
| Known issues | Maintains customer-facing workarounds |

---

## Feedback Loop to Product

Support is a primary source of product insight. The Support Lead provides:
- **Monthly**: Top-10 support contact reasons with volume counts
- **Per quarter**: Systemic issue patterns and proposed product interventions
- **Per release**: Post-release support volume report

These inputs feed directly into the intake process and prioritisation scoring.

---

## Related Documents

- [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md)
- [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
- [SUPPORT_HANDOVER_RULES.md](SUPPORT_HANDOVER_RULES.md)
- [KNOWN_ISSUES_REGISTER.md](KNOWN_ISSUES_REGISTER.md)
- [OPERATIONS_READINESS_CHECKLIST.md](OPERATIONS_READINESS_CHECKLIST.md)
- [HYPERCARE_RULES.md](HYPERCARE_RULES.md)
- [RCA_RULES.md](RCA_RULES.md)

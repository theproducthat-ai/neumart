# Engineering Operating Model

**Version**: 2.0  
**Owner**: Engineering Lead

---

## Purpose

Defines how the engineering team works within the Neumart product development process. Covers sprint structure, technical standards, decision authority, and integration with the Product OS.

---

## Sprint Structure

**Sprint length**: 2 weeks  
**Ceremonies**:
- Sprint planning (day 1, ~2 hours)
- Daily standup (daily, 15 min)
- Sprint review / demo (last day, ~1 hour)
- Sprint retrospective (last day, ~1 hour)

---

## Engineering's Role in the Product OS

Engineering is not just executors — they are product partners:

| Activity | Engineering Input |
|---|---|
| PRD review | Technical feasibility, complexity estimate |
| Technical design | Primary author — defines approach, risks, data changes |
| Sprint planning | Estimates, DoR check, capacity allocation |
| QA | Code fix for bugs found by QA |
| Release | Deployment, monitoring, rollback decision |
| Post-release | RCA for incidents, performance analysis |
| Tech debt | Proposes and prioritises internal improvements |

---

## Technical Decision Authority

| Decision Type | Who Decides | Notes |
|---|---|---|
| Architecture approach | Engineering Lead | Must document in `objects/decisions/` if non-obvious |
| Framework / library choice | Engineering Lead | Document reason |
| Performance trade-off | Engineering Lead | Inform Product Manager |
| Schema design | Engineering Lead | Requires Product Manager awareness |
| Security approach | Engineering Lead | Require security review for auth/payments |
| Deployment approach | Engineering Lead | |

---

## Code Quality Standards

- TypeScript strict mode is required
- Zero tolerance for `any` types in production code
- All code changes require at least one reviewer
- No direct commits to `main` — all work via PRs
- Test coverage expectations: per `CODE_REVIEW_RULES.md`

---

## Tech Debt Policy

- 15% of capacity per sprint is allocated to tech debt (part of the 20% buffer)
- Tech debt is filed as tasks or requests with `work_type: tech-debt`
- Engineering Lead prioritises tech debt with Product Lead awareness
- Tech debt that creates a production risk is treated as Lane 6 (Compliance/Security)

---

## On-Call Policy

- Engineering Lead is primary on-call for production incidents
- Escalation: Eng Lead → Senior Engineer → CEO (for P1)
- On-call rotation: [define as team grows]
- P1/P2 response SLA: per `support-ops/INCIDENT_SEVERITY_MATRIX.md`

---

## Engineering Integration With Product OS

At each lifecycle stage, engineering creates or updates these objects:

| Stage | Engineering Action |
|---|---|
| PRD review | Add `engineering_effort:` and `complexity:` to feature |
| Technical design | Create `objects/technical-designs/TD-XXXX.md` |
| API design | Create `objects/api-contracts/API-XXXX.md` |
| Schema change | Create `objects/data-migrations/DM-XXXX.md` |
| Feature flag | Create `objects/feature-flags/FF-XXXX.md` |
| PR | Update story status to `in-review` |
| QA pass | Update story status to `in-qa` |
| Deployment | Update release object, build object |
| Incident | Create `objects/incidents/INC-XXXX.md` |
| RCA | Create `objects/rcas/RCA-XXXX.md` |

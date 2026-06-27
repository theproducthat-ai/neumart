# Approval Authority Matrix

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Defines who can approve what. No decision should be blocked by unclear authority, and no decision should be made unilaterally when collective sign-off is required.

---

## Approval Matrix

| Decision | Authority Level | Approver(s) | Timeframe |
|---|---|---|---|
| **PRD approval** | Product | Product Lead | 3 business days |
| **Technical design approval** | Engineering | Engineering Lead | 2 business days |
| **Design approval (Standard Feature)** | Product | Product Manager | 2 business days |
| **Design approval (Strategic Initiative)** | Product | Product Lead | 3 business days |
| **Sprint commitment** | Engineering | Engineering Lead | Sprint planning day |
| **Release go/no-go** | Product + Engineering | Product Lead + Engineering Lead | Release day |
| **QA signoff** | QA | QA Lead | Before release |
| **UAT signoff** | Product | Product Manager | Before release |
| **Hotfix to production** | Engineering | Engineering Lead (unilateral for P1/P2) | Immediate |
| **Incident declaration** | Engineering | Engineering Lead | Immediate |
| **Feature flag rollout (100%)** | Engineering + Product | Engineering Lead + Product Manager | Before rollout |
| **Business case approval (<3 sprints)** | Product | Product Lead | 5 business days |
| **Business case approval (>3 sprints)** | Leadership | CEO + Product Lead | 2 weeks |
| **Client commitment** | Leadership | Product Lead + CEO | 1 business day |
| **Roadmap change (minor)** | Product | Product Lead | Weekly cadence |
| **Roadmap change (major re-prioritisation)** | Leadership | Product Lead + CEO | Leadership review |
| **OKR setting** | Leadership | CEO + Product Lead | Quarterly |
| **Budget approval** | Finance + Leadership | CFO/Finance + CEO | Per org process |
| **Legal/compliance sign-off** | Legal | Legal/Compliance Lead | Per compliance SLA |
| **New vendor/integration** | Engineering + Product | Engineering Lead + Product Lead | 5 business days |
| **Security fix to production** | Engineering | Engineering Lead (immediate for critical) | Immediate |
| **Data deletion / migration** | Engineering + Product | Engineering Lead + Product Manager | Before execution |

---

## Delegation Rules

- The Product Lead may delegate PRD and design approval to a Product Manager for Standard Feature lane
- The Engineering Lead may delegate technical design review to a Senior Engineer for Small Enhancement lane
- The CEO may delegate business case approval to Product Lead for cases under £10k / 3-sprint investment
- Delegation must be explicitly documented when exercised

---

## Approval Escalation

If an approver is unavailable for more than 24 hours and there is a deadline:

1. Document the block in the request/release object
2. Escalate to the next authority level
3. Proceed with "provisional approval" if the delay would cause a client commitment to be missed — document and confirm post-hoc

---

## Approval SLA Breach

If an approver misses the SLA:
1. Product Manager escalates to Product Lead
2. Product Lead contacts approver directly
3. If unresolved in 24 hours, escalate to CEO

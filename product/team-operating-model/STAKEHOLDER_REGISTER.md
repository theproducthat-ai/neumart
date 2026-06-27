# Stakeholder Register

**Version**: 2.0  
**Owner**: Product Lead  
**Last Updated**: See individual stakeholder objects

---

## Purpose

This register is the index of all active stakeholders in the Neumart product ecosystem. Individual stakeholder records live in `product/objects/stakeholders/`. This document provides a quick reference map.

---

## Internal Stakeholders

| ID | Name | Role | Influence | Interest | Primary Contact |
|---|---|---|---|---|---|
| STK-0001 | [CEO/Founder] | CEO | Very High | Very High | Direct |
| STK-0002 | [Product Lead] | Product Lead | High | Very High | Product OS |
| STK-0003 | [Engineering Lead] | Engineering Lead | High | High | Slack / Sprint planning |
| STK-0004 | [Operations Lead] | Operations Lead | Medium | High | Weekly review |
| STK-0005 | [Support Lead] | Support Lead | Medium | High | Weekly review |

*Add STK-XXXX objects in `objects/stakeholders/` for each new stakeholder.*

---

## Client Stakeholders

| ID | Client Name | Contact | Commitment | Priority |
|---|---|---|---|---|
| STK-0010 | [Client A] | [contact name] | [CC-XXXX] | High |
| STK-0011 | [Client B] | [contact name] | — | Medium |

---

## Stakeholder Engagement Model

| Influence Level | Interest Level | Strategy |
|---|---|---|
| Very High | Very High | Manage closely — frequent updates, direct involvement |
| High | High | Keep satisfied — regular updates, consult on major decisions |
| Medium | High | Keep informed — weekly updates |
| Low | Low | Monitor — periodic updates |

---

## Communication Schedule

| Audience | Format | Frequency | Owner |
|---|---|---|---|
| CEO / Leadership | Leadership View summary | Weekly | Product Lead |
| Engineering Team | Sprint review | Per sprint | Engineering Lead |
| Support / Ops | Release briefing | Per release | Product Manager |
| Clients (key) | Account update | Monthly or on-demand | Business team |
| Business stakeholders | Business Stakeholder View | Bi-weekly | Product Lead |

---

## Adding New Stakeholders

1. Create `objects/stakeholders/STK-XXXX.md` using `os/templates/STAKEHOLDER_OBJECT_TEMPLATE.md`
2. Add an entry to the table above
3. Determine engagement approach
4. Update relevant RACI if they are an approver

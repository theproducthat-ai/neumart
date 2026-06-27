# Ownership and RACI Rules

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

This document defines who owns what in the product development process. Every object must have an owner, and every process activity must have a clear accountable person.

---

## Role Definitions

| Role | Responsibilities |
|---|---|
| **Product Lead** | Strategic prioritisation, roadmap governance, final product decisions, stakeholder management |
| **Product Manager** | Request intake, PRD writing, story writing, release coordination, day-to-day product decisions |
| **Engineering Lead** | Technical design, architecture decisions, code quality, sprint planning, delivery execution |
| **Designer** | UX/UI design, design system, Figma handoff, accessibility, design review |
| **QA Lead** | Test planning, bug triage, QA signoff, regression testing |
| **Support Lead** | Support playbooks, incident communication, known issues, escalation management |
| **Operations Lead** | SOPs, training, ops readiness, hypercare monitoring |
| **Business Stakeholder** | Commercial requirements, client relationships, revenue targets |
| **Finance** | Budget approval, ROI sign-off for business cases |
| **Legal/Compliance** | Regulatory sign-off, legal review of commitments |
| **Leadership/CEO** | Strategic goals, OKRs, major investment decisions |

---

## Product RACI Matrix

**R** = Responsible | **A** = Accountable | **C** = Consulted | **I** = Informed

| Activity | PM | Eng Lead | Designer | QA | Support | Ops | Business | Finance | Legal | Leadership |
|---|---|---|---|---|---|---|---|---|---|---|
| **Request intake** | R | I | I | I | C | C | I | | | |
| **Request classification** | A | C | | | | | I | | | |
| **Discovery / grilling** | R | C | C | | | C | C | | | |
| **Prioritization** | R | C | | | | | C | C | | A |
| **PRD writing** | R | C | C | C | C | I | I | | | |
| **PRD approval** | C | C | I | | | | I | | | A |
| **Design brief** | R (creates) | I | A | | | | | | | |
| **Design approval** | A | C | R | | | | I | | | |
| **Figma handoff** | I | A | R | | | | | | | |
| **Technical design** | C | R | | | | | | | | A |
| **API contract** | C | A | | | | | | | | |
| **Sprint commitment** | C | A | | | | | | | | |
| **QA signoff** | C | C | | A | | | | | | |
| **UAT planning and run** | A | I | | C | I | I | C | | | |
| **UAT signoff** | A | I | | I | | | C | | | |
| **Release approval** | C | C | | | | | I | | | A |
| **Support handover** | R | I | I | I | A | C | | | | |
| **Operations handover** | R | I | | | C | A | | | | |
| **Incident response** | I | A | | | C | C | I | | | I |
| **RCA facilitation** | C | A | | C | C | I | | | | I |
| **Post-release review** | A | C | C | C | C | C | C | | | I |
| **OKR setting** | C | C | | | | | C | C | | A |
| **Roadmap governance** | R | C | | | | | C | | | A |
| **Business case approval** | C | C | | | | | C | A | | A |
| **Client commitment** | C | I | | | I | | R | | C | A |
| **Escalation handling** | C | C | | | R (raises) | C | C | | | A (if critical) |

---

## Object Ownership Rules

| Object Type | Owner Role | Created by | Closed by |
|---|---|---|---|
| requests | Product Manager | Any team member | Product Manager |
| features | Product Manager | Product Manager | Product Manager |
| prds | Product Manager | Product Manager | Product Lead (approves) |
| user-stories | Product Manager | PM or AI | Product Manager |
| tasks | Assigned engineer | PM or engineer | Engineer |
| bugs | QA Lead | QA / Support / Eng | QA Lead |
| incidents | Engineering Lead | Eng Lead / Support | Engineering Lead |
| risks | Product Manager | Any team member | Product Lead |
| decisions | Decision maker | PM or Eng Lead | Decision maker |
| releases | Engineering Lead | Engineering Lead | Engineering Lead |
| qa-tests | QA Lead | QA Lead | QA Lead |
| uat-runs | Product Manager | Product Manager | Product Manager |
| technical-designs | Engineering Lead | Eng Lead / Senior Eng | Engineering Lead |
| designs | Designer | Designer | Product Manager |
| support-playbooks | Support Lead | PM + Support Lead | Support Lead |
| incidents rcas | Engineering Lead | Engineering Lead | Engineering Lead |
| okrs | Product Lead | Product Lead | Product Lead |
| metrics | Product Manager | PM / Analytics | Product Manager |
| client-commitments | Product Lead | Product Lead / Business | Product Lead |
| escalations | Product Lead | Any team member | Escalation recipient |

---

## Ownership Gaps — What Happens When There's No Owner

If an object has no `owner:` field:

1. The AI or any team member should flag it as an orphan
2. Check `indexes/ORPHAN_OBJECTS.md`
3. Default ownership falls to Product Manager (product objects) or Engineering Lead (technical objects)
4. Product Lead must assign a real owner within 48 hours of discovery

**No object should be unowned for more than 48 hours.**

---

## RACI for Startup Lean Teams

For a small team (< 10 people) where one person plays multiple roles:

- Product Lead + Product Manager can be the same person
- Engineering Lead + Senior Engineer can be the same person
- Designer + QA Lead can be the same person

When roles collapse, the accountability doesn't change — it just means one person holds multiple RACI positions. Explicitly track who is covering which role to avoid ambiguity.

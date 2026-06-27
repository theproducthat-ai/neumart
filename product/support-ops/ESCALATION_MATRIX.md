# Escalation Matrix

**Version**: 2.0  
**Owner**: Operations Lead

---

## Purpose

Defines who to contact, through which channel, and in what order when an issue needs to be escalated beyond the current responder.

---

## Escalation Paths by Severity

### P1 — Critical Incident

| Step | Action | Owner | Channel | Time Limit |
|---|---|---|---|---|
| 1 | Declare P1 | Support Lead or Engineering on-call | Slack #incidents | Immediately |
| 2 | Engage Engineering Lead | Support Lead | Direct call/Slack DM | 15 minutes |
| 3 | Engage Operations Lead | Support Lead | Direct call/Slack DM | 15 minutes |
| 4 | Engage Product Lead | Engineering Lead | Slack/call | 30 minutes |
| 5 | Customer communication | Operations Lead | Status page + customer email | 30 minutes |
| 6 | Engage Business Owner / CTO | Operations Lead | Direct call | If unresolved at 2 hours |

### P2 — High Incident

| Step | Action | Owner | Channel | Time Limit |
|---|---|---|---|---|
| 1 | Log incident | Support Lead | Slack #incidents | Immediately |
| 2 | Engage Engineering Lead | Support Lead | Slack | 30 minutes |
| 3 | Notify Operations Lead | Support Lead | Slack | 30 minutes |
| 4 | Customer communication (if customer-facing) | Operations Lead | As appropriate | 1 hour |

### P3 — Medium Issue

| Step | Action | Owner | Channel | Time Limit |
|---|---|---|---|---|
| 1 | Log bug | Support Agent | GitHub / Jira / Product OS objects | Same business day |
| 2 | Notify Product Lead | Support Lead | Slack | If no triage within 2 business days |

### P4 — Low Issue

| Step | Action | Owner | Channel | Time Limit |
|---|---|---|---|---|
| 1 | Log bug | Support Agent | Product OS objects | Same business day |
| 2 | Routine triage | Product Lead | Sprint planning | Normal cadence |

---

## Escalation for Non-Incident Issues

### When a Bug Goes Unaddressed

| Situation | Escalation Action |
|---|---|
| P3 bug unresolved for > 2 weeks | Support Lead pings Product Lead |
| P3 bug unresolved for > 4 weeks | Support Lead raises to Operations Lead |
| P2 bug unresolved for > 48 hours | Support Lead escalates to Engineering Lead |

### When a Feature Request Is Stalled

| Situation | Escalation Action |
|---|---|
| REQ object stale for > 3 weeks with no status update | Requestor pings Product Lead |
| REQ object stale for > 6 weeks | Requestor escalates to Operations Lead |
| Client-committed request stalled | Account Manager escalates to Product Lead immediately |

---

## Key Contacts

_Names and contact details to be filled in by Operations Lead — this is the template structure._

| Role | Responsibility | Escalation Channel |
|---|---|---|
| Engineering Lead | Technical escalations, P1/P2 resolution | Slack DM + phone |
| Product Lead | Product escalations, feature triage | Slack DM |
| Operations Lead | Operational escalations, customer communication | Slack DM + phone |
| Support Lead | First-line triage, severity classification | Slack #incidents |
| Business Owner / CTO | Executive escalation (P1 only) | Phone |

---

## Communication Templates

### P1 Customer Status Update Template

```
STATUS UPDATE — [Time]

We are aware of an issue affecting [feature]. Our team is actively investigating.

Current status: [Investigating / Identified / In progress / Resolved]
Affected users: [All users / [X]% of users / Specific user groups]
Next update: [Time]
```

### P1 Internal War Room Kickoff

```
P1 INCIDENT DECLARED — [Time]

Issue: [Brief description]
Impact: [Who is affected, what is broken]
War room: [Link to Slack channel / video call]
Incident Commander: [Name]
```

---

## Related Documents

- [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md)
- [SUPPORT_OPERATING_MODEL.md](SUPPORT_OPERATING_MODEL.md)
- [RCA_RULES.md](RCA_RULES.md)

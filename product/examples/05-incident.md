# Example 05 — Incident: Payment Processing Outage

**Lane**: Incident (P1)  
**Source**: Engineering on-call  
**Duration**: 47 minutes

---

## 1. Incident Declaration

**What happened**: At 14:22, Engineering on-call received an alert that the payment success rate had dropped to 0%. All checkout attempts were returning a payment gateway error. An incident was declared immediately.

**Severity**: P1 (critical — checkout is completely broken for all users)

---

## 2. Timeline

| Time | Event |
|---|---|
| 14:18 | First customer complaint received by Support |
| 14:22 | Engineering on-call alert fires (payment_success_rate = 0%) |
| 14:23 | Incident declared — INC-0001 created |
| 14:25 | Engineering Lead and Product Lead engaged |
| 14:27 | Operations Lead engaged, war room opened |
| 14:30 | Customer status update posted: "We are aware of a payment issue. Team is investigating." |
| 14:35 | Engineering identifies: Razorpay API key has expired (monthly rotation was missed) |
| 14:40 | New API key rotated in all environments |
| 14:42 | Payment test successful |
| 14:46 | Engineering Lead confirms payments are processing normally |
| 14:47 | Operations Lead posts: "Payment issue resolved. All systems operating normally." |
| 14:50 | Incident closed — resolution confirmed |

**Total downtime**: 32 minutes (14:18 first report to 14:50 confirmation)

---

## 3. Incident Object

```yaml
# product/objects/incidents/INC-0001.md
---
id: INC-0001
title: Payment processing outage — Razorpay API key expiry
severity: P1
status: resolved
duration_minutes: 32
affected_module: PAY
estimated_orders_failed: 8
linked_rca: RCA-0001
owner: engineering_lead
date: 2026-06-15
---
```

---

## 4. RCA Summary (RCA-0001)

**Root cause**: Razorpay API key expired at 14:17. There was no automated alert for API key expiry. The key rotation process was manual and undocumented.

**Contributing factors**:
- No expiry monitoring for third-party API credentials
- Key rotation not in the team runbook
- No staging environment alert to detect the issue before production

**Detection gap**: Alert fired at 14:22 (4 minutes after expiry). A proactive expiry alert would have caught this before it affected users.

**Prevention actions**:
1. Add automated alert: notify Engineering Lead 14 days before any API key expires — owner: Engineering Lead, due: Sprint 15
2. Document key rotation process in operations runbook — owner: Operations Lead, due: Sprint 15
3. Add API key expiry monitoring to the Engineering Health dashboard (DASH-006) — owner: Engineering Lead, due: Sprint 15

---

## 5. Object Chain

```
INC-0001 (P1 incident, resolved)
  └── RCA-0001 (root cause: API key expiry)
        └── Action: BUG-0050 (add expiry monitoring — scheduled Sprint 15)
        └── Action: Operations runbook update (Sprint 15)
```

---

## 6. Key Learnings from This Example

- P1 incidents require customer communication within 30 minutes — in this case it was within 8 minutes of declaration (good)
- The root cause was a process failure (no monitoring, no rotation schedule), not a code failure — the RCA correctly identified the systemic gap
- RCA actions must be scheduled in the next sprint — not deferred to "someday"
- Support knew about the issue 4 minutes before Engineering's alert — better feedback loops between support and engineering would have saved those 4 minutes

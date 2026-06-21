# Incident Log

Central log of all production incidents. An incident is any unplanned event that impacts the customer experience, data integrity, or payment accuracy in production.

---

## What Is an Incident?

| Incident Type | Examples |
|---|---|
| Payment incident | Orders created without payment; wrong amount charged; Razorpay not called when it should be |
| Stock incident | Negative stock; stock not deducted after order; incorrect stock movement record |
| Auth incident | Users unable to sign in; admin accessed without role |
| Data integrity incident | Orphan records; missing references; corrupted field values |
| Performance incident | Site down or unresponsive for >2 minutes |
| Deployment incident | Failed deployment; rollback triggered |

---

## How to Log an Incident

1. Add a row to the Active Incidents table as soon as an incident is discovered.
2. Fill in the "Discovered" and "Impact" fields immediately.
3. Update "Resolved" and "Root Cause" once the incident is resolved.
4. Move to Resolved Incidents after close.
5. Create a Post-Release Review (14-post-release) if the incident was significant.

---

## Active Incidents

| INC ID | Date Discovered | Title | Type | Impact | Status | Owner | Resolution |
|---|---|---|---|---|---|---|---|
| INC-0001 | YYYY-MM-DD | *(title)* | Payment / Stock / Auth / Data / Performance / Deployment | *(number of users affected, what data affected)* | Open / Investigating / Resolved | *(name)* | *(resolution or "pending")* |

---

## Resolved Incidents

| INC ID | Date Discovered | Date Resolved | Title | Root Cause | Resolution | Review Written? |
|---|---|---|---|---|---|---|
| INC-0000 | YYYY-MM-DD | YYYY-MM-DD | *(title)* | *(root cause)* | *(resolution)* | Yes / No |

---

## Incident Severity

| Severity | Definition |
|---|---|
| P0 | Site down, payment broken, data corruption — all hands, fix now |
| P1 | Major feature broken, significant users affected — fix within hours |
| P2 | Minor feature broken, workaround available — fix within days |
| P3 | Cosmetic or very minor — schedule in next sprint |

---

*Last updated: 2026-06-21*

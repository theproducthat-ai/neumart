# Incident Severity Matrix

**Version**: 2.0  
**Owner**: Engineering Lead / Operations Lead

---

## Severity Levels

### P1 — Critical

**Definition**: Production is down or a critical customer-facing function is completely non-functional for all or most users.

**Examples**:
- App unable to load for all users
- Checkout / payment processing completely broken
- All orders failing
- Data breach or security incident

**Response**:
- Declare incident immediately
- Engineering Lead + Operations Lead engaged within 15 minutes
- War room opened (Slack channel + video call)
- Customer communication within 30 minutes
- All hands on deck until resolved
- RCA mandatory within 5 business days

**Target Resolution**: 4 hours

---

### P2 — High

**Definition**: A significant feature is broken or severely degraded for a large portion of users. Business operations are impacted.

**Examples**:
- Payment processing intermittently failing (>5% failure rate)
- Order tracking broken for all customers
- Delivery assignment failing
- Admin dashboard inaccessible

**Response**:
- Engineering Lead engaged within 30 minutes
- Operations Lead notified
- Working fix or workaround within 2 hours
- RCA mandatory within 5 business days

**Target Resolution**: 8 hours

---

### P3 — Medium

**Definition**: A feature is broken or degraded but a workaround exists, or the impact is limited to a small number of users.

**Examples**:
- Search returning incorrect results for some queries
- Notifications not being sent
- PDF export failing
- A non-critical admin feature broken

**Response**:
- Support Lead or Engineering triages
- Fix scheduled in the next sprint or sooner if capacity exists
- RCA not required (but bug object required)

**Target Resolution**: 48 hours

---

### P4 — Low

**Definition**: Minor issue, cosmetic problem, or edge case. No significant user impact.

**Examples**:
- UI alignment issue
- Incorrect label or copy
- Non-blocking validation message missing
- Rare edge case with easy workaround

**Response**:
- Logged as a bug
- Prioritised and scheduled normally
- No escalation required

**Target Resolution**: Next sprint or backlog

---

## Severity Classification Matrix

Use this to quickly classify an incident:

| Dimension | P1 | P2 | P3 | P4 |
|---|---|---|---|---|
| Users affected | All / Most | Many | Few / Some | Very few |
| Core function broken | Yes, completely | Partially | Minor | No |
| Revenue impact | Immediate | Significant | Small | None |
| Data risk | Possible | Unlikely | No | No |
| Workaround exists | No | Difficult | Yes | Yes |

---

## Severity Escalation

Severity can be escalated or de-escalated as facts change:
- If a P3 workaround stops working → escalate to P2
- If a P1 is isolated to a small user subset → may de-escalate to P2 after investigation
- Engineering Lead and Operations Lead jointly agree on severity changes during an active incident

---

## Related Documents

- [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
- [RCA_RULES.md](RCA_RULES.md)
- [HYPERCARE_RULES.md](HYPERCARE_RULES.md)

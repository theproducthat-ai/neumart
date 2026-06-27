# Client Commitment Index

**Version**: 2.0  
**Owner**: Operations Lead / Product Lead  
**Updated**: Update when commitments are made, delivered, or renegotiated

---

## Purpose

Tracks all commitments made to external clients. These are the highest-priority delivery obligations — any client commitment at risk must be escalated immediately.

---

## Active Client Commitments

| ID | Client | Commitment Description | Linked Feature | Due Date | Status | Internal Owner |
|---|---|---|---|---|---|---|
| _(add as commitments are made)_ | — | — | — | — | — | — |

---

## Commitment Status Definitions

| Status | Meaning | Action |
|---|---|---|
| `on-track` | Delivery is on schedule | No action needed |
| `at-risk` | Delivery is at risk of missing the committed date | Product Lead and Operations Lead meet immediately |
| `delayed` | Committed date missed — client must be notified | Operations Lead notifies client within 24 hours |
| `delivered` | Commitment met and confirmed by client | Close the commitment |
| `renegotiated` | New date agreed with client | Update due date, document renegotiation |

---

## Rules for Client Commitments

1. **Never make a client commitment without Engineering Lead confirmation of feasibility**
2. **All client commitments enter the roadmap as locked items** — cannot be deprioritised without client consent
3. **At-risk commitments must be escalated to Operations Lead and Business Owner** — do not wait until missed
4. **Any missed commitment must be communicated to the client proactively** — never let them discover it

---

## Commitment Priority in Prioritisation

Client commitments receive an automatic override in the prioritisation model:
- Commitments at risk of missing SLA → P0 priority
- Active commitments → factored into `client_commitment` scoring factor (×2 weight)

See `product/portfolio/PRIORITIZATION_MODEL.md` for full rules.

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- [STAKEHOLDER_INDEX.md](STAKEHOLDER_INDEX.md)
- `product/portfolio/PRIORITIZATION_MODEL.md`
- `product/team-operating-model/STAKEHOLDER_REGISTER.md`

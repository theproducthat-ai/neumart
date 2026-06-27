# Known Issues Register

**Version**: 2.0  
**Owner**: Support Lead  
**Updated**: Review monthly — mark stale issues resolved or remove

---

## Purpose

A living register of known issues that have been acknowledged but not yet resolved. Used by:
- Support agents to provide accurate customer responses
- Product Lead to track backlog priority
- Engineering to avoid duplicate investigation

---

## Active Known Issues

_Format: Add new issues at the top. Update status and resolution date when resolved._

| ID | Issue | Affected Area | Severity | Workaround | Status | Linked Bug | Date Added |
|---|---|---|---|---|---|---|---|
| KI-001 | _(template row — replace with real issue)_ | — | — | — | Active | — | — |

---

## Issue Entry Format

When adding a new known issue:

```
| KI-XXX | [Brief issue title] | [Module: COM/ADM/DEL/INV/PAY/RPT/USR] | [P1/P2/P3/P4] | [Workaround description or "None"] | Active | BUG-XXXX | [YYYY-MM-DD] |
```

---

## Resolved Issues (Last 90 Days)

_Move issues here when resolved. Remove after 90 days._

| ID | Issue | Resolution | Resolved Date | Release |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Register Rules

1. **Every active P2+ bug that has customer-facing impact must be in this register**
2. **P3 bugs with a known workaround should be in this register** — so Support can use the workaround instead of escalating
3. **Resolved issues stay in the register for 90 days** then are removed
4. **Support Lead reviews and updates this register monthly**
5. **When a new release closes a known issue**, Support Lead updates status to Resolved with the release number

---

## Customer Communication About Known Issues

For P1/P2 issues affecting customers:
- Operations Lead decides whether to communicate proactively
- Communication goes out via status page and/or email
- Template: see [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md) communication templates

For P3/P4 issues:
- Support agents acknowledge the issue to customers and provide workaround
- Do not promise a resolution date unless Product Lead has committed one

---

## Related Documents

- [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md)
- [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
- `product/objects/bugs/` — full bug objects

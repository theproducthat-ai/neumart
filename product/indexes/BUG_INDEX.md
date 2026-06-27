# Bug Index

**Version**: 2.0  
**Owner**: Engineering Lead / QA Lead  
**Updated**: Update when bugs are created, resolved, or change severity

---

## Open Bugs

| ID | Title | Module | Severity | Status | Assignee | Date Found | Sprint Target |
|---|---|---|---|---|---|---|---|
| BUG-COM-CART-QTY-OVERSTOCK-001 | Cart quantity increases beyond available stock when user taps plus button repeatedly | MOD-COM | High | Open | — | 2026-06-25 | — |

_Note: Run `tools/generate-indexes.js` to populate from bug frontmatter._

---

## Bug Severity Definitions

| Severity | Criteria |
|---|---|
| critical | Production broken, data loss risk, or security issue |
| high | Major feature non-functional, no workaround |
| medium | Feature impaired but workaround exists |
| low | Cosmetic, minor UX issue, or rare edge case |

---

## Bug Status Definitions

| Status | Meaning |
|---|---|
| `open` | Reported, not yet triaged |
| `triaged` | Severity assigned, in backlog |
| `in-progress` | Engineer actively working |
| `in-review` | Fix in code review |
| `in-qa` | Fix in QA verification |
| `resolved` | Fix verified and merged |
| `closed` | Closed without fix (won't fix, duplicate, cannot reproduce) |

---

## Bug Summary by Severity

| Severity | Open Count | Avg Age |
|---|---|---|
| critical | — | — |
| high | — | — |
| medium | — | — |
| low | — | — |

_Regenerate from objects folder for accurate counts._

---

## Bug Triage Rules

- **Critical bugs**: Must be in sprint immediately. Engineering Lead assigns personally.
- **High bugs**: Triaged within 24 hours, sprint-scheduled within 1 sprint.
- **Medium bugs**: Triaged within 2 business days, scheduled in priority order.
- **Low bugs**: Triaged monthly.

---

## Known Issues Cross-Reference

Bugs with customer-facing impact should also appear in:
`product/support-ops/KNOWN_ISSUES_REGISTER.md`

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/bugs/`
- `product/support-ops/KNOWN_ISSUES_REGISTER.md`

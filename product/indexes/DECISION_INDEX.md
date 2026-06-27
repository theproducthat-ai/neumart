# Decision Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when decisions are made

---

## Purpose

A register of significant product, architecture, and business decisions. Decisions captured here prevent re-litigating settled questions and create a record of why the current approach was chosen.

---

## Decision Register

| ID | Decision | Date | Made By | Category | Status |
|---|---|---|---|---|---|
| _(populate from `objects/decisions/`)_ | — | — | — | — | — |

---

## Decision Categories

| Category | Examples |
|---|---|
| `architecture` | Tech stack choices, data model decisions, integration approaches |
| `product` | Feature scope, UX direction, prioritisation decisions |
| `process` | Team process changes, tooling decisions |
| `commercial` | Pricing, partnership, client commitment decisions |
| `policy` | Policy changes captured in Product OS documents |

---

## Decision Status

| Status | Meaning |
|---|---|
| `active` | Current, in force |
| `superseded` | Replaced by a newer decision (link to new DEC-) |
| `reversed` | Decision was changed |

---

## When to Log a Decision

Log a decision when:
- The choice was non-obvious and a reasonable team could have chosen differently
- The choice will constrain future decisions
- Stakeholders asked for justification
- The decision took more than one meeting to reach

Do NOT log:
- Obvious choices with no meaningful alternative
- Implementation details (log in code comments instead)
- Routine sprint-level choices

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/decisions/`

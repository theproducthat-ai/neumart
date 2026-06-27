# Orphan Objects

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Run `tools/validate-product-os.js` monthly to refresh

---

## Purpose

Lists Product OS objects that are missing required links — either no parent object, no owning stakeholder, or stale/inconsistent status. Orphan objects are product debt and should be resolved promptly.

---

## Orphan Object Types

| Type | What Makes It an Orphan |
|---|---|
| Feature | No linked parent REQ or OKR |
| User Story | No linked parent EPIC or FEAT |
| Bug | No assigned owner or no severity |
| RCA | No linked incident |
| Metric | Not referenced in any OKR or measurement plan |
| Risk | No owner assigned |
| Decision | No rationale documented |
| Experiment | No linked feature |
| Feature Flag | No `scheduled_removal_date` |

---

## Current Orphans

_Run `tools/validate-product-os.js` to generate this list automatically._

| Object ID | Type | Orphan Reason | Owner to Resolve | Date Identified |
|---|---|---|---|---|
| _(auto-generated)_ | — | — | — | — |

---

## How to Resolve an Orphan

1. **Missing parent link**: Add the correct `parent_feature`, `parent_epic`, or `linked_request` to the object frontmatter
2. **Missing owner**: Assign an owner in the object frontmatter and notify them
3. **Stale status**: Review with the current owner, update status to reflect reality
4. **No rationale**: Add a `why` section to the object or decision
5. **Missing removal date (flags)**: Add `scheduled_removal_date` in feature flag frontmatter

If an orphan cannot be resolved (the work was abandoned), close or archive the object with a note.

---

## Orphan Prevention

To avoid creating orphans:
- Always link new objects to their parent when creating them
- Always assign an owner field in frontmatter
- Always set `scheduled_removal_date` on feature flags
- Run the validation tool before each sprint review

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/tools/validate-product-os.js`
- `product/tools/check-required-fields.js`

---
id: ""                               # e.g. VER-FEATURE-COM-PLP-CAROUSEL-001
object_type: VersionHistory
title: ""
status: ""                           # active
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# VersionHistory

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Version History object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/version-historys/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Version History Record

Used as a standalone snapshot file stored in `product/versions/{object-type}/{object-id}/vN.md`, OR as an inline section within a versioned object.

---

## Inline Section Format (embed inside the versioned object)

```markdown
## Version History
| Version | Date | Changed By | Summary |
|---------|------|------------|---------|
| v1.0 | YYYY-MM-DD | [Name] | Initial approved version |
| v1.1 | YYYY-MM-DD | [Name] | [Summary of change] |
| v2.0 | YYYY-MM-DD | [Name] | [Summary of major change] |
```

---

## Standalone Snapshot Format (file in product/versions/)

```
# Version Snapshot: [Object ID] — [vX.Y]

version:            vX.Y
previous_version:   vX.Y
object_type:        [prd | feature | module | roadmap-item | technical-design | api-contract | release-plan | decision | sop | measurement-plan]
object_id:          [Object ID]
object_title:       [Object title at this version]
snapshot_date:      YYYY-MM-DD
changed_by:         [Name / role]
change_summary:     [One sentence describing what changed]
change_reason:      |
  [Why this change was made — link to CHN-NNN or SCH-NNN if applicable]
approval_required:  [yes | no]
approval_status:    [approved | pending | N/A]
approved_by:        [Name or N/A]
impacted_objects:   []
supersedes:         [Previous snapshot file or N/A]
superseded_by:      [Next snapshot file or N/A — fill in when superseded]

---

[Full content of the object at this version — paste the complete object here]
```

---

## Related
- Policy: `product/os/policies/VERSIONING_RULES.md`
- Index: `product/indexes/VERSION_INDEX.md`
- View: `product/views/RECENT_CHANGES_VIEW.md`

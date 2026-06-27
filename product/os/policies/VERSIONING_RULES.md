# Versioning Rules

Governs how product objects are versioned, when snapshots are taken, and how version history is maintained.

---

## 1. Objects That Are Versioned

| Object Type | Versioned | Snapshot Required For |
|------------|-----------|----------------------|
| PRD | Yes | Major structural changes, scope changes, re-prioritisation |
| Feature | Yes | Scope changes, phase splits |
| Module | Yes | Structural changes, ownership changes |
| Roadmap Item | Yes | Major direction changes |
| User Stories | No | Track via change notes only |
| Technical Design | Yes | Architecture changes, schema changes |
| API Contracts | Yes | Any breaking or additive change |
| Release Plans | Yes | Scope changes, date changes |
| Decisions | Yes | Reversals or significant amendments |
| Risks | No | Track via status fields only |
| Support Playbooks / SOPs | Yes | Significant process changes |
| Measurement Plans | Yes | Metric changes |

---

## 2. Version Numbering

- `v1.0` — initial approved version.
- `v1.1` — minor addition or clarification within agreed scope.
- `v2.0` — major scope change, architectural change, or significant re-work.

Use semantic-style versioning: `vMAJOR.MINOR`

---

## 3. When to Take a Snapshot

Take a snapshot (save a full copy to `product/versions/{object-type}/{object-id}/vN.md`) when:
- A major scope change is approved.
- A PRD moves from draft to approved.
- A technical design changes architecture significantly.
- An API contract is updated with breaking or additive changes.
- A release plan has its scope or date materially changed.
- A decision is reversed.

Do not snapshot for:
- Typo fixes.
- Formatting changes.
- Metadata-only updates (owner, date, status).
- Draft changes before first approval.

---

## 4. Inline Version History

Every versioned object must contain a `version_history` section:

```markdown
## Version History
| Version | Date | Changed By | Summary |
|---------|------|------------|---------|
| v1.0 | YYYY-MM-DD | [Name] | Initial approved version |
| v1.1 | YYYY-MM-DD | [Name] | Added section X |
| v2.0 | YYYY-MM-DD | [Name] | Scope change: removed Y, added Z |
```

This is the quick log. The full content of previous versions lives in `product/versions/`.

---

## 5. Version Fields

Every versioned change must record:

```
version:            vX.Y
previous_version:   vX.Y
change_summary:     [One sentence]
change_reason:      [Why it changed — link to CHN or SCH if applicable]
changed_by:         [Name]
changed_date:       YYYY-MM-DD
approval_required:  [yes | no]
approval_status:    [approved | pending | N/A]
impacted_objects:   [List of object IDs affected]
supersedes:         [Previous version ID]
superseded_by:      [Next version ID, if superseded]
```

---

## 6. No-Overwrite Rule

**Major changes must not overwrite previous content without creating a version snapshot first.**

If a PRD, technical design, release plan, or roadmap item is being significantly changed:
1. Save the current content as a snapshot in `product/versions/`.
2. Apply the change to the main file.
3. Update `version_history` in the main file.
4. Update the VERSION_INDEX.

---

## 7. Answering Version Questions

The AI should be able to answer:
- "What changed in this PRD?" → read `version_history` section.
- "Show previous version" → load from `product/versions/{type}/{id}/vN.md`.
- "Compare v1 and v2" → load both snapshots and diff key sections.
- "Why was this changed?" → read `change_reason` from version record or linked CHN/SCH.
- "Which objects were impacted?" → read `impacted_objects` from version record or IMP.

---

## 8. When a New Version Is NOT Applicable

A "new version" of a request object is only meaningful when a prior **committed** version exists and was approved or acted upon. The following situations do NOT qualify for versioning:

| Situation | Reason |
|---|---|
| Target object exists only as a dry-run session reference | No committed v1. File not in `product/objects/`; no entry in `REQUEST_INDEX.md`. |
| Target object is at `intake` status with unanswered open questions | No approved scope to version. Intake is not a commitment. |
| Legacy ID has not been written to `MASTER_REGISTRY.md` | The request was never formally committed. |
| Object was created in a prior dry-run that was not followed by a commit | Session previews do not create versions. |

**In these cases:**
- Do NOT create a v2 of the request.
- Do NOT create a version snapshot — there is nothing to snapshot.
- Recommend **amending the scope** of the target object before its first commit (if new additions are related).
- Recommend creating a **separate new request** (if additions are clearly independent).
- Recommend a **ROADMAP_OPTION** (if additions are explicitly deferred).

**Versioning becomes applicable once:**
- The target object's file is committed to `product/objects/`.
- The legacy ID is written to `MASTER_REGISTRY.md`.
- The object has status `approved`, `in-progress`, or beyond.

See also: `MIDSTREAM_CHANGE_RULES.md` Section 0.2 — Uncommitted Target Object Rules.

---

## Related
- Template: `product/os/templates/VERSION_HISTORY_TEMPLATE.md`
- Index: `product/indexes/VERSION_INDEX.md`
- View: `product/views/RECENT_CHANGES_VIEW.md`
- Policy: `product/os/policies/MIDSTREAM_CHANGE_RULES.md`

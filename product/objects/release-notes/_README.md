# Release Notes

**Object type**: `release-notes`  
**Owner**: Product Manager  
**Note**: Release note artifacts — user-facing and internal release notes for each deployment. These supplement the `releases/` object, which is the primary release record.

## When to Create

- Every Standard Feature release needs user-facing release notes
- Internal release notes for every release
- Changelog entries for clients

## Relationship to releases/

`releases/` stores the full release object (scope, QA, UAT, readiness checklist).  
`release-notes/` stores the human-readable communications:
- Internal release summary
- Customer-facing changelog
- Client communication

## Format

`RN-[RELEASE-ID]-[audience].md` (e.g., `RN-REL-0002-internal.md`, `RN-REL-0002-customers.md`)

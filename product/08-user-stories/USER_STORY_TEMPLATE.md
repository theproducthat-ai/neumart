# User Story Template — How to Write User Stories

This document explains how to write user stories for a Nuemart feature. Claude writes user stories from an approved PRD automatically.

---

## Rule: The User Does Not Write Stories

- Claude writes user stories from the approved PRD, grilling notes, and impact assessment.
- The user only needs to review and approve.
- Claude does not ask the user to provide story text, acceptance criteria, or test cases — these are derived from the PRD.

---

## User Story Format

All user stories follow the standard format:

```
As a [role], I want to [action], so that [benefit].
```

**Roles in Nuemart:**
- Customer
- Admin
- System (automated action triggered by an event, not a human)

---

## User Story Size Rules

| Size | Story Points | Rule |
|---|---|---|
| Small | 1–2 | Single UI change or single Convex function |
| Medium | 3–5 | Multi-step flow or 2–3 Convex functions |
| Large | 8 | Full feature with backend + frontend + validation |
| Epic | Split | Anything larger must be split into smaller stories |

---

## US ID Format

US IDs are sequential and registered in MASTER_REGISTRY.md:

```
US-0001   First user story
US-0002   Second user story
```

A single PRD typically generates 3–10 user stories. All US IDs from a PRD are registered together before development begins.

---

## Story Output Files

```
product/08-user-stories/stories/US-NNNN.md
```

See `stories/US-template.md` for the file structure.

---

## After Writing Stories

1. Link all US IDs in the parent PRD file.
2. Update MASTER_REGISTRY.md (Last Used ID for US).
3. Update request status to "Stories Created".
4. Proceed to Development Planning (09-development-planning).

---

## Definition of Done — Applied to All Stories

A story is only "Done" when:

- [ ] Backend Convex function written and tested
- [ ] Frontend component or page written
- [ ] Validated on local dev environment
- [ ] No TypeScript errors in affected files
- [ ] All acceptance criteria verified manually
- [ ] Admin and customer paths both tested (if applicable)
- [ ] No regression in existing features
- [ ] Ready for QA

---

*Last updated: 2026-06-21*

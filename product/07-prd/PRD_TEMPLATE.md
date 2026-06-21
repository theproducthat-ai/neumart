# PRD — How to Write a Product Requirement Document

This document explains how to write a PRD for a Nuemart request. Claude writes PRDs automatically when a request reaches "Approved for PRD" status.

---

## Rule: The User Does Not Write the PRD

- Claude writes the PRD based on grilling output, impact assessment, product hierarchy, module catalogue, and screen registry.
- The user reviews and approves the PRD before development begins.
- The user does not need to provide module names, screen IDs, file paths, Convex function names, or data field names.

---

## When a PRD Is Written

| Trigger | Notes |
|---|---|
| Request status = Approved for PRD | After evaluation and impact assessment are approved |
| Small feature with no evaluation needed | Product owner can fast-track directly to PRD after grilling |

---

## PRD ID Format

PRD IDs are generated from MASTER_REGISTRY.md:

```
PRD-0001   First PRD
PRD-0002   Second PRD
```

Always get the next PRD ID from MASTER_REGISTRY.md before creating the file.

---

## PRD Output File

```
product/07-prd/approved-prds/PRD-NNNN.md
```

See `approved-prds/PRD-template.md` for the file structure.

---

## After Writing a PRD

1. Link PRD ID in REQUEST_REGISTER.md.
2. Update request status to "PRD Created".
3. Update MASTER_REGISTRY.md (Last Used ID for PRD).
4. Proceed to User Stories (08-user-stories).

---

## PRD Sign-off Required Before Development

A PRD must be reviewed and signed off by the product owner before any development begins. Unsigned PRDs must not proceed to the Development Planning stage.

---

*Last updated: 2026-06-21*

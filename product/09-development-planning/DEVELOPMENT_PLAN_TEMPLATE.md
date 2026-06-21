# Development Plan — How to Create a Dev Plan

This document explains how to create a development plan for a Nuemart feature. Claude writes development plans automatically when user stories are approved and a request moves to "Development Planned" status.

---

## Rule: The User Does Not Write Dev Plans

- Claude writes the development plan based on the approved PRD, user stories, impact assessment, schema, and module catalogue.
- The user does not need to provide file paths, Convex function names, schema changes, or component names.
- Claude derives these from the existing codebase context.

---

## When a Dev Plan Is Created

| Trigger | Notes |
|---|---|
| User stories are written and reviewed | After US status = Ready for Development |
| Before an AI coding prompt is generated | A dev plan must exist before a coding prompt is written |

---

## DEVPLAN ID Format

DEVPLAN IDs are registered in MASTER_REGISTRY.md:

```
DEVPLAN-0001   First dev plan
DEVPLAN-0002   Second dev plan
```

---

## Dev Plan Output File

```
product/09-development-planning/plans/DEVPLAN-NNNN.md
```

See `plans/DEVPLAN-template.md` for the file structure.

---

## AI Coding Prompt

Every dev plan produces a corresponding AI coding prompt:

```
product/09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md
```

The coding prompt is written from the dev plan. See `AI_CODING_PROMPT_TEMPLATE.md` for structure and rules.

---

## After Creating a Dev Plan

1. Link DEVPLAN ID in all related US files and PRD file.
2. Update MASTER_REGISTRY.md.
3. Update request status to "Development Planned".
4. Write the AI coding prompt.
5. Proceed to development.

---

*Last updated: 2026-06-21*

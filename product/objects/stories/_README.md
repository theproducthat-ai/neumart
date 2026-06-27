# Stories — V1 LEGACY (Read-Only)

> **STATUS: READ-ONLY LEGACY FOLDER**
>
> This folder contains V1 user story objects (US-0001 through US-0023) from the legacy lifecycle system (`08-user-stories/stories/`). These are part of the historical record.
>
> **For all new user stories, use `product/objects/user-stories/` instead.**

---

**Object type**: `user-story` (V1 format)
**ID range**: US-0001 — US-0023
**Owner**: Product Manager (historical)

## V1 Stories in This Folder

Stories here follow the V1 format. They remain as reference and audit trail.
- Do not delete them.
- Do not modify them significantly.
- Do not create new stories here.

## Migration Rule

If a V1 story needs to be updated as part of a V2 feature, create a new V2 story in `objects/user-stories/` with a `legacy_ref:` field pointing to the original US-XXXX story here. Do not overwrite the V1 story.

## Where New Work Goes

| Action | Location |
|---|---|
| New user story | `product/objects/user-stories/` (next ID: US-0024+) |
| Reference a V1 story | Use `legacy_ref: US-XXXX` in the new V2 story |
| Template | `product/os/templates/USER_STORY_OBJECT_TEMPLATE.md` |

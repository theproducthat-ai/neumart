# Screen Reference Rules

Governs how screens are registered, referenced, and looked up in the Product OS.

---

## 1. Screen Registration

Every distinct view in the application must have a screen object in `product/objects/screens/`.

A new screen must be registered when:
- A new route is created.
- A new full-page view is designed or built.
- A modal or drawer that represents a distinct user task is added (if it has significant UX complexity).

A screen does not need to be registered for:
- Small UI sub-components within a page.
- Inline states (empty, loading, error) of an existing screen.

## 2. Required Fields

Every screen object must have:
- `screen_id`
- `screen_name`
- `module_id`
- `route`
- `file_path`
- `feature_ids` (at least one)
- `roles_allowed`

All other fields are populated as they become available.

## 3. Lookup Behaviour

When a user asks to "open screen X" or "find screen X", the AI must:

1. Search `SCREEN_INDEX.md` for the screen by name or ID.
2. If found, return:
   - `screen_id`
   - `route`
   - `file_path`
   - `component_paths`
   - `figma_link` (if available)
   - `screenshot_reference` (if available)
   - `feature_ids`
   - Any open bugs on this screen
3. If not found, search by route or partial name match.
4. If still not found, report that the screen is not registered and suggest creating a screen object.

The AI cannot directly open files in an IDE. It provides the path and reference so the user can navigate there.

## 4. Route → Screen Mapping

Every route must be reflected in `ROUTE_SCREEN_MAP.md`. New routes added during development must update this map.

## 5. Screen → Feature Mapping

Every screen must be linked to at least one feature. If a screen is built without a linked feature, it must be flagged as an orphaned screen in `SCREEN_FEATURE_MAP.md`.

## 6. Design Reference

If a Figma design exists for the screen, `figma_link` must be populated in the screen object. If design is in progress, mark `figma_link: in-progress`.

## 7. Screen Deprecation

When a screen is removed:
- Set `status = deprecated` on the screen object.
- Remove from `ROUTE_SCREEN_MAP.md`.
- Check `SCREEN_COMPONENT_MAP.md` for any components only used by this screen (candidates for deletion).

---

## Supported User Queries

- "Open screen SCR-CUS-0001" → return route, file_path, figma_link
- "Show me Product Listing screen" → lookup by name in SCREEN_INDEX
- "Which feature owns this screen?" → return feature_ids from screen object
- "Which route maps to this screen?" → return route and file_path
- "Which file should be changed for this screen?" → return file_path and component_paths
- "Which PRD created this screen?" → return related_prds from screen object
- "Which bugs are open on this screen?" → return related_bugs from screen object

---

## Related
- Index: `product/indexes/SCREEN_INDEX.md`
- Map: `product/indexes/ROUTE_SCREEN_MAP.md`
- Map: `product/indexes/SCREEN_FEATURE_MAP.md`
- Map: `product/indexes/SCREEN_COMPONENT_MAP.md`
- Template: `product/os/templates/SCREEN_OBJECT_TEMPLATE.md`

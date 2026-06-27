# Discovery Notes

**Object type**: `discovery-note`
**ID format**: `DSN-NNN` (e.g., `DSN-0001.md`)
**Owner**: Product Manager / Engineering Lead
**Template**: `product/os/templates/DISCOVERY_NOTE_TEMPLATE.md`
**Policy**: `product/os/policies/MIDSTREAM_CHANGE_RULES.md`

## What Belongs Here

**Discovery Notes** capture new information, insights, or constraints discovered *during active delivery work* — not in a planned session. A discovery note is raised when something unexpected is learned while writing a PRD, during design, in development, during QA, or in UAT.

A discovery note records new knowledge that *may or may not* require a change to scope or plan. It is not a change request — it is a signal that requires evaluation.

## Boundary With Related Folders

| Folder | Contains | Example |
|---|---|---|
| `discovery/` | **Session object** — a planned discovery session record | `DISC-REQ-0003-checkout-discovery.md` |
| `discovery-notes/` (this folder) | **Midstream note** — an unplanned finding during delivery work | `DSN-0001.md` |
| `discovery-evidence/` | **Research evidence** — structured evidence from user research and analytics | `EVD-0001.md` |

## When to Create a Discovery Note

- A constraint is discovered during PRD writing that was not identified in grilling
- A technical limitation is found during development that affects scope
- A QA run reveals an edge case that wasn't anticipated
- A stakeholder review surfaces a new requirement or blocker
- An assumption is invalidated during implementation

## Lifecycle

`open` → `evaluated` → `applied` | `parked` | `closed`

## Required Fields

`id`, `parent_object`, `discovered_during`, `discovery_date`, `owner`, `finding`, `impact_assessment`, `recommended_action`, `status`

## Linked Objects

- Parent object (PRD, feature, story, etc.)
- Change Notes: `product/objects/change-notes/` (if a change is approved)
- Impact Checks: `product/objects/impact-checks/` (if scope impact is significant)

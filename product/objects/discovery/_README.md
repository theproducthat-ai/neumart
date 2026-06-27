# Discovery Sessions

**Object type**: `discovery`
**ID format**: `DISC-[REQ-ID]-[description].md` (e.g., `DISC-REQ-0003-checkout-flow.md`)
**Owner**: Product Manager
**Template**: `product/os/templates/DISCOVERY_SESSION_OBJECT_TEMPLATE.md`

## What Belongs Here

**Discovery Session Objects** — structured records of a complete discovery session. A discovery session is a deliberate, facilitated activity: a grilling session, discovery workshop, stakeholder interview, user research session, or engineering deep-dive.

This folder stores the session record itself — not the individual notes taken within it, and not the evidence gathered from it.

## Boundary With Related Folders

| Folder | Contains | Example |
|---|---|---|
| `discovery/` (this folder) | **Session object** — who, when, what was explored, findings summary, decisions made, next steps | `DISC-REQ-0003-checkout-discovery.md` |
| `discovery-notes/` | **Midstream notes** — new information discovered during active work (PRD writing, design, dev, QA). Not a session — a note captured in the flow of delivery work. | `DSN-0001.md` |
| `discovery-evidence/` | **Research evidence** — structured evidence gathered from user interviews, surveys, analytics, usability tests, support ticket patterns, competitive insights | `EVD-0001.md` |

## When to Create a Discovery Session Object

- A grilling session or discovery workshop is conducted for a request
- A discovery sprint produces findings that need to be structured
- A deep-dive with engineering identifies constraints that should be recorded
- A user research session produces findings that feed a PRD

## Required Fields

`id`, `request_ref`, `session_type`, `session_date`, `participants`, `questions_explored`, `key_findings`, `decisions_made`, `open_questions`, `next_steps`

## Relationship to Other Objects

Discovery sessions typically feed updated `requests/`, `prds/`, or `ux-research/` objects. They are inputs, not outputs.

In V2, short grilling notes are embedded in `requests/` objects as `grilling_notes:` fields. Use this folder for longer, structured discovery sessions that produce standalone records worth preserving.

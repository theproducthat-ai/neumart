# Figma Workflow — Nuemart

Describes how Figma and design artifacts integrate with the Product OS.

---

## Design Input Modes

The Product OS supports seven ways a user can provide or request design:

| Mode | Trigger | AI Action |
|------|---------|-----------|
| 1. User provides Figma link | "Here is the Figma link: ..." | Create FIG object, link to screen/PRD/feature |
| 2. User provides screenshot | Attaches image | Create SCT object, extract context |
| 3. User provides rough wireframe | "Here is a rough wireframe..." | Create WFR object, note low-fidelity |
| 4. User provides flow diagram | "Here is a flow diagram..." | Create FLW object |
| 5. User asks AI to create a design brief | "Create a design brief for ..." | Generate DESIGN_BRIEF using template |
| 6. User asks AI to create Figma-ready spec | "Create a Figma spec for ..." | Generate FIGMA_BUILD_SPEC |
| 7. User asks AI to build in Figma | "Build this in Figma" | Invoke Figma integration if available |

---

## Mode 7: Figma Integration

A Figma MCP integration is available in this environment. When the user asks to:
- Create a screen in Figma
- Generate a component in Figma
- Update a Figma design
- Create a diagram in FigJam

The AI should use the Figma MCP tools (`use_figma`, `generate_diagram`, etc.).

Before using `use_figma`, the `/figma-use` skill must be invoked.

---

## Design Status Tracking

Every design artifact must have a `design_status`:

| Status | Meaning |
|--------|---------|
| not-started | No design exists yet |
| in-progress | Design is being created |
| review | Design ready for feedback |
| approved | Design approved for development |
| implemented | Design built in code |
| outdated | Design no longer matches implementation |

---

## Design Blocking Rule

If a feature or story is marked as requiring design (`design_required: yes`) and no Figma link, screenshot, or wireframe exists:
- The feature/story must be marked as `blocked: design`.
- The AI must not generate implementation code without at least a design brief or wireframe.
- The AI must ask for design input or offer to create a design brief.

---

## Handoff

When design moves to `approved`:
1. The Figma link is recorded on the screen object.
2. The FIGMA_BUILD_SPEC is created (if not already).
3. The feature/story is updated to reflect design-approved status.
4. Development can proceed.

---

## Related
- Policy: `product/os/policies/FIGMA_REFERENCE_RULES.md`
- Templates: `FIGMA_LINK_TEMPLATE.md`, `SCREENSHOT_REFERENCE_TEMPLATE.md`, `WIREFRAME_REFERENCE_TEMPLATE.md`, `FIGMA_BUILD_SPEC_TEMPLATE.md`
- Existing template: `product/os/templates/FIGMA_HANDOFF_TEMPLATE.md`
- Screen objects: `product/objects/screens/`

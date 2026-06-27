# Figma Reference Rules

Governs how Figma designs, screenshots, and wireframes are captured, linked, and used in the Product OS.

---

## 1. Capture Every Design Input

When a user provides any design-related input, the AI must create the appropriate reference object immediately. Do not process design input without capturing it.

| Input Type | Object to Create |
|-----------|-----------------|
| Figma URL | FIG-NNN (FIGMA_LINK) |
| Screenshot / image | SCT-NNN (SCREENSHOT_REFERENCE) |
| Wireframe (low-fi) | WFR-NNN (WIREFRAME_REFERENCE) |
| Flow diagram | FLW-NNN (FLOW_DIAGRAM_REFERENCE) |
| Figma-ready spec request | FIGMA_BUILD_SPEC |
| Design brief request | DESIGN_BRIEF |

---

## 2. Linking Design to Product Objects

Every design reference must be linked to at least one:
- Screen (SCR-NNN)
- Feature (FEA-NNN)
- PRD (PRD-NNN)
- Story (UST-NNN)
- Roadmap item (RMI-NNN)

A design reference that is not linked to any product object is orphaned. Flag these for review.

---

## 3. Required Fields for Figma Links

Every FIG object must have:
- `figma_link` (the URL)
- `figma_page` (the page name or N/A)
- `figma_frame` (the frame name or ID, or N/A)
- `linked_screen` or `linked_feature`
- `design_status`

---

## 4. When Design Is Mandatory

Design is mandatory (must exist before development) when:
- The feature is user-facing (visible to customer or admin).
- The feature introduces a new screen.
- The feature significantly changes an existing screen's layout.

Design is not mandatory (development can proceed without it) when:
- The change is backend-only.
- The change is a micro-interaction or small copy change.
- The engineering owner confirms design is not needed.

---

## 5. Missing Design Handling

If design is mandatory and no design exists:
1. Mark the feature/story as `blocked: design`.
2. Create an open question (OPQ) for the design owner.
3. Offer to create a DESIGN_BRIEF or FIGMA_BUILD_SPEC as a starting point.
4. Do not generate implementation code until design is provided or explicitly waived.

---

## 6. Figma Integration Usage

When the Figma MCP integration is available:
- Use it to create, read, or update Figma files when the user requests.
- Always invoke `/figma-use` skill before calling `use_figma`.
- Confirm with the user before pushing content to a Figma file (non-reversible from the OS side).
- After creating a Figma artifact, create a FIG object with the resulting URL.

When the Figma integration is not available:
- Create a detailed FIGMA_BUILD_SPEC document that a designer can use to build in Figma manually.

---

## 7. Outdated Design

If the screen object or feature indicates that the implementation has diverged from the Figma design:
- Set `design_status = outdated` on the FIG object.
- Create a DSN (discovery note) capturing the divergence.
- Flag for design review before the next release.

---

## Related
- Workflow: `product/design/FIGMA_WORKFLOW.md`
- Templates: `FIGMA_LINK_TEMPLATE.md`, `SCREENSHOT_REFERENCE_TEMPLATE.md`, `WIREFRAME_REFERENCE_TEMPLATE.md`, `FIGMA_BUILD_SPEC_TEMPLATE.md`
- Policy: `product/os/policies/SCREEN_REFERENCE_RULES.md`

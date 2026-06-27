# Figma Handoff Rules

**Version**: 2.0  
**Owner**: Designer

---

## Purpose

Defines the standard for design handoff to engineering. A clean handoff reduces back-and-forth, ensures designs are implemented correctly, and speeds up development.

---

## Handoff Checklist

Before marking a design as `handed-off`, the designer must confirm:

### Structure and Organisation
- [ ] Figma file is in the shared team workspace (not personal drafts)
- [ ] Pages are named clearly (e.g., "Screens", "Components", "Archive")
- [ ] Frames are named after their screen name (e.g., "PLP — Desktop", "PLP — Mobile")
- [ ] All states are in separate frames, clearly labelled
- [ ] No orphaned or WIP layers in the handoff scope

### Visual Specification
- [ ] All spacing uses 4px / 8px grid
- [ ] Colours reference design system tokens (not hardcoded hex values)
- [ ] Typography uses defined text styles
- [ ] Icons are from the icon library (not custom drawn)
- [ ] All assets (images, icons) are properly named and exportable

### Content
- [ ] No placeholder text ("Lorem ipsum")
- [ ] Real or representative copy is used
- [ ] Edge case content lengths accounted for (long names, long text)

### Screen States
- [ ] All required states are designed (see `SCREEN_STATE_RULES.md`)
- [ ] States are clearly labelled (Loading, Empty, Error, etc.)
- [ ] Mobile version is included for all customer-facing screens

### Interaction Notes
- [ ] Complex interactions are annotated (transitions, gestures, conditional logic)
- [ ] Where the design differs from existing patterns, an explanation is provided
- [ ] Any unusual implementation requirements are noted for engineering

### Accessibility
- [ ] Colour contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
- [ ] Focus order is logical
- [ ] ARIA labels are noted for interactive elements
- [ ] Text alternatives are specified for images

---

## How to Hand Off

1. Move Figma file to the team workspace
2. Enable "Anyone at the organisation can view" (or appropriate access)
3. Enable Dev Mode in Figma (for engineering self-service measurement)
4. Create a `FIGMA_HANDOFF_TEMPLATE.md` object in `objects/designs/`
5. Notify the engineering lead via Slack with the Figma link
6. Update design object status to `handed-off`

---

## During Implementation

- Engineering should use Figma Dev Mode for measurements (not ask the designer for every spacing value)
- If engineering finds an ambiguity or implementation challenge, raise it in Slack — designer responds within 4 business hours
- Minor adjustments during implementation are acceptable; significant changes require design review

---

## Post-Implementation Review

When engineering completes implementation:
- Designer reviews the built feature against the Figma design
- If divergence is found: minor → note in known issues; major → file a bug (`BUG-XXXX`)
- Designer confirms implementation in Figma handoff object

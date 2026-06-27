# Design Operating Model

**Version**: 2.0  
**Owner**: Designer / Product Lead

---

## Purpose

Defines how design work is executed, reviewed, and handed off in the Neumart product team. Ensures consistent quality, avoids design debt, and makes the design-to-engineering handoff smooth.

---

## When Design Is Required

### Design Is Mandatory
- Standard Feature or Strategic Initiative lane
- Any new screen or screen layout change
- Any change to a key user flow (checkout, order, login, cart)
- Any client-facing feature
- Any admin interface with complex workflows

### Design May Be Skipped
- Fast Fix lane (bug fix with no UI change)
- Small Enhancement with copy-only change
- Internal/admin tool with no UX complexity
- Tech debt with no user-visible change
- Engineering decides to use an existing pattern without modification

### When to Use Figma vs. Sketch/Other
- **Figma is mandatory** for all new screen designs and updates
- All design files must be in the shared Figma workspace
- No design work is accepted from local tools or screenshots

---

## Design Process

```
Brief Created → Design Exploration → Review → Approve → Handoff
```

### 1. Brief Created
- Product Manager creates a design brief (`objects/designs/DES-XXXX.md`)
- Brief includes: feature context, scope, constraints, required screen states
- Designer acknowledged the brief

### 2. Design Exploration
- Designer produces low-fidelity wireframes
- Designer runs discovery with Product Manager and Engineering Lead (as needed)
- Designer produces high-fidelity screens for all required states

### 3. Review
- Product Manager reviews for correctness
- Engineering Lead reviews for technical feasibility
- QA Lead reviews for testability (optional but encouraged)

### 4. Approve
- Product Manager signs off
- Design object status → `approved`

### 5. Handoff
- Figma file is in handoff-ready state
- Designer completes `FIGMA_HANDOFF_TEMPLATE.md`
- Engineering receives notification
- Design object status → `handed-off`

---

## Design Review Standards

A design is review-ready when:
- [ ] All required screen states are designed (see `SCREEN_STATE_RULES.md`)
- [ ] Component usage is documented
- [ ] Mobile version is included
- [ ] Accessibility notes are included
- [ ] No placeholder text or missing content
- [ ] Figma layers are named clearly

---

## Design Debt Policy

Design debt occurs when:
- A feature ships without complete screen states
- A feature ships with inconsistent component usage
- A feature ships without mobile design

**Policy**: Design debt is tracked as a known issue in `objects/known-issues/` and must be addressed in the next release of that feature.

---

## Design System

- All designs must use existing design system components where available
- New components require a design decision (`objects/design-decisions/`) before creation
- Component library is maintained in Figma and tracked in `objects/components/`

---

## Admin vs. Customer Design Standards

| Aspect | Customer-Facing | Admin-Facing |
|---|---|---|
| Design fidelity required | High | Medium |
| Mobile required | Always | Desktop-first (mobile: best effort) |
| Accessibility required | WCAG AA | WCAG AA |
| Animation/transitions | Optional | Minimal |
| Branding consistency | Critical | Standard |

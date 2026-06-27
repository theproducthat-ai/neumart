# Accessibility Checklist

**Version**: 2.0  
**Standard**: WCAG 2.1 Level AA  
**Owner**: Designer / Engineering Lead

---

## Policy

All customer-facing screens must meet WCAG 2.1 Level AA. Admin screens should aim for Level AA but may accept Level A as a minimum.

Accessibility is not optional. Inaccessible features block users with disabilities and create legal risk.

---

## Design Checklist

### Colour and Contrast
- [ ] Text contrast ratio ≥ 4.5:1 for normal text
- [ ] Text contrast ratio ≥ 3:1 for large text (≥18pt or 14pt bold)
- [ ] UI component contrast ratio ≥ 3:1 (buttons, inputs, icons)
- [ ] Information is not conveyed by colour alone (also uses shape, label, pattern)
- [ ] Error states are not indicated only by red colour

### Text and Typography
- [ ] Minimum body text size is 16px (customer-facing)
- [ ] Line height is ≥ 1.5 for body text
- [ ] Text can be resized to 200% without losing content or functionality
- [ ] Underlines or other non-colour cues used for links (not just colour)

### Interactive Elements
- [ ] All interactive elements have a visible focus indicator
- [ ] Focus order is logical and follows visual order
- [ ] Touch targets are ≥ 44×44px on mobile
- [ ] Hover and focus states are identical or similarly informative
- [ ] Buttons and links have descriptive labels (not "Click here")

### Forms
- [ ] All form fields have visible labels (not placeholder-only)
- [ ] Error messages are specific and actionable
- [ ] Required fields are clearly indicated
- [ ] Form fields have autocomplete attributes where applicable

### Images and Media
- [ ] Meaningful images have alt text
- [ ] Decorative images have empty alt=""
- [ ] Videos have captions or transcripts (if any)
- [ ] No content flashes more than 3 times per second

### Screen States
- [ ] Empty states communicate clearly without relying on icons alone
- [ ] Error states are announced to screen readers (not just visual)
- [ ] Loading states have accessible text alternative (aria-live region or hidden text)

---

## Engineering Checklist

### Semantic HTML
- [ ] Headings are in logical order (h1 → h2 → h3)
- [ ] Lists use `<ul>` / `<ol>` / `<li>` correctly
- [ ] Buttons use `<button>` (not `<div onClick>`)
- [ ] Links use `<a href>` (not `<div onClick>`)
- [ ] Tables use proper table markup with headers

### ARIA
- [ ] ARIA roles are used only when necessary (prefer semantic HTML)
- [ ] `aria-label` added to icon-only buttons
- [ ] Dynamic content updates announced via `aria-live`
- [ ] Modal dialogs trap focus correctly and close with Escape

### Keyboard Navigation
- [ ] All functionality is accessible via keyboard alone
- [ ] Tab order matches visual order
- [ ] Custom dropdowns and menus are keyboard-navigable
- [ ] Focus is managed correctly when modals open/close

---

## Accessibility Testing

- [ ] Manual keyboard-only navigation test
- [ ] Screen reader test (NVDA + Chrome or VoiceOver + Safari)
- [ ] Automated scan with axe DevTools or Lighthouse
- [ ] Colour contrast verified with Figma plugin or browser extension
- [ ] Mobile touch target size verified

---

## Exceptions

If an accessibility requirement cannot be met for a specific feature:
1. Document the exception in the design brief
2. Get Product Lead sign-off
3. Log as a known issue with a target resolution date

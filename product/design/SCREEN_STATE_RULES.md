# Screen State Rules

**Version**: 2.0  
**Owner**: Designer / Product Lead

---

## Purpose

Every screen must be designed for all applicable states. Incomplete screen states lead to poor user experience and engineering uncertainty. This document defines required states and when they apply.

---

## Required States (All Screens)

### 1. Loading State
**When**: Any time the screen loads data asynchronously
**Requirement**: 
- Skeleton screen or loading spinner
- Should match the layout of the loaded state (skeleton preferred over spinner for content-heavy pages)
- No empty white space visible during loading

**Example**: Product listing page shows product card skeletons while fetching products

### 2. Empty State
**When**: A list or collection has zero items
**Requirement**:
- Clear message explaining why it's empty
- Helpful action (e.g., "Add your first product", "Browse products")
- Illustration or icon (where appropriate)
- Never show an empty container with no message

**Example**: Cart has zero items → "Your cart is empty. Start shopping →"

### 3. Error State
**When**: An API call fails, network error, or unexpected server error
**Requirement**:
- User-friendly error message (no technical jargon)
- Action to retry or recover
- Support contact or escalation path for critical errors
- Different handling for: network error, server error, not found, forbidden

**Example**: "We couldn't load your orders. Try again or contact support."

### 4. Success State
**When**: A user completes an action (form submission, order placement, profile update)
**Requirement**:
- Clear confirmation message
- What happens next (e.g., "You'll receive a confirmation email", "Your order is being prepared")
- Navigation path back to main flow

**Example**: Order placed → "Order confirmed! Track your order →"

### 5. Disabled State
**When**: An action or element is present but unavailable
**Requirement**:
- Visually distinct from enabled state (not just greyed out — must be accessible)
- Tooltip or explanation of why it's disabled (if not obvious)
- Never hide unavailable actions — show them as disabled

**Example**: "Add to cart" button is disabled when stock is 0 → tooltip: "Out of stock"

### 6. Mobile / Responsive State
**When**: Always — all customer-facing screens; admin screens must at minimum not break
**Requirement**:
- Minimum 375px viewport for customer-facing
- All interactive elements are touch-friendly (min 44px target size)
- Navigation adapts for mobile
- Text is legible without zoom

### 7. Permission Denied State
**When**: A user attempts to access a resource or action they don't have permission for
**Requirement**:
- Clear message about missing permission
- Who to contact to request access (if applicable)
- Never show a broken UI — show the permission denied state gracefully

**Example**: Admin-only page accessed by delivery agent → "You don't have access to this page."

---

## Additional States (Apply Where Relevant)

### 8. Partial / Degraded State
When only some data is available:
- Show available data
- Clearly indicate what is missing and why

### 9. First-Time User State
When a user has never used a feature:
- Onboarding hint or empty state with guidance
- First-time tooltips where appropriate

### 10. Search / Filter — No Results
Different from general empty state:
- "No results found for [search term]"
- Suggestions to refine the search
- Link to full unfiltered view

---

## Screen State Checklist in Design Brief

Every `DES-XXXX.md` design brief must include:

```yaml
required_states:
  loading: true/false
  empty: true/false
  error: true/false
  success: true/false
  disabled: true/false
  mobile: true/false
  permission_denied: true/false
```

If a state is marked `false`, the designer must provide a reason in the design brief notes.

---

## State Coverage in QA

QA must test all designed states. If a state was not designed, QA must flag it as a gap.

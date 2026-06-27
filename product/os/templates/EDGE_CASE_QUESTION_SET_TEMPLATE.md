---
id: ""                               # e.g. ECC-REF-001
object_type: EdgeCaseQuestionSet
title: ""
status: ""                           # active | archived
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# EdgeCaseQuestionSet

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Edge Case Question Set object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/edge-case-question-sets/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Edge Case Question Set — Reference Library

This is the AI reference library for generating feature-specific edge case questions. When a feature request arrives, use the feature type to select the relevant question sets from each dimension, then adapt them to the specific feature.

Do not copy this file verbatim into a checklist. Use it as source material to generate tailored, specific questions.

---

## How to Use

1. Identify the feature type (Section A).
2. Select the relevant dimension sections (Section B).
3. For each section, choose questions that apply to this specific feature.
4. Rewrite questions to be specific — replace `[feature]` with the actual feature name.
5. Assign classification and severity based on the feature's risk profile.
6. Suggest a recommended default wherever one exists.

---

## Section A — Feature Type Quick-Reference

| Feature Type | Must-Cover Dimensions |
|-------------|----------------------|
| Content carousel / banner | 1, 2, 3, 4, 5, 8, 9, 12, 13, 18, 20 |
| Cart / checkout enhancement | 1, 2, 3, 6, 9, 13, 14, 16, 18, 20 |
| Payment / wallet | 1, 3, 6, 9, 14, 15, 16, 18, 20 |
| User profile / QR / account | 1, 2, 6, 7, 14, 19 |
| Order management | 1, 2, 3, 6, 9, 10, 11, 16 |
| Admin tooling / reports | 2, 3, 6, 8, 12, 13, 14 |
| Search / filter / sort | 1, 2, 3, 4, 5, 7, 13, 19 |
| Notification (push/email/SMS) | 6, 9, 10, 15, 16, 20 |
| Delivery / tracking | 1, 2, 3, 7, 10, 11, 15, 16 |
| Loyalty / wallet / points | 9, 14, 16, 17, 20 |
| Onboarding / auth flows | 1, 3, 6, 14, 16 |
| Analytics / dashboards | 2, 3, 6, 7, 12, 13, 14 |
| Third-party integration | 3, 7, 14, 15, 16, 18 |
| Feature flags / experiments | 6, 8, 12, 18 |
| Data migration | 7, 14, 16, 17, 18 |
| Product filtering | 1, 2, 3, 4, 5, 7, 13, 19 |
| Coupon / discount | 9, 14, 16, 18, 20 |

---

## Section B — Question Bank by Dimension

### Dimension 1 — User Experience

**First use / onboarding:**
- What does the user see the very first time they encounter this feature?
- Is there a tooltip, onboarding hint, or guided flow?
- What happens if the user dismisses the onboarding?

**Navigation and flow:**
- What happens when the user clicks the browser Back button mid-flow?
- What happens if the user navigates away before completing an action?
- Is there unsaved-changes protection?
- What is the expected back-navigation destination?

**Boundary conditions:**
- What happens at the minimum possible value (1 item, 0 balance, etc.)?
- What happens at the maximum possible value (1000 items, max order value, etc.)?
- What is the character or item limit, and what happens when exceeded?

**Interruptions:**
- What happens if the user's session expires mid-flow?
- What happens if the app is backgrounded on mobile during a critical action?

**Accessibility:**
- Are all interactive elements keyboard accessible?
- Do screen readers announce state changes?
- Are colour contrast requirements met?

---

### Dimension 2 — Empty State

- What does the UI show when there is no data at all (new user, empty collection)?
- Is the empty state informative? Does it tell the user why nothing is there?
- Is there a CTA in the empty state to guide the user (e.g., "Browse products", "Add your first item")?
- Is the empty state the same for all user roles, or different for admin vs. customer?
- What if a filter or search returns no results — is this a separate empty state?

---

### Dimension 3 — Error States

- What does the user see if the page fails to load?
- What does the user see if a specific component fails to load while the rest of the page works?
- What does the user see if form submission fails?
- Is the error message specific enough to help the user recover?
- Is there a "Try again" button?
- Are validation errors shown inline at field level, or only at form level?
- What happens if the error persists after retrying?

---

### Dimension 4 — Loading States

- Is there a skeleton loader or spinner while data loads?
- Does the layout shift when content arrives (CLS)?
- What happens if loading takes more than 3 seconds?
- Is there a timeout after which the user sees an error?
- Are there independent loading states for different parts of the screen?

---

### Dimension 5 — Mobile / Responsive

- Does this work correctly at 390px viewport?
- Does this work on tablet (768px)?
- Are touch targets at least 44px?
- Does any horizontal scrolling appear unintentionally?
- Is swipe supported where expected (carousels, drawers)?
- Does the layout reflow correctly between portrait and landscape?
- Does the feature work on slow 3G connections?

---

### Dimension 6 — Permissions and Roles

- Which user roles can see this feature?
- Which user roles can interact with or modify this feature?
- What does a guest (unauthenticated) user see?
- What does a customer see that an admin should not, and vice versa?
- What happens if a customer tries to access an admin action?
- Is the permission check happening server-side (Convex function), not just on the frontend?
- Can a customer affect another customer's data through this feature?

---

### Dimension 7 — Data Availability

- What if the data this feature depends on is missing (null, undefined)?
- What if the data has not been populated yet (new user, new product)?
- What if a related record was deleted but is still referenced?
- What if the data source returns partial data?
- What if real-time data is stale (Convex subscription lag)?
- What if an external data source (API) is unavailable?

---

### Dimension 8 — Admin / Configuration

- Is there an admin interface for this feature?
- Who can access the admin controls for this feature?
- What are the defaults if admin has not configured anything?
- Can configuration changes be previewed before going live?
- Is there a way for admin to override or intervene in a specific user's experience?
- Is there an audit trail for admin changes?
- Can admin controls break the customer experience if misconfigured?

---

### Dimension 9 — Business Rules

- Under what conditions does this feature apply (order value, user type, geography)?
- Are there limits (maximum uses, minimum amounts, per-user quotas)?
- Can multiple instances of this feature apply at the same time (stacking)?
- What is the priority or precedence if multiple rules apply?
- Are there expiry dates or time windows?
- What happens at edge cases of the business rule (exactly at minimum, exactly at maximum)?
- What happens if the business rule changes while a transaction is in progress?
- Who is authorised to change business rules for this feature?

---

### Dimension 10 — Operational

- Will this feature generate operational work (manual reviews, approvals, reconciliation)?
- Can operations staff intervene or override?
- Are there notifications to operations when things go wrong?
- What is the process if something needs to be manually corrected?
- Does this feature need to be monitored in real-time?

---

### Dimension 11 — Support

- What are the top 3 support questions this feature will generate?
- Can support staff see the user's state for this feature?
- Can support staff undo or correct a mistake made through this feature?
- Does support need a new SOP before this feature ships?
- Is there a user-facing help text, tooltip, or FAQ needed?

---

### Dimension 12 — Analytics / Tracking

- Which events must be tracked (view, click, complete, error, abandon)?
- Where are analytics events sent? What is the event naming convention?
- Is there a funnel or conversion tracking requirement?
- Who is responsible for this feature's analytics?
- What does the success metric for this feature look like in an analytics dashboard?
- What happens to analytics if the feature is behind a feature flag?

---

### Dimension 13 — Performance

- Does this feature add data-fetching to a high-traffic page?
- Does it use pagination or potentially fetch unbounded data?
- Are images lazy-loaded?
- Is there a risk of CLS (layout shift)?
- Does this feature have a CDN or caching strategy?
- Does this feature meet the performance budget in `PERFORMANCE_GUARDRAILS.md`?
- What is the expected database read count per page load?

---

### Dimension 14 — Security / Privacy

- Does this feature expose user data that other users should not see?
- Does it accept user input? Is that input validated server-side?
- Does it store or transmit sensitive data (PII, payment info)?
- Is the auth check in the Convex function, not just the UI?
- Does this feature require a security review per `SECURITY_GUARDRAILS.md`?
- Are there logging or audit requirements for this feature?

---

### Dimension 15 — Integration

- Does this feature call an external API?
- Is the external API's reliability SLA acceptable for this feature's criticality?
- Are rate limits, quotas, or costs understood?
- Is the API contract documented in `product/objects/api-contracts/`?
- What is the fallback if the external API is unavailable?
- Is there authentication required for the external API?

---

### Dimension 16 — Failure / Retry

- If the critical action in this feature fails (network error, timeout), what happens?
- Is the action idempotent? Can it be safely retried?
- Does the UI show the right state after a failure (not stuck in loading)?
- Is there a retry mechanism, and does the user control it?
- Are partial failures handled (e.g., order created but payment not completed)?
- Is there a way to recover from a partial failure without customer support?

---

### Dimension 17 — Dependencies

- Does this feature depend on another feature or system not yet built?
- If the dependency is not ready, can this feature still ship in a degraded state?
- Does this feature require a schema change that needs to be deployed first?
- Does this feature require a third-party integration that is not yet confirmed?

---

### Dimension 18 — Rollback

- If this feature causes a production issue, can it be disabled without a code deploy?
- Is a feature flag required?
- If the feature writes data, can that data be safely removed if the feature is rolled back?
- Is there a documented rollback procedure?
- Who is responsible for executing the rollback?

---

### Dimension 19 — Future Scalability

- Does the current approach work at 10x the current data volume?
- Are there hardcoded limits (e.g., max 10 items) that will create tech debt?
- Does the data model support the next obvious enhancement without breaking changes?
- Is there a design decision being made now that locks in a specific approach permanently?

---

### Dimension 20 — Abuse / Misuse

- Can this feature be exploited for financial gain (coupon stacking, reward farming, refund abuse)?
- Can it be spammed (repeated clicks, bot submissions)?
- Is there rate limiting or per-user quotas?
- What is the worst-case impact if abuse occurs?
- Is there a monitoring or alerting mechanism for abuse detection?
- Does this feature require KYC or identity verification to mitigate fraud risk?

---

## Section C — Feature-Specific Question Examples

### Content Carousel / Promotional Banner

**Content and source:**
- What content appears in the carousel: promotional banners, featured products, categories, offers, or custom images?
- Who manages carousel content: hardcoded, admin CMS, or Convex-stored data?
- What happens if no carousel content is available or all items are inactive?
- What happens if only one item is available?
- Should inactive or expired items be hidden automatically?

**Interaction:**
- Should it auto-scroll? At what interval?
- Should it support manual swipe on mobile?
- Should it show navigation arrows, dots, both, or none?
- What happens when a slide is tapped/clicked?
- Should it pause on hover (desktop) or on touch (mobile)?

**Display:**
- Where does it appear — top of page, below header, inline?
- What is the height on desktop and mobile?
- What is the aspect ratio of images?
- Is there an image fallback if an image fails to load?
- Should it be hidden on very slow networks?

**Business rules:**
- Can multiple items be active simultaneously?
- Is there a display priority or ordering control?
- Do items have start and end dates?
- Should items be audience-specific?

**Admin:**
- Can admin create, edit, delete, and reorder items?
- Can admin upload images?
- Can admin preview before publishing?
- Can admin schedule future items?

**Analytics:**
- Should item views, clicks, and swipes be tracked?
- Should conversion from carousel click to purchase be tracked?

**Technical:**
- Where does carousel data come from? New Convex table needed?
- Does this need a feature flag for phased rollout?
- Are images lazy-loaded to avoid performance impact?
- Is caching needed for carousel data?

**QA:**
- Zero items
- One item (no navigation)
- Many items (pagination works)
- Broken image
- Mobile swipe
- Desktop arrow navigation
- Expired item hidden
- Inactive item hidden
- Slow network
- Click action navigates correctly
- Admin create/edit/delete if applicable

---

### Coupon / Discount at Cart

**Business rules:**
- Is it percentage-based, fixed amount, or free shipping?
- What is the minimum order value for coupon eligibility?
- Can multiple coupons be applied at the same time?
- Can a coupon be used more than once by the same user?
- Does the coupon expire?
- Is the coupon applicable to all products or specific categories?
- What happens if coupon is applied and then item is removed from cart?

**User experience:**
- Where is the coupon input: cart page, checkout, or both?
- What is the feedback on invalid coupon?
- Is the discount shown clearly before payment?
- Can the user remove an applied coupon?

**Technical:**
- Is coupon validation real-time or on checkout submission?
- Can coupons be applied after payment has started?
- Is coupon usage logged per user?
- How is the coupon validated server-side (Convex)?

**Failure:**
- What if coupon validation service fails?
- What if coupon expires between application and payment?

**Abuse:**
- Can coupons be shared publicly?
- Is there a per-user or global usage limit?
- Can bots generate unlimited coupon attempts?

---

### Order Cancellation

**Business rules:**
- Within what time window can an order be cancelled?
- Which order statuses allow cancellation?
- Can partial orders be cancelled (some items only)?
- Who initiates cancellation: customer, admin, or both?
- What triggers a refund, and how quickly?

**User experience:**
- Where is the cancel button? Is there a confirmation step?
- What does the user see after cancellation?
- Is there a reason field for the cancellation?

**Operations:**
- Is there an ops notification when an order is cancelled?
- Does cancellation trigger any fulfilment system changes?
- What happens if the order is already out for delivery?

**Support:**
- Can support cancel an order on behalf of a customer?
- Is there a log of who cancelled, when, and why?

**Failure / retry:**
- What if the cancellation request fails?
- What if refund initiation fails after cancellation?
- Is cancellation idempotent?

---

### Admin Report / Dashboard

**Data:**
- What time periods are supported (today, 7 days, 30 days, custom range)?
- What metrics are shown?
- Is the data real-time or aggregated (scheduled)?
- Is there a data freshness indicator?

**Performance:**
- What is the expected query time for the largest date range?
- Is pagination or virtualisation needed for long lists?
- Is there a risk of timeout for heavy queries?

**Permissions:**
- Which admin roles can see this report?
- Are there metrics that only super-admin can see?
- Can reports be exported? By whom?

**Edge cases:**
- What if there is no data for the selected period?
- What if data is partially available (some records missing)?
- What happens if the user selects an end date before the start date?

---

### Payment Gateway Integration

See full coverage in Dimensions 6, 9, 14, 15, 16, 18, 20.

Additional questions:
- What happens if the payment is authorised but not captured?
- What happens if the webhook is received out of order?
- What happens if the order is created but payment never completes?
- How long before an incomplete payment is marked as failed?
- Is idempotency key used for payment creation?
- What is the refund process and timeline?

---

## Related
- Policy: `product/os/policies/FEATURE_EDGE_CASE_DISCOVERY_RULES.md`
- Template: `product/os/templates/FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md`

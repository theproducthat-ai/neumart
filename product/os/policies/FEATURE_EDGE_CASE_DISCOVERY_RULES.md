# Feature Edge Case Discovery Rules

Governs how the AI proactively identifies and manages feature-specific edge cases before PRD finalisation, design, development, and release.

---

## 1. Purpose

Generic request classification is not enough. Every non-trivial feature carries feature-specific risks, unknowns, and decision points that, if unanswered, produce broken flows, bad UX, missed QA coverage, or post-launch incidents.

This policy ensures the AI generates a structured, feature-specific edge case checklist for every significant feature request — not a generic question list, but questions tailored to the nature of the feature being built.

---

## 2. When to Trigger Edge Case Discovery

Trigger edge case checklist generation when:
- A new feature request is received (via `/product-request`, PRD creation, or direct ask).
- A feature is classified as non-trivial (anything larger than a micro-fix or copy change).
- The user explicitly asks: "What edge cases should we consider for this feature?"
- A PRD is being drafted for the first time.
- A new development plan is being created.

Do NOT trigger for:
- Bug fixes (use BUG template instead).
- Copy/text changes with no logic.
- Configuration-only changes with no UX impact.
- Requests already fully defined with acceptance criteria.

---

## 3. Feature Type Identification

Before generating questions, identify the feature type. The feature type determines which dimensions require deeper questioning.

| Feature Type | Examples | High-Risk Dimensions |
|-------------|---------|---------------------|
| Content carousel / banner | Promotional carousel, category banner | Data source, admin control, analytics, performance |
| Cart / checkout enhancement | Coupon, cart summary, mini-cart | Business rules, payment edge cases, session handling |
| Payment integration | Payment gateway, wallet, refund | Security, failure/retry, integration, regulatory |
| User profile / account | QR profile, preferences, address book | Privacy, data availability, roles |
| Order management | Cancellation, tracking, history | Business rules, state machine, support |
| Admin tooling | Reports, bulk actions, configuration | Roles/permissions, performance, data accuracy |
| Search / filter / sort | Product filtering, search | Empty state, performance, mobile UX |
| Notifications | Push, email, SMS, in-app | Delivery failure, user preferences, regulatory |
| Delivery / logistics | Tracking, delivery windows, zones | Integration, failure, operational |
| Loyalty / wallet | Points, wallet balance, redemption | Fraud/abuse, business rules, transaction safety |
| Onboarding / auth flows | Sign-up, KYC, verification | Error states, partial completion, security |
| Analytics / reporting | Admin dashboards, export | Data accuracy, performance, access control |
| Integration (third-party) | Payment, maps, SMS, WhatsApp | API failure, authentication, cost |
| Feature flags / experiments | A/B tests, gradual rollout | Targeting, rollback, analytics |
| Data migration | Schema change, backfill | Safety, rollback, performance |

---

## 4. The 20 Edge Case Dimensions

For every feature, evaluate edge cases across these dimensions. Not every dimension applies to every feature — use judgment, but err toward more questions for high-risk features.

### 1. User Experience Edge Cases
- What happens when the user does something unexpected?
- What happens at the boundaries of the feature (first use, last step, back navigation)?
- What happens when the user is interrupted mid-flow?
- Are there confusing or ambiguous UI states?

### 2. Empty State Edge Cases
- What does the UI show when there is no data?
- What does the UI show on first-time use before any data exists?
- Is the empty state informative and actionable (not just blank)?

### 3. Error State Edge Cases
- What happens when an API call fails?
- What happens when validation fails?
- What happens when the user submits invalid input?
- Is the error message helpful and specific?

### 4. Loading State Edge Cases
- What does the UI show while data is loading?
- Are there skeleton states or spinners?
- What happens if loading takes too long?
- Does the page flash or jump when data arrives?

### 5. Mobile / Responsive Edge Cases
- Does the feature work on small screens (390px)?
- Are touch targets large enough?
- Does it support swipe gestures where appropriate?
- Does layout break at tablet or mid-size screens?
- Does it function on slow mobile networks?

### 6. Permission and Role Edge Cases
- Can all user roles access this feature, or only some?
- What happens when a lower-privileged user tries to access a restricted action?
- Does the admin panel for this feature have separate role rules?
- Are there actions that only the account owner (not support staff) should be able to perform?

### 7. Data Availability Edge Cases
- What if the data this feature depends on is missing, null, or malformed?
- What if an external data source is unavailable?
- What if the data has not been populated yet (new user, new product)?
- What if stale data is shown to the user?

### 8. Admin / Configuration Edge Cases
- Does this feature need an admin control panel?
- Who can configure this feature? What happens if no one configures it?
- What are the defaults if nothing is configured?
- Can configuration be previewed before going live?

### 9. Business Rule Edge Cases
- Are there rules about when this feature applies or does not apply?
- Are there minimum or maximum values?
- Are there eligibility criteria (user type, order value, geography)?
- What happens when business rules conflict?

### 10. Operational Edge Cases
- How will support staff handle issues with this feature?
- Is there a way for operations to override or intervene?
- Does this feature generate operational work (manual reviews, approvals)?
- Is there a notification or alert for operational teams when things go wrong?

### 11. Support Edge Cases
- What support questions will this feature generate?
- Can support staff see what the user is experiencing?
- Can support staff undo or correct a bad state created by this feature?
- Is there a support playbook needed before release?

### 12. Analytics / Tracking Edge Cases
- Which events must be tracked (views, clicks, completions, errors)?
- Are there conversion or funnel tracking requirements?
- Who owns the analytics for this feature?
- What happens if tracking fails?

### 13. Performance Edge Cases
- Does this feature load additional data that could slow the page?
- Does it trigger N+1 queries or unbounded data fetching?
- Should images or heavy assets be lazy-loaded?
- Is caching required or appropriate?
- Does it meet the performance budget in `PERFORMANCE_GUARDRAILS.md`?

### 14. Security / Privacy Edge Cases
- Does this feature expose user data that should be protected?
- Does it allow users to see data they should not?
- Does it accept user input that could be exploited (XSS, injection)?
- Does it store or process sensitive data (payments, PII)?
- Does it require a security review per `SECURITY_GUARDRAILS.md`?

### 15. Integration Edge Cases
- Does this feature depend on a third-party API?
- What happens if the third-party API is down or slow?
- Are there rate limits, quotas, or cost implications?
- Is the API contract documented?

### 16. Failure / Retry Edge Cases
- What happens if a critical action fails (payment, order creation)?
- Is the operation idempotent? Can it be safely retried?
- Does the user receive clear feedback when something fails?
- Is there a fallback or degraded experience?

### 17. Dependency Edge Cases
- Does this feature depend on another feature that is not yet built?
- Does it depend on a third-party integration that is not yet confirmed?
- Does it depend on data migrations or schema changes?
- Is there a risk of this feature shipping before its dependency?

### 18. Rollback Edge Cases
- If this feature causes a production issue, how is it disabled?
- Is a feature flag required?
- Can data written by this feature be safely rolled back?
- Is there a rollback plan documented?

### 19. Future Scalability Edge Cases
- Does the current approach handle 10x the expected volume?
- Are there hardcoded limits that will be hit as the product grows?
- Does the data model support future enhancements without breaking changes?
- Are there architectural choices that will create tech debt later?

### 20. Abuse / Misuse Edge Cases
- Can this feature be exploited (e.g., coupon stacking, fake reviews, reward farming)?
- Are there rate limits or use caps needed?
- Is there a mechanism to detect and block abuse?
- What is the worst-case impact if someone abuses this feature?

---

## 5. Question Classification

Each edge case question must be classified as:

| Classification | Meaning | Blocking? |
|---------------|---------|-----------|
| `must-answer-before-prd` | Cannot write complete PRD without this | Yes — blocks PRD |
| `must-answer-before-design` | Cannot design the screen without this | Yes — blocks design |
| `must-answer-before-development` | Technically ambiguous without this | Yes — blocks dev |
| `must-answer-before-release` | Must be resolved before the feature ships | Yes — blocks release |
| `can-assume-for-mvp` | A sensible default exists; proceed with assumption | No — record assumption |
| `can-defer-to-backlog` | Valid but not needed for MVP | No — create BLI |

---

## 6. Question Severity

| Severity | Definition |
|----------|------------|
| `critical` | Missing this causes a broken flow, data loss, security issue, or payment failure |
| `high` | Missing this causes a bad UX, support escalation, or failed QA |
| `medium` | Improves quality but feature is usable without it |
| `low` | Nice to have; minor polish |

---

## 7. AI Behaviour Rules

### 7.1 Question Generation
- Generate questions **specific to the feature being requested** — not generic questions.
- Use the feature type table in Section 3 to identify high-risk dimensions.
- Generate questions in grouped logical sections (not a random list).
- Provide a `recommended_default` for every question where a sensible default exists.
- Mark the `impact_if_not_answered` clearly.

### 7.2 Question Volume
- For large features (L/XL): generate comprehensive checklist across all relevant dimensions.
- For medium features (M): focus on the 8–10 most relevant dimensions.
- For small features (S/XS): focus on the 3–5 highest-risk dimensions only.
- Never ask questions that clearly don't apply to the feature type.

### 7.3 Answering Flow
When presenting the edge case checklist to the user:
1. Show critical and high-severity `must-answer-before-prd` questions first.
2. Group questions by dimension/section.
3. Suggest a recommended default for each. The user can accept or override.
4. After the user answers (or accepts defaults), mark each question's status.
5. For unanswered non-blocking questions: create BLI or OPQ objects.

### 7.4 Conversion Rules

| Answer Status | AI Action |
|--------------|-----------|
| Answered — affects PRD | Add to PRD requirements section |
| Answered — affects acceptance criteria | Convert to acceptance criterion |
| Answered — affects QA | Convert to QA test case |
| Accepted default | Record assumption in PRD |
| Deferred to backlog | Create BLI |
| Unanswered and blocking | Create OPQ, mark feature as blocked |

### 7.5 Blocking Rules
- Do not finalise a PRD until all `must-answer-before-prd` questions are answered or defaulted.
- Do not proceed to development for payment, security, or auth features until all `critical` questions are answered.
- Do not release a feature with any `must-answer-before-release` question unanswered.

---

## 8. Supported User Commands

```
What edge cases should we consider for this feature?
Ask me all edge cases for [feature name].
Generate edge case checklist for this PRD.
Which edge cases are still unanswered?
Which edge cases are blocking development?
Which edge cases are blocking the PRD?
Which edge cases can be moved to backlog?
Convert answered edge cases into acceptance criteria.
Convert edge cases into QA test cases.
Show me edge cases for [ECC-NNN].
What are the critical edge cases for [feature name]?
```

---

## 9. Checklist Object Structure

See `product/os/templates/FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md` for the full object format.

Each question must capture:
```
edge_case_id:
feature_id:
dimension:
scenario:
question_to_user:
recommended_default:
impact_if_not_answered:
severity:               [critical | high | medium | low]
classification:         [must-answer-before-prd | must-answer-before-design | must-answer-before-development | must-answer-before-release | can-assume-for-mvp | can-defer-to-backlog]
decision_required:      [yes | no]
owner:
status:                 [unanswered | answered | defaulted | deferred | N/A]
answer:
resulting_action:       [add-to-prd | acceptance-criterion | qa-test-case | backlog-item | open-question | none]
resulting_object:       [Object ID]
linked_prd:
linked_story:
linked_qa_case:
```

---

## 10. Integration with `/product-request`

When `/product-request` receives a feature request:
1. Classify the feature type (Section 3).
2. Generate the edge case checklist.
3. Present `must-answer-before-prd` critical + high questions to the user.
4. Accept defaults for `can-assume-for-mvp` questions unless user overrides.
5. Create the edge case checklist object (ECC-NNN).
6. Proceed to PRD only after critical questions are answered.

---

## Related
- Template: `product/os/templates/FEATURE_EDGE_CASE_CHECKLIST_TEMPLATE.md`
- Template: `product/os/templates/EDGE_CASE_QUESTION_SET_TEMPLATE.md`
- Index: `product/indexes/EDGE_CASE_INDEX.md`
- View: `product/views/FEATURE_EDGE_CASE_VIEW.md`
- Policy: `product/os/policies/EDGE_CASE_HANDLING_RULES.md`
- Policy: `product/os/policies/MIDSTREAM_CHANGE_RULES.md`

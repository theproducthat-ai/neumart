# Technical Design Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## When Technical Design Is Required

A technical design (`objects/technical-designs/TD-XXXX.md`) is mandatory when the feature:

- Adds a new API endpoint or changes an existing one in a breaking way
- Requires a database schema change
- Requires a data migration
- Integrates with a third-party service
- Touches payment processing, authentication, or permissions
- Is cross-module (affects 2+ modules)
- Has significant performance implications
- Involves a security-sensitive data flow
- Requires a feature flag with complex rollout logic
- Is estimated at 5+ story points AND has technical uncertainty

## When Technical Design Is Optional (But Encouraged)

- Medium complexity features (3-5 story points) where the approach is mostly clear
- New UI screens with no backend changes (but data flow should still be sketched)

## When Technical Design Can Be Skipped

- Fast Fix: 1-3 story points, root cause clear, fix is obvious
- Small Enhancement: UI-only changes, no new endpoints, no schema changes
- Pure copy/content changes

---

## Technical Design Content Requirements

Every technical design must include:

1. **Problem statement** — what are we solving and why?
2. **Proposed approach** — how will we solve it?
3. **Data model changes** — schema before and after
4. **API changes** — new/modified endpoints (link to `api-contracts/`)
5. **State management** — any client or server state changes
6. **Third-party integration** — approach if applicable
7. **Alternatives considered** — why this approach vs. others
8. **Risks** — technical risks and mitigations
9. **Non-functional requirements** — performance, security, scalability
10. **Implementation plan** — ordered steps

---

## Technical Design Review

Mandatory reviewers:
- Engineering Lead (always)
- Senior Engineer (if Engineering Lead is the author)
- Product Manager (for context and user impact)

Optional reviewers:
- Designer (if complex interaction)
- QA Lead (if testing approach is affected)

**Review SLA**: Technical designs should be reviewed within 2 business days.

---

## Technical Design Approval

- Engineering Lead signs off before development begins
- If engineering team cannot agree on approach, Product Lead makes the call after Engineering Lead presents options

---

## Technical Design and PRD Alignment

A technical design does not replace a PRD. A PRD defines *what* and *why*. A technical design defines *how*.

If a PRD requirement cannot be met by the proposed technical approach, Engineering Lead raises this during technical design review — **not during implementation**.

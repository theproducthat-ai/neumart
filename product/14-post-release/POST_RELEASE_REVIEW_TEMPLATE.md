# Post-Release Review Template

A post-release review is conducted 3–7 days after a significant release. The goal is to learn what went well, what went wrong, and what to improve for the next release.

---

## When to Run a Post-release Review

| Trigger | Notes |
|---|---|
| Major feature release | Always — especially for new modules |
| Bug fix release that followed an incident | Always — understand root cause |
| Release with schema migration | Always |
| After a rollback | Always — mandatory |
| Minor bug fix or copy change | Optional |

---

## Post-release Review Format

```markdown
# Post-Release Review — REL-NNNN — [YYYY-MM-DD]

## Linked Release
- Release: REL-NNNN
- PRD: PRD-NNNN
- QA: QA-NNNN
- UAT: UAT-NNNN

## Review Date
YYYY-MM-DD (3–7 days after release)

## Participants
- Product Owner: [name]
- Developer: [name]

---

## What Went Well
*(List things that worked as planned.)*
- 
- 

## What Did Not Go Well
*(List problems encountered — in QA, UAT, deployment, or post-release.)*
- 
- 

## Incidents or Bugs Found After Release
*(List any production bugs found. Link to BUG_REGISTER.md or INCIDENT_LOG.md.)*
- 
- 

## Root Cause (if incident occurred)
*(What caused the issue? What was the chain of events?)*

## What We Will Do Differently Next Time
*(Concrete actions, not vague intentions.)*
- 
- 

## Product Performance (if measurable)
*(Did the feature achieve its business objective? Any data or observation after release?)*

## Open Items
*(Any follow-up tasks or decisions that must happen as a result of this review.)*
| # | Item | Owner | Due Date |
|---|---|---|---|
| 1 | | | YYYY-MM-DD |
```

---

*Last updated: 2026-06-21*

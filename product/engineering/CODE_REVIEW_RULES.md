# Code Review Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## Purpose

Code review is a quality gate and a knowledge sharing exercise. It is not a gatekeeping exercise. Reviews should be completed within 24 hours to avoid blocking engineers.

---

## Who Reviews What

| PR Type | Minimum Reviewers |
|---|---|
| Feature (Standard Feature+) | Engineering Lead + 1 Senior Engineer |
| Small Enhancement | 1 Engineer |
| Fast Fix / Bug | 1 Engineer (Engineering Lead for critical paths) |
| Tech Debt | 1 Engineer |
| Security/Auth/Payments | Engineering Lead mandatory |
| Database migrations | Engineering Lead mandatory |

---

## What Reviewers Check

### Correctness
- [ ] Does the code solve the stated problem?
- [ ] Does it handle all acceptance criteria edge cases?
- [ ] Is error handling correct?
- [ ] Are all failure modes handled gracefully?

### Security
- [ ] No user input is used unsanitised in queries or commands
- [ ] Auth checks are in the correct place (not just UI gating)
- [ ] No secrets, tokens, or credentials in code
- [ ] PII is handled correctly (not logged, not exposed unnecessarily)
- [ ] Payments and financial logic are reviewed with extra care

### Performance
- [ ] No N+1 database queries
- [ ] No unnecessary data loading
- [ ] Images are appropriately sized and lazy-loaded
- [ ] No blocking operations on the main thread

### Code Quality
- [ ] Code is readable and well-structured
- [ ] No unnecessary complexity (if it's hard to understand, it's probably wrong)
- [ ] Names are descriptive and consistent with the codebase
- [ ] No commented-out code committed
- [ ] No console.log or debug statements

### Tests
- [ ] Tests added for new logic
- [ ] Tests are meaningful (test behaviour, not implementation)
- [ ] Existing tests pass

### Product OS
- [ ] Story reference is in the PR description
- [ ] If new API endpoint: `api-contracts/` object exists
- [ ] If schema change: `data-migrations/` object exists
- [ ] If feature flag: `feature-flags/` object exists

---

## Review SLA

- PRs should be reviewed within **24 business hours** of submission
- If no reviewer is available within 24 hours, Engineering Lead assigns one
- Do not merge your own PRs unless it is a hotfix emergency and documented

---

## Review Feedback Standards

- Be specific and constructive ("This will cause an N+1 query — consider using a batch query here" not "This is wrong")
- Distinguish between blocking issues and suggestions
- Use "nit:" prefix for minor style preferences that are not blocking
- Approve if only nits remain — don't block for minor preferences

---

## Merging

- Require at least 1 approval (more as defined above)
- Require CI/CD checks to pass
- Squash commits on merge (to keep history clean)
- Delete branch after merge

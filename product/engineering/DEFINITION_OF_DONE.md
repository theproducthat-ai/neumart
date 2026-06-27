# Definition of Done

**Version**: 2.0  
**Owner**: Engineering Lead

---

## Purpose

A story, bug, or feature is "done" when it meets all criteria in this document. "Done" means production-ready — not "the code is written."

---

## Story — Definition of Done

A story is done when ALL of the following are true:

### Code Quality
- [ ] Code is written and merged to the main branch
- [ ] Code review completed and approved per `CODE_REVIEW_RULES.md`
- [ ] No lint errors or TypeScript errors
- [ ] No console.log or debug code left in

### Testing
- [ ] Acceptance criteria are met (QA verified)
- [ ] Unit tests added for new logic (where applicable)
- [ ] Integration tests pass
- [ ] No regressions introduced (regression test run)

### Design Fidelity
- [ ] Implementation matches the Figma design
- [ ] All required screen states are implemented (loading, empty, error, success, mobile)
- [ ] Mobile is tested at 375px

### Functionality
- [ ] Feature works in staging environment
- [ ] Feature works for all user roles specified in the story
- [ ] Edge cases from acceptance criteria are handled
- [ ] Error handling is implemented (no unhandled exceptions)

### Performance
- [ ] No significant performance regression introduced
- [ ] Database queries are optimised (no N+1 issues)
- [ ] Images are compressed / lazy loaded where needed

### Observability
- [ ] Errors are logged appropriately
- [ ] Key user actions fire the defined analytics events (`analytics-events/`)
- [ ] Feature flag is in correct state (if used)

### Documentation
- [ ] Any new API endpoints are documented in `objects/api-contracts/`
- [ ] Any schema changes are documented in `objects/data-migrations/`
- [ ] Any major technical decisions are captured in `objects/decisions/`

---

## Bug — Definition of Done

A bug is done when:
- [ ] Root cause is understood
- [ ] Fix is implemented and code reviewed
- [ ] QA verified the fix resolves the bug
- [ ] QA verified no regression
- [ ] Bug object status set to `verified`

---

## Release — Definition of Done

A release is done when:
- [ ] All in-scope stories are `done`
- [ ] QA signoff: `passed`
- [ ] UAT signoff: `approved` (if required)
- [ ] Release notes drafted
- [ ] Support handover complete (if required)
- [ ] Operations readiness confirmed (if required)
- [ ] Feature flags in correct state
- [ ] Rollback plan documented
- [ ] Deployment to production successful
- [ ] Post-deployment smoke test passed

---

## Feature — Definition of Done

A feature is done when:
- [ ] All child stories are done
- [ ] Release object is complete
- [ ] Measurement plan is instrumented
- [ ] Post-release baseline metrics recorded
- [ ] Hypercare plan active (if required)

# Release Review

**Version**: 2.0  
**Owner**: Product Lead  
**Cadence**: Per release (before go-live), 45 minutes

---

## Purpose

The release review is the final gate before a release goes to production. It confirms that all release criteria are met, all stakeholders are informed, and the team is ready to support the release.

---

## Attendees

| Role | Attendance |
|---|---|
| Product Lead | Mandatory |
| Engineering Lead | Mandatory |
| Support Lead | Mandatory (for customer-facing releases) |
| Operations Lead | Mandatory (for customer-facing releases) |
| QA Lead | Mandatory |
| Designer | If design-impacting features in release |

---

## Pre-Release Checklist

This checklist must be completed before the release review meeting.

### Product
- [ ] All stories in release meet Definition of Done
- [ ] Product Lead has signed off on UI/UX in staging
- [ ] Acceptance criteria verified for all features

### Engineering
- [ ] All tests passing on staging
- [ ] Performance verified (no degradation vs. baseline)
- [ ] Feature flags configured and verified
- [ ] Rollback plan documented in release object
- [ ] No open P1/P2 bugs in the release scope

### Design
- [ ] Design fidelity verified on staging (by Designer or Product Lead)
- [ ] All required screen states present
- [ ] Mobile verified at 375px breakpoint

### QA
- [ ] UAT completed and signed off
- [ ] No critical or high severity defects open
- [ ] Regression testing complete

### Support and Operations
- [ ] Support handover document delivered and signed off
- [ ] Operations readiness checklist completed
- [ ] Monitoring/alerting configured

---

## Release Review Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-5 min | Pre-release checklist review (any outstanding items?) | Product Lead |
| 5-15 min | QA sign-off and open defects status | QA Lead |
| 15-25 min | Support and operations readiness confirmation | Support Lead / Ops Lead |
| 25-35 min | Release plan: who does what, when | Engineering Lead |
| 35-40 min | Rollback plan: trigger criteria, who executes | Engineering Lead |
| 40-45 min | Go / No-Go decision | Product Lead |

---

## Go / No-Go Decision

**Go**: All mandatory checklist items complete, no blocking issues, all mandatory attendees approve.

**Conditional Go**: Minor items outstanding with explicit acceptance from Product Lead. Outstanding items tracked as post-release actions with owners and due dates.

**No-Go**: Any of the following are present:
- Open P1 or P2 bug in release scope
- QA or UAT not signed off
- Support handover not completed
- Rollback plan not documented
- Engineering Lead or Product Lead not comfortable

---

## After Go-Live

1. Engineering deploys following [BRANCHING_AND_RELEASE_RULES.md](../engineering/BRANCHING_AND_RELEASE_RULES.md)
2. Engineering Lead confirms successful deployment
3. Smoke test run
4. Support Lead notified release is live
5. Hypercare period begins (if required — see [HYPERCARE_RULES.md](../support-ops/HYPERCARE_RULES.md))

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- `product/engineering/BRANCHING_AND_RELEASE_RULES.md`
- `product/support-ops/OPERATIONS_READINESS_CHECKLIST.md`
- `product/support-ops/HYPERCARE_RULES.md`
- `product/objects/releases/`

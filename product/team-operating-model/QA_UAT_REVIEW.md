# QA / UAT Review

**Version**: 2.0  
**Owner**: Product Lead / QA Lead  
**Cadence**: Weekly (Thursday), 45 minutes

---

## Purpose

The QA/UAT review tracks test coverage for the current sprint, surfaces defects early, and ensures UAT sign-off is on track before the sprint release. It keeps Product Lead and Engineering aligned on quality status.

---

## Attendees

| Role | Attendance |
|---|---|
| Product Lead | Mandatory |
| QA Lead | Mandatory |
| Engineering Lead | Mandatory |
| Designer | Optional (for design fidelity defects) |

---

## Pre-Work

**QA Lead (by Wednesday EOD)**:
- QA test run completed on staging for all sprint stories
- Defects logged in bug objects
- Test coverage summary prepared

**Engineering Lead**:
- All sprint stories deployed to staging by Wednesday EOD

---

## Agenda

| Time | Topic | Owner |
|---|---|---|
| 0-5 min | QA status: stories tested, stories remaining | QA Lead |
| 5-20 min | Open defects: severity and owner assignment | QA Lead |
| 20-30 min | UAT sign-off: which stories are signed off? | Product Lead |
| 30-40 min | Blockers: anything preventing testing or sign-off? | All |
| 40-45 min | Release readiness: will we be ready to release Friday? | Product Lead |

---

## Defect Triage

Defects found in QA/UAT are triaged during the review:

| Severity | Decision |
|---|---|
| Critical/High (blocks release) | Fix before release — Engineering Lead assigns to sprint |
| Medium (workaround exists) | Product Lead decides: fix now or ship with known issue |
| Low (cosmetic) | Log as backlog bug, ship as-is |

**Stories with open Critical or High defects cannot proceed to release until resolved.**

---

## UAT Sign-Off

UAT (user acceptance testing) is completed by Product Lead for each story:
- Product Lead verifies acceptance criteria are met on staging
- Product Lead marks each story UAT-passed in the story object
- Any story failing UAT is returned to Engineering with specific failure notes

**UAT is required for every story before release.** It is not optional.

---

## What "Done" Means for QA

Before a story can be QA-complete:
- [ ] All test cases executed (functional and regression)
- [ ] All acceptance criteria verified
- [ ] All screen states tested (loading, empty, error, success)
- [ ] Mobile tested at 375px
- [ ] No open Critical or High defects against this story

---

## Release Readiness Gate

At the end of the QA/UAT review (Thursday), Product Lead and QA Lead make a joint assessment:
- **Green**: All stories QA and UAT complete, no blocking defects — release on Friday
- **Amber**: Some stories complete, minor defects — release on Friday with known issues documented
- **Red**: Blocking defects open — release blocked, Engineering Lead given until Friday morning to fix

---

## Related Documents

- [PRODUCT_CADENCE.md](PRODUCT_CADENCE.md)
- [RELEASE_REVIEW.md](RELEASE_REVIEW.md)
- `product/engineering/DEFINITION_OF_DONE.md`
- `product/objects/bugs/`

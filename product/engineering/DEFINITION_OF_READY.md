# Definition of Ready

**Version**: 2.0  
**Owner**: Engineering Lead + Product Manager

---

## Purpose

A user story or task is "ready" when it has everything the engineer needs to start work without asking questions. Engineering should only commit to stories in sprint planning that meet the Definition of Ready.

---

## User Story — Definition of Ready

A story is ready when ALL of the following are true:

### Business Context
- [ ] The story is clearly linked to a parent feature (`parent_feature:` is set)
- [ ] The "why" is clear — user role, goal, and outcome are written
- [ ] The story fits in one sprint (if it seems bigger, it should be split)

### Acceptance Criteria
- [ ] At least 3 acceptance criteria are written
- [ ] All acceptance criteria are testable ("Given X, when Y, then Z" format)
- [ ] Edge cases and negative scenarios are included where relevant
- [ ] Out-of-scope items are explicitly stated

### Design
- [ ] If design is required, Figma file is available and handed off
- [ ] All required screen states are designed (loading, empty, error, success, mobile)
- [ ] Design is reviewed and approved by Product Manager

### Technical
- [ ] Engineering Lead has confirmed technical approach
- [ ] No unresolved technical blockers
- [ ] API contracts are agreed (if new/changed endpoints)
- [ ] Data migration approach is confirmed (if schema changes)
- [ ] Performance requirements are understood

### Dependencies
- [ ] All external dependencies are resolved or have a confirmed date
- [ ] Dependent stories are done or can be done in parallel safely

### Estimation
- [ ] Story is estimated in story points
- [ ] Team agrees the estimate is reasonable

---

## Epic — Definition of Ready

An epic is ready for sprint planning when:
- [ ] All child stories are in `ready` status (or at least the first sprint's worth)
- [ ] Epic success criteria are defined
- [ ] Technical design is approved (if required)
- [ ] Release target is agreed

---

## Task — Definition of Ready

A task is ready when:
- [ ] Parent story is clearly identified
- [ ] Specific deliverable is described
- [ ] Assignee is identified
- [ ] No blockers

---

## What Happens If a Story Is Not Ready?

1. Product Manager is responsible for making it ready before sprint planning
2. Engineering Lead can reject a story from the sprint if DoR is not met
3. Story goes back to `draft` status with specific missing items noted
4. Product Manager has 1 sprint cycle to make it ready, then re-evaluate priority

---

## Fast Fix Exception

Fast Fix lane stories do not require full DoR — they only need:
- Clear bug description with reproduction steps
- Confirmed root cause
- Engineering Lead agreement on the fix approach

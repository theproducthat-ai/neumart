# Nuemart — Request Status Rules

This document defines the complete lifecycle of a request through the Product OS. Every stage has a definition, entry criteria, required documents and exit criteria.

---

## Status Lifecycle Overview

```
[Intake]
  New
  └─ Reference Pending

[Classification]
  Under Classification
  └─ Under Grilling

[Evaluation]
  Under Evaluation
  └─ Under Impact Assessment

[Design]
  Approved for PRD
  └─ PRD Created
      └─ Stories Created

[Development]
  Development Planned
  └─ Build Prompt Created
      └─ In Development
          └─ Dev Blocked (if stalled)

[Testing]
  Ready for QA
  └─ QA Failed (loop back to In Development)
  └─ QA Passed
      └─ Ready for UAT
          └─ UAT Failed (loop back to In Development)
          └─ UAT Passed

[Release]
  Ready for Release
  └─ Released

[Terminal — no further movement]
  Parked
  Rejected
  Cancelled
```

---

## Status Definitions

### New
A request has been received and entered into `REQUEST_REGISTER.md`. No work has started. The request has a REQ ID assigned.

**Who can set this:** Any team member, product owner or AI agent.  
**Required before moving forward:** REQ ID assigned. Entry in REQUEST_REGISTER.md complete with Title, Type, Module and Owner.

---

### Reference Pending
The request may depend on external information: API documentation, regulatory guidance, competitor analysis, a Razorpay feature spec, a user research finding. Those references need to be captured before the request can be evaluated.

**Who can set this:** Product owner or AI agent, at intake.  
**Required before moving forward:** Relevant references identified and attached or linked in the REQ file.

---

### Under Classification
The request is being classified: which module, which sub-module, what type (Feature / Bug / Enhancement / Operational), what priority, who owns it.

**Who can set this:** Product owner.  
**Required before moving forward:** Module, sub-module, type and priority populated in REQUEST_REGISTER.md.

---

### Under Grilling
The request is being scrutinized before evaluation. Questions: Is this well-defined? Is there a simpler way? Does this conflict with an existing decision? Has this been proposed before?

**Who can set this:** Product owner or AI agent during classification.  
**Required before moving forward:** Grilling questions answered. Request re-scoped or clarified if needed.

---

### Under Evaluation
An EVAL document (ID from MASTER_REGISTRY.md) is being written. The evaluation covers: business impact, effort estimate, strategic fit, risk, alternatives, recommendation.

**Who can set this:** Product owner after grilling is complete.  
**Required before moving forward:** EVAL document created with ID, linked in REQUEST_REGISTER.md.

---

### Under Impact Assessment
The EVAL is complete and the request is approved in principle. Now assessing: which modules are affected, which screens change, what schema changes are needed, what Convex functions are affected.

**Who can set this:** Product owner after EVAL is complete and approved.  
**Required before moving forward:** Impact assessment section completed in EVAL or a separate impact doc.

---

### Approved for PRD
The request has been evaluated, impact assessed, and approved for a Product Requirement Document to be written. This is a formal product approval gate.

**Who can set this:** Product owner (decision maker).  
**Required before moving forward:** Explicit approval recorded. EVAL doc linked in REQUEST_REGISTER.md.

---

### PRD Created
A PRD document (ID from MASTER_REGISTRY.md) has been written. The PRD contains: objective, user personas, requirements, acceptance criteria, out-of-scope list, open questions, design notes.

**Who can set this:** Product owner or AI agent after writing the PRD.  
**Required before moving forward:** PRD linked in REQUEST_REGISTER.md.

---

### Stories Created
User stories (US IDs from MASTER_REGISTRY.md) have been written from the PRD. Each story has a title, user role, action, benefit, and acceptance criteria.

**Who can set this:** Product owner or AI agent after writing stories.  
**Required before moving forward:** At least one US linked in REQUEST_REGISTER.md.

---

### Development Planned
A DEVPLAN document (ID from MASTER_REGISTRY.md) has been written. The plan covers: file list, task breakdown, dependencies, build sequence, build prompts if applicable.

**Who can set this:** Engineering lead or AI agent.  
**Required before moving forward:** DEVPLAN linked in REQUEST_REGISTER.md.

---

### Build Prompt Created
A structured build prompt has been prepared for the AI agent to execute the development plan. This is an optional intermediate step for complex builds.

**Who can set this:** Engineering lead or product owner.  
**Required before moving forward:** Build prompt reviewed and approved.

---

### In Development
Active development in progress. Files are being changed. Code is being written.

**Who can set this:** Engineering lead or AI agent when build starts.  
**Required before moving forward:** INCOMPLETE_WORK_TRACKER.md updated.

---

### Dev Blocked
Development has started but is stalled due to a blocker (missing dependency, unclear requirement, environment issue, external API not available).

**Who can set this:** Engineering lead or AI agent when blocked.  
**Required to unblock:** Current Blocker in REQUEST_REGISTER.md must be populated and resolved before moving back to In Development.

---

### Ready for QA
Development is complete. The feature is in a testable state. QA can begin.

**Who can set this:** Engineering lead after build is complete and passes lint/typecheck/build.  
**Required before moving forward:** Build passes. QA document (ID from MASTER_REGISTRY.md) created.

---

### QA Failed
QA testing found issues. The request loops back to In Development.

**Who can set this:** QA tester.  
**Required before moving forward:** QA failure notes documented. Issues fixed. Return to Ready for QA.

---

### QA Passed
QA testing completed with all acceptance criteria met.

**Who can set this:** QA tester after all test cases pass.  
**Required before moving forward:** QA document signed off.

---

### Ready for UAT
QA passed. The feature is ready for user acceptance testing by the product owner or designated UAT tester.

**Who can set this:** Engineering lead after QA Passed.  
**Required before moving forward:** UAT document (ID from MASTER_REGISTRY.md) created.

---

### UAT Failed
UAT testing found issues. The request loops back to In Development.

**Who can set this:** Product owner or UAT tester.  
**Required before moving forward:** UAT failure notes documented. Issues fixed. Return to Ready for QA.

---

### UAT Passed
UAT completed. The product owner has accepted the feature.

**Who can set this:** Product owner.  
**Required before moving forward:** UAT document signed off.

---

### Ready for Release
UAT passed. The feature is queued for release to production.

**Who can set this:** Product owner.  
**Required before moving forward:** Release plan reviewed. DEPLOYMENT_CHECKLIST.md reviewed.

---

### Released
The feature is live in production. A release record (REL ID from MASTER_REGISTRY.md) has been created.

**Who can set this:** Engineering lead after successful deployment.  
**Required:** REL document linked in REQUEST_REGISTER.md. CHANGE_LOG.md updated.

---

### Parked
The request is valid but not the right time to pursue. See `PARKED_REQUESTS.md`.

**Who can set this:** Product owner.  
**Required:** Reason for parking and conditions to reopen documented.

---

### Rejected
The request will not be built as described. See `REJECTED_REQUESTS.md`.

**Who can set this:** Product owner (decision maker).  
**Required:** Reason for rejection and decision owner documented.

---

### Cancelled
The request was valid at intake but is no longer relevant (e.g. superseded by another request, context changed).

**Who can set this:** Product owner.  
**Required:** Cancellation reason documented in REQUEST_REGISTER.md Notes.

---

## What Counts as Incomplete

A request is incomplete if it is in any status other than: Released, Parked, Rejected, Cancelled.

Incomplete requests must appear in `ACTIVE_REQUESTS.md` and `INCOMPLETE_WORK_TRACKER.md`.

---

## How to Resume an Incomplete Request

1. Read the REQUEST_REGISTER.md entry for the request.
2. Find the Current Status.
3. Check the "Required before moving forward" criteria for that status.
4. Check INCOMPLETE_WORK_TRACKER.md for any in-progress execution work.
5. Resume from the last completed step. Do not restart.
6. Update Last Updated and Next Action in REQUEST_REGISTER.md.

---

## Module Taxonomy

| Module | Sub-modules |
|---|---|
| Catalogue | Categories, Products |
| Cart | Cart items, Persistence |
| Checkout | Address selection, Payment, Order placement |
| Orders | Order history, Order detail, Status updates |
| Payments | Razorpay integration, Webhook handling, Payment status |
| Membership | Subscription, Free shipping, Status |
| Inventory | Stock levels, Adjustments, Audit trail |
| Admin | Dashboard, CRUD operations, Filters |
| Auth | Sign-in, Sign-up, Role management |
| Addresses | Add, Edit, Delete, Default |
| Favourites | Toggle, List |
| Infrastructure | Deployment, Environment, Config |
| Product OS | Docs, Process, Governance |

---

*Last updated: 2026-06-21*

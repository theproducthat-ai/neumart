# Approval Gates

Defines which approval gates exist in the Nuemart Product OS, who approves at each gate, and what happens when approval is not given.

---

## Gate Overview

| Gate | Stage | Approver | Required Before |
|---|---|---|---|
| G1 — Classification Confirmed | Under Classification → Under Grilling | Product Owner (implicit — proceeds unless challenged) | Grilling begins |
| G2 — Grilling Signed Off | Under Grilling → Under Evaluation or Under Impact Assessment | Product Owner | Evaluation or Impact Assessment begins |
| G3 — Evaluation Approved | Under Evaluation → Approved for PRD | Product Owner (explicit sign-off) | PRD is written |
| G4 — PRD Approved | PRD Created → Stories Created | Product Owner (explicit sign-off on PRD) | User stories are written |
| G5 — Dev Plan Approved | Development Planned → In Development | Product Owner (review) + Developer (ready to build) | Coding prompt is used |
| G6 — QA Passed | Ready for QA → Ready for UAT | QA Tester (or Developer if no dedicated QA) | UAT begins |
| G7 — UAT Signed Off | Ready for UAT → Ready for Release | Product Owner (explicit sign-off) | Release plan is written |
| G8 — Release Approved | Ready for Release → Released | Product Owner (deploy approval) | Deployment runs |

---

## Gate Descriptions

### G1 — Classification Confirmed

Claude assigns a classification. If confidence is High, classification proceeds automatically. If confidence is Low, Claude asks the user to clarify before creating the REQ.

**Approver:** The user's implicit confirmation that the request description is complete and accurate.  
**Blocks what:** Grilling session cannot begin with Low confidence classification.

---

### G2 — Grilling Signed Off

Grilling produces a GRILLING-NNNN.md file with a scope statement, open questions list, and MVP boundary recommendation. The product owner must confirm the scope before proceeding.

**Approver:** Product Owner  
**How to approve:** Product owner reads grilling output and replies "Approve grilling" or "Proceed to impact assessment" or provides corrections.  
**Blocks what:** Impact Assessment and Evaluation cannot begin until grilling is signed off.

---

### G3 — Evaluation Approved

For New Module Candidates or high-value requests, Claude writes an EVAL with a Go / No-Go / Priority score. Product owner must explicitly approve before a PRD is written.

**Approver:** Product Owner  
**How to approve:** Product owner reviews EVAL and says "Approve for PRD" or provides feedback.  
**Blocks what:** PRD cannot be written without G3 approval.  
**Exception:** Simple requests that skip evaluation (see SESSION_FLOW_RULES.md for fast-track rules).

---

### G4 — PRD Approved

Claude writes the PRD. Product owner reviews it for accuracy, scope, and business intent before user stories are written.

**Approver:** Product Owner  
**How to approve:** Review PRD; update sign-off section with "Approved" and date.  
**Blocks what:** User stories cannot be written until PRD is approved.

---

### G5 — Dev Plan Approved

Claude writes the DEVPLAN and coding prompt. Product owner and developer confirm before development starts.

**Approver:** Product Owner (scope confirmation) + Developer (technical feasibility confirmation)  
**How to approve:** Verbal or written "proceed" is sufficient. No formal document needed.  
**Blocks what:** Coding prompt cannot be given to an AI or developer until G5 is passed.

---

### G6 — QA Passed

QA tester (or developer) runs through all test scenarios and confirms all acceptance criteria pass. Bugs are logged in BUG_REGISTER.md.

**Approver:** QA Tester (or Developer performing QA)  
**How to approve:** Complete QA-NNNN.md with Decision = QA Passed.  
**Blocks what:** UAT cannot begin until QA is passed or conditionally passed.

---

### G7 — UAT Signed Off

Product owner performs UAT and signs off that the feature meets business intent.

**Approver:** Product Owner  
**How to approve:** Complete UAT-NNNN.md sign-off section with "UAT Passed".  
**Blocks what:** Release plan cannot be written and deployment cannot happen.

---

### G8 — Release Approved

Product owner gives explicit deploy approval after reviewing the release plan, rollback plan, and pre-deployment checklist.

**Approver:** Product Owner  
**How to approve:** Update RELEASE-NNNN.md sign-off with "Approved".  
**Blocks what:** No deployment may happen without G8 approval.  
**Exception:** P0 incidents (hotfixes) — verbal approval from product owner is sufficient; document retrospectively.

---

## What Happens When a Gate Is Not Passed

| Gate Not Passed | Action |
|---|---|
| G1 fails (too vague) | Apply INCOMPLETE_REQUEST_RULES.md |
| G2 fails (scope not agreed) | Return to grilling. Update GRILLING-NNNN.md with new open questions. |
| G3 fails (evaluation rejected) | Park or reject the request. Document reason in EVAL. |
| G4 fails (PRD not approved) | Revise PRD based on feedback. Get re-approval before proceeding. |
| G5 fails (dev plan disagreement) | Revise DEVPLAN. Do not start coding. |
| G6 fails (QA failed) | Return to development. Fix bugs. Re-run QA. |
| G7 fails (UAT failed) | Return to development. Update PRD if new requirement found. |
| G8 fails (release blocked) | Investigate blocker. Fix. Re-run pre-deployment checklist. |

---

*Last updated: 2026-06-21*

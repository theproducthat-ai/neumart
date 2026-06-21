# Request Classification Rules

Defines how Claude classifies requests in the Nuemart Product OS.

---

## Core Rule: The User Never Classifies

**The user provides a natural-language description of what they want.**  
**Claude classifies the request on behalf of the user.**

The user must never be asked to:
- Name the classification type
- Specify the module or sub-module
- Identify the request category
- Determine the next Product OS step
- Name the file path, Convex function, or screen ID

Claude derives all of this from context.

---

## What Claude Does When a Request Arrives

When the user submits a request (via `/product-request` or any natural-language description of a product change):

**Step 1 — Understand the request:**
- Read the user's description carefully.
- Identify the core ask: what the user wants to exist or change.

**Step 2 — Classify the request:**
- Match the request to one or more of the 16 classification types in `REQUEST_CLASSIFICATION_MATRIX.md`.
- Assign a confidence level: High, Medium, or Low.
- High = clear match to one classification. Low = ambiguous or very vague — needs clarification.

**Step 3 — Identify the module and sub-module:**
- Based on classification, identify which module (from MODULE_MASTER.md) the request belongs to.
- Identify the sub-module if possible.

**Step 4 — Check for blocking conditions:**
- Is the request too vague? → Apply INCOMPLETE_REQUEST_RULES.md.
- Is reference material needed before grilling? → Mark as "Reference Pending".
- Does a prerequisite feature not yet exist? → Note in grilling.

**Step 5 — Assign a REQ ID:**
- Get the next REQ ID from MASTER_REGISTRY.md.
- Create the REQ file in `04-request-management/requests/`.

**Step 6 — Respond to the user:**
- State the classification and confidence.
- State the module and sub-module.
- State the REQ ID.
- State the next step.
- Do NOT ask the user to confirm or validate the classification unless confidence is Low.

---

## Classification Confidence Levels

| Level | Meaning | Action |
|---|---|---|
| High | Clear match to one classification type. Module and scope are obvious. | Proceed to grilling immediately. |
| Medium | Request matches 1–2 classification types but scope needs confirmation. | Proceed to grilling; resolve scope during grilling. |
| Low | Request is too vague, incomplete, or spans too many modules to classify reliably. | Apply INCOMPLETE_REQUEST_RULES.md before proceeding. |

---

## When Classification Changes During Grilling

It is expected that classification may be revised during grilling. For example:

- A request initially classified as "Existing Feature Enhancement" may reveal during grilling that it requires a schema change → reclassify as "Schema Change Request" and add "Data Schema Impact" flag.
- A request initially classified as "New Module Candidate" may be scoped down during grilling to "Existing Module Feature".

When classification changes, update the REQ file.

---

## Dual Classification

A request may have a primary classification and one or more secondary flags:

- Primary: what type of change is being made
- Secondary (risk flags): what areas are impacted that require special care

**Example:**  
Request: "Add a coupon discount field to the checkout total."  
- Primary classification: Existing Module Feature (Customer Commerce / Checkout)
- Secondary flags: Payment/Finance Impact (changes how totals are calculated), Schema Change (new field in orders table)

---

## Source of Classification Types

See `governance/REQUEST_CLASSIFICATION_MATRIX.md` for the full list of 16 classification types.

---

## Source of Scenario Examples

See `governance/REQUEST_SCENARIO_PLAYBOOK.md` for 20 worked scenarios showing expected Claude behaviour for each classification type.

---

*Last updated: 2026-06-21*

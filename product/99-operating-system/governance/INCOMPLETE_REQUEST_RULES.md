# Incomplete Request Rules

Defines how Claude handles requests that are too vague, incomplete, or contradictory to classify and proceed.

---

## Core Rule

Claude must never create a REQ ID for a request it cannot classify with at least Medium confidence.

If confidence is Low, Claude must ask for clarification before assigning an ID or proceeding. This prevents the Product OS from being polluted with meaningless or duplicate requests.

---

## The Completeness Threshold

A request is considered complete enough to proceed if Claude can answer YES to all of:

1. Can I identify what the user wants to exist or change?
2. Can I identify who is affected (customer, admin, system)?
3. Can I classify this into at least one of the 16 types in REQUEST_CLASSIFICATION_MATRIX.md?
4. Can I identify the primary module it belongs to?

If any of these is NO, Claude must ask for clarification.

---

## Trigger Conditions for Incomplete Request Rules

Apply these rules when the user's request:

| Condition | Example |
|---|---|
| Is too vague to classify | "Make the app better." |
| Describes a feeling but not a problem | "The checkout feels off." |
| Names a solution but not a problem | "Add animations everywhere." |
| Contradicts existing documented decisions | "Enable Razorpay membership" (membership is Phase 12) |
| Spans more than 3 modules without any scoping | "Redesign everything." |
| Is a single word or question with no context | "Coupons?" |
| References a screen or feature that does not exist | "The loyalty dashboard should show points." (no loyalty module) |

---

## What Claude Does When a Request Is Incomplete

### Step 1 — Do NOT assign a REQ ID yet.

Assigning an ID locks the request into the registry. Incomplete requests must be clarified before an ID is assigned.

### Step 2 — Do NOT ask multiple clarifying questions at once.

Ask one focused question. The user is communicating naturally, not filling in a form. Multiple questions at once will feel like interrogation.

### Step 3 — Identify the single biggest gap.

What is the one thing, if known, that would unlock classification?
- Is it: who is affected?
- Is it: what is the expected outcome?
- Is it: which screen or feature does this relate to?
- Is it: what specific problem is being solved?

### Step 4 — Ask that one question.

Keep the question short and concrete. Give an example of a more complete version of the request.

---

## Example Responses for Common Incomplete Requests

### Too vague

**User:** "Make the app better."

**Claude:**
> I'd love to help improve the app — can you tell me what specific screen or feature feels like it needs the most attention? For example: "The cart page is hard to use on mobile" or "Admins can't filter orders by date."

---

### Describes a feeling, not a problem

**User:** "The checkout feels off."

**Claude:**
> Thanks — can you describe what specifically feels off? For example: is the layout confusing, is something not working correctly, or does the flow have too many steps?

---

### References non-existent feature

**User:** "The loyalty dashboard should show point expiry dates."

**Claude:**
> A loyalty program hasn't been built yet — it's on the roadmap for Phase 12 (after Razorpay payments go live). Would you like me to log this as a roadmap evaluation item for future planning, or are you referring to a different feature?

---

### Spans too many modules

**User:** "Redesign the whole checkout and admin panel."

**Claude:**
> That covers a lot of ground — can you tell me which part is most urgent? For example: "The checkout payment step is confusing" or "The admin order list needs better filters." I'll create separate requests for each area.

---

### Contradicts existing decision

**User:** "Let's activate the Razorpay membership."

**Claude:**
> Razorpay Subscription — Free Delivery is a Phase 12 roadmap item, after Razorpay basic payments go live (Phase 11, pending merchant account approval). It can't be activated yet as neither Razorpay payments nor the subscription API are integrated.  
>  
> If you'd like to start planning Phase 11 (Razorpay integration), I can open a request for that. Or if you want to note this for the Phase 12 backlog, I can add it there.

---

## After Clarification

Once the user provides clarification:

1. Return to Step 2 of the standard workflow (SESSION_FLOW_RULES.md).
2. Classify with at least Medium confidence.
3. Assign REQ ID and proceed.

---

## When to Escalate to "Reference Pending"

If the request is clear enough to classify but cannot proceed to grilling without a document, SOP, or other reference material that the user needs to provide:

1. Assign a REQ ID.
2. Set status to "Reference Pending".
3. Record what is needed in the Reference Material section of the REQ file.
4. Do not begin grilling until the material is provided.

---

*Last updated: 2026-06-21*

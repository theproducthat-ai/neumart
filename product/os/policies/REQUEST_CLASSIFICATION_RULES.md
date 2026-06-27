# Request Classification Rules

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Every request must be classified by work type before it enters the planning pipeline. Classification determines the work lane, required artifacts, and approval path.

---

## Work Type Definitions

### New Module
- **Definition**: A completely new product area with its own set of features, screens, and backend logic
- **Examples**: Adding a Loyalty Programme module, a B2B portal
- **Minimum required**: Business case, PRD per feature, Initiative object
- **Lane**: Strategic Initiative

### New Feature
- **Definition**: A new user-visible capability within an existing module
- **Examples**: Add product search, add delivery tracking screen
- **Lane**: Standard Feature or Strategic Initiative

### Existing Feature Enhancement
- **Definition**: An improvement to a feature that already exists (adding functionality, improving UX, fixing a limitation)
- **Examples**: Add sort options to product list, add address book limit increase
- **Lane**: Small Enhancement or Standard Feature depending on scope

### Sub-Feature
- **Definition**: A component or variation within an existing feature
- **Examples**: Add a "Save for later" option within the cart, add a "Reorder" shortcut on order history
- **Lane**: Small Enhancement

### Bug
- **Definition**: Unexpected behaviour that deviates from specification or reasonable expectation
- **Lane**: Fast Fix (if clear and simple) or Standard Feature (if root cause requires significant rework)

### Incident
- **Definition**: Production failure affecting live users, requiring emergency response
- **Lane**: Incident (Lane 5)

### Tech Debt
- **Definition**: Engineering improvements with no user-visible change
- **Lane**: Tech Debt (Lane 7)

### Data Change
- **Definition**: A change to how data is stored, structured, or processed (migration, backfill, schema change)
- **Lane**: Depends on scope — usually Small Enhancement or Standard Feature, always requires `data-migrations/` object

### UI/UX Improvement
- **Definition**: A change to the user interface or experience without changing underlying data or logic
- **Lane**: Small Enhancement (usually)

### Process Change
- **Definition**: A change to how the team or operations works (SOP update, admin workflow change)
- **Lane**: Operational Change (Lane 8)

### Operational Request
- **Definition**: A request from operations to improve an internal workflow
- **Lane**: Operational Change (Lane 8)

### Reporting / Analytics Request
- **Definition**: A request for a new report, dashboard, or data export
- **Lane**: Small Enhancement or Standard Feature depending on complexity

### Integration Request
- **Definition**: Connecting the product to a new third-party service
- **Lane**: Standard Feature (requires tech design + API contract)

### Compliance / Security Request
- **Definition**: A change required by a regulatory or security standard
- **Lane**: Compliance/Security (Lane 6)

### Commercial / Business Request
- **Definition**: A request from sales or business driven by a commercial opportunity
- **Lane**: Business/Commercial Request (Lane 9)

### Experiment
- **Definition**: A hypothesis test using a variant of an existing or new feature
- **Lane**: Experiment (Lane 10)

---

## Classification Matrix

```
Does it require a brand new module?            → New Module
Is it new functionality that didn't exist?     → New Feature
Does it improve something existing (no schema)?→ Existing Feature Enhancement → Small Enhancement
Does it improve something existing (schema)?   → Existing Feature Enhancement → Standard Feature
Is it a defect in existing behaviour?          → Bug
Is it a production outage?                     → Incident
Is it engineering-only improvement?            → Tech Debt
Does it primarily change data structure?       → Data Change
Is it UI/UX only, no logic change?             → UI/UX Improvement
Is it a process or operational change?         → Process/Operational Change
Is it a new dashboard or report?               → Reporting/Analytics Request
Does it connect to a third-party?              → Integration Request
Is it compliance or security driven?           → Compliance/Security
Is it sales or business driven?                → Commercial/Business Request
Is it a hypothesis test?                       → Experiment
```

---

## AI Classification Guidance

When an AI agent receives a request in natural language, it should:

1. Extract the core ask
2. Identify if it references an existing feature (enhancement) or new capability (feature)
3. Check if it has urgency markers (production issue → incident; deadline → high urgency)
4. Check if it references compliance or legal requirements
5. Check if it mentions a client or deal
6. Select the most specific work type from the list above
7. Assign confidence level (high/medium/low)
8. Recommend a lane from `WORK_TYPE_LANES.md`
9. State what additional information is needed to confirm the classification

---

## Classification Output Format

Every classified request should include:

```yaml
work_type: ""           # From the list above
work_lane: ""           # From WORK_TYPE_LANES.md
classification_confidence: high | medium | low
classification_notes: ""
modules_affected: []
screens_affected: []
entities_affected: []
roles_affected: []
artifacts_required: []
artifacts_optional: []
next_action: ""
```

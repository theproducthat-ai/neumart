# Nuemart Product OS — Product Object Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Purpose
A general-purpose interface for direct Product Object operations. While slash commands (`/product-request`, `/product-prd`, etc.) orchestrate multi-step product workflows, the Product Object Interface provides atomic operations on individual objects: create, update, link, check, trace, and interrogate.

---

## Operations

---

### 1. Create Object
**Invocation:** `create <object_type> for <request/context>`

**What it does:**
- AI determines the appropriate `object_id` following semantic ID conventions
- Populates all required frontmatter fields from context
- Creates the file in the correct `product/objects/{type}/` subfolder
- Establishes minimum required relationships
- Returns the new object ID and file path

**Example:** `create Risk for REQUEST-COM-PLP-CAROUSEL-001 — schema change during live traffic`

**AI behavior:**
- Never asks the user to provide the ID format or subfolder
- Infers object type from context if not explicitly stated
- Applies appropriate template from `product/os/templates/`
- Validates that all required fields are populated before writing

---

### 2. Update Object
**Invocation:** `update <object_id> with <changes>`

**What it does:**
- Loads the target object
- Applies the requested changes to specific fields
- Adds an `audit_log` entry with: timestamp, changed fields, previous values, change reason
- Updates `updated_at` metadata
- If status changes: validates the transition is permitted by lifecycle rules
- Updates all related objects that reference the changed fields

**Example:** `update REQUEST-COM-PLP-CAROUSEL-001 with status: Grilled`

**AI behavior:**
- Never makes changes that violate lifecycle ordering (e.g., cannot set status to Shipped before QA Pass)
- Surfaces any relationship impacts of the field change
- Records the change in audit_log before writing

---

### 3. Link Objects
**Invocation:** `link <object_id> to <target_object_id> as <relationship_type>`

**What it does:**
- Adds the relationship to the source object's Relationships section
- Adds the inverse relationship to the target object's Relationships section
- Updates `RELATIONSHIP_INDEX.md` with the new link
- Validates that the relationship type is permitted between these object types

**Example:** `link FEATURE-COM-PLP-CAROUSEL to REQUEST-COM-PLP-CAROUSEL-001 as sourced_from`

**Valid relationship types:**
- `has_feature`, `sourced_from`
- `has_risk`, `identified_in`
- `requires_question`, `resolved_in`
- `specifies`, `specified_by`
- `implements`, `implemented_by`
- `validates`, `validated_by`
- `depends_on`, `depended_on_by`
- `ships`, `shipped_in`
- `discovered_in`, `defines_scope_for`
- `derived_from`, `produced_from`
- `gates`, `gated_by`

**AI behavior:**
- Validates both objects exist before linking
- Warns if the relationship creates a cycle
- Warns if the relationship type is unusual between these object types

---

### 4. Check Object Completeness
**Invocation:** `check <object_id>`

**What it does:**
- Loads the target object and its template requirements
- Validates all required frontmatter fields are populated (not null, not placeholder)
- Validates all required relationships exist
- Validates lifecycle compliance (status matches what upstream objects support)
- Checks for known common errors (missing acceptance criteria, missing risk assessment, etc.)

**Output:**
```
COMPLETENESS CHECK: [object_id]
================================
Completeness Score: [n]% ([n of n] required fields populated)

MISSING FIELDS ({n}):
- [field_name] — required, currently empty
- [field_name] — required, currently empty

MISSING RELATIONSHIPS ({n}):
- [relationship_type] — required but not linked

LIFECYCLE COMPLIANCE:
- Status [current_status] is [Valid | Invalid] given upstream object states
- [any lifecycle issue]

RECOMMENDATION:
→ [what to fix to bring this object to full compliance]
```

---

### 5. Find Related Objects
**Invocation:** `related <object_id>`

**What it does:**
- Loads the target object
- Traverses the relationship graph one level deep (direct relationships)
- Traverses one more level (indirect relationships)
- Returns all related objects with their type, ID, status, and relationship type

**Output:**
```
RELATED OBJECTS: [object_id]
==============================
Direct Relationships:
  [object_id] — [type] — [status] — Relationship: [relationship_type]
  [object_id] — [type] — [status] — Relationship: [relationship_type]

Indirect Relationships (2 hops):
  [object_id] — [type] — [status] — Via: [intermediary]
  [object_id] — [type] — [status] — Via: [intermediary]
```

---

### 6. Explain Feature History
**Invocation:** `history <feature_id>`

**What it does:**
- Traces the Feature Object from initial request through delivery
- Shows every version change, decision, and status transition
- Reconstructs the chronological narrative of how the feature evolved
- Sources information from: Request Object, Discovery Session, Evaluation, Impact Assessment, PRD versions, Stories, QA Runs, UAT Runs, Releases

**Output:**
```
FEATURE HISTORY: [feature_id]
==============================
[YYYY-MM-DD] Requested via [REQUEST-...] — [brief description]
[YYYY-MM-DD] Grilled — [n] questions resolved, [n] assumptions made
[YYYY-MM-DD] Evaluated — Score [n]/10 — Approved
[YYYY-MM-DD] Impact Assessed — [key finding]
[YYYY-MM-DD] PRD v1.0 written — [n] requirements, [n] acceptance criteria
[YYYY-MM-DD] PRD Approved by [product owner]
[YYYY-MM-DD] [n] stories created (US-XXXX to US-XXXX)
[YYYY-MM-DD] Dev plan created — [n] phases, [n] tasks
[YYYY-MM-DD] QA Run — [Passed/Failed] — [n] bugs found
[YYYY-MM-DD] UAT — [Signed Off | Not Signed Off] — [n] feedback items
[YYYY-MM-DD] Released in v[X.Y.Z]
```

---

### 7. Generate Traceability
**Invocation:** `trace <object_id>`

**What it does:**
- Builds the complete upstream and downstream traceability chain for the object
- Upstream: what requested, approved, or specified this object?
- Downstream: what does this object enable, validate, or ship?
- Identifies any breaks in the chain

**Output:**
```
TRACEABILITY CHAIN: [object_id]
================================
UPSTREAM (this object was created by / sourced from):
  [REQUEST-...] ← [FEATURE-...] ← [PRD-...] ← [this object]

DOWNSTREAM (this object enables / is tested by / ships in):
  [this object] → [STORY-...] → [TESTCASE-...] → [QARUN-...] → [RELEASE-...]

CHAIN BREAKS:
  Missing link between [object A] and [object B] — expected: [relationship type]
```

---

### 8. Identify Missing Links
**Invocation:** `gaps <object_id>`

**What it does:**
- Identifies all missing required relationships in the traceability chain for this object
- Reports which relationships are required by the object's type and template
- Reports which lifecycle-required relationships are missing
- Recommends which command would create the missing links

**Output:**
```
GAPS: [object_id]
==================
Missing Required Relationships:
  [relationship_type] → [expected target type] — not linked
    Fix: [run /product-xxx or create <object_type>]

Missing Lifecycle Links:
  [lifecycle step] — expected at this status but not found
    Fix: [specific action]
```

---

### 9. Recommend Next Action
**Invocation:** `next <object_id>`

**What it does:**
- Reads the object's current status, relationships, and lifecycle position
- Applies NEXT_ACTION_ENGINE rules
- Returns the single most important next action for this specific object
- States why this action is the highest priority

**Output:**
```
NEXT ACTION: [object_id]
=========================
Current Status: [status]
Lifecycle Position: [step n of N]

Recommended Next Action:
→ [specific action or command]

Reason: [why this is the next step]

After that:
→ [what comes after the recommended action]
```

---

## Failure Conditions (All Operations)

- **Object not found:** AI states the object ID was not found and asks for correction or offers to search by name.
- **Operation not permitted at current lifecycle stage:** AI explains why and states what must happen first.
- **Relationship type not valid between object types:** AI explains which relationship types are valid and asks for confirmation.
- **File write fails:** AI surfaces the error and suggests the correct path.

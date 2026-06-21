# Request Classification Matrix

16 classification types for all Nuemart product requests. Claude selects the most accurate classification from this matrix when a request arrives. The user never selects classification manually.

---

## How to Read This Matrix

| Column | Meaning |
|---|---|
| Classification | The name of the type |
| When to Use | The conditions that make this the right classification |
| Signals in Request | Words, phrases, or patterns that suggest this classification |
| Examples | Concrete example requests for Nuemart |
| Required Next Step | What happens immediately after classification |
| Risk Level | Default risk assessment before grilling |

---

## Classification Types

### 1. New Module Candidate

| Field | Value |
|---|---|
| **When to Use** | The request describes a capability that does not exist in any current module. Would require a new top-level module entry in MODULE_MASTER.md. |
| **Signals in Request** | "we don't have this yet", "completely new", "add a delivery system", "loyalty program", mentions a capability not in MODULE_MASTER.md |
| **Examples** | "Add a delivery tracking module"; "Build a coupon and discount system"; "Create a loyalty points program" |
| **Required Next Step** | Full grilling (all sections); Evaluation in `02-roadmap/evaluations/`; Impact Assessment; PRD |
| **Risk Level** | High — new modules have broad scope and unknown dependency surface |

---

### 2. Existing Module Feature

| Field | Value |
|---|---|
| **When to Use** | The request adds a new feature or capability to an already-defined module or sub-module. The module exists; the specific feature does not. |
| **Signals in Request** | "add X to the cart", "allow admin to Y", "customers should be able to Z", new capability within a known module area |
| **Examples** | "Add a search bar to the product listing"; "Let admin mark an order as delivered"; "Allow customers to add a delivery note at checkout" |
| **Required Next Step** | Grilling (sections 3–7); Impact Assessment if schema change; PRD |
| **Risk Level** | Medium |

---

### 3. Existing Feature Enhancement

| Field | Value |
|---|---|
| **When to Use** | A feature already exists and works. The request makes it better, faster, or more complete. |
| **Signals in Request** | "improve", "make it better", "currently X but should be Y", "extend", "also show", "add more detail to" |
| **Examples** | "The order detail page should also show the delivery address"; "Make the product card show a sold-out badge"; "Admin order list should be sortable by date" |
| **Required Next Step** | Light grilling (sections 4–5, 7); PRD if non-trivial; direct dev plan if small |
| **Risk Level** | Low to Medium |

---

### 4. Bug

| Field | Value |
|---|---|
| **When to Use** | Something that was supposed to work is broken or behaving incorrectly in a way that was never intended. |
| **Signals in Request** | "broken", "doesn't work", "error", "not showing", "disappears", "I see an error", "wrong value", "unexpected behaviour" |
| **Examples** | "Cart total is not updating when I remove an item"; "Admin can't save a product — it throws an error"; "Order status shows wrong date" |
| **Required Next Step** | No grilling needed — go directly to DEVPLAN. Reproduce the bug first. |
| **Risk Level** | Low to High (depends on area — payment bugs are Critical) |

---

### 5. UI / UX Improvement

| Field | Value |
|---|---|
| **When to Use** | The underlying logic is correct, but the user interface is confusing, ugly, or inefficient. No business logic or data change. |
| **Signals in Request** | "looks bad", "confusing layout", "hard to use", "redesign", "UX improvement", "the button is in the wrong place", "font is too small" |
| **Examples** | "The checkout button is hard to see on mobile"; "Admin dashboard looks cluttered"; "Product images are too small" |
| **Required Next Step** | Light grilling; direct DEVPLAN if obvious; no PRD needed unless complex |
| **Risk Level** | Low |

---

### 6. Schema Change Request

| Field | Value |
|---|---|
| **When to Use** | The request explicitly or implicitly requires adding, modifying, or removing fields or tables in `schema.ts`. |
| **Signals in Request** | "save new data", "track X per order", "store this information", "add a field", anything that implies new data needs to be persisted that isn't already |
| **Examples** | "Track delivery slot per order"; "Store customer notes on their profile"; "Add a weight field to products" |
| **Required Next Step** | Grilling (sections 6, 7); Impact Assessment (always — schema changes are irreversible); PRD |
| **Risk Level** | High — schema changes are irreversible and require careful migration planning |

---

### 7. Integration Request

| Field | Value |
|---|---|
| **When to Use** | The request connects Nuemart to an external service or API that is not yet integrated. |
| **Signals in Request** | "integrate with", "connect to", "use [service]", "Razorpay", "SMS", "WhatsApp", "email", "Google", "third-party" |
| **Examples** | "Integrate Razorpay payments"; "Send SMS confirmation after order"; "Connect to a delivery partner API" |
| **Required Next Step** | Full grilling (especially section 11 — dependencies; section 15 for payment integrations); Impact Assessment; PRD |
| **Risk Level** | High — external dependencies, API credentials, webhook security, and data integrity |

---

### 8. Performance Improvement

| Field | Value |
|---|---|
| **When to Use** | The feature works but is too slow, uses too many database calls, or has scalability issues. |
| **Signals in Request** | "slow", "takes too long", "lags", "too many API calls", "optimize", "speed up", "caching" |
| **Examples** | "Product listing page loads slowly"; "Admin order list takes 5 seconds to load"; "Convex queries firing too often" |
| **Required Next Step** | Grilling (section 3 — understand current flow); DEVPLAN with benchmarks; No PRD needed unless complex |
| **Risk Level** | Medium — optimization changes can introduce regressions |

---

### 9. Security or Compliance Request

| Field | Value |
|---|---|
| **When to Use** | The request addresses a security vulnerability, compliance requirement, or data privacy concern. |
| **Signals in Request** | "security", "vulnerability", "data privacy", "GDPR", "RBI", "PCI", "exposed", "unauthorized access", "compliance" |
| **Examples** | "Admin route is accessible without authentication"; "Customer can see another customer's orders"; "Need to verify Razorpay webhook signatures" |
| **Required Next Step** | Immediate triage. If critical: fast-track to DEVPLAN without full PRD process. Impact Assessment always. |
| **Risk Level** | Critical — security issues must never be deferred |

---

### 10. Content or Copy Change

| Field | Value |
|---|---|
| **When to Use** | The request changes text, labels, messages, or copy in the UI. No logic or data change. |
| **Signals in Request** | "change the text", "rename", "the label says X but should say Y", "update the message", "wrong wording" |
| **Examples** | "Change 'Place Order' button to 'Confirm Order'"; "The error message says 'Error' — change to something helpful"; "Update the app title" |
| **Required Next Step** | No grilling. Direct DEVPLAN (or even direct edit if trivial). |
| **Risk Level** | Very Low |

---

### 11. Configuration or Settings Change

| Field | Value |
|---|---|
| **When to Use** | The request changes a configuration value, environment variable, or system setting. No new feature. |
| **Signals in Request** | "change the setting", "update the config", "environment variable", "feature flag", "turn on/off" |
| **Examples** | "Change the minimum order value from ₹0 to ₹200"; "Update the Convex deployment URL"; "Change the product page title" |
| **Required Next Step** | No grilling if trivial. Verify which config value and where it lives. DEVPLAN if code change needed. |
| **Risk Level** | Low to Medium depending on what the config controls |

---

### 12. Data Migration or Backfill

| Field | Value |
|---|---|
| **When to Use** | Existing data in Convex needs to be transformed, enriched, corrected, or moved as part of a schema or feature change. |
| **Signals in Request** | "existing records", "all old orders", "backfill", "migrate", "update all products to have...", "convert" |
| **Examples** | "All existing products need a new `slug` field populated"; "Old orders without addressId need to be updated"; "Migrate category IDs to the new format" |
| **Required Next Step** | Grilling (section 6 — data); Impact Assessment always; PRD if large. Run migration in dev first. |
| **Risk Level** | High — data migrations are irreversible and can corrupt production data |

---

### 13. Admin Tool Request

| Field | Value |
|---|---|
| **When to Use** | The request is for a new or improved admin-only capability that does not affect the customer-facing experience. |
| **Signals in Request** | "admin should be able to", "management tool", "dashboard", "admin view", "report for the admin", "admin control" |
| **Examples** | "Admin should be able to filter orders by payment status"; "Add a stock report to the admin dashboard"; "Admin should see customer contact details" |
| **Required Next Step** | Grilling (sections 3–7); PRD if non-trivial; direct DEVPLAN if simple |
| **Risk Level** | Low to Medium |

---

### 14. Payment / Finance Impact

| Field | Value |
|---|---|
| **When to Use** | Use as a SECONDARY FLAG alongside another classification. The request affects payment amounts, totals, payment status, Razorpay integration, or financial records. |
| **Signals in Request** | "discount", "coupon", "total", "charge", "refund", "payment", "fee", "price", "Razorpay", "amount", "paise", "₹" |
| **Examples** | "Apply a coupon discount at checkout" (primary: Existing Module Feature + secondary: Payment/Finance Impact); "Issue a refund" (primary: New Module Candidate + secondary: Payment/Finance Impact) |
| **Required Next Step** | Impact Assessment is mandatory when this flag is set. Section 15 of grilling question bank applies. |
| **Risk Level** | High — incorrect payment logic leads to revenue loss or fraud |

---

### 15. Inventory Impact

| Field | Value |
|---|---|
| **When to Use** | Use as a SECONDARY FLAG. The request changes when, how, or how much stock is deducted, reserved, or reported. |
| **Signals in Request** | "stock", "inventory", "quantity", "deduct", "reserve", "out of stock", "stock movement", "oversell" |
| **Examples** | "Reserve stock when item is added to cart" (primary: Existing Feature Enhancement + secondary: Inventory Impact); "Backorder support" (primary: New Module Candidate + secondary: Inventory Impact) |
| **Required Next Step** | Impact Assessment is mandatory when this flag is set. Section 16 of grilling question bank applies. |
| **Risk Level** | High — incorrect inventory logic leads to overselling or lost stock |

---

### 16. Roadmap / Evaluation Item

| Field | Value |
|---|---|
| **When to Use** | The request is not a specific feature but an idea the product owner wants to evaluate for future roadmap inclusion. Not ready for grilling or PRD. |
| **Signals in Request** | "thinking about", "maybe in the future", "should we consider", "what would it take to", "is this feasible", "rough idea" |
| **Examples** | "Thinking about adding a loyalty points system eventually"; "Should we build a mobile app?"; "What would a delivery partner integration look like?" |
| **Required Next Step** | Create an EVAL in `02-roadmap/evaluations/`. No REQ, no grilling, no PRD until evaluation is complete. |
| **Risk Level** | Not applicable — evaluation only |

---

*Last updated: 2026-06-21*

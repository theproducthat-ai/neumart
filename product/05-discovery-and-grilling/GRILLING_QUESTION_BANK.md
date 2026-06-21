# Nuemart — Grilling Question Bank

A reusable bank of discovery questions grouped by topic. Used to populate grilling sessions for any request. Claude selects the most relevant questions based on request classification.

---

## Purpose

Grilling prevents vague requests from reaching PRD stage without sufficient clarity. These questions are not asked all at once — Claude selects the relevant subset based on the classification and complexity of the request.

---

## Rule: Grilling Is Classification-Driven

- Claude must select grilling questions based on the classification type, not ask all questions for every request.
- High-confidence, well-scoped requests may need only 3–5 questions.
- New Module Candidates and Payment/Inventory impact requests need thorough grilling.
- The user should only provide the business description. Claude leads the grilling.

---

## Section 1 — Problem Clarity

1. What specific problem are we solving? Who experiences it?
2. How frequently does this problem occur? Is it daily, weekly, or edge-case?
3. What is the cost of NOT solving this? (revenue loss, operational friction, customer churn)
4. Is there a workaround currently in place? What is wrong with it?
5. How do we know this is the right solution? Is there evidence from customers or operations?
6. Has this been requested before? Was it rejected or parked? Why?
7. Is this solving today's problem or anticipating a future one?

---

## Section 2 — User Roles and Personas

8. Who is the primary user of this feature? (Customer / Admin / Delivery Person / Support / System)
9. Are there multiple user types who interact with this feature differently?
10. Does this change anything for a role that does not currently exist in Nuemart?
11. Will a new role be needed to support this feature?
12. What level of access does each affected role require?

---

## Section 3 — Current Flow

13. How does the user currently accomplish this task without the feature?
14. What manual steps exist today that this feature would automate?
15. What data is currently captured and where? (Convex tables, Excel, WhatsApp, paper)
16. Which existing screens or flows does the user currently navigate for related tasks?
17. Are there existing Convex functions or backend mutations that partially address this?

---

## Section 4 — Future Flow

18. Walk through the step-by-step user journey for this feature.
19. What does the happy path look like? (The normal successful flow)
20. What does failure look like at each step? What should the system do?
21. Should the flow be synchronous (immediate) or asynchronous (background/webhook)?
22. How will the user know when the action has completed?

---

## Section 5 — Business Rules

23. What conditions must be true before this action is allowed?
24. What conditions should prevent this action?
25. Are there limits? (max quantity, time window, usage cap, value threshold)
26. What happens when two users act simultaneously? (concurrency rules)
27. Are there any approval or confirmation steps required?
28. What data must be captured at the time of the action (snapshot vs. live reference)?

---

## Section 6 — Data and Schema

29. What new data needs to be captured that does not exist today?
30. Which existing Convex tables will be read or written?
31. Does this require a new Convex table? What would it be called and what fields?
32. Will existing records need to be migrated or backfilled?
33. Are any fields that are currently optional about to become required?
34. Does this require an index on any existing table?

---

## Section 7 — Validations

35. What inputs does the user provide? Which are required vs. optional?
36. What format validation is needed? (phone number, pincode, amount, date)
37. What value validation is needed? (min, max, positive only, not in past)
38. What uniqueness constraints exist? (e.g. coupon code must be unique)
39. What server-side validation is needed beyond what the form enforces?
40. What should the error message say when validation fails?

---

## Section 8 — Edge Cases

41. What happens if required data is missing?
42. What happens if a referenced record has been deleted?
43. What happens if the user navigates away mid-flow?
44. What happens if stock changes between cart and checkout?
45. What happens if a payment is captured but the webhook fails?
46. What happens if a user submits the same action twice quickly? (double submission)
47. What happens if the user is offline or on a slow connection?

---

## Section 9 — Reporting and Visibility

48. Does the admin need to see a report or summary view for this feature?
49. Does the customer need any confirmation, history, or status visibility?
50. Does this generate audit trail records? (who did what, when)
51. Should this appear in the existing dashboard stats?
52. Is there a need to export data related to this feature?

---

## Section 10 — Permissions

53. Which roles can trigger this action?
54. Which roles can view data related to this feature?
55. Which roles can modify or override this feature's output?
56. Are there any actions that only one specific person (e.g. the store owner) should perform?
57. Should any data in this feature be hidden from certain roles?

---

## Section 11 — Dependencies

58. Does this depend on another feature that is not yet built? (e.g. Razorpay must be live before refunds)
59. Does this depend on an external API or service? (e.g. Razorpay, SMS gateway, delivery partner)
60. Does this depend on a schema change that must happen first?
61. Will any other in-progress request be blocked or affected by this one?
62. Does this change the behaviour of any existing feature?

---

## Section 12 — Screen Impact

63. Does this require a new screen? Which route?
64. Which existing screens are impacted or need updating?
65. Does this change the layout or navigation of any existing screen?
66. Does this require a new UI component (dialog, drawer, step form)?
67. Is this customer-facing, admin-facing, or both?

---

## Section 13 — Reference Material Gaps

68. Is there an API reference document for any third-party integration needed?
69. Is there a design mockup or wireframe?
70. Is there an existing SOP or workflow document we should match?
71. Is there a competitor example or screenshot that describes the intended UX?
72. Is there an email, stakeholder note, or business brief that provides context?
73. Is there an Excel file, report, or data sample that helps define the data model?
74. What assumptions are we making because of missing reference material?

---

## Section 14 — MVP Boundary

75. What is the absolute minimum version of this feature that delivers value?
76. Which parts of this feature could be deferred to a later iteration?
77. Is there a simpler existing solution that could cover 80% of the need without new development?
78. Can this be a manual/admin process for now while the automated version is built?

---

## Section 15 — Payment and Finance Impact

*(Ask only if classification includes Payment/Finance Impact)*

79. Does this feature touch payment amounts, totals, or fee calculations?
80. Does this feature require creating or calling Razorpay Orders API?
81. Does this feature require a Razorpay webhook?
82. Does this feature affect how stock is reduced after payment?
83. Does this feature create or modify any record in the `payments` table?
84. Does this require a refund flow through Razorpay?
85. Does this change when or how the cart is cleared?

---

## Section 16 — Inventory Impact

*(Ask only if classification includes Inventory Impact)*

86. Does this feature change when stock is deducted?
87. Does this feature reserve stock before payment?
88. Does this feature affect the stock movement audit trail?
89. Does this change the low-stock threshold or stock status logic?
90. Does this feature require a new stock movement reason type?

---

*Last updated: 2026-06-21*

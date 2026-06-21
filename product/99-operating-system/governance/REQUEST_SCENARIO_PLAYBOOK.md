# Request Scenario Playbook

20 worked scenarios showing exactly how Claude should handle different types of product requests. These define the expected behaviour for every common situation in the Product OS.

---

## How to Use

These scenarios are behavioural reference for Claude. Each scenario shows:
1. What the user says
2. What Claude does (step by step)
3. What Claude says to the user

---

## Scenario 1 — Simple Customer Feature Request

**User says:** "I want customers to be able to filter products by price range."

**Claude does:**
1. Classification: Existing Feature Enhancement — Customer Commerce / Product Listing (SCR-CUS-0001). Confidence: High.
2. Assign REQ-0001. Create REQ file.
3. Light grilling: 3–5 questions about the slider UI, min/max values, whether to filter on client or server.

**Claude says:**
> Classified as Existing Feature Enhancement for Customer Commerce / Product Listing.  
> REQ-0001 created.  
> Quick discovery: What are the min/max price bounds? Should filtering happen instantly as the slider moves, or after the user clicks a button?

---

## Scenario 2 — Admin Tool Request

**User says:** "Admin should be able to see which products are low on stock."

**Claude does:**
1. Classification: Admin Tool Request — Admin Console / Inventory Management. Confidence: High.
2. Assign REQ-0002. Create REQ file.
3. Grilling: What threshold defines "low stock"? Should it be a badge on the product list or a separate report? Is there a notification?

**Claude says:**
> Classified as Admin Tool Request — Admin Console / Inventory Management.  
> REQ-0002 created.  
> Discovery: What threshold defines low stock (e.g. ≤5 units)? Is this a badge on the existing product list page, or a dedicated low-stock report page?

---

## Scenario 3 — Bug Report

**User says:** "The cart total isn't updating when I remove an item."

**Claude does:**
1. Classification: Bug — Customer Commerce / Cart (SCR-CUS-0003). Confidence: High.
2. Assign REQ-0003. Create REQ file.
3. No grilling. Proceed to DEVPLAN. Note: reproduce bug first.

**Claude says:**
> Classified as Bug — Customer Commerce / Cart.  
> REQ-0003 created.  
> Proceeding directly to DEVPLAN. I'll investigate the cart update logic in the Zustand store and the Convex query that calculates the total.

---

## Scenario 4 — Payment Integration (High Risk)

**User says:** "We need to integrate Razorpay so customers can pay online."

**Claude does:**
1. Classification: Integration Request + Payment/Finance Impact flag. Primary module: Payment Management. Confidence: High.
2. Assign REQ-0004. Create REQ file.
3. Full grilling: all of sections 4, 5, 6, 11, 15 from question bank. Ask about merchant account status, Razorpay Order API, webhook URL.
4. Impact Assessment mandatory.

**Claude says:**
> Classified as Integration Request with Payment/Finance Impact flag — Payment Management.  
> REQ-0004 created.  
> This is a high-risk integration that touches payment amounts, stock deduction, and order confirmation. Full discovery is needed before planning begins.  
> Starting grilling — I'll need to understand the intended payment flow, which Razorpay APIs to use, and your webhook endpoint plan.

---

## Scenario 5 — Delivery Module Request (Verbatim Scenario)

**User says:** "I want to add a delivery module so customers can track their order delivery in real time."

**Claude does:**
1. Classification: New Module Candidate — Delivery Management. Confidence: High.
2. Assign REQ-0005. Create REQ file.
3. Check module catalogue: Delivery Management is listed as "Candidate" in MODULE_MASTER.md with no sub-modules built.
4. Full grilling required: all sections of question bank. Focus on sections 1, 3, 4, 5, 6, 11, 12, 14.
5. Evaluation in `02-roadmap/evaluations/` needed before PRD.

**Claude says:**
> Classified as New Module Candidate — Delivery Management.  
> REQ-0005 created.  
>  
> Delivery Management is currently a Candidate module in the roadmap. Before we can build this, I need to run a full discovery session to understand scope, dependencies, and feasibility.  
>  
> Starting grilling:  
>  
> 1. Who manages deliveries today — does Nuemart use its own delivery team, or a third-party delivery partner (Dunzo, Shadowfax, etc.)?  
> 2. What does the customer currently see after placing an order? Do they receive any delivery update today?  
> 3. What does "real-time tracking" mean specifically — a live map, a status timeline (Confirmed → Out for Delivery → Delivered), or something else?  
> 4. Who updates the delivery status — a delivery person via an app, or the admin manually in the dashboard?  
> 5. Do you have any reference screenshot, competitor app, or design mockup that shows what the tracking UI should look like?

---

## Scenario 6 — Vague Request (Low Confidence)

**User says:** "Make the app better."

**Claude does:**
1. Classification: Cannot classify. Confidence: Low.
2. Apply INCOMPLETE_REQUEST_RULES.md. Do not assign a REQ ID yet.
3. Ask for clarification.

**Claude says:**
> I need a bit more context before I can classify and log this.  
> Could you describe a specific problem you're experiencing, or a specific screen or feature you'd like to improve? For example: "The product search results are slow" or "Admins can't filter orders by date."

---

## Scenario 7 — Schema Change Implied

**User says:** "Customers should be able to write a note to the delivery person when they checkout."

**Claude does:**
1. Classification: Existing Module Feature + Schema Change Request flag — Customer Commerce / Checkout (SCR-CUS-0005). Confidence: High.
2. Assign REQ-0006. Create REQ file.
3. Grilling: confirm field name (`deliveryNote`?), max character limit, whether to show to admin, whether it's optional.
4. Impact Assessment needed (schema change: new field on `orders` table).

**Claude says:**
> Classified as Existing Module Feature with Schema Change flag — Customer Commerce / Checkout.  
> REQ-0006 created.  
>  
> Discovery: Is this a text field the customer types in? What's the maximum character length? Should the admin see this note on the order detail screen? Is it optional?

---

## Scenario 8 — Content / Copy Change (Fast Track)

**User says:** "Change the 'Place Order' button text to 'Confirm Order'."

**Claude does:**
1. Classification: Content or Copy Change — Customer Commerce / Checkout (SCR-CUS-0005). Confidence: High.
2. Assign REQ-0007. Create REQ file.
3. No grilling. No PRD. Direct DEVPLAN.

**Claude says:**
> Classified as Content/Copy Change — Customer Commerce / Checkout.  
> REQ-0007 created.  
> No discovery needed. Writing DEVPLAN now.

---

## Scenario 9 — Roadmap Evaluation Request

**User says:** "I'm thinking about adding a loyalty points program in the future. What would it take?"

**Claude does:**
1. Classification: Roadmap / Evaluation Item. Confidence: High.
2. Do NOT assign REQ ID. Assign EVAL ID instead.
3. Create `02-roadmap/evaluations/EVAL-NNNN.md`.
4. No grilling. No PRD. Evaluation only.

**Claude says:**
> Classified as Roadmap / Evaluation Item — this is a future candidate, not a current build request.  
> EVAL-0001 created.  
>  
> A loyalty points program would require a new module (Customer Loyalty), new schema tables for point balances and transaction history, and integration with the checkout to calculate and apply points. It's a Phase 12+ candidate.  
>  
> I've logged this in the roadmap evaluation board. When you're ready to commit to building it, start a new `/product-request` and I'll run full discovery.

---

## Scenario 10 — Security Issue (Fast Track)

**User says:** "I think customers might be able to see other customers' order details if they change the URL."

**Claude does:**
1. Classification: Security or Compliance Request. Confidence: High.
2. Assign REQ-0008. Mark as Critical. Create REQ file.
3. No grilling — fast-track to Impact Assessment and DEVPLAN.
4. Note in DEVPLAN: must add server-side authorization check in the Convex query for order detail.

**Claude says:**
> Classified as Security / Compliance — Critical.  
> REQ-0008 created and flagged Critical.  
>  
> This is a security vulnerability and must be fixed before anything else. I'm fast-tracking to DEVPLAN.  
>  
> The fix: the Convex query for order detail must verify that the requesting user's `tokenIdentifier` matches the order's `userId`. If not, it must return null or throw Unauthorized.

---

## Scenario 11 — New Admin Feature with Inventory Impact

**User says:** "Admin should be able to manually adjust stock and record a reason."

**Claude does:**
1. Classification: Admin Tool Request + Inventory Impact flag — Admin Console / Inventory Management. Confidence: High.
2. Assign REQ-0009. Create REQ file.
3. Grilling: What reason types? (spoilage, theft, recount, supplier delivery). Must a stockMovements record be created?
4. Impact Assessment because of Inventory Impact flag.

**Claude says:**
> Classified as Admin Tool Request with Inventory Impact flag — Admin Console / Inventory Management.  
> REQ-0009 created.  
>  
> Discovery: What adjustment reasons should be available? (e.g. Supplier delivery, Spoilage, Stock recount, Damage) Is this a form on the existing Inventory screen, or a new page?

---

## Scenario 12 — Feature Already Exists

**User says:** "Can we add the ability for admins to view all orders?"

**Claude does:**
1. Classification: Claude recognises this already exists (SCR-ADM-0006 Admin Order List).
2. No REQ created.

**Claude says:**
> The Admin Order List (SCR-ADM-0006, route `/admin/orders`) already exists and is built. Admins can view all orders there.  
>  
> If you want to enhance it — for example, adding filters, search, or export — let me know what specifically needs to change and I'll create a request for that.

---

## Scenario 13 — Performance Issue

**User says:** "The admin order list is really slow when we have many orders."

**Claude does:**
1. Classification: Performance Improvement — Admin Console / Order Management. Confidence: High.
2. Assign REQ-0010. Create REQ file.
3. Light grilling: How slow? How many orders? Is pagination in place? Are there any Convex indexes on the orders table for common filters?

**Claude says:**
> Classified as Performance Improvement — Admin Console / Order Management.  
> REQ-0010 created.  
>  
> Discovery: Approximately how many orders are in the system today? Is there any pagination on the order list, or does it load all orders at once? Are you seeing slow Convex queries or slow page rendering?

---

## Scenario 14 — Dependency Not Met

**User says:** "Add a refund button on the order detail page."

**Claude does:**
1. Classification: New Module Feature — Payment Management / Refunds. Confidence: High.
2. Assign REQ-0011. Create REQ file.
3. Grilling: Check dependency — Razorpay is not yet integrated (Phase 11 Pending). Refunds require Razorpay Refund API. Cannot be built until Razorpay is live.
4. Note dependency blocker in REQ and grilling.

**Claude says:**
> Classified as New Module Feature — Payment Management / Refunds.  
> REQ-0011 created.  
>  
> **Blocker:** Refunds depend on Razorpay integration (REL-Phase-11), which is pending merchant account approval. Razorpay Refunds API requires an active Razorpay account and live Razorpay orders.  
>  
> I'll log this request and mark it as blocked on Razorpay go-live. When Razorpay is integrated, this can be fast-tracked.

---

## Scenario 15 — Data Migration Request

**User says:** "All existing products need a URL-friendly slug field for SEO."

**Claude does:**
1. Classification: Existing Feature Enhancement + Schema Change Request + Data Migration flag — Customer Commerce / Product Listing. Confidence: High.
2. Assign REQ-0012. Create REQ file.
3. Full grilling: slug format, uniqueness constraint, how to handle existing products (auto-generate from name?), what happens if slug conflicts.
4. Impact Assessment mandatory (schema change + data migration).

**Claude says:**
> Classified as Existing Feature Enhancement with Schema Change and Data Migration flags — Customer Commerce / Product Listing.  
> REQ-0012 created.  
>  
> This is a medium-risk change: we're adding a new field to the products table and need to backfill it for all existing products.  
>  
> Discovery: How should the slug be generated? (e.g. "Basmati Rice 5kg" → "basmati-rice-5kg") Must slugs be globally unique? What happens if two products have the same name?

---

## Scenario 16 — UI-only Improvement (No Logic Change)

**User says:** "The product cards on the home page look too small on desktop."

**Claude does:**
1. Classification: UI/UX Improvement — Customer Commerce / Product Listing (SCR-CUS-0001). Confidence: High.
2. Assign REQ-0013. Create REQ file.
3. Light grilling: what size should they be, is there a reference screenshot?

**Claude says:**
> Classified as UI/UX Improvement — Customer Commerce / Product Listing.  
> REQ-0013 created.  
>  
> Quick question: Do you have a reference screenshot or competitor example of the size you want? Or should I suggest a standard grid layout (e.g. 4 columns on desktop vs current)?

---

## Scenario 17 — Configuration Change (Fast Track)

**User says:** "Can we change the minimum order value to ₹250?"

**Claude does:**
1. Classification: Configuration or Settings Change — Customer Commerce / Checkout. Confidence: High.
2. Assign REQ-0014. Create REQ file.
3. Check if minimum order value is hardcoded or configurable. If hardcoded, DEVPLAN needed. If a Convex config, a data mutation is sufficient.

**Claude says:**
> Classified as Configuration Change — Customer Commerce / Checkout.  
> REQ-0014 created.  
>  
> Let me check how minimum order value is currently implemented — whether it's hardcoded in the frontend or stored in a Convex config table. I'll write a DEVPLAN accordingly.

---

## Scenario 18 — Conflicting with Existing Decision

**User says:** "Let's add Razorpay Membership so customers can get free delivery."

**Claude does:**
1. Classification: Roadmap / Evaluation Item — this is Phase 12 Razorpay Subscription candidate. Do NOT classify as an immediate build request.
2. Note: membership / subscription is documented as Phase 12 in PRODUCT_ROADMAP.md. Razorpay is not yet live (Phase 11 pending). Cannot build subscription before payments are live.

**Claude says:**
> Razorpay Subscription — Free Delivery is documented as Phase 12 in the roadmap (after Razorpay basic payments go live in Phase 11).  
>  
> Razorpay is not yet integrated — Phase 11 is pending merchant account approval. Subscription logic depends on Razorpay Subscriptions API, which requires Phase 11 to be complete first.  
>  
> I've noted your interest. When Phase 11 is released, I can open an evaluation for Phase 12 and run full discovery. No action taken today.

---

## Scenario 19 — Request Spans Multiple Modules

**User says:** "When an order is cancelled, refund the customer and put the stock back."

**Claude does:**
1. Classification: Existing Module Feature (Order Cancellation) + Payment/Finance Impact (refund) + Inventory Impact (stock return). Primary module: Customer Commerce / Order. Secondary: Payment Management / Refunds, Inventory Management / Stock Movements. Confidence: High.
2. Assign REQ-0015. Create REQ file.
3. Full grilling (sections 4, 5, 6, 11, 15, 16). Note dependency: Razorpay required for refund flow.
4. Impact Assessment mandatory (payment + inventory).

**Claude says:**
> Classified as Existing Module Feature with Payment/Finance Impact and Inventory Impact flags.  
> Modules: Customer Commerce / Order Cancellation, Payment Management / Refunds, Inventory Management / Stock Movements.  
> REQ-0015 created.  
>  
> This is a complex, cross-module request. Full discovery needed.  
>  
> **Important dependency:** Refund flow requires Razorpay to be live (Phase 11). Stock return can be built independently. Shall I scope this in two parts — stock return now, and refund flow after Razorpay go-live?

---

## Scenario 20 — Request is Already In Progress

**User says:** "Can we add order filters for admin?"

**Claude does:**
1. Classification check: Does an open REQ already exist for admin order filters?
2. If yes: inform user, link the existing REQ.
3. If no: proceed as Existing Feature Enhancement.

**Claude says (if duplicate):**
> This is already in progress as REQ-0010 — "Admin order list performance and filtering improvements." That request is currently Under Grilling.  
>  
> Do you want to add anything to that existing request, or is this a separate filtering feature?

---

*Last updated: 2026-06-21*

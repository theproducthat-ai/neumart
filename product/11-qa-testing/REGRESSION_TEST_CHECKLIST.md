# Regression Test Checklist

Run this checklist before signing off on any QA run, regardless of the feature being tested. Any regression must be treated as a blocking QA failure.

---

## How to Use

1. Copy this checklist into the QA run file (`test-runs/QA-NNNN.md`).
2. Check each item after every development session.
3. If a regression is found, create a bug entry in BUG_REGISTER.md and block the release.

---

## Customer Commerce — Core Flow

- [ ] **Home page loads** — Products display correctly. No broken images.
- [ ] **Category browse** — Filter by category works. Counts are correct.
- [ ] **Product detail page** — Price, stock status, description display correctly.
- [ ] **Add to cart** — Product added. Cart count in header updates.
- [ ] **View cart** — Line items, quantities, and total are correct.
- [ ] **Update quantity in cart** — Quantity changes. Total recalculates.
- [ ] **Remove item from cart** — Item removed. Total recalculates.
- [ ] **Cart persists after page refresh** — Zustand + localStorage persist works.
- [ ] **Checkout — address step** — Address loads if existing; can add new address.
- [ ] **Checkout — payment step** — Pay Later option present. Order placed correctly.
- [ ] **Order confirmation** — Order ID shown. Cart cleared.
- [ ] **Order history** — Customer can see past orders with correct status.

---

## User Management

- [ ] **Sign in / sign up (Clerk)** — Auth flow works end-to-end.
- [ ] **Profile page** — Name, email display correctly.
- [ ] **Address management** — Add, edit, delete address works.
- [ ] **Protected routes** — Unauthenticated users redirected to sign in.

---

## Admin Console — Core Flow

- [ ] **Admin access** — Only users with `publicMetadata.role === "admin"` can access `/admin/*`.
- [ ] **Dashboard** — Stats load without error.
- [ ] **Product list** — All products show. Pagination (if any) works.
- [ ] **Add product** — Product created. Appears in list and customer-facing.
- [ ] **Edit product** — Changes saved. Customer-facing reflects update.
- [ ] **Stock update** — Stock quantity changes. stockMovements record created.
- [ ] **Order list** — All orders show with correct status.
- [ ] **Order detail** — Line items, address, payment info correct.
- [ ] **Order status update** — Status change saves and reflects in customer view.

---

## Payment (Pay Later — Current MVP)

- [ ] **Order created with paymentMethod: "pay_later"** — Correct.
- [ ] **Order created with paymentStatus: "pending"** — Correct.
- [ ] **No Razorpay calls triggered** — No unexpected Razorpay API calls.

---

## Inventory

- [ ] **Out-of-stock product shows correct badge** — "Out of Stock" badge shown.
- [ ] **Cannot add out-of-stock product to cart** — Add to cart disabled or shows error.
- [ ] **Stock deduction on order** — After order placed, stock reduces by correct amount.
- [ ] **stockMovements record created** — Correct reason, delta, productId, orderId.

---

## Mobile Responsiveness

- [ ] **Home page — 375px** — No overflow, products display in grid.
- [ ] **Cart — 375px** — Items legible, quantity controls work, CTA visible.
- [ ] **Checkout — 375px** — All steps work without horizontal scroll.
- [ ] **Admin dashboard — 375px** — Usable on mobile (admin may access from phone).

---

## Performance and Errors

- [ ] **No console errors** on any page (open browser dev tools).
- [ ] **No 404s** in network tab for expected API or Convex calls.
- [ ] **Convex realtime subscriptions** — Data updates without page refresh where expected.

---

*Last updated: 2026-06-21*

# Nuemart — Deployment Checklist

Use this checklist before deploying to production. Work through each section top to bottom.

---

## 1. Environment Variables

- [ ] `.env.local` (dev) or production env vars are set in your hosting platform
- [ ] `NEXT_PUBLIC_CONVEX_URL` points to the **production** Convex deployment URL
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is the **production** Clerk key (`pk_live_…`)
- [ ] `CLERK_SECRET_KEY` is the **production** Clerk secret (`sk_live_…`)
- [ ] `NEXT_PUBLIC_APP_URL` is the production domain (e.g. `https://nuemart.com`)
- [ ] No test/dev keys (`pk_test_`, `sk_test_`, `rzp_test_`) are present in production

---

## 2. Clerk — Production Setup

- [ ] Clerk application is set to **Production** mode (not Development)
- [ ] Allowed redirect URLs include your production domain
- [ ] JWT Template for Convex is configured with the correct **Issuer URL**
- [ ] Social login providers (if any) are configured with production OAuth credentials
- [ ] Clerk webhook endpoint is set (if using user-sync webhooks — not required for current build)
- [ ] Clerk `publicMetadata.role` is set correctly for the first admin user

---

## 3. Convex — Production Deployment

- [ ] Deploy Convex to production: `npx convex deploy`
- [ ] `NEXT_PUBLIC_CONVEX_URL` in your hosting platform env is the **deployed** URL (not `localhost`)
- [ ] Convex auth config (`convex/auth.config.ts`) has the correct Clerk **domain/issuer URL**
- [ ] Convex schema is up to date (`npx convex deploy` runs codegen automatically)
- [ ] Indexes are in place (all indexes are defined in `convex/schema.ts`)

---

## 4. Admin Bootstrap

- [ ] First admin user is signed in via Clerk on the production app
- [ ] `bootstrapAdmin` mutation has been run **once** to grant admin role
  - Via Convex dashboard → Functions → `users:bootstrapAdmin` → Run
- [ ] The admin can access `/admin` without being redirected
- [ ] No additional admins are needed beyond the bootstrapped one (for MVP)

> **Important:** `bootstrapAdmin` can only be run once. If you need a second admin, set `role: "admin"` directly on the user record in the Convex data browser.

---

## 5. Seed Data (Optional)

> Only if you want to pre-populate the production environment with starter data.

- [ ] Admin is bootstrapped (required — seed is admin-only)
- [ ] Run: `npx convex run seed:seedDevelopmentData`
- [ ] Verify categories appear at `/products`
- [ ] Verify products appear in the admin dashboard

> Seed is idempotent — safe to run if already populated (it will skip).

---

## 6. Build Verification

Run these locally before deploying:

```bash
cd neumart

# Regenerate Convex types
npx convex codegen

# Type check
pnpm typecheck

# Lint
pnpm lint

# Production build
pnpm build
```

- [ ] `npx convex codegen` completes without errors
- [ ] `pnpm typecheck` passes with 0 errors
- [ ] `pnpm lint` passes with 0 errors
- [ ] `pnpm build` completes successfully

---

## 7. Vercel Deployment (Recommended)

- [ ] Repository is connected to Vercel project
- [ ] Build command is set to: `pnpm build` (or let Vercel auto-detect)
- [ ] Output directory: `.next` (Vercel default)
- [ ] Node.js version: 20.x
- [ ] All environment variables from section 1 are added in Vercel → Settings → Environment Variables
- [ ] Production deployment triggered and health-checked

**Build command** (if overriding):
```bash
cd neumart && npx convex codegen && pnpm build
```

---

## 8. Manual Smoke Test (Post-Deploy)

- [ ] Homepage (`/products`) loads and shows products
- [ ] Category filter works
- [ ] Product search works
- [ ] Product detail page opens
- [ ] Sign up / sign in works (Clerk)
- [ ] Cart add/remove/update works
- [ ] Cart persists after page refresh
- [ ] Address can be created
- [ ] Checkout page loads with address
- [ ] Order can be placed
- [ ] Order appears in `/orders`
- [ ] Order detail page opens
- [ ] Stock reduces after order
- [ ] Admin dashboard (`/admin`) is accessible only for admin
- [ ] Admin can view and update orders
- [ ] Admin inventory page loads
- [ ] Manual stock adjustment works
- [ ] Non-admin user is redirected away from `/admin`

---

## 9. Known Limitations at Launch

- **Payment gateway:** Razorpay is NOT integrated. All orders use `pay_later` mode.
- **Order mode:** Orders are placed without payment. Payment status is `pending` until manually updated.
- **No delivery tracking:** Order status is updated manually by admin.
- **No customer notifications:** No email/SMS for order updates.
- **Image hosting:** Product images are not managed — `imageUrl` is an optional field.
- **Admin stats:** `adminGetOrderStats` does a full table scan. Acceptable for MVP (<5k orders).

---

## 10. Future — Razorpay Integration Checklist

> Complete this section when integrating the payment gateway.

- [ ] Create Razorpay account and complete KYC
- [ ] Obtain `rzp_live_` Key ID and Key Secret
- [ ] Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` env vars
- [ ] Add `RAZORPAY_WEBHOOK_SECRET` env var
- [ ] Configure Razorpay webhook endpoint in dashboard
- [ ] Implement order creation mutation (`createRazorpayOrder`)
- [ ] Implement payment verification mutation (webhook + signature check)
- [ ] Wire up `payments` table (schema is already in place)
- [ ] Test with Razorpay test credentials before going live
- [ ] Switch to `rzp_live_` keys for production

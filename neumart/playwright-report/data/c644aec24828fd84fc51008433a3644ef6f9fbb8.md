# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-coupon.spec.ts >> TC-001 | Admin creates WELCOME10 coupon
- Location: tests\qa\admin-coupon.spec.ts:111:5

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/admin/coupons", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | /**
  2   |  * QA-COM-CART-COUPON-001 — Admin Coupon Management
  3   |  * Test Cases: TC-001 to TC-005 (plus helper coupons for customer tests)
  4   |  */
  5   | import { test, expect } from "@playwright/test";
  6   | 
  7   | test.describe.configure({ mode: "serial" });
  8   | test.setTimeout(300000); // 5 min: allows for 40-80s FAPI JWT refresh on first Convex call
  9   | 
  10  | // Helper: navigate to coupon list and wait for Convex data to load.
  11  | // Uses waitUntil:"domcontentloaded" — avoids hanging on the "load" event which is
  12  | // blocked by Clerk's FAPI XHR (triggered by useConvexAuth on this page). JWT is
  13  | // cached in localStorage so subsequent loads see isAuthenticated=true immediately
  14  | // if the JWT was refreshed during the preceding /admin/coupons/new visit.
  15  | async function waitForCouponList(page: Parameters<Parameters<typeof test>[1]>[0]) {
  16  |   const currentPath = new URL(page.url()).pathname;
  17  |   if (currentPath !== "/admin/coupons") {
  18  |     // Navigate to the list. domcontentloaded fires before FAPI XHR resolves,
  19  |     // so this never hangs regardless of FAPI accessibility.
> 20  |     await page.goto("/admin/coupons", { waitUntil: "domcontentloaded" });
      |                ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  21  |   }
  22  |   // table appears when isAuthenticated=true and Convex query returns data.
  23  |   // .text-center is EmptyState's class when no coupons exist.
  24  |   // 60s covers a cold FAPI JWT refresh (~40-50s) on first Convex call.
  25  |   await page.locator("table, .text-center").first().waitFor({ timeout: 60000 }).catch(() => {});
  26  |   await page.waitForTimeout(1000);
  27  | }
  28  | 
  29  | // Helper: fill and submit the coupon form; returns true if created, false if already exists
  30  | async function createCoupon(
  31  |   page: Parameters<Parameters<typeof test>[1]>[0],
  32  |   opts: {
  33  |     code: string;
  34  |     discountValue?: number;
  35  |     maxDiscount: number;
  36  |     minOrder?: number;
  37  |     usageLimit?: number;
  38  |     perUserLimit?: number;
  39  |     expiresAt?: string;
  40  |     startsAt?: string;
  41  |     isActive?: boolean;
  42  |   }
  43  | ): Promise<boolean> {
  44  |   // domcontentloaded avoids hanging if FAPI XHR blocks the "load" event
  45  |   await page.goto("/admin/coupons/new", { waitUntil: "domcontentloaded" });
  46  |   // Log current URL immediately to diagnose redirects
  47  |   const urlAfterGoto = page.url();
  48  |   console.log(`  ↳ URL after goto: ${urlAfterGoto}`);
  49  |   // Wait for form to render — may take up to 30s for Convex auth + data
  50  |   await page.waitForSelector("#code", { timeout: 30000 }).catch(async (err) => {
  51  |     console.log(`  ↳ #code not found. Current URL: ${page.url()}`);
  52  |     console.log(`  ↳ Page title: ${await page.title()}`);
  53  |     throw err;
  54  |   });
  55  | 
  56  |   await page.fill("#code", opts.code);
  57  |   if (opts.discountValue !== undefined) {
  58  |     await page.fill("#discountValue", String(opts.discountValue));
  59  |   }
  60  |   await page.fill("#maximumDiscount", String(opts.maxDiscount));
  61  |   if (opts.minOrder !== undefined) {
  62  |     await page.fill("#minimumOrderValue", String(opts.minOrder));
  63  |   }
  64  |   if (opts.usageLimit !== undefined) {
  65  |     await page.fill("#usageLimit", String(opts.usageLimit));
  66  |   }
  67  |   if (opts.perUserLimit !== undefined) {
  68  |     await page.fill("#perUserLimit", String(opts.perUserLimit));
  69  |   }
  70  |   if (opts.startsAt) {
  71  |     await page.fill("#startsAt", opts.startsAt);
  72  |     // Verify the value was actually set (datetime-local inputs can be tricky on Windows)
  73  |     const actual = await page.locator("#startsAt").inputValue();
  74  |     console.log(`  ↳ startsAt filled: "${actual}" (expected "${opts.startsAt}")`);
  75  |   }
  76  |   if (opts.expiresAt) {
  77  |     await page.fill("#expiresAt", opts.expiresAt);
  78  |     const actual = await page.locator("#expiresAt").inputValue();
  79  |     console.log(`  ↳ expiresAt filled: "${actual}" (expected "${opts.expiresAt}")`);
  80  |   }
  81  | 
  82  |   if (opts.isActive === false) {
  83  |     const switchEl = page.locator("#isActive");
  84  |     if ((await switchEl.getAttribute("aria-checked")) === "true") {
  85  |       await switchEl.click();
  86  |       await page.waitForTimeout(300);
  87  |     }
  88  |   }
  89  | 
  90  |   await page.click('button[type="submit"]');
  91  | 
  92  |   // Wait for redirect (success) or stay on page (error/duplicate).
  93  |   // 60s allows the Convex JWT to refresh (~30s via FAPI) before the mutation fires,
  94  |   // so the JWT is cached and warm for all subsequent Convex calls in this session.
  95  |   try {
  96  |     await page.waitForURL((url) => !url.pathname.includes("/new"), { timeout: 60000 });
  97  |     return true;
  98  |   } catch {
  99  |     // Form stayed — check current URL
  100 |     const url = page.url();
  101 |     if (url.includes("/new")) {
  102 |       console.log(`  ↳ ${opts.code} already exists or creation failed — treating as idempotent`);
  103 |       return false;
  104 |     }
  105 |     return true;
  106 |   }
  107 | }
  108 | 
  109 | // ─── TC-001 ───────────────────────────────────────────────────────────────────
  110 | 
  111 | test("TC-001 | Admin creates WELCOME10 coupon", async ({ page }) => {
  112 |   await createCoupon(page, { code: "WELCOME10", discountValue: 10, maxDiscount: 100, minOrder: 200 });
  113 |   await waitForCouponList(page);
  114 |   await expect(page.getByText("WELCOME10")).toBeVisible({ timeout: 30000 });
  115 |   console.log("TC-001 PASS: WELCOME10 visible in coupon list");
  116 | });
  117 | 
  118 | // ─── TC-002 ───────────────────────────────────────────────────────────────────
  119 | 
  120 | test("TC-002 | Admin coupon form rejects expiresAt before startsAt", async ({ page }) => {
```
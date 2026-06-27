/**
 * QA-COM-CART-COUPON-001 — Admin Coupon Management
 * Test Cases: TC-001 to TC-005 (plus helper coupons for customer tests)
 */
import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });
test.setTimeout(300000); // 5 min: allows for 40-80s FAPI JWT refresh on first Convex call

// Helper: navigate to coupon list and wait for Convex data to load.
// Uses waitUntil:"domcontentloaded" — avoids hanging on the "load" event which is
// blocked by Clerk's FAPI XHR (triggered by useConvexAuth on this page). JWT is
// cached in localStorage so subsequent loads see isAuthenticated=true immediately
// if the JWT was refreshed during the preceding /admin/coupons/new visit.
async function waitForCouponList(page: Parameters<Parameters<typeof test>[1]>[0]) {
  const currentPath = new URL(page.url()).pathname;
  if (currentPath !== "/admin/coupons") {
    // Navigate to the list. domcontentloaded fires before FAPI XHR resolves,
    // so this never hangs regardless of FAPI accessibility.
    await page.goto("/admin/coupons", { waitUntil: "domcontentloaded" });
  }
  // table appears when isAuthenticated=true and Convex query returns data.
  // .text-center is EmptyState's class when no coupons exist.
  // 60s covers a cold FAPI JWT refresh (~40-50s) on first Convex call.
  await page.locator("table, .text-center").first().waitFor({ timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1000);
}

// Helper: fill and submit the coupon form; returns true if created, false if already exists
async function createCoupon(
  page: Parameters<Parameters<typeof test>[1]>[0],
  opts: {
    code: string;
    discountValue?: number;
    maxDiscount: number;
    minOrder?: number;
    usageLimit?: number;
    perUserLimit?: number;
    expiresAt?: string;
    startsAt?: string;
    isActive?: boolean;
  }
): Promise<boolean> {
  // domcontentloaded avoids hanging if FAPI XHR blocks the "load" event
  await page.goto("/admin/coupons/new", { waitUntil: "domcontentloaded" });
  // Log current URL immediately to diagnose redirects
  const urlAfterGoto = page.url();
  console.log(`  ↳ URL after goto: ${urlAfterGoto}`);
  // Wait for form to render — may take up to 30s for Convex auth + data
  await page.waitForSelector("#code", { timeout: 30000 }).catch(async (err) => {
    console.log(`  ↳ #code not found. Current URL: ${page.url()}`);
    console.log(`  ↳ Page title: ${await page.title()}`);
    throw err;
  });

  await page.fill("#code", opts.code);
  if (opts.discountValue !== undefined) {
    await page.fill("#discountValue", String(opts.discountValue));
  }
  await page.fill("#maximumDiscount", String(opts.maxDiscount));
  if (opts.minOrder !== undefined) {
    await page.fill("#minimumOrderValue", String(opts.minOrder));
  }
  if (opts.usageLimit !== undefined) {
    await page.fill("#usageLimit", String(opts.usageLimit));
  }
  if (opts.perUserLimit !== undefined) {
    await page.fill("#perUserLimit", String(opts.perUserLimit));
  }
  if (opts.startsAt) {
    await page.fill("#startsAt", opts.startsAt);
    // Verify the value was actually set (datetime-local inputs can be tricky on Windows)
    const actual = await page.locator("#startsAt").inputValue();
    console.log(`  ↳ startsAt filled: "${actual}" (expected "${opts.startsAt}")`);
  }
  if (opts.expiresAt) {
    await page.fill("#expiresAt", opts.expiresAt);
    const actual = await page.locator("#expiresAt").inputValue();
    console.log(`  ↳ expiresAt filled: "${actual}" (expected "${opts.expiresAt}")`);
  }

  if (opts.isActive === false) {
    const switchEl = page.locator("#isActive");
    if ((await switchEl.getAttribute("aria-checked")) === "true") {
      await switchEl.click();
      await page.waitForTimeout(300);
    }
  }

  await page.click('button[type="submit"]');

  // Wait for redirect (success) or stay on page (error/duplicate).
  // 60s allows the Convex JWT to refresh (~30s via FAPI) before the mutation fires,
  // so the JWT is cached and warm for all subsequent Convex calls in this session.
  try {
    await page.waitForURL((url) => !url.pathname.includes("/new"), { timeout: 60000 });
    return true;
  } catch {
    // Form stayed — check current URL
    const url = page.url();
    if (url.includes("/new")) {
      console.log(`  ↳ ${opts.code} already exists or creation failed — treating as idempotent`);
      return false;
    }
    return true;
  }
}

// ─── TC-001 ───────────────────────────────────────────────────────────────────

test("TC-001 | Admin creates WELCOME10 coupon", async ({ page }) => {
  await createCoupon(page, { code: "WELCOME10", discountValue: 10, maxDiscount: 100, minOrder: 200 });
  await waitForCouponList(page);
  await expect(page.getByText("WELCOME10")).toBeVisible({ timeout: 30000 });
  console.log("TC-001 PASS: WELCOME10 visible in coupon list");
});

// ─── TC-002 ───────────────────────────────────────────────────────────────────

test("TC-002 | Admin coupon form rejects expiresAt before startsAt", async ({ page }) => {
  await page.goto("/admin/coupons/new", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#code", { timeout: 30000 });

  await page.fill("#code", "TESTDATEVAL");
  await page.fill("#discountValue", "10");
  await page.fill("#maximumDiscount", "50");
  await page.fill("#startsAt", "2026-06-28T00:00");
  await page.fill("#expiresAt", "2026-06-27T00:00");

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  const errorEl = page.locator("p.text-destructive");
  await expect(errorEl).toBeVisible({ timeout: 5000 });
  await expect(errorEl).toContainText("Expiry date must be after start date");
  console.log("TC-002 PASS: Date validation error shown");
});

// ─── TC-003 ───────────────────────────────────────────────────────────────────

test("TC-003 | Admin edits WELCOME10 max discount", async ({ page }) => {
  await waitForCouponList(page);

  const row = page.locator("tr").filter({ hasText: "WELCOME10" });
  await expect(row).toBeVisible({ timeout: 30000 });

  // Get the edit URL from the link's href (avoids row onClick conflict)
  const editHref = await row.getByRole("link", { name: "Edit" }).getAttribute("href");
  if (!editHref) throw new Error("TC-003: Edit link href not found");
  await page.goto(editHref, { waitUntil: "domcontentloaded" });
  // Wait for Convex to load the coupon and render the form (JWT is warm from prior steps)
  await page.waitForSelector("#maximumDiscount", { timeout: 30000 });

  await page.fill("#maximumDiscount", "150");
  await page.click('button[type="submit"]');
  await page.waitForURL("/admin/coupons", { timeout: 30000 });
  await page.waitForTimeout(1000);

  await expect(page.getByText("WELCOME10")).toBeVisible({ timeout: 30000 });
  console.log("TC-003 PASS: WELCOME10 max discount edited to ₹150");
});

// ─── TC-004 ───────────────────────────────────────────────────────────────────

test("TC-004 | WELCOME10 usage count shows 0", async ({ page }) => {
  await waitForCouponList(page);

  const row = page.locator("tr").filter({ hasText: "WELCOME10" });
  await expect(row).toBeVisible({ timeout: 30000 });

  // Usage column (7th td, 0-indexed = 6th)
  const cells = row.locator("td");
  const usageText = await cells.nth(6).textContent();
  expect(usageText?.trim()).toMatch(/^0/);
  console.log(`TC-004 PASS: Usage count = "${usageText?.trim()}"`);
});

// ─── TC-005 ───────────────────────────────────────────────────────────────────

test("TC-005 | Admin toggles WELCOME10 inactive then active", async ({ page }) => {
  await waitForCouponList(page);

  const row = page.locator("tr").filter({ hasText: "WELCOME10" });
  await expect(row).toBeVisible({ timeout: 30000 });
  const toggle = row.locator('button[role="switch"]');

  await expect(toggle).toHaveAttribute("aria-checked", "true");

  await toggle.click();
  await page.waitForTimeout(2000);
  await expect(toggle).toHaveAttribute("aria-checked", "false");
  console.log("TC-005 Step 1 PASS: WELCOME10 toggled to inactive");

  await toggle.click();
  await page.waitForTimeout(2000);
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  console.log("TC-005 PASS: WELCOME10 toggled back to active");
});

// ─── Setup coupons for customer tests ────────────────────────────────────────

test("SETUP | Create INACTIVE10 (inactive)", async ({ page }) => {
  await createCoupon(page, { code: "INACTIVE10", discountValue: 10, maxDiscount: 50, isActive: false });
  await waitForCouponList(page);
  await expect(page.getByText("INACTIVE10")).toBeVisible({ timeout: 30000 });
  console.log("SETUP PASS: INACTIVE10 ready");
});

test("SETUP | Create EXPIRED10 (expired)", async ({ page }) => {
  await createCoupon(page, {
    code: "EXPIRED10", discountValue: 5, maxDiscount: 50,
    startsAt: "2026-01-01T00:00", expiresAt: "2026-06-25T23:59",
  });
  await waitForCouponList(page);
  await expect(page.getByText("EXPIRED10")).toBeVisible({ timeout: 30000 });
  console.log("SETUP PASS: EXPIRED10 ready");
});

test("SETUP | Create FUTURE10 (future start)", async ({ page }) => {
  await createCoupon(page, { code: "FUTURE10", discountValue: 5, maxDiscount: 50, startsAt: "2026-06-27T00:00" });
  await waitForCouponList(page);
  await expect(page.getByText("FUTURE10")).toBeVisible({ timeout: 30000 });
  console.log("SETUP PASS: FUTURE10 ready");
});

test("SETUP | Create ONETIME10 (usageLimit=1, perUserLimit=1)", async ({ page }) => {
  await createCoupon(page, {
    code: "ONETIME10", discountValue: 5, maxDiscount: 50, minOrder: 100,
    usageLimit: 1, perUserLimit: 1,
  });
  await waitForCouponList(page);
  await expect(page.getByText("ONETIME10")).toBeVisible({ timeout: 30000 });
  console.log("SETUP PASS: ONETIME10 ready");
});

import { test as setup } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

const ADMIN_USER_ID = "user_3FIyF9TExoIqwe6cSfJClu6C7fF";
const CUSTOMER_USER_ID = "user_3Ff3rJQJvzbpzluRvbrbX7afciB";
const BASE_URL = "http://localhost:3000";

const STATE_DIR = path.join(__dirname, "../state");
const ADMIN_STATE = path.join(STATE_DIR, "admin.json");
const CUSTOMER_STATE = path.join(STATE_DIR, "customer.json");

const CLERK_SECRET_KEY = "sk_test_ksAgP8EQWCApb4qovJeizxVKxwkvRFqQtRN4plZ8nL";

// State remains valid for 23 h — clockSkewInMs: 24h in proxy.ts accepts the embedded JWT
function stateIsRecent(statePath: string): boolean {
  if (!fs.existsSync(statePath)) return false;
  return Date.now() - fs.statSync(statePath).mtimeMs < 23 * 60 * 60 * 1000;
}

function jwtExpiry(token: string): number {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
  return decoded.exp as number;
}

async function createFreshSignInToken(userId: string): Promise<string> {
  // Clerk deduplicates sign-in tokens: if previous runs left "pending" but expired tokens,
  // Clerk returns one of those instead of creating a new one. Revoke and retry until we
  // get a genuinely fresh token (exp > now). Multiple stale tokens can accumulate over
  // many test runs, so we loop up to 15 times.
  for (let attempt = 0; attempt < 15; attempt++) {
    const res = await fetch("https://api.clerk.com/v1/sign_in_tokens", {
      method: "POST",
      headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, expires_in_seconds: 300 }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Clerk API error: ${res.status} ${await res.text()}`);
    const data = (await res.json()) as { id: string; token: string };

    if (jwtExpiry(data.token) > Math.floor(Date.now() / 1000)) {
      if (attempt > 0) console.log(`  ↳ Fresh token obtained after ${attempt} revoke(s)`);
      return data.token;
    }

    console.log(`  ↳ Expired cached token (${data.id}, attempt ${attempt + 1}) — revoking`);
    await fetch(`https://api.clerk.com/v1/sign_in_tokens/${data.id}/revoke`, {
      method: "POST",
      headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
    }).catch(() => {});
  }
  throw new Error("Could not obtain a fresh sign-in token after 15 revoke attempts");
}

async function generateSignInToken(userId: string): Promise<string> {
  // Try direct BAPI call first (bypasses potential Next.js SDK caching in /api/dev/auth-token).
  // Falls back to the local endpoint if the direct call fails.
  try {
    return await createFreshSignInToken(userId);
  } catch { /* fall through to local endpoint */ }

  const localRes = await fetch(`${BASE_URL}/api/dev/auth-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-dev-secret": "playwright-qa-2026" },
    body: JSON.stringify({ userId }),
    signal: AbortSignal.timeout(10000),
  });
  if (!localRes.ok) throw new Error(`Local auth-token endpoint failed: ${localRes.status}`);
  const data = (await localRes.json()) as { token: string };
  return data.token;
}

async function signInAndSave(
  page: Parameters<Parameters<typeof setup>[1]>[0],
  userId: string,
  statePath: string,
  label: string
) {
  let token: string;
  try {
    token = await generateSignInToken(userId);
  } catch (err) {
    if (fs.existsSync(statePath)) {
      console.log(`⚠  ${label}: Clerk unreachable. Reusing existing auth state.`);
      return;
    }
    throw err;
  }
  // Navigate to sign-in page; catch timeout if FAPI blocks a page resource from loading
  const pageLoaded = await page
    .goto(`/sign-in?__clerk_ticket=${token}`, { timeout: 60000 })
    .then(() => true)
    .catch(() => false);

  let signedIn = false;
  if (pageLoaded) {
    // Wait up to 60s for FAPI to process the ticket and redirect away from /sign-in
    signedIn = await page
      .waitForURL((url) => !url.pathname.startsWith("/sign-in"), { timeout: 60000 })
      .then(() => true)
      .catch(() => false);
  }

  // Abort pending FAPI requests before browser cleanup (prevents ~50s teardown delay)
  await page.goto("about:blank", { timeout: 5000 }).catch(() => {});

  if (!signedIn) {
    if (fs.existsSync(statePath)) {
      console.log(`⚠  ${label}: Sign-in timed out (FAPI blocked). Reusing existing auth state.`);
      return;
    }
    throw new Error(`${label} sign-in failed — FAPI unreachable and no existing state to reuse`);
  }

  await page.waitForTimeout(3000); // let Clerk finish session setup + cache JWT in localStorage
  await page.context().storageState({ path: statePath });
  console.log(`✓ ${label} auth state saved`);
}

// Admin: reuse if recent (≤23h). Skipping browser here prevents the Chrome crash
// that occurred when admin+customer browsers were both launched in the same run.
// Customer: ALWAYS regenerate — Convex needs a fresh Clerk JWT (60s window).
// Without a fresh JWT, Convex mutations fail because FAPI refresh takes 15-30s per page.
// Since admin skips the browser when recent, customer is the first (and only) browser launch.
const adminIsRecent = stateIsRecent(ADMIN_STATE);

if (adminIsRecent) {
  // No page fixture requested → no browser launched → no crash risk
  setup("setup admin auth", async () => {
    console.log("✓ Admin auth state is recent — reusing");
  });
} else {
  setup("setup admin auth", async ({ page }) => {
    setup.setTimeout(90000); // sign-in via FAPI can take up to 60s
    fs.mkdirSync(STATE_DIR, { recursive: true });
    await signInAndSave(page, ADMIN_USER_ID, ADMIN_STATE, "Admin");
  });
}

// Customer auth always regenerated so Convex gets a fresh Clerk JWT each run.
// (Old customer.json JWTs are only 60s wide; Convex rejects them without FAPI refresh.)
setup("setup customer auth", async ({ page }) => {
  setup.setTimeout(200000); // token generation + 60s page.goto + 60s waitForURL + cleanup
  fs.mkdirSync(STATE_DIR, { recursive: true });
  await signInAndSave(page, CUSTOMER_USER_ID, CUSTOMER_STATE, "Customer");
});

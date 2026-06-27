import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/qa",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "setup",
      testMatch: /setup\/auth\.setup\.ts/,
    },
    {
      name: "admin-coupon",
      testMatch: /admin-coupon\.spec\.ts/,
      dependencies: ["setup"],
      use: { storageState: "tests/qa/state/admin.json" },
    },
    {
      name: "customer-coupon",
      testMatch: /customer-coupon\.spec\.ts/,
      dependencies: ["setup", "admin-coupon"],
      use: { storageState: "tests/qa/state/customer.json" },
    },
  ],
});

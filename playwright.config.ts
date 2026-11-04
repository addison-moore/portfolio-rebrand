import { defineConfig, devices } from "@playwright/test";

// Deliberately obscure: a common port risks adopting an unrelated local
// service instead of this app.
const PORT = 4311;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL, trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Tests run against a production build served the same way the container
    // serves it — `next start` is not supported with output: "standalone".
    command: `npm run build && PORT=${PORT} npm start`,
    url: baseURL,
    // Never adopt a server this run did not start — doing so silently tests
    // whatever happens to be listening.
    reuseExistingServer: false,
    timeout: 180_000,
  },
});

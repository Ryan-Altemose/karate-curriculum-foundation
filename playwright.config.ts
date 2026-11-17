import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:8083",
    channel: "msedge",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Edge"] } },
    { name: "phone", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run build:web && npm run preview:web",
    url: "http://127.0.0.1:8083",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { EXPO_OFFLINE: "1" },
  },
});

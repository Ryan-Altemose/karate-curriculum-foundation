import { expect, test } from "@playwright/test";

test("initial HTML shows loading before JavaScript arrives and clears when ready", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route(/\/entry-[^/]+\.js$/, async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.getByRole("status", { name: "Loading app" })).toBeVisible();
  } finally {
    release();
  }
  await expect(page.getByRole("heading", { name: /^ESK KataLog$/i })).toBeVisible();
  await expect(page.getByRole("status", { name: "Loading app" })).toHaveCount(0);
});

test("screen code is ready after startup without additional navigation downloads", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "View Weapon Kata", exact: true })).toBeVisible();
  const scriptRequests: string[] = [];
  page.on("request", (request) => {
    if (/\/_expo\/.*\.js$/.test(request.url())) scriptRequests.push(request.url());
  });
  await page.getByRole("button", { name: "View Weapon Kata", exact: true }).click();
  await expect(page).toHaveURL("/weapon-kata");
  await page.getByRole("button", { name: "Sai Kihon", exact: true }).click();
  await expect(page).toHaveURL("/weapon-kata/sai-kihon");
  await page.getByRole("button", { name: "Sai Kihon 1", exact: true }).click();
  await expect(page).toHaveURL("/weapon-kata/sai-kihon-1");
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Sai Kihon 1", exact: true })).toBeVisible();
  expect(scriptRequests).toEqual([]);
  await expect(page.getByRole("status", { name: "Loading app" })).toHaveCount(0);
});

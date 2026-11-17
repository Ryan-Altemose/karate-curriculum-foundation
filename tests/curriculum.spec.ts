import { expect, test } from "@playwright/test";

test("home offers curriculum browsing without a student dashboard", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Curriculum reference", { exact: true })).toBeVisible();
  await expect(page.getByText(/classes attended|next graduation date|current rank/i)).toHaveCount(0);
  await page.getByRole("button", { name: "View Kata", exact: true }).click();
  await expect(page).toHaveURL(/\/kata$/);
  await page.getByRole("button", { name: "Kusanku", exact: true }).click();
  await expect(page).toHaveURL(/\/kata\/kusanku$/);
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
});

test("advanced belt requirements and their techniques are accessible", async ({ page }) => {
  await page.goto("/curriculum", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "BLACK BELTS", exact: true }).click();
  await expect(page.getByText(/locked|current rank/i)).toHaveCount(0);
  await page.getByRole("button", { name: "Kudan", exact: true }).click();
  await expect(page).toHaveURL(/\/curriculum\/kudan$/);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByText("Main requirements for this rank")).toBeVisible();
});

for (const [route, name, itemId] of [
  ["weapon-kata", "Mizoniatoshi", "mizoniatoshi"],
  ["partner-drill", "Uke Waza 7", "uke-waza-7"],
  ["self-defense", "Front Choke", "front-choke"],
]) {
  test(`${route} items open without rank restrictions`, async ({ page }) => {
    await page.goto(`/${route}`, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${route}/${itemId}$`));
    await expect(page.getByText("No video available", { exact: true })).toBeVisible();
  });
}

test("Gojushiho loads and plays its demonstration", async ({ page }) => {
  await page.goto("/kata/gojushiho", { waitUntil: "domcontentloaded" });
  const video = page.locator("video");
  await expect(video).toHaveCount(1);
  await expect(video).toHaveJSProperty("controls", true);
  await expect(video).toHaveJSProperty("playsInline", true);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState)).toBeGreaterThanOrEqual(1);
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  await video.evaluate((element: HTMLVideoElement) => { element.pause(); element.currentTime = 5; });
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeCloseTo(5, 0);
});

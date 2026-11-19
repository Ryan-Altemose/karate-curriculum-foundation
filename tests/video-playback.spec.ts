import { expect, test } from "@playwright/test";

test("compressed Gojushiho recording plays in the production app", async ({ page }) => {
  await page.goto("/kata/gojushiho", { waitUntil: "domcontentloaded" });
  const video = page.locator("video");
  await expect(video).toHaveCount(1);
  await expect(video).toHaveJSProperty("controls", true);
  await expect(video).toHaveJSProperty("playsInline", true);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveCSS("object-fit", "contain");
  const frame = await video.boundingBox();
  expect(frame).not.toBeNull();
  expect(frame!.width / frame!.height).toBeCloseTo(16 / 9, 2);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState), { timeout: 20_000 }).toBeGreaterThanOrEqual(1);
  const assetUrl = await video.evaluate((element: HTMLVideoElement) => element.currentSrc);
  expect(assetUrl).toContain("first_test_gojushiho");
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  await video.evaluate((element: HTMLVideoElement) => { element.pause(); element.currentTime = 5; });
  await expect(video).toHaveJSProperty("paused", true);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeCloseTo(5, 0);
});

test("entries without a recording retain their placeholder", async ({ page }) => {
  await page.goto("/kata/chinto", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);
});

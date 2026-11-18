import { expect, test } from "@playwright/test";

test("wave background stays at the screen bottom while content scrolls and remains interactive", async ({ page }) => {
  await page.goto("/kata", { waitUntil: "domcontentloaded" });
  const background = page.getByTestId("app-background");
  const waves = page.getByTestId("seigaiha-background");
  await expect(background).toHaveCSS("background-color", "rgb(250, 250, 250)");
  await expect(waves).toBeVisible();
  // An opaque navigation wrapper would hide the pattern even if its SVG exists.
  await expect.poll(() => page.evaluate(() =>
    document.elementsFromPoint(4, window.innerHeight - 4)
      .map((element) => getComputedStyle(element).backgroundColor)
      .filter((color) => !["transparent", "rgba(0, 0, 0, 0)", "rgb(250, 250, 250)"].includes(color))
  )).toEqual([]);
  const before = await waves.boundingBox();
  expect(before).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(before!.y).toBeGreaterThan(viewport.height / 2);
  expect(before!.width).toBeCloseTo(viewport.width, 0);
  expect(before!.y + before!.height).toBeCloseTo(viewport.height, 0);

  const lastEntry = page.getByRole("button", { name: "Kusanku", exact: true });
  await lastEntry.scrollIntoViewIfNeeded();
  await expect.poll(() => waves.boundingBox()).toEqual(before);
  await lastEntry.click();
  await expect(page).toHaveURL(/\/kata\/kusanku$/);
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
});

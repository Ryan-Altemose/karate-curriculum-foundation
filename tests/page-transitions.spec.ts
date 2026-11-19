import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const recorded: { from: number; to: number; duration: number; changesOpacity: boolean }[] = [];
    Object.assign(window, { pageSlides: recorded });
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      const animation = animate.apply(this, args);
      if (this.getAttribute("data-testid") === "page-transition") {
        const effect = animation.effect as KeyframeEffect;
        const frames = effect.getKeyframes();
        recorded.push({
          from: new DOMMatrix(String(frames[0].transform)).m41,
          to: new DOMMatrix(String(frames.at(-1)!.transform)).m41,
          duration: Number(effect.getTiming().duration),
          changesOpacity: frames.some((frame) => "opacity" in frame),
        });
      }
      return animation;
    };
  });
});

test("pages slide forward and reverse for both header and browser Back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const slides = () => page.evaluate(() => (window as unknown as { pageSlides: { from: number; to: number; duration: number; changesOpacity: boolean }[] }).pageSlides);
  await expect(page.getByRole("button", { name: "View Kata", exact: true })).toBeVisible();
  expect(await slides()).toEqual([]);
  await page.getByRole("button", { name: "View Kata", exact: true }).click();
  await expect.poll(async () => (await slides()).length).toBe(1);
  await page.getByRole("button", { name: "Kusanku", exact: true }).click();
  await expect.poll(async () => (await slides()).length).toBe(2);
  await page.getByRole("link", { name: "Go back", exact: true }).click();
  await expect(page).toHaveURL("/kata");
  await expect.poll(async () => (await slides()).length).toBe(3);
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "View Kata", exact: true })).toBeVisible();
  await expect.poll(async () => (await slides()).length).toBe(4);
  const recorded = await slides();
  expect(recorded.map((slide) => Math.sign(slide.from))).toEqual([1, 1, -1, -1]);
  for (const slide of recorded) {
    expect(slide.to).toBe(0);
    expect(slide.duration).toBeGreaterThanOrEqual(350);
    expect(slide.duration).toBeLessThanOrEqual(550);
    expect(slide.changesOpacity).toBe(false);
  }
});

test("reduced motion skips page slides", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "View Kata", exact: true }).click();
  await expect(page.getByRole("button", { name: "Kusanku", exact: true })).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as { pageSlides: unknown[] }).pageSlides)).toEqual([]);
});

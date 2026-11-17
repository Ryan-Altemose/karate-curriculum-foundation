import { expect, test } from "@playwright/test";

const numberedNames = Array.from({ length: 11 }, (_, index) => `Tonfa Kihon ${index + 1}`);

for (const [entryPoint, label] of [
  ["/weapon-kata", "Tonfa Kihon"],
  ["/curriculum/purple-brown", "Tonfa Kihon 1-7"],
  ["/curriculum/brown", "Tonfa Kihon 8-11"],
]) {
  test(`${label} opens all eleven entries from ${entryPoint}`, async ({ page }) => {
    await page.goto(entryPoint, { waitUntil: "domcontentloaded" });
    const group = page.getByRole("button", { name: label, exact: true });
    await expect(group).toHaveCount(1);
    await expect(page.getByRole("button", { name: /^Tonfa Kihon \d+$/ })).toHaveCount(0);
    await group.click();
    await expect(page).toHaveURL(/\/weapon-kata\/tonfa-kihon$/);
    const rows = page.getByRole("button", { name: /^Tonfa Kihon \d+$/ });
    await expect(rows).toHaveCount(11);
    await expect.poll(() => rows.evaluateAll((elements) => elements.map((element) => element.getAttribute("aria-label")))).toEqual(numberedNames);

    // Either rank can open techniques from both requirement ranges.
    for (const number of [1, 11]) {
      await page.getByRole("button", { name: `Tonfa Kihon ${number}`, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/weapon-kata/tonfa-kihon-${number}$`));
      await expect(page.getByText("No video available", { exact: true })).toBeVisible();
      await page.goBack({ waitUntil: "domcontentloaded" });
      await expect(rows).toHaveCount(11);
    }
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(group).toBeVisible();
  });
}

test("Tonfa group and numbered detail URLs work directly", async ({ page }) => {
  await page.goto("/weapon-kata/tonfa-kihon", { waitUntil: "domcontentloaded" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Tonfa Kihon 1", exact: true })).toBeVisible();
  await page.goto("/weapon-kata/tonfa-kihon-11", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Tonfa Kihon 11", { exact: true })).toBeVisible();
});

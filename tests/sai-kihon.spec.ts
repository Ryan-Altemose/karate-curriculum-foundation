import { expect, test } from "@playwright/test";

const numberedNames = Array.from({ length: 12 }, (_, index) => `Sai Kihon ${index + 1}`);

for (const entryPoint of ["/weapon-kata", "/curriculum/red-black"]) {
  test(`Sai Kihon is grouped from ${entryPoint}`, async ({ page }) => {
    await page.goto(entryPoint, { waitUntil: "domcontentloaded" });
    const group = page.getByRole("button", { name: "Sai Kihon", exact: true });
    await expect(group).toHaveCount(1);
    await expect(page.getByRole("button", { name: /^Sai Kihon \d+$/ })).toHaveCount(0);
    await group.click();
    await expect(page).toHaveURL(/\/weapon-kata\/sai-kihon$/);
    const numberedRows = page.getByRole("button", { name: /^Sai Kihon \d+$/ });
    await expect(numberedRows).toHaveCount(12);
    await expect.poll(() => numberedRows.evaluateAll((rows) => rows.map((row) => row.getAttribute("aria-label")))).toEqual(numberedNames);

    await page.getByRole("button", { name: "Sai Kihon 12", exact: true }).click();
    await expect(page).toHaveURL(/\/weapon-kata\/sai-kihon-12$/);
    await expect(page.getByText("No video available", { exact: true })).toBeVisible();
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(numberedRows).toHaveCount(12);
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(new RegExp(`${entryPoint}$`));
    await expect(group).toBeVisible();
  });
}

test("Sai Kihon group and numbered entries support direct links", async ({ page }) => {
  await page.goto("/weapon-kata/sai-kihon", { waitUntil: "domcontentloaded" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Sai Kihon 1", exact: true })).toBeVisible();
  await page.goto("/weapon-kata/sai-kihon-1", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Sai Kihon 1", { exact: true })).toBeVisible();
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
});

test("weapon search finds Sai and Tonfa groups", async ({ page }) => {
  await page.goto("/weapon-kata", { waitUntil: "domcontentloaded" });
  await page.getByRole("searchbox", { name: "Search entries" }).fill("sai kihon");
  await expect(page.getByTestId("catalog-entries").getByRole("button")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Sai Kihon", exact: true })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search entries" }).fill("tonfa kihon");
  await expect(page.getByTestId("catalog-entries").getByRole("button")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Tonfa Kihon", exact: true })).toBeVisible();
});

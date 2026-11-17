import { expect, test } from "@playwright/test";

const members = [
  ["Escrima Pattern 1", "escrima-pattern-1"],
  ["Escrima Pattern 2", "escrima-pattern-2"],
  ["Six Count One Stick", "six-count-one-stick"],
  ["Four Count Two Stick", "four-count-two-stick"],
  ["Six Count Two Stick", "six-count-two-stick"],
];

for (const entryPoint of ["/weapon-kata", "/curriculum/green-purple"]) {
  test(`Escrima Stick Patterns is grouped from ${entryPoint}`, async ({ page }) => {
    await page.goto(entryPoint, { waitUntil: "domcontentloaded" });
    const group = page.getByRole("button", { name: "Escrima Stick Patterns", exact: true });
    await expect(group).toHaveCount(1);
    for (const [name] of members) {
      await expect(page.getByRole("button", { name, exact: true })).toHaveCount(0);
    }
    await group.click();
    await expect(page).toHaveURL(/\/weapon-kata\/escrima-stick-patterns$/);
    const rows = page.getByRole("button", { name: /^(Escrima Pattern [12]|Six Count One Stick|Four Count Two Stick|Six Count Two Stick)$/ });
    await expect(rows).toHaveCount(5);
    await expect.poll(() => rows.evaluateAll((elements) => elements.map((element) => element.getAttribute("aria-label")))).toEqual(members.map(([name]) => name));
    for (const [name, id] of members) {
      await page.getByRole("button", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/weapon-kata/${id}$`));
      await expect(page.getByText("No video available", { exact: true })).toBeVisible();
      await page.goBack({ waitUntil: "domcontentloaded" });
    }
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(group).toBeVisible();
  });
}

test("Escrima group supports search and direct-link refresh", async ({ page }) => {
  await page.goto("/weapon-kata", { waitUntil: "domcontentloaded" });
  await page.getByRole("searchbox", { name: "Search entries" }).fill("escrima");
  await expect(page.getByTestId("catalog-entries").getByRole("button")).toHaveCount(1);
  await page.getByRole("button", { name: "Escrima Stick Patterns", exact: true }).click();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Six Count Two Stick", exact: true })).toBeVisible();
  await page.goto("/weapon-kata/six-count-two-stick", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Six Count Two Stick", { exact: true })).toBeVisible();
});

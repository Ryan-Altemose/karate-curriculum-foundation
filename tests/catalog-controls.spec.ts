import { expect, test } from "@playwright/test";

for (const route of ["kata", "weapon-kata", "partner-drill", "self-defense"]) {
  test(`${route} searches names and reverses the existing rank sequence`, async ({ page }) => {
    await page.goto(`/${route}`, { waitUntil: "domcontentloaded" });
    const search = page.getByRole("searchbox", { name: "Search entries" });
    await expect(search).toBeVisible();
    const rows = page.getByTestId("catalog-entries").getByRole("button");
    // Compare accessible entry names, independent of asynchronous icon-font loading.
    const entryNames = () => rows.evaluateAll((elements) => elements.map((element) => element.getAttribute("aria-label") ?? ""));
    const rankOrder = await entryNames();
    expect(rankOrder.length).toBeGreaterThan(1);

    const reverseOrder = page.getByRole("switch", { name: "Reverse-rank order", exact: true });
    await expect(reverseOrder).not.toBeChecked();
    await reverseOrder.check();
    await expect.poll(entryNames).toEqual([...rankOrder].reverse());

    // Search ignores capitalization and surrounding spaces, and matches part of a name.
    const query = rankOrder[0].trim().slice(0, 4);
    await search.fill(`  ${query.toUpperCase()}  `);
    const matchingNames = rankOrder.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
    await expect.poll(entryNames).toEqual([...matchingNames].reverse());
    await reverseOrder.uncheck();
    await expect.poll(entryNames).toEqual(matchingNames);

    await search.fill("no-such-technique");
    await expect(rows).toHaveCount(0);
    await expect(page.getByText("No entries match your search.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Clear search", exact: true }).click();
    await expect(search).toHaveValue("");
    await expect.poll(entryNames).toEqual(rankOrder);
    await rows.first().click();
    await expect(page).toHaveURL(new RegExp(`/${route}/[^/]+$`));
  });
}

test("belt browsing has no search or sorting controls", async ({ page }) => {
  await page.goto("/curriculum", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "BLACK BELTS", exact: true })).toBeVisible();
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await expect(page.getByRole("switch", { name: "Reverse-rank order", exact: true })).toHaveCount(0);
});

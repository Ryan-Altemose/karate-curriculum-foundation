import { expect, test } from "@playwright/test";

const groups = [
  { id: "conditioning-drills", name: "Conditioning Drills", items: ["Punching Blocking Drill"], firstId: "punching-blocking-drill" },
  { id: "fighting-attacks", name: "Fighting Attacks", items: ["Fighting Attack 1", "Fighting Attack 2", "Fighting Attack 3"], firstId: "fighting-attack-1" },
  { id: "uke-waza", name: "Uke Waza", items: Array.from({ length: 7 }, (_, index) => `Uke Waza ${index + 1}`), firstId: "uke-waza-1" },
  { id: "promise-kumite", name: "Promise Kumite", items: Array.from({ length: 7 }, (_, index) => `Promise Kumite ${index + 1}`), firstId: "promise-kumite-1" },
];

test("partner drills lists the four groups in fixed order without search or sorting", async ({ page }) => {
  await page.goto("/partner-drill", { waitUntil: "domcontentloaded" });
  const rows = page.getByTestId("catalog-entries").getByRole("button");
  await expect.poll(() => rows.evaluateAll((elements) => elements.map((element) => element.getAttribute("aria-label"))))
    .toEqual(groups.map((group) => group.name));
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await expect(page.getByRole("switch", { name: "Reverse-rank order", exact: true })).toHaveCount(0);
});

for (const group of groups) {
  test(`${group.name} opens its drills and supports direct links and Back`, async ({ page }) => {
    await page.goto("/partner-drill", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: group.name, exact: true }).click();
    await expect(page).toHaveURL(`/partner-drill/${group.id}`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: group.name, exact: true }).last()).toBeVisible();
    const rows = page.getByTestId("catalog-group-entries").getByRole("button");
    await expect.poll(() => rows.evaluateAll((elements) => elements.map((element) => element.getAttribute("aria-label"))))
      .toEqual(group.items);
    await page.getByRole("button", { name: group.items[0], exact: true }).click();
    await expect(page).toHaveURL(`/partner-drill/${group.firstId}`);
    await expect(page.getByText("No video available", { exact: true })).toBeVisible();
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(rows).toHaveCount(group.items.length);
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: group.name, exact: true })).toBeVisible();
  });
}

test("rank requirements retain direct links to specific partner drills", async ({ page }) => {
  await page.goto("/curriculum/purple", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Promise Kumite 3", exact: true }).click();
  await expect(page).toHaveURL("/partner-drill/promise-kumite-3");
  await expect(page.getByText("No video available", { exact: true })).toBeVisible();
  await page.goto("/partner-drill/fighting-attack-3-no-takedown", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Fighting Attack 3 (No Takedown)", { exact: true })).toBeVisible();
});

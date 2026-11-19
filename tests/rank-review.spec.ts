import { expect, test } from "@playwright/test";

test("Ikkyu introduces review links while retaining its new techniques", async ({ page }) => {
  await page.goto("/curriculum/red-black", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Fukyugata Sandan", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sai Kihon", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Knife Attack 2", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "View All Partner Drills", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "View All Kata", exact: true })).toHaveCount(0);
  await expect(page.getByText("Curriculum details will be added soon.", { exact: true })).toHaveCount(0);
});

for (const category of [
  { label: "View All Kata", path: "/kata", message: "Review previously learned kata.", entry: "Kusanku" },
  { label: "View All Weapon Kata", path: "/weapon-kata", message: "Review previously learned weapon kata.", entry: "Sai Kihon" },
  { label: "View All Partner Drills", path: "/partner-drill", message: "Review previously learned partner drills.", entry: "Uke Waza" },
  { label: "View All Self-Defense", path: "/self-defense", message: "Review previously learned self-defense techniques.", entry: "Front Choke" },
]) {
  test(`${category.label} opens the full category and supports Back`, async ({ page }) => {
    await page.goto("/curriculum/kudan", { waitUntil: "domcontentloaded" });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByText(category.message, { exact: true })).toBeVisible();
    await page.getByRole("button", { name: category.label, exact: true }).click();
    await expect(page).toHaveURL(category.path);
    await expect(page.getByRole("button", { name: category.entry, exact: true })).toBeVisible();
    await page.goBack({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: category.label, exact: true })).toBeVisible();
  });
}

test("Shodan Ho keeps Wankan as its new kata", async ({ page }) => {
  await page.goto("/curriculum/shodan-ho", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Wankan", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "View All Kata", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "View All Partner Drills", exact: true }).click();
  await expect(page).toHaveURL("/partner-drill");
});

test("Godan Ho retains its new weapon while kata becomes review-only", async ({ page }) => {
  await page.goto("/curriculum/godan-ho", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Shikina No Tonfa", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "View All Kata", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "View All Weapon Kata", exact: true })).toHaveCount(0);
});

test("ranks below Ikkyu keep their specific requirements", async ({ page }) => {
  await page.goto("/curriculum/red", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: /^Promise Kumite \d+$/ })).toHaveCount(7);
  await expect(page.getByRole("button", { name: /^View All / })).toHaveCount(0);
  await page.goto("/curriculum/no-belt", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("None", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /^View All / })).toHaveCount(0);
});

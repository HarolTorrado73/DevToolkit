import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home page renders the product brand and primary CTA", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "DevToolkit", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Browse tools" }),
    ).toBeVisible();
  });

  test("tools catalog is reachable and searchable", async ({ page }) => {
    await page.goto("/tools");

    await expect(
      page.getByRole("heading", { name: "Tools", level: 1 }),
    ).toBeVisible();
    await expect(page.getByLabel("Search tools")).toBeVisible();
    await expect(
      page.getByText("No tools registered yet", { exact: false }),
    ).toBeVisible();
  });

  test("unknown tool slug shows a not-found state", async ({ page }) => {
    await page.goto("/tools/this-tool-does-not-exist");

    await expect(
      page.getByRole("heading", { name: "Tool not found", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Browse tools" }),
    ).toBeVisible();
  });
});

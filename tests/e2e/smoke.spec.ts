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

  test("tools catalog lists registered modules", async ({ page }) => {
    await page.goto("/tools");

    await expect(
      page.getByRole("heading", { name: "Tools", level: 1 }),
    ).toBeVisible();
    await expect(page.getByLabel("Search tools")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /JSON Formatter/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Regex Tester/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /QR Generator/i }),
    ).toBeVisible();
  });

  test("regex tester reports matches", async ({ page }) => {
    await page.goto("/tools/regex-tester");

    await expect(
      page.getByRole("heading", { name: "Regex Tester", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(/match/i).first()).toBeVisible();
  });

  test("json formatter formats sample input", async ({ page }) => {
    await page.goto("/tools/json-formatter");

    await expect(
      page.getByRole("heading", { name: "JSON Formatter", level: 1 }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Format" }).click();
    await expect(page.getByText("Formatted JSON.")).toBeVisible();
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

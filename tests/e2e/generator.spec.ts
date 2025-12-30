import { expect, test } from "@playwright/test";

test("home page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /static qr generator/i })).toBeVisible();
});

test("url generator page renders", async ({ page }) => {
  await page.goto("/url-qr-code");
  await expect(page.getByRole("heading", { name: "URL QR Code Generator" })).toBeVisible();
  await expect(page.getByRole("button", { name: /download png/i })).toBeVisible();
});

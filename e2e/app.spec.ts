import { test, expect } from '@playwright/test';

test.describe('Civic Guide — Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Civic Guide/i);
  });

  test('navigation links are visible', async ({ page }) => {
    await page.goto('/');
    // Verify key navigation elements exist
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Find and click the dark mode toggle
    const toggle = page
      .locator('[aria-label*="dark"], [aria-label*="theme"], [data-testid="theme-toggle"]')
      .first();
    if (await toggle.isVisible()) {
      await toggle.click();
      const newClass = await html.getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    }
  });

  test('flows/wizard page loads', async ({ page }) => {
    await page.goto('/flows');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});

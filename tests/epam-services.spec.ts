import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services Navigation
 *
 * Covers the end-to-end navigation flow:
 *   Home → Services (header menu) → Explore Our Client Work → Client Work page
 */
test.describe('EPAM Services Navigation', () => {

  test('should navigate from Home to Client Work page via Services menu', async ({ page }) => {

    // ─── Step 1: Navigate to the EPAM homepage ───────────────────────────────
    await test.step('Navigate to https://www.epam.com/', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(
        /EPAM\s*\|\s*Software Engineering & Product Development Services/i,
      );
    });

    // ─── Step 2: Click "Services" in the main header navigation ──────────────
    await test.step('Click "Services" in the header navigation menu', async () => {
      const servicesLink = page.getByRole('navigation').getByRole('link', { name: 'Services' });
      await expect(servicesLink).toBeVisible();
      await servicesLink.click();

      // Confirm the browser has landed on the /services page
      await expect(page).toHaveURL(/\/services/i);
    });

    // ─── Step 3: Click the "Explore Our Client Work" link ────────────────────
    await test.step('Click the "Explore Our Client Work" link', async () => {
      const exploreLink = page.getByRole('link', { name: /explore our client work/i });
      await expect(exploreLink).toBeVisible();
      await exploreLink.click();

      // Confirm the browser has landed on the /services/client-work page
      await expect(page).toHaveURL(/\/services\/client-work/i);
    });

    // ─── Step 4: Verify "Client Work" heading is visible on the page ─────────
    await test.step('Verify "Client Work" text is visible on the page', async () => {
      const clientWorkHeading = page.getByRole('heading', { name: /client work/i }).first();
      await expect(clientWorkHeading).toBeVisible();
    });

  });

});

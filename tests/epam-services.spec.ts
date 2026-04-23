import { test, expect } from '@playwright/test';

test.describe('EPAM Services Navigation', () => {
  test('should navigate to Client Work page via Services header menu', async ({ page }) => {

    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to https://www.epam.com/', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/i);
    });

    // Step 2: Select "Services" from the header navigation menu
    await test.step('Select "Services" from the header menu', async () => {
      const header = page.getByRole('navigation');
      const servicesLink = header.getByRole('link', { name: /^services$/i });
      await servicesLink.click();
      await expect(page).toHaveURL(/\/services/i);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click the "Explore Our Client Work" link', async () => {
      const exploreLink = page.getByRole('link', { name: /explore our client work/i });
      await exploreLink.first().click();
      await expect(page).toHaveURL(/\/services\/client-work/i);
    });

    // Step 4: Verify "Client Work" text is visible on the page
    await test.step('Verify "Client Work" text is visible on the page', async () => {
      const heading = page.getByRole('heading', { name: /client work/i });
      await expect(heading.first()).toBeVisible();
    });
  });
});

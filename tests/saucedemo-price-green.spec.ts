import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Price Validation', () => {
  test('each item price should be green on details page', async ({ page }) => {
    // Navigate and login
    await page.goto('https://www.saucedemo.com/v1/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Get all item links first
    const itemLinks = await page.locator('.inventory_item_name').all();

    for (const link of itemLinks) {
      // Store the name before clicking
      const itemName = await link.textContent();

      // Click the link and wait for navigation
      await Promise.all([
        page.waitForNavigation(),
        link.click()
      ]);

      // Verify price element exists and is green
      const priceElement = page.locator('.inventory_details_price');
      await expect(priceElement).toBeVisible();

      const computedStyle = await priceElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          rgb: `rgb(86, 146, 16)`
        };
      });

      // Assert the color is green
      expect(computedStyle.color,
        `Price for "${itemName}" should be green (${computedStyle.rgb})`
      ).toBe(computedStyle.rgb);

      // Go back and wait for the inventory to be visible
      await Promise.all([
        page.waitForNavigation(),
        page.click('.inventory_details_back_button')
      ]);

      // Ensure we're back on the inventory page
      await expect(page.locator('.inventory_container')).toBeVisible();
    }
  });
});

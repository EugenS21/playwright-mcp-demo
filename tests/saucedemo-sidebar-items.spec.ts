import { test, expect } from '@playwright/test';

test('Validate sidebar items on saucedemo', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://www.saucedemo.com/v1/');

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Open sidebar
  await page.click('#menu_button');

  // Validate sidebar items
  const sidebarItems = await page.$$eval('.bm-item-list a', items => items.map(i => i.textContent?.trim()));
  expect(sidebarItems).toEqual([
    'ALL ITEMS',
    'ABOUT',
    'LOGOUT',
    'RESET APP STATE'
  ]);
});


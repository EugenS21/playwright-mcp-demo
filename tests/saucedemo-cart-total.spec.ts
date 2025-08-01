import { test, expect } from '@playwright/test';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

test('Validate cart total matches sum of product prices', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('https://www.saucedemo.com/v1/');

  // 2. Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Add random items to cart
  const items = await page.$$('.inventory_item');
  const itemCount = items.length;
  const randomIndexes = Array.from({ length: getRandomInt(itemCount) + 1 }, () => getRandomInt(itemCount));
  const uniqueIndexes = Array.from(new Set(randomIndexes));
  let selectedPrices: number[] = [];

  for (const idx of uniqueIndexes) {
    const item = items[idx];
    const priceText = await item.$eval('.inventory_item_price', el => el.textContent || '');
    const price = parseFloat(priceText.replace('$', ''));
    selectedPrices.push(price);
    await item.$eval('button', btn => (btn as HTMLButtonElement).click());
  }

  // 4. Go to the cart
  await page.click('.shopping_cart_link');

  // 5. Validate total amount
  const cartItems = await page.$$('.cart_item');
  let cartPrices: number[] = [];
  for (const cartItem of cartItems) {
    const priceText = await cartItem.$eval('.inventory_item_price', el => el.textContent || '');
    const price = parseFloat(priceText.replace('$', ''));
    cartPrices.push(price);
  }
  const sum = cartPrices.reduce((a, b) => a + b, 0);

  // There is no explicit total on the cart page, so we validate the sum matches what we added
  expect(sum).toBeCloseTo(selectedPrices.reduce((a, b) => a + b, 0), 2);
});


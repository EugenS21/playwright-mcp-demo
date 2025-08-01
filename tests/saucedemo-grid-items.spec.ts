import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

class GridItemDto {
  name: string;
  desc: string;
  price: string;

  constructor(name: string, desc: string, price: string) {
    this.name = name;
    this.desc = desc;
    this.price = price;
  }

  static from(obj: any): GridItemDto {
    return new GridItemDto(obj.name, obj.desc, obj.price);
  }
}

test('Validate grid items against expected JSON', async ({ page }) => {
  // Load expected data
  const expectedRaw = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../resources/expected-grid-items.json'), 'utf-8')
  );
  const expected: GridItemDto[] = expectedRaw.map((item: any) => GridItemDto.from(item));

  // Go to login page
  await page.goto('https://www.saucedemo.com/v1/');

  // Login (using standard credentials)
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for grid to appear
  await page.waitForSelector('.inventory_list');

  // Get all grid items and parse to DTOs
  const items = await page.$$('.inventory_item');
  expect(items.length).toBe(expected.length);

  const actual: GridItemDto[] = [];
  for (const item of items) {
    const name = await item.$eval('.inventory_item_name', el => el.textContent?.trim());
    const desc = await item.$eval('.inventory_item_desc', el => el.textContent?.trim());
    const price = await item.$eval('.inventory_item_price', el => el.textContent?.trim());
    actual.push(new GridItemDto(name || '', desc || '', price || ''));
  }

  // Compare lists regardless of order
  const sortFn = (a: GridItemDto, b: GridItemDto) =>
    a.name.localeCompare(b.name) || a.desc.localeCompare(b.desc) || a.price.localeCompare(b.price);
  const expectedSorted = [...expected].sort(sortFn);
  const actualSorted = [...actual].sort(sortFn);

  expect(actualSorted).toEqual(expectedSorted);
});

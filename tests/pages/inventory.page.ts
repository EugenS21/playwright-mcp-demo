import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async getRandomItem() {
        const items = await this.inventoryItems.all();
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }

    async addRandomItemToCart(): Promise<number> {
        const randomItem = await this.getRandomItem();
        await randomItem.locator('button').click();
        return 1;
    }

    async getCartCount(): Promise<number> {
        try {
            const text = await this.cartBadge.textContent();
            return text ? parseInt(text, 10) : 0;
        } catch {
            return 0;
        }
    }

    async goToCart() {
        await this.cartLink.click();
    }
}

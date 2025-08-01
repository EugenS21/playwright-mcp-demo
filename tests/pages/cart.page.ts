import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('.checkout_button');
    }

    async getItemsCount(): Promise<number> {
        // Wait for cart to be loaded
        await this.page.waitForSelector('.cart_list');
        // Get all cart items
        return await this.cartItems.count();
    }

    async proceedToCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }
}

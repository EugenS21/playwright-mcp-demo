import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

test.describe('Sauce Demo Checkout Flow', () => {
    test('should complete purchase with random item', async ({ page }) => {
        // Initialize page objects
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Navigate and login
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        // Add random item and verify cart count
        const addedItems = await inventoryPage.addRandomItemToCart();
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(addedItems);

        // Go to cart and verify items count
        await inventoryPage.goToCart();
        const cartItemsCount = await cartPage.getItemsCount();
        expect(cartItemsCount).toBe(addedItems);

        // Complete checkout process
        await cartPage.proceedToCheckout();
        await checkoutPage.fillInformation('John', 'Doe', '12345');
        await checkoutPage.finishPurchase();

        // Verify order completion
        expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    });
});

import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('input[type="submit"][value="CONTINUE"]');
        this.finishButton = page.locator('.cart_button:has-text("FINISH")');
        this.successHeader = page.locator('.complete-header');
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishPurchase() {
        await this.finishButton.click();
    }

    async isOrderComplete(): Promise<boolean> {
        await this.successHeader.waitFor();
        return await this.successHeader.isVisible();
    }
}

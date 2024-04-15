import { expect } from "@playwright/test";
import { BasePage } from "./page";

export class CartPage extends BasePage {
    
    //Locators
    private addedItemLocator = "//div[contains(@class, 'cart-form__offers-part ')]//a[contains(@class, 'cart-form__link_base-alter')]";
    private buyButtonLinkLocator = "//div[contains(@class, 'cart-form__offers-item')]//a[contains(@class, 'cart-form__button') and contains (text(), 'Перейти к оформлению')]";
    private registrationOrderPageLocator = "//div[contains(@class, 'cart-form__title') and contains (text(), 'Оформление заказа')]";
    private streetInputLOcator = "(//div[contains(@class, 'auth-form__field')]//input[contains(@type, 'text') and contains(@class, 'auth-input')])[2]";
    private houseInputLocator = "(//div[contains(@class, 'cart-form__field')]//input[contains(@type, 'text') and contains(@class, 'cart-form__input_nonadaptive')])[1]";
    private nameInputLocator = "(//div[contains(@class, 'cart-form__row')]//input[contains(@type, 'text') and contains(@class, 'art-form__input cart-form__input_width_ss')])[1]";
    private phoneInputLocator = "(//div[contains(@class, 'cart-form__row')]//input[contains(@type, 'text') and contains(@class, 'cart-form__input_width_xxsss cart-form__input_nonadaptive')])[1]";
    private buttonToPaymentsTypesLocator = "//button[contains(@class, 'cart-form__button') and contains(text(), 'Перейти к способу оплаты')]";
    private paymentBlockLocator = "//div[contains(@class, 'cart-form__step-item')]//div[contains(@class, 'cart-form__description-part_1') and contains(text(), 'Оплата')]";
    private orderConfirmationButtonLocator = "//button[contains(@class, 'cart-form__button') and contains (text(), 'Перейти к подтверждению заказа')]";
    // Elements
    private get addedItem() {
        return this.page.locator(this.addedItemLocator);
    };
    private get buyButtonLink() {
        return this.page.locator(this.buyButtonLinkLocator);
    };
    private get registrationOrderPage() {
        return this.page.locator(this.registrationOrderPageLocator);
    };
    private get streetInput() {
        return this.page.locator(this.streetInputLOcator);
    };
    private get houseInput() {
        return this.page.locator(this.houseInputLocator);
    };
    private get nameInput() {
        return this.page.locator(this.nameInputLocator);
    };
    private get phoneInput() {
        return this.page.locator(this.phoneInputLocator);
    };
    private get buttonToPaymentsTypes() {
        return this.page.locator(this.buttonToPaymentsTypesLocator);
    };
    private get paymentBlock() {
        return this.page.locator(this.paymentBlockLocator);
    };
    private get orderConfirmationButton() {
        return this.page.locator(this.orderConfirmationButtonLocator);
    };

    //Methods
    async verifyItemName(item: string) {
        await this.page.waitForTimeout(2000)
        let itemName = await this.addedItem.textContent();
        expect(itemName).toContain(item);
     };
     async openFormToEnterDataForBuying() {
        await this.buyButtonLink.click();
     };
     async verifyregistrationOrderPageIsOpened(name: string) {
        let pageName = await this.registrationOrderPage.textContent();
        expect(pageName).toContain(name);
     };
     async enterDataForRegistationAnOrder(street: string, house: string, name: string, phone: string,) {
        await this.streetInput.fill(street);
        await this.page.waitForTimeout(3000);
        await this.streetInput.press('Enter');
        await this.houseInput.fill(house);
        await this.nameInput.fill(name);
        await this.phoneInput.fill(phone); 
     };
     async goToPaymentTypes() {
        await this.page.waitForTimeout(3000);
        await this.buttonToPaymentsTypes.click();
     };

     async verifyPaymentBlockIsDisplayed() {
        let paymentBlockIsDisplayed = await this.paymentBlock.isVisible();
        
        expect(paymentBlockIsDisplayed).toBeTruthy();

     };
     async verifyorderConfirmationButtonIsDisplayed() {
        await this.orderConfirmationButton.waitFor( {state: 'visible', timeout: 3000} )
        let orderConfirmationButtonIsDisplayed = await this.orderConfirmationButton.isVisible();
        
        expect(orderConfirmationButtonIsDisplayed).toBeTruthy();
     };

}


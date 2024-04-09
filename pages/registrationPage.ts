import { expect } from "@playwright/test";
import { BasePage } from "./page";
import { expectedTextOfButton } from "../helpers/dataForRegistration";

export class RegistrationPage extends BasePage {
    //Locators
    private linkToEnterEmailLocator = '//*[contains (@class, "auth-input_primary") and contains(@placeholder, "Ваш e-mail")]';
    private linkToEnterPasswordLocator = '//*[contains (@class, "auth-input_primary") and contains(@placeholder, "Придумайте пароль")]';
    private linkToEnterPasswordRepeatLocator = '//*[contains (@class, "auth-input_primary") and contains(@placeholder, "Повторите пароль")]';
    private linkToCheckBoxAgreementLocator = '//*[contains (@class, "auth-checkbox__faux")]';
    private linkToCreateAccountLocator = '//*[contains (@class, "auth-button_primary") and contains(text(), "Зарегистрироваться")]';
    private buttonToConfirmDataLinkLocator = '//a[contains (@class, "auth-button")]';

    //// Elements
    private get linkToEnterEmail() {
        return this.page.locator(this.linkToEnterEmailLocator);
    };
    private get linkToEnterPassword() {
        return this.page.locator(this.linkToEnterPasswordLocator);
    };
    private get linkToEnterPasswordRepeat() {
        return this.page.locator(this.linkToEnterPasswordRepeatLocator);
    };
    private get linkToCheckBoxAgreement() {
        return this.page.locator(this.linkToCheckBoxAgreementLocator);
    };
    private get linkToCreateAccount() {
        return this.page.locator(this.linkToCreateAccountLocator);
    };
    private get buttonToConfirmDataLink() {
        return this.page.locator(this.buttonToConfirmDataLinkLocator);
    };
    
    //Methods
    async enterDataForRegitration(email: string, password: string) {
        await this.linkToEnterEmail.fill(email);
        await this.linkToEnterPassword.fill(password);
        await this.linkToEnterPasswordRepeat.fill(password);
        await this.linkToCheckBoxAgreement.check();
    };
    async createAccount() {
        await this.linkToCreateAccount.click();
        await this.page.waitForTimeout(3000);
    };

    async checkExistenceOfButton() {
        expect(this.buttonToConfirmDataLink).toBeVisible();
        let textOfButton = await this.buttonToConfirmDataLink.textContent();
        expect(textOfButton).toContain(expectedTextOfButton);
    };
};


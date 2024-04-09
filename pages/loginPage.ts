import { BasePage } from "./page";
import { RegistrationPage } from "./registrationPage";

export class LoginPage extends BasePage {
    
    //Locators
    private registrationLinkLocator = '//a[contains(@class, "auth-form__link") and contains (text(), "Зарегистрироваться")]';

    // Elements
    private get registrationLink() {
        return this.page.locator(this.registrationLinkLocator);
    };

    //Methods
    async goToAccountRegistration(): Promise<RegistrationPage> {
        await this.registrationLink.click();

        return new RegistrationPage(this.page);
    }
}



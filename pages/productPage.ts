import { expect } from "@playwright/test";
import { BasePage } from "./page";

export class ProductPage extends BasePage {
    
    //Locators
    private productTitleLinkLocator = "//*[contains(@class, 'catalog-masthead__title js-nav-header')]";
    // Elements
    private get productTitleLink() {
        return this.page.locator(this.productTitleLinkLocator);
    };
    //Methods
    async getProductTitle() {
       let productTitle = await this.productTitleLink.textContent();
       return productTitle;
    };
}


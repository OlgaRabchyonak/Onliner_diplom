import { expect } from "@playwright/test";
import { BasePage } from "./page";
import { CartPage } from "./cartPage";

export class ProductPage extends BasePage {
    
    //Locators
    private productTitleLinkLocator = "//*[contains(@class, 'catalog-masthead__title js-nav-header')]";
    private sellersOffersLinkLocator = "//a[contains(@class, 'js-sub-nav-link')]//span[contains (text(), 'Предложения продавцов')]";
    private sortDropdownLocator = '//select[@class = "input-style__real"]';
    private cartButtonLocator = "//div[contains(@class, 'helpers_hide_tablet')]/a[contains(@class, 'offers-list__button_cart')]";
    private cartLinkLocator = "//a[contains(text(), 'Перейти в корзину')]";
    private iconCartLocator = "//a[contains(@class, 'b-top-profile__cart')]";
    //a[contains(@class, 'product-recommended__button') and contains (text(), 'Перейти в корзину')]
    // Elements
    private get productTitleLink() {
        return this.page.locator(this.productTitleLinkLocator);
    };
    private get sellersOffersLink() {
        return this.page.locator(this.sellersOffersLinkLocator);
    };
    private get cartButton() {
        return this.page.locator(this.cartButtonLocator);
    };
    private get sortDropdown() {
        return this.page.locator(this.sortDropdownLocator);
    };
    private get cartLink() {
        return this.page.locator(this.cartLinkLocator);
    };
    private get iconCart() {
        return this.page.locator(this.iconCartLocator);
    };
    //Methods
    async getProductTitle() {
       let productTitle = await this.productTitleLink.textContent();
       return productTitle;
    };
    async goToSellersOffers() {
        await this.sellersOffersLink.click();
        await this.page.waitForTimeout(3000);
     };
     async setSortOption() {
        await this.sortDropdown.selectOption("price:asc");
     };
     async addToCart() {
        await this.cartButton.first().click();
     };
    //  async goToCart(): Promise<CartPage> {  // через поп ап
    //     await this.page.waitForTimeout(3000);
    //     await this.cartLink.click();

    //     return new CartPage(this.page);
    //  };

     async goToCart(): Promise<CartPage> { // через значок корзины
        await this.iconCart.click();

        return new CartPage(this.page);
     };
    
}



import { ConverterPage } from "./converterPage";
import { BasePage } from "./page";
import { LoginPage } from "./loginPage";
import { expect } from "@playwright/test";
import { QuickSearchFrame } from "./iframe/quickSearchFrame";
import { quichSearchIframeLinkLocator } from "../helpers/frames";
import { CatalogPage } from "./catalogPage";


export class MainPage extends BasePage {
    
    // Locators
    private currenncyRateLinkLocator = "//a[contains(@class,'b-top-navigation-informers__link')]/span[contains(@class,'js-currency-amount')]";
    private loginButtonLocator = "//*[contains(@class,'auth-bar__item') and text()='Вход']";
    private searchFieldLinkLocator = "//*[contains(@class, 'fast-search__input')]";
    private categoryLinkLocator = "(//div[contains(@class, 'result__item_category')])[1]";
    private catalogLinkLocator = "//span[contains(@class, 'b-main-navigation__text') and (text() = 'Каталог')]";
    // Elements
    private get currencyRateLink() {
        return this.page.locator(this.currenncyRateLinkLocator);
    };
    private get loginButton() {
        return this.page.locator(this.loginButtonLocator);
    };
    private get searchFieldLink() {
        return this.page.locator(this.searchFieldLinkLocator);
    };
    private get categoryLink() {
        return this.page.locator(this.categoryLinkLocator);
    };
    private get catalogLink() {
        return this.page.locator(this.catalogLinkLocator);
    };
    // Methods
    async openConverterPage(): Promise<ConverterPage> {
        await this.currencyRateLink.click();

        return new ConverterPage(this.page);
    };
    async openLoginPage(): Promise<LoginPage> {
        await this.loginButton.click();

        return new LoginPage(this.page);
    };
    async fillSeachItem(item: string): Promise<QuickSearchFrame> {
        await this.searchFieldLink.fill(item); 

        return new QuickSearchFrame(this.page, quichSearchIframeLinkLocator);
    };
    async openCatalogPage(): Promise<CatalogPage> {
        await this.catalogLink.click(); 

        return new CatalogPage(this.page);
    };

};

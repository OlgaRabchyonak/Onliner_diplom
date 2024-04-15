import { expect } from "@playwright/test";
import { BasePage } from "./page";
import { pageTitleForNotebookCagalogPage, urlForNotebookCagalogPage } from "../data/contants";

export class CatalogPage extends BasePage {
    
    //Locators
    private linkToItemCategoryLocator = "//span[contains(@class, 'catalog-navigation-classifier__item-title-wrapper') and contains (text(), 'Компьютеры и сети')]";
    private linkToCertainCategotyItemLocator= "//span[contains(@class, 'catalog-navigation-list__dropdown-title') and contains (text(), 'Ноутбуки')]";
    private pageTitleLinkLocator = "//*[contains(@class, 'catalog-form__title') and contains (text(), 'Ноутбуки')]";
    private checkBoxManufacturerLinkLocator = "//div[contains(@class, 'catalog-form__checkbox-sign') and contains(text(), 'ASUS')]";
    private linkToFilterLocator = "//div[contains(@class, 'catalog-form__tag-list')]";
    private superPriceFilterLinkLocator = "//div[contains(@class, 'catalog-form__bonus-title') and contains(text(), 'Суперцена')]";
    private appliedFiltersLinkLocator = "//div[contains(@class, 'catalog-form__tag-item')]";
    private appliedFilterTagLinkLocator = "//div[contains(@class, 'button-style') and (text() = 'ASUS')]";
    // Elements
    private get linkToItemCategory() {
        return this.page.locator(this.linkToItemCategoryLocator);
    };
    private get linkToCertainCategotyItem() {
        return this.page.locator(this.linkToCertainCategotyItemLocator);
    };
    private get pageTitleLink() {
        return this.page.locator(this.pageTitleLinkLocator);
    };
    private get checkBoxManufacturerLink() {
        return this.page.locator(this.checkBoxManufacturerLinkLocator);
    };
    private get linkToFilter() {
        return this.page.locator(this.linkToFilterLocator);
    };
    private get superPriceFilterLink() {
        return this.page.locator(this.superPriceFilterLinkLocator);
    };
    private get appliedFiltersLink() {
        return this.page.locator(this.appliedFiltersLinkLocator);
    };
    private get appliedFilterTagLink() {
        return this.page.locator(this.appliedFilterTagLinkLocator);
    };
    //Methods
    async selectItemCategory() {
        await this.linkToItemCategory.click();
    };
    async selectCertainCategoty() {
        await this.linkToCertainCategotyItem.click();  
    };
    async getPageUrl() {
        let pageUrl = await this.page.url();
        expect(pageUrl).toEqual(urlForNotebookCagalogPage);
        return pageUrl;
    };
    async getPageTitle() {
        let pageTitle = await this.pageTitleLink.textContent();  
        expect(pageTitle?.trim()).toEqual(pageTitleForNotebookCagalogPage);
    };
    async selectFilters() {
        await this.checkBoxManufacturerLink.click();  
        await this.superPriceFilterLink.click();
    };
    async checkAppliedFilters(): Promise <number>{
        let numbersOfAppliedFilters = (await this.appliedFiltersLink).count();
        return numbersOfAppliedFilters;
    };
    async removeFilter() {
        await this.appliedFilterTagLink.click();
        await this.page.waitForTimeout(5000);
    };

async checkRemainingFilters(): Promise <number> {
        return (await this.appliedFiltersLink).count();
    };
};


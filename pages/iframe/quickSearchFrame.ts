import { Locator } from "playwright-core";
import { BaseFrame } from "./baseFrame";
import { ProductPage } from "../productPage";


export class QuickSearchFrame extends BaseFrame{
    //Locators
    private linkToProductCategoryLocator = "//div[contains(@class, 'result__item_category')]//a[contains(text(), 'Карты памяти')]";
    private searchFieldLinkLocator = "//input[contains(@class, 'search__input') and (@placeholder = 'Поиск')]";
    private searchResultLinkLocator = "(//div[contains(@class, ' result__item_product')])[1]";
    //Elements
    private get linkToProductCategory() {
        return this.iframe.locator(this.linkToProductCategoryLocator);
    };
    private get searchFieldLink() {
        return this.iframe.locator(this.searchFieldLinkLocator);
    };
    private get searchResultLink() {
        return this.iframe.locator(this.searchResultLinkLocator);
    };
    //Methods
    async getCategoryTitleText() {
        let categoryTitleText = await this.linkToProductCategory.textContent();
        return categoryTitleText;
    };
    async clearInputField() {
        await this.searchFieldLink.clear();
        let fieldTextAfterClearing = await this.searchFieldLink.inputValue();
        return fieldTextAfterClearing;
    };
    async searchAnItem(item: string) {
        await this.searchFieldLink.fill(item);
        await this.page.waitForTimeout(3000);
        let searchResultItem = await this.searchResultLink.textContent();
        return searchResultItem;
    };
    async goToProductPage(): Promise<ProductPage> {
        await this.searchResultLink.click();
        
        return new ProductPage(this.page);
    
    };
        

};
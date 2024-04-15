import { expect } from "@playwright/test";
import { BasePage } from "./page";

export class AutoPage extends BasePage {
    
    //Locators
    private linkToArticleLocator = "//div[contains(@class, 'news-tiles__widget')]";
    private reactionButtonLocator = "(//div[contains(@data-reaction, 'slight_smile')] )[1]";
    private numberOfReactionsLocator = "(//*[contains(@data-reaction, 'slight_smile')]//*[contains(@class, 'st-count')])[1]";
    // Elements
    private get linkToArticle() {
        return this.page.locator(this.linkToArticleLocator);
    };
    private get reactionButton() {
        return this.page.locator(this.reactionButtonLocator);
    };
    private get numberOfReactions() {
        return this.page.locator(this.numberOfReactionsLocator);
    };
    //Methods
    async openFirstArticle() {
        await this.linkToArticle.first().click(); 
    };
    async findNumberofReactions(): Promise<any> {
        await this.page.waitForTimeout(2000)
        return (await this.numberOfReactions.textContent());
    };
    async giveReaction() {
        await this.reactionButton.click(); 
    };
}


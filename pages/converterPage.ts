import { expect } from "@playwright/test";
import { BasePage } from "./page";

export class ConverterPage extends BasePage {

    // Locators
    private eurBestSellingRateLabelLocator = "((//table[contains(@class,'b-currency-table__best')])[2]//p[contains(@class,'value')])[2]";
    private buyButtonLocator = "//label[contains(@class, 'state-2')]";
    private amountInFieldLocator = "//input[@id='amount-in']";
    private currencyInFieldLocator = "//select[(@name = 'currency-in')]";
    private convertionResultLabelLocator = "//*[contains(@class,'js-cur-result')]";
    private currentDateLocator = "//th[contains(@class, 'th-first')]";
    
    // Elements
    private get eurBestSellingRateLabel() {
        return this.page.locator(this.eurBestSellingRateLabelLocator);
    }
    private get buyButton() {
        return this.page.locator(this.buyButtonLocator);
    }
    private get currencyInField() {
        return this.page.locator(this.currencyInFieldLocator);
    }
    private get amountInField() {
        return this.page.locator(this.amountInFieldLocator);
    }
    private get convertionResultLabel() {
        return this.page.locator(this.convertionResultLabelLocator);
    }
    // Methods
    async getEurBestSellingRate(): Promise<number> {
        let eurBestBuyingRateText = (await this.eurBestSellingRateLabel.textContent())?.replace(" BYN", "");
        return +(eurBestBuyingRateText ?? "0").replace(",", ".");
    }
    async clickBuyButton() {
        await this.buyButton.waitFor( { state: 'visible', timeout: 3000 } );
        await this.buyButton.click();
    };
    async setAmountIn(amount: number) {
        await this.amountInField.fill("" + amount);
        await this.amountInField.press("Enter");
    }
    async setTextIn(text: string) {
        await this.amountInField.fill("" + text);
        await this.amountInField.press('Enter');
    }
    async setCurrencyIn(currency: string) {
        await this.currencyInField.click();
        await this.currencyInField.selectOption({ 'value': currency });
    }
    async getConvertionResult(): Promise<number> {
        let convertionResultText = await this.convertionResultLabel.textContent();
        return +(convertionResultText ?? "0").replace(" ", "").replace(",", ".");
    }
}
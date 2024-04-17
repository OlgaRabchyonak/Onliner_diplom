import { test, expect, Page, chromium } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { getRandomInt } from '../helpers/randomHelper';
import { testCurrency } from '../data/dataForExchangeCurrency';
import { mainUrl, } from '../data/contants';
import {  houseNumber, itemForSearching, pageName, personName, phoneNumber, streetName, userToken } from '../data/userData';
import { time, timeLog } from 'console';
import { TIMEOUT } from 'dns';


test.describe("Onliner Test with Auth", async () => {
  let page: Page;
  let mainPage: MainPage;

  test.beforeEach(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(mainUrl);
    mainPage = new MainPage(page);
    await context.addCookies([ 
      {
            name: "oss",
            value: userToken,
            domain: ".onliner.by",
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "Lax"
      },
       {
            name: "logged_in",
            value: "1",
            domain: ".onliner.by",
            path: "/",
            httpOnly: false,
            secure: true,
            sameSite: "Lax"
      }
        ]);
    await page.reload();
  });

  test.skip('Opportunity to rate the article', async () => {
    let autoPage = await mainPage.openAutoSection();
    await autoPage.openFirstArticle();
    let numberofReactionsBeforeClicking = +(await autoPage.findNumberofReactions());
    await autoPage.giveReaction();
    let numberofReactionsAfterClicking = +(await autoPage.findNumberofReactions());
    await autoPage.giveReaction();
    let numberofReactionsAfterRepeatedClick = +(await autoPage.findNumberofReactions());
    expect(numberofReactionsAfterClicking).toBe(numberofReactionsBeforeClicking + 1)
    expect(numberofReactionsAfterRepeatedClick).toBe(numberofReactionsAfterClicking);
  });

  test('Convert EUR to BYN', async () => {
    let сonverterPage = await mainPage.openConverterPage();
    await сonverterPage.clickBuyButton();
    let currentBestEurRate = await сonverterPage.getEurBestSellingRate();
    let eurAmount = getRandomInt(100, 10000);
    let expectedConvertionResult = eurAmount * currentBestEurRate;
    await сonverterPage.setAmountIn(eurAmount);
    await сonverterPage.setCurrencyIn(testCurrency);
    let convertionToBynResult = await сonverterPage.getConvertionResult();
    expect(convertionToBynResult).toBeCloseTo(expectedConvertionResult, 3);
  });


  test.skip('Placing an order (before payment)', async () => {
    let quickSearchFrame = await mainPage.fillSeachItem(itemForSearching);
    let productPage = await quickSearchFrame.goToProductPage();
    await productPage.goToSellersOffers();
    await productPage.setSortOption();
    await productPage.addToCart();
    let cartPage = await productPage.goToCart();
    await cartPage.verifyItemName(itemForSearching);
    await cartPage.openFormToEnterDataForBuying();
    await cartPage.verifyregistrationOrderPageIsOpened(pageName);
    await cartPage.enterDataForRegistationAnOrder(streetName, houseNumber, personName, phoneNumber);
    await cartPage.goToPaymentTypes();
    await cartPage.verifyPaymentBlockIsDisplayed();
    await cartPage.verifyorderConfirmationButtonIsDisplayed();
   });
});



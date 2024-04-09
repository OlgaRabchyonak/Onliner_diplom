import { test, expect, Page, chromium } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { getRandomInt } from '../helpers/randomHelper';
import { testCurrency } from '../helpers/dataForExchangeCurrency';
import { emailForRegistration,  expectedTextOfButton,  passwordForRegistration } from '../helpers/dataForRegistration';
//import { testUserLogin, testUserPassword, userToken } from '../data/userData';

test.describe("Onliner Test", async () => {
  let page: Page;
  let mainPage: MainPage;

  test.beforeAll(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.onliner.by/');
  });

  test.beforeEach(async () => {
    await page.goto('https://www.onliner.by/');
    mainPage = new MainPage(page);
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

  test('Account registration', async () => {
    let loginPage = await mainPage.openLoginPage();
    let registrationPage = await loginPage.goToAccountRegistration();
    await registrationPage.enterDataForRegitration(emailForRegistration, passwordForRegistration);
    await registrationPage.createAccount();
    await registrationPage.checkExistenceOfButton();
  });

  test('Searching an item', async () => {
    let quickSearchFrame = await mainPage.fillSeachItem("Карты памяти");
    let actualCategoryTitleText = await quickSearchFrame.getCategoryTitleText();
    expect(actualCategoryTitleText).toContain("Карты памяти");
    let inputAfterClearing = await quickSearchFrame.clearInputField();
    expect (inputAfterClearing).toBe("");
    await quickSearchFrame.searchAnItem("Apple iPhone 15 Pro Max");
    let productPage = await quickSearchFrame.goToProductPage();
    let actualProductTitle = await productPage.getProductTitle();
    expect(actualProductTitle).toContain("Apple iPhone 15 Pro Max");
  });

});

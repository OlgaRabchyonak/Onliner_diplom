import { test, expect, Page, chromium } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { getRandomInt } from '../helpers/randomHelper';
import { testCurrency } from '../helpers/dataForExchangeCurrency';
import { emailForRegistration,  expectedTextOfButton,  passwordForRegistration } from '../helpers/dataForRegistration';
import { urlForNotebookCagalogPage } from '../helpers/contants';
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

  test('Catalog page filtering', async () => {
    let catalogPage = await mainPage.openCatalogPage();
    await catalogPage.selectItemCategory();
    await catalogPage.selectCertainCategoty();
    await catalogPage.getPageUrl();
    await catalogPage.getPageTitle();
    await catalogPage.selectFilters();
    let actualNumbersOfAppliedFilters = await catalogPage.checkAppliedFilters();
    expect(actualNumbersOfAppliedFilters).toBe(2);
    await catalogPage.removeFilter();
    let numbersOfAppliedFiltersRemaining = await catalogPage.checkRemainingFilters();
    expect(numbersOfAppliedFiltersRemaining).toBe(1);
  });

});

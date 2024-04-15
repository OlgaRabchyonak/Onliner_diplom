import { test, expect, Page, chromium } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { getRandomInt } from '../helpers/randomHelper';
import { testCurrency } from '../data/dataForExchangeCurrency';
import { emailForRegistration,  expectedTextOfButton,  passwordForRegistration } from '../data/dataForRegistration';
import { mainUrl, urlForNotebookCagalogPage } from '../data/contants';
import { houseNumber, item, itemForSearching, pageName, personName, phoneNumber, streetName, 
testUserLogin, testUserPassword, userToken } from '../data/userData';

test.describe("Onliner Test without Auth", async () => {
    let page: Page;
    let mainPage: MainPage;

    test.beforeAll(async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(mainUrl);
    });
  
    test.beforeEach(async () => {
      await page.goto(mainUrl);
      mainPage = new MainPage(page);
    });
  
    test('Log in test', async () => {
      let loginPage = await mainPage.openLoginPage();
      await loginPage.logIn(testUserLogin, testUserPassword);
      await loginPage.waitCapchaFrameAppears();
    });

    test('Account registration', async () => {
      let loginPage = await mainPage.openLoginPage();
      let registrationPage = await loginPage.goToAccountRegistration();
      await registrationPage.enterDataForRegitration(emailForRegistration, passwordForRegistration);
      await registrationPage.createAccount();
      let buttonName = await registrationPage.checkExistenceOfButton();
      expect(buttonName).toContain(expectedTextOfButton);
    });

    test('Searching an item', async () => {
      let quickSearchFrame = await mainPage.fillSeachItem(item);
      let actualCategoryTitleText = await quickSearchFrame.getCategoryTitleText();
      expect(actualCategoryTitleText).toContain(item);
      let inputAfterClearing = await quickSearchFrame.clearInputField();
      expect (inputAfterClearing).toBe("");
      await quickSearchFrame.searchAnItem(itemForSearching);
      let productPage = await quickSearchFrame.goToProductPage();
      let actualProductTitle = await productPage.getProductTitle();
      expect(actualProductTitle).toContain(itemForSearching);
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
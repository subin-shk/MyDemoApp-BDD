const { When, Then, Given } = require("@wdio/cucumber-framework");
const { expect, browser } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const Catalog = require("../pageobjects/catalog.po");
const Navigation = require("../pageobjects/navigation.po");
const Checkout = require("../pageobjects/checkout.po");
// const testData = require("../../fixtures/loginFixtures.json");

Given("I am on the home page", async () => {
  // Already on home page
  await browser.pause(10000);
});

When("I click on an item", async () => {
  await Catalog.bag1.click();
});

When("I add the item to the cart", async () => {
  async function scrollUntilElementIsVisible(element, maxSwipes = 5) {
    let isElementVisible = await element.isDisplayed().catch(() => false);
    let swipeCount = 0;

    while (!isElementVisible && swipeCount < maxSwipes) {
      await browser.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            {
              type: "pointerMove",
              duration: 0,
              x: 500,
              y: 1500,
              origin: "viewport",
            },
            { type: "pointerDown", button: 0 },
            {
              type: "pointerMove",
              duration: 500,
              x: 500,
              y: 500,
              origin: "viewport",
            },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      // await browser.pause(1000);

      isElementVisible = await element.isDisplayed().catch(() => false);
      swipeCount++;
    }

    if (!isElementVisible) {
      throw new Error("Element not found after scrolling!");
    }

    await element.click();
  }

  const myElement = await Catalog.addToCart;
  await scrollUntilElementIsVisible(myElement);
});

Then("the item should appear in the cart", async () => {
  const cartCount = await Catalog.cartCount.getText();
  expect(parseInt(cartCount)).toBeGreaterThan(0);
});

Given("the user having item in cart page is not logged in", async () => {
  await Navigation.cart.click();
});

When("the user tries to go to the checkout page", async () => {
  await Checkout.toCheckout.click();
});

Then("the user should be redirected to the login page", async () => {
  loginUser = await LoginPage.inputUsername;
  await expect(loginUser).toBeExisting();
});

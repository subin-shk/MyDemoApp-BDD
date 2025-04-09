const { When, Then, Given } = require("@wdio/cucumber-framework");
const { expect, browser } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const Catalog = require("../pageobjects/catalog.po");
const Navigation = require("../pageobjects/navigation.po");
const Checkout = require("../pageobjects/checkout.po");
const testData = require("../../fixtures/loginFixtures.json");
const checkoutData = require("../../fixtures/checkoutFixtures.json");

Given("I have logged in", async () => {
  Navigation.open();

  await Navigation.login.click();

  await LoginPage.login(
    testData.validUser.userName,
    testData.validUser.password
  );
});

Given("I have added item to the cart", async () => {
  await Catalog.bag1.click();
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

Given("I am on cart page", async () => {
  await Navigation.cart.click();
});

Given("I am on checkout page", async () => {
  await Checkout.toCheckout.click();
});

When("I enter the checkout details", async () => {
  await Checkout.fullName.setValue(checkoutData.checkoutDetails.fullName);
  await Checkout.addressLine1.setValue(
    checkoutData.checkoutDetails.addressLine1
  );
  await Checkout.city.setValue(checkoutData.checkoutDetails.city);
  await Checkout.state.setValue(checkoutData.checkoutDetails.state);
  await Checkout.zipCode.setValue(checkoutData.checkoutDetails.zipCode);
  await Checkout.country.setValue(checkoutData.checkoutDetails.country);
});

When("I click on the Payment button", async () => {
  // Scroll to the payment button
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

      isElementVisible = await element.isDisplayed().catch(() => false);
      swipeCount++;
    }

    if (!isElementVisible) {
      throw new Error("Element not found after scrolling!");
    }

    await element.click();
  }

  const paymentButton = await Checkout.toPayment;
  await scrollUntilElementIsVisible(paymentButton);
});

Then("I should be redirected to the payment page", async () => {
  const paymentRedirect = await Payment.paymentMethod.getText();
  expect(paymentRedirect).toContain("Enter a payment method");
});

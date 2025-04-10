const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect } = require("@wdio/globals");
const Navigation = require("../pageobjects/navigation.po");
const LoginPage = require("../pageobjects/login.page");
const Catalog = require("../pageobjects/catalog.po");
const Checkout = require("../pageobjects/checkout.po");
const Payment = require("../pageobjects/payment.po");
const testData = require("../../fixtures/loginFixtures.json");
const checkoutData = require("../../fixtures/checkoutFixtures.json");

Given("I have logged in", async () => {
  await Navigation.open();
  await Navigation.login.click();
  await LoginPage.login(testData.validUser.userName, testData.validUser.password);
});

Given("I have added item to the cart", async () => {
  await Catalog.bag1.click();

  async function scrollUntilElementIsVisible(element, maxSwipes = 5) {
    let isVisible = await element.isDisplayed().catch(() => false);
    let swipeCount = 0;

    while (!isVisible && swipeCount < maxSwipes) {
      await browser.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: 500, y: 1500, origin: "viewport" },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 500, x: 500, y: 500, origin: "viewport" },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      isVisible = await element.isDisplayed().catch(() => false);
      swipeCount++;
    }

    if (!isVisible) throw new Error("Element not visible after scrolling");

    await element.click();
  }

  await scrollUntilElementIsVisible(await Catalog.addToCart);
});

Given("I am on cart page", async () => {
  await Navigation.cart.click();
});

Given("I am on checkout page", async () => {
  await Checkout.toCheckout.click();
});

When("I enter the checkout details", async () => {
  await Checkout.fullName.setValue(checkoutData.checkoutDetails.fullName);
  await Checkout.addressLine1.setValue(checkoutData.checkoutDetails.addressLine1);
  await Checkout.city.setValue(checkoutData.checkoutDetails.city);
  await Checkout.state.setValue(checkoutData.checkoutDetails.state);
  await Checkout.zipCode.setValue(checkoutData.checkoutDetails.zipCode);
  await Checkout.country.setValue(checkoutData.checkoutDetails.country);
});

When("I click on the Payment button", async () => {
  async function scrollUntilElementIsVisible(element, maxSwipes = 5) {
    let isVisible = await element.isDisplayed().catch(() => false);
    let swipeCount = 0;

    while (!isVisible && swipeCount < maxSwipes) {
      await browser.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: 500, y: 1500, origin: "viewport" },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 500, x: 500, y: 500, origin: "viewport" },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      isVisible = await element.isDisplayed().catch(() => false);
      swipeCount++;
    }

    if (!isVisible) throw new Error("Element not visible after scrolling");

    await element.click();
  }

  await scrollUntilElementIsVisible(await Checkout.toPayment);
});

When("I enter valid payment details", async () => {
  await Payment.fullName.setValue(checkoutData.paymentDetails.fullName);
  await Payment.cardNumber.setValue(checkoutData.paymentDetails.cardNumber);
  await Payment.expireDate.setValue(checkoutData.paymentDetails.expireDate);
  await Payment.securityCode.setValue(checkoutData.paymentDetails.securityCode);
});

When("I review and place the order", async () => {
  await Payment.reviewOrder.click();
  await Payment.placeOrder.click();
});

Then("I should see a confirmation message", async () => {
  const confirmationText = await Payment.checkoutComplete.getText();
  expect(confirmationText).toContain("Checkout Complete");
});



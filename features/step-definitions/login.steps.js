const { When, Then, Given } = require("@wdio/cucumber-framework");
const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const Navigation = require("../pageobjects/navigation.po");
const testData = require("../../fixtures/loginFixtures.json");

Given("I am on the login page", async () => {
  await Navigation.open();
});

When("I log in with an empty username", async () => {
  const isLoginButtonDisplayed = await Navigation.login.isDisplayed();
  expect(isLoginButtonDisplayed).toBe(true);
  await Navigation.login.click();

  await LoginPage.login(
    testData.emptyUsername.userName,
    testData.emptyUsername.password
  );

  // await LoginPage.btnSubmit.click();
});

Then("I should see a username required error", async () => {
  const errorMessage = await LoginPage.emptyUsernameError.getText();
  expect(errorMessage).toContain("Username is required");
});

When("I log in with an empty password", async () => {
  const isLoginButtonDisplayed = await Navigation.login.isDisplayed();
  expect(isLoginButtonDisplayed).toBe(true);
  await Navigation.login.click();

  await LoginPage.login(
    testData.emptyPassword.userName,
    testData.emptyPassword.password
  );

  // await LoginPage.btnSubmit.click();
});

Then("I should see a enter password error", async () => {
  const errorMessage = await LoginPage.emptyPasswordError.getText();
  expect(errorMessage).toContain("Enter Password");
});

When("I log in with valid credentials", async () => {
  const isLoginButtonDisplayed = await Navigation.login.isDisplayed();
  expect(isLoginButtonDisplayed).toBe(true);
  await Navigation.login.click();

  await LoginPage.login(
    testData.validUser.userName,
    testData.validUser.password
  );

  // await LoginPage.btnSubmit.click();
});

Then("I should be logged in successfully", async () => {
  await Navigation.open();
  const isLoggedIn = await Navigation.logout.isDisplayed();
  expect(isLoggedIn).toBe(true);
});

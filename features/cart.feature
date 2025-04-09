Feature: Cart Functionality

  Scenario: Add item to cart
    Given I am on the home page
    When I click on an item
    When I add the item to the cart
    Then the item should appear in the cart

  Scenario: User tries to checkout without logging in and is redirected to login page
    Given the user having item in cart page is not logged in
    When the user tries to go to the checkout page
    Then the user should be redirected to the login page
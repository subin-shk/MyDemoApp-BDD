Feature: Checkout Functionality

  Background: 
    Given I have logged in 
    And I have added item to the cart
    And I am on cart page

  Scenario:
    Given I am on checkout page
    When I enter the checkout details
    And I click on the Payment button
    Then I should be redirected to the payment page
Feature: Payment Functionality

  Background:
    Given I have logged in
    And I have added item to the cart
    And I am on cart page
    And I am on checkout page

  Scenario: Successfully place an order with valid payment details
    When I enter the checkout details
    And I click on the Payment button
    And I enter valid payment details
    And I review and place the order
    Then I should see a confirmation message
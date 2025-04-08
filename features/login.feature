Feature: Login Functionality

  Scenario: Login with empty username
    Given I am on the login page
    When I log in with an empty username
    Then I should see a username required error

  Scenario: Login with empty password
    Given I am on the login page
    When I log in with an empty password
    Then I should see a enter password error

  Scenario: Login with valid credentials
    Given I am on the login page
    When I log in with valid credentials
    Then I should be logged in successfully

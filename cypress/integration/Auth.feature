Feature: Authentication

  Background:
    Given opened home page

  Scenario: login with invalid credentials
    When I click to Join
    Then I see "join" in the URL

    Then I make a screenshot

    When I type "mysuper@email.com" to the "email" field
    Then I see "mysuper@email.com" in the "email" field

    When I type "PASSWORD" to the "password" field
    Then I see "PASSWORD" in the "password" field

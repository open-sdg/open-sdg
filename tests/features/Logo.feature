Feature: Logo

  As a site visitor
  I need to be able to see the main logo
  So that I can identify the site branding

  Scenario: The main logo is visible
    Given I am on "/"
    Then I should see a "main logo" element
    And I should see "My English logo alt text"

  Scenario: The main logo can be changed per language
    Given I am on "/es"
    Then I should see a "main logo" element
    And I should see "My Spanish logo alt text"

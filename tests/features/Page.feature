Feature: Page

  As content manager
  I need to be able to post arbitrary content on pages
  So that I can deliver all needed content to users

  Scenario: Pages can use translation keys for titles and/or content.
    Given I am on "/about"
    Then I should see "About"
    And I should see "This is placeholder content for the About page."

  Scenario: Pages can use direct titles/content instead.
    And I am on "/fr-CA/about/"
    Then I should see "About"
    And I should see "This is placeholder content for the About page."

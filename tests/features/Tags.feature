Feature: Tags

  As a site viewer
  I need to be able to see high-level categories for each indicator, on the goal page
  So that I can have important information before I click on the indicator

  Scenario: Tags appear on goal pages, in the current language
    Given I am on "/1/"
    Then I should see "My untranslated tag"
    And I should see "My English tag"

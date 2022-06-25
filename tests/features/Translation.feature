Feature: Translation

  As a site owner
  I need to be able to translate every aspect of the site
  So that I can deliver the content to speakers of any language

  Scenario: Translations can contain site configuration "keys" which are dynamically inserted
    Given I am on "/goals/"
    Then I should see "My goals page description for Australia"
    And I am on "/es/goals/"
    Then I should see "My goals page description for Australia (Spanish)"

  Scenario: Translations keys can be inserted into page content
    Given I am on "/news/"
    Then I should see "Here is the word Indicator translated: Indicator"
    And I am on "/es/news/"
    Then I should see "Here is the word Indicator translated: Indicador"

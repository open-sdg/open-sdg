Feature: Multilingual

  As a site visitor
  I need to be able to switch to my native language
  So that I can understand the platform

  Scenario: Language switcher works on the homepage
    Given I am on the homepage
    Then I should see "Click on each goal"
    # Expand the language toggle.
    And I click on ".nav .language-toggle-button"
    # Click the first option (Español).
    And I click on ".nav .language-options a:first-child"
    Then I should see "Haga clic en cada objetivo"

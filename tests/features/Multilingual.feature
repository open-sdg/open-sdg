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
    And I follow ".nav .language-options a:first-child"
    Then I should see "Haga clic en cada objetivo"

  Scenario: Lanugage switcher works on a goal page
    Given I am on "/no-poverty"
    Then I should see "End poverty in all its forms everywhere"
    And I click on ".nav .language-toggle-button"
    And I follow ".nav .language-options a:first-child"
    Then I should see "Poner fin a la pobreza en todas sus formas y en todo el mundo"

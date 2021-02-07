Feature: Configuration forms

  As a content or data editor
  I need to be able to edit configuration
  So that I can edit content or data

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: The site configuration is available on a configuration form
    Given I follow "Configuration"
    Then I should see "Open SDG site configuration"

  Scenario: The indicator configuration is available on a configuration form
    Given I click on "the Edit tab"
    And I follow "Edit configuration"
    Then I should see "Open SDG indicator configuration: 1.1.1"

  Scenario: The indicator metadata is available on a configuration form
    Given I click on "the Edit tab"
    And I follow "Edit - National metadata"
    Then I should see "Open SDG National metadata: 1.1.1"

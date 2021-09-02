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
    And I follow "Edit Configuration"
    Then I should see "Edit Configuration: 1.1.1"

  Scenario: The indicator metadata is available on a configuration form
    Given I click on "the Edit tab"
    And I follow "Edit Metadata"
    Then I should see "Edit Metadata: 1.1.1"

  Scenario: The indicator data is available on a configuration form
    Given I click on "the Edit tab"
    And I follow "Edit Data"
    Then I should see "Edit Data: 1.1.1"

  Scenario: The indicator metadata form works when all metadata is missing
    Given I am on "/my-standalone-indicator-3-path"
    And I wait 3 seconds
    And I click on "the Edit tab"
    And I follow "Edit Metadata"
    Then I should see "Edit Metadata: standalone.indicator.3"
    And I should see 13 "configuration form textarea" elements

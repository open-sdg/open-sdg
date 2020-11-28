Feature: Standalone indicator

  As a site visitor
  I need to be able to view and interact with non-SDG indicators
  So that I can get detailed information about other regional statistics

  Background:
    Given I am on "/my-standalone-indicator-path"
    And I wait 3 seconds

  Scenario: Standalone indicators display data just as normal indicators
    And I click on "the Table tab"
    Then I should see a "sortable table" element
    And I click on "the Chart tab"
    Then I should see a "visual chart" element

  Scenario: Standalone indicators do not display certain other elements
    Then I should not see a "goal icon" element
    And I should not see a "the Global metadata tab" element
    And I should not see a "breadcrumb" element

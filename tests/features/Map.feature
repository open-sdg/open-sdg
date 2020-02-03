Feature: Map

  As a site visitor
  I need to be able to view data on a map
  So that I can gain insights into regional differences

  Background:
    Given I am on "/1-3-1"
    And I wait 5 seconds

  Scenario: Indicators have a "Map" tab which displays data in a map
    And I click on "the Map tab"
    Then I should see a "map" element

  Scenario: While the map is being displayed, the sidebar is hidden
    And I click on "the Map tab"
    Then I should not see a "disaggregation sidebar" element
    And I click on "the Chart tab"
    Then I should see a "disaggregation sidebar" element

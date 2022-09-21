Feature: Map

  As a site visitor
  I need to be able to view data on a map
  So that I can gain insights into regional differences

  Background:
    Given I am on "/1-3-1"
    And I wait 3 seconds

  Scenario: Indicators have a "Map" tab which displays data in a map
    And I click on "the Map tab"
    Then I should see a "map" element
    And I should see "My map attribution"

  Scenario: While the map is being displayed, the sidebar is hidden
    And I click on "the Map tab"
    And I wait 1 second
    Then I should not see a "disaggregation sidebar" element
    And I click on "the Chart tab"
    And I wait 1 second
    Then I should see a "disaggregation sidebar" element

  Scenario: The map should include a download button for GeoJSON
    And I click on "the Map tab"
    Then I should see "Download map data (.geojson)"
    And I should see "My English regions"

  Scenario: Text on the map should be translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I wait 3 seconds
    And I click on "the Map tab"
    And I should see "Descargar GeoJSON"
    And I should see "My Spanish regions"

  Scenario: The data footer should display in the map pane
    And I click on "the Map tab"
    Then I should see a "map footer" element
    And I should see "My field label"
    And I should see "My field content"

  Scenario: The map should display the disaggregations, unit, and series
    And I click on "the Map tab"
    Then I should see a "map disaggregation" element
    And I should see 3 "map disaggregation item" elements
    And I should see "Series A"
    And I should see "Percent"
    And I should see "Female"

  Scenario: The map allows the disaggregations, unit, and series to be changed
    And I click on "the Map tab"
    And I click on "the 'Change breakdowns' button"
    Then I should see a "map disaggregation popup" element
    And I click on "the 'Rural' item under Location"
    And I click on "the map disaggregation apply button",
    Then I should see 4 "map disaggregation item" elements
    And I should see "Location"
    And I should see "Rural"

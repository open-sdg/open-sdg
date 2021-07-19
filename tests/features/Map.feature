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
    Then I should see "Download GeoJSON"
    And I should see "My English regions"

  Scenario: The map should include a dropdown for selection disaggregations
    And I click on "the Map tab"
    Then I should see "Sub-categories"
    And I should see "Female"
    And I should see "Male"
    And I should see "Rural - Female"
    And I should see "Urban - Female"
    And I should see "Rural - Male"
    And I should see "Urban - Male"

  Scenario: Text on the map should be translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I wait 3 seconds
    And I click on "the Map tab"
    Then I should see "Subcategorías"
    And I should see "Female-translated (Spanish)"
    And I should see "Male-translated (Spanish)"
    And I should see "Rural-translated (Spanish) - Female-translated (Spanish)"
    And I should see "Urban-translated (Spanish) - Female-translated (Spanish)"
    And I should see "Rural-translated (Spanish) - Male-translated (Spanish)"
    And I should see "Urban-translated (Spanish) - Male-translated (Spanish)"
    And I should see "Descargar GeoJSON"
    And I should see "My Spanish regions"

  Scenario: The data footer should display in the map pane
    And I click on "the Map tab"
    Then I should see a "map footer" element
    And I should see a "map footer item" element

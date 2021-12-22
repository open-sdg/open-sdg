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

  Scenario: The map should include a download button for GeoJSON
    And I click on "the Map tab"
    Then I should see "Download GeoJSON"
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
    And I should see a "map footer item" element

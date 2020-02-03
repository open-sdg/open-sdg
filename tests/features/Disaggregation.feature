Feature: Disaggregation

  As a site visitor
  I need to be able to disaggregate the indicator data
  So that I can gain a more detailed understanding of SDG progress

  Background:
    Given I am on "/1-1-1"
    And I wait 5 seconds

  Scenario: The disaggregation filters add lines to the chart
    Then I should see 1 "chart legend item" element
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see 2 "chart legend item" elements

  Scenario: The disaggregation filters add columns to the table
    And I click on "the Table tab"
    Then I should see 2 "data table column" elements
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see 3 "data table column" elements

  Scenario: The disaggregation filter select/clear buttons work
    And I click on "the filter drop-down button"
    And I click on "the 'Select all' button"
    Then I should see 3 "chart legend item" elements
    And I click on "the 'Clear all' button"
    Then I should see 1 "chart legend item" element
    And I click on "the 'Select all' button"
    Then I should see 3 "chart legend item" elements
    And I click on "the 'Clear selections' button"
    And I should see 1 "chart legend item" element

  Scenario: The disaggregation filters are translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I click on "the filter drop-down button"
    Then I should see "Borrar selecciones"
    And I should see "Seleccionar todo"
    And I should see "Limpiar todo"
    And I should see "Group-translated"
    And I should see "A-translated"

  Scenario: The chart legend items are translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see "A-translated" in the "chart legend" element

  Scenario: The table columns are translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see "A-translated" in the "data table" element

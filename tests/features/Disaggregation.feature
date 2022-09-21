Feature: Disaggregation

  As a site visitor
  I need to be able to disaggregate the indicator data
  So that I can gain a more detailed understanding of SDG progress

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

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
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    Then I should see "Borrar selecciones"
    And I should see "Seleccionar todo"
    And I should see "Limpiar todo"
    And I should see "Group-translated (Spanish)"
    And I should see "A-translated (Spanish)"

  Scenario: The chart legend items are translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see "A-translated (Spanish)" in the "chart legend" element

  Scenario: The table columns are translated
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see "A-translated (Spanish)" in the "data table" element

  Scenario: The "COMPOSITE_BREAKDOWN" field can be renamed
    Then I should see "My composite breakdown label"

  Scenario: Multiple hierarchical disaggregations appear correctly
    And I am on "/4-2-2"
    And I wait 3 seconds
    And I click on "the first filter drop-down button"
    And I click on "the first filter option in the first filter drop-down"
    And I click on "the second filter drop-down button"
    And I click on "the first filter option in the second filter drop-down"
    And I click on "the third filter drop-down button"
    And I click on "the first filter option in the third filter drop-down"
    And I click on "the fourth filter drop-down button"
    And I click on "the first filter option in the fourth filter drop-down"
    Then I should see 5 "chart legend item" elements

  Scenario: Disaggregations can be ignored
    And I am on "/2-2-2"
    And I wait 3 seconds
    Then I should see 1 "disaggregation filter" element

  Scenario: Translation keys can be used to ignore disaggregations
    And I am on "/1-2-1"
    And I wait 3 seconds
    Then I should see 1 "disaggregation filter" element

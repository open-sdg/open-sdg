Feature: Disaggregation

  As a site visitor
  I need to be able to disaggregate the indicator data
  So that I can gain a more detailed understanding of SDG progress

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: The disaggregation filters in the left sidebar work properly
    Given I am on "/1-1-1"
    Then I should see a "disaggregation filter" element
    And I click on "the filter drop-down button"
    Then I should see "Select all"
    And I should see "Clear all"
    And I click on "the first filter option"
    Then I should see a "second item in the legend" element

  Scenario: The disaggregation filters in the left sidebar are translated
    Given I am on "/1-1-1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    And I click on "the filter drop-down button"
    Then I should see "Borrar selecciones"
    And I should see "Seleccionar todo"
    And I should see "Limpiar todo"
    And I should see "Group-translated"
    And I should see "A-translated"

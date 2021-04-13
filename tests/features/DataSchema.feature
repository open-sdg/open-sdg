Feature: Data schema

  As a data manager
  I need to be able to apply a schema to the data visualizations
  So that I can control the order of fields and values

  Scenario: The normal order of field values is alphabetical (female before male)
    Given I am on "/1-3-1"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the last filter option"
    Then I should see "Male" in the "chart legend" element

  Scenario: This order can be overriden by a data schema (male before female)
    Given I am on "/3-1-1"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the last filter option"
    Then I should see "Female" in the "chart legend" element

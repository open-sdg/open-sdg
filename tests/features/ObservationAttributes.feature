Feature: Observation attributes

  As a site visitor
  I need to be able to view metadata about each individual observation
  So that I can interpret the meaning of the data

  Background:
    Given I am on "/1-3-1"
    And I wait 3 seconds

  Scenario: Indicators display a list of attributes in footnotes beneath the data
    Then I should see "[note 1]"
    And I should see "Estimated value"
    And I should see "[note 2]"
    And I should see "Forecast value"
    And I should see "[note 3]"
    And I should see "Unvalidated value"
    And I should see "[note 4]"
    And I should see "Low reliability"
    And I should see "[note 5]"
    And I should see "Experimental value"
    And I should see "[note 6]"
    And I should see "Imputed value"

  Scenario: Indicators should display observation attributes in the cells of the table
    And I click on "the Table tab"
    Then I should see "60 [note 3]"
    And I should not see "60 [note 6]"
    And I click on "the second series"
    Then I should see "60 [note 6]"

  Scenario: Disaggregation appears even when observation attributes are used with headline data
    Given I am on "/4-4-1"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see 1 "chart legend item" element

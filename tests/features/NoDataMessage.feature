Feature: Indicator

  As a site visitor
  I need to be alerted when my disaggregation/unit/series choices result in no data
  So that I do not get confused by a blank chart/table

  Background:
    Given I am on "/1-3-1"
    And I wait 3 seconds
    And I click on "the filter drop-down button"
    And I click on "the first filter option"

  Scenario: The no-data message displays in both the chart and table tabs
    Then I should see a "chart has no data" element
    And I click on "the Table tab"
    Then I should see a "table has no data" element

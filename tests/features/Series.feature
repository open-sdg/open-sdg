Feature: Series

  As a site visitor
  I need to be able to change the series
  So that I can see multiple datasets per indicator

  Scenario: The selected series changes the chart title
    Given I am on "/2-5-2"
    And I wait 3 seconds
    Then I should see "Title with A and Percent"
    And I click on "the last series"
    Then I should see "Title with B and Percent"

  Scenario: When the selected series lacks disaggregation, sub-categories are hidden
    Given I am on "/2-5-2"
    And I wait 3 seconds
    Then I should not see a "disaggregation filter" element
    And I click on "the last series"
    Then I should see a "disaggregation filter" element
    And I click on "the first series"
    Then I should not see a "disaggregation filter" element

  Scenario: When a series and unit are selected, only data with both will display
    Given I am on "/2-5-2"
    And I wait 3 seconds
    And I click on "the second series"
    And I click on "the last unit of measurement"
    And I click on "the filter drop-down button"
    And I click on "the last filter option"
    Then I should see 1 "chart legend item" element
    And I click on "the first filter option"
    Then I should see 1 "chart legend item" element

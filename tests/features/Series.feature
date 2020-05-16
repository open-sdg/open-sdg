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

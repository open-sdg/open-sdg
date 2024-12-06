Feature: Start values

  As a site administrator
  I need to be able to specify the starting values for an indicator
  So that I can show the end-user the relevant data

  Background:
    Given I am on "/2-3-1"
    And I wait 3 seconds

  Scenario: The indicator start values correctly show when the page is loaded
    Then I should see 7 "chart legend item" elements

  Scenario: The indicator start values correctly show after changing the series
    And I click on "the second series"
    And I wait 1 second
    And I click on "the first series"
    And I wait 1 second
    Then I should see 7 "chart legend item" elements

  Scenario: The indicator start values are not used if they would result in 0 data
    And I click on "the third series"
    And I wait 1 second
    Then I should see 2 "chart legend item" elements

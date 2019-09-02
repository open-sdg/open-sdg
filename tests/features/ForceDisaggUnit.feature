Feature: Force disagg/unit

  As a site visitor
  I want all charts to show data by default
  So that I don't think that there's a problem with the chart

  Scenario: Data shows on chart even if headline data isn't available
    Given I am on "/1-4-2"
    And I wait 1 second
    Then I should see 1 "chart legend item" element

Feature: Set min/max values

  As a site visitor
  I need to be able to see data on the correct scale
  So that I am not misled
  
  Scenario: Indicators with a min/max value display data in a chart
    Given I am on "/1-5-1"
    And I wait 3 seconds
    Then I should see a "visual chart" element

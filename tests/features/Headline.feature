Feature: Headlines

  As a site visitor browsing indicator pages with data
  I need to see a series visualised without requiring any interaction
  So that I easily and quickly see statistical trends

  Scenario: Indicators with headlines (series without disaggregation) show visualisation
    Given I am on "/1-2-1"
    Then I should see 1 "chart legend item" element

  Scenario: Indicators without headlines, but single-disaggregation rows, show visualisation
    Given I am on "/1-3-1"
    Then I should see 1 "chart legend item" element

  Scenario: Indicators without headlines, but double-disaggregation rows, show visualisation
    Given I am on "/1-4-1"
    Then I should see 1 "chart legend item" element

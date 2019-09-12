Feature: Headlines

  As a site visitor browsing indicator pages with data
  I need to see a series visualised without requiring any interaction
  So that I easily and quickly see statistical trends

  Definitions:
  * Required columns: Each data series must have data for "Year" and "Value".
  * Optional columns: Each data series can have data for "Units" and "GeoCode".
  * Disaggregation columns: Other columns besides the required/optional columns.
  * Headline: A "headline" is a series with no disaggregation columns. In other
    words it contains data for required and optional columns only.
  * Single-disaggregation series: A "single-disaggregation series" is a series
    that contains data for required/optional columns plus one disaggregation.
  * Double-disaggregation series: A "double-disaggregation series" is a series
    that contains data for required/optional columns plus two disaggregations.
  * Multi-unit indicator: An indicator with data in more than one unit.

  Because these tests rely on specific conditions, the scenarios visit particular
  indicators that have been pre-configured with the data to meet those
  condition. The datasets can be viewed at the following address:
  https://github.com/open-sdg/open-sdg-data-testing/tree/develop/data

  Scenario: Indicators with a headline visualise that headline
    Given I am on "/1-2-1"
    And I wait 1 second
    Then I should see 1 "chart legend item" element

  Scenario: No-headline indicators with only a single-disaggregation series visualise that series
    Given I am on "/3-1-1"
    And I wait 1 second
    Then I should see 1 "chart legend item" element

  Scenario: No-headline indicators with only a double-disaggregation series visualise that series
    Given I am on "/1-4-1"
    And I wait 1 second
    Then I should see 1 "chart legend item" element

  Scenario: No-headline indicators with both single & double-disaggregation series visualise the single
    Given I am on "/1-5-1"
    And I wait 1 second
    Then I should see 1 "chart legend item" element
    And I should see "single disaggregation" in the "chart legend" element

  Scenario: Multi-unit no-headline indicators with only a single-disaggregation series visualise that series
    Given I am on "/1-5-2"
    And I wait 2 seconds
    Then I should see 1 "chart legend item" element
    And I should see a "selected unit of measurement" element

  Scenario: Multi-unit no-headline indicators with only a double-disaggregation series visualise that series
    Given I am on "/1-5-3"
    And I wait 2 seconds
    Then I should see 1 "chart legend item" element
    And I should see a "selected unit of measurement" element

  Scenario: Multi-unit no-headline indicators with both single & double-disaggregation series visualise the single
    Given I am on "/1-5-4"
    And I wait 2 seconds
    Then I should see 1 "chart legend item" element
    And I should see a "selected unit of measurement" element
    And I should see "single disaggregation" in the "chart legend" element

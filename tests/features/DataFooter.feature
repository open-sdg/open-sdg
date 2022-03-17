Feature: Data footer

  As a site visitor
  I need to be able to see metadata about the displayed data beneath the chart and table
  So that I can be aware of the details of the data that I am seeing

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: Indicators can show certain metadata fields beneath the table, chart, and map
    Then I should see "My first organisation with a long title"
    And I should see a "chart footer" element
    And I should see 7 "chart footer item" elements
    And I click on "the Table tab"
    Then I should see a "table footer" element
    And I should see 7 "table footer item" elements

  Scenario: Indicator can show additional footer fields by series or unit
    And I am on "/2-5-2"
    And I wait 3 seconds
    Then I should see a "footer field that says 'Testing label for series A'" element
    And I should not see a "footer field that says 'Another field label for unit total'" element
    And I click on "the last unit of measurement"
    Then I should see a "footer field that says 'Another field label for unit total'" element

  Scenario: Time-series attributes are displayed in the data footer
    Then I should see a "time-series footnote" element
    And I should see "Comment for headline"
    And I click on "the filter drop-down button"
    And I click on "the first filter option"
    Then I should see "Comment for series A"

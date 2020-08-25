Feature: Unit of measurement

  As a site visitor
  I need to be able to change the unit of measurement
  So that I can see the data that is useful for my needs

  Scenario: The selected unit of measurement changes the chart title
    Given I am on "/1-5-2"
    And I wait 3 seconds
    Then I should see "My untranslated graph title for percent"
    And I click on "the last unit of measurement"
    Then I should see "My English graph title for total"

  Scenario: When the selected unit lacks disaggregation, sub-categories are hidden
    Given I am on "/1-4-2"
    And I wait 3 seconds
    Then I should not see a "disaggregation filter" element
    And I click on "the first unit of measurement"
    Then I should see a "disaggregation filter" element
    And I click on "the last unit of measurement"
    Then I should not see a "disaggregation filter" element

  Scenario: Unit-specific disaggregation values only display when their unit is selected
    Given I am on "/2-3-2"
    And I wait 3 seconds
    Then I should not see "Unit-specific value"
    And I click on "the last unit of measurement"
    Then I should see "Unit-specific value"

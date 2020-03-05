Feature: Unit of measurement

  As a site visitor
  I need to be able to change the unit of measurement
  So that I can see the data that is useful for my needs

  Background:
    Given I am on "/1-5-2"
    And I wait 3 seconds

  Scenario: The selected unit of measurement changes the chart title
    Then I should see "My untranslated graph title for percent"
    And I click on "the last unit of measurement"
    Then I should see "My English graph title for total"

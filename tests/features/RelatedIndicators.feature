Feature: Related indicators

  As a site visitor
  I need to be able to see what indicators are related
  So that I can see more related data

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: Indicators can have a tab for related indicators
    Then I should see "Related indicators"
    And I should see "My related indicators blurb"
    And I should see "Proportion of population living below the national poverty line, by sex and age"
    And I should see "End hunger, achieve food security and improved nutrition and promote sustainable agriculture"
    And I should see "Volume of production per labour unit by classes of farming/pastoral/forestry enterprise size"

  Scenario: Indicators without related indicators still show the tab
    And I am on "/1-2-1"
    Then I should see "Related indicators"
    And I should not see "My related indicators blurb"
    And I should see "No related indicators available"

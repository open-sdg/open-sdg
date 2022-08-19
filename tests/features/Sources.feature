Feature: Sources

  As a site visitor
  I need to be able to see details about the data sources
  So that I learn where the data came from

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: Indicators can have a tab for sources
    Then I should see "My alternate sources tab"
    And I should see "My source organisation"
    And I should see "My source periodicity"
    And I should see "My source earliest available"
    And I should see "My source geographical coverage"
    And I should see "My source URL text"
    And I should see "My release date"
    And I should see "My statistical classification"
    And I should see "My contact info"
    And I should see "My other info"
    And I should see "My sources blurb"

  Scenario: Indicators without sources still show the tab
    And I am on "/1-2-1"
    Then I should see "My alternate sources tab"
    And I should see "My sources blurb"
    And I should see "No sources available"

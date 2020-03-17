Feature: Reporting status page

  As a site visitor
  I need to see the reporting status of all the goals
  So that I can know how complete the platform is

  Background:
    Given I am on "/reporting-status"

  Scenario: All available goals are listed
    Then I should see 4 "goal status" elements

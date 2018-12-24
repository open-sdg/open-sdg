Feature: Reporting status page

  As a site visitor
  I need to see the reporting status of all the goals
  So that I can know how complete the platform is

  Background:
    Given I am on "reporting-status"

  Scenario: All 17 goals are listed
    Then I should see 17 ".goal .frame" elements

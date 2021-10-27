Feature: Progress status page

  As a site visitor
  I need to see the progress status of all the indicators
  So that I can know whether progress is being made for each indicator

  Scenario: Progress status appears on goal pages
    Given I am on "/1"
    Then I should see "Target achieved"

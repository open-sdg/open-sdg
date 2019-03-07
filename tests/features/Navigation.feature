Feature: Navigation

  As site visitor
  I need navigation links across the top of the site
  So that I can quickly get to the information I need

  Background:
    Given I am on the homepage

  Scenario: All expected menu items are visible
    Then I should see "Reporting Status"
    And I should see "About"
    And I should see "Guidance"
    And I should see "FAQ"

Feature: Publications

  As a site visitor
  I need to be able to get to publications that are related to an indicator
  So that I get more information and background about the indicator

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: Indicators can have a tab for publications
    Then I should see "Publications"
    And I should see "My publication"
    And I should see "My publication description"
    And I should see "My publications blurb"
    And I should see "February 03, 2022"

  Scenario: Indicators without publications still show the tab
    And I am on "/1-2-1"
    Then I should see "Publications"
    And I should see "My publications blurb"
    And I should see "No publications available"

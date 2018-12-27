Feature: Homepage

  As site visitor
  I need the correct experience on the homepage
  So that I can continue browsing into the site

  Background:
    Given I am on the homepage

  Scenario: All 17 goal icons are visible
    Then I should see 17 "goal icon" elements

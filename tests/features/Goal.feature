Feature: Goal page

  As a site viewer
  I need to see complete information about a goal, on its page
  So that I can navigate further to indicators that I am looking for

  Scenario: Goal 1 shows all indicators
    Given I am on "no-poverty"
    Then I should see 14 ".indicator-cards > div" elements

  Scenario: Goal 2 shows all indicators
    Given I am on "zero-hunger"
    Then I should see 13 ".indicator-cards > div" elements

  Scenario: Goal 3 shows all indicators
    Given I am on "good-health-and-well-being"
    Then I should see 27 ".indicator-cards > div" elements

  Scenario: Goal 4 shows all indicators
    Given I am on "quality-education"
    Then I should see 11 ".indicator-cards > div" elements

  Scenario: Goal 5 shows all indicators
    Given I am on "gender-equality"
    Then I should see 14 ".indicator-cards > div" elements

  Scenario: Goal 6 shows all indicators
    Given I am on "clean-water-and-sanitation"
    Then I should see 11 ".indicator-cards > div" elements

  Scenario: Goal 7 shows all indicators
    Given I am on "affordable-and-clean-energy"
    Then I should see 6 ".indicator-cards > div" elements

  Scenario: Goal 8 shows all indicators
    Given I am on "decent-jobs-and-economic-growth"
    Then I should see 17 ".indicator-cards > div" elements

  Scenario: Goal 9 shows all indicators
    Given I am on "industry-innovation-and-infrastructure"
    Then I should see 12 ".indicator-cards > div" elements

  Scenario: Goal 10 shows all indicators
    Given I am on "reduced-inequalities"
    Then I should see 11 ".indicator-cards > div" elements

  Scenario: Goal 11 shows all indicators
    Given I am on "sustainable-cities-communities"
    Then I should see 15 ".indicator-cards > div" elements

  Scenario: Goal 12 shows all indicators
    Given I am on "responsible-consumption-and-production"
    Then I should see 13 ".indicator-cards > div" elements

  Scenario: Goal 13 shows all indicators
    Given I am on "climate-action"
    Then I should see 8 ".indicator-cards > div" elements

  Scenario: Goal 14 shows all indicators
    Given I am on "life-below-water"
    Then I should see 10 ".indicator-cards > div" elements

  Scenario: Goal 15 shows all indicators
    Given I am on "life-on-land"
    Then I should see 14 ".indicator-cards > div" elements

  Scenario: Goal 16 shows all indicators
    Given I am on "peace-and-justice-strong-institutions"
    Then I should see 23 ".indicator-cards > div" elements

  Scenario: Goal 17 shows all indicators
    Given I am on "partnerships-for-the-goals"
    Then I should see 25 ".indicator-cards > div" elements

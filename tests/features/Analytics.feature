Feature: Analytics

  As a site admin
  I need anonymous statistics on user activity
  So that I can improve the site

  Scenario: Google Analytics tags track events on the indicator data tabs
    Given I am on "/1-1-1"
    And I should see "Change data view"
    And I should see "Change to Chart tab"

  Scenario: Google Analytics tags track events on the contrast switcher
    Given I am on "/"
    Then I should see "Accessibility"
    And I should see "Change contrast setting"

  Scenario: Google Analytics data can be customised by preset
    Given I am on "/1-1-1"
    Then I should see "My custom category"
    And I should see "My custom action"
    And I should see "My custom label"

Feature: High contrast mode

  As a site visitor with vision impairment
  I need to be able to switch to high-contrast mode
  So that I can distinguish the colors on the site

  Scenario: The high-contrast switcher works on the homepage
    Given I am on the homepage
    And I click on "the high-contrast button"
    Then the "body.contrast-high" element should exist
    Then I should see 17 "high-contrast goal icon" elements

Feature: Accessibility

  As a site viewer with disabilities
  I need access to all the same information as viewers without disabilities
  So that everyone gains the same insights and knowledge from the site

  Scenario: Page titles are unique and descriptive
    Given I am on "/"
    Then I should see "<title>My homepage title - Indicators For The Sustainable Development Goals</title>"
    And I am on "/es/goals"
    Then I should see "<title>My Spanish goals page title - Indicators For The Sustainable Development Goals</title>"

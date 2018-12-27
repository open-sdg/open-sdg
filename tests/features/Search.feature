Feature: Search

  As a site viewer
  I need to be able to perform a keyword search
  So that I can easily find all the indicators related to a topic

  Scenario: Search box works
    Given I am on the homepage
    And I fill in "the search box" with "poverty"
    And I send key "Enter" in "the search box" element
    And I wait 3 seconds
    Then I should be on "/search/?poverty"
    And I should see "5 indicators found in 1 goal"

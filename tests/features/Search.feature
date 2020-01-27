Feature: Search

  As a site viewer
  I need to be able to perform a keyword search
  So that I can easily find all the indicators related to a topic

  Scenario: Search index includes goals
    Given I am on the homepage
    And I fill in "the search box" with "poverty"
    And I send key "Enter" in "the search box" element
    And I wait 3 seconds
    Then I should be on "/search/?q=poverty"
    And I should see "6 results found"
    And I follow "End poverty in all its forms everywhere"
    Then I should be on "/1/"

  Scenario: Search index includes indicators
    Given I am on the homepage
    And I fill in "the search box" with "emissions"
    And I send key "Enter" in "the search box" element
    And I wait 3 seconds
    Then I should be on "/search/?q=emissions"
    And I should see "2 results found"
    And I follow "CO2 emission per unit of value added"
    Then I should be on "/9-4-1/"

  Scenario: Search index includes pages
    Given I am on the homepage
    And I fill in "the search box" with "guidance"
    And I send key "Enter" in "the search box" element
    And I wait 3 seconds
    Then I should be on "/search/?q=guidance"
    And I should see "3 results found"
    And I follow "Guidance"
    Then I should be on "/guidance/"

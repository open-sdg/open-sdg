Feature: Search

  As a site viewer
  I need to be able to perform a keyword search
  So that I can easily find all the indicators related to a topic

  Scenario: Search index includes goals
    Given I am on the homepage
    And I fill in "the search box" with "hunger"
    And I send key "Enter" in "the search box" element
    And I wait 6 seconds
    Then I should see "1 results found"
    And I follow "End hunger, achieve food security and improved nutrition and promote sustainable agriculture"
    Then I should be on "/2/"

  Scenario: Search index includes indicators
    Given I am on the homepage
    And I fill in "the search box" with "mortality"
    And I send key "Enter" in "the search box" element
    And I wait 6 seconds
    Then I should see "1 results found"
    And I follow "Maternal mortality ratio"
    Then I should be on "/3-1-1/"

  Scenario: Search index includes pages
    Given I am on the homepage
    And I fill in "the search box" with "platypus"
    And I send key "Enter" in "the search box" element
    And I wait 6 seconds
    Then I should see "1 results found"
    And I follow "About"
    Then I should be on "/about/"

  Scenario: Search indexes can include extra fields
    Given I am on the homepage
    And I fill in "the search box" with "FAO"
    And I send key "Enter" in "the search box" element
    And I wait 6 seconds
    Then I should see "3 results found"

  Scenario: The "did you mean" feature suggests alternative searches
    Given I am on the homepage
    And I fill in "the search box" with "popular"
    And I send key "Enter" in "the search box" element
    And I wait 6 seconds
    Then I should see "No results"
    And I should see "did you mean"
    And I follow "popul"
    And I wait 6 seconds
    Then I should see "results found"

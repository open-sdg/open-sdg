Feature: Annotations

  As a site viewer
  I need to see annotations on charts and tables
  So that I can understand more context about the data

  Scenario: Target lines appear on indicator tables
    Given I am on "/1-1-1"
    And I wait 3 seconds
    And I click on "the Table tab"
    Then I should see "My target line"

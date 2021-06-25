Feature: Goal page

  As a site viewer
  I need to see complete information about a goal, on its page
  So that I can navigate further to indicators that I am looking for

  Scenario Outline: Goals show the correct number of indicators
    Given I am on "<PATH>"
    Then I should see <TOTAL> "goal indicator" elements

    Examples:
      | PATH | TOTAL |
      | /1   | 10    |
      | /2   | 6     |
      | /3   | 1     |

  Scenario: The goal-by-target layout displays correctly
    Given I am on "/testing-goal-by-target"
    Then I should see "Targets"
    And I should see 5 "goal target" elements
    And I should see 10 "goal indicator" elements

  Scenario: The goal-by-target-vertical layout displays correctly
    Given I am on "/goal-by-target-vertical"
    Then I should see "Targets and indicators"
    And I should see 5 "goal target" elements
    And I should see 10 "goal indicator" elements

  Scenario: Goals can have custom content
    Given I am on "/1"
    Then I should see "My content for goal 1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "My translated content for goal 1"
    And I am on "/2"
    Then I should see "My goal 2 content"

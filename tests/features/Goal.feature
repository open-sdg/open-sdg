Feature: Goal page

  As a site viewer
  I need to see complete information about a goal, on its page
  So that I can navigate further to indicators that I am looking for

  Scenario Outline: Goals show the correct number of indicators
    Given I am on "<PATH>"
    Then I should see <TOTAL> "goal indicator" elements

    Examples:
      | PATH | TOTAL |
      | /1   | 9     |
      | /2   | 4     |
      | /3   | 1     |

  Scenario: The goal-by-target layout displays correctly
    Given I am on "/testing-goal-by-target"
    Then I should see "Targets"
    And I should see 5 "goal target" elements
    And I should see 9 "goal indicator" elements

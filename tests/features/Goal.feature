Feature: Goal page

  As a site viewer
  I need to see complete information about a goal, on its page
  So that I can navigate further to indicators that I am looking for

  Scenario Outline: Goals show the correct number of indicators
    Given I am on "<PATH>"
    Then I should see <TOTAL> "goal indicator" elements

    Examples:
      | PATH | TOTAL |
      | /1   | 14    |
      | /2   | 13    |
      | /3   | 27    |
      | /4   | 11    |
      | /5   | 14    |
      | /6   | 11    |
      | /7   | 6     |
      | /8   | 17    |
      | /9   | 12    |
      | /10  | 11    |
      | /11  | 15    |
      | /12  | 13    |
      | /13  | 8     |
      | /14  | 10    |
      | /15  | 14    |
      | /16  | 23    |
      | /17  | 25    |

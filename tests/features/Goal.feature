Feature: Goal page

  As a site viewer
  I need to see complete information about a goal, on its page
  So that I can navigate further to indicators that I am looking for

  Scenario Outline: Goals show the correct number of indicators
    Given I am on "<PATH>"
    Then I should see <TOTAL> "goal indicator" elements

    Examples:
      | PATH                                    | TOTAL |
      | /no-poverty                             | 14    |
      | /zero-hunger                            | 13    |
      | /good-health-and-well-being             | 27    |
      | /quality-education                      | 11    |
      | /gender-equality                        | 14    |
      | /clean-water-and-sanitation             | 11    |
      | /affordable-and-clean-energy            | 6     |
      | /decent-jobs-and-economic-growth        | 17    |
      | /industry-innovation-and-infrastructure | 12    |
      | /reduced-inequalities                   | 11    |
      | /sustainable-cities-communities         | 15    |
      | /responsible-consumption-and-production | 13    |
      | /climate-action                         | 8     |
      | /life-below-water                       | 10    |
      | /life-on-land                           | 14    |
      | /peace-and-justice-strong-institutions  | 23    |
      | /partnerships-for-the-goals             | 25    |

  Scenario Outline: Goals show the correct number of targets
    Given I am on "<PATH>"
    Then I should see <TOTAL> "goal target" elements

    Examples:
      | PATH                                    | TOTAL |
      | /no-poverty                             | 7     |
      | /zero-hunger                            | 8     |
      | /good-health-and-well-being             | 13    |
      | /quality-education                      | 10    |
      | /gender-equality                        | 9     |
      | /clean-water-and-sanitation             | 8     |
      | /affordable-and-clean-energy            | 5     |
      | /decent-jobs-and-economic-growth        | 12    |
      | /industry-innovation-and-infrastructure | 8     |
      | /reduced-inequalities                   | 10    |
      | /sustainable-cities-communities         | 10    |
      | /responsible-consumption-and-production | 11    |
      | /climate-action                         | 5     |
      | /life-below-water                       | 10    |
      | /life-on-land                           | 13    |
      | /peace-and-justice-strong-institutions  | 12    |
      | /partnerships-for-the-goals             | 19    |

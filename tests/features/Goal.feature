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

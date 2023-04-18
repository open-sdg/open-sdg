Feature: Proxy indicators

  As a site visitor
  I need to see that certain indicators contain proxy data
  So that I can be clear about how closely the data correspond to the UN global data

  Scenario: Entire indicators can be advertised as "proxy" indicators
    Given I am on "/1-1-1"
    Then I should see 3 "proxy pill" elements
    And I should see "This indicator contains some alternative data to those specified by the United Nations (UN). This indicator is the most suitable match currently available."

  Scenario: Certain serieses within indicators can be advertised as "proxy" serieses
    Given I am on "/1-3-1"
    And I wait 3 seconds
    Then I should see "This indicator contains some alternative data to those specified by the United Nations (UN). This indicator is the most suitable match currently available."
    Then I should see 3 "proxy pill" elements
    And I click on "the second series"
    And I wait 3 seconds
    Then I should see 5 "proxy pill" elements

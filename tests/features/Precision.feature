Feature: Precision

  As a site visitor
  I need to be able to see data with the correct precision
  So that I can accurately interpret the data

  Scenario: The number of decimal places can be controlled
    Given I am on "/1-5-2"
    And I wait 3 seconds
    And I click on "the Table tab"
    Then I should see "1.0000"

  Scenario: The number of decimal places can be controlled per unit
    Given I am on "/1-5-2"
    And I wait 3 seconds
    And I click on "the Table tab"
    And I click on "the last unit of measurement"
    Then I should see "2.00"

  Scenario: The decimal separator can be controlled per language
    Given I am on "/fr-CA/4-4-1/"
    Then I should see "8.5"
    And I am on "/es/4-4-1/"
    Then I should see "8,5"

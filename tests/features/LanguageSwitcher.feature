Feature: Language switcher

  As a site visitor
  I need to be able to switch to my native language
  So that I can understand the platform

  Scenario: Language switcher works on the homepage
    Given I am on the homepage
    Then I should see "My frontpage introduction banner title"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "My Spanish frontpage introduction banner title"

  Scenario: Lanugage switcher works on a goal page
    Given I am on "/1"
    Then I should see "End poverty in all its forms everywhere"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Poner fin a la pobreza en todas sus formas y en todo el mundo"

  Scenario: Language switcher works on an indicator page
    Given I am on "/1-1-1"
    Then I should see "Proportion of the population living below the international poverty line by sex, age, employment status and geographic location (urban/rural)"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Proporción de la población que vive por debajo del umbral internacional de pobreza, desglosada por sexo, edad, situación laboral y ubicación geográfica (urbana o rural)"

  Scenario: The code for a language can be overridden in permalinks - eg: "fr-CA" instead of "fr".
    Given I am on the homepage
    And I click on "the language toggle dropdown"
    And I follow "the last language option"
    Then I should be on "/fr-CA/"
    And I should see "My French Canadian frontpage introduction banner title"

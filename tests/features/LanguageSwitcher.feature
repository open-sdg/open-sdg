Feature: Language switcher

  As a site visitor
  I need to be able to switch to my native language
  So that I can understand the platform

  Scenario: Language switcher works on the homepage
    Given I am on the homepage
    Then I should see "My custom frontpage instructions"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "My translated frontpage instructions"

  Scenario: Lanugage switcher works on a goal page
    Given I am on "/1"
    Then I should see "End poverty in all its forms everywhere"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Poner fin a la pobreza en todas sus formas y en todo el mundo"

  Scenario: Language switcher works on an indicator page
    Given I am on "/1-1-1"
    Then I should see "Proportion of population below the international poverty line, by sex, age, employment status and geographical location (urban/rural)"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Proporción de la población que vive por debajo del umbral internacional de pobreza, desglosada por sexo, edad, situación laboral y ubicación geográfica (urbana o rural)"

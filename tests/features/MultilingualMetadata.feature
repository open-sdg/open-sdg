Feature: Multilingual Metadata

  As a site visitor
  I need to be able to read metadata in my own language
  So that I can learn about the data I am looking at

  Scenario: Indicator names can be translated using a "subfolder" approach
    Given I am on "/2-1-1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated indicator name in a subfolder"

  Scenario: Indicator names can be translated using a "translation key" approach
    Given I am on "/2-2-2"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated indicator name via translation key"

  Scenario: National metadata can be translated using a "subfolder" approach
    Given I am on "/2-4-1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated unit of measurement in a subfolder"

  Scenario: National metadata can be translated using a "translation key" approach
    Given I am on "/2-3-2"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated unit of measurement via translation key"

  Scenario: Global indicators will fall back to the United Nations translation
    Given I am on "/6-3-1"
    Then I should see "Proportion of wastewater safely treated"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Proporción de aguas residuales tratadas de manera adecuada"

Feature: Multilingual Metadata

  As a site visitor
  I need to be able to read metadata in my own language
  So that I can learn about the data I am looking at

  Scenario: Indicator names can be translated using a "translation key" approach
    Given I am on "/2-2-2"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated indicator name via translation key"

  Scenario: National metadata can be translated using a "translation key" approach
    Given I am on "/2-3-2"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "This is a translated unit of measurement via translation key"

  Scenario: The subfolder-approach can be used to translate metadata
    Given I am on "/1-1-1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Spanish translation of available indicator"
    And I should see "This is the page content translated into Spanish."

  Scenario: Metadata fields with "_date" get parsed and translated as dates
    Given I am on "/1-1-1"
    Then I should see "April 01, 2021"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "01 de abril de 2021"

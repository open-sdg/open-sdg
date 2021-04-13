Feature: Disclaimer

  As a site viewer
  I need to see the development status of the site
  So that I can know about any important information related to site development

  Scenario: A translated disclaimer is visible at the top of each page
    Given I am on the homepage
    Then I should see "Alpha"
    And I should see "This is my disclaimer message."
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Alfa"
    And I should see "This is my Spanish disclaimer message."

Feature: Homepage

  As site visitor
  I need the correct experience on the homepage
  So that I can continue browsing into the site

  Background:
    Given I am on the homepage

  Scenario: The introduction banner appears on the page
    Then I should see "My frontpage introduction banner title"
    And I should see "My frontpage introduction banner description"

  Scenario: The heading text can be customised
    Then I should see "My custom frontpage heading"

  Scenario: All available goal icons are visible
    Then I should see 4 "goal icon" elements

  Scenario: The download-all button is available
    Then I should see "Download all data"

  Scenario: An alternate homepage is available as well
    And I am on "/frontpage-alt"
    Then I should see "My frontpage introduction banner title"
    And I should see "My frontpage introduction banner description"
    And I should see "The Sustainable Development Goals"
    And I should see "Download all data"
    And I should see "Useful resources"
    And I should see "Publications"

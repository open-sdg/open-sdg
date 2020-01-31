Feature: News

  As site visitor
  I need to see the latest news updates
  So that I can stay up-to-date on any developments

  Scenario: There is a News page with titles, dates, excerpts, and categories.
    Given I am on "/news"
    Then I should see "English Test Post 1"
    And I should see "January 10, 2020"
    And I should see "English Test Excerpt 1"
    And I should see "My English custom category"
    And I should not see "Spanish Test Post 1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Spanish Test Post 1"
    And I should see "10 de enero de 2020"
    And I should see "Spanish Test Excerpt 1"
    And I should see "My Spanish custom category"
    And I should not see "English Test Post 1"

  Scenario: There is a Categories page with titles and dates, grouped by category.
    Given I am on "/categories"
    Then I should see "My English custom category"
    And I should see "January 10, 2020"
    And I should see "English Test Post 1"
    And I should not see "My Spanish custom category"
    And I should not see "Spanish Test Post 1"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "Spanish Test Post 1"
    And I should see "My Spanish custom category"
    And I should see "10 de enero de 2020"
    And I should not see "English Test Post 1"
    And I should not see "My English custom category"

  Scenario: Post pages display titles, dates, authors, body, and categories.
    Given I am on "/news"
    And I follow "English Test Post 1"
    Then I should see "English Test Post 1"
    And I should see "January 10, 2020"
    And I should see "English Test Author 1"
    And I should see "English body for test post 1."
    And I should see "My English custom category"

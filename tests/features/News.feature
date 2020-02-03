Feature: News

  As site visitor
  I need to see the latest news updates
  So that I can stay up-to-date on any developments

  Scenario: There is a News page with titles, dates, excerpts, and categories.
    Given I am on "/news"
    Then I should see "My test post title"
    And I should see "January 10, 2020"
    And I should see "My test post excerpt"
    And I should see "My English custom category"
    And I should not see "My Spanish custom category"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "10 de enero de 2020"
    And I should see "My Spanish custom category"
    And I should not see "My English custom category"

  Scenario: There is a Categories page with titles and dates, grouped by category.
    Given I am on "/categories"
    Then I should see "My English custom category"
    And I should see "January 10, 2020"
    And I should see "My test post title"
    And I should not see "My Spanish custom category"
    And I click on "the language toggle dropdown"
    And I follow "the first language option"
    Then I should see "My Spanish custom category"
    And I should see "10 de enero de 2020"
    And I should not see "My English custom category"

  Scenario: Post pages display titles, dates, authors, body, and categories.
    Given I am on "/news"
    And I follow "My test post title"
    Then I should see "My test post title"
    And I should see "January 10, 2020"
    And I should see "My test post author"
    And I should see "My test post content"
    And I should see "My English custom category"

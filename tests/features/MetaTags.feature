Feature: Meta tags

  As a search index or third-party service crawling the site
  I need to see any meta tags
  So that I can correctly process each page

  Scenario: Pages can have arbitrary meta tags in the HEAD
    Given I am on "/about"
    Then I should see "my meta name"
    And I should see "my meta content"

Feature: Custom javascript

  As a site builder
  I need to be able to add custom javascript to the site
  So that I can use custom or third-party functionality

  Scenario: I can add custom javascript to all pages
    Given I am on the homepage
    Then I should see "Added with javascript"

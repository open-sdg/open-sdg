Feature: Embedded feature

  As a site builder
  I need to be able to embed web content on indicator pages
  So that I can display and content needed

  Scenario: A web URL can be used in the embedded_feature_url setting
    Given I am on "/1-1-1"
    And I wait 3 seconds
    Then I should see "My iframe tab title"
    And I click on "the embedded feature tab"
    Then I should should see "My iframe title"
    And I should see "My iframe content"

  Scenario: Any HTML can be used in the embedded_feature_html setting
    Given I am on "/1-2-1"
    And I wait 3 seconds
    Then I should see "My iframe tab title"
    And I click on "the embedded feature tab"
    Then I should should see "My iframe title"
    And I should see "My iframe content"

Feature: Footer

  As a site viewer
  I need to see useful information in the footer
  In case I missed what I was looking for on the rest of the page

  Scenario: A link to a Twitter account is in the footer
    Given I am on the homepage
    Then I should see "Twitter"

  Scenario: A link to a Facebook account is in the footer
    Given I am on the homepage
    Then I should see "Facebook"

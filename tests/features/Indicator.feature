Feature: Indicator

  As a site visitor
  I need to be able to view and interact with SDG indicators
  So that I can get detailed information and data about specific indicators

  Background:
    Given I am on "/1-1-1"
    And I wait 3 seconds

  Scenario: Indicators have a "Table" tab which displays a table of data
    And I click on "the Table tab"
    Then I should see a "sortable table" element

  Scenario: Indicators have buttons for downloading CSV data
    And I click on ".data-view .nav-link[href='#tableview']"
    Then I should see "Download Table CSV"
    And I should see "Download Source CSV"

  Scenario: Indicators have a "Chart" tab which displays data as a chart
    And I click on ".data-view .nav-link[href='#tableview']"
    And I click on ".data-view .nav-link[href='#chartview']"
    Then I should see a "#chartview canvas" element

  Scenario: Indicators have tabs for the different types of metadata
    And I click on ".nav-tabs .nav-link[href='#globalmetadata']"
    Then I should see "UN designated tier"
    And I click on ".nav-tabs .nav-link[href='#metadata']"
    Then I should see "Data last updated"
    And I click on ".nav-tabs .nav-link[href='#sources']"
    And I should see "My organisation"

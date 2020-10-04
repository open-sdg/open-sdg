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
    And I click on "the Table tab"
    Then I should see "Download Table CSV"
    And I should see "Download Source CSV"

  Scenario: Indicators have a "Chart" tab which displays data as a chart
    And I click on "the Table tab"
    And I click on "the Chart tab"
    Then I should see a "visual chart" element

  Scenario: Indicators have tabs for the different types of metadata
    And I click on "the Global metadata tab"
    Then I should see "UN designated tier"
    And I click on "the National metadata tab"
    Then I should see "Indicator description"
    And I click on "the Sources metadata tab"
    And I should see "My organisation"

  Scenario: The metadata tab titles and blurbs can both be configured
    Then I should see "My national metadata title"
    And I should see "My global metadata title"
    And I click on "the Global metadata tab"
    Then I should see "My global metadata blurb"
    And I click on "the National metadata tab"
    Then I should see "My national metadata blurb"

  Scenario: Missing metdata can be hidden
    And I click on "the Global metadata tab"
    Then I should not see "Global indicator description"

  Scenario: The 'indicator_available' metadata appears as a sub-heading
    Then I should see an "available indicator" element
    And I should see "Name of available indicator"
    And I am on "/1-2-1"
    And I wait 3 seconds
    Then I should not see an "available indicator" element
    And I should not see "Name of available indicator"

  Scenario: Indicators can display a free form blurb at the top.
    Then I should see "This is the page content in English."

  Scenario: Indicators can show certain metadata fields beneath the table, chart, and map
    Then I should see "My organisation"
    And I should see a "chart footer" element
    And I click on "the Table tab"
    Then I should see a "table footer" element

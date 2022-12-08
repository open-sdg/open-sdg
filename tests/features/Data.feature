Feature: Data

    As a data provider
    I need to be able to send Open SDG data in desired formats
    So that the platform viewers can see the data as I intended

    Scenario: Missing values still appear in the table, as dashes
        Given I am on "/1-1-1"
        And I wait 2 seconds
        And I click on "the Table tab"
        And I wait 2 seconds
        Then I should see 3 "table value" elements
        And I should not see "undefined" in the "table cell" element

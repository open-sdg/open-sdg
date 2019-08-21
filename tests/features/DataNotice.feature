Feature: Data notice

  As I site viewer
  I need to see important information at the top
  So I am not misled
  
  Scenario: Data notices appear on indicator pages
  Given I am on "/1-2-1"
  Then I should see "My data notice heading"
  And I should see "My data notice text"
  And I should see 1 "success data notice" element


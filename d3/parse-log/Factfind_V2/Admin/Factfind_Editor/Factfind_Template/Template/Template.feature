@Reg
Feature: Template
As a
I want to manage Protection plans for a client
So i can assist in finding protection that suits them best  

@LoginEnableTaur
Scenario: Open Fact Find Editor
	Given I am on Enable page
	And I click on "Admin" menu
	And I click on "Fact Find"
	When I choose "Fact Find Editor"
    Then I  see Fact Find Editor Page

@LoginEnableTaur
Scenario: Collapse and Expand a Fact Find Folder
	Given I am on the fact find admin page
	And I set the existing fact find in expanded mode
	When I collapse the expanded folder
	Then It collapses
	When I expand a fact find folder
	Then It expands

@Smoke
@LoginEnableTaur
Scenario: Fact Find Breadcrumb
	Given I am on the fact find admin page
    Then I see You are in: Admin > Fact Find Editor > Fact Finds
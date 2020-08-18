@Reg
Feature: MeetingHistory
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Smoke
@LoginEnableTaur
Scenario Outline: Add Meeting History
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find"
And I exclude the partner
And I click the "Meeting History" from left nav
When I hit Disclosures tab and fill for client and Save as "<Type_Of_Factfind>","<Date>","<Notes>"     
When I hit Meetings tab and fill for client and Save as "<Date>","<Notes>"
Then Meeting History section is saved and complete as "<Date>"

Examples: 
| Type_Of_Factfind | Date        | Notes       |
| Single           | 07-May-2018 | Disclosures |

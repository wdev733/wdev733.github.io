@Reg
Feature: Liabilities
	As an end user 
	I want to add a Liability
	So that i can provide more appropriate factfinds

@Smoke
@LoginEnableTaur
Scenario Outline: View client liabilities
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "<factfind>" 
	And I click the "Liabilities" from left nav
	When I choose the "<Do you have any Liabilities>" option
	Then I see all the Liabilities listed for that client

Examples:
| factfind       | Do you have any Liabilities |
| Schroders Personal Wealth Individual Fact Find | yes				 		 |

@Smoke
@LoginEnableTaur
Scenario: Add existing Liability to client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Liabilities" from left nav
	And I choose to Add New Liability from the existing Liabilities
	When I select a Liability
	And I save the existing asset
	Then I can see "Saved Successfully saved."

@LoginEnableTaur
Scenario Outline: Add new Liability to client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Liabilities" from left nav
	And I choose to a add new liability enter the details not on the system
	And I enter liability details "<assetName>","<knownValue>" and "<growthRate>"
	When I save the asset
	Then I can see "Saved Liability has been successfully saved."

 Examples:
| assetName | knownValue| growthRate |
| Asset_02  | 5000      | 20         |
@Reg
Feature: AssessingClientRisk
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Smoke
@LoginEnableTaur
Scenario Outline: Add Partner Assessing Client Risk
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I select Include Partner and Update
	And I click the "Assessing Client Risk " from left nav
	When I fill the Assessing Client Risk form for client as "<Use Previous Risk Profile>","<Previous Risk Profile>","<Previous Risk Profile Score>","<Previous Risk Profile Date>","<Client Experience Level>","<Notes>"
	And I fill the Assessing Client Risk form for partner as "<Use Previous Risk Profile>","<Previous Risk Profile>","<Previous Risk Profile Score>","<Previous Risk Profile Date>","<Client Experience Level>","<Notes>"
	Then I save and complete the Assessing Client Risk

	Examples: 
	| Use Previous Risk Profile | Previous Risk Profile | Previous Risk Profile Score | Previous Risk Profile Date | Client Experience Level | Notes          |
	| Yes                       | 3 - Medium Risk       | 425                         | 7-June-2019                | Experienced             | Assessing Risk |


	@LoginEnableTaur
Scenario Outline: Add client Assessing Client Risk
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I exclude the partner
	And I click the "Assessing Client Risk " from left nav
	When I fill the Assessing Client Risk form for client as "<Use Previous Risk Profile>","<Previous Risk Profile>","<Previous Risk Profile Score>","<Previous Risk Profile Date>","<Client Experience Level>","<Notes>"
	Then I save and complete the Assessing Client Risk

	Examples: 
	| Use Previous Risk Profile | Previous Risk Profile | Previous Risk Profile Score | Previous Risk Profile Date | Client Experience Level | Notes          |
	| Yes                       | 3 - Medium Risk       | 425                         | 7-June-2019                | Experienced             | Assessing Risk |

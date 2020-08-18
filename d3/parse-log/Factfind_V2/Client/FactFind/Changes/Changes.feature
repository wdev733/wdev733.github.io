@Reg
Feature: Changes
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

	@Smoke
@LoginEnableTaur
Scenario Outline: partner Changes
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I select Include Partner and Update
	And I click the "Changes" from left nav
	When I fill the Changes form for client as "<Details>","<Views>","<Notes>"
	And I fill the Changes form for partner as "<Details>","<Views>","<Notes>"
	Then I complete and save the form

	Examples: 
	| Details        | Views                    | Notes   |
	| client details | Potential long term care | changes |

	@LoginEnableTaur
Scenario Outline: Client Changes
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I exclude the partner
	And I click the "Changes" from left nav
	When I fill the Changes form for client as "<Details>","<Views>","<Notes>"
	Then I complete and save the form

	Examples: 
	| Details        | Views                    | Notes   |
	| client details | Potential long term care | changes |

	@LoginEnableTaur
Scenario Outline: partner Need Summary
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I select Include Partner and Update
	And I click the "Needs Summary " from left nav
	When I fill the Need Summary form for client as "<Date>","<Rationale>"
	And I fill the Need Summary form for partner as "<Date>","<Rationale>"
	Then I complete and save the form

	Examples: 
	| Date          | Rationale |
	| 11-April-2000 | Text_01   |

	@LoginEnableTaur
Scenario Outline: Client Need Summary
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I exclude the partner
	And I click the "Needs Summary " from left nav
	When I fill the Need Summary form for client as "<Date>","<Rationale>"
	Then I complete and save the form

	Examples: 
	| Date          | Rationale |
	| 11-April-2000 | Text_01   |
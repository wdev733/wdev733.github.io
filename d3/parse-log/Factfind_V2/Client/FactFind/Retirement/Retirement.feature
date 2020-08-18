@Reg
Feature: Retirement
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Smoke
@LoginEnableTaur
Scenario: See Retirement Details
	Given I am on Clients search page    
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I select Include Partner and Update
	And I click the "Pensions" from left nav
	When I click on the Retirement tab
	Then I can see the breadcrumb for "Retirement"


@LoginEnableTaur
Scenario: Add Retirement Single
	Given I am on Clients search page
    And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I exclude the partner
	And I click the "Pensions" from left nav
	And I click on the Retirement tab
	And I fill the Retirement form for client as "Yes","70","£500.00","Yes","Yes","Yes","details"
	And I save the Retirement
	When I see Saved message "Saved Fact Find updated successfully."
    And I click the "Assets" from left nav
	And I click the "Pension" from left nav
	And I click on the Retirement tab
    Then I see my changes have persisted as "Yes","70","£500.00","Yes","Yes","Yes","details"


@LoginEnableTaur
Scenario: Add Retirement Partner
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I select Include Partner and Update
	And I click the "Pensions" from left nav
	And I click on the Retirement tab
	And I fill the Retirement form for client as "Yes","70","£500.00","Yes","Yes","Yes","details"
	And I fill the Retirement form for partner as "Yes","70","£500.00","Yes","Yes","Yes","details"
	When I save the Retirement
	Then I see Saved message "Saved Fact Find updated successfully."
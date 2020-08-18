@Reg
Feature: Objective
	As an advisor
	I want to be told the sum of two numbers

@Smoke
@LoginEnableTaur
Scenario:  breadcrumb
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I click the "Objective" from left nav
	Then I can see the "Objectives" breadcrumb 

@LoginEnableTaur
Scenario: Check Objectives
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find"
And I exclude the partner
When I click the "Objective" from left nav
Then I see mandatory obectives as "Meeting History,Personal Details,Assets,Liabilities,Protection,Pensions,Income,Expenditure,Wills Provisions,Assessing Client Risk,Changes,Needs Summary,Cash Allocation,WILLS,Fingers and Toes,Estate"


@LoginEnableTaur
Scenario: Check Partner Objectives
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find"
And I select Include Partner and Update
When I click the "Objective" from left nav
Then I see mandatory obectives for client and partner as "Meeting History,Personal Details,Assets,Liabilities,Protection,Pensions,Income,Expenditure,Wills Provisions,Assessing Client Risk,Changes,Needs Summary,Cash Allocation,WILLS,Fingers and Toes,Estate"


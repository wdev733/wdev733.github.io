@ignore
@Reg
Feature: RiskProfile
As an end user 
I want to add and view Risk Profiles
So i can create the most appropriate factfinds for our clients

@Smoke
@LoginEnableTaur
Scenario: View Risk Profiles of a client
	Given I am on Clients search page
	And I select the "Ye, Miss Beini" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Risk Profile" from left nav
	Then I see the list of Risk profiles of that client

@LoginEnableTaur
Scenario: Start a new Risk Profile for a client
	Given I am on Clients search page
	And I select the "Ye, Miss Beini" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Risk Profile" from left nav
	And I choose to Start New Risk profile for that client
	And I fill in the options for all the listed questions
	When I save the Risk Questionnaire
	Then I can see the Risk Level as "7" in Risk Questionnaire tab
	And I can see the Risk Level as "7" in Risk Risk Report tab
	
@validation
@LoginEnableTaur
Scenario: Mandatory Validation for Risk Profile
	Given I am on Clients search page
	And I select the "Ye, Miss Beini" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Risk Profile" from left nav
	And I choose to Start New Risk profile for that client
	When I save the Risk Profile
	Then I can see the error message as "Error Please make sure that questions have been answered"

@Reg
Feature: AddNewClient
	As an advisor
	I want to add a new client to Enable
	So that i can produce a factfind for that client

@Ignore
@Smoke
@LoginEnableTaur
Scenario: Add new client V2
	Given I am on Add New Client page
	And I enter the following details
	| ClientType  | Member                   | Title | Consultant   | Forename | Surname | Team | CompanyName| PoliticalExposed |Vulnerable | Attorney |
	| Individual  | Creative Technologies Ltd| Ms.   | Training, CT | Bobson   | Barbera |      | XXXXXX     | No               |No         | No       |
	And I save the client
	And I see Contact details page for that client
    And I fill in all the required fields
	And I save the new client
	When I go back to Clients page
	Then I see the new client added to the list

@validation
@LoginEnableTaur
Scenario: Add new client mandatory validation
	Given I am on Add New Client page
	And I save the client
	And I can see the validation message as "Please enter a surname for this client"
	And I enter the surname
	And I remove the consultant value
	And I save the client
	And I can see the validation message as "Please choose the consultant for this client"
	And I select the consultant as "Training, CT"
	And I save the client
	And I can see the validation message as "Please choose whether this client is Politically Exposed"
	And I select the Political Exposed value as "No"
	And I save the client
	And I can see the validation message as "Please choose whether the client is Vulnerable"
	And I select the Vulnerable Client value as "No"
	And I save the client
	And I can see the validation message as "Please choose whether the client has Power of Attorney set up"
	And I select the Power of Attorney value as "No"
	And I remove the title value
	And I save the client
	And I can see the validation message as "Please select a title for the client"
	And I select the title value as "Mr."
	When I save the client
	Then I can the continue button

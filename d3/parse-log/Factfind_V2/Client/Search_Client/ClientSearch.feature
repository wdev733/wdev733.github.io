@Reg
Feature: ClientSearch
	As an advisor
	I want to search for a client
	So i can find clients quickly in Enable

@Smoke
Scenario: Select existing factfind V2
	Given I am logged in to Enable using automation.user and CPWSRD0@
	And I am on Clients search page
	#this will now need to search for Bobson too, just in case its not a recent hit 
	And I select the newly created client
	And I click on Fact Find button
	When I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I update
	Then I can see the message as "Saved Fact Find Updated"
	And I can see the left navigation menu in the order of "Fact Find,Objectives,Meeting History,Personal Details,Assets,Liabilities,Protection,Pensions,Income,Expenditure,Wills Provisions,Assessing Client Risk,Changes,Needs Summary,Cash Allocation,WILLS,Fingers and Toes,Estate"

@Smoke
Scenario Outline: Client search with attributes V2
	Given I am logged in to Enable using automation.user and CPWSRD0@
	And I am on Clients search page
	And I enter "<Surname>", "<Forename>" and "<Type>"
	And I select "<RI>" and "<AR>"
	When I search
	Then I can see the matched records with an attributes as <Surname>, <Forename>, <Type> and <AR>

Examples: 
| Surname | Forename | Type       | RI               | AR                        |
| Bobson  | Bob      | Individual | Simpson, Chris   | Creative Technologies Ltd |
| Bobson  |          | Individual |                  | Creative Technologies Ltd |

@validation
@LoginEnableTaur
Scenario: Mandatory Validation - Client Summary
	Given I am on Clients search page
	And I select the newly created client
	And I remove the title value
	And I save the client
	And I can see the validation message as "Please select a title for the client"
	And I enter title as "Mr."
	And I remove the surname
	And I save the client
	And I can see the validation message as "Please enter a surname for this client"
	And I enter the existing surname
	When I save the client

@validation
@LoginEnableTaur
Scenario: Data Integrity Validation - Client Summary
	Given I am on Clients search page
	And I select the newly created client
	And I enter the mobile no as "Invalid"
	And I save the client
	And I can see the validation message as "Mobile number is not in valid format. Please select a country from the dropdown list, then enter the rest of the number in the box without the initial zero"
	And I remove the mobile no
	And I enter the Primary Email as "Invalid"
	And I save the client
	And I can see the validation message as "Please ensure the email entered is valid"
	And I remove the Primary Email 
	And I enter the Other Email as "Invalid"
	When I save the client
	Then I can see the validation message as "Please ensure the other email entered is valid"

@validation
@LoginEnableTaur
Scenario: Mandatory Validation for Client Fact Find
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I remove the Date
	When I update
	Then I can see the error message as "Error The Date field is required."
	
@ignore
@validation
@LoginEnableTaur
Scenario: Mandatory Validation for Profile
	Given I am on Clients search page
	And I select the newly created client
    And I select the profile button
	And I remove the Reference value
	And I save profile
	And I can see the validation message as "Please enter a valid reference"
	And I enter the Reference value
	When I save profile
	Then I can see "Changes were successfully saved"
@Reg
Feature: Protections
As an end user
I want to manage Protection plans for a client
So i can assist in finding protection that suits them best  

@LoginEnableTaur
Scenario Outline: View existing protection plans
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "<factfind>" 
	When I click the "Protection" from left nav
	Then I see the clients protection plans
Examples:
| factfind                                       |
| Schroders Personal Wealth Individual Fact Find |

@Smoke
@LoginEnableTaur
Scenario Outline: Add a protection plan
	Given I am on Protections page
	And I choose to Add new plan 
	And I enter "<productType>","<providerName>","<reference>" and "<premium>"
	When I save the protection plan
	Then I can see "Saved Protection has been successfully saved."
Examples:
| productType | providerName	           | reference | premium | 
| Endowment   | Elderstreet Investment Ltd | CT9864    | 25000   |


@LoginEnableTaur
Scenario Outline: Add cover for a protection plan
	Given I am on Protections page
	And I choose to Add new plan 
	And I enter "<productType>","<providerName>","<reference>" and "<premium>"
	And I save the protection plan
	And I navigate to the Cover tab
    And I choose to add a new cover
	And I enter "<productType>","<providerName>","<reference>" and "<premium>"
	When I save the protection plan
	Then I can see "Saved Protection has been successfully saved."
Examples:
| productType | providerName	|reference|premium|
|Endowment| Elderstreet Investment Ltd|CT9864|25000|

@validation
@LoginEnableTaur
Scenario: Mandatory Validation for Protections
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Protection" from left nav
	And I choose to Add new plan 
	And I save the protection plan
	# Validation message is not proper for the Provider Name
	And I can see the error message as "Cannot Save The Premium field is required.; The Product Type field is required.; A value is required.; The Reference field is required."
	#   Data Format "<productType>","<providerName>","<reference>" and "<premium>"
	And I enter "Endowment","Elderstreet Investment","CI1234" and "20000"
	When I save the protection plan
	Then I can see "Saved Protection has been successfully saved."

@validation
@LoginEnableTaur
Scenario: Data Integrity Validation for Protections
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Protection" from left nav
	And I choose to Add new plan 
	#   Data Format "<productType>","<providerName>","<reference>" and "<premium>"
	And I enter "Endowment","Elderstreet Investment","CI1234" and "INVALID"
	When I save the protection plan
	And I can see the error message as "Cannot Save Please enter a valid premium amount."

	@LoginEnableTaur
Scenario Outline: Add cover details for protection plan 
	Given I am on Protections page
	And I choose to Add new plan 
	And I click on cover tab
	And I enter "<productType>","<providerName>","<reference>" and "<premium>"
	When I save the protection plan
	Then I can see "Saved Protection has been successfully saved."
Examples:
| productType | providerName	|reference|premium|
|Endowment| Elderstreet Investment Ltd|CT9864|25000|


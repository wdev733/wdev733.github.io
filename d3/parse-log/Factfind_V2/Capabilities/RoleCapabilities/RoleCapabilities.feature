@Reg
Feature: RoleCapabilities
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers
	
Scenario: Attempt switch network standard user
When I log in as a Standard User
Then I dont have the option to switch networks

Scenario: Access other users data
When I log in as a Standard User
Then I cannot see members link in leftnav

Scenario: Access FactFind
When I log in as a Standard User
And I select admin form leftnav
Then I dont see Facfind

Scenario: Attempt switch network Global Adminstrator
When I log in as a Global Administrator
Then I have the option to switch networks

@Smoke
Scenario: Admin access client of other user 
When I log in as a Global Administrator
And I search with newly created client
Then I can see the matched client in result section

@Smoke
Scenario: Standard use cannot access client of other user 
When I log in as a Standard User
And I search with newly created client
Then I dont see the matched client in result section
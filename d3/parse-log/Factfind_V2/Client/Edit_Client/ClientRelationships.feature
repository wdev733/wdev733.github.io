@Reg
Feature: ClientRelationships 
As an advisor
I want to see and affect client relationships
So i can manage clients connections

@Smoke
@LoginEnableTaur
Scenario: See client relationships V2
	Given I am on Clients search page
	And I select the newly created client
	When I select Relationships on the Client profile
	Then I see all the relationships linked to the current client 

@validation
@LoginEnableTaur
Scenario: Mandatory Validation for Relationship
	Given I am on Clients search page
	And I select the newly created client
	And I click on the Relationship button
	And I click on Add New
	And I click on Continue
	And I save the Relationship
	And I can see the validation message as "Please enter a surname"
	And I enter surname as "XYZ"
	And I save the Relationship
	And I can see the validation message as "Please select a relationship"
    And I select Relationship as "Brother"
  When I save the Relationship
  Then I can see the Relationship Summary Page

 @LoginEnableTaur 
Scenario: Client exclude-include partner
    Given I am on Clients search page
     And I select the newly created client
     And I click on Fact Find button
     And I select the factfind "Schroders Personal Wealth Individual Fact Find"
     And I select Include Partner and Update
     And I see "Saved Fact Find Updated"
     And Partner Included is Yes
	 And I exclude the partner
     And I see "Saved Fact Find Updated"
     Then Partner Included is No
	 

	

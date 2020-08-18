@Reg
Feature: LinkPartner
As an advisor
I want to add new and link existing clients to clients
So that I can manage client relationships for factfinds

@LoginEnableTaur
@ExistingClient
Scenario: Link new partner to client V2
	Given I am on Clients search page
	#And I select the "stephen, Mrs. Hurst" client
	And I select the existing client
	And I choose to Add a partner to the client
	And I choose New Person
	And I fill mandatory fields for the new person
	| ClientType | Member                    | Title | Consultant  | Forename |Surname|Team|CompanyName|PoliticalExposed|Vulnerable|Attorney|
	| Individual | Creative Technologies Ltd | Mrs.  |Training, CT | Hurst    |stephen|    |           |No              |No        |No      |
    When I save the partner
	Then I see a profile created for this new person
	And I see that our client is listed as a partner for this new person

@LoginEnableTaur
@ExistingPartner
Scenario: Link Existing partner to client V2
	Given I am on Clients search page
	And I select the existing client
	And I choose to Add a partner to the client
	And I choose an existing Person
	And I fill mandatory fields for the existing person
    When I save the partner
	Then I see that our client is listed as a partner for this new person

@ignore
@LoginEnableTaur
@ExistingPartner
Scenario: Client partner mandatory validation
	Given I am on Clients search page
	And I select the existing client
	And I choose to Add a partner to the client

@Reg
Feature: PersonalDetails
	As an advisor
	I want to manage client personal details
	So i can provide the most appropriate factfind possible
	
@LoginEnableTaur
Scenario Outline: Add Personal details of a client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	#And I exclude the partner
	And I select the existing "<factfind>" 
	And I click the "Personal Details" from left nav
	And I enter mandatory personal details
	And I save the personal details
	And I navigate to FactFind via breadcrumb
	And I select the existing "<factfind>" 
	When I click the "Personal Details" from left nav
	Then I see the personal details saved
Examples:
| factfind                                       |
 | Schroders Personal Wealth Individual Fact Find |

@Smoke
@Report
@LoginEnableTaur
Scenario: Edit Personal details of a client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I exclude the partner
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Personal Details" from left nav
	And I edit the following personal details 
	| Place of birth | UK Domiciled | UK resident for tax | State of Health | Smoker | Main occupation   | Employment Status | Employer/Business name | Time in current employment |
	| Sussex barn    | Yes          | Yes                 | Excellent       | No     | refuse consultant | Employed          | Best practice IFA      | 7 Months                   |
	And I save the personal details
	And I navigate to "Fact Find" via breadcrumb
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I click the "Personal Details" from left nav
	Then I see the personal details updated

@LoginEnableTaur
Scenario: Personal Details changes update Client Summary
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Personal Details" from left nav
	And I edit the following client summary specific details 
	| Address1        | Address2 | Address3 | Town   | County    | Postcode | Country        | Telephone | Mobile     |Email                          | Telephone Work | Fax      |
	| 383 Eldon House | Wanstead | Norfolk  | 627814 | Hampshire | 8765467  | United Kingdom | 364654677 | 7880664977 |a.b@creative-technologies.co.uk| 6465677        | 65656477 |
	And I save the personal details
	When I navigate to "Clients" via breadcrumb
	And I select the newly created client
	Then I see that field is updated in Client Summary

@LoginEnableTaur
Scenario: Client Summary changes update Personal Details
	Given I am on Clients search page
	And I select the newly created client
	And I edit the following client details 
	| Address1 | Address2 | Address3 | Town | County | Postcode   | Country | Telephone | Mobile|Email|Telephone Work|Fax|
	|383 Eldon House |     Wanstead   |   Norfolk    |    627814   | Hampshire     |8765467 | United Kingdom | 364654677| 7880664977|a.b@creative-technologies.co.uk|6465677|65656477|
	And I save the client details
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I click the "Personal Details" from left nav
    Then I see that field is updated in Personal Details 

	@LoginEnableTaur
Scenario: Personal details of a client and partner
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I exclude the partner
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Personal Details" from left nav
	And I enter the following personal details of client as 
	| Gender | Marital Status | Address1 | Address2 | Address3 | Town | County | Postcode | Country | Telephone | Date of Birth | Place of birth | UK Domiciled | UK resident for tax | State of Health | Smoker | Main occupation | Employment Status | Employer/Business name | Time in current employment |
	| Male   |Married|383 Eldon House |     Wanstead   |   Norfolk    |    627814   | Hampshire     |8765467 | United Kingdom | 364654677|8-august-1993| Sussex barn    | Yes          | Yes                 | Excellent       | No     | refuse consultant | Employed          | Best practice IFA      | 7 Months                   |
    And I enter the following personal details of partner as 
	| Gender | Marital Status | Address1 | Address2 | Address3 | Town | County | Postcode | Country | Telephone | Date of Birth | Place of birth | UK Domiciled | UK resident for tax | State of Health | Smoker | Main occupation | Employment Status | Employer/Business name | Time in current employment |
	| Male   |Married|383 Eldon House |     Wanstead   |   Norfolk    |    627814   | Hampshire     |8765467 | United Kingdom | 364654677|8-august-1993| Sussex barn    | Yes          | Yes                 | Excellent       | No     | refuse consultant | Employed          | Best practice IFA      | 7 Months                   |
    When I save the personal details
	Then I see the notification as "Saved Fact Find updated successfully."
	



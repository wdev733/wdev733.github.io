@Reg
Feature: Expenditure
	As an advisor
	I want to add client expenditure details to fact finds
	So i can provide more appropriate fact finds for customers

@Smoke
@ExpenditureCalculation
Scenario Outline: Client add new expenditure only
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Expenditure" from left nav
	And I state that i do have expenditure
	When I add the expenditure details "<custom_Expenditure>" for "<frequency>" of "<amount>" 
    And I calculate Expenditure
    Then I see the expenditure 
Examples: 
	| custom_Expenditure | frequency | amount   | Total_custom_expenditure |
	| Loans              | Per Month | 25       | £2784.00                 |
	| Other              | Per Year  | 500      | £946                     |

Scenario: Client and partner add Expenditure

@ExpenditureCalculation
Scenario Outline: Client and Partner add Expenditure
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I select Include Partner and Update
	And I click the "Expenditure" from left nav
	And I state that i do have expenditure
	And I see Your Partner and Joint expenditure columns
	When I add the "<Expenditure Source>" for "<ClientAmount>" over "<ClientPeriod>" and "<PartnerAmount>" over "<PartnerPeriod>" and "<JointAmount>" over "<JointPeriod>"
	And I calculate 
	Then I see all the expenditures 
Examples:
	| Expenditure Source | ClientAmount | ClientPeriod | PartnerAmount | PartnerPeriod | JointAmount | JointPeriod | Total Client Expenditure |Total Partner Expenditure | Total Joint Expenditure|   
	| Salary1            | 1200         | Per Year     | 500           | Per Year      | 7.00        | Per Month   | £1224                    | £500                     | £144                   |   

@ExpenditureCalculation   	 
Scenario:  Expenditure override total
Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Expenditure" from left nav
	And I state that i do have expenditure
	And I add Expenditure Source as "loan" for "200" as "Per Month" 
	And I calculate Expenditure
	And I see the expenditure
    When I over-write the total expenditure as "£25,000"
    And I Save
    Then the Total Expenditure is "£25,000.00"

@LoginEnableTaur
Scenario: Expenditure enable partner
    Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I select Include Partner
    And I click the "Expenditure" from left nav
    Then I see You, Your Partner and Joint expenditure coloums

@LoginEnableTaur
Scenario: Expenditure disable partner
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find" 
When I Exclude Partner and Update
And I click the "Expenditure" from left nav
Then I see You column only for expenditure





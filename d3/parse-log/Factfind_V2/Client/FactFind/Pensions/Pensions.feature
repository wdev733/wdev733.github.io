@Reg
Feature: Pensions
	As an advisor
	I want to view and add Pension plans for clients
	So i can provide clients with the most appropriate factfind possible

@Smoke
@LoginEnableTaur
Scenario Outline: View Pension plans of a client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "<factfind>" 
	And I click the "Pensions" from left nav
	When I choose the "<Do you have any other pension plans?>"  pension option
	Then I see all the Pension plans listed for that client
Examples:
 | factfind       | Do you have any other pension plans? |
 | Schroders Personal Wealth Individual Fact Find | yes					 			   |

@LoginEnableTaur
Scenario: Add an existing pension plan for a client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I click the "Pensions" from left nav
	And I choose to Add a Pension plan from the existing plans
	When I select a pension plan
	And I save the existing pension plan
	Then I can see "Saved Successfully saved."

@Smoke
@LoginEnableTaur
Scenario Outline: Add a new Pension plan for a client
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I click the "Pensions" from left nav
	And I choose to enter details for a pension not on the system
	And I enter pension details "<pensionType>" and "<life>"
	When I save the pension
	Then I can see "Saved Pension has been successfully saved."
Examples:
| pensionType	| life |
| Type_01		| Self |

@validation
@LoginEnableTaur
Scenario: Mandatory Field Validation
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I click the "Pensions" from left nav
	And I choose to enter details for a pension not on the system
	And I save the pension
	And I can see the error message as "Cannot Save The Life field is required.; The Type field is required."
	And I enter pension details "Type_02" and "Self"
	When I save the pension
	Then I can see "Saved Pension has been successfully saved."

@validation
@LoginEnableTaur
Scenario: Data Integrity Validation
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Pensions" from left nav
	And I choose to enter details for a pension not on the system
	And I enter pension details "Type_03" and "Self"
	And I enter the Personal Contribution value as "INVALID"
	And I save the pension
	And I can see the error message as "Cannot Save The value 'INVALID' is not valid for Personal Contribution."
	And I remove the Personal Contribution value
	And I enter the Company Contribution value as "INVALID"
	And I save the pension
	And I can see the error message as "Cannot Save The value 'INVALID' is not valid for Company Contribution."
	And I remove the Company Contribution value
	And I enter the value field as "INVALID"
	And I save the pension
	And I can see the error message as "Cannot Save The value 'INVALID' is not valid for Value."

	@LoginEnableTaur
Scenario Outline: Partner Pension Simplification
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I select Include Partner and Update
	And I click the "Pensions" from left nav
	When I fill the form for client as "<Transitional Protection Type>","<Lifetime Allowance Factor (%)>","<Notes>"
	And I fill the form for partner as "<Transitional Protection Type>","<Lifetime Allowance Factor (%)>","<Notes>"
	Then I Save and complete the pension simplification

	Examples: 
	| Transitional Protection Type | Lifetime Allowance Factor (%) | Notes          |
	| Individual Protection        | 25                            | simplification |


	@LoginEnableTaur
Scenario Outline: client Extra DB Info
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I exclude the partner
	And I click the "Pensions" from left nav
	And I click the Extra DB Info Tab
	When I fill the Extra DB Info form for client as "<Year joined scheme>","<Pensionable salary>","<Accrual rate>","<Additional years purchased >","<Additional lump sum>","<Widows death in service pension per annum>","<Dependent death in service pension per annum>","<Early retirement age>","<Early retirement penalty>","<HMRC current cash equivalent>","<Current transfer value>","<Beneficiaries>","<Notes>"
	Then I Save and complete the pension simplification

	Examples: 
	| Year joined scheme | Pensionable salary | Accrual rate | Additional years purchased | Additional lump sum | Widows death in service pension per annum | Dependent death in service pension per annum | Early retirement age | Early retirement penalty | HMRC current cash equivalent | Current transfer value | Beneficiaries | Notes |
	| 1977               | 50000              | 20           | 13                         | 45                  | 53                                        | 67                                           | 60                   | 500                      | 234                          | 97                     | brandon       | extra info|

	@LoginEnableTaur
Scenario Outline: partner Extra DB Info
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
	And I select Include Partner and Update
	And I click the "Pensions" from left nav
	And I click the Extra DB Info Tab
	When I fill the Extra DB Info form for client as "<Year joined scheme>","<Pensionable salary>","<Accrual rate>","<Additional years purchased >","<Additional lump sum>","<Widows death in service pension per annum>","<Dependent death in service pension per annum>","<Early retirement age>","<Early retirement penalty>","<HMRC current cash equivalent>","<Current transfer value>","<Beneficiaries>","<Notes>"
	And I fill the Extra DB Info form for partner as "<Year joined scheme>","<Pensionable salary>","<Accrual rate>","<Additional years purchased >","<Additional lump sum>","<Widows death in service pension per annum>","<Dependent death in service pension per annum>","<Early retirement age>","<Early retirement penalty>","<HMRC current cash equivalent>","<Current transfer value>","<Beneficiaries>","<Notes>"
	Then I Save and complete the pension simplification

	Examples: 
	| Year joined scheme |Pensionable salary| Accrual rate | Additional years purchased | Additional lump sum | Widows death in service pension per annum | Dependent death in service pension per annum | Early retirement age | Early retirement penalty | HMRC current cash equivalent | Current transfer value | Beneficiaries | Notes |
	| 1977               | 50000            | 20           | 13                         | 45                  | 53                                        | 67                                           | 60                   | 500                      | 234                          | 97                     | brandon       | extra info|




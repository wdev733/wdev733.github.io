@Reg
@income
Feature: Income
	As an advisor
	I want to view and add new income records
	So this can contribute to appropriate factfinds for clients

@IncomeCalculation
Scenario Outline: Add custom Income Single
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Income" from left nav
	And I State that i do have income
    When I add the income details "<custom_income_source>" for "<frequency>" of "<amount>" 
    And I calculate
	# Expected Values will be calculated with Fixed Income + new Income ,
    Then I see total income 

Examples: 
| custom_income_source | frequency | amount |
| loan interest 1      | Per Month | 25     |
| my fixed income      | Per Year  | 500    |

@Smoke
@IncomeCalculation
Scenario Outline: Client and Partner add Income
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find"
    And I select Include Partner and Update
	And I click the "Income" from left nav
	And I State that i do have income
	And I see Your Partner and Joint columns
	When I add "<Income Source>" for "<ClientAmount>" over "<ClientPeriod>" and "<PartnerAmount>" over "<PartnerPeriod>" and "<JointAmount>" over "<JointPeriod>"
	And I calculate   
	# Expected Values will be calculated with Fixed Income + new Income ,
	Then I see all the Total Gross Annual Income values
	Examples:
	| Income Source | ClientAmount | ClientPeriod | PartnerAmount | PartnerPeriod | JointAmount | JointPeriod |   
	| Salary1       | 1200    | Per Year     | 500      | Per Year      | 7        | Per Month   |       
	
	#| Bonus& Overtime  | 22,000.00    | Year         | 2000.00       | Year          | 25.00       | Month       | cal          |
	#| Benefits in kind | 3,000.00     | Year         | 145,000.00    | Month         | 75.00       | Year        | cal          |
	#| Rental Income    | 750.00       | Month        | 0.00          | Month         | 345.00      | Year        | cal          |
	#| State Pension    | 12.33        | Month        | 153,147.96    | Year          | 23.99       | Year        | cal          |
	#| Private Pensions | 138.99       | Month        | 154,815.84    | Year          | 120,000.00  | Year        | cal          |
	#| Savings Income   | 78.55        | Month        | 155,758.44    | Year          | 199.00      | Year        | cal          |
	#| Other Income     | 5.00         | Month        | 155,818.44    | Year          | 199.00      | Month       | cal          |

@IncomeCalculation
Scenario: Income Overwrite Total
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Income" from left nav
	And I State that i do have income
	And I add Income Source as "loan" for "200" as "Per Month" 
	And I calculate
	Then I see total income
	When I overwrite the total with "£25,000"
	And I save the  income
	Then the Total is "£25,000"

@IncomeCalculation
Scenario: Income remove custom row
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Income" from left nav
	And I State that i do have income
	And I add the income details "Loan Interest" for "Per Month" of "25" 
	And I see custom income row
	When I remove the custom income row
	Then the custom income row is removed
	#And the total is recalculated again

@LoginEnableTaur
Scenario: Income tick no income
    Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Income" from left nav
	And I State that i do not have income
	And dont see the income source table
    And I give some notes as "Income note"
	When I save the  income
	Then the income section gets tick in leftnav

@LoginEnableTaur
Scenario: Income breadcrumb
	Given I am on Clients search page
    And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I click the "Income" from left nav
   Then I can see the "Income" breadcrumb
	
@LoginEnableTaur
Scenario: Client change currency
	Given I am on Clients search page
	And I select the newly created client
	And I make his Currency "GBP"
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Income" from left nav
	And I State that i do have income
	And I add the income details "Loan Interest" for "Per Month" of "25"
	And I calculate
	And the income currency is "£"
	And I select client from breadcrumb
	And I make his Currency "EUR"
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Expenditure" from left nav
	And I add Expenditure Source as "loan" for "200" as "Per Month" 
	And I calculate Expenditure
	And I state that i do have expenditure
	And the expenditure currency is "€"
	And I select client from breadcrumb
	And I make his Currency "GBP"
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Liabilities" from left nav
	And I choose the "<Do you have any Liabilities>" option
	And I choose to a add new liability enter the details not on the system
	And I enter liability details "Test_Li","200" and "20"
	When I save the asset
	And I select liabilties from breadcrumb
	And the Liabilities currency is "£"
	
@LoginEnableTaur
Scenario: Income enable partner
    Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	When I select Include Partner
    And I click the "Income" from left nav
	And I State that i do have income
    Then I see You, Your Partner and Joint columns

@LoginEnableTaur
Scenario: Income disable partner
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find" 
When I Exclude Partner and Update
And I click the "Income" from left nav
And I State that i do have income
Then I see You column only


















@Reg
Feature: Estate
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Smoke
@LoginEnableTaur
Scenario Outline: Client Add Estate
    Given I am on Clients search page
    And I select the newly created client
    And I click on Fact Find button
    And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I exclude the partner
    And I click the "Estate" from left nav
    And I state that Estate Planning is a need as "Yes"
    And I fill all Estate form fields"<total_assets>","<liabilities>","<charity>","<IHT_liability>"
	And I Calculate net value of estate
    And Net Value of Estate is "<estate_net_value>" 
    When I Save the details
    Then I see the saved message as "Saved Fact Find updated successfully."

	Examples:
  | total_assets | liabilities | estate_net_value | charity | IHT_liability |
  | 55523       |32453      | 23070           | £67,567.00 | Yes           |

  @LoginEnableTaur
Scenario Outline: Client Partner Add Estate
    Given I am on Clients search page
    And I select the newly created client
    And I click on Fact Find button
    And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I select Include Partner and Update
    And I click the "Estate" from left nav
    And I state that Estate Planning is a need as "Yes"
    When I fill all Estate form fields"<total_assets>","<liabilities>","<charity>","<IHT_liability>"
    And I Save the details
    Then I see the saved message as "Saved Fact Find updated successfully."

	Examples:
  | total_assets | liabilities | charity    | IHT_liability |
  | £55523       | £32453      | £67,567.00 | Yes           |

  @LoginEnableTaur
Scenario Outline: Client Estate Net Value Calculation
    Given I am on Clients search page
    And I select the newly created client
    And I click on Fact Find button
    And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I exclude the partner
    And I click the "Estate" from left nav
    And I state that Estate Planning is a need as "Yes"
    When I fill Estate form fields including "<total_assets>","<liabilities>"
    And I Calculate net value of estate
   Then Net Value of Estate is "<estate_net_value>" 

  Examples:
  | total_assets | liabilities | estate_net_value |
  | 55523        | 32453       | 23070            |

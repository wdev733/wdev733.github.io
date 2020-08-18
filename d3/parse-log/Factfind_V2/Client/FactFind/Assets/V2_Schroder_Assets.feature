@ignore
@Schroder
@Reg
Feature: V2_Schroder_Assets
	As an advisor
	I want to see and add assets to a factfind
	So the factfind i create is well suited to the needs of our clients

@Smoke
@LoginEnableTaur
Scenario Outline: View client assets
	Given I am on Clients search page
	And I select the "<client>" client
	And I click on Fact Find button
	And I select the existing "<factfind>" 
	And I click the "Assets" from left nav
	When I choose the "<Do you have any assets>" option
    Then I see the assets listed for that client
Examples:
| client          | factfind       | Do you have any assets |
| Perkins, Mr. Timothy	 | Schroders Personal Wealth Individual Fact Find | yes                    |

@LoginEnableTaur
Scenario: Add existing asset to client
	Given I am on Clients search page
	And I select the "Perkins, Mr. Timothy" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to Add New Asset from the existing assets
	When I select an asset
	And I save the existing asset
	Then I can see "Saved Successfully saved."

@Smoke
@LoginEnableTaur
Scenario Outline: Add new Asset to client
	Given I am on Clients search page
	And I select the "Perkins, Mr. Timothy" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to a Add New Asset with new details
	And I enter asset details "<assetName>","<assetType>","<subClassification>","<knownValue>" and "<growthRate>"
	When I save the asset
	Then I can see "Saved Asset has been successfully saved."
Examples:
| assetName | assetType	| subClassification                          | knownValue | growthRate |
| Asset_01  | Property  | Residential Property - Investment Property | 5000       | 20         |

@validation
@LoginEnableTaur
Scenario: Add new asset mandatory validations
	Given I am on Clients search page
	And I select the "Perkins, Mr. Timothy" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to a Add New Asset with new details
	And I save the asset
	And I can see the error message as "Cannot Save The Description field is required.; The Last Known Value field is required.; The GrowthRateValueAsPercentage field is required."
	And I enter the asset Description
	And I enter the Last Known Value as "1000"
	And I enter the Growth Rate Value As Percentage value as "20"
	And I remove the whose name
	And I save the asset
	And I can see the error message as "Cannot Save The Whose Name field is required."
	And  I select the whose name as "Client"
	And I save the asset
	And I can see the error message as "Cannot Save The Type field is required.; The Sub Classification field is required."
	And  I select the Type as "Property"
	And I save the asset
	Then I can see "Saved Asset has been successfully saved."

@validation
@LoginEnableTaur
Scenario: Add new asset number validations
	Given I am on Clients search page
	And I select the "Perkins, Mr. Timothy" client
	And I click on Fact Find button
	And I select the existing "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to a Add New Asset with new details
	And I enter the asset Description
	And  I select the Type as "Property"
	And I enter the Last Known Value as "HUNDRED"
	And I save the asset
	And I can see the error message as "Cannot Save The Last Known Value field is not a valid number."
	And I enter the Last Known Value as "1000"
	And I enter the Growth Rate Value As Percentage value as "HUNDRED"
	And I save the asset
	And I can see the error message as "Cannot Save The Estimated Annual Revaluation % field is not a valid number."
	And I enter the Growth Rate Value As Percentage value as "200"
	And I enter the start purchase value as "HUNDRED"
	When I save the asset
	Then I can see the error message as "Cannot Save The Start/Purchase Value field is not a valid number."
	
 
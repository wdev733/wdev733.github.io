@Reg
Feature: AddAssets
	As an advisor
	I want to see and add assets to a factfind
	So the factfind i create is well suited to the needs of our clients

@ExistingAsset
Scenario Outline: Client add and remove existing asset
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "<factfind>" 
	And I click the "Assets" from left nav
	And I choose the "<Do you have any assets>" option
    And I see the assets listed for that client
	And I choose to delete an "<Asset>" from the list
	And I save the list
	And I choose to Add New Asset from the existing policies
	And I select an "<asset>"
	And I save 
	And I can see "Saved Successfully saved."
	And I navigate to "Asset" in breadcrumb
	When I choose the "<Do you have any assets>" option
    Then I see the asset added in the list

Examples:

| factfind                                       | Do you have any assets | Asset              |
| Schroders Personal Wealth Individual Fact Find | yes                    | Athora Ireland plc |


@Smoke
@LoginEnableTaur
Scenario Outline: Add new Asset to client
	Given I am on Clients search page
	#And I select the "Dali, Mr. Omar El" client
	And I select the newly created client
	And I click on Fact Find button
	#And I create client fact find "Schroders Personal Wealth Individual Fact Find"
	And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to add a new asset not on the system
	And I enter asset details "<assetName>","<assetType>","<subClassification>","<knownValue>" and "<growthRate>"
	When I save the asset
	Then I can see "Saved Asset has been successfully saved."
Examples:
| assetName | assetType	| subClassification                          | knownValue | growthRate |
| Asset_01  | Property  | Residential Property - Investment Property | 5000       | 20         |

@ExistingAsset
Scenario Outline: View client assets
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "<factfind>" 
	And I click the "Assets" from left nav
	When I choose the "<Do you have any assets>" option
    Then I see the assets listed for that client
Examples:
| factfind                                       | Do you have any assets  |
| Schroders Personal Wealth Individual Fact Find | yes                     |


@validation
@LoginEnableTaur
Scenario: Add new asset mandatory validations
	Given I am on Clients search page
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
    And I choose to add a new asset not on the system
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
	And I select the newly created client
	And I click on Fact Find button
	And I select the factfind "Schroders Personal Wealth Individual Fact Find" 
	And I click the "Assets" from left nav
	And I choose to add a new asset not on the system
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
 
@ignore
@Reg
Feature: Business
	As an End User
	I want to add a new business for a client
	So that I can add it to the client factfind
	
@Smoke
@LoginEnableTaur
Scenario Outline: New Business Add Liability
Given I am on Add New Business page
And I enter the client as "<Client>"
And I give "<Provider name>"
And I select"<Product Category>"
And I choose a "<Product Type>"
And I fill in Date signed as "03-05-2019"
And I fill in Expected Contribution as "Self","Regular","GBP","5000","Monthly"
When I hit on Save
Then I see a new business is created for that client

Examples:
| Client                | Provider name           | Product Category | Product Type |
| Bob Smith(ref 349342) |Aberdeen Asset managers  | Mortgage         | LOAN         |       

@LoginEnableTaur
Scenario Outline: New Business add Asset
Given I am on Add New Business page
And I enter the client as "<Client>"
And I give "<Provider name>"
And I select"<Product Category>"
And I choose a "<Product Type>"
And I fill in Date signed as "04-May-2019"
And I fill in Expected Contribution as "Self","Regular","GBP","5000","Monthly"
When I hit on Save
Then I see a new business is created for that client

Examples:
|  Client      | Provider name           | Product Category       | Product Type  |
| Real Madrid  | Aberdeen Asset managers | Savings and Investment | Cash Account  | 
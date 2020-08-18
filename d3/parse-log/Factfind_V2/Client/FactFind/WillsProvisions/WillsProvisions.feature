@Reg
Feature: WillsProvisions
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Smoke
@ignore
@LoginEnableTaur
Scenario Outline: Add Will and Inheritance
Given I am on Clients search page
And I select the newly created client
And I click on Fact Find button
And I select the existing "Schroders Personal Wealth Individual Fact Find"
And I select Include Partner and Update
And I click the "Wills Provisions " from left nav
And I hit Inheritances tab and fill for client as "<Received_Inheritance>","<Details>","<Notes>"
And partner as "<Received_Inheritance>","<Details>","<Notes>"
And I save Inheritances
And I hit Wills tab fill the client form as "<Have You Made A Will?>","<Type Of Will>","<Is the will still relevant?>","<SolicitorExecutor>","<Notes>"
And partner as  "<Have You Made A Will?>","<Type Of Will>","<Is the will still relevant?>","<SolicitorExecutor>","<Notes>"
When I save wills form
Then I see changes persisted as "<Notes>"


Examples:
| Received_Inheritance | Details        | Notes       | Have You Made A Will? | Type Of Will | Is the will still relevant? | SolicitorExecutor |
| Yes                  | receiveddetais | description | Yes                   | Single       |           Yes              |mr gates          | 
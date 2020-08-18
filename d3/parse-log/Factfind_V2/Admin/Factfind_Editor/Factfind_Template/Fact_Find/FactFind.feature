@Reg
Feature: FactFind
	As an advisor I want to create bespoke fact find templates
	So that I can capture my customers needs and objectives in fact finds of my design

@LoginEnableTaur
Scenario: New Fact Find Template Modal
	Given I am on the fact find admin page
	When I click on add new fact find
	Then the Fact Find entry modal dialog displays

@Smoke
@LoginEnableTaur
Scenario Outline: Add Fact Find Template
	Given I am on the fact find admin page
	When I add a new Fact Find with "<Title>", "<Description>" and "<Notes>"
	Then I see my new Fact Find in the Fact finds area
	Examples:
	| Title          | Description          | Notes              |
	| New Fact Find  | A nice new Fact Find | NewFactFindNotes   |

@LoginEnableTaur
Scenario: Add Cancel Fact Find Template
	Given I am on the fact find admin page
	And I click on add new fact find
	And I enter "Title", "Description" and "Notes" for the Fact Find
	When I cancel on the FactFind modal
	Then dont see the Fact Find entry modal

@LoginEnableTaur
Scenario: Edit Fact Find Template
	Given I am on the fact find admin page
	And I create a Fact Find modal with title "NewFactFind_00_Title", description "NewFactFind_00 Desc" and notes "NewFactFind_00 Notes"
	And I select the current Fact Find
	And I change the Fact Find title "Title Modified", description "Description updated" and notes "Notes updated"
	When I save the Fact Find
	Then I see the notification "Saved The fact find has been saved"

@validation
@LoginEnableTaur
Scenario: Mandatory Validation Fact Find Template
	Given I am on the fact find admin page
	And I click on New Fact Find button
	And I save the Fact Find
	And I can see "Title" with highlight
	And I can see "Description" with highlight
	And I can see "Notes" with highlight
	And I enter "NewFactFind_03", "NewFactFind_03_Desc" and "Notes" for the Fact Find
	When I save the Fact Find
	Then I can see the Objectives and Assignments section

@validation
@LoginEnableTaur
 Scenario: Mandatory Validation for Fact Find Objectives
	Given I am on the fact find admin page
	And I click on add new fact find
	And I enter "NewFactFind_04", "NewFactFind_04_Desc" and "Notes" for the Fact Find
	And I save the Fact Find
	And I save the objectives
	And I can see the highlight for Objective Field
	And I enter the objectives as "Asset"
	When I save the objectives
	Then I can see the saved objectives

@validation
@LoginEnableTaur
 Scenario: Mandatory Validation for Fact Find Assignments
	Given I am on the fact find admin page
	And I click on add new fact find
	And I enter "NewFactFind_05", "NewFactFind_05_Desc" and "Notes" for the Fact Find
	And I save the Fact Find
	And I save the Assignments
	And I can see the highlight for Client Type
	And I select the client type as "Pension"
	When I save the Assignments
	Then I can see the saved Assignments

@Smoke
@FactFind
Scenario: Add Mandatory Objective in Fact Find
	Given I am on the fact find admin page
    And I open an existing fact find record
	And I create a new objective with objective as "A new objective" and description as "An objective description"
	When I save the objectives
	Then I can see the mandatory objective as a new row

@FactFind
Scenario: Delete an Objective from Fact Find
	Given I am on the fact find admin page
    And I open an existing fact find record
	And I create a new objective with objective as "A new objective" and description as "An objective description"
	And I save the objectives
	And I can see the mandatory objective as a new row
	When I choose to delete the objective
	Then new objective is deleted
	
@FactFind
Scenario Outline: Add live Network and Member assignment in Fact find
	Given I am on the fact find admin page
    And I open an existing fact find record 
    And I create a new "<assign_type>" for "<assignee>" of "<client_type>" 
    And I opt to make it live 
    And I save assignments
    Then I see my new live "<assign_type>" Assignment created as a new row 
Examples: 
| assign_type | assignee                      | client_type | 
| Member      | Advisa Financial Services Ltd | Individual | 
| Network     | DMA                           | Trust      | 
| Network     | Quantum IMS                   | Pension    |

@FactFind
Scenario Outline: Edit Fact Find Objective
    Given I am on the fact find admin page
	And I open an existing fact find record
    And I create a new objective with objective as "Personal Details" and description as "Personal Details description"
    And I save the objective
    And I can see the mandatory objective as a new row
    When I choose to edit the objective
	And I change objective to "<Objective>" and description as "<Objective_Description>"
	And I save the objective
	Then I can see the objective as "<Objective>" and description as "<Objective_Description>"
Examples:
| Objective			| Objective_Description			|
|Personal Details1	|Personal Details description1	|


@FactFind
Scenario: Clear Fact Find Objective
	Given I am on the fact find admin page
	And I open an existing fact find record
	And I create a new objective with objective as "Objective" and description as "Objective description"
	And I clear the objective
	Then the objective input fields are cleared


@Reg
Feature: DynamicQuestion
	As an Advisor 
	I want to create bespoke questions for a Fact Find
	So that i can make Fact Find templates individual to my organisation

@LoginEnableTaur
Scenario Outline: Create a new Question Grouping
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an "<Owner>"
	And I choose to create a new group
	And I create a new question group with "<Title>" and "<Description>"
	When I save
	Then I can see "Saved Question grouping has been created"
Examples: 
| Owner | Title      | Description        |
| DMA   | DAM Orange | Orange Description |

@Smoke
@LoginEnableTaur
Scenario Outline:Add a new question of type Single answer in Questions editor with Internal source
	Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I create a new question "Single Answer" with "<Title>" and "<Text>"
	And I click on screen
	And I see "<Text>" in preview panel
	And I create Internal source options
	And I provide "<Pre>", "<Post>", and "<Help>" additional text fields
	When I save
	Then I can see "Question has been created."
Examples: 
| Title     | Text                     | Pre     | Post     | Help     |
| Question1 | What goes on this pizza? | PreText | PostText | HelpText |

@Smoke
@LoginEnableTaur
Scenario Outline: Add a question to an existing group
	Given I am in Dynamic Questions Editor page
	And I select an "<Owner>"
	And I choose to open an existing group "Zorlak"
	And I choose to add a question "Question1" into the group
	When I save
	Then I can see "Saved Question grouping has been updated."
Examples:
|   Owner   |
|   System  |

@ExistingQuestionGroup
Scenario: Delete a question from existing group
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I choose to remove a question in preview panel
	When I save
	Then I can see "Saved Question grouping has been updated"

@ExistingQuestionGroup
Scenario: Add a dependant question
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I see a preview of question in the group
	And I see Add dependant question icons next to the options
	When I click on the dependant question icon
	Then I should be able to add a dependant question

@LoginEnableTaur
Scenario Outline: Add a new question of type Multiple answer
	Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I create a new question "Multiple Answer" with "<Title>" and "<Text>"
	And I click on screen
	And I see it in preview panel
	And I create Internal source options
	And I give Input and validation
	And I provide "<Pre>", "<Post>", and "<Help>" additional text fields
	When I save
	Then I can see "Saved Question has been created."
Examples:
| Title     | Text    | Pre     | Post     | Help     |
| Question1 | Question1 | PreText | PostText | HelpText |


@LoginEnableTaur
Scenario Outline: Add a new question of type Text answer
	Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I create a new question "Text Answer" with "<Title>" and "<Text>"
	And I click on screen
	And I see it in question preview panel
	And I give Input and validation
	And I provide "<Pre>", "<Post>", and "<Help>" additional text fields
	When I save
	Then I can see "Saved Question has been created."
Examples:
| Title     | Text    | Pre     | Post     | Help     |
| Question2 | Question2 | PreText | PostText | HelpText |

@ExistingQuestionGroup
Scenario: Make a question mandatory in the existing group
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I choose to add a question "Question1" into the group
	And I choose to make an question mandatory in preview panel
	When I save 
	Then I can see "Saved Question grouping has been updated"

@ExistingQuestionGroup
Scenario: Make a question optional in the existing group
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I choose to add a question "Question1" into the group
	And I choose to make a mandatory question to optional in preview panel
	When I save 
	Then I can see "Saved Question grouping has been updated"

@ignore
@ExistingQuestionGroup
Scenario: Show Prompt Message When Clicking on Add button without selecting a question
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I do not select a question
	When  I click on Add question
	Then I can see "Please select a quesstion"

@ExistingQuestionGroup
Scenario: Open an existing question
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	Then I see all the fields of the question

@ignore
@ExistingQuestionGroup
Scenario: Rearrange the order of questions in the existing question
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I choose to add a question "Question1" into the group
	And I choose to add a question "Question2" into the group
	#Need to check
	And I choose to drag the questions in preview panel
	When I save 
	Then I can see "Saved Question grouping has been updated"

@ExistingQuestionGroupAndQuestion
Scenario: Question groupings field in question editor
	Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I select an existing Owner and Grouping
	And I choose to add a question into the group
	And I see question added to preview panel
	And I save
	And I navigate to "Questions" tab
	When I open the question
	Then I see the group name in question grouping field

@LoginEnableTaur
Scenario Outline:Additional Text Fields in question editor
Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I create a new question "Single Answer" with "<Title>" and "<Text>"
	And I click on screen
	And I see "<Text>" in preview panel
	And I create Internal source options
	And I provide "<Pre>", "<Post>", and "<Help>" additional text fields
	When I save
	Then I see "<Pre>" before the options
	And I see "<Post>" after the options
	And I see "<Help>" adjacent to the question text
Examples: 
| Title     | Text                     | Pre     | Post     | Help     |
| Question1 | What goes on this pizza? | PreText | PostText | HelpText |

@ExistingQuestion
Scenario: Change Font Format to Bold in Additional Text Fields
    Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I open an existing question
	When I choose the text in the additional text fields to be bold
	Then I see the text change to bold in the preview

@ExistingQuestion
Scenario: Change Font Format to Italics in Additional Text Fields
    Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I open an existing question
	When I choose the text in the additional text fields to be Italic
	Then I see the text change to Italic in the preview

@ExistingQuestion
Scenario: Change Font Format to Headling in Additional Text Fields
    Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I open an existing question
	When I choose the text in the additional text fields to be a Heading
	Then I see the text change to a Heading in the preview

@validation
@LoginEnableTaur
Scenario: Dynamic Question Group - Mandatory Validaton 
    Given I am in Dynamic Questions Editor page
	And I am on "Groupings" tab
	And I choose to create a new group
	And I remove the question group title
	And I save
	And I can see the error message as "The Title field is required."
	And I enter the question group title as "Group_02"
	When I save
	Then I can see "Saved Question grouping has been created."

@validation
@LoginEnableTaur
Scenario: Dynamic Question - Mandatory Validaton 
    Given I am in Dynamic Questions Editor page
	And I am on "Questions" tab
	And I create a question "Single Answer"
	And I save
	And I can see the error message as " Option Text is required.; Option Value is required.; The Text field is required.; The Title field is required."
	And I create a new question with title as "Question_02" and text as "What goes on this pizza?"
	And I create Internal source options
	When I save
	Then I can see "Saved Question has been created."
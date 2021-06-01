Feature: Alerts

    Scenario Outline: Alerts screen validation
        Given I login to application
        When I navigate to menu RESOURCES
        And I click on link "White papers"
        Then I assert heading is "White papers"

        @MOCK
        Examples:
            | userName |
            | test     |
        @login
        Examples:
            | userName  |
            | Test      |

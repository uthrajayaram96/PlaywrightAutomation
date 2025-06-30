Feature: Login Fail Validation whn incorrect credentials are provided for eCommerce website 2
    @Validation
    Scenario Outline: Verify login fails when using incorrect credentials
        Given the user uses incorrect username "<username>" and password "<password>" to login
        Then verify an error message is displayed

        Examples:
            | username           | password     |
            | rahulshetty        | learning1    |
            | rahulshettyacademy | learning1234 |
            | rahulshetty        | learning     |

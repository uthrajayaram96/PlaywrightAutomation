Feature: E2E Testing for an eCommerce Website
    @Regression
    Scenario: Placing an Order
        Given a user logins to the application with "test_123@email.com" and "Password#1" credentials
        When the user searches and adds "ZARA COAT 3" to the cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When the user enters the payment details to place an Order
        Then verify order present in the OrderHistory page

    @Validation
    Scenario: Login Success
        Given user logins to appliaction using correct credentials "rahulshettyacademy" and "learning"
        Then verify successful login
const {Given, When,Then} = require("@cucumber/cucumber");
const {LoginPage} = require('../../pageobjects/LoginPage');
const {DashboardPage} = require('../../pageobjects/DashboardPage');
const {MyCartPage} = require('../../pageobjects/MyCartPage');
const {CheckoutPage} = require('../../pageobjects/CheckoutPage');
const {ThankYouOrderPage} = require('../../pageobjects/ThankYouOrderPage');
const {OrdersHistoryPage} = require('../../pageobjects/OrdersHistoryPage');
const {OrderSummaryPage} = require('../../pageobjects/OrderSummaryPage');
const {expect} = require('@playwright/test');
const paymentDetails = {
                            loginEmail: "test_123@email.com" ,                       
                            cvv: "566",
                            nameOnCard: "Test User",
                            country: " Qatar"
                        };
// if you think a step takes a lot of time to execute, override the default timeout
Given('a user logins to the application with {string} and {string} credentials', {timeout:100*1000},async function (loginEmail, password) {
    
   
    const loginPage = new LoginPage(this.page);
    await loginPage.goToURL();
    await loginPage.validLogin(loginEmail,password);
    // Validate the landing page after login
    await loginPage.validateTitle();
});

When('the user searches and adds {string} to the cart', async function (searchProductName) {
    //Search for product and add to card
    this.dashboardPage = new DashboardPage(this.page);
    await this.dashboardPage.searchProduct(searchProductName);
        
    // validate product added to card
    //await dashboardPage.validateProductAddedToCartMessage();
        
    // click on add to cart - check if the button / attribute routerlink contains a word cart in it
    await this.dashboardPage.navigateToCartPage();
});

  

Then('verify {string} is displayed in the cart', async function (searchProductName) {
    const mycartPage = new MyCartPage(this.page);
    // validate the added product's name matches
    await mycartPage.validateAddedProduct(searchProductName);
    //cleck on checkout
    await mycartPage.navigateToCheckoutPage();
});

  
 When('the user enters the payment details to place an Order', async function () {
          
    const checkoutPage = new CheckoutPage(this.page);
    // enter payment details
    await checkoutPage.enterPaymentDetails(paymentDetails.country,paymentDetails.cvv,paymentDetails.nameOnCard);
    //validate email label, should be same as login email
    await checkoutPage.validateLoginEmail(paymentDetails.loginEmail);
    //Click on Place Order button
    await checkoutPage.placeOrder();
});

   

Then('verify order present in the OrderHistory page', async function () {
           
    const thankYouOrderPage = new ThankYouOrderPage(this.page);
    // validate the landing page - order success
    await thankYouOrderPage.validateOrderSuccessMessage();
    //get the orderId
    const orderId = await thankYouOrderPage.getOrderId();
    console.log(orderId);

    // click on 'Orders' button
    await this.dashboardPage.navigateToOrdersHistoryPage();

    const ordersHistoryPage = new OrdersHistoryPage(this.page);
    //wait till the table loads
    await ordersHistoryPage.loadOrdersTable();
    await ordersHistoryPage.searchForOrder(orderId);

    // validate the order summary and order id is visible
    
    const orderSummaryPage = new OrderSummaryPage(this.page);
    await orderSummaryPage.confirmOrderId(orderId);
});


Given('the user uses incorrect username {string} and password {string} to login', async function (usname, password) {
    const username = this.page.locator('#username');
    const signInBtn = this.page.locator('input#signInBtn');
        
    
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    
    // signing in
    await username.fill(usname);
    await this.page.locator('input[name="password"]').fill(password);
        
    await signInBtn.click();
       
});

  

Then('verify an error message is displayed', async function () {
    // grabbing the text
    console.log(await this.page.locator('div[style*="block"]').textContent());
       
    // to validate the test
    await expect(this.page.locator('div[style*="block"]')).toContainText('Incorrect username/password.');       
});

Given('user logins to appliaction using correct credentials {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    // signing in
    await this.page.locator('#username').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('input#terms').click();
    await this.page.locator('input#signInBtn').click();

    
});

 
Then('verify successful login', async function () {
    // validate the landing page
    const pageTitle = 'ProtoCommerce';
    //console.log(pageTitle);

    await expect(this.page).toHaveTitle(pageTitle);
    console.log(await this.page.title());
});
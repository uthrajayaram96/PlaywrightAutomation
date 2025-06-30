// Page Object Model

const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {MyCartPage} = require('../pageobjects/MyCartPage');
const {CheckoutPage} = require('../pageobjects/CheckoutPage');
const {ThankYouOrderPage} = require('../pageobjects/ThankYouOrderPage');
const {OrdersHistoryPage} = require('../pageobjects/OrdersHistoryPage');
const {OrderSummaryPage} = require('../pageobjects/OrderSummaryPage');
const dataSet = JSON.parse(JSON.stringify(require("../utils/E2ETestPOTestData.json")));

//test.describe.configure({mode:'parallel'});
test('@UI E2E Test case - POM Login - For one data', async ({page})=>{
  
    //Login
    // create object of the login page
    const loginPage = new LoginPage(page);
    await loginPage.goToURL();
    await loginPage.validLogin(dataSet[1].loginEmail,dataSet[1].password);
    // Validate the landing page after login
    await loginPage.validateTitle();

    //Search for product and add to card
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProduct(dataSet[1].searchProductName);
    
    // validate product added to card
    //await dashboardPage.validateProductAddedToCartMessage();
    
    // click on add to cart - check if the button / attribute routerlink contains a word cart in it
    await dashboardPage.navigateToCartPage();
    const mycartPage = new MyCartPage(page);
    // validate the added product's name matches
    await mycartPage.validateAddedProduct(dataSet[1].searchProductName);
    //cleck on checkout
    await mycartPage.navigateToCheckoutPage();

    const checkoutPage = new CheckoutPage(page);
    // enter payment details
    await checkoutPage.enterPaymentDetails(dataSet[1].country,dataSet[1].cvv,dataSet[1].nameOnCard);
    //validate email label, should be same as login email
    await checkoutPage.validateLoginEmail(dataSet[1].loginEmail);
    //Click on Place Order button
    await checkoutPage.placeOrder();

    const thankYouOrderPage = new ThankYouOrderPage(page);
    // validate the landing page - order success
    await thankYouOrderPage.validateOrderSuccessMessage();
    //get the orderId
    const orderId = await thankYouOrderPage.getOrderId();
    console.log(orderId);

    // click on 'Orders' button
    await dashboardPage.navigateToOrdersHistoryPage();

    const ordersHistoryPage = new OrdersHistoryPage(page);
    //wait till the table loads
    await ordersHistoryPage.loadOrdersTable();
    await ordersHistoryPage.searchForOrder(orderId);

    // validate the order summary and order id is visible
    
    const orderSummaryPage = new OrderSummaryPage(page);
    await orderSummaryPage.confirmOrderId(orderId);
    
});

for(const data of dataSet){

    test(`E2E Test case - POM Login for ${data.searchProductName}`, async ({page})=>{
    
        //Login
        // create object of the login page
        const loginPage = new LoginPage(page);
        await loginPage.goToURL();
        await loginPage.validLogin(data.loginEmail,data.password);
        // Validate the landing page after login
        await loginPage.validateTitle();

        //Search for product and add to card
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.searchProduct(data.searchProductName);
        
        // validate product added to card
        //await dashboardPage.validateProductAddedToCartMessage();
        
        // click on add to cart - check if the button / attribute routerlink contains a word cart in it
        await dashboardPage.navigateToCartPage();
        const mycartPage = new MyCartPage(page);
        // validate the added product's name matches
        await mycartPage.validateAddedProduct(data.searchProductName);
        //cleck on checkout
        await mycartPage.navigateToCheckoutPage();

        const checkoutPage = new CheckoutPage(page);
        // enter payment details
        await checkoutPage.enterPaymentDetails(data.country,data.cvv,data.nameOnCard);
        //validate email label, should be same as login email
        await checkoutPage.validateLoginEmail(data.loginEmail);
        //Click on Place Order button
        await checkoutPage.placeOrder();

        const thankYouOrderPage = new ThankYouOrderPage(page);
        // validate the landing page - order success
        await thankYouOrderPage.validateOrderSuccessMessage();
        //get the orderId
        const orderId = await thankYouOrderPage.getOrderId();
        console.log(orderId);

        // click on 'Orders' button
        await dashboardPage.navigateToOrdersHistoryPage();

        const ordersHistoryPage = new OrdersHistoryPage(page);
        //wait till the table loads
        await ordersHistoryPage.loadOrdersTable();
        await ordersHistoryPage.searchForOrder(orderId);

        // validate the order summary and order id is visible
        
        const orderSummaryPage = new OrderSummaryPage(page);
        await orderSummaryPage.confirmOrderId(orderId);
        
    });
}


customtest.only('E2E Test case - POM Login - For one data using fixtures', async ({page,testDataForOrder})=>{
  
    //Login
    // create object of the login page
    const loginPage = new LoginPage(page);
    await loginPage.goToURL();
    await loginPage.validLogin(testDataForOrder.loginEmail,testDataForOrder.password);
    // Validate the landing page after login
    await loginPage.validateTitle();

    //Search for product and add to card
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProduct(testDataForOrder.searchProductName);
    
    // validate product added to card
    //await dashboardPage.validateProductAddedToCartMessage();
    
    // click on add to cart - check if the button / attribute routerlink contains a word cart in it
    await dashboardPage.navigateToCartPage();
    const mycartPage = new MyCartPage(page);
    // validate the added product's name matches
    await mycartPage.validateAddedProduct(testDataForOrder.searchProductName);
    //cleck on checkout
    await mycartPage.navigateToCheckoutPage();

    const checkoutPage = new CheckoutPage(page);
    // enter payment details
    await checkoutPage.enterPaymentDetails(testDataForOrder.country,testDataForOrder.cvv,testDataForOrder.nameOnCard);
    //validate email label, should be same as login email
    await checkoutPage.validateLoginEmail(testDataForOrder.loginEmail);
    //Click on Place Order button
    await checkoutPage.placeOrder();

});
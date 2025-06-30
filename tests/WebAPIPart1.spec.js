const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail: "testuser12uj@gmail.com", userPassword: "Learning#124"};
// you can get the orderid from clicking on the view button - from the url
const orderPayload = {orders:[{country: "United States", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
let response;

test.beforeAll(async()=>{
    // creating a new context
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload); 
    
});

test('@API Verify orderID from Order History after placing an order successfully', async ({page})=>{

    // instead we inject the session token when logged in
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    // before it took it to login page, now it will bypass and take you directly to dashboard page
    await page.goto("https://rahulshettyacademy.com/client");

   
    // click on 'Orders' button
    await page.locator("button[routerlink*='myorders']").click();

    //wait till the table loads
    await page.locator("table.table tbody").waitFor();

    const tableRows = page.locator("table.table tbody tr");
    const countOrders = await tableRows.count();
    for(let i =0;i<countOrders;i++){
        const order = await tableRows.nth(i).locator("th").textContent();
        if(order===response.orderId){
           await tableRows.nth(i).locator("button").first().click();
           break;
        }
    }

    // validate the order summary and order id is visible
    
    const confirmOrderId = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(confirmOrderId)).toBeTruthy();
});
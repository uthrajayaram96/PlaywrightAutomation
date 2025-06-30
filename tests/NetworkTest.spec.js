// Intercepting the network by faking the response body(sending fake data)

const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail: "testuser12uj@gmail.com", userPassword: "Learning#124"};
// you can get the orderid from clicking on the view button - from the url
const orderPayload = {orders:[{country: "United States", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakePayload = { data: [], message: "No Orders" };


let response;

test.beforeAll(async()=>{
    // creating a new context
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload); 
    
});

test('Verify message displayed when no order is present', async ({page})=>{

    // instead we inject the session token when logged in
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

     await page.goto("https://rahulshettyacademy.com/client");

    /*
      intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
      Need to call/ inject the fake data before we click the order's tab, as the network should be ready
    */
   // Routing provides the capability to modify network requests that are made by a page. When we receive the URL, we have to
   // route it the way we want - https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/681a832bfd2af1c99e128846
   // we can replace the account id by *, as it can run for login details/account
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>{
    // this is where we intercept the response
    const response = await page.request.fetch(route.request());
    //convert js object to json
    let body = JSON.stringify(fakePayload);
    route.fulfill({response,body});
   });

    // before it took it to login page, now it will bypass and take you directly to dashboard page
    await page.goto("https://rahulshettyacademy.com/client");

   
    // click on 'Orders' button
    await page.locator("button[routerlink*='myorders']").click();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    await expect(page.locator('.mt-4')).toContainText("No Orders to show");



    
});
const {test,expect} = require('@playwright/test');

test('Intercept request url', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill('testuser12uj@gmail.com');
    await page.locator('input#userPassword').fill('Learning#124');
    await page.locator('input#login').click();

    await page.locator("button[routerlink*='myorders']").click();

    // intercept the request url, to get details of another account details[another account's order detail] by clicking on view button [We can see all the user detail]
    // Order details or id from - test_123email.com account [order id- 683dc9c781a20695305a9df0]
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=683dc9c781a20695305a9df0'}));

    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.getByText('You are not authorize to view this order')).toHaveText("You are not authorize to view this order");
});
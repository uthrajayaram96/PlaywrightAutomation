const {test, expect} = require('@playwright/test');
const { execPath } = require('process');

test.only('E2E - Other way Test case', async ({page})=>{
    // Locators
    const searchProductName = 'Adidas Original';
    const country = " India";
    const loginEmail = "testuser12uj@gmail.com";
    //Login
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(loginEmail);
    await page.getByPlaceholder('enter your passsword').fill('Learning#124');
    await page.getByRole("button",{name:'Login'}).click();
    // Validate the landing page after login
    await expect(page).toHaveTitle("Let's Shop");

    //Search for product and add to card
    await page.waitForLoadState('networkidle');
    // select the product
    await page.locator('div.card-body').filter({hasText:searchProductName.toUpperCase()}).getByRole("button",{name:'Add to Cart'}).click();
    // validate product added to card
    await expect(page.getByRole('alert',{name:'Product Added To Cart'})).toBeVisible();

    // click on add to cart - check if the button / attribute routerlink contains a word cart in it
    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
    // in the case we are going directly to expect, and use an action that does not have auto wait - then wait till all elements are loaded
    // await page.locator('div li').first().waitFor();
    const addedProduct = await page.locator(".cart h3").textContent();
    console.log(addedProduct);
    // validate the added product's name matches
    await expect(page.getByText(searchProductName.toUpperCase())).toContainText(searchProductName.toUpperCase());

    //cleck on checkout
    await page.getByRole("button",{name:'Checkout'}).click();

    // enter payment details
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:'India'}).nth(1).click();
    

    //validate email label, should be same as login email
    await expect(page.locator(".user__name label")).toHaveText(loginEmail);

    // cvv
    await page.locator("input[class='input txt']").nth(0).fill("566");
    //name
    await page.locator("input[class='input txt']").nth(1).fill("Test UserUJ");
    //Click on Place Order button
    await page.getByText("PLACE ORDER").click();

    // validate the landing page - order success
    await expect(page.getByText("Thankyou for the order. ")).toBeVisible();

    //get the orderId
    const orderId = (await page.locator("label.ng-star-inserted").textContent()).trim().split(" ")[1];
    console.log(orderId);

    // click on 'Orders' button
    await page.locator("button[routerlink*='myorders']").click();

    //wait till the table loads
    await page.locator("table.table tbody").waitFor();

    const tableRows = page.locator("table.table tbody tr");
    const countOrders = await tableRows.count();
    for(let i =0;i<countOrders;i++){
        const order = await tableRows.nth(i).locator("th").textContent();
        if(order===orderId){
           await tableRows.nth(i).locator("button").first().click();
           break;
        }
    }

    // validate the order summary and order id is visible
    
    const confirmOrderId = await page.locator(".col-text").textContent();
    await expect(orderId.includes(confirmOrderId)).toBeTruthy();

    
});
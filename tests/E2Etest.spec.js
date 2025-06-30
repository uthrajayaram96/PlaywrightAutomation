const {test, expect} = require('@playwright/test');


test('@UI E2E Test case', async ({page})=>{
    // Locators
    const products = page.locator('div.card-body');
    const searchProductName = 'Adidas Original';
    const country = " India";
    const loginEmail = "testuser12uj@gmail.com";
    //Login
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(loginEmail);
    await page.locator('input#userPassword').fill('Learning#124');
    await page.locator('input#login').click();
    // Validate the landing page after login
    await expect(page).toHaveTitle("Let's Shop");

    //Search for product and add to card
    await page.waitForLoadState('networkidle');
    // COUNT() IS NOT AUTO WAIT, hence added wait for load state, till we get all the products displayed
    const count = await products.count();
    console.log(count);
    for(let i =0; i<count;i++){
        // this gets you the title from the parent locator '.card-body'
        //console.log(await products.nth(i).locator("b").textContent());
        if((await products.nth(i).locator("b").textContent()).toLowerCase() === searchProductName.toLowerCase()){
            //click on add to cart button for that product
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    // validate product added to card
    //await expect(page.getByRole('alert',{name:'Product Added To Cart'})).toBeVisible();

    // click on add to cart - check if the button / attribute routerlink contains a word cart in it
    await page.locator("button[routerlink*='cart']").click();
    // in the case we are going directly to expect, and use an action that does not have auto wait - then wait till all elements are loaded
    // await page.locator('div li').first().waitFor();
    const addedProduct = await page.locator(".cart h3").textContent();
    console.log(addedProduct);
    // validate the added product's name matches
    await expect(page.locator(".cart h3")).toContainText(searchProductName.toUpperCase());

    //cleck on checkout
    await page.locator('text=Checkout').click();

    // enter payment details
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    const options = page.locator('.ta-results');
    //wait till options are loaded
    await options.waitFor();

    const countResults = await options.locator('button').count();
    console.log(countResults);

    for(let i =0; i<countResults;i++){
        if(await options.locator('button').nth(i).textContent() === country){
            await options.locator('button').nth(i).click();
            break;
        }
    }

    //validate email label, should be same as login email
    await expect(page.locator(".user__name label")).toHaveText(loginEmail);

    // cvv
    await page.locator("input[class='input txt']").nth(0).fill("566");
    //name
    await page.locator("input[class='input txt']").nth(1).fill("Test UserUJ");
    //Click on Place Order button
    await page.locator(".action__submit").click();

    // validate the landing page - order success
    await expect(page.locator("text= Thankyou for the order. ")).toContainText(" Thankyou for the order. ");

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
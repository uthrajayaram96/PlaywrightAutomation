const {test, expect} = require('@playwright/test');

test.only('Other Locators Test case', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("test123");
    await page.getByRole("button",{name:'Submit'}).click();
    console.log(await page.getByText(" The Form has been submitted successfully!.").isVisible());

    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
    await page.locator("li.nav-item a.btn").click();


});
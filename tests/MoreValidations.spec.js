const {test,expect} = require('@playwright/test');

test("Full and Partial screenshots",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.screenshot({path:'sc1.png',fullPage: true });

    await page.locator('#show-textbox').click();
    await page.getByPlaceholder('Hide/Show Example').screenshot({path:'partial_sc2.png'});
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();

});
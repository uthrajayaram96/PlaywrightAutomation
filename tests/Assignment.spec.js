const {test, expect} = require('@playwright/test');
// make sure to change the username and passwords, when running
//testcase 1 - Register
test('Registration Test', async ({page})=>{


    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.locator('a.btn1').click();

    
    await page.locator('input#firstName').fill('Test');
    await page.locator('input#lastName').fill('UserUJ');
    await page.getByPlaceholder('email@example.com').fill('testuser12uj@gmail.com');
    await page.locator('input#userMobile').fill('2589458736');
    await page.locator('input#userPassword').fill('Learning#124');
    await page.locator('input#confirmPassword').fill('Learning#124');
    await page.locator('input[type="checkbox"]').click();
    await page.locator('input[value="Register"]').click();
    
    // validate
    const successRegisterText = page.locator('.login-section-wrapper h1');
    await expect(successRegisterText).toContainText('Account Created Successfully');
    console.log(await successRegisterText.textContent());

});

//testcase 2 - Login

test.only('Login Test', async ({page})=>{
    const cardTitles = page.locator('div.card-body b');
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.getByPlaceholder('email@example.com').fill('testuser12uj@gmail.com');
    await page.locator('input#userPassword').fill('Learning#124');
    await page.locator('input#login').click();

    //console.log(await cardTitles.nth(0).textContent());
    // putting a smart wait/dynamic wait - till the network is Idle instead of hard wait
    // But using 'networkidle', can be flaky or discouraged(check documentation) - in case no internet for 500ms
    //await page.waitForLoadState('networkidle');

    // another way - waiting till the first element is displayed
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

});
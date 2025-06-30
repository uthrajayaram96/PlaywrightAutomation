const {test, expect} = require('@playwright/test');

// testcase 1 - in case we need to provide the context of the browser, like cookies etc
// login testcase
test('Browser Context Test', async ({browser})=>{
    //creating browser instance
    const context = await browser.newContext();

    // creating a new page in the browser
    const page = await context.newPage();

    // navigating to the url in the page/tab
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // signing in
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('input[name="password"]').fill('learning');
    await page.locator('input#terms').click();
    await page.locator('input#signInBtn').click();

    // validate the landing page
    const pageTitle = 'ProtoCommerce';
    //console.log(pageTitle);

    await expect(page).toHaveTitle(pageTitle);
    console.log(await page.title());



});
//testcase 2 - check for error message in case on in correct username
test('Login Fail error message and relogin with correct credentials Test', async ({page})=>{

    // locators
    // no need to await when storing the value in a variable
    const username = page.locator('#username');
    const signInBtn = page.locator('input#signInBtn');
    const cardTitles = page.locator('.card-title a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // signing in
    await username.fill('rahulshetty');
    await page.locator('input[name="password"]').fill('learning');
    
    await signInBtn.click();
    // grabbing the text
    console.log(await page.locator('div[style*="block"]').textContent());
   
    // to validate the test
    await expect(page.locator('div[style*="block"]')).toContainText('Incorrect username/password.');

    // clear the username field and enter correct username
    await username.clear();
    await username.fill("rahulshettyacademy");

    await page.locator('input#terms').click();
    //signin again
    await signInBtn.click();

    // from parent we are reaching the child
    // this returns 4 element, so can use first() or nth()
    console.log(await cardTitles.nth(0).textContent());

    // getting all the textcontent of all the elements
    // this may fail, if line number 65 wasn't there as 'allTextContents()' doesn't have auto wait capacity. so we have sync issue
    // because of line 65, where it waits till the elements are present, line 70 works as we have the elements alredy present
    console.log(await cardTitles.allTextContents());


});

// testcase 3 - in case we use the default context of the browser - like incognito
// this allows only one test to run - skips the testcase 1
//test.only('Page Context Test', async ({page})=>{
test.only('Page Context Test', async ({page})=>{
    
    // navigating to the url in the page/tab
    await page.goto("https://www.google.com/");

    // get the title of the page
    const titlePage = await page.title();
    console.log(titlePage);

    // validate and wait till the title if found
    await expect(page).toHaveTitle("wrongtitle");
});

// testcase 4 - select drop down - <select> tag
test('Test Select drop down options', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const docLnk = page.getByText('Free Access to InterviewQues/ResumeAssistance/Material');
    // checking if document link text is blinking
    await expect(docLnk).toHaveAttribute('class','blinkingText');

    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('input[name="password"]').fill('learning');

    // selecting the radio button - User option
    await page.locator('.customradio').last().click();
    // assert the radio button selection
    await expect(page.locator('.customradio').last()).toBeChecked();
    console.log(await page.locator('.customradio').last().isChecked());

    await page.locator('#okayBtn').click();

    // selecting option
    await page.locator('select.form-control').selectOption('teach');
   
    //Checkif the checkbox unselected - assert it
    // toBeFalsy() is non retrying assertion, so no need await, but isChecked() has autowait, hence we put await there
    //expect(await page.locator('input#terms').isChecked()).toBeFalsy();
    await page.locator('input#terms').click();
    // uncheck checkbox
    //await page.locator('input#terms').uncheck();
    await expect(page.locator('input#terms')).toBeChecked();

    await page.locator('input#signInBtn').click();

    // validate the landing page
    const pageTitle = 'ProtoCommerce';
    

    await expect(page).toHaveTitle(pageTitle);
    console.log(await page.title());

    //await page.pause();
});

// testcase 5 - Child windows/ tabs 
test('Test Child Window Handle', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const docLnk = page.getByText('Free Access to InterviewQues/ResumeAssistance/Material');
    const username = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // execute the detecting the new tab open and clicking on the link at the same time
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            docLnk.click(),

        ]);

    // In new window
    //get the text
    const text = await newPage.locator('.red').textContent();
    console.log(text);

    // get the domain portion or 'rahulshettyacademy' of the email from the text
    const usNameText = text.split('@')[1].split('.')[0];
    console.log(usNameText);
    
    newPage.close();
    // enter in the username field in the parent window
    await username.fill(usNameText);
    //await page.pause();


});
const {test,expect} = require('@playwright/test');

test("Handling Alerts",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    page.on('dialog',async dialog=>{
        console.log(dialog.message());
        await dialog.accept()
    });
    await page.locator("#alertbtn").click();
    await page.locator("#confirmbtn").click();

});

test("Handling Mouse Events",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.locator("#mousehover").hover();
    // wait till content is displayed
    //await page.locator(".mouse-hover-content").waitFor();
    await  page.locator(".mouse-hover-content a").filter({hasText:'Top'}).click();
    console.log(await  page.locator(".mouse-hover-content a").allTextContents());
});

test.only("Handling Frames",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    //switch to frame- either by locators like class or id, or frame objects like name attribute or url
    const frp = page.frameLocator("#courses-iframe");

    await frp.locator("li a[href*='lifetime-access']:visible").click();

    const text = await frp.locator(".content-side .text h2").textContent();
    console.log(text);
    console.log(text.split(" ")[1]);

    
});
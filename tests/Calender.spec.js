const {test,expect} = require('@playwright/test');

test("Calender validations",async({page})=>{

    const month = '6';
    const date = '15';
    const year = '2025';

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    // to navigate to year section
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months button").nth(+(month)-1).click();
    await page.locator("button.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)").filter({hasText:date}).click();

    
    //console.log(await page.locator(".react-date-picker__inputGroup input").nth(1).getAttribute('value') );
    //console.log(await page.locator(".react-date-picker__inputGroup input").nth(2).getAttribute('value') );
    //console.log(await page.locator(".react-date-picker__inputGroup input").nth(3).getAttribute('value') );
    await expect(page.locator(".react-date-picker__inputGroup input").nth(1)).toHaveAttribute('value',month);
    await expect(page.locator(".react-date-picker__inputGroup input").nth(2)).toHaveAttribute('value',date);
    await expect(page.locator(".react-date-picker__inputGroup input").nth(3)).toHaveAttribute('value',year);
    


});
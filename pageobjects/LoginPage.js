const {expect} = require('@playwright/test');

class LoginPage{
    constructor(page){
        this.page = page;

        // locators
        this.loginEmail = this.page.getByPlaceholder('email@example.com');
        this.password = this.page.locator('input#userPassword');
        this.loginBtn = this.page.locator('input#login');

    }

    async goToURL(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(loginEmail,password){
        await this.loginEmail.fill(loginEmail);
        await this.password.fill(password);
        await this.loginBtn.click();
        //wait for load state, till we get all the products displayed
        await this.page.waitForLoadState('networkidle');
    }

    async validateTitle(){
        await expect(this.page).toHaveTitle("Let's Shop");
    }
}

// export the file
module.exports = {LoginPage};
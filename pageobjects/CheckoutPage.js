const {expect} = require('@playwright/test');

class CheckoutPage{
    constructor(page){
        this.country = page.getByPlaceholder("Select Country");
        this.countryOptions = page.locator('.ta-results');
        this.loginEmail = page.locator(".user__name label");
        this.cvv = page.locator("input[class='input txt']").nth(0);
        this.name = page.locator("input[class='input txt']").nth(1);
        this.placeOrderBtn = page.locator(".action__submit");
    }

    async enterPaymentDetails(country,cvv,nameOnCard){
        await this.country.pressSequentially(country.trim().slice(0,3));
        //wait till options are loaded
        await this.countryOptions.waitFor();

        const countResults = await this.countryOptions.locator('button').count();
        console.log(countResults);

        for(let i =0; i<countResults;i++){
            if(await this.countryOptions.locator('button').nth(i).textContent() === country){
                await this.countryOptions.locator('button').nth(i).click();
                break;
            }
        }
        // cvv
        await this.cvv.fill(cvv);
        //name
        await this.name.fill(nameOnCard);
    }

    async validateLoginEmail(loginEmail){
        await expect(this.loginEmail).toHaveText(loginEmail);
    }

    async placeOrder(){
        await this.placeOrderBtn.click();
    }
}

module.exports = {CheckoutPage};
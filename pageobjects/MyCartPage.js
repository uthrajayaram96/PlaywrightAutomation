const {expect} = require('@playwright/test');

class MyCartPage{
    constructor(page){
        this.addedProduct = page.locator(".cart h3");
        this.checkoutBtn = page.locator('text=Checkout');
    }

    async validateAddedProduct(searchProductName){
        const addedPdt = await this.addedProduct.filter({hasText:searchProductName.toUpperCase()}).textContent();
        console.log(addedPdt);
        expect(addedPdt).toBe(searchProductName.toUpperCase());
    }

    async navigateToCheckoutPage(){
        await this.checkoutBtn.click();
    }
}

module.exports = {MyCartPage};
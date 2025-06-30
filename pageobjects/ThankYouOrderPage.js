const {expect} = require('@playwright/test');

class ThankYouOrderPage{

    constructor(page){
        this.orderSuccessMessage = page.locator("text= Thankyou for the order. ");
        this.orderId = page.locator("label.ng-star-inserted");
    }

    async validateOrderSuccessMessage(){
        await expect(this.orderSuccessMessage).toContainText(" Thankyou for the order. ");
    }

    async getOrderId(){
        const orderId = (await this.orderId.textContent()).trim().split(" ")[1];
        return orderId;
    }
    
}

module.exports = {ThankYouOrderPage};
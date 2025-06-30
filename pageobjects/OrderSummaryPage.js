const {expect} = require('@playwright/test');

class OrderSummaryPage{

    constructor(page){
        this.orderId = page.locator(".col-text");
    }

    async confirmOrderId(orderId){
        const confirmOrderId = await this.orderId.textContent();
        expect(orderId.includes(confirmOrderId)).toBeTruthy();
    }
    

}
module.exports = {OrderSummaryPage};
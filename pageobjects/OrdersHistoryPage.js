const {expect} = require('@playwright/test');

class OrdersHistoryPage{
    constructor(page){
        this.ordersTable = page.locator("table.table tbody");
        this.ordersTableRows = page.locator("table.table tbody tr");
    }

    async loadOrdersTable(){
        await this.ordersTable.waitFor();
    }

    async searchForOrder(orderId){
        const countOrders = await this.ordersTableRows.count();
        for(let i =0;i<countOrders;i++){
            const order = await this.ordersTableRows.nth(i).locator("th").textContent();
            if(order===orderId){
            await this.ordersTableRows.nth(i).locator("button").first().click();
            break;
            }
        }
    }
}
module.exports = {OrdersHistoryPage};
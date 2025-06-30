const {expect} = require('@playwright/test');

class DashboardPage{
    constructor(page){
        this.products = page.locator('div.card-body');
        this.cartBtn = page.locator("button[routerlink*='cart']");
        this.productAddedMessage = page.getByRole('alert',{name:'Product Added To Cart'});
        this.ordersBtn = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(searchProductName){
        const count = await this.products.count();
        console.log(count);
        for(let i =0; i<count;i++){
            // this gets you the title from the parent locator '.card-body'
            //console.log(await products.nth(i).locator("b").textContent());
            if((await this.products.nth(i).locator("b").textContent()).toLowerCase() === searchProductName.toLowerCase()){
                //click on add to cart button for that product
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCartPage(){
        await this.cartBtn.click();
    }

    async validateProductAddedToCartMessage(){
        await expect(this.productAddedMessage).toBeVisible();
    }

    async navigateToOrdersHistoryPage(){
        await this.ordersBtn.click();
    }

}
module.exports = {DashboardPage};
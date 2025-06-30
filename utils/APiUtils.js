class APiUtils{
    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getLoginToken(){
        // make a POST api call
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayload});

        // get the response payload/ json data
        const loginResponseJson = await loginResponse.json();
        const token =  loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        const response = {};
        response.token = await this.getLoginToken();
        // Placing order
           const orderResponse =  await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data:orderPayload,
                headers:{
                    'Authorization':response.token,
                    'Content-type':'application/json'
                },
            });
            
           
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            response.orderId = orderResponseJson.orders[0];
            return response;
    }
}
module.exports = {APiUtils};
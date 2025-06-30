const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder:{
        loginEmail: "testuser12uj@gmail.com",
        password: "Learning#124",
        searchProductName: "Adidas Original",
        cvv: "566",
        nameOnCard: "Test UserUJ",
        country: " India"
    }
})
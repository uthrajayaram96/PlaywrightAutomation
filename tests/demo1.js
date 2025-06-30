"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message = "Hello";
//message = 2;
var age = 5;
var arr = [1, 2, 3];
var isVal = true;
var message1 = "This type can take any value and we can reassign later";
console.log(message1);
message1 = 2;
console.log(message1);
// function
function add(a, b) {
    return a + b;
}
console.log(add(3, 4));
// objects
var user = { name: "Bob", age: 30 };
// will throw compilation error but since we execute as .js, will have no issue
user.location = "nyc";
//class
var LoginPage = /** @class */ (function () {
    function LoginPage(page) {
        this.page = page;
        // locators
        this.loginEmail = this.page.getByPlaceholder('email@example.com');
        this.password = this.page.locator('input#userPassword');
        this.loginBtn = this.page.locator('input#login');
    }
    return LoginPage;
}());

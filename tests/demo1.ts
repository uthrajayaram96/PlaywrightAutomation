import { type Page, type Locator } from "@playwright/test";

let message:string = "Hello";
//message = 2;

let age:number = 5;
let arr:number[] = [1,2,3];
let isVal:boolean = true;

let message1:any = "This type can take any value and we can reassign later";
console.log(message1);
message1 = 2;
console.log(message1);

// function
function add(a:number, b:number):number{
    return a+b;
}

console.log(add(3,4));

// objects
let user:{name:string,age:number} = {name:"Bob",age:30};
// will throw compilation error but since we execute as .js, will have no issue
//user.location="nyc";

//class
class LoginPage{
    //define the types
    page:Page;
    loginEmail : Locator;
    password : Locator;
    loginBtn : Locator;
    constructor(page){
        this.page = page;
        // locators
        this.loginEmail = this.page.getByPlaceholder('email@example.com');
        this.password = this.page.locator('input#userPassword');
        this.loginBtn = this.page.locator('input#login');

    }
}
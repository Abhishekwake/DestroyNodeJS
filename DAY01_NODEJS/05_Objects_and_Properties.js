// Problem 3: Objects and Properties

// You're creating an online store. Define a JavaScript object named "product" with the following
// properties:- name (string)- price (number)- inStock (boolean)
// Create at least three products using your object template and display their details using
// console.log
const product1 = {
    name : "Mouse",
    price : 400,
    inStock : true,
}
const product2 = {
    name : "Keyboard",
    price : 1000,
    inStock : false,
}
const product3 = {
    name : "Monitor",
    price : 9000,
    inStock : true,
}

//mistake you did this 
// console.log("PRODUCT 1 :",product1.name,product1.price,product1.inStock);
// console.log("PRODUCT 2 :",product2.name,product2.price,product2.inStock);
// console.log("PRODUCT 3 :",product3.name,product3.price,product3.inStock);
//want to do this

console.log(product1);
console.log(product2);
console.log(product3);
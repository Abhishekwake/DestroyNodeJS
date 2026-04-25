// Problem 5: JSON Parsing and Object Conversion
// a) Given a JSON data string: {"product": "Laptop", "price": 999.99}, explain how you would
// parse it into a JavaScript object.
const productJSON = `{
"product": "Laptop",
"price" : 999.00
}`
console.log(productJSON);

// parsing the product json into a javasript object

const productOBJ = JSON.parse(productJSON);
console.log(productOBJ);

console.log("------------------------------")

// b) You have an object: { "name": "Bob", "age": 30 }. How would you convert it into a JSON data
// string?

const Person = {
    name : "Abhishek",
    age : 22
}
console.log(Person);

//converting the person obj into JSON data string

const PersonJSON = JSON.stringify(Person);
console.log(PersonJSON);
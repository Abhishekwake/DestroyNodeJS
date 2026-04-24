// Problem 1: Create a variable city = "Delhi" and print it.
let city = "PUNE";
console.log(city);

// Problem 2: Create an array of 5 fruits. Print the 3rd fruit
let fruits = ["Apple","Banana","Grapes","Orange","guavas","papaya"]
console.log(fruits[3]);

// Problem 3: Create an object student with name, rollNo, and marks. Print the rollNo.
const student = {
    name : "Abhishek",
    rollNo : 37,
    marks : "62%",
    skills : ["java","react","nodejs","mongoDB"]
}
console.log(student.skills[2]); //nodejs 
console.log(student.marks);

// Problem 4: Write an if/else statement that prints "Eligible" if age > 18, else "Not Eligible".
let age = 25;
if(age>18){
    console.log("your eligible for marriage");
}else{
    console.log("you are not eligible")
}

// Problem 5: Take a user's name as input using prompt-sync and print "Hello, [name]!".
const prompt = require('prompt-sync')();
const userName = prompt("Enter You Username");
console.log("Hello ",userName);

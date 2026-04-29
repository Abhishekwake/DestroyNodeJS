// Problem 3: Callback Functions
// Create a function named performOperation that takes two numbers and a callback
// function as parameters. The callback function should determine the operation to be performed
// (addition, subtraction, multiplication, or division) on the two numbers. Call the
// performOperation function with different numbers and callback functions for each
// mathematical operation
function performOperation(num1,num2,operationCallback){
    return operationCallback(num1,num2);    
}
console.log(performOperation(10,20,add));
console.log(performOperation(10,20,sub));  
console.log(performOperation(10,20,mul));
console.log(performOperation(100,20,div));

    function add(a,b){
        return a+b;
   }
   function mul(a,b){
        return a*b;
   }
   function div(a,b){
        return a/b;
   }
   function sub(a,b){
        return a-b;
   }

// Simple Explanation - Step by Step
// Imagine you're at a restaurant 🍕

// The Big Picture
// performOperation is like a waiter who takes your order (two numbers) and sends it to the kitchen (callback function). The kitchen decides HOW to cook it.

// How It Executes (Step by Step)
// Let's trace the first line:

// javascript
// console.log(performOperation(10, 20, add));
// Step 1: Function Call
// You call performOperation with:

// num1 = 10

// num2 = 20

// operationCallback = add (you're sending the add function as an argument)

// Step 2: Inside performOperation
// javascript
// function performOperation(num1, num2, operationCallback){
//     return operationCallback(num1, num2);    
// }
// This becomes:

// javascript
// return add(10, 20);  // operationCallback gets replaced with add function
// Step 3: Inside add function
// javascript
// function add(a, b){
//     return a + b;  // 10 + 20 = 30
// }
// Step 4: Return to console.log
// javascript
// console.log(30);  // Prints 30
// Visual Flow
// text
// performOperation(10, 20, add)
//          ↓
//     [Waiter takes order]
//          ↓
//     Calls add(10, 20)
//          ↓
//     [Kitchen adds 10+20]
//          ↓
//     Returns 30
//          ↓
//     console.log prints 30
// Same Process for All Operations
// Subtraction:

// javascript
// performOperation(10, 20, sub)
// → sub(10, 20)  
// → 10 - 20 = -10
// → console.log(-10)
// Multiplication:

// javascript
// performOperation(10, 20, mul)
// → mul(10, 20)  
// → 10 * 20 = 200
// → console.log(200)
// Division:

// javascript
// performOperation(100, 20, div)
// → div(100, 20)  
// → 100 / 20 = 5
// → console.log(5)
// Analogy: Food Ordering 🍔
// Role	In Code	Example
// You	console.log	"I want result of 10+20"
// Waiter	performOperation	Takes your numbers and the "recipe"
// Kitchen	add, sub, etc.	Does the actual math
// Food	Return value	The result (30, -10, etc.)
// Key Insight
// Callback functions = Passing a function as an argument to another function

// javascript
// // add function is passed as an "instruction"
// performOperation(10, 20, add)  // "Add these numbers"

// // sub function is passed as a different "instruction"  
// performOperation(10, 20, sub)  // "Subtract these numbers"
// Why is this useful?
// This pattern allows performOperation to be flexible - it doesn't need to know HOW to add/subtract/etc. It just executes whatever operation you give it!

// Think of it like a calculator where you can swap out the math operation without changing the main calculator code. 🔄
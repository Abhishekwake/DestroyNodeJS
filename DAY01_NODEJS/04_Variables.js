// Problem 2: Variables (var and const)

// Create a JavaScript program to calculate the area of a rectangle. Ask the user for the length
// and width of the rectangle and store them in variables. Calculate and display the area using
// the formula: `area = length * width`
const prompt = require("prompt-sync")();
const length = parseFloat(prompt("Enter the length"));
const width = parseFloat( prompt("Enter the length"));
const area = length*width;
console.log("Area of rectangle is : ",area);


// <script>
// document.getElementById("demo").innerHTML =
// parseFloat(10) + "<br>" +
// parseFloat("10") + "<br>" +
// parseFloat("10.33") + "<br>" +
// parseFloat("34 45 66") + "<br>" +
// parseFloat("He was 40");
// </script>

// parseFloat() parses a string and returns the first number:

// 10
// 10
// 10.33
// 34
// NaN
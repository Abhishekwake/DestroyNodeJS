const _ = require('lodash'); //_ convention to use
let data = [1,3,4,,5,6,6,7,7,3];
const unique = _.unique(data);
console.log(unique);


// 7. Lodash (The Most Useful Utility Library)
// What is Lodash? A powerful library with hundreds of ready-made functions 
// to manipulate arrays, objects, strings, numbers.

// 7.1 Install Lodash
// npm install lodash
// 7.2 Using Lodash
// const _ = require('lodash');  // Convention: use underscore

// // Example 1: Get unique values from an array
// let data = [1, 2, 2, 3, 3, 3, 4];
// let uniqueData = _.uniq(data);
// console.log(uniqueData);  // Output: [1, 2, 3, 4]

// // Example 2: Check if a value is a string
// console.log(_.isString("Prince"));  // Output: true
// console.log(_.isString(123));       // Output: false
// 7.3 Why use Lodash?
// Saves you from writing complex logic manually.
// Well-tested, optimized, and reliable.
// Most developers use it, so learning it is a best practice.
// Note: The _ (underscore) is just a naming convention. You can use any variable name, but _ is standard and expect
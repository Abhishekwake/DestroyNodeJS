// Problem 6: 'lodash' Usage
// Use the lodash library to solve the following problem: Given an array of numbers, write a
// function that returns the sum of all even numbers in the array. Use the _.sumBy function from
// lodash to achieve this.
const _ = require('lodash');
const arr = [1,2,3,4,5,6,7,8];
function sumOfEvenNumbers(numbers){
    const evenNumbers = _.filter(numbers,num=> num%2 ===0);
    return _.sumBy(evenNumbers);
}
console.log(sumOfEvenNumbers(arr));

// ## Simple Explanation - Finding Sum of Even Numbers

// This program finds all even numbers in an array and adds them together using Lodash library.

// ### Step-by-Step Execution

// Let's trace what happens when you run this:

// ```javascript
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(sumOfEvenNumbers(numbers));
// ```

// #### Step 1: Function receives the array
// ```javascript
// function sumOfEvenNumbers(numbers) {
// // numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// ```

// #### Step 2: Filter even numbers using Lodash
// ```javascript
// const evenNumbers = _.filter(numbers, num => num % 2 === 0);
// ```

// **What happens inside `_.filter`:**
// - It checks each number in the array
// - `num % 2 === 0` means "divide by 2, if remainder is 0, it's even"

// | Number | num % 2 | Even? | Kept? |
// |--------|---------|-------|-------|
// | 1 | 1 | No | ❌ |
// | 2 | 0 | Yes | ✅ |
// | 3 | 1 | No | ❌ |
// | 4 | 0 | Yes | ✅ |
// | 5 | 1 | No | ❌ |
// | 6 | 0 | Yes | ✅ |
// | 7 | 1 | No | ❌ |
// | 8 | 0 | Yes | ✅ |
// | 9 | 1 | No | ❌ |
// | 10 | 0 | Yes | ✅ |

// **Result:** `evenNumbers = [2, 4, 6, 8, 10]`

// #### Step 3: Sum all even numbers
// ```javascript
// return _.sumBy(evenNumbers);
// ```

// `_.sumBy` adds all numbers in the array:
// ```
// 2 + 4 + 6 + 8 + 10 = 30
// ```

// #### Step 4: Return and print
// ```javascript
// console.log(30); // Output: 30
// ```

// ### Visual Flow

// ```
// [1,2,3,4,5,6,7,8,9,10]
//          ↓
//     _.filter (keep evens)
//          ↓
//     [2,4,6,8,10]
//          ↓
//     _.sumBy (add them)
//          ↓
//         30
// ```

// ### What Each Lodash Method Does

// **`_.filter(array, condition)`** - Keeps only items that pass the test
// ```javascript
// _.filter([1,2,3,4], num => num % 2 === 0)
// // Returns: [2,4]
// ```

// **`_.sumBy(array)`** - Adds all numbers in array
// ```javascript
// _.sumBy([2,4,6,8,10])
// // Returns: 30
// ```

// ### Without Lodash (Pure JavaScript)

// The same thing without Lodash:

// ```javascript
// function sumOfEvenNumbers(numbers) {
//     // Filter even numbers
//     const evenNumbers = numbers.filter(num => num % 2 === 0);
    
//     // Sum them using reduce
//     return evenNumbers.reduce((sum, num) => sum + num, 0);
// }

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(sumOfEvenNumbers(numbers)); // 30
// ```

// ### Even Simpler - One Line Solution

// ```javascript
// const sumOfEvenNumbers = (numbers) => 
//     numbers.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0);
// ```

// ### Key Concepts

// | Concept | Explanation |
// |---------|-------------|
// | **`%` (Modulo)** | Gives remainder after division. `4 % 2 = 0` (even), `5 % 2 = 1` (odd) |
// | **`_.filter`** | Creates new array with items that pass the test |
// | **`_.sumBy`** | Adds all numbers in an array |
// | **Arrow function** | `num => num % 2 === 0` is short for `function(num) { return num % 2 === 0; }` |

// ### Real World Analogy 🍎

// Imagine you have a basket of fruits:
// 1. You want only **apples** (filter)
// 2. Then you want to count **total apples** (sum)

// That's exactly what this code does with numbers - first filters for even numbers, then adds them up!
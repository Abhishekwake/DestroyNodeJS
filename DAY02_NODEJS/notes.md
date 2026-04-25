Here are the **structured, end-to-end notes** from the second lecture. You can study these without watching the video again.

---

# Node.js Lecture 2: Core Concepts (NPM, Callbacks, Modules, Lodash)

## 1. What is NPM? (The "Cloth Shop" Analogy)

**NPM = Node Package Manager**

- **What it is:** A giant online database (library) where you can find thousands of ready-made packages.
- **Analogy:** Think of NPM as a big **cloth shop (mall)** .
    - You need different clothes for different occasions (wedding, college, festival).
    - Similarly, you need different packages for different tasks (Express for server, Lodash for data).

### 1.1 Initializing a Project (`npm init`)

When you start any Node.js project, you must initialize it.

**Command:**
```bash
npm init
```

**What it does:**
- Asks you questions (package name, version, description, author, etc.).
- Creates a **`package.json`** file.

### 1.2 `package.json` vs `package-lock.json`

| File | What it does | Real-life Analogy |
| :--- | :--- | :--- |
| **`package.json`** | Stores **metadata** about your project (name, author, list of dependencies like "Express"). | Your **shopping list** (what you *want* to buy). |
| **`package-lock.json`** | Stores **exact versions** of every package and sub-package installed. Ensures every developer uses the exact same version. | The **bill/receipt** from the mall (detailed info: price, size, exact item). |

### 1.3 Installing a Package (`npm install`)

**Command:**
```bash
npm install express
# or shorthand
npm i express
```

**What happens:**
1. NPM downloads the package from the online registry.
2. It places the package inside a folder called **`node_modules`** .
3. It adds the package name and version to `package.json` (dependencies).
4. It locks the exact version in `package-lock.json`.

---

## 2. Running JavaScript Files (Review)

**Command to run a JS file:**
```bash
node server.js
```

### 2.1 Nodemon (Auto-restart server)

**Problem:** Every time you change code, you have to stop and restart the server manually (`Ctrl + C`, then `node server.js` again).

**Solution:** Use **Nodemon**. It watches your files and automatically restarts the server when changes are detected.

**Install Nodemon:**
```bash
npm install nodemon
```

**Run with Nodemon:**
```bash
nodemon server.js
```

**Benefit:** Saves time during development.

---

## 3. Functions in JavaScript (4 Ways to Write)

### Method 1: Normal Function Declaration
```javascript
function add(a, b) {
    return a + b;
}
```

### Method 2: Function Expression (Assign to variable)
```javascript
const add = function(a, b) {
    return a + b;
};
```

### Method 3: Arrow Function (Modern & Short)
```javascript
const add = (a, b) => {
    return a + b;
};
```

### Method 4: Arrow Function (Implicit return - Shortest)
```javascript
const add = (a, b) => a + b;
```

**Important Rule:** If you see a variable name followed by **`( )`** (parentheses), it means that variable is a **function** being called.
- `add` → variable
- `add(5, 3)` → function call

---

## 4. Callback Functions (Most Important Concept)

### 4.1 Definition
> A **callback function** is a normal function that is passed as an argument to another function, and it gets executed **after** the main function's work is finished.

### 4.2 Real-life Analogy (Mom & Son)
1. Mom says: "Son, eat your food, **then** go buy vegetables."
2. "Eating food" = Main function.
3. "Buy vegetables" = Callback function (runs only after eating is done).

### 4.3 Technical Example

```javascript
// Main function that accepts a callback
function add(a, b, callback) {
    const result = a + b;
    console.log("Result is: " + result);
    callback();  // Execute the callback after work is done
}

// Callback function
function done() {
    console.log("Addition completed successfully!");
}

// Using the callback
add(5, 3, done);
```

**Output:**
```
Result is: 8
Addition completed successfully!
```

### 4.4 Using Inline Callback (No separate function name)
```javascript
add(5, 3, function() {
    console.log("Addition completed!");
});
```

### 4.5 Using Arrow Function as Callback (Shortest)
```javascript
add(5, 3, () => console.log("Done!"));
```

**Key Takeaway:** The name "callback" is just a convention. You can name it anything (e.g., `prince`, `xyz`). What matters is that it's a function that runs **after** the main task.

---

## 5. Core Node.js Modules (Built-in)

You don't need to install these via NPM. They come with Node.js.

### 5.1 OS Module (Operating System info)

```javascript
const os = require('os');

const user = os.userInfo();
console.log(user.username);  // Prints current system username
```

**To see all functions available in `os`:**
```javascript
console.log(os);  // Prints everything OS can do
```

### 5.2 FS Module (File System)

Used to create, read, update, delete files.

**Example: Create a file and write content**
```javascript
const fs = require('fs');

fs.writeFile('greeting.txt', 'Hello Friends!', (err) => {
    if (err) console.log(err);
    console.log("File created successfully!");
});
```

**What happens:**
- If file doesn't exist → creates it.
- If file exists → overwrites it.

### 5.3 How Callbacks Work in FS Module

```javascript
fs.writeFile('file.txt', 'data', (err) => {
    // This callback runs AFTER the file is written
    console.log("File operation complete");
});
```

---

## 6. Importing/Exporting Files (Modules)

When your project grows, you split code into multiple files.

### 6.1 Exporting from a file (`notes.js`)

```javascript
// Variable to export
const age = 25;

// Function to export
function addNumber(a, b) {
    return a + b;
}

// Export both
module.exports = {
    age: age,
    addNumber: addNumber
};
```

**Shorthand syntax (if key and value names are same):**
```javascript
module.exports = { age, addNumber };
```

### 6.2 Importing into another file (`server.js`)

```javascript
const notes = require('./notes.js');

console.log(notes.age);           // Output: 25
const result = notes.addNumber(10, 18);
console.log(result);              // Output: 28
```

**Important:** When you import a file, any `console.log()` inside that file will ALSO run automatically.

---

## 7. Lodash (The Most Useful Utility Library)

**What is Lodash?** A powerful library with hundreds of ready-made functions to manipulate arrays, objects, strings, numbers.

### 7.1 Install Lodash
```bash
npm install lodash
```

### 7.2 Using Lodash

```javascript
const _ = require('lodash');  // Convention: use underscore

// Example 1: Get unique values from an array
let data = [1, 2, 2, 3, 3, 3, 4];
let uniqueData = _.uniq(data);
console.log(uniqueData);  // Output: [1, 2, 3, 4]

// Example 2: Check if a value is a string
console.log(_.isString("Prince"));  // Output: true
console.log(_.isString(123));       // Output: false
```

### 7.3 Why use Lodash?
- Saves you from writing complex logic manually.
- Well-tested, optimized, and reliable.
- Most developers use it, so learning it is a **best practice**.

**Note:** The `_` (underscore) is just a naming convention. You can use any variable name, but `_` is standard and expected.

---

## 8. Summary of What You Learned Today

| Topic | What it does |
| :--- | :--- |
| **`npm init`** | Creates `package.json` (project metadata) |
| **`npm install`** | Downloads packages into `node_modules` |
| **`package.json`** | Shopping list of dependencies |
| **`package-lock.json`** | Detailed receipt with exact versions |
| **Nodemon** | Auto-restarts server on file changes |
| **Callback Function** | A function that runs AFTER another function completes |
| **OS Module** | Get system info (username, OS, etc.) |
| **FS Module** | Create, read, write files |
| **`module.exports`** | Export variables/functions from a file |
| **`require()`** | Import from another file |
| **Lodash (`_`)** | Utility functions for data manipulation (unique, isString, etc.) |

---

## 9. Homework
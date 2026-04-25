Here are the **structured, end-to-end notes** from the third lecture. You can study these without watching the video again.

---

# Node.js Lecture 3: Servers, APIs, JSON, and Express.js

## 1. What is a Server? (The Waiter Analogy)

**Server Definition:**
- A server is a **computer program** that listens for requests from clients (browsers, mobile apps) and sends back responses (data).
- It acts as a **mediator** between the Client and the Database.

### The Restaurant Analogy (IMPORTANT for Interviews)

| Component | Technical Term | Real-life Analogy |
| :--- | :--- | :--- |
| **Client** | Browser / Mobile App | Customer (hungry person) |
| **Server** | Node.js + Express | **Waiter** (takes order, serves food) |
| **Database** | MongoDB / MySQL | **Chef / Kitchen** (stores/prepares the actual data) |

**How it works:**
1. Customer (Client) tells Waiter (Server): "I want Chicken."
2. Waiter goes to Chef (Database) and gets the chicken.
3. Waiter presents the food nicely and serves it to the Customer.

**Key Point:** The server's job is to **listen**, **process**, and **respond**.

---

## 2. What is JSON? (JavaScript Object Notation)

**Definition:** JSON is a **lightweight, text-based data format** used to transfer data between a server and a client.

**Why JSON?**
- It is **lightweight** (small file size, fast transfer).
- It is **structured** (easy to read and understand).
- It is **language-independent** (works with any programming language).

### JSON Example
```json
{
    "name": "John",
    "age": 25,
    "isStudent": false,
    "hobbies": ["cricket", "coding"]
}
```

### Converting Between JSON and JavaScript Object

```javascript
// JSON String (received from server)
const jsonString = '{"name":"John","age":25}';

// Convert JSON String → JavaScript Object
const jsObject = JSON.parse(jsonString);
console.log(jsObject.name);  // Output: John

// Convert JavaScript Object → JSON String
const newJsonString = JSON.stringify(jsObject);
console.log(newJsonString);  // Output: {"name":"John","age":25}
console.log(typeof newJsonString);  // Output: string
```

**Key Rules of JSON:**
- Keys MUST be in double quotes (`"name"` not `name`).
- Strings MUST be in double quotes (not single quotes).
- Numbers, booleans, null are written as-is.

---

## 3. What is an API and Endpoint?

### API (Application Programming Interface)
- The **menu card** of the restaurant.
- It defines WHAT you can ask from the server.
- Example: "You can order Chicken, Paneer, Rice, but NOT Pizza."

### Endpoint
- Each **item** on the menu card.
- A specific URL path that the server understands.
- Example:
    - `/chicken` → returns chicken data
    - `/paneer` → returns paneer data
    - `/idli` → returns idli data

**Key Point:** A server only responds to endpoints that are **defined** in its code. If you ask for something not on the menu (`/daal`), the server will say "Cannot GET /daal".

---

## 4. HTTP Methods (Verbs)

Different ways to communicate with the server based on what you want to do.

| Method | Action | Real-life Analogy |
| :--- | :--- | :--- |
| **GET** | Read/Retrieve data | Asking the waiter for the menu or available dishes. |
| **POST** | Create new data | Ordering a new dish (adds to the kitchen). |
| **PUT** | Update entire data | Changing your order completely. |
| **PATCH** | Update partial data | Adding extra cheese to your existing order. |
| **DELETE** | Remove data | Cancelling an order. |

**Focus for now:** GET method (retrieving information).

---

## 5. Localhost and Port Numbers (Address Analogy)

### Localhost
- The "home" or "building" address of your own computer.
- In programming, `localhost` means **this same computer**.
- IP address equivalent: `127.0.0.1`

### Port Number
- The **room number** inside the building.
- Multiple applications can run on the same computer, each on a different port.
- Example:
    - Your Node.js server runs on port `3000`
    - Your MySQL database runs on port `3306`
    - Your React app runs on port `5173`

**Full Address:**
```
http://localhost:3000/
```
- `localhost` = Building
- `3000` = Room number
- `/` = Endpoint (specific item on the menu)

---

## 6. Creating a Server with Express.js

### Step 1: Install Express
```bash
npm install express
```

### Step 2: Basic Server Code (`server.js`)

```javascript
// 1. Import Express
const express = require('express');

// 2. Create an instance of the server (the Waiter)
const app = express();

// 3. Define Endpoints (the Menu Card)

// Homepage endpoint: /
app.get('/', (req, res) => {
    res.send('Welcome to my hotel! How can I help you?');
});

// Idli endpoint: /idli
app.get('/idli', (req, res) => {
    res.send('Here is your delicious idli with sambar!');
});

// Custom endpoint: /chicken
app.get('/chicken', (req, res) => {
    res.send('Here is your spicy chicken curry!');
});

// 4. Start the server (make the Waiter stand at the counter)
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
```

### Step 3: Run the Server
```bash
node server.js
```
OR (with auto-restart)
```bash
nodemon server.js
```

### Step 4: Test in Browser
Open your browser and go to:
- `http://localhost:3000/` → See welcome message
- `http://localhost:3000/idli` → See idli message
- `http://localhost:3000/chicken` → See chicken message

---

## 7. Sending JSON Data from Server

You can also send structured data (JSON) instead of plain text.

```javascript
app.get('/idli', (req, res) => {
    const idliData = {
        name: "Rava Idli",
        size: "Regular",
        sambar: true,
        chutney: "Coconut"
    };
    res.send(idliData);  // Express automatically converts to JSON
});
```

**Browser output (JSON):**
```json
{
    "name": "Rava Idli",
    "size": "Regular",
    "sambar": true,
    "chutney": "Coconut"
}
```

---

## 8. Important: Server Restart Required (Unless Using Nodemon)

**Rule:** Whenever you change your server code, you MUST restart the server for changes to take effect.

**Without Nodemon (manual):**
1. Press `Ctrl + C` to stop server.
2. Run `node server.js` again.

**With Nodemon (automatic):**
```bash
npm install nodemon
nodemon server.js
```
Now any code change automatically restarts the server.

**Interview Question:** "I changed my code but the server still shows old output. Why?"
**Answer:** Because you didn't restart the server after making changes.

---

## 9. Complete Example with Explanation

```javascript
const express = require('express');  // Import the Express library
const app = express();               // Create the server instance

// Endpoint 1: Homepage
app.get('/', (req, res) => {
    // req = request (what customer asked)
    // res = response (what waiter sends back)
    res.send('Welcome to our restaurant!');
});

// Endpoint 2: Menu list
app.get('/menu', (req, res) => {
    const menu = {
        starters: ["Paneer Tikka", "Spring Roll"],
        mainCourse: ["Butter Chicken", "Dal Makhani"],
        desserts: ["Gulab Jamun", "Ice Cream"]
    };
    res.send(menu);
});

// Endpoint 3: Custom item
app.get('/paneer', (req, res) => {
    res.send('Here is your Paneer Tikka! Enjoy!');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

---

## 10. Summary Table

| Concept | Definition | Real-life Analogy |
| :--- | :--- | :--- |
| **Server** | Program that listens and responds to requests | Waiter in a restaurant |
| **Client** | Browser/app that sends requests | Customer |
| **Database** | Where data is stored | Kitchen/Chef |
| **API** | List of available requests | Menu card |
| **Endpoint** | Specific request path | One item on the menu |
| **JSON** | Lightweight data format | Food presented nicely on a plate |
| **Port** | Number identifying an application | Room number in a building |
| **Localhost** | Your own computer | Your home address |
| **GET** | HTTP method for reading data | Asking "What do you have?" |
| **res.send()** | Send response back to client | Waiter serving the food |

---

## 11. Homework / Practice Tasks

1. Create a server using Express.
2. Define at least 3 GET endpoints:
   - `/` → send "Hello World"
   - `/about` → send "This is a Node.js server"
   - `/data` → send a JSON object with your name, age, and city
3. Run the server using `nodemon`.
4. Test all endpoints in your browser.
5. Try requesting an endpoint that you DID NOT define (e.g., `/pizza`). See what error message you get.

---

## 12. Common Errors & Solutions

| Error | Likely Cause | Solution |
| :--- | :--- | :--- |
| `Cannot GET /xyz` | Endpoint not defined | Define `app.get('/xyz', ...)` |
| `Address already in use` | Port 3000 already busy | Change port number (e.g., `3001`) or kill the other process |
| `Express is not defined` | Forgot to import Express | Add `const express = require('express');` |
| Server not responding after code change | Forgot to restart | Use `nodemon` or manually restart |
| `nodemon: command not found` | Nodemon not installed | Run `npm install nodemon` |

---

**Next Lecture Preview:** POST method, handling different HTTP methods, and using Postman to test APIs.
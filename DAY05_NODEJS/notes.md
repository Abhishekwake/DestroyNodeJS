Here are the **structured, end-to-end notes** from the fifth lecture. This covers **MongoDB connection, Mongoose schemas, models, async/await, and CRUD operations**.

---

# Node.js Lecture 5: Database Integration (MongoDB + Mongoose)

## 1. Project Structure (Best Practice)

Organize your code for maintainability:

```
your-project/
├── db.js              (Database connection)
├── server.js          (Main Express server)
├── models/
│   ├── person.js      (Person schema & model)
│   └── menuItem.js    (Menu schema & model)
└── package.json
```

**Why separate files?**
- Clean code organization
- Easy for other developers to understand
- Scalable for large projects

---

## 2. Database Connection (`db.js`)

This file is **responsible for establishing connection** between Node.js and MongoDB.

### Step-by-Step Connection Code

```javascript
// 1. Import Mongoose (the bridge)
const mongoose = require('mongoose');

// 2. Define the MongoDB connection URL
// Format: mongodb://localhost:27017/database_name
const mongoURL = 'mongodb://localhost:27017/hotel';

// 3. Establish connection with options (to avoid warnings)
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 4. Get the connection object (Mongoose maintains this automatically)
const db = mongoose.connection;

// 5. Event listeners to track connection status
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// 6. Export the connection object
module.exports = db;
```

### Connection URL Breakdown

| Part | Value | Meaning |
| :--- | :--- | :--- |
| Protocol | `mongodb://` | Database protocol |
| Host | `localhost` | Your own computer |
| Port | `27017` | Default MongoDB port |
| Database Name | `hotel` | Name of the database (auto-created if not exists) |

### Event Listeners Explained

| Event | When it triggers |
| :--- | :--- |
| `connected` | Successfully connected to MongoDB |
| `error` | Connection failed (wrong URL, server down) |
| `disconnected` | Connection was lost (server stopped) |

**Note:** The `db` object is maintained by Mongoose. It's your bridge to interact with the database.

---

## 3. Importing Database Connection in `server.js`

```javascript
// Import database connection (this MUST be at the top)
require('./db');  // or const db = require('./db');

const express = require('express');
const app = express();
// ... rest of the server code
```

**Why at the top?** Because the database connection should be established **before** handling any HTTP requests.

---

## 4. What are Schema and Model?

### Schema (Blueprint)
- Defines the **structure** of your data.
- Specifies **field names**, **data types**, and **validations**.
- Like a blueprint for a house.

### Model (Instance)
- Created from the schema.
- Used to perform CRUD operations (Create, Read, Update, Delete).
- Like the actual house built from the blueprint.

### Comparison

| SQL | MongoDB + Mongoose |
| :--- | :--- |
| Table | Collection |
| Row / Record | Document |
| Column | Field |
| Table definition | **Schema** |
| Table itself | **Model** |

---

## 5. Creating a Person Model (`models/person.js`)

```javascript
const mongoose = require('mongoose');

// Define the Schema (Blueprint)
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true           // Mandatory field
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],  // Only these 3 values allowed
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true             // No duplicate emails allowed
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

// Create the Model from Schema
const Person = mongoose.model('Person', personSchema);

// Export the Model
module.exports = Person;
```

### Schema Field Options

| Option | Meaning |
| :--- | :--- |
| `type` | Data type (String, Number, Boolean, Date, etc.) |
| `required` | Must be provided (true/false) |
| `unique` | No duplicate values allowed in this collection |
| `enum` | Only specified values are allowed (like a dropdown) |
| `default` | Default value if not provided |

### `enum` Example
```javascript
work: {
    type: String,
    enum: ['chef', 'waiter', 'manager']
}
// Only "chef", "waiter", or "manager" can be stored
// "owner" would be rejected automatically
```

---

## 6. Body-Parser (Middleware for POST Requests)

### What is Body-Parser?
- A middleware that **extracts data from incoming request bodies**.
- Converts JSON/Form data into a JavaScript object.
- Makes the data available as `req.body`.

### Why do we need it?
- When a client sends data via POST, it comes as a raw string.
- Body-parser automatically **parses** it into a usable object.

### Installation
```bash
npm install body-parser
```

### Usage in `server.js`
```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // Parse JSON data
```

**What `app.use()` does:** It applies middleware to **all routes** before they handle requests.

---

## 7. POST Endpoint (Create/Save Data)

```javascript
app.post('/person', async (req, res) => {
    try {
        // Data comes from client in request body
        const data = req.body;
        
        // Create a new Person document using the Model
        const newPerson = new Person(data);
        
        // Save to database (await because it takes time)
        const response = await newPerson.save();
        
        console.log('Data saved successfully');
        res.status(200).json(response);
        
    } catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

### Flow of POST Request

```
Client (Postman)
    ↓ sends JSON data to /person
Body-Parser (parses data into req.body)
    ↓
Your code creates new Person(req.body)
    ↓
newPerson.save() → Database (MongoDB)
    ↓
Database returns saved document
    ↓
Server sends response back to Client
```

---

## 8. GET Endpoint (Read Data)

```javascript
app.get('/person', async (req, res) => {
    try {
        // Find all documents in Person collection
        const data = await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
        
    } catch (err) {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

**`Person.find()`** returns an array of all documents in the collection.

---

## 9. Async/Await (The Most Important Concept)

### Problem: Database operations take time
- Saving to DB might take a few milliseconds.
- Fetching thousands of records might take seconds.
- Your code should **wait** for these operations to complete before proceeding.

### Solution: Async/Await

```javascript
// Without async/await (old callback style - messy)
app.post('/person', (req, res) => {
    const newPerson = new Person(req.body);
    newPerson.save((err, response) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(response);
        }
    });
});

// With async/await (clean and modern)
app.post('/person', async (req, res) => {
    try {
        const response = await newPerson.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
```

### Syntax Rules

| Keyword | Where to use | Meaning |
| :--- | :--- | :--- |
| `async` | Before function: `async function()` or `async (req, res) =>` | This function contains async operations |
| `await` | Before a promise: `await Person.find()` | Wait here until this operation completes |

### Try-Catch Block

```javascript
try {
    // Code that might fail (database operations)
    const result = await someAsyncOperation();
    // If successful, this runs
} catch (error) {
    // If any error occurs in try block, jump here
    console.log('Error:', error);
}
```

---

## 10. Testing with Postman

### POST Request (Save Data)
1. Method: `POST`
2. URL: `http://localhost:3000/person`
3. Body → raw → JSON
4. Enter data:
```json
{
    "name": "Alice",
    "age": 25,
    "work": "chef",
    "mobile": "1234567890",
    "email": "alice@example.com",
    "address": "123 Main St",
    "salary": 50000
}
```
5. Click **Send**
6. Response shows saved document with `_id` (auto-generated)

### GET Request (Fetch Data)
1. Method: `GET`
2. URL: `http://localhost:3000/person`
3. Click **Send**
4. Response shows all persons in the database

---

## 11. Error Handling Examples

### Validation Error (Missing required field)
```json
{
    "name": "Bob",
    "age": 30
    // Missing work, mobile, email, salary
}
```
**Response:** 500 Internal Server Error with validation message

### Duplicate Email Error
```json
{
    "name": "Another Alice",
    "email": "alice@example.com"  // Already exists!
}
```
**Response:** 500 with "duplicate key error"

### Enum Validation Error
```json
{
    "work": "owner"  // Not in enum ['chef', 'waiter', 'manager']
}
```
**Response:** 500 with validation error

---

## 12. Creating Menu Model (`models/menuItem.js`)

```javascript
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false      // Default value if not provided
    },
    ingredients: {
        type: [String],     // Array of strings
        default: []
    },
    numSales: {
        type: Number,
        default: 0
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
```

### Import in `server.js`
```javascript
const MenuItem = require('./models/menuItem');

// GET all menu items
app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST new menu item
app.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

---

## 13. Complete Server Setup (`server.js`)

```javascript
// Import database first
require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const MenuItem = require('./models/menuItem');

const app = express();
app.use(bodyParser.json());

// GET endpoint for home
app.get('/', (req, res) => {
    res.send('Welcome to my hotel! How can I help you?');
});

// PERSON endpoints
app.get('/person', async (req, res) => { /* fetch all persons */ });
app.post('/person', async (req, res) => { /* save new person */ });

// MENU endpoints
app.get('/menu', async (req, res) => { /* fetch all menu items */ });
app.post('/menu', async (req, res) => { /* save new menu item */ });

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
```

---

## 14. CRUD Operations Summary

| Operation | HTTP Method | Endpoint | Database Method |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `/person` | `new Person().save()` |
| **Read** | GET | `/person` | `Person.find()` |
| **Update** | PUT/PATCH | `/person/:id` | `Person.findByIdAndUpdate()` |
| **Delete** | DELETE | `/person/:id` | `Person.findByIdAndDelete()` |

---

## 15. Common Errors & Solutions

| Error | Likely Cause | Solution |
| :--- | :--- | :--- |
| `MongoServerError: E11000 duplicate key` | Email already exists | Use a different email address |
| `ValidationError: work is required` | Missing required field | Include all required fields in request |
| `Cannot POST /person` | Server not running or wrong route | Check `app.post('/person')` exists and server is running |
| `MongooseServerSelectionError` | MongoDB server not running | Run `brew services start mongodb-community` |
| `req.body is empty` | Body-parser not configured | Add `app.use(bodyParser.json())` |

---

## 16. Homework

1. Create a **MenuItem** model with schema provided above.
2. Implement **POST /menu** endpoint to add new menu items.
3. Implement **GET /menu** endpoint to fetch all menu items.
4. Test both endpoints using Postman.
5. Try adding invalid data (wrong enum, missing required fields) and see the validation errors.

---

## 17. Key Takeaways

- **Schema** = Blueprint of your data structure
- **Model** = Used to interact with database (CRUD)
- **Async/Await** = Handle time-consuming operations cleanly
- **Try/Catch** = Handle errors gracefully
- **Body-Parser** = Parse incoming request data
- **Separation of concerns** = Keep connection, models, and server in different files

**Next Lecture Preview:** PUT/PATCH (Update), DELETE endpoints, parameterized routes (`/person/:id`), and filtering data.
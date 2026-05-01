# Node.js Complete Course Notes - Lecture 7 (Final)
## Parameterized APIs, Express Router, PUT (Update), DELETE Operations

---

## Part 1: Homework Review (Menu Item API)

### What You Should Have Done
- Created `MenuItem` model with schema (taste, price, ingredients, etc.)
- Created POST `/menu` endpoint to save menu items
- Created GET `/menu` endpoint to fetch all menu items

### Expected Code Pattern
```javascript
// POST /menu - Save menu item
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

// GET /menu - Fetch all menu items
app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

---

## Part 2: Parameterized APIs

### The Problem
- What if client wants: "Give me only CHEF data" or "Give me only WAITER data"?
- Creating separate endpoints for each role is impossible:
  - `/person/chef`
  - `/person/waiter`
  - `/person/manager`
  - What if new roles come tomorrow?

### The Solution: Parameterized URL

**Single endpoint that accepts a parameter:**

```javascript
app.get('/person/:workType', async (req, res) => {
    // :workType is a VARIABLE - can be anything
});
```

### How to Extract Parameter

```javascript
app.get('/person/:workType', async (req, res) => {
    const workType = req.params.workType;
    // workType will be whatever client puts in URL
});
```

**Example:**
- Client hits: `/person/chef` → `workType = "chef"`
- Client hits: `/person/waiter` → `workType = "waiter"`
- Client hits: `/person/manager` → `workType = "manager"`

### Complete Parameterized API Code

```javascript
app.get('/person/:workType', async (req, res) => {
    try {
        // 1. Extract parameter from URL
        const workType = req.params.workType;
        
        // 2. Validate - only allow specific values
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            
            // 3. Query database for matching records
            const response = await Person.find({ work: workType });
            
            // 4. Send response
            console.log("Data fetched");
            res.status(200).json(response);
            
        } else {
            // 5. Invalid parameter - send error
            res.status(404).json({ error: 'Invalid work type' });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

### Testing in Postman

| URL | Result |
| :--- | :--- |
| `localhost:3000/person/chef` | Returns only chef records |
| `localhost:3000/person/waiter` | Returns only waiter records |
| `localhost:3000/person/manager` | Returns only manager records |
| `localhost:3000/person/dog` | Returns: `{ error: "Invalid work type" }` with status 404 |

### Why Validation is Important
- Without validation, someone could hit `/person/dog`
- Database would search for `work: "dog"` (wasting resources)
- Returns empty result (still waste)
- **Good practice:** Validate BEFORE database query

---

## Part 3: Express Router (Organizing Code)

### The Problem
All endpoints in `server.js` become messy:

```javascript
// server.js becomes huge and unreadable
app.post('/person', ...)
app.get('/person', ...)
app.get('/person/:workType', ...)
app.post('/menu', ...)
app.get('/menu', ...)
// imagine 50 more endpoints...
```

### The Solution: Express Router

**Router acts like a "traffic cop"** - directs requests to different files based on URL.

### Step 1: Create Routes Folder

```
your-project/
├── models/
│   ├── Person.js
│   └── MenuItem.js
├── routes/          ← NEW FOLDER
│   ├── personRoutes.js
│   └── menuRoutes.js
├── db.js
├── server.js
└── .env
```

### Step 2: Create Person Routes File

**File: `routes/personRoutes.js`**

```javascript
const express = require('express');
const Person = require('./../models/Person');

// Create router instance
const router = express.Router();

// POST /person - Save person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /person - Fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /person/:workType - Filter by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;
```

### Step 3: Update server.js

```javascript
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routers
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
app.use(bodyParser.json());

// Use routers (this is the "traffic cop")
app.use('/person', personRoutes);   // All /person/* go to personRoutes
app.use('/menu', menuRoutes);       // All /menu/* go to menuRoutes

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to our hotel');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### How It Works - Important!

| Client Request | router.use() | Actual Endpoint in Router |
| :--- | :--- | :--- |
| `GET /person` | `app.use('/person', personRoutes)` | `router.get('/')` |
| `POST /person` | `app.use('/person', personRoutes)` | `router.post('/')` |
| `GET /person/chef` | `app.use('/person', personRoutes)` | `router.get('/:workType')` |

**The common `/person` part is removed from router files!**

### Router Rules
- `app.use('/person', personRoutes)` → removes `/person` prefix
- Inside router, use relative paths: `/` (not `/person`)
- This way, all person-related code stays in ONE file

---

## Part 4: Menu Routes (Your Homework)

**File: `routes/menuRoutes.js`**

```javascript
const express = require('express');
const MenuItem = require('./../models/MenuItem');

const router = express.Router();

// POST /menu - Save menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /menu - Fetch all menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Parameterized: GET /menu/:taste (sweet, spicy, sour)
router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
            const response = await MenuItem.find({ taste: tasteType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
```

---

## Part 5: PUT (Update Operation)

### What We Need for Update

Two things required:
1. **WHICH** record to update (ID)
2. **WHAT** to update (data)

### Client Sends:
- **ID** → in URL parameter (e.g., `/person/65abc123...`)
- **Updated Data** → in request body (JSON)

### PUT Endpoint Code

```javascript
// PUT /person/:id - Update person by ID
router.put('/:id', async (req, res) => {
    try {
        // 1. Get ID from URL parameter
        const personId = req.params.id;
        
        // 2. Get updated data from request body
        const updatedPersonData = req.body;
        
        // 3. Find and update in database
        const response = await Person.findByIdAndUpdate(
            personId,           // Which record?
            updatedPersonData,  // What to update?
            {
                new: true,           // Return updated document (not old)
                runValidators: true  // Apply schema validations
            }
        );
        
        // 4. Check if person exists
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        // 5. Send success response
        console.log("Data updated");
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

### Understanding findByIdAndUpdate Parameters

| Parameter | Value | Meaning |
| :--- | :--- | :--- |
| 1st | `personId` | Which document to update |
| 2nd | `updatedPersonData` | New data to apply |
| 3rd | `{ new: true, runValidators: true }` | Options |

### Options Explained

| Option | `true` | `false` |
| :--- | :--- | :--- |
| `new` | Returns UPDATED document | Returns OLD document (before update) |
| `runValidators` | Checks schema rules before update | Skips validation (dangerous) |

### Three Possible Outcomes

| Scenario | What happens |
| :--- | :--- |
| **Success** | Document found + updated → Returns updated document (status 200) |
| **Invalid ID** | No document with that ID → Returns `{ error: "Person not found" }` (status 404) |
| **Database error** | Something went wrong → Goes to catch block (status 500) |

### Testing PUT in Postman

```
Method: PUT
URL: http://localhost:3000/person/65abc123def456...
Body (raw JSON):
{
    "name": "Alice Agrawal"
}
```

**Before:** Name was "Alice"
**After:** Name becomes "Alice Agrawal"

---

## Part 6: DELETE Operation

### What We Need for Delete

Only one thing required: **WHICH** record to delete (ID)

### DELETE Endpoint Code

```javascript
// DELETE /person/:id - Delete person by ID
router.delete('/:id', async (req, res) => {
    try {
        // 1. Get ID from URL parameter
        const personId = req.params.id;
        
        // 2. Find and delete from database
        const response = await Person.findByIdAndDelete(personId);
        
        // 3. Check if person existed
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        // 4. Send success response
        console.log("Person deleted successfully");
        res.status(200).json({ message: 'Person deleted successfully' });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
```

### Testing DELETE in Postman

```
Method: DELETE
URL: http://localhost:3000/person/65abc123def456...
```

### Possible Outcomes

| Scenario | Response |
| :--- | :--- |
| Success | `{ message: "Person deleted successfully" }` (status 200) |
| Invalid ID | `{ error: "Person not found" }` (status 404) |
| Database error | `{ error: "Internal Server Error" }` (status 500) |

---

## Part 7: Complete CRUD Operations Summary

| Operation | HTTP Method | Endpoint Pattern | What it does |
| :--- | :--- | :--- | :--- |
| **CREATE** | POST | `/person` | Insert new document |
| **READ (All)** | GET | `/person` | Fetch all documents |
| **READ (Filter)** | GET | `/person/:workType` | Fetch by work type |
| **READ (Single)** | GET | `/person/:id` | Fetch one document by ID |
| **UPDATE** | PUT | `/person/:id` | Update document by ID |
| **DELETE** | DELETE | `/person/:id` | Delete document by ID |

---

## Part 8: HTTP Status Codes Used

| Status Code | Meaning | When to use |
| :--- | :--- | :--- |
| 200 | OK / Success | Request successful (GET, POST, PUT) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error (database down, etc.) |

---

## Part 9: Final Project Structure

```
hotel-api/
│
├── .env                     (PORT, MONGODB_URL)
├── .gitignore               (node_modules/, .env)
├── package.json
├── package-lock.json
├── server.js                (Main - imports routers)
├── db.js                    (Database connection)
│
├── models/
│   ├── Person.js            (Person schema)
│   └── MenuItem.js          (Menu schema)
│
└── routes/
    ├── personRoutes.js      (All /person endpoints)
    └── menuRoutes.js        (All /menu endpoints)
```

---

## Part 10: Key Takeaways

| Concept | Summary |
| :--- | :--- |
| **Parameterized URL** | `/:variable` in route → `req.params.variable` |
| **Validation** | Always validate parameters before database query |
| **Express Router** | Organize routes into separate files |
| **app.use()** | Mount routers on specific paths |
| **PUT** | Update existing resource (needs ID + data) |
| **DELETE** | Remove resource (needs ID only) |
| **findByIdAndUpdate** | MongoDB method for update |
| **findByIdAndDelete** | MongoDB method for delete |
| **Status Codes** | 200 (OK), 404 (Not Found), 500 (Error) |

---

## Part 11: Final Homework

### Task 1: Create Menu Parameterized Route
Create `GET /menu/:taste` that returns menu items filtered by taste (sweet, spicy, sour)

### Task 2: Create Menu Update Route
Create `PUT /menu/:id` to update menu items

### Task 3: Create Menu Delete Route
Create `DELETE /menu/:id` to delete menu items

### Task 4: Refactor menuRoutes.js
Move all menu endpoints from `server.js` to `routes/menuRoutes.js` using Express Router

---

## Part 12: Common Errors & Solutions

| Error | Cause | Solution |
| :--- | :--- | :--- |
| `Cannot GET /person/chef` | No route defined | Add `router.get('/:workType')` |
| `Person is not defined` | Model not imported | Add `const Person = require('./models/Person')` |
| `404 - Person not found` | Invalid ID | Check ID exists in database |
| `CastError` | Invalid ObjectId format | ID must be 24-character hex string |
| `ValidationError` | Data doesn't match schema | Check required fields and data types |

---

**Congratulations! You've completed the Node.js course! 🎉**
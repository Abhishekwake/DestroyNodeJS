// Problems

// Question 1: Difference Between MongoDB Server & Node.js Server
// Explain the difference between a MongoDB server and a Node.js server in terms of their roles and
// functionalities. Provide examples of situations where you would use each server type

// Answer: The MongoDB server is responsible for storing and managing data in the MongoDB database. It
// handles data storage, retrieval, and manipulation operations. On the other hand, a Node.js server is a runtime
// environment that executes JavaScript code. It handles incoming requests from clients, processes them, and
// can interact with databases like MongoDB to retrieve or update data. You would use a MongoDB server to
// store and manage data, while a Node.js server is used to handle application logic and serve client requests.

// Question 2: MongoDB Queries
// a) Write a MongoDB query to create a new document in a collection named "students" with fields "name,"
// "age," and "grade."
db.students.insertOne({ name: "John", age: 20, grade: "A" });

// b) Write a MongoDB query to update the "age" field of a document in the "employees" collection with the name
// "John" to 30.
db.employees.updateOne({ name: "John" }, { $set: { age: 30 } });

// c) Write a MongoDB query to delete a document from the "products" collection with the name "Product A."
db.products.deleteOne({ name: "Product A" });

// d) Write a MongoDB query to retrieve all documents from the "orders" collection where the total amount is
// greater than $100
db.orders.find({ totalAmount: { $gt: 100 } });

// Question 3: SQL vs. MongoDB
// Answer: SQL databases use structured tables with rows and columns to store data, while MongoDB uses
// flexible and dynamic documents in collections. SQL databases use SQL as a querying language, while
// MongoDB uses a JavaScript-like syntax for queries. SQL databases are suitable for applications with
// well-defined and structured data, such as financial systems. MongoDB is better for projects with changing or
// unstructured data, like content management systems or real-time analytics

// Question 4: Query Comparison
// a) Answer: Both queries retrieve products with the category "Electronics."
// b) Answer: Both queries retrieve a user named "Alice."
// c) Answer: Both queries calculate the total amount of orders grouped by status

// Question 4: Query Comparison
// Compare and contrast the following MongoDB and SQL queries for retrieving data:
// a) MongoDB: db.products.find({ category: "Electronics" })
// SQL: SELECT * FROM products WHERE category = "Electronics"
// b) MongoDB: db.users.findOne({ username: "Alice" })
// SQL: SELECT * FROM users WHERE username = "Alice"
// c) MongoDB: db.orders.aggregate([{ $group: { _id: "$status", total: { $sum:
// "$amount" } } }])
// SQL: SELECT status, SUM(amount) as total FROM orders GROUP BY status
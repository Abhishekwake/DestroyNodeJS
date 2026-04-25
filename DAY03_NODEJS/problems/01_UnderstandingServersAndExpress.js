const express = require('express');

//create express instance
const app = express();
//express route to handle /
app.get("/",(req,res) => {
    res.send("Hello World from express server!")
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

// Problem 1: Understanding Servers and Express.js
// Explain in your own words what a server is in the context of Node.js. Then, write step-by-step instructions on
// how to create a basic server using Express.js.

// To create a basic server using Express.js
//  A server in Node.js is a computer program that receives and responds to requests from clients (like
// web browsers or mobile apps) over a network. It processes requests and sends back appropriate
// responses

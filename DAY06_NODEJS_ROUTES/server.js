const express = require('express');
const db = require('./db.js')
const bodyParser = require('body-parser')

//import routes
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

const app = express();
app.use(bodyParser.json());

app.use('/person',personRoutes);    // All /person/* go to personRoutes
app.use('/menu',menuRoutes);      // All /menu/* go to menuRoutes

// Home route
app.get('/',(req,res)=>{
    res.send("Welcome to My Restaurent API");
})
app.listen(3000,()=>{
    console.log(`server is running at port 3000`);
})
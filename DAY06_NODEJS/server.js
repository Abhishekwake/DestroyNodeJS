const express = require('express');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem.js');
const db = require('./db.js')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.post('/person',async (req,res)=>{
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved")
        res.status(200).send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})
app.get('/person',async(req,res) => {
    try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal sercer error'})
    } 
})

app.post('/menu', async (req,res) =>{
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('menu data saved');
        res.status(200).send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal Server Error'} );
    }
})
app.get('/menu',async(req,res)=>{
     try{
     const data = await MenuItem.find();
     console.log('Data Fetched');
     res.status(200).send(data);
     }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal Server Error'});
     }
})


app.get('/',(req,res)=>{
    res.send("Welcome to My Restaurent API");
})
app.listen(3000,()=>{
    console.log(`server is running at port 3000`);
})
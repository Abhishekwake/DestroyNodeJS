const express = require('express');
const bodyParser = require('body-parser')
const db = require("./db")
const Person = require("./models/Person")

const app = express();
app.use(bodyParser.json());
//post route to add a person
app.post("/person",async(req,res)=>{
    try{
        const data = req.body; //assuming the req body contains the person data

        //creating a new person document using the mongoose model
        const personData = new Person(data);
        //save the new person to the database
        const response = await personData.save();
        console.log("Data Saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'})
    }
})
app.get('/person',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal Server Error' })
    }
})
app.listen(3000,(req,res)=>{
    console.log(`Server is running at port ${3000}`);
})
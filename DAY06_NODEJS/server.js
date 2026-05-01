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
// :workType is a VARIABLE - can be anything // workType will be whatever client puts in URL
// parametezied api
app.get('/person/:worktype',async(req,res)=>{
    try{
        //1. extract parameterized url
        const workType = req.params.worktype;
        //2 . validate only allow specific values
        if(workType === 'waiter' || workType ==='chef' || workType === 'manager'){
            //3 . query database =for matching value //chef // waiter //manager
            const response = await Person.find({work : workType});
            //4. send response
            console.log('fetched successfully');
            res.status(200).json(response);
        }else{
            res.status(404).json({error : 'Invalid work type'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
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
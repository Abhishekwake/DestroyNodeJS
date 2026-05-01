const express = require('express');
const Person = require('../models/Person');

const router = express.Router();
// POST /person - Save person
router.post('/',async (req,res)=>{
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

// GET /person - Fetch all persons
router.get('/',async(req,res) => {
    try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal sercer error'})
    } 
}) 
// GET /person/:workType - Filter by work type
// :workType is a VARIABLE - can be anything // workType will be whatever client puts in URL
// parametezied api
router.get('/:worktype',async(req,res)=>{
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

module.exports= router;
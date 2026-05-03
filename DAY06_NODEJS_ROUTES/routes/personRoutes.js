const express = require('express');
const Person = require('../models/Person');
//creating a router instance
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
router.put('/:worktype',async(req,res)=>{
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

router.get('/:id', async(req,res)=>{
    try{
        //1. get which record/doc to update // get id from url parameter
        const personId = req.params.id;
        //2 . get updated data from requested body
        const updatedPersonData = req.body;
        // 3. query to find and update in database 
        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            //Optionsnew Returns UPDATED document // Returns OLD document (before update) //runValidators	Checks schema rules before update	Skips validation (dangerous)
            {
                new : true, //return updated document not old //true
                runValidators: true, //apply schema validation
            }
        )
        //4. check if person exits or not
        if(!response){
           return res.send(404).json({ error : 'Person not found'})
        }
        //5 . send success response
        console.log("Data Updated");
        res.status(200).json(response);

    } //Database error	Something went wrong → Goes to catch block (status 500)
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    //1. find ID from url parameter 
     const personId = req.params.id;
    //2. find and delete from database
     const response = await Person.findByIdAndDelete(personId);
     //3. check if person exits or not
     if(!response) {
       return res.status(404).json({ error: 'Person not found'})
     }
     //4. Send success response
     console.log('Person delete successfully');
     res.status(200).json({message: 'Person deleted successfully' });
    }catch(err){
        console.log(err);
        res.status(500).json({ error : 'Internal Server Error'});
    }
})


module.exports= router;
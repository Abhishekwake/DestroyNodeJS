const express = require('express');
const MenuItem = require('../models/MenuItem');
//creating a router instance
const router = express.Router();

router.post('/', async (req,res) =>{
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
router.get('/',async(req,res)=>{
     try{
     const data = await MenuItem.find();
     console.log('Data Fetched');
     res.status(200).send(data);
     }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal Server Error'});
     }
})
module.exports = router;
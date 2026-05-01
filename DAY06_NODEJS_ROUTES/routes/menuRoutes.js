const express = require('express');
const MenuItem = require('../models/MenuItem');
//creating a router instance
const router = express.Router();
// POST /menu - Save menu item
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
//GET /menu - Fetch all menu items
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
//GET /menu/:taste fetch specif items based on parameterized var :taste
router.get('/:tasteType',async(req,res)=>{
    try{
        //1. extract the parameterized var
        const tasteType = req.params.tasteType;
        if(tasteType === 'Sour' || tasteType === 'Sweet' || tasteType === 'Spicy'){
        const response = await MenuItem.find({taste : tasteType});
        console.log('Fetched successfully');
        res.status(200).json(response); 
        }else{
            res.status(404).json({Error : 'Invalid taste type'})
        }
    }catch(err){

    }
})
module.exports = router;
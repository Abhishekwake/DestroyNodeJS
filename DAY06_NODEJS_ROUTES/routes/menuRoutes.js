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
router.put('/:id', async(req,res)=>{
    try{
    // 1. get id from url parameter
    const menuId = req.params.id;
    // 2. get the updated menu data from the user from body 
    const updatedMenuItem = req.body;
    //3. find the menu item and update it to database
    const response = await MenuItem.findByIdAndUpdate(
        menuId,
        updatedMenuItem,{
            new : true,
            runValidators : true,
        }
    )
    if(!response) {
        console.log('Menu not found');
        return res.status(404).json({ error : 'Invalid Menu Item'});
        // ✅ return stops execution - function exits here whhy to still continue
    }
    console.log('MenuItem updated successsfully');
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ error : 'Internal Server Error'});
    }
})
router.delete('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            console.log('menu item not found');
            return res.status(404).json({error: 'Invalid menuItem it doesnt exit'})
            // ✅ return stops execution - function exits here why to continue no meaning
        }
        console.log('Menu item deleted successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})
module.exports = router;
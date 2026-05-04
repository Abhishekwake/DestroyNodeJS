const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
router.post('/tasks', async (req, res) => {
  try {
    const data = req.body;
    const task = new Task(data);
    const response = await task.save();
    if(!response){
        console.log('Invalid Task type');
        return res.status(404).json({Error : 'Invalid Task Type'});
    }
    console.log('Task Saved Successfully');
    res.status(200).json(response);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});
router.get('/tasks',async(req,res)=>{
    try{
        const response = await Task.find();
        if(!response){
            return res.status(404).json({Error : 'Task Not Founds'});
        }
        console.log('Task fetched successfully');;
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({Error : 'Internal Server Error'})
    }
    
})
module.exports = router;
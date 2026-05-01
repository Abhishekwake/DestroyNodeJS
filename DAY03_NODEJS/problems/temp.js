const express = require('express');
const app = express();
app.get("/",(req,res)=>{
    res.send("Wecome to the weather api");
})
app.get("/weather",(req,res)=>{
    const weather = {
        "Temp" : "47",
        "Conditionn" : "hot",
        "City" : "Wardha"
    }
    res.send(weather);
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})
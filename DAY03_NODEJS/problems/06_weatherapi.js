// Problem 6: Building a Basic API
// Imagine you're building an API for a weather app. Your API needs an endpoint to retrieve the current weather.
// Create an Express.js route that responds with a JSON object containing the current temperature, conditions,
// and city.

import express from 'express';
const app = express();

app.get("/weather",(req,res)=> {
    const weatherData = {
        Temperature : "47 Degree C",
        condition : "Sunny",
        city : "Wardha"
    }
    res.send(weatherData);

})
app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})
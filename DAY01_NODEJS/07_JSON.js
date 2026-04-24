// Problem 5: JSON (JavaScript Object Notation)
// You're working on a weather app. Create a JSON object representing the weather forecast for
// a specific day. Include properties like "date," "temperature," "conditions," and "humidity."
// Display the information using console.log.

// If you REALLY want JSON (as asked)
const weatherJSON = `{
"date" : "2026-04-24",
"temperature" : "47°C",
"condition" : "HOT",
"humidity" : "40%"
}`;
console.log(weatherJSON);

// (Object + Display)
const todaysWeather = {
    date: "2026-04-24",
    temperature: "47°C",
    conditions: "Hot",
    humidity: "40%"
};

console.log(todaysWeather);

// Key takeaway
// {} → JavaScript object
// "{}" → JSON string


// Problem 4: Using the 'fs' Module
// Write a Node.js program that uses the fs module to read the contents of a text file named
// "notes.txt" and display them in the console
const fs = require('fs');
fs.writeFile("notes.txt","Hii im the content written inside notes",(err)=>{
    if(err) console.log(err);
    console.log("Notes written successfully");
})
fs.readFile("./notes.txt","utf-8",(err,data)=>{
    if(err) console.log(err);
    console.log(data);
})
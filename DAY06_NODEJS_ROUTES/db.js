const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/Hotel';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',() => {
    console.log("mongoDB connected");
});
db.on('error', (err)=>{
    console.log("Mongo db not connected error occured",err);
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected");
})
const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/taskmanager';
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('MongoDB Connected');
})
db.on('error',(err)=>{
    console.log('MongoDB Error Occured',err);
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})
 
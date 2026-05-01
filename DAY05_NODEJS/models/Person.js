const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    work : {
        type : String,
        enum : ["chef","manager","waiter"],
        required : true
    },
    mobile : {
        type : Number,
        unique : true,
        required : true
    },
    email:{
        type : String,
        unique : true,
        required : true
    },
    address : {
        type : String,
    },
    salary : {
        type : Number,
        required : true
    }
});
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
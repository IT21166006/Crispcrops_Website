const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({

    name :{
        type : String,
        required:true
    },
    age : {
        type : Number, 
        required: true
    },
    mobilenumber:{
        type : Number,
        required: true
    },
    userName:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    },
    vehicleType:{
        type : String,
        required: true
        
    },
    RePassword:{
        type : String,
        required: true
    }


})

const Person = mongoose.model("Person",personSchema);

module.exports = Person;  
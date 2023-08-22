//mongoodb connection import
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema 
const customerSchema = new Schema({

    first_name: {
        type : String,
        required: true
    },
    last_name:{
        type : String,
        required: true
    },
    phone_no:{
        type: Number,
        required: true
    },
    address:{
        type : String,
        required: true
    },
    province:{
        type : String,
        required: true
    },
    age:{
        type : Number,
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
    confirm_password:{
        type : String,
        required: true
    }
    

})

//create customer model
const customer = mongoose.model("customer",customerSchema);


//export model
module.exports = customer;


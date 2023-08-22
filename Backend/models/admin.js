const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//admin profile
const adminSchema = new Schema({

    username : {
        type : String,
        required: true
    },
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

const admin = mongoose.model("admin",adminSchema);

module.exports = admin;



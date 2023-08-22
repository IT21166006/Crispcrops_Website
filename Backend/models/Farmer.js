const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    province : {
        type : String,
        required : true
    },
    cno : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    nic  : {
        type : String,
        required : true
    },
    hType : {
        type : String,
        required : true
    },
    pwd : {
        type : String,
        required : true
    }
    // cpwd : {
    //     type : String,
    //     required : true
    // },
    // quantity : {
    //     type : Number,
    //     required : true
    // }
})

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
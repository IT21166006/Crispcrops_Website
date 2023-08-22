const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema=new Schema({

    offerid : {
        type : Number,
        required:true  
    },
    offername : {
        type : String,
        required:true
    },
    offertype : {
        type : String,
        required:true
    },
    offerpersontage : {
        type : Number,
        required:true
    },

    offerdiscription : {
        type : String,
        required:true
    },

    venuestartdate : {
        type : String,
        required:true
    },

    venueenddate : {
        type : String,
        required:true
    }
  


})

const Offer=mongoose.model("Offer",offerSchema);//offer is document name
module.exports=Offer;


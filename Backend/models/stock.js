//conect mongo db
const mongoose = require ("mongoose");
//const { required } = require('nodemon/lib/config');
 
const Schema = mongoose.Schema;
//creat stock schema
const stockSchema = new Schema({

    famer: {
        type : String,
        required : true
    },
    ItemName : {
        type : String,
        required : true

    },
    ItemId :{
        type :String,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },
    re_order_level : {
        type : String
    },
    price: {
        type :Number,
        required : true
    },
    sdate :{

        type : String,
        required : true
    },
    sPrice :{

        type : Number,
        required : true
    },
    
})
//creat model to stock
const stock = mongoose.model("stock",stockSchema);
//eport module
module.exports = stock;
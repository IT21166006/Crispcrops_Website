const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
        name : {
            type : String,
            required: true
        },
        
        phone :{
            type : Number,
            required: true
        },

        /*qty :{
            type : Number,
            required: true
        },*/

        subtotal : {
            type : Number,
            required :true
        },
        
        Date :{
            type : String,
            required: true
        }
    

    }
)

const payment = mongoose.model("payment",paymentSchema);

module.exports = payment;


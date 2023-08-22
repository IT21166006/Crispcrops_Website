const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070; 

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL:true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})
//Admin Routes
const adminRouter = require("./routes/admin.js");
app.use("/admin",adminRouter);


//Bidding Routs
const biddingRouter = require("./routes/bidding.js");
app.use("/bidding",biddingRouter);

//Stock Routes
const stockRouter = require("./routes/stock.js");
app.use("/stock",stockRouter);

//Customer Routes
const customerRouter = require("./routes/customer.js")
app.use("/customer",customerRouter);

//Farmer Routes
const farmerRouter = require("./routes/farmers.js");
app.use("/farmer", farmerRouter);

//Delevery Routes
const personRouter = require("./routes/persons.js");
app.use("/person",personRouter);

//Payment Rounts
const paymentRouter = require("./routes/payments.js");
app.use("/payment",paymentRouter);

//offer Routes
const offerRouter= require("./routes/offers.js");
app.use("/offers",offerRouter) 

app.listen(PORT, () => {
    console.log (`Server is up and running on port number: ${PORT}`)
})
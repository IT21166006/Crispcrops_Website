const router=require("express").Router();
const {response} = require("express")
let offer=require("../models/offer"); 

//const offerRouter = require("./routes/offers.js");
//app.use("/offers", upload.single('image'), offerRouter);



//Offer Cruds Backend part

//create function

//http://localhost:8070/offers/add        

router.route("/add").post((req,res)=>{

const offerid = Number(req.body.offerid);
const offername= req.body.offername;
const offertype = req.body.offertype;
const offerpersontage = Number(req.body.offerpersontage);
const venuestartdate= req.body.venuestartdate;
const venueenddate= req.body.venueenddate;
const offerdiscription= req.body.offerdiscription;
const image= req.body.offerimage;



const newOffer=new offer({
offerid,
offername,
offertype,
offerpersontage,
venuestartdate,
venueenddate,
offerdiscription,
image
})

newOffer.save().then(()=>{
    res.json("Offer Added")
     }).catch((err)=>{
     console.log(err);
})


})

//http://localhost:8071/offers/

router.route("/").get((_req,res)=>{
    offer.find().then((offers)=>{
    res.json(offers)
    }).catch((err)=>{
console.log(err);
})

})

router.route("/get/:id").get(async(req,res) => {
    let userID = req.params.id;
    const user = await offer.findById(userID).then((offers)=>{
        res.status(200).send({status: "User fetched", offers})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"})
})
})




//http://localhost:8071/offers/update/

router.route("/update/:id").put(async(req,res)=>{
    let userid=req.params.id;

    const {offerid,offername,offertype,offerpersontage,venuestartdate,venueenddate,offerdiscription }=req.body;

    const updateoffers={
        offerid,
        offername,
        offertype,
        offerpersontage,
        venuestartdate,
        venueenddate,
        offerdiscription
    }
    const update =await offer.findByIdAndUpdate(userid,updateoffers)
    .then(() => {
    res.status(200).send({status:"User updated"})
}).catch((err) => {
    console.log(err);
    res.status(500).send({status:"Error with updating data"});

})

})

//http://localhost:8071/offers/delete/

router.route("/delete/:id").delete(async (req,res) =>{
    let userid=req.params.id;
    

    await offer.findByIdAndDelete(userid)
    .then(() => {
    res.status(200).send({status:"User deleted"})
}).catch((err) => {
    console.log(err.message);
    res.status(500).send({status:"Error with delete user",error:err.message});
})
})



//Search 

router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await offer.find({
        $or: [
          { offername: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports=router;








const router = require("express").Router();
let payment = require("../models/payment");

//http://localhost:8070/payment/add


router.post('/add',(req,res) =>{
    let newPost = new payment(req.body);

    const name = req.body.name;
    const phone = Number(req.body.phone);
    //const quantity = Number(req.body.qty);
    const price = Number(req.body.subtotal);
    const date = Number(req.body.Date);

    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Payment details saved succesfully"
        })
    })
})

/*

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const phone = Number(req.body.phone);
    const address = req.body.address;
    const cardNo = Number(req.body.cardNo);
    const CVV = Number(req.body.CVV);
    const expDate = Number(req.body.expDate);

    const newPayment = new PaymentMethodChangeEvent({

        name,
        phone,
        address,
        cardNo,
        CVV,
        expDate
    })
    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })

})

*/

//http://Localhost:8070/payment/display
/*
router.route("/posts").get((req,res)=>{

    // call payment variable to get data

    payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })

})
*/
router.get('/posts',(req,res)=>{
    payment.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    })
})

//update
/*
http://Localhost:8070/student/update/123

router.route("/update/:id").put(async (req, res) =>{

    // destructure method
// put keyword is used to update previous data with new data
    let userId = req.params.id;
    const{name, phone, address, cardNo, CVV, expDate}= req.body;

// create an object to update
    const updatePayment = {
    name,
    phone,
    address,
    cardNo,
    CVV,
    expDate
}
    //-------------------------------search the id that have to update--

    const update = await payment.findByIdAndUpdate(userId, updatePayment)
    .then(() => {

        res.status(200).send({status:"Payment card details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.messege});
    })
})
*/
router.route("/update/:id").put(async (req,res) =>{
    let id = req.params.id;
    const {name,phone,address,cardNo,CVV,expDate,city} = req.body;

    const updatepayment = {
            name,
            phone,
            address,
            cardNo,
            CVV,
            expDate,
            city
    }

    const update = await payment.findByIdAndUpdate(id,updatepayment)
    .then(() =>{
        res.status(200).send ({status: "Inventory updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})
// delete 

// http://Localhost:8070/student/delete/123

router.route("/delete/:id").delete(async(req, res) =>{

    let userId = req.params.id

    await payment.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status:"Payment Details deleted"});
    }).catch((err) => {
        console.log(err.messege);
        res.status(500).send({status: "Error with delete details", error: err.messege})
    })
})

// get details of one user/payment

// router.route("/get/:id").get(async(req, res) =>{
//     let userId = req.params.id;
//     await payment.findById(userId)   // primary key is id,..  when we are using another one as primary key, type  "await Payment.findOne(email)"
//     .then(() =>{
//         res.status(200).send({status: "User fetched", user: user})
//     }).catch(() => {
//         console.log(err.messege);
//         res.status(500).send({status: "Error with get user", error:err.messege})   //can use messege insted of status
//     })
// })


//----route of selected payment----done
router.route("/get/:id").get(async(req,res)=>{
    let ID = req.params.id;

    const bid = await payment.findById(ID)
    .then((pay)=>{
        res.json(pay)
    })
}).patch((err)=>{
    console.log(err)
})

router.route("/deleteAll").delete(async(req, res) =>{

    // let userId = req.params.id

    await payment.deleteMany()
    .then(() => {
        res.status(200).send({status:"All Payments are deleted"});
    }).catch((err) => {
        console.log(err.messege);
        res.status(500).send({status: "Error with delete details", error: err.messege})
    })
})


module.exports = router;
const router = require("express").Router();
let customer = require("../models/customer");

//http://localhost:8070/customer/add

//route of create
router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_no = Number(req.body.phone_no);
    const address = req.body.address;
    const province = req.body.province;
    const age = Number(req.body.age);
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if(password==confirm_password)/*check passwords are same*/{
    const newCustomer = new customer ({
        first_name,
        last_name,
        phone_no,
        address,
        province,
        age,
        email,
        password,
        confirm_password

    })  
    
    newCustomer.save().then(()=>{
        res.json("Customer Added")
    }).catch((err)=>{
        console.log(err);
    })
}
else{
    // todo
    //return("passwords not match");
    //error massage does not display
}
  
})

//update profile
router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id;
    const {first_name,last_name,phone_no,address,province,age,email,password,confirm_password} = req.body;

    const updatecustomer ={
        first_name,
        last_name,
        phone_no,
        address,
        province,
        age,
        email,
        password,
        confirm_password
    }

    const update = await customer.findByIdAndUpdate(userId, updatecustomer).then(()=> {
        res.status(200).send({status: "Customer updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})


//delete profile
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await customer.findByIdAndDelete(userId)
      .then(() => {
        res.status(200).send({status: "Customer deleted"});
      }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete customer",error: err.message});
      })

})

//read/display my profile
router.route ("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await customer.findById(userId) 
     .then((customer) => {
        res.status(200).send({status: "Customer fetched", customer})
     }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get customer", error: err.message});

     })
})

//login
router.route("/loginCustomer").post(async(req,res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        const newcustomer = await customer.findOne({email: email, password: password})
        res.status(200).json({data: newcustomer, status:200});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//Retriews
router.route("/").get((_req,res)=>{
    customer.find().then((setCustomerDetails)=>{
    res.json(setCustomerDetails)
    }).catch((err)=>{
console.log(err);
})

})


//search
router.get('/search/:searchInput', async(req,res) => {
    try {
      const { searchInput } = req.params;
      const users = await customer.find({
        $or: [
          {first_name: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })


module.exports = router;
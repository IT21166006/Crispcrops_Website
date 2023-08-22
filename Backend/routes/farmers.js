const router = require("express").Router();
const {response} = require("express");
let Farmer = require("../models/Farmer");

//insert
router.route("/add").post( async(req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const address = req.body.address;
    const province = req.body.province;
    const cno = Number(req.body.cno);
    const email = req.body.email;
    const nic = req.body.nic;
    const hType = req.body.hType;
    const pwd = req.body.pwd;
    const cpwd = req.body.cpwd

    // const farmer = await Farmer.findOne({username:userName, password:pass})
    

    const newFarmer = new Farmer({
        fname,
        lname,
        address,
        province,
        cno,
        email,
        nic,
        hType,
        pwd,
        cpwd
    })

    newFarmer.save().then(() => {
        res.json("Farmer Added")//{data: farmer}
    }).catch((err) => {
        console.log(err);
    })
    
})


//retrieve
router.route("/display").get((req,res) => {
    Farmer.find().then((farmer) => {
        res.json(farmer)
    }).catch((err) => {
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async (req,res) => {
    let userID = req.params.id;
    const {fname, lname, nic, address, cno, email, province, hType} = req.body;

    const updateFarmer = {
        fname,
        lname,
        nic,
        address,
        cno,
        email,
        hType,
        province
    }

    const update = await Farmer.findByIdAndUpdate(userID, updateFarmer).then(() => {
        res.status(200).send({status: "User Updatetd"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updated data"});
    })
})

//delete
router.route("/delete/:id").delete(async (req,res) => {
    let userID = req.params.id;

    await Farmer.findByIdAndDelete(userID).then(() => {
        res.status(200).send({status: "Farmer deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete farmer", error: err.message});
    })
})

router.route("/get/:id").get(async(req,res) => {
    let userID = req.params.id;
    const user = await Farmer.findById(userID).then((farmer)=>{
        res.status(200).send({status: "User fetched", farmer})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"})
    })
})
 
//login
router.route("/loginFarmer").post(async(req,res) => {

    try{
        const email = req.body.email;
        const pwd = req.body.pwd;
        console.log(email)
        const newfarmer = await Farmer.findOne({email: email,pwd:pwd})
        res.status(200).json({data: newfarmer, status:200});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//search
router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await Farmer.find({
        $or: [
          { fname: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
 
module.exports = router;
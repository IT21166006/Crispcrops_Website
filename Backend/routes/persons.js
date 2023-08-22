const router = require("express").Router();
let person = require("../models/person")



//crud -> create method
//http://localhost:8070/person/add
router.route("/add").post((req,res)=>{

    const name = req.body.name; 
    const age = Number(req.body.age);
    const mobilenumber = Number(req.body.mobilenumber);
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const RePassword = req.body.RePassword;
    const vehicleType = req.body.vehicleType;

    if(password==RePassword){

    // object create
    const newPerson = new person({
        name,  
        age,
        mobilenumber,
        userName,
        email,
        password,
        RePassword,
        vehicleType

    })
    
    
    newPerson.save().then(()=>{ 
        res.json("Person Added")
    }).catch((err)=>{
        console.log(err);
    })   
}
})



//http://localhost:8070/person/display
router.route("/display").get((req,res)=>{

    person.find().then((person)=>{  
        res.json(person)
    }).catch((err)=>{
        console.log(err)
    }) 

})

//update
//http://localhost:8070/person/update/64316bbc02cc8c3d90d151ed
router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id; 
    const{name, age, mobilenumber, userName, email, password, vehicleType} = req.body; 

    const updatePerson = { 
        name,
        age,
        mobilenumber,
        userName,
        email,
        password,
        vehicleType
    }

    const update = await person.findByIdAndUpdate(userId,updatePerson).then(()=>{      
        res.status(200).send({status:"User updated"})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message}); 
    })
    
     
}) 

//delete
//http://localhost:8070/person/delete/64316bbc02cc8c3d90d151ed
router.route("/delete/:id").delete(async(req,res) =>{
    let userID =req.params.id;

    await person.findByIdAndDelete(userID).then(() =>{
        res.status(200).send({status: "user deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error:err.message});
    })
})


//http://localhost:8070/person/get/642eb41a1c28e72cb8cfad9c
router.route("/get/:id").get(async (req,res) =>{
    let userID = req.params.id;
    const user = await person.findById(userID).then((person)=>{
       res.status(200).send({status: "user fetched", person}) 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});

    })
})

router.route("/login").post(async(req,res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)

         const newperson = await person.findOne({email:email, password:password})
        //  if(newperson){
        //    
        //  }else{

        //  }
         console.log(newperson)
         res.status(200).json({data: newperson, status:200});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//search
router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await person.find({
        $or: [
          { name: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })




module.exports = router;
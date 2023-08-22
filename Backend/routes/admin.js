
// module.exports = router;
const router = require("express").Router();
const {response} = require("express");
const admin = require("../models/admin");

// http://localhost:8070/admin/add
router.route("/add").post((req, res) => {
  const { username, fullName, email, password } = req.body;

  const newAdmin = new admin({
    username,
    fullName,
    email,
    password
  });

  console.log(newAdmin);

  newAdmin
    .save()
    .then(() => {
      res.json("Successfully added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// Fetch all data
router.route("/").get((req, res) => {
  admin
    .find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// http://localhost:8070/admin/update/:id
router.route("/update/:id").put(async (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, password } = req.body;

  try {
    const update = await admin.findByIdAndUpdate(
      id,
      { username, fullName, email, password },
      { new: true }
    );

    res.status(200).json({ status: "Profile updated", profile: update });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// http://localhost:8070/admin/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  try {
    await admin.findByIdAndDelete(id);
    res.status(200).json({ status: "Profile deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

// http://localhost:8070/admin/get/:id
router.route("/get/:id").get(async(req,res) => {
  let userID = req.params.id;
  const user = await admin.findById(userID).then((admin)=>{
      res.status(200).send({status: "User fetched", admin})
  }).catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Error with get user"})
  })
})

// Search
router.get('/search/:searchInput', async (req, res) => {
  try {
    const { searchInput } = req.params;
    const users = await admin.find({
      $or: [
        { username: { $regex: searchInput, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.route("/loginAdmin").post(async(req,res) => {

  try{
      const email = req.body.email;
      const password = req.body.password;
      console.log(email)
      const newadmin = await admin.findOne({email: email, password: password})
      res.status(200).json({data: newadmin, status:200});
  }catch(err){
      res.status(500).json({message: err.message});
  }
})

module.exports = router;

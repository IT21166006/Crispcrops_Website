const router = require("express").Router();
const Stock = require("../models/stock");


//add item
router.route("/add").post((req,res)=>{
    const famer  =req.body.famer;
    const ItemName = req.body.ItemName;
    const ItemId = req.body.ItemId;
    const quantity = Number( req.body.quantity);
    const re_order_level = req.body.re_order_level;
    const price =Number(req.body.price);
    const sPrice =Number(req.body.sPrice);
    const sdate = req.body.sdate;

    const newstock = new Stock({

        famer,
        ItemName,
        ItemId,
        quantity,
        re_order_level,
        price,
        sPrice,
        sdate
 })
     newstock.save().then(() => {
        res.json("stock added")
}).catch ((err)=>{
    console.log(err);
})

})
 
//read
router.route ("/").get((req,res) => {

    Stock.find().then((stock) => {   
        res.json(stock) 

    }).catch((err) => {
        console.log(err)
    })

})
//update
router.route ("/update/:id").put(async (req,res) => {
   let userId  = req.params.id;
   const {famer,ItemName,ItemId,quantity,re_order_level,price,sPrice,sdate} = req.body;
//user id must change
  const UpdateStock = {

    famer,
    ItemName,
    ItemId,
    quantity,
    re_order_level,
    price,
    sPrice,
    sdate


  }
  const update = await Stock.findByIdAndUpdate(userId,UpdateStock)
  .then(()=>{
   
  res.status(200).send ({status:"stock updated"})

  }).catch(()=>{
    console.log(err);
    res.status(500).send({status:"error with updating data",error:err.massage});
  })
   
}) 
//delete
router.route("/delete/:id").delete(async(req,res)=>{
 let userId = req.params.id;
 
 
 await Stock.findByIdAndDelete(userId)
 .then(()=>{

    res.status(200).send({status:"stock deleted"});
 }).catch ((err)=>{
    console.log(err.massage);
    res.status(500).send({status:"error with deleting stocks",error:err.massage});
 })
})

router.route("/get/:id").get(async(req,res)=>{
  let stockid =req.params.id;
  console.log(stockid)
  // const user = await stock.findbyId(stockid)

  const stock = await Stock.findById(stockid)
  .then((ob)=>{
    res.json({data:ob})
  })
  .catch((error)=>{
    res.json(error)
  })






})

  //Search 

  router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await Stock.find({
        $or: [
          { famer: { $regex: searchInput, $options: 'i' } },
          
        
          
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;

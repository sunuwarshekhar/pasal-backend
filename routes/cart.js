const Product = require("../models/Product");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    //user can change its own cart via token n authorization
    try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //sets everythng
      },
      { new: true }
    ); //returns updated user
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user Cart
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});//search conditionsby matching id
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //get all carts
router.get("/", verifyTokenAndAdmin,  async (req, res) => {
  try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;

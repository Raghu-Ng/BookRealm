const express = require("express");
const router = express.Router();
const Cart = require("../models/cartSchema");
const Txn = require("../models/txnSchema");

router.get("/:id", async (req, res) => {
  try {
    let cartItems = await Cart.find({ userid: req.params.id });
    console.log(cartItems);
    return res.status(200).send(cartItems);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any cart items");
  }
});

router.post("/add", async (req, res) => {
  try {
    const CartItem = new Cart({
      userid: req.body.userid,
      bookid: req.body.bookid,
      title: req.body.title,
      authors: req.body.authors,
      image: req.body.image,
      type: req.body.type,
      price: req.body.price,
      order_type: req.body.order_type,
      date: new Date(),
      rent_period: req.body.rent_period,
    });

    const savedCartItem = await CartItem.save();
    return res.status(201).send(savedCartItem);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating cart item");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Cart.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send("No cart item found with the given ID");
    }
    return res.status(200).send("Cart item deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error deleting cart item");
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        userid: req.body.userid,
        bookid: req.body.bookid,
        type: req.body.type,
        price: req.body.price,
        date: new Date(),
        rent_period: req.body.rent_period,
      },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).send("No cart item found with the given ID");
    }
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error updating cart item");
  }
});

module.exports = router;

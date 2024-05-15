const express = require("express");
const router = express.Router();
const Txn = require("../models/txnSchema");

router.post("/", async (req, res) => {
  try {
    if (req.body.user === "admin") {
      let txns = await Txn.find();
      console.log(txns);
      return res.status(200).send(txns);
    } else {
      return res.status(401).send("Unauthorised");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any transactions");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let txns = await Txn.find({ userid: req.params.id });
    console.log(txns);
    return res.status(200).send(txns);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any transactions");
  }
});

router.post("/buy", async (req, res) => {
  // try {
  //   const newTxn = new Txn({
  //     userid: req.body.userid,
  //     bookid: req.body.bookid,
  //     type: "buy",
  //     amount: req.body.price,
  //     date: new Date(),
  //     rent_period: req.body.rent_period,
  //   });
  //   const savedTxn = await newTxn.save();
  //   return res.status(201).send(savedTxn);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).send("Error creating transaction");
  // }

  try {
    const { userid, bookid, price, rent_period } = req.body;
    let transactions = [];
    for (let i = 0; i < rent_period; i++) {
      const newTxn = new Txn({
        userid: userid,
        bookid: bookid,
        type: "buy",
        amount: price,
        date: new Date(),
      });
      const savedTxn = await newTxn.save();
      transactions.push(savedTxn);
    }
    return res.status(201).send(transactions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating transactions");
  }
});

router.post("/rent", async (req, res) => {
  try {
    const newTxn = new Txn({
      userid: req.body.userid,
      bookid: req.body.bookid,
      type: "rent",
      amount: req.body.price,
      date: new Date(),
      rent_period: req.body.rent_period,
    });
    const savedTxn = await newTxn.save();
    return res.status(201).send(savedTxn);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating transaction");
  }
});

module.exports = router;

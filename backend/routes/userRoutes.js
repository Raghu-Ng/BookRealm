const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    console.log(users);
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any users");
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let user = await User.findOne({ userid: req.params.id });
    console.log("user", user);
    if (user != null) {
      return res.status(200).send(user);
    } else {
      return res.status(201).send("Could not find user");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find the user");
  }
});

router.post("/create", async (req, res) => {
  let user = new User({
    userid: req.body.userid,
    name: req.body.name,
    email: req.body.email,
  });
  console.log(user);
  try {
    let savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Could not create user");
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user by ID and update the fields
    let updatedUser = await User.findOneAndUpdate(
      { userid: userId },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          // email: req.body.email,
          phoneno: req.body.phoneno,
          country: req.body.country,
          street_address: req.body.street_address,
          city: req.body.city,
          region: req.body.region,
          postal_code: req.body.postal_code
        }
      },
      { new: true } // to return the updated document
    );

    if (updatedUser) {
      return res.status(200).send(updatedUser);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

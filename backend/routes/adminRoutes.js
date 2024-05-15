const express = require("express");
const router = express.Router();
const Book = require("../models/bookSchema");

router.get("/approvalrequests", async (req, res) => {
  try {
    let books = await Book.find({ approved: "Not Approved" });
    console.log(books);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any books");
  }
});

router.patch("/:id/approve", async (req, res) => {
  try {
    let book = await Book.findByIdAndUpdate(
      req.params.id,
      { approved: "Approved" },
      { new: true }
    );
    if (!book) {
      return res.status(404).send("Could not find requested book");
    }
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while updating the book");
  }
});

router.patch("/:id/reject", async (req, res) => {
  try {
    let book = await Book.findByIdAndUpdate(
      req.params.id,
      { approved: "Rejected" },
      { new: true }
    );
    if (!book) {
      return res.status(404).send("Could not find requested book");
    }
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while updating the book");
  }
});

module.exports = router;

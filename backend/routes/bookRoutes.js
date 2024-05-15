const express = require("express");
const router = express.Router();
const Book = require("../models/bookSchema");

router.get("/", async (req, res) => {
  try {
    let books = await Book.find({ approved: "Approved" });
    console.log(books);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any books");
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let book = await Book.findById(req.params.id);
    console.log(book);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find requested book");
  }
});

router.get("/approval/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let books = await Book.find({ userid: req.params.id });
    console.log(books);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find requested book");
  }
});

router.post("/create", async (req, res) => {
  let book = new Book({
    userid: req.body.userid,
    title: req.body.title,
    subtitle: req.body.subtitle,
    authors: req.body.authors,
    image: req.body.image,
    type: req.body.type,
    url: req.body.url,
    language: req.body.language,
    price: req.body.price,
    book_length: req.body.book_length,
    approved: "Not Approved",
  });
  try {
    let savedBook = await book.save();
    res.status(200).send(savedBook);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Could not create book");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;

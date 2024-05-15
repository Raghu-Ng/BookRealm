let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  authors: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String },
  language: { type: String, required: true },
  price: { type: Number, required: true },
  book_length: { type: Number, required: true },
  approved: { type: String, default: "Not Approved", required: true },
});

module.exports = mongoose.model("Book", bookSchema);

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let txnSchema = new Schema({
  userid: { type: String, required: true },
  bookid: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, required: true },
  rent_period: { type: Number },
});

module.exports = mongoose.model("Transaction", txnSchema);

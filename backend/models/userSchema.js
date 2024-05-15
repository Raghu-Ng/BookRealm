let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  phoneno: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  street_address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  region: {
    type: String,
    default: "",
  },
  postal_code: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);

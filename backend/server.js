const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminRoutes");
const txnRoutes = require("./routes/txnRoutes");
const cartRoutes = require("./routes/cartRoutes")

const app = express();
const PORT = process.env.PORT || 2000;

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
connectToDb();

app.use(express.json());
express.json();
app.use(cors());
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/admin", adminRoutes);
app.use("/transaction", txnRoutes);
app.use("/cart", cartRoutes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
